"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function BlogCategoryFilter({ categories }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("categoria") ?? "";

  function setCategory(category) {
    const params = new URLSearchParams(searchParams.toString());
    if (category) params.set("categoria", category);
    else params.delete("categoria");
    const query = params.toString();
    router.push(query ? `/blog?${query}` : "/blog", { scroll: false });
    router.refresh();
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button
        onClick={() => setCategory("")}
        className={`px-4 py-2 rounded-full text-sm transition-all ${
          active === ""
            ? "bg-rose text-white"
            : "bg-white border border-border text-muted hover:border-rose/40"
        }`}
      >
        Todos
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={`px-4 py-2 rounded-full text-sm transition-all ${
            active === cat
              ? "bg-rose text-white"
              : "bg-white border border-border text-muted hover:border-rose/40"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
