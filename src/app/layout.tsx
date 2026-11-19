import { Suspense, type ReactNode } from "react";

import "./globals.css";
import "../styles/animations.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";

export const metadata = {
  title: { default: "BabyHunt | Little Things, Big Happiness", template: "%s | BabyHunt" },
  description: "Thoughtfully chosen baby clothing, toys, gifts and everyday essentials for life’s little moments.",
  applicationName: "BabyHunt",
  openGraph: { title: "BabyHunt | Little Things, Big Happiness", description: "Thoughtfully chosen essentials for your little one.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={null}><Header /></Suspense>
        <CartDrawer />
        {children}
        <Footer />
      </body>
    </html>
  );
}
