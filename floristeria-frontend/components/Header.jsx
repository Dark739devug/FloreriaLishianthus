"use client";

import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function Header({ openCart }) {

  const cart = useCartStore(
    (state) => state.cart
  );

  const totalItems = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        <h1 className="text-3xl font-serif">
          Florería Lisianthus
        </h1>

        <button
          onClick={openCart}
          className="relative"
        >
          <ShoppingCart size={28} />

          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-rose-700 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>

      </div>

    </header>
  );
}