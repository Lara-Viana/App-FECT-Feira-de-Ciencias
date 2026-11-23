import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Project } from "@/lib/mockData";
import AreaChip from "./AreaChip";
import ProjectVisual from "./ProjectVisual";

/** Cartão de um projeto na lista; ao tocar abre a tela de detalhe. */
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projetos/detalhe?id=${project.id}`}
      className="block border border-line bg-white hover:border-forest transition-colors"
    >
      <ProjectVisual area={project.area} code={project.code} className="h-32 w-full" />
      <div className="p-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <AreaChip area={project.area} />
          {project.score !== null && (
            <span
              className="font-mono-tag text-[12px] font-medium"
              style={{ color: "var(--forest)" }}
            >
              {project.score.toFixed(1)}
            </span>
          )}
        </div>
        <h3 className="font-display text-[16px] font-semibold leading-snug">
          {project.title}
        </h3>
        <p className="text-[13px] text-ink-soft mt-1.5 leading-relaxed">
          {project.summary}
        </p>
        <div className="mt-3 pt-3 border-t border-line flex items-center justify-between">
          <span className="text-[12px] text-ink-soft truncate">
            {project.group.join(", ")}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-ink-soft shrink-0 ml-2">
            <MapPin size={12} />
            {project.location.split(" – ")[0]}
          </span>
        </div>
      </div>
    </Link>
  );
}
