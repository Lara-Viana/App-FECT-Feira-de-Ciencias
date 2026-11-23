import { Sprout, FlaskConical, Cpu, BookOpen, Sigma } from "lucide-react";
import type { Area } from "@/lib/mockData";

// Ícone e cores usados como "capa" de cada área (não há fotos reais dos projetos).
const areaVisual: Record<
  Area,
  { icon: React.ComponentType<{ size?: number; strokeWidth?: number }>; bg: string; fg: string }
> = {
  Exatas: { icon: Sigma, bg: "#1F3A66", fg: "#DDE6F5" },
  Biológicas: { icon: Sprout, bg: "#265C33", fg: "#DCEEDB" },
  Agrárias: { icon: Sprout, bg: "#3D5312", fg: "#E8F0CB" },
  Humanas: { icon: BookOpen, bg: "#7A3323", fg: "#F3DCD8" },
  Tecnologia: { icon: Cpu, bg: "#4B2C77", fg: "#E7DCF3" },
};

/** Capa colorida do projeto: ícone da área + código do estande no canto. */
export default function ProjectVisual({
  area,
  code,
  className = "",
}: {
  area: Area;
  code: string;
  className?: string;
}) {
  // Se a área for desconhecida, usa um visual padrão.
  const { icon: Icon, bg, fg } = areaVisual[area] ?? {
    icon: FlaskConical,
    bg: "#1B4332",
    fg: "#DCEEDB",
  };

  return (
    <div
      className={`relative overflow-hidden grid-texture ${className}`}
      style={{ background: bg, color: fg }}
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-90">
        <Icon size={40} strokeWidth={1.4} />
      </div>
      <span
        className="absolute top-2 left-2 font-mono-tag text-[11px] px-1.5 py-0.5 rounded"
        style={{ background: "rgba(0,0,0,0.28)", color: fg }}
      >
        {code}
      </span>
    </div>
  );
}
