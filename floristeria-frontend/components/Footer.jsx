import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left">
            <p className="font-serif text-foreground">Florería Lisianthus</p>
            <p className="text-sm text-muted mt-1">
              Entregas Lun-Sáb · 8:00 - 18:00
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted">
            <Link href="/#catalogo" className="hover:text-rose transition-colors">
              Catálogo
            </Link>
            <Link
              href="/#sobre-nosotros"
              className="hover:text-rose transition-colors"
            >
              Sobre nosotros
            </Link>
            <Link href="/disena" className="hover:text-rose transition-colors">
              Diseña tu ramo
            </Link>
            <Link href="/blog" className="hover:text-rose transition-colors">
              Blog
            </Link>
            <Link href="/#contacto" className="hover:text-rose transition-colors">
              Contacto
            </Link>
          </nav>

          <div className="flex flex-col items-center sm:items-end gap-3">
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/message/IDH6S3RXKNRUG1?src=qr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp de Florería Lisianthus"
                className="p-2 rounded-full bg-rose-light text-rose hover:bg-rose hover:text-white transition-colors"
              >
                <img
                  src="/images/whatzapp.jpg"
                  alt=""
                  className="h-5 w-5 rounded-full object-cover"
                />
              </a>
              <a
                href="https://www.tiktok.com/@lisianthusxela"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok de Florería Lisianthus"
                className="p-2 rounded-full bg-rose-light text-rose hover:bg-rose hover:text-white transition-colors"
              >
                <img
                  src="/images/tik tok.avif"
                  alt=""
                  className="h-5 w-5 rounded-full object-cover"
                />
              </a>
            </div>
            <p className="text-sm text-muted">
              © {new Date().getFullYear()} · Ciudad de Quetzaltenango, Guatemala
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
