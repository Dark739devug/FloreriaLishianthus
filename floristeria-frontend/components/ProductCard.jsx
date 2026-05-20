"use client";

import { useCartStore } from "@/store/cartStore";

export default function ProductCard({ product }) {

  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">

      <div className="w-full h-80">

        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover"
        />

      </div>

      <div className="p-5 text-center">

        <h2 className="text-2xl font-serif">
          {product.name}
        </h2>

        <p className="text-gray-500 mt-2">
          {product.desc}
        </p>

        <p className="text-2xl text-rose-700 mt-4">
          Q{product.price}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="mt-4 w-full bg-rose-700 text-white py-3 rounded-full"
        >
          Añadir al carrito
        </button>

      </div>

    </div>
  );
}