"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

function formatPrice(amount) {
  return `Q${amount.toLocaleString("es-GT")}`;
}

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
      <div className="relative w-full h-72 sm:h-80 overflow-hidden">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs px-3 py-1 rounded-full capitalize text-sage font-medium">
          {product.type}
        </span>
      </div>

      <div className="p-5">
        <h2 className="text-xl font-serif text-foreground">{product.name}</h2>
        <p className="text-muted text-sm mt-1 line-clamp-2">{product.desc}</p>
        <p className="text-2xl text-rose font-medium mt-3">
          {formatPrice(product.price)}
        </p>

        <button
          onClick={handleAdd}
          disabled={added}
          className={`mt-4 w-full py-3 rounded-full text-sm font-medium transition-all ${
            added
              ? "bg-sage text-white"
              : "bg-rose text-white hover:bg-rose-dark active:scale-[0.98]"
          }`}
        >
          {added ? (
            <span className="inline-flex items-center justify-center gap-2">
              <Check size={18} /> Añadido
            </span>
          ) : (
            "Añadir al carrito"
          )}
        </button>
      </div>
    </article>
  );
}
