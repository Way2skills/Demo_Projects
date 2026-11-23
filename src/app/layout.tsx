import type { Metadata } from "next";
import SiteFooter from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nool & Zari | Heirloom Silks & Haute Couture",
  description:
    "Handwoven heirloom silks, gilded zari borders, and contemporary grace from the Nool & Zari atelier.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
