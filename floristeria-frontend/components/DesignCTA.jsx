import Link from "next/link";
import { Palette, ArrowRight } from "lucide-react";

export default function DesignCTA() {
  return (
    <section className="mt-4 bg-white rounded-3xl border border-border overflow-hidden shadow-sm">
      <div className="grid md:grid-cols-2 items-center">
        <div
          className="h-56 md:h-full min-h-[220px] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/34701067/pexels-photo-34701067.jpeg')",
          }}
        />
        <div className="p-8 sm:p-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-rose text-sm font-medium mb-3">
            <Palette size={18} />
            Experiencia interactiva
          </div>
          <h2 className="text-3xl font-serif">Diseña tu ramo</h2>
          <p className="text-muted mt-3 text-sm max-w-md">
            Elige flores, colores y cantidad. Personaliza el envoltorio, añade
            un mensaje y crea un ramo único.
          </p>
          <Link
            href="/disena"
            className="inline-flex items-center gap-2 mt-6 bg-rose text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-rose-dark transition-colors"
          >
            Ir al diseñador
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
