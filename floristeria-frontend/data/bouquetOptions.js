export const ASSEMBLY_FEE = 120;

export const MIN_STEMS_RECOMMENDED = 5;

export const wrappingOptions = [
  {
    id: "kraft",
    label: "Papel kraft natural",
    description: "Estilo rústico y elegante",
    price: 0,
  },
  {
    id: "seda",
    label: "Papel de seda",
    description: "Acabado suave y romántico",
    price: 45,
  },
  {
    id: "premium",
    label: "Caja premium",
    description: "Presentación de regalo lista",
    price: 95,
  },
];

export const ribbonOptions = [
  { id: "ninguna", label: "Sin lazo extra", price: 0 },
  { id: "satén", label: "Cinta de satén", price: 25 },
  { id: "arpillera", label: "Lazo de arpillera", price: 35 },
];

export const bouquetExtras = [
  { id: "vela", label: "Vela artesanal", price: 80 },
  { id: "chocolates", label: "Chocolates gourmet", price: 65 },
  { id: "tarjeta", label: "Tarjeta impresa", price: 25 },
];

export const sizeLabels = [
  { min: 0, max: 7, label: "Mini", hint: "Añade más flores para un ramo mediano" },
  { min: 8, max: 14, label: "Mediano", hint: "Tamaño ideal para regalo" },
  { min: 15, max: 999, label: "Grande", hint: "Ramo espectacular" },
];

export function getBouquetSize(totalStems) {
  return (
    sizeLabels.find((s) => totalStems >= s.min && totalStems <= s.max) ??
    sizeLabels[0]
  );
}
