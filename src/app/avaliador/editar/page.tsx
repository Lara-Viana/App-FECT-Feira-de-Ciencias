"use client";

// Formulário de projeto — serve para CRIAR e para EDITAR:
//   /avaliador/editar          -> projeto novo (Create)
//   /avaliador/editar?id=XXXX  -> edita o projeto existente (Update)

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageShell from "@/components/PageShell";
import DataState from "@/components/DataState";
import { useAuth } from "@/context/AuthContext";
import { useProject } from "@/hooks/useProjects";
import { atualizarProjeto, criarProjeto, type ProjectInput } from "@/lib/projectsService";
import type { Area, Project } from "@/lib/mockData";

const AREAS: Area[] = ["Exatas", "Biológicas", "Agrárias", "Humanas", "Tecnologia"];

export default function EditarProjetoPage() {
  // useSearchParams exige <Suspense> em páginas estáticas.
  return (
    <Suspense fallback={null}>
      <Conteudo />
    </Suspense>
  );
}

function Conteudo() {
  const id = useSearchParams().get("id"); // null = criando projeto novo
  const { session, loading } = useAuth();
  const router = useRouter();
  const { project, loading: loadingProject, error } = useProject(id);

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
          <Link href="/avaliador/gerenciar" className="inline-flex items-center gap-1.5 text-[13px] text-white/85">
            <ArrowLeft size={15} /> Gerenciar projetos
          </Link>
          <h1 className="font-display text-[20px] font-semibold mt-1">
            {id ? "Editar projeto" : "Novo projeto"}
          </h1>
        </div>
      </div>

      <PageShell>
        {id && <DataState loading={loadingProject} error={error} />}
        {id && !loadingProject && !error && !project && (
          <p className="px-5 pt-6 text-[13px] text-ink-soft">Projeto não encontrado.</p>
        )}
        {/* Sem id: formulário em branco. Com id: espera o projeto carregar para preencher. */}
        {!id && <FormularioProjeto />}
        {id && project && <FormularioProjeto key={project.id} project={project} />}
      </PageShell>
    </>
  );
}

/** Texto de um campo -> lista de nomes (um por linha). */
const linhasParaLista = (texto: string) =>
  texto
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

/** Formulário de cadastro. Se receber `project`, funciona como edição. */
function FormularioProjeto({ project }: { project?: Project }) {
  const router = useRouter();
  const editando = Boolean(project);

  // Estado de cada campo (começa vazio ao criar, ou com os dados atuais ao editar).
  const [code, setCode] = useState(project?.code ?? "");
  const [title, setTitle] = useState(project?.title ?? "");
  const [summary, setSummary] = useState(project?.summary ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [area, setArea] = useState<Area>(project?.area ?? "Tecnologia");
  const [group, setGroup] = useState(project?.group.join("\n") ?? "");
  const [advisor, setAdvisor] = useState(project?.advisor ?? "");
  const [location, setLocation] = useState(project?.location ?? "Quadra 1");
  const [studentUsername, setStudentUsername] = useState(project?.studentUsername ?? "");
  const [saving, setSaving] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErro(null);

    // Campos editáveis do formulário.
    const dados = {
      code: code.trim(),
      title: title.trim(),
      summary: summary.trim(),
      description: description.trim(),
      area,
      group: linhasParaLista(group),
      advisor: advisor.trim(),
      location: location.trim(),
      studentUsername: studentUsername.trim(),
    };

    try {
      if (project) {
        // UPDATE — não mexe em nota/feedback, que pertencem à avaliação.
        await atualizarProjeto(project.id, dados);
      } else {
        // CREATE — projeto novo nasce sem nota.
        const novo: ProjectInput = { ...dados, image: dados.title, score: null, feedback: null };
        await criarProjeto(novo);
      }
      router.push("/avaliador/gerenciar");
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Falha ao salvar.");
      setSaving(false);
    }
  };

  const campo = "mt-1.5 w-full border border-line bg-white px-3 py-2.5 text-[14px] focus:outline-none focus:border-forest";

  return (
    <form onSubmit={handleSubmit} className="px-5 pt-5 space-y-4">
      {erro && (
        <p className="border px-3.5 py-3 text-[13px]" style={{ borderColor: "var(--amber)" }}>
          {erro}
        </p>
      )}

      <div>
        <label className="text-[12px] text-ink-soft" htmlFor="code">Código do estande (ex.: A-07)</label>
        <input id="code" required value={code} onChange={(e) => setCode(e.target.value)} className={campo} />
      </div>

      <div>
        <label className="text-[12px] text-ink-soft" htmlFor="title">Título</label>
        <input id="title" required value={title} onChange={(e) => setTitle(e.target.value)} className={campo} />
      </div>

      <div>
        <label className="text-[12px] text-ink-soft" htmlFor="summary">Resumo (uma frase)</label>
        <input id="summary" required value={summary} onChange={(e) => setSummary(e.target.value)} className={campo} />
      </div>

      <div>
        <label className="text-[12px] text-ink-soft" htmlFor="description">Descrição completa</label>
        <textarea
          id="description"
          required
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`${campo} resize-none leading-relaxed`}
        />
      </div>

      <div>
        <label className="text-[12px] text-ink-soft" htmlFor="area">Área</label>
        <select id="area" value={area} onChange={(e) => setArea(e.target.value as Area)} className={campo}>
          {AREAS.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-[12px] text-ink-soft" htmlFor="group">Integrantes do grupo (um por linha)</label>
        <textarea
          id="group"
          required
          rows={3}
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          className={`${campo} resize-none`}
        />
      </div>

      <div>
        <label className="text-[12px] text-ink-soft" htmlFor="advisor">Orientador(a)</label>
        <input id="advisor" required value={advisor} onChange={(e) => setAdvisor(e.target.value)} className={campo} />
      </div>

      <div>
        <label className="text-[12px] text-ink-soft" htmlFor="location">Localização</label>
        <input id="location" required value={location} onChange={(e) => setLocation(e.target.value)} className={campo} />
      </div>

      <div>
        <label className="text-[12px] text-ink-soft" htmlFor="student">Usuário do aluno responsável (opcional)</label>
        <input
          id="student"
          value={studentUsername}
          onChange={(e) => setStudentUsername(e.target.value)}
          placeholder="ex.: maria.souza"
          className={campo}
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full py-3 text-[14px] font-semibold text-white disabled:opacity-60"
        style={{ background: "var(--forest)" }}
      >
        {saving ? "Salvando…" : editando ? "Salvar alterações" : "Cadastrar projeto"}
      </button>
    </form>
  );
}
