
import { Manrope } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartProvider from "@/components/cart/CartProvider";
import CartDrawer from "@/components/cart/CartDrawer";
import WishlistProvider from "@/components/wishlist/WishlistProvider";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = {
  title: "Neolen Furniture | Timeless Furniture for Modern Living",
  description:
    "Discover thoughtfully designed furniture for modern living at Neolen Furniture.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-sans antialiased">
        <WishlistProvider>
          <CartProvider>
            <Navbar />
            {children}
            <Footer />
            <CartDrawer />
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
