"use client";

// Tela "Gerenciar projetos" — central do CRUD (só professor):
//   Create  -> botão "Novo projeto" (abre o formulário em branco)
//   Read    -> lista de todos os projetos
//   Update  -> botão de lápis em cada projeto (abre o formulário preenchido)
//   Delete  -> botão de lixeira em cada projeto (pede confirmação)

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Pencil, Plus, Trash2, DatabaseZap } from "lucide-react";
import PageShell from "@/components/PageShell";
import AreaChip from "@/components/AreaChip";
import DataState from "@/components/DataState";
import { useAuth } from "@/context/AuthContext";
import { useProjects } from "@/hooks/useProjects";
import { carregarProjetosDeExemplo, excluirProjeto } from "@/lib/projectsService";

export default function GerenciarProjetosPage() {
  const { session, loading } = useAuth();
  const router = useRouter();
  const { projects, loading: loadingProjects, error } = useProjects();
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && session?.role !== "professor") {
      router.replace("/login");
    }
  }, [loading, session, router]);

  if (loading || session?.role !== "professor") return null;

  /** DELETE: confirma com o usuário antes de apagar do banco. */
  const handleExcluir = async (id: string, titulo: string) => {
    if (!window.confirm(`Excluir o projeto "${titulo}"? Essa ação não pode ser desfeita.`)) return;
    try {
      await excluirProjeto(id);
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Falha ao excluir.");
    }
  };

  /** Popula o banco vazio com os 6 projetos de exemplo. */
  const handleExemplo = async () => {
    try {
      await carregarProjetosDeExemplo();
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Falha ao carregar exemplos.");
    }
  };

  return (
    <>
      <div className="sticky top-0 z-30 bg-forest text-white">
        <div className="mx-auto max-w-md px-5 pt-4 pb-3">
          <Link href="/avaliador" className="inline-flex items-center gap-1.5 text-[13px] text-white/85">
            <ArrowLeft size={15} /> Avaliar projetos
          </Link>
          <h1 className="font-display text-[20px] font-semibold mt-1">Gerenciar projetos</h1>
        </div>
      </div>

      <PageShell>
        <div className="px-5 pt-5">
          <Link
            href="/avaliador/editar"
            className="flex items-center justify-center gap-2 py-3 text-[14px] font-semibold text-white"
            style={{ background: "var(--forest)" }}
          >
            <Plus size={16} /> Novo projeto
          </Link>
        </div>

        <DataState loading={loadingProjects} error={error} />
        {erro && (
          <p className="mx-5 mt-4 border px-3.5 py-3 text-[13px]" style={{ borderColor: "var(--amber)" }}>
            {erro}
          </p>
        )}

        {!loadingProjects && !error && projects.length === 0 && (
          <div className="px-5 pt-6 text-center">
            <p className="text-[13px] text-ink-soft">Nenhum projeto cadastrado ainda.</p>
            <button
              onClick={handleExemplo}
              className="mt-3 inline-flex items-center gap-2 border border-forest px-4 py-2.5 text-[13px] font-semibold"
              style={{ color: "var(--forest)" }}
            >
              <DatabaseZap size={15} /> Carregar projetos de exemplo
            </button>
          </div>
        )}

        <div className="px-5 mt-5 space-y-2.5">
          {projects.map((p) => (
            <div key={p.id} className="flex items-center gap-3 border border-line bg-white p-3.5">
              <div className="min-w-0 flex-1">
                <p className="font-mono-tag text-[11px] text-ink-soft">{p.code}</p>
                <p className="font-display font-semibold text-[14px] leading-snug truncate">{p.title}</p>
                <div className="mt-1">
                  <AreaChip area={p.area} />
                </div>
              </div>
              <Link
                href={`/avaliador/editar?id=${p.id}`}
                aria-label={`Editar ${p.title}`}
                className="p-2 border border-line"
                style={{ color: "var(--forest)" }}
              >
                <Pencil size={16} />
              </Link>
              <button
                onClick={() => handleExcluir(p.id, p.title)}
                aria-label={`Excluir ${p.title}`}
                className="p-2 border border-line"
                style={{ color: "#B3261E" }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </PageShell>
    </>
  );
}
