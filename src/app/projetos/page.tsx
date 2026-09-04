"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import PageShell from "@/components/PageShell";
import ProjectCard from "@/components/ProjectCard";
import { projects, type Area } from "@/lib/mockData";

const areas: Area[] = ["Exatas", "Biológicas", "Agrárias", "Humanas", "Tecnologia"];

export default function ProjetosPage() {
  const [filter, setFilter] = useState<Area | "Todos">("Todos");

  const filtered = useMemo(
    () => (filter === "Todos" ? projects : projects.filter((p) => p.area === filter)),
    [filter]
  );

  return (
    <>
      <Header eyebrow={`${projects.length} projetos em exibição`} title="Projetos da feira" />
      <PageShell>
        <div className="px-5 pt-4">
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-5 px-5 scrollbar-none">
            <FilterPill active={filter === "Todos"} onClick={() => setFilter("Todos")}>
              Todos
            </FilterPill>
            {areas.map((area) => (
              <FilterPill key={area} active={filter === area} onClick={() => setFilter(area)}>
                {area}
              </FilterPill>
            ))}
          </div>
        </div>

        <div className="px-5 mt-4 grid grid-cols-1 gap-4">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          {filtered.length === 0 && (
            <p className="text-[13px] text-ink-soft py-8 text-center">
              Nenhum projeto encontrado nessa área.
            </p>
          )}
        </div>
      </PageShell>
    </>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="shrink-0 px-3.5 py-1.5 text-[13px] font-medium border transition-colors"
      style={
        active
          ? { background: "var(--forest)", borderColor: "var(--forest)", color: "white" }
          : { background: "white", borderColor: "var(--line)", color: "var(--ink-soft)" }
      }
    >
      {children}
    </button>
  );
}
