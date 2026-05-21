"use client";

import { useMemo, useState } from "react";
import {
  Minus,
  Plus,
  RotateCcw,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { flowerCatalog } from "@/data/flowers";
import {
  ASSEMBLY_FEE,
  MIN_STEMS_RECOMMENDED,
  bouquetExtras,
  getBouquetSize,
  ribbonOptions,
  wrappingOptions,
} from "@/data/bouquetOptions";
import { formatPrice } from "@/lib/formatPrice";
import { useCartStore } from "@/store/cartStore";
import BouquetPreview from "@/components/BouquetPreview";
import FlowerPickerCard from "@/components/FlowerPickerCard";

function stemKey(flowerId, colorId) {
  return `${flowerId}-${colorId}`;
}

export default function BouquetDesigner() {
  const addToCart = useCartStore((state) => state.addToCart);

  const [stems, setStems] = useState({});
  const [colorPick, setColorPick] = useState(() => {
    const initial = {};
    flowerCatalog.forEach((f) => {
      initial[f.id] = f.colors[0].id;
    });
    return initial;
  });
  const [wrapping, setWrapping] = useState("kraft");
  const [ribbon, setRibbon] = useState("ninguna");
  const [extras, setExtras] = useState([]);
  const [message, setMessage] = useState("");
  const [bouquetName, setBouquetName] = useState("Mi ramo especial");
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("flores");
  const [previewResetKey, setPreviewResetKey] = useState(0);

  const stemList = useMemo(() => {
    return Object.entries(stems)
      .map(([key, qty]) => {
        const flower = flowerCatalog.find((f) =>
          key.startsWith(`${f.id}-`)
        );
        if (!flower) return null;
        const colorId = key.slice(flower.id.length + 1);
        const color = flower.colors.find((c) => c.id === colorId);
        if (!color) return null;
        return { key, flower, color, quantity: qty };
      })
      .filter(Boolean);
  }, [stems]);

  const totalStems = stemList.reduce((sum, item) => sum + item.quantity, 0);
  const stemsTotal = stemList.reduce(
    (sum, item) => sum + item.flower.pricePerStem * item.quantity,
    0
  );
  const wrapPrice =
    wrappingOptions.find((w) => w.id === wrapping)?.price ?? 0;
  const ribbonPrice =
    ribbonOptions.find((r) => r.id === ribbon)?.price ?? 0;
  const extrasTotal = extras.reduce(
    (sum, id) =>
      sum + (bouquetExtras.find((e) => e.id === id)?.price ?? 0),
    0
  );
  const hasFlowers = totalStems > 0;
  const totalPrice =
    (hasFlowers ? ASSEMBLY_FEE : 0) +
    stemsTotal +
    wrapPrice +
    ribbonPrice +
    extrasTotal;

  const previewImg =
    stemList.find((s) => s.flower.category !== "follaje")?.color.img ??
    stemList[0]?.color.img ??
    "/images/rosa-roja.png";

  const sizeInfo = getBouquetSize(totalStems);

  const flowersOnly = flowerCatalog.filter((f) => f.category !== "follaje");
  const foliageOnly = flowerCatalog.filter((f) => f.category === "follaje");

  function getQtyInBouquet(flowerId, colorId) {
    return stems[stemKey(flowerId, colorId)] ?? 0;
  }

  function addStem(flowerId) {
    const colorId = colorPick[flowerId];
    const key = stemKey(flowerId, colorId);
    setStems((prev) => ({ ...prev, [key]: (prev[key] ?? 0) + 1 }));
  }

  function updateStemQty(key, delta) {
    setStems((prev) => {
      const next = { ...prev };
      const newQty = (next[key] ?? 0) + delta;
      if (newQty <= 0) delete next[key];
      else next[key] = newQty;
      return next;
    });
  }

  function toggleExtra(id) {
    setExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  }

  function resetDesign() {
    setStems({});
    setWrapping("kraft");
    setRibbon("ninguna");
    setExtras([]);
    setMessage("");
    setBouquetName("Mi ramo especial");
    setPreviewResetKey((k) => k + 1);
  }

  function handleAddToCart() {
    if (!hasFlowers) return;

    const flowerSummary = stemList
      .map((s) => `${s.quantity}× ${s.flower.name} ${s.color.name}`)
      .join(", ");

    const wrapLabel = wrappingOptions.find((w) => w.id === wrapping)?.label;
    const ribbonLabel = ribbonOptions.find((r) => r.id === ribbon)?.label;
    const extraLabels = extras
      .map((id) => bouquetExtras.find((e) => e.id === id)?.label)
      .filter(Boolean)
      .join(", ");

    const descParts = [
      flowerSummary,
      wrapLabel && `Envoltorio: ${wrapLabel}`,
      ribbonLabel && ribbon !== "ninguna" && `Lazo: ${ribbonLabel}`,
      extraLabels && `Extras: ${extraLabels}`,
      message && `Mensaje: "${message.slice(0, 60)}${message.length > 60 ? "…" : ""}"`,
    ].filter(Boolean);

    addToCart({
      id: `custom-${Date.now()}`,
      name: bouquetName.trim() || "Ramo personalizado",
      desc: descParts.join(" · "),
      price: totalPrice,
      type: "personalizado",
      img: previewImg,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const tabs = [
    { id: "flores", label: "Flores" },
    { id: "envoltorio", label: "Envoltorio" },
    { id: "detalles", label: "Detalles" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="text-center mb-10">
        <p className="text-rose text-sm font-medium tracking-wide uppercase mb-2">
          Crea a tu medida
        </p>
        <h1 className="text-3xl sm:text-5xl font-serif">Diseña tu ramo</h1>
        <p className="text-muted mt-3 max-w-xl mx-auto text-sm">
          Elige cada flor, su color y cantidad. Personaliza el envoltorio y
          añade un mensaje especial.
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(380px,520px)] gap-8 lg:gap-10 items-start">
        <div className="min-w-0">
          <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-rose text-white"
                    : "bg-white border border-border text-muted hover:border-rose/40"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "flores" && (
            <div className="space-y-8">
              <section>
                <h3 className="font-serif text-xl mb-1">Flores</h3>
                <p className="text-sm text-muted mb-4">
                  Elige tipo y color; cada tallo se suma a tu ramo.
                </p>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {flowersOnly.map((flower) => {
                    const selectedColorId = colorPick[flower.id];
                    const selectedColor = flower.colors.find(
                      (c) => c.id === selectedColorId
                    );

                    return (
                      <FlowerPickerCard
                        key={flower.id}
                        flower={flower}
                        selectedColor={selectedColor}
                        selectedColorId={selectedColorId}
                        quantityInBouquet={getQtyInBouquet(
                          flower.id,
                          selectedColorId
                        )}
                        onColorChange={(colorId) =>
                          setColorPick((prev) => ({
                            ...prev,
                            [flower.id]: colorId,
                          }))
                        }
                        onAdd={() => addStem(flower.id)}
                      />
                    );
                  })}
                </div>
              </section>

              {foliageOnly.length > 0 && (
                <section>
                  <h3 className="font-serif text-xl mb-1">Follaje</h3>
                  <p className="text-sm text-muted mb-4">
                    Completa el ramo con verdes y textura.
                  </p>
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {foliageOnly.map((flower) => {
                      const selectedColorId = colorPick[flower.id];
                      const selectedColor = flower.colors.find(
                        (c) => c.id === selectedColorId
                      );

                      return (
                        <FlowerPickerCard
                          key={flower.id}
                          flower={flower}
                          selectedColor={selectedColor}
                          selectedColorId={selectedColorId}
                          quantityInBouquet={getQtyInBouquet(
                            flower.id,
                            selectedColorId
                          )}
                          onColorChange={(colorId) =>
                            setColorPick((prev) => ({
                              ...prev,
                              [flower.id]: colorId,
                            }))
                          }
                          onAdd={() => addStem(flower.id)}
                        />
                      );
                    })}
                  </div>
                </section>
              )}
            </div>
          )}

          {activeTab === "envoltorio" && (
            <div className="space-y-6">
              <section>
                <h3 className="font-serif text-xl mb-4">Tipo de envoltorio</h3>
                <div className="space-y-3">
                  {wrappingOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setWrapping(opt.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all ${
                        wrapping === opt.id
                          ? "border-rose bg-rose-light"
                          : "border-border bg-white hover:border-rose/30"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{opt.label}</p>
                          <p className="text-sm text-muted mt-0.5">
                            {opt.description}
                          </p>
                        </div>
                        <span className="text-sm text-rose shrink-0 ml-3">
                          {opt.price === 0
                            ? "Incluido"
                            : `+${formatPrice(opt.price)}`}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="font-serif text-xl mb-4">Lazo y cinta</h3>
                <div className="space-y-2">
                  {ribbonOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setRibbon(opt.id)}
                      className={`w-full flex justify-between items-center px-4 py-3 rounded-xl border transition-all ${
                        ribbon === opt.id
                          ? "border-rose bg-rose-light"
                          : "border-border bg-white"
                      }`}
                    >
                      <span className="text-sm font-medium">{opt.label}</span>
                      <span className="text-sm text-muted">
                        {opt.price === 0
                          ? "—"
                          : `+${formatPrice(opt.price)}`}
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === "detalles" && (
            <div className="space-y-6">
              <section className="bg-white p-5 rounded-2xl border border-border">
                <label className="block font-serif text-lg mb-2">
                  Nombre de tu ramo
                </label>
                <input
                  type="text"
                  value={bouquetName}
                  onChange={(e) => setBouquetName(e.target.value)}
                  maxLength={40}
                  placeholder="Ej. Ramo para mamá"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-cream text-sm focus:outline-none focus:border-rose"
                />
              </section>

              <section className="bg-white p-5 rounded-2xl border border-border">
                <label className="block font-serif text-lg mb-2">
                  Mensaje en tarjeta
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={200}
                  rows={4}
                  placeholder="Escribe el mensaje que quieres incluir…"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-cream text-sm resize-none focus:outline-none focus:border-rose"
                />
                <p className="text-xs text-muted mt-1 text-right">
                  {message.length}/200
                </p>
              </section>

              <section>
                <h3 className="font-serif text-xl mb-4">Extras</h3>
                <div className="space-y-2">
                  {bouquetExtras.map((extra) => {
                    const isSelected = extras.includes(extra.id);
                    return (
                      <button
                        key={extra.id}
                        onClick={() => toggleExtra(extra.id)}
                        className={`w-full flex justify-between items-center px-4 py-3 rounded-xl border transition-all ${
                          isSelected
                            ? "border-rose bg-rose-light"
                            : "border-border bg-white"
                        }`}
                      >
                        <span className="text-sm font-medium">
                          {extra.label}
                        </span>
                        <span className="text-sm">
                          +{formatPrice(extra.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>
          )}
        </div>

        <aside className="lg:sticky lg:top-20 space-y-4 order-first lg:order-last">
          <div className="bg-white rounded-2xl border border-border shadow-sm p-3 sm:p-4">
            <h2 className="font-serif text-lg mb-3 hidden lg:block">
              Arma tu ramo
            </h2>
            <BouquetPreview
              key={previewResetKey}
              stemList={stemList}
              sizeLabel={sizeInfo.label}
              totalStems={totalStems}
            />
          </div>

          <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
            <h2 className="font-serif text-xl flex items-center gap-2">
              <Sparkles size={18} className="text-rose" />
              Composición
            </h2>

            {stemList.length === 0 ? (
              <p className="text-sm text-muted mt-4 py-6 text-center border border-dashed border-border rounded-xl">
                Aún no has añadido flores. Ve a la pestaña Flores y elige
                tus favoritas.
              </p>
            ) : (
              <ul className="mt-4 space-y-3 max-h-52 overflow-y-auto">
                {stemList.map((item) => (
                  <li
                    key={item.key}
                    className="flex items-center gap-3 text-sm"
                  >
                    <img
                      src={item.color.img || item.flower.img}
                      alt=""
                      className="w-10 h-10 object-contain shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium truncate">
                        {item.flower.name}{" "}
                        <span className="text-muted font-normal">
                          {item.color.name}
                        </span>
                      </p>
                      <p className="text-xs text-muted">
                        {formatPrice(item.flower.pricePerStem)} c/u
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => updateStemQty(item.key, -1)}
                        className="p-1 rounded-full hover:bg-cream-dark"
                        aria-label="Quitar tallo"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-5 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateStemQty(item.key, 1)}
                        className="p-1 rounded-full hover:bg-cream-dark"
                        aria-label="Añadir tallo"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {hasFlowers && totalStems < MIN_STEMS_RECOMMENDED && (
              <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mt-3">
                Recomendamos al menos {MIN_STEMS_RECOMMENDED} tallos para un
                ramo equilibrado.
              </p>
            )}

            {hasFlowers && (
              <p className="text-xs text-muted mt-3">{sizeInfo.hint}</p>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
            <div className="space-y-2 text-sm text-muted">
              {hasFlowers && (
                <div className="flex justify-between">
                  <span>Arreglo y mano de obra</span>
                  <span>{formatPrice(ASSEMBLY_FEE)}</span>
                </div>
              )}
              {stemsTotal > 0 && (
                <div className="flex justify-between">
                  <span>Flores ({totalStems} tallos)</span>
                  <span>{formatPrice(stemsTotal)}</span>
                </div>
              )}
              {wrapPrice > 0 && (
                <div className="flex justify-between">
                  <span>Envoltorio</span>
                  <span>+{formatPrice(wrapPrice)}</span>
                </div>
              )}
              {ribbonPrice > 0 && (
                <div className="flex justify-between">
                  <span>Lazo</span>
                  <span>+{formatPrice(ribbonPrice)}</span>
                </div>
              )}
              {extrasTotal > 0 && (
                <div className="flex justify-between">
                  <span>Extras</span>
                  <span>+{formatPrice(extrasTotal)}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between font-serif text-2xl text-rose mt-4 pt-4 border-t border-border">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!hasFlowers || added}
              className="mt-4 w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-medium transition-all bg-rose text-white hover:bg-rose-dark disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ShoppingBag size={18} />
              {added ? "¡Añadido al carrito!" : "Añadir al carrito"}
            </button>

            <button
              onClick={resetDesign}
              className="mt-2 w-full flex items-center justify-center gap-2 py-2 text-sm text-muted hover:text-rose transition-colors"
            >
              <RotateCcw size={14} />
              Empezar de nuevo
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
