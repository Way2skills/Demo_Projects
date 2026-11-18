import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ShopProvider } from "@/components/providers/ShopProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Crueze TimeLine | Multi-Brand Watch Showroom",
  description:
    "Curated multi-brand watch showroom featuring fine timepieces from celebrated Indian and international watchmakers.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <ShopProvider>
          <AnnouncementBar />
          <Navbar />
          {children}
          <Footer />
        </ShopProvider>
      </body>
    </html>
  );
}
