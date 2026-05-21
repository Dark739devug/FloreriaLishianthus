"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flower2, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function Header({ openCart }) {
  const pathname = usePathname();
  const cart = useCartStore((state) => state.cart);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const catalogHref = pathname === "/" ? "#catalogo" : "/#catalogo";
  const aboutHref = pathname === "/" ? "#sobre-nosotros" : "/#sobre-nosotros";
  const contactHref = pathname === "/" ? "#contacto" : "/#contacto";

  const cartButton = (
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
  );

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 sm:px-6 py-3 md:py-4">
        <div className="w-full md:w-auto flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2 group min-w-0">
            <Flower2
              className="text-rose group-hover:scale-110 transition-transform shrink-0"
              size={28}
              strokeWidth={1.5}
            />
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-serif text-foreground leading-tight truncate">
                Florería Lisianthus
              </h1>
              <p className="text-xs text-muted hidden sm:block">
                Flores frescas · Entrega el mismo día
              </p>
            </div>
          </Link>

          <div className="md:hidden">{cartButton}</div>
        </div>

        <nav className="w-full md:w-auto flex items-center gap-4 md:gap-8 overflow-x-auto pb-1 md:pb-0 text-sm text-muted whitespace-nowrap">
          <Link
            href={catalogHref}
            className="shrink-0 hover:text-rose transition-colors"
          >
            Catálogo
          </Link>
          <Link
            href={aboutHref}
            className="shrink-0 hover:text-rose transition-colors"
          >
            Sobre nosotros
          </Link>
          <Link
            href="/disena"
            className={`shrink-0 transition-colors ${
              pathname === "/disena"
                ? "text-rose font-medium"
                : "hover:text-rose"
            }`}
          >
            Diseña tu ramo
          </Link>
          <Link
            href="/blog"
            className={`shrink-0 transition-colors ${
              pathname === "/blog" || pathname?.startsWith("/blog/")
                ? "text-rose font-medium"
                : "hover:text-rose"
            }`}
          >
            Blog
          </Link>
          <Link
            href={contactHref}
            className="shrink-0 hover:text-rose transition-colors"
          >
            Contacto
          </Link>
        </nav>

        <div className="hidden md:block">{cartButton}</div>
      </div>
    </header>
  );
}
