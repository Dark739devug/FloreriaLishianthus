"use client";

import { useEffect, useState } from "react";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/formatPrice";
import CheckoutPanel from "@/components/CheckoutPanel";

export default function CartDrawer({ open, closeCart }) {
  const cart = useCartStore((state) => state.cart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const [view, setView] = useState("cart");

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => setView("cart"), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  function handleClose() {
    closeCart();
  }

  const title = view === "checkout" ? "Finalizar compra" : "Tu carrito";

  return (
    <>
      <div
        onClick={handleClose}
        aria-hidden={!open}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        role="dialog"
        aria-label="Carrito de compras"
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-5 border-b border-border shrink-0">
          <h2 className="text-2xl font-serif">{title}</h2>
          <button
            onClick={handleClose}
            aria-label="Cerrar carrito"
            className="p-2 rounded-full hover:bg-cream-dark transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {view === "checkout" ? (
          <CheckoutPanel
            key="checkout"
            total={total}
            onBack={() => setView("cart")}
            onComplete={() => {
              setView("cart");
              closeCart();
            }}
          />
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-muted">
                  <p className="font-serif text-lg text-foreground mb-2">
                    Tu carrito está vacío
                  </p>
                  <p className="text-sm">
                    Explora el catálogo y elige el ramo perfecto.
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-4 border-b border-border last:border-0"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-muted mt-0.5 line-clamp-2">
                        {item.desc}
                      </p>
                      <p className="text-sm text-muted mt-1">
                        {formatPrice(item.price)} c/u
                      </p>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 border border-border rounded-full">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-1.5 hover:bg-cream-dark rounded-full transition-colors"
                            aria-label="Reducir cantidad"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="text-sm font-medium w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1.5 hover:bg-cream-dark rounded-full transition-colors"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <p className="font-medium text-rose">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="mt-2 inline-flex items-center gap-1 text-xs text-muted hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={14} /> Eliminar
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-border p-5 bg-cream shrink-0">
              <div className="flex justify-between font-serif text-xl mb-4">
                <span>Total</span>
                <span className="text-rose">{formatPrice(total)}</span>
              </div>
              <button
                type="button"
                disabled={cart.length === 0}
                onClick={() => setView("checkout")}
                className="w-full bg-rose text-white py-3.5 rounded-full font-medium hover:bg-rose-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Proceder al pago
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
