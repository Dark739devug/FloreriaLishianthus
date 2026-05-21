"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Flower2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function Header({ openCart }) {
  const pathname = usePathname();
  const cart = useCartStore((state) => state.cart);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const catalogHref = pathname === "/" ? "#catalogo" : "/#catalogo";

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-4">
        <Link href="/" className="flex items-center gap-2 group">
          <Flower2
            className="text-rose group-hover:scale-110 transition-transform"
            size={28}
            strokeWidth={1.5}
          />
          <div>
            <h1 className="text-xl sm:text-2xl font-serif text-foreground leading-tight">
              Florería Lisianthus
            </h1>
            <p className="text-xs text-muted hidden sm:block">
              Flores frescas · Entrega el mismo día
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-muted">
          <Link
            href={catalogHref}
            className="hover:text-rose transition-colors"
          >
            Catálogo
          </Link>
          <Link
            href="/disena"
            className={`transition-colors ${
              pathname === "/disena"
                ? "text-rose font-medium"
                : "hover:text-rose"
            }`}
          >
            Diseña tu ramo
          </Link>
          <Link
            href="/blog"
            className={`transition-colors ${
              pathname === "/blog" || pathname?.startsWith("/blog/")
                ? "text-rose font-medium"
                : "hover:text-rose"
            }`}
          >
            Blog
          </Link>
        </nav>

        <button
          onClick={openCart}
          aria-label="Abrir carrito"
          className="relative p-2 rounded-full hover:bg-rose-light transition-colors"
        >
          <ShoppingCart size={26} className="text-foreground" />
          {totalItems > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-rose text-white text-xs font-medium min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
