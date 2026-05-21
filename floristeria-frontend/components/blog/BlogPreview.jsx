import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { getAllPosts, formatBlogDate } from "@/lib/blog";

export default function BlogPreview() {
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-rose text-sm font-medium mb-2">
            <BookOpen size={18} />
            Blog & inspiración
          </div>
          <h2 className="text-3xl font-serif">Ideas para regalar mejor</h2>
          <p className="text-muted text-sm mt-1">
            Consejos, tendencias y guías de nuestra floristería
          </p>
        </div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-rose text-sm font-medium hover:underline shrink-0"
        >
          Ver todos los artículos
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-md transition-all"
          >
            <div className="h-40 overflow-hidden">
              <img
                src={post.coverImage}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <span className="text-xs text-rose font-medium">
                {post.category}
              </span>
              <h3 className="font-serif mt-1 group-hover:text-rose transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-xs text-muted mt-2">
                {formatBlogDate(post.publishedAt)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
