import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { formatBlogDate } from "@/lib/blog";

export default function BlogCard({ post, featured = false }) {
  if (featured) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group block bg-white rounded-3xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow md:grid md:grid-cols-2"
      >
        <div className="relative h-64 md:h-full min-h-[280px]">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-4 left-4 bg-rose text-white text-xs font-medium px-3 py-1 rounded-full">
            Destacado
          </span>
        </div>
        <div className="p-8 flex flex-col justify-center">
          <span className="text-rose text-sm font-medium">{post.category}</span>
          <h2 className="text-2xl sm:text-3xl font-serif mt-2 group-hover:text-rose transition-colors">
            {post.title}
          </h2>
          <p className="text-muted mt-3 line-clamp-3">{post.excerpt}</p>
          <div className="flex items-center gap-4 mt-5 text-sm text-muted">
            <time dateTime={post.publishedAt}>
              {formatBlogDate(post.publishedAt)}
            </time>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {post.readTime} min
            </span>
          </div>
          <span className="inline-flex items-center gap-1 mt-6 text-rose text-sm font-medium">
            Leer artículo <ArrowRight size={16} />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-medium px-2.5 py-1 rounded-full text-sage">
          {post.category}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif text-lg group-hover:text-rose transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-muted mt-2 line-clamp-2 flex-1">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border text-xs text-muted">
          <time dateTime={post.publishedAt}>
            {formatBlogDate(post.publishedAt)}
          </time>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {post.readTime} min
          </span>
        </div>
      </div>
    </Link>
  );
}
