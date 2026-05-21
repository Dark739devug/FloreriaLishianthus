"use client";

const FILTER_OPTIONS = [
  { value: "", label: "Todos" },
  { value: "rosas", label: "Rosas" },
  { value: "girasoles", label: "Girasoles" },
  { value: "lisianthus", label: "Lisianthus" },
];

export default function Filters({ selectedType, setSelectedType }) {
  return (
    <aside className="w-full md:w-56 shrink-0">
      <div className="bg-white p-5 rounded-2xl border border-border shadow-sm md:sticky md:top-24">
        <h2 className="text-lg font-serif mb-4 text-foreground">Filtros</h2>
        <div className="flex md:flex-col gap-2 flex-wrap">
          {FILTER_OPTIONS.map(({ value, label }) => {
            const isActive = selectedType === value;
            return (
              <button
                key={value || "all"}
                onClick={() => setSelectedType(value)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  isActive
                    ? "bg-rose text-white shadow-sm"
                    : "bg-cream-dark text-muted hover:bg-rose-light hover:text-rose"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
