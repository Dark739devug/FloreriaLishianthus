export const FLOWER_HEIGHT = {
  girasol: 185,
  hortensia: 175,
  rosa: 168,
  lisianthus: 160,
  clavel: 150,
  margarita: 138,
  eucalipto: 125,
  default: 158,
};

const MAX_STEMS_VISIBLE = 32;

export function buildBouquetStems(stemList) {
  const stems = [];

  stemList.forEach((item) => {
    const isFoliage = item.flower.category === "follaje";
    const cap = isFoliage ? 5 : 8;

    for (let i = 0; i < Math.min(item.quantity, cap); i++) {
      stems.push({
        id: `${item.key}-${i}`,
        img: item.color.img || item.flower.img,
        flowerId: item.flower.id,
        isFoliage,
      });
    }
  });

  const foliage = stems.filter((s) => s.isFoliage);
  const flowers = stems.filter((s) => !s.isFoliage);

  return {
    foliage: foliage.slice(0, 10),
    flowers: flowers.slice(0, MAX_STEMS_VISIBLE - 10),
  };
}

function arcAngle(index, total, spreadDeg) {
  if (total <= 1) return 0;
  const t = index / (total - 1);
  return -spreadDeg / 2 + t * spreadDeg;
}

export function layoutBouquet({ foliage, flowers }) {
  const layouts = [];

  foliage.forEach((stem, i) => {
    const n = foliage.length;
    const angle = arcAngle(i, n, 118);
    const dist = Math.abs(i - (n - 1) / 2) / Math.max(n / 2, 1);

    layouts.push({
      ...stem,
      angle,
      scale: 0.72 + (1 - dist) * 0.14,
      height:
        FLOWER_HEIGHT[stem.flowerId] ?? FLOWER_HEIGHT.eucalipto,
      zIndex: 5 + i,
    });
  });

  flowers.forEach((stem, i) => {
    const n = flowers.length;
    const angle = arcAngle(i, n, 76);
    const dist = Math.abs(i - (n - 1) / 2) / Math.max(n / 2, 1);
    const baseH = FLOWER_HEIGHT[stem.flowerId] ?? FLOWER_HEIGHT.default;

    layouts.push({
      ...stem,
      angle,
      scale: 1.05 + (1 - dist) * 0.2,
      height: baseH + (1 - dist) * 14,
      zIndex: 30 + Math.round((1 - dist) * 28),
    });
  });

  return layouts;
}

export function defaultStemTransform(layout) {
  const radius = layout.isFoliage ? 34 : 24;
  const rad = (layout.angle * Math.PI) / 180;

  return {
    x: 50 + Math.sin(rad) * radius,
    y: layout.isFoliage ? 74 : 70,
    scale: layout.scale ?? 1,
    rotation: layout.angle ?? 0,
    zIndex: layout.zIndex ?? 10,
  };
}
