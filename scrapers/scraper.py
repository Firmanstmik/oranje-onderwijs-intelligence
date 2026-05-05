import asyncio
from playwright.async_api import async_playwright
from bs4 import BeautifulSoup
import json
from datetime import datetime, timezone
import re

BASE = "https://www.tudelft.nl"

CATEGORY_PAGES = {
    "Bachelor": "https://www.tudelft.nl/en/education/programmes/bachelors",
    "Master": "https://www.tudelft.nl/en/education/programmes/masters",
    "Minor": "https://www.tudelft.nl/en/education/programmes/minors",
}

# 🔥 FILTER DATA KOTOR
INVALID_KEYWORDS = [
    "track", "faq", "contact", "deadline",
    "news", "about", "introduction",
    "programme", "courses", "student",
    "information", "details"
]

# ------------------------
# UTIL
# ------------------------
def abs_url(href):
    return href if href.startswith("http") else BASE + href

def clean_text(text):
    return re.sub(r"\s+", " ", text).strip()

def clean_program_name(name):
    name = name.replace("Bachelor of", "")
    name = name.replace("Master of", "")
    name = name.replace("BSc", "")
    name = name.replace("MSc", "")
    if " - " in name:
        name = name.split(" - ")[0]
    name = name.strip()

    # Capitalize rapi
    name = " ".join(word.capitalize() for word in name.split())
    return name

# ------------------------
# GET PROGRAM LIST
# ------------------------
async def get_program_links(page, url, level):
    print(f"[LIST] {level}")

    await page.goto(url)
    await page.wait_for_timeout(4000)

    soup = BeautifulSoup(await page.content(), "html.parser")

    links = []

    for c in soup.select("a.card"):
        h3 = c.select_one("h3")
        href = c.get("href")

        if not h3 or not href:
            continue

        name = clean_text(h3.get_text())
        full_url = abs_url(href)

        # FILTER KOTOR
        if any(k in name.lower() for k in INVALID_KEYWORDS):
            continue

        links.append({
            "name": name,
            "url": full_url,
            "level": level
        })

    # DEDUP
    unique = {l["url"]: l for l in links}
    print(f"  → {len(unique)} clean programs")
    return list(unique.values())

# ------------------------
# GET DETAIL PROGRAM
# ------------------------
async def scrape_detail(page, item):
    url = item["url"]

    try:
        await page.goto(url)
        await page.wait_for_timeout(3000)

        soup = BeautifulSoup(await page.content(), "html.parser")

        # NAME
        h1 = soup.select_one("main h1")
        name = clean_text(h1.get_text()) if h1 else item["name"]
        name = clean_program_name(name)

        # FILTER FINAL
        if any(k in name.lower() for k in INVALID_KEYWORDS):
            return None

        # DESCRIPTION
        desc = ""
        p = soup.select_one("main p")

        if p:
            desc = clean_text(p.get_text())

        if not desc:
            meta = soup.select_one('meta[name="description"]')
            if meta:
                desc = clean_text(meta.get("content", ""))

        # FILTER PROGRAM TIDAK VALID
        if "discontinue" in desc.lower():
            return None

        # LIMIT DESCRIPTION (biar clean)
        desc = desc[:300]

        # LANGUAGE
        if "taught in dutch" in desc.lower():
            lang = "Dutch"
        elif "english" in desc.lower():
            lang = "English"
        else:
            lang = "English"

        return {
            "name": name,
            "level": item["level"],
            "education_type": "WO",
            "language": lang,
            "description": desc,
            "url": url,
            "source": "official",
            "confidence": "high"
        }

    except Exception as e:
        print(f"[ERROR] {url} → {e}")
        return None

# ------------------------
# MAIN
# ------------------------
async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        all_links = []

        # STEP 1: ambil semua kategori
        for level, url in CATEGORY_PAGES.items():
            links = await get_program_links(page, url, level)
            all_links.extend(links)

        # GLOBAL DEDUP
        unique_links = {l["url"]: l for l in all_links}
        all_links = list(unique_links.values())

        print(f"\nTOTAL CLEAN PROGRAM LINKS: {len(all_links)}\n")

        # STEP 2: ambil detail
        results = []

        for i, item in enumerate(all_links, 1):
            print(f"[{i}/{len(all_links)}] {item['url']}")
            data = await scrape_detail(page, item)

            if data:
                results.append(data)

        await browser.close()

        # FINAL DEDUP
        final = {f"{r['name']}_{r['level']}": r for r in results}
        programs = list(final.values())

        # SORT BIAR RAPI
        programs = sorted(programs, key=lambda x: (x["level"], x["name"]))

        return programs

# RUN
programs = asyncio.run(run())

# FINAL OUTPUT
output = {
    "scraped_at": datetime.now(timezone.utc).isoformat(),
    "country": "Netherlands",
    "school": {
        "name": "TU Delft",
        "type": "WO (Research University)",
        "website": BASE
    },
    "programs": programs,
    "meta": {
        "total_programs": len(programs),
        "categories": list(CATEGORY_PAGES.keys()),
        "source": "Official university website",
        "quality": "Premium clean dataset",
        "ready_for_client": True
    }
}

print(json.dumps(output, indent=2))

with open("tu_delft_premium.json", "w") as f:
    json.dump(output, f, indent=2)