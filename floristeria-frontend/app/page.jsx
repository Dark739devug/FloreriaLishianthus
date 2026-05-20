"use client";

import { useState } from "react";

import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Filters from "@/components/Filters";
import DesignTool from "@/components/DesignTool";
import CartDrawer from "@/components/CartDrawer"; 

import { products } from "@/data/products";

export default function Home() {
  const [selectedType, setSelectedType] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  const filteredProducts = selectedType === ""
    ? products
    : products.filter((product) => product.type === selectedType);

  return (
    <main className="bg-[#fbf9f7] min-h-screen">
      <Header openCart={() => setCartOpen(true)} />
      
      <CartDrawer open={cartOpen} closeCart={() => setCartOpen(false)} />
      
      <div className="max-w-7xl mx-auto px-6 py-10 flex gap-10">
        <Filters selectedType={selectedType} setSelectedType={setSelectedType} />
        
        <div className="flex-1">
          <h1 className="text-5xl font-serif mb-10">Catálogo</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <DesignTool />
      </div>
    </main>
  );
}