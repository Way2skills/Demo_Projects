/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SHINEWOOD | Luxury Interior Design & Architecture",
    template: "%s | SHINEWOOD",
  },
  description:
    "Spaces That Speak. Living Beyond Ordinary. Premier luxury interior design and architecture studio in Covai, crafting bespoke residential and commercial spaces.",
  keywords: [
    "interior design covai",
    "luxury interior architecture",
    "shinewood interiors",
    "modular kitchen design covai",
    "custom furniture woodwork",
    "premium residential interiors",
  ],
  authors: [{ name: "Shinewood Interior Architecture" }],
  creator: "SHINEWOOD",
  metadataBase: new URL("https://shinewood.com"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://shinewood.com",
    title: "SHINEWOOD | Luxury Interior Design & Architecture",
    description: "Spaces That Speak. Living Beyond Ordinary.",
    siteName: "SHINEWOOD",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="scroll-smooth antialiased bg-[#171513] text-[#FCFAF6]"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#171513] text-[#FCFAF6]">
        <Navbar />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
