"use client";

export default function Filters({
  selectedType,
  setSelectedType,
}) {

  return (
    <aside className="w-full md:w-64">

      <div className="bg-white p-5 rounded-2xl shadow-sm">

        <h2 className="text-2xl font-serif mb-4">
          Filtros
        </h2>

        <div className="space-y-3">

          <button
            onClick={() => setSelectedType("")}
            className="block"
          >
            Todos
          </button>

          <button
            onClick={() =>
              setSelectedType("rosas")
            }
            className="block"
          >
            Rosas
          </button>

          <button
            onClick={() =>
              setSelectedType("girasoles")
            }
            className="block"
          >
            Girasoles
          </button>

          <button
            onClick={() =>
              setSelectedType("lisianthus")
            }
            className="block"
          >
            Lisianthus
          </button>

        </div>

      </div>

    </aside>
  );
}