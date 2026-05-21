import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/blog");

export function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) return [];

  const files = fs
    .readdirSync(postsDirectory)
    .filter(
      (file) =>
        file.endsWith(".md") &&
        !file.toUpperCase().startsWith("COMO")
    );

  const posts = files.map((file) => {
    const fullPath = path.join(postsDirectory, file);
    const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));
    const slug = data.slug ?? file.replace(/\.md$/, "");

    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      coverImage: data.coverImage,
      category: data.category,
      author: data.author ?? "Florería Lisianthus",
      publishedAt: data.publishedAt,
      featured: data.featured ?? false,
      readTime: data.readTime ?? estimateReadTime(content),
      content,
    };
  })
    .filter((post) => post.title && post.slug && post.publishedAt);

  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostBySlug(slug) {
  return getAllPosts().find((post) => post.slug === slug) ?? null;
}

export function getAllSlugs() {
  return getAllPosts().map((post) => post.slug);
}

export function getCategories() {
  const posts = getAllPosts();
  return [...new Set(posts.map((p) => p.category))].filter(Boolean);
}

export function formatBlogDate(dateString) {
  return new Date(dateString).toLocaleDateString("es-GT", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function estimateReadTime(content) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}
