import asyncio
from playwright.async_api import async_playwright
from bs4 import BeautifulSoup
import json
from datetime import datetime, timezone
import re

BASE = "https://www.hanze.nl"
START_URL = "https://www.hanze.nl/en/programmes"

INVALID_KEYWORDS = [
    "faq", "contact", "about", "news",
    "student", "information", "details"
]

# ------------------------
# UTIL
# ------------------------
def clean_text(text):
    if not text:
        return ""
    return re.sub(r"\s+", " ", text).strip()


def abs_url(href):
    return href if href.startswith("http") else BASE + href


def detect_language(desc):
    if not desc:
        return "Unknown"

    d = desc.lower()

    if "dutch" in d:
        return "Dutch"
    elif "english" in d:
        return "English"
    else:
        return "English"  # default aman


def clean_description(desc):
    desc = clean_text(desc)

    if len(desc) > 300:
        desc = desc[:300].rsplit(" ", 1)[0]  # potong halus

    return desc


# ------------------------
# GET PROGRAM LIST
# ------------------------
async def get_program_links(page):
    print("[LIST] HANZE PROGRAMS")

    await page.goto(START_URL)
    await page.wait_for_timeout(5000)

    soup = BeautifulSoup(await page.content(), "html.parser")

    programs = []

    for a in soup.select("a"):
        h2 = a.select_one("h2.educationcard__header-title")

        if not h2:
            continue

        name = clean_text(h2.get_text())
        href = a.get("href")

        if not name or not href:
            continue

        if any(k in name.lower() for k in INVALID_KEYWORDS):
            continue

        url = abs_url(href)

        programs.append({
            "name": name,
            "url": url
        })

    # DEDUP
    unique = {p["url"]: p for p in programs}
    programs = list(unique.values())

    print(f"→ Found {len(programs)} programs")

    return programs


# ------------------------
# SCRAPE DETAIL (UPGRADED)
# ------------------------
async def scrape_detail(page, item):
    url = item["url"]

    for attempt in range(2):  # retry 2x
        try:
            await page.goto(url, timeout=60000)
            await page.wait_for_timeout(3000)

            soup = BeautifulSoup(await page.content(), "html.parser")

            # NAME
            h1 = soup.select_one("main h1")
            name = clean_text(h1.get_text()) if h1 else item["name"]

            # LEVEL
            if "/master/" in url:
                level = "Master"
            elif "/bachelor/" in url:
                level = "Bachelor"
            else:
                level = "Unknown"

            # DESCRIPTION (SMART)
            desc = ""

            meta = soup.select_one('meta[name="description"]')
            if meta:
                desc = meta.get("content", "")

            # fallback kalau meta kosong
            if not desc:
                p = soup.select_one("main p")
                if p:
                    desc = p.get_text()

            desc = clean_description(desc)

            if not desc or desc.lower() in ["home"]:
                return None

            # LANGUAGE AUTO
            language = detect_language(desc)

            return {
                "name": name,
                "level": level,
                "education_type": "HBO",
                "language": language,
                "description": desc,
                "url": url,
                "source": "official",
                "confidence": "high"
            }

        except Exception as e:
            print(f"[RETRY {attempt+1}] {url} → {e}")
            await asyncio.sleep(2)

    return None


# ------------------------
# MAIN
# ------------------------
async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        links = await get_program_links(page)

        results = []

        for i, item in enumerate(links, 1):
            print(f"[{i}/{len(links)}] {item['url']}")

            data = await scrape_detail(page, item)

            if data:
                results.append(data)

            await asyncio.sleep(1)  # 🔥 anti-bot delay

        await browser.close()

        # FINAL DEDUP
        final = {f"{r['name']}_{r['level']}": r for r in results}
        programs = list(final.values())

        # SORT
        programs = sorted(programs, key=lambda x: (x["level"], x["name"]))

        return programs


# RUN
programs = asyncio.run(run())

# FINAL OUTPUT
output = {
    "scraped_at": datetime.now(timezone.utc).isoformat(),
    "country": "Netherlands",
    "school": {
        "name": "Hanze University of Applied Sciences",
        "type": "HBO (University of Applied Sciences)",
        "website": BASE
    },
    "programs": programs,
    "meta": {
        "total_programs": len(programs),
        "source": "Official university website",
        "quality": "Premium clean dataset",
        "features": [
            "Auto language detection",
            "Retry mechanism",
            "Fallback scraping",
            "Anti-bot delay",
            "Clean structured data"
        ],
        "ready_for_client": True
    }
}

print(json.dumps(output, indent=2))

with open("hanze_premium_final.json", "w", encoding="utf-8") as f:
    json.dump(output, f, indent=2, ensure_ascii=False)