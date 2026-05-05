import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="font-sans bg-[#F8FAFC] text-[#0F172A]" suppressHydrationWarning>{children}</body>
    </html>
  );
}
