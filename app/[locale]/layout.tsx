import { Inter } from "next/font/google";
import "./globals.css";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const locales = ['en', 'nl'] as const;

export const metadata = {
  title: "Oranje Onderwijs Intelligence | Netherlands Education Data & Program Mapping",
  description: "Enterprise-grade Netherlands education data intelligence. Explore comprehensive program mapping, institutional analytics, and academic ecosystem insights in the Dutch educational landscape.",
  keywords: "Netherlands Education, Data Intelligence, Program Mapping, Dutch Universities, Academic Analytics, Education Data, Study in Netherlands",
  icons: {
    icon: "/Oranje Onderwijs Intelligence2.webp",
    apple: "/Oranje Onderwijs Intelligence2.webp",
  },
  other: {
    "font-share": "https://api.fontshare.com/v2/css?f[]=satoshi@700,900,500,400&display=swap",
  }
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  // Ensure that the incoming `locale` is valid
  if (!locale || !locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} antialiased`}>
      <body className="font-sans bg-[#F8FAFC] text-[#0F172A]" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
