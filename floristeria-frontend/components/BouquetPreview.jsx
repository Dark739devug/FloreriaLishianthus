"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import {
  Flower2,
  Leaf,
  Move,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Layers,
  Undo2,
} from "lucide-react";
import {
  buildBouquetStems,
  defaultStemTransform,
  layoutBouquet,
  FLOWER_HEIGHT,
} from "@/lib/bouquetLayout";

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export default function BouquetPreview({
  stemList,
  sizeLabel,
  totalStems,
}) {
  const canvasRef = useRef(null);
  const [overrides, setOverrides] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const dragRef = useRef(null);

  const { foliage, flowers } = useMemo(
    () => buildBouquetStems(stemList),
    [stemList]
  );

  const layouts = useMemo(
    () => layoutBouquet({ foliage, flowers }),
    [foliage, flowers]
  );

  const layoutKey = layouts.map((l) => l.id).join("|");

  const defaultTransforms = useMemo(() => {
    const defaults = {};
    layouts.forEach((layout) => {
      defaults[layout.id] = defaultStemTransform(layout);
    });
    return defaults;
  }, [layoutKey]);

  const transforms = useMemo(() => {
    const merged = { ...defaultTransforms };
    for (const id of Object.keys(overrides)) {
      if (merged[id]) {
        merged[id] = { ...merged[id], ...overrides[id] };
      }
    }
    return merged;
  }, [defaultTransforms, overrides]);

  const hasStems = layouts.length > 0;

  const updateTransform = useCallback((id, patch) => {
    setOverrides((prev) => ({
      ...prev,
      [id]: { ...(prev[id] ?? {}), ...patch },
    }));
  }, []);

  const resetPositions = useCallback(() => {
    setOverrides({});
    setSelectedId(null);
  }, []);

  const bringToFront = useCallback(
    (id) => {
      const maxZ = Math.max(
        ...Object.values(transforms).map((t) => t.zIndex ?? 0),
        0
      );
      updateTransform(id, { zIndex: maxZ + 1 });
    },
    [transforms, updateTransform]
  );

  const handlePointerDown = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedId(id);
    bringToFront(id);
    const origin = transforms[id];
    if (!origin) return;

    dragRef.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      origin,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!dragRef.current || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const dx = ((e.clientX - dragRef.current.startX) / rect.width) * 100;
    const dy = ((e.clientY - dragRef.current.startY) / rect.height) * 100;
    const { id, origin } = dragRef.current;

    updateTransform(id, {
      x: clamp(origin.x + dx, 5, 95),
      y: clamp(origin.y + dy, 15, 92),
    });
  };

  const handlePointerUp = (e) => {
    dragRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  };

  const selectedTransform = selectedId ? transforms[selectedId] : null;

  return (
    <div className="flex flex-col gap-3">
      {hasStems && (
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted px-1">
          <span className="inline-flex items-center gap-1.5">
            <Move size={14} className="text-rose" />
            Arrastra para mover · selecciona para agrandar
          </span>
          <button
            type="button"
            onClick={resetPositions}
            className="inline-flex items-center gap-1 text-rose hover:underline"
          >
            <Undo2 size={12} />
            Restablecer diseño
          </button>
        </div>
      )}

      <div
        ref={canvasRef}
        onClick={() => setSelectedId(null)}
        className="relative rounded-2xl overflow-hidden border border-border bg-gradient-to-b from-[#faf7f3] via-[#f5efe8] to-[#e8dfd4] min-h-[400px] sm:min-h-[480px] lg:min-h-[540px] touch-none select-none"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 75% 60% at 50% 45%, rgba(255,255,255,0.75) 0%, transparent 70%)",
          }}
        />

        {!hasStems ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10">
            <div className="w-20 h-20 rounded-full bg-white/80 border border-border flex items-center justify-center mb-4">
              <Flower2 className="text-rose/40" size={40} />
            </div>
            <p className="font-serif text-xl text-foreground">
              Tu ramo aparecerá aquí
            </p>
            <p className="text-sm text-muted mt-2 max-w-[280px]">
              Añade flores y follaje. Luego podrás moverlas y cambiar su tamaño.
            </p>
          </div>
        ) : (
          <>
            <div
              className="absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
              style={{
                width: "65%",
                height: "30%",
                bottom: "12%",
                background:
                  "radial-gradient(ellipse at center, rgba(0,0,0,0.06) 0%, transparent 70%)",
              }}
            />

            <div
              className="absolute left-1/2 -translate-x-1/2 z-10 pointer-events-none"
              style={{ bottom: "10%" }}
            >
              <div className="w-3 h-10 bg-gradient-to-b from-[#c4a882] to-[#a08060] rounded-full shadow-sm" />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-9 h-3 bg-[#8b7355] rounded-full opacity-80" />
            </div>

            {layouts.map((layout) => {
              const t = transforms[layout.id] ?? defaultStemTransform(layout);
              const isSelected = selectedId === layout.id;
              const baseHeight =
                FLOWER_HEIGHT[layout.flowerId] ?? FLOWER_HEIGHT.default;

              return (
                <div
                  key={layout.id}
                  role="button"
                  tabIndex={0}
                  onClick={(e) => e.stopPropagation()}
                  onPointerDown={(e) => handlePointerDown(e, layout.id)}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  className={`absolute touch-none ${
                    isSelected
                      ? "ring-2 ring-rose/60 ring-offset-2 ring-offset-transparent rounded-lg"
                      : ""
                  }`}
                  style={{
                    left: `${t.x}%`,
                    top: `${t.y}%`,
                    zIndex: isSelected ? 999 : (t.zIndex ?? 10),
                    transform: `translate(-50%, -100%) rotate(${t.rotation}deg) scale(${t.scale})`,
                    transformOrigin: "bottom center",
                    cursor:
                      dragRef.current?.id === layout.id ? "grabbing" : "grab",
                  }}
                >
                  <img
                    src={layout.img}
                    alt=""
                    draggable={false}
                    className="object-contain pointer-events-none drop-shadow-[0_6px_18px_rgba(0,0,0,0.18)]"
                    style={{
                      height: baseHeight,
                      width: "auto",
                      opacity: layout.isFoliage ? 0.92 : 1,
                    }}
                  />

                  {isSelected && (
                    <div
                      className="absolute -right-2 -bottom-2 w-5 h-5 bg-rose rounded-full border-2 border-white shadow-md pointer-events-none"
                      title="Seleccionado"
                    />
                  )}
                </div>
              );
            })}
          </>
        )}

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-[1000] pointer-events-none">
          <div className="flex items-center gap-2 bg-black/45 backdrop-blur-sm rounded-full px-3 py-1.5 text-white">
            <Flower2 size={15} />
            <span className="font-serif text-sm">{sizeLabel}</span>
            {totalStems > 0 && (
              <span className="text-xs opacity-90">· {totalStems} tallos</span>
            )}
          </div>
          {hasStems && (
            <span className="text-xs bg-black/45 backdrop-blur-sm text-white rounded-full px-2.5 py-1 flex items-center gap-1">
              <Leaf size={12} />
              Vista previa
            </span>
          )}
        </div>
      </div>

      {selectedId && selectedTransform && (
        <div className="flex flex-wrap items-center gap-2 p-3 bg-white rounded-xl border border-rose/30 shadow-sm">
          <span className="text-xs font-medium text-muted w-full sm:w-auto">
            Flor seleccionada
          </span>
          <button
            type="button"
            onClick={() =>
              updateTransform(selectedId, {
                scale: clamp(selectedTransform.scale - 0.1, 0.4, 2.2),
              })
            }
            className="p-2 rounded-lg border border-border hover:bg-cream"
            aria-label="Reducir tamaño"
          >
            <ZoomOut size={16} />
          </button>
          <button
            type="button"
            onClick={() =>
              updateTransform(selectedId, {
                scale: clamp(selectedTransform.scale + 0.1, 0.4, 2.2),
              })
            }
            className="p-2 rounded-lg border border-border hover:bg-cream"
            aria-label="Aumentar tamaño"
          >
            <ZoomIn size={16} />
          </button>
          <button
            type="button"
            onClick={() =>
              updateTransform(selectedId, {
                rotation: selectedTransform.rotation - 15,
              })
            }
            className="p-2 rounded-lg border border-border hover:bg-cream"
            aria-label="Girar izquierda"
          >
            <RotateCcw size={16} />
          </button>
          <button
            type="button"
            onClick={() =>
              updateTransform(selectedId, {
                rotation: selectedTransform.rotation + 15,
              })
            }
            className="p-2 rounded-lg border border-border hover:bg-cream"
            aria-label="Girar derecha"
          >
            <RotateCcw size={16} className="scale-x-[-1]" />
          </button>
          <button
            type="button"
            onClick={() => bringToFront(selectedId)}
            className="p-2 rounded-lg border border-border hover:bg-cream"
            aria-label="Traer al frente"
          >
            <Layers size={16} />
          </button>
          <span className="text-xs text-muted ml-auto">
            {Math.round(selectedTransform.scale * 100)}%
          </span>
        </div>
      )}
    </div>
  );
}
