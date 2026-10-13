import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { RootLayoutWrapper } from "@/components/layout/RootLayoutWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Ethixweb India | Digital Systems, AI & Full-Stack Web Engineering",
    template: "%s | Ethixweb India",
  },
  description:
    "Senior engineering partner for India's high-growth D2C brands, B2B SaaS platforms, and enterprise modernizers. Sub-second Next.js web systems, UPI checkout flows, WhatsApp CRM automations, and 24/7 dedicated SRE.",
  keywords: [
    "Ethixweb India",
    "Full Stack Web Development",
    "Next.js Developer Bengaluru",
    "UPI Razorpay Integration",
    "WhatsApp CRM Automation",
    "D2C Headless Commerce",
    "Indian SaaS Development",
  ],
  authors: [{ name: "Ethixweb India Engineering" }],
  creator: "Ethixweb India",
  publisher: "Ethixweb Technologies India Pvt Ltd",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ethixweb.in"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Ethixweb India",
    title: "Ethixweb India | Digital Systems, AI & Full-Stack Web Engineering",
    description:
      "We run the tech. You run the business. Senior engineering partner for India's ambitious brands.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ethixweb India | Digital Systems & Web Engineering",
    description: "We run the tech. You run the business. Sub-second web systems for India's modern brands.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-brand-dark text-slate-100 min-h-screen selection:bg-brand-red selection:text-white`}
      >
        <RootLayoutWrapper>{children}</RootLayoutWrapper>
      </body>
    </html>
  );
}
