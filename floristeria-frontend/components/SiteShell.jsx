"use client";

import { useState } from "react";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

export default function SiteShell({ children }) {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Header openCart={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} closeCart={() => setCartOpen(false)} />
      {children}
      <Footer />
    </>
  );
}
