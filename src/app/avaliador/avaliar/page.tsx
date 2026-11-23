"use client";

// Formulário de avaliação (UPDATE no CRUD): grava nota e feedback no Firestore.
// O id do projeto vem na URL: /avaliador/avaliar?id=XXXX

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import PageShell from "@/components/PageShell";
import ProjectVisual from "@/components/ProjectVisual";
import AreaChip from "@/components/AreaChip";
import DataState from "@/components/DataState";
import { useAuth } from "@/context/AuthContext";
import { useProject } from "@/hooks/useProjects";
import { salvarAvaliacao } from "@/lib/projectsService";
import type { Project } from "@/lib/mockData";

export default function AvaliarProjetoPage() {
  // useSearchParams exige <Suspense> em páginas estáticas.
  return (
    <Suspense fallback={null}>
      <Conteudo />
    </Suspense>
  );
}

function Conteudo() {
  const id = useSearchParams().get("id");
  const { session, loading } = useAuth();
  const router = useRouter();
  const { project, loading: loadingProject, error } = useProject(id);

  // Só professor acessa esta tela.
  useEffect(() => {
    if (!loading && session?.role !== "professor") {
      router.replace("/login");
    }
  }, [loading, session, router]);

  if (loading || session?.role !== "professor") return null;

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
        <DataState loading={loadingProject} error={error} />
        {!loadingProject && !error && !project && (
          <p className="px-5 pt-6 text-[13px] text-ink-soft">Projeto não encontrado.</p>
        )}
        {/* key = id: ao trocar de projeto o formulário recomeça com os valores certos */}
        {project && <FormularioAvaliacao key={project.id} project={project} />}
      </PageShell>
    </>
  );
}

/** Formulário de nota + feedback de um projeto. */
function FormularioAvaliacao({ project }: { project: Project }) {
  // Valores iniciais = avaliação já existente (permite corrigir uma nota).
  const [score, setScore] = useState(project.score?.toString() ?? "");
  const [feedback, setFeedback] = useState(project.feedback ?? "");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErro(null);
    try {
      await salvarAvaliacao(project.id, Number(score), feedback.trim());
      setSaved(true);
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Falha ao salvar.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
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
            Avaliação salva no banco de dados.
          </div>
        )}
        {erro && (
          <p className="mt-5 border px-3.5 py-3 text-[13px]" style={{ borderColor: "var(--amber)" }}>
            {erro}
          </p>
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
              value={feedback}
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
            disabled={saving}
            className="w-full py-3 text-[14px] font-semibold text-white disabled:opacity-60"
            style={{ background: "var(--forest)" }}
          >
            {saving ? "Salvando…" : "Salvar avaliação"}
          </button>
        </form>
      </div>
    </>
  );
}
