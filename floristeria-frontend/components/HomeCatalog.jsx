"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import Filters from "@/components/Filters";
import { products } from "@/data/products";

export default function HomeCatalog() {
  const [selectedType, setSelectedType] = useState("");

  const filteredProducts =
    selectedType === ""
      ? products
      : products.filter((product) => product.type === selectedType);

  return (
    <div
      id="catalogo"
      className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex flex-col md:flex-row gap-8 md:gap-10"
    >
      <Filters
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-serif">Catálogo</h2>
            <p className="text-muted text-sm mt-1">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "arreglo" : "arreglos"}{" "}
              disponibles
            </p>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-border">
            <p className="font-serif text-xl text-foreground">
              No hay productos en esta categoría
            </p>
            <button
              onClick={() => setSelectedType("")}
              className="mt-4 text-rose text-sm hover:underline"
            >
              Ver todos los productos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
