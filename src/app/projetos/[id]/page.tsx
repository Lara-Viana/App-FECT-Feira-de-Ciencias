import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Users, GraduationCap, Star } from "lucide-react";
import Header from "@/components/Header";
import PageShell from "@/components/PageShell";
import AreaChip from "@/components/AreaChip";
import ProjectVisual from "@/components/ProjectVisual";
import { projects } from "@/lib/mockData";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export default async function ProjetoDetalhePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  return (
    <>
      <div className="sticky top-0 z-30 bg-forest text-white">
        <div className="mx-auto max-w-md px-5 pt-4 pb-3">
          <Link href="/projetos" className="inline-flex items-center gap-1.5 text-[13px] text-white/85">
            <ArrowLeft size={15} /> Projetos
          </Link>
        </div>
      </div>

      <PageShell>
        <ProjectVisual area={project.area} code={project.code} className="h-44 w-full" />

        <div className="px-5 pt-5">
          <div className="flex items-center gap-2">
            <AreaChip area={project.area} />
            {project.score !== null && (
              <span className="flex items-center gap-1 text-[12px] font-medium" style={{ color: "var(--forest)" }}>
                <Star size={13} fill="var(--amber)" stroke="var(--amber)" />
                {project.score.toFixed(1)}
              </span>
            )}
          </div>

          <h1 className="font-display text-[22px] font-semibold leading-tight mt-2">
            {project.title}
          </h1>

          <p className="text-[14px] text-ink-soft leading-relaxed mt-3">
            {project.description}
          </p>

          <div className="mt-6 border border-line bg-white divide-y divide-line">
            <DetailRow icon={Users} label="Grupo" value={project.group.join(", ")} />
            <DetailRow icon={GraduationCap} label="Orientação" value={project.advisor} />
            <DetailRow icon={MapPin} label="Localização" value={project.location} />
          </div>

          {project.score !== null && project.feedback && (
            <div className="mt-6 border border-line bg-white p-4">
              <p className="font-display font-semibold text-[15px]">Avaliação da banca</p>
              <p className="text-[13px] text-ink-soft leading-relaxed mt-2">
                {project.feedback}
              </p>
            </div>
          )}
        </div>
      </PageShell>
    </>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 px-4 py-3.5">
      <span
        className="flex h-8 w-8 items-center justify-center rounded-full shrink-0 mt-0.5"
        style={{ background: "var(--paper-2)", color: "var(--forest)" }}
      >
        <Icon size={14} strokeWidth={2} />
      </span>
      <div>
        <p className="text-[11px] text-ink-soft">{label}</p>
        <p className="text-[14px] font-medium leading-snug">{value}</p>
      </div>
    </div>
  );
}
