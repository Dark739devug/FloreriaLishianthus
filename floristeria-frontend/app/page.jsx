import Link from "next/link";
import {
  HeartHandshake,
  Sparkles,
  Truck,
} from "lucide-react";

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

        <section id="sobre-nosotros" className="bg-white border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
              <div>
                <p className="text-rose text-sm font-medium tracking-widest uppercase mb-3">
                  Sobre nosotros
                </p>
                <h2 className="font-serif text-3xl sm:text-5xl text-foreground leading-tight">
                  Arreglos florales hechos con cuidado en Quetzaltenango
                </h2>
                <p className="text-muted mt-5 max-w-2xl">
                  En Florería Lisianthus creamos ramos frescos para regalar,
                  celebrar y acompañar momentos especiales. Combinamos flores de
                  temporada, colores delicados y detalles personalizados para que
                  cada entrega se sienta cercana y memorable.
                </p>
              </div>

              <div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-4">
                <div className="border border-border rounded-lg p-5 bg-cream">
                  <Sparkles
                    className="text-rose mb-3"
                    size={24}
                    strokeWidth={1.7}
                  />
                  <h3 className="font-medium text-foreground">
                    Diseño con detalle
                  </h3>
                  <p className="text-sm text-muted mt-2">
                    Ramos preparados según la ocasión, el mensaje y tus colores
                    favoritos.
                  </p>
                </div>
                <div className="border border-border rounded-lg p-5 bg-cream">
                  <Truck
                    className="text-rose mb-3"
                    size={24}
                    strokeWidth={1.7}
                  />
                  <h3 className="font-medium text-foreground">Entrega local</h3>
                  <p className="text-sm text-muted mt-2">
                    Coordinamos entregas en la ciudad para que tus flores
                    lleguen a tiempo.
                  </p>
                </div>
                <div className="border border-border rounded-lg p-5 bg-cream">
                  <HeartHandshake
                    className="text-rose mb-3"
                    size={24}
                    strokeWidth={1.7}
                  />
                  <h3 className="font-medium text-foreground">
                    Atención cercana
                  </h3>
                  <p className="text-sm text-muted mt-2">
                    Te ayudamos a elegir el arreglo ideal si necesitas una
                    recomendación.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="bg-cream-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-center">
              <div>
                <p className="text-rose text-sm font-medium tracking-widest uppercase mb-3">
                  Contacto
                </p>
                <h2 className="font-serif text-3xl sm:text-5xl text-foreground leading-tight">
                  Hablemos de tu próximo ramo
                </h2>
                <p className="text-muted mt-5 max-w-xl">
                  Escríbenos por WhatsApp para cotizar, confirmar disponibilidad
                  o pedir una recomendación. También puedes seguirnos en TikTok
                  para ver arreglos, ideas de regalos y novedades.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <a
                  href="https://wa.me/message/IDH6S3RXKNRUG1?src=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border border-border rounded-lg bg-white p-6 hover:border-rose hover:shadow-sm transition-all"
                >
                  <img
                    src="/images/whatzapp.jpg"
                    alt=""
                    className="mb-4 h-10 w-10 rounded-full object-cover"
                  />
                  <h3 className="font-serif text-2xl text-foreground">
                    WhatsApp
                  </h3>
                  <p className="text-sm text-muted mt-2">
                    Pedidos, cotizaciones y entregas por mensaje directo.
                  </p>
                  <span className="inline-flex mt-5 text-sm font-medium text-rose group-hover:text-rose-dark">
                    Escribir ahora
                  </span>
                </a>

                <a
                  href="https://www.tiktok.com/@lisianthusxela"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border border-border rounded-lg bg-white p-6 hover:border-rose hover:shadow-sm transition-all"
                >
                  <img
                    src="/images/tik tok.avif"
                    alt=""
                    className="mb-4 h-10 w-10 rounded-full object-cover"
                  />
                  <h3 className="font-serif text-2xl text-foreground">TikTok</h3>
                  <p className="text-sm text-muted mt-2">
                    Sigue nuestras flores, estilos y creaciones recientes.
                  </p>
                  <span className="inline-flex mt-5 text-sm font-medium text-rose group-hover:text-rose-dark">
                    Ver perfil
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <BlogPreview />
      </main>
    </SiteShell>
  );
}
