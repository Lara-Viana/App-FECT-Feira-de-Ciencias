import Link from "next/link";
import { Trophy, Medal, Award, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import PageShell from "@/components/PageShell";
import ProjectVisual from "@/components/ProjectVisual";
import { projects, winners, eventInfo } from "@/lib/mockData";

const placeMeta = {
  1: { label: "1º lugar", icon: Trophy, color: "#E2A23B" },
  2: { label: "2º lugar", icon: Medal, color: "#9AA5AE" },
  3: { label: "3º lugar", icon: Medal, color: "#B08D57" },
} as const;

export default function PremiacaoPage() {
  const podium = winners.filter((w) => w.place !== "menção");
  const mentions = winners.filter((w) => w.place === "menção");

  return (
    <>
      <Header eyebrow={eventInfo.edition} title="Projetos vencedores" />
      <PageShell>
        <div className="px-5 pt-5 space-y-3">
          {podium.map((winner) => {
            const project = projects.find((p) => p.id === winner.projectId);
            if (!project) return null;
            const meta = placeMeta[winner.place as 1 | 2 | 3];
            const Icon = meta.icon;
            return (
              <Link
                key={winner.projectId + winner.category}
                href={`/projetos/${project.id}`}
                className="flex gap-3 border border-line bg-white p-3 hover:border-forest transition-colors"
              >
                <ProjectVisual area={project.area} code={project.code} className="h-20 w-20 shrink-0" />
                <div className="min-w-0 flex-1">
                  <span
                    className="inline-flex items-center gap-1 text-[11px] font-semibold font-mono-tag"
                    style={{ color: meta.color }}
                  >
                    <Icon size={13} /> {meta.label}
                  </span>
                  <p className="font-display font-semibold text-[14px] leading-snug mt-1 truncate">
                    {project.title}
                  </p>
                  <p className="text-[12px] text-ink-soft mt-0.5 truncate">
                    {project.group.join(", ")}
                  </p>
                </div>
                <ArrowRight size={16} className="self-center shrink-0" style={{ color: "var(--ink-soft)" }} />
              </Link>
            );
          })}
        </div>

        {mentions.length > 0 && (
          <div className="px-5 mt-8">
            <h2 className="font-display text-[16px] font-semibold flex items-center gap-1.5">
              <Award size={16} style={{ color: "var(--forest)" }} />
              Menções honrosas
            </h2>
            <div className="mt-3 space-y-3">
              {mentions.map((winner) => {
                const project = projects.find((p) => p.id === winner.projectId);
                if (!project) return null;
                return (
                  <Link
                    key={winner.projectId + winner.category}
                    href={`/projetos/${project.id}`}
                    className="flex gap-3 border border-line bg-white p-3 hover:border-forest transition-colors"
                  >
                    <ProjectVisual area={project.area} code={project.code} className="h-16 w-16 shrink-0" />
                    <div className="min-w-0 flex-1 self-center">
                      <p className="text-[11px] text-ink-soft">{winner.category}</p>
                      <p className="font-display font-semibold text-[14px] leading-snug truncate">
                        {project.title}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </PageShell>
    </>
  );
}
