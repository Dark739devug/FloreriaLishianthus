"use client";

import { X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function CartDrawer({
  open,
  closeCart,
}) {

  const cart = useCartStore(
    (state) => state.cart
  );

  const removeFromCart = useCartStore(
    (state) => state.removeFromCart
  );

  const total = cart.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  return (
    <>
      {open && (
        <div
          onClick={closeCart}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transition-transform duration-300 ${
          open
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >

        <div className="flex justify-between items-center p-5 border-b">

          <h2 className="text-2xl font-serif">
            Tu carrito
          </h2>

          <button onClick={closeCart}>
            <X />
          </button>

        </div>

        <div className="p-5 space-y-5">

          {cart.length === 0 ? (
            <p>Tu carrito está vacío</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="border-b pb-4"
              >
                <h3 className="font-bold">
                  {item.name}
                </h3>

                <p>
                  Cantidad: {item.quantity}
                </p>

                <p>
                  Q
                  {item.price *
                    item.quantity}
                </p>

                <button
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                  className="text-red-500 text-sm"
                >
                  Eliminar
                </button>
              </div>
            ))
          )}

        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t p-5 bg-white">

          <div className="flex justify-between font-bold text-xl">

            <span>Total</span>

            <span>Q{total}</span>

          </div>

          <button className="w-full mt-4 bg-rose-700 text-white py-3 rounded-full">
            Proceder al pago
          </button>

        </div>

      </div>
    </>
  );
}