import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left">
            <p className="font-serif text-foreground">Florería Lisianthus</p>
            <p className="text-sm text-muted mt-1">
              Entregas Lun–Sáb · 8:00 – 18:00
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted">
            <Link href="/#catalogo" className="hover:text-rose transition-colors">
              Catálogo
            </Link>
            <Link href="/disena" className="hover:text-rose transition-colors">
              Diseña tu ramo
            </Link>
            <Link href="/blog" className="hover:text-rose transition-colors">
              Blog
            </Link>
          </nav>

          <p className="text-sm text-muted">
            © {new Date().getFullYear()} · Ciudad de Guatemala
          </p>
        </div>
      </div>
    </footer>
  );
}
