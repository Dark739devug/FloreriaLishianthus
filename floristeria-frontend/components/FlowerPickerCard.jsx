"use client";

import { Plus, Check } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";

export default function FlowerPickerCard({
  flower,
  selectedColor,
  selectedColorId,
  onColorChange,
  onAdd,
  quantityInBouquet = 0,
}) {
  const imageSrc = selectedColor?.img || flower.img;

  return (
    <article className="group bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md hover:border-rose/30 transition-all">
      <div className="relative aspect-[5/6] bg-gradient-to-b from-white via-cream to-cream-dark flex items-center justify-center overflow-hidden">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={`${flower.name} ${selectedColor?.name ?? ""}`}
            className="h-[88%] w-auto max-w-[92%] object-contain object-bottom drop-shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="text-muted text-sm">Sin imagen</div>
        )}

        <span className="absolute top-3 right-3 bg-white/95 backdrop-blur text-xs px-2.5 py-1 rounded-full font-medium text-rose shadow-sm">
          {formatPrice(flower.pricePerStem)}/tallo
        </span>

        {flower.category === "follaje" && (
          <span className="absolute top-3 left-3 bg-sage/90 text-white text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full font-medium">
            Follaje
          </span>
        )}

        {quantityInBouquet > 0 && (
          <span className="absolute bottom-3 right-3 bg-rose text-white text-xs font-semibold min-w-7 h-7 px-2 rounded-full flex items-center justify-center shadow-md">
            {quantityInBouquet}
          </span>
        )}
      </div>

      <div className="p-4 border-t border-border/60">
        <h3 className="font-serif text-lg text-foreground">{flower.name}</h3>

        {flower.colors.length > 1 ? (
          <div className="flex flex-wrap items-center gap-2 mt-3">
            {flower.colors.map((color) => (
              <button
                key={color.id}
                type="button"
                onClick={() => onColorChange(color.id)}
                title={color.name}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  selectedColorId === color.id
                    ? "border-rose scale-110 ring-2 ring-rose/20"
                    : "border-white ring-1 ring-border hover:scale-105"
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
            <span className="text-xs text-muted">{selectedColor?.name}</span>
          </div>
        ) : (
          <p className="text-xs text-muted mt-1">{selectedColor?.name}</p>
        )}

        <button
          type="button"
          onClick={onAdd}
          className={`mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-medium transition-all ${
            quantityInBouquet > 0
              ? "bg-rose-light border border-rose text-rose hover:bg-rose hover:text-white"
              : "border border-rose text-rose hover:bg-rose hover:text-white"
          }`}
        >
          {quantityInBouquet > 0 ? (
            <>
              <Check size={16} />
              Añadir otro tallo
            </>
          ) : (
            <>
              <Plus size={16} />
              Añadir al ramo
            </>
          )}
        </button>
      </div>
    </article>
  );
}
