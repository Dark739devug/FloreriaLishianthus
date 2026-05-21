import Link from "next/link";

import SiteShell from "@/components/SiteShell";
import HomeCatalog from "@/components/HomeCatalog";
import DesignCTA from "@/components/DesignCTA";
import BlogPreview from "@/components/blog/BlogPreview";

export default function Home() {
  return (
    <SiteShell>
      <section className="relative bg-cream-dark overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/931162/pexels-photo-931162.jpeg')] bg-cover bg-center opacity-15" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <p className="text-rose text-sm font-medium tracking-widest uppercase mb-3">
            Flores frescas cada día
          </p>
          <h1 className="text-4xl sm:text-6xl font-serif text-foreground max-w-2xl mx-auto leading-tight">
            Regala momentos que florecen
          </h1>
          <p className="text-muted mt-4 max-w-lg mx-auto text-sm sm:text-base">
            Ramos artesanales con rosas, girasoles y lisianthus. Entrega el
            mismo día en la ciudad.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Link
              href="#catalogo"
              className="inline-block bg-rose text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-rose-dark transition-colors"
            >
              Ver catálogo
            </Link>
            <Link
              href="/disena"
              className="inline-block bg-white text-rose border border-rose px-8 py-3 rounded-full text-sm font-medium hover:bg-rose-light transition-colors"
            >
              Diseña tu ramo
            </Link>
          </div>
        </div>
      </section>

      <main className="bg-cream min-h-screen">
        <HomeCatalog />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <DesignCTA />
        </div>

        <BlogPreview />
      </main>
    </SiteShell>
  );
}
