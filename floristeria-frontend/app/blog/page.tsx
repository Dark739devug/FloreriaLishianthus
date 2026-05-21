import { Suspense } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";

import SiteShell from "@/components/SiteShell";
import BlogCard from "@/components/blog/BlogCard";
import BlogCategoryFilter from "@/components/blog/BlogCategoryFilter";
import { getAllPosts, getCategories } from "@/lib/blog";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ categoria?: string }>;
};

export default async function BlogPage({ searchParams }: Props) {
  const { categoria } = await searchParams;
  const allPosts = getAllPosts();
  const categories = getCategories();

  const posts = categoria
    ? allPosts.filter((p) => p.category === categoria)
    : allPosts;

  const showFeatured = !categoria;
  const featuredPost = showFeatured
    ? (posts.find((p) => p.featured) ?? posts[0])
    : null;
  const gridPosts =
    featuredPost && showFeatured
      ? posts.filter((p) => p.slug !== featuredPost.slug)
      : posts;

  return (
    <SiteShell>
      <main className="bg-cream min-h-screen">
        <section className="bg-cream-dark border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20 text-center">
            <div className="inline-flex items-center gap-2 text-rose text-sm font-medium mb-3">
              <BookOpen size={18} />
              Blog & inspiración
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif max-w-2xl mx-auto">
              Ideas que inspiran a regalar
            </h1>
            <p className="text-muted mt-4 max-w-lg mx-auto text-sm sm:text-base">
              Tendencias, consejos de cuidado y guías para elegir el ramo
              perfecto en cada ocasión.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <Suspense fallback={<div className="h-10" />}>
            <BlogCategoryFilter categories={categories} />
          </Suspense>

          {posts.length === 0 ? (
            <div className="text-center py-20 mt-10">
              <p className="font-serif text-xl">No hay artículos en esta categoría</p>
              <Link href="/blog" className="text-rose text-sm mt-3 inline-block hover:underline">
                Ver todos los artículos
              </Link>
            </div>
          ) : (
            <div className="mt-10 space-y-10">
              {featuredPost && showFeatured && (
                <BlogCard post={featuredPost} featured />
              )}

              {gridPosts.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gridPosts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </SiteShell>
  );
}
