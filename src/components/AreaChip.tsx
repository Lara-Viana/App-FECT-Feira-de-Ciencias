import type { Area } from "@/lib/mockData";

// Cores (fundo / texto) de cada área do conhecimento.
const areaStyles: Record<Area, { bg: string; fg: string }> = {
  Exatas: { bg: "#DDE6F5", fg: "#1F3A66" },
  Biológicas: { bg: "#DCEEDB", fg: "#265C33" },
  Agrárias: { bg: "#E8F0CB", fg: "#3D5312" },
  Humanas: { bg: "#F3DCD8", fg: "#7A3323" },
  Tecnologia: { bg: "#E7DCF3", fg: "#4B2C77" },
};

/** Etiqueta colorida com o nome da área (Exatas, Biológicas...). */
export default function AreaChip({ area }: { area: Area }) {
  const style = areaStyles[area];
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium"
      style={{ background: style.bg, color: style.fg }}
    >
      {area}
    </span>
  );
}
