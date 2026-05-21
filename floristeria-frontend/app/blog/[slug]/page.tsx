import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Clock, User } from "lucide-react";

import SiteShell from "@/components/SiteShell";
import BlogPostBody from "@/components/blog/BlogPostBody";
import BlogPostCTA from "@/components/blog/BlogPostCTA";
import BlogCard from "@/components/blog/BlogCard";
import {
  formatBlogDate,
  getAllPosts,
  getAllSlugs,
  getPostBySlug,
} from "@/lib/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Artículo no encontrado" };

  return {
    title: `${post.title} | Blog Florería Lisianthus`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);

  const morePosts =
    related.length >= 2
      ? related
      : getAllPosts().filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <SiteShell>
      <main className="bg-cream min-h-screen">
        <article>
          <div className="relative h-64 sm:h-80 lg:h-96">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>

          <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-16 relative">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm text-white/90 hover:text-white mb-6"
            >
              <ChevronLeft size={18} />
              Volver al blog
            </Link>

            <div className="bg-white rounded-3xl border border-border shadow-sm p-6 sm:p-10">
              <span className="text-rose text-sm font-medium">
                {post.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif mt-2 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mt-5 text-sm text-muted pb-8 border-b border-border">
                <span className="flex items-center gap-1.5">
                  <User size={16} />
                  {post.author}
                </span>
                <time dateTime={post.publishedAt}>
                  {formatBlogDate(post.publishedAt)}
                </time>
                <span className="flex items-center gap-1.5">
                  <Clock size={16} />
                  {post.readTime} min de lectura
                </span>
              </div>

              <BlogPostBody content={post.content} />
              <BlogPostCTA />
            </div>
          </div>
        </article>

        {morePosts.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
            <h2 className="font-serif text-2xl mb-6">También te puede interesar</h2>
            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl">
              {morePosts.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}
      </main>
    </SiteShell>
  );
}
