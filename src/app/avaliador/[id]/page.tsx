"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import PageShell from "@/components/PageShell";
import ProjectVisual from "@/components/ProjectVisual";
import AreaChip from "@/components/AreaChip";
import { useAuth } from "@/context/AuthContext";
import { projects } from "@/lib/mockData";

export default function AvaliarProjetoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { session, loading } = useAuth();
  const router = useRouter();

  const project = projects.find((p) => p.id === id);

  const [score, setScore] = useState(project?.score?.toString() ?? "");
  const [feedback, setFeedback] = useState(project?.feedback ?? "");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!loading && session?.role !== "professor") {
      router.replace("/login");
    }
  }, [loading, session, router]);

  if (loading || session?.role !== "professor" || !project) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Nesta etapa apenas simulamos o salvamento — sem persistência real ainda.
    setSaved(true);
  };

  return (
    <>
      <div className="sticky top-0 z-30 bg-forest text-white">
        <div className="mx-auto max-w-md px-5 pt-4 pb-3">
          <Link href="/avaliador" className="inline-flex items-center gap-1.5 text-[13px] text-white/85">
            <ArrowLeft size={15} /> Avaliar projetos
          </Link>
        </div>
      </div>

      <PageShell>
        <ProjectVisual area={project.area} code={project.code} className="h-32 w-full" />

        <div className="px-5 pt-5">
          <AreaChip area={project.area} />
          <h1 className="font-display text-[19px] font-semibold leading-tight mt-2">
            {project.title}
          </h1>
          <p className="text-[13px] text-ink-soft mt-1.5">{project.group.join(", ")}</p>

          {saved && (
            <div
              className="mt-5 flex items-center gap-2 border px-3.5 py-3 text-[13px]"
              style={{ borderColor: "var(--forest)", background: "var(--paper-2)", color: "var(--forest)" }}
            >
              <CheckCircle2 size={16} />
              Avaliação registrada com sucesso (simulação — sem persistência ainda).
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="text-[12px] text-ink-soft" htmlFor="score">
                Nota (0 a 10)
              </label>
              <input
                id="score"
                type="number"
                min={0}
                max={10}
                step={0.1}
                required
                value={score}
                onChange={(e) => {
                  setScore(e.target.value);
                  setSaved(false);
                }}
                className="mt-1.5 w-full border border-line bg-white px-3 py-2.5 text-[14px] focus:outline-none focus:border-forest"
              />
            </div>

            <div>
              <label className="text-[12px] text-ink-soft" htmlFor="feedback">
                Feedback para o grupo
              </label>
              <textarea
                id="feedback"
                required
                rows={5}
                value={feedback ?? ""}
                onChange={(e) => {
                  setFeedback(e.target.value);
                  setSaved(false);
                }}
                placeholder="Descreva pontos fortes e sugestões de melhoria..."
                className="mt-1.5 w-full border border-line bg-white px-3 py-2.5 text-[14px] leading-relaxed focus:outline-none focus:border-forest resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 text-[14px] font-semibold text-white"
              style={{ background: "var(--forest)" }}
            >
              Salvar avaliação
            </button>
          </form>
        </div>
      </PageShell>
    </>
  );
}
