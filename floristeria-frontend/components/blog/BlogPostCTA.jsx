import Link from "next/link";
import { ArrowRight, Palette } from "lucide-react";

export default function BlogPostCTA() {
  return (
    <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-rose-light border border-rose/20 text-center">
      <h3 className="font-serif text-xl text-foreground">
        ¿Listo para hacer tu pedido?
      </h3>
      <p className="text-sm text-muted mt-2 max-w-md mx-auto">
        Explora nuestro catálogo o crea un ramo único con el diseñador
        interactivo.
      </p>
      <div className="flex flex-wrap justify-center gap-3 mt-5">
        <Link
          href="/#catalogo"
          className="inline-flex items-center gap-2 bg-rose text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-rose-dark transition-colors"
        >
          Ver catálogo
          <ArrowRight size={16} />
        </Link>
        <Link
          href="/disena"
          className="inline-flex items-center gap-2 bg-white text-rose border border-rose px-6 py-2.5 rounded-full text-sm font-medium hover:bg-white/80 transition-colors"
        >
          <Palette size={16} />
          Diseña tu ramo
        </Link>
      </div>
    </div>
  );
}
