"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Star, Clock3, Users, MapPin } from "lucide-react";
import Header from "@/components/Header";
import PageShell from "@/components/PageShell";
import AreaChip from "@/components/AreaChip";
import ProjectVisual from "@/components/ProjectVisual";
import { useAuth } from "@/context/AuthContext";
import DataState from "@/components/DataState";
import { useProject } from "@/hooks/useProjects";

export default function AlunoPage() {
  const { session, loading } = useAuth();
  const router = useRouter();
  // Busca em tempo real o projeto do aluno logado (nota e feedback aparecem assim que o professor salvar).
  const { project, loading: loadingProject, error } = useProject(session?.projectId ?? null);

  useEffect(() => {
    if (!loading && session?.role !== "aluno") {
      router.replace("/login");
    }
  }, [loading, session, router]);

  if (loading || session?.role !== "aluno") {
    return null;
  }

  // Enquanto carrega, em caso de erro ou sem projeto vinculado, mostra o aviso correspondente.
  if (loadingProject || error || !project) {
    return (
      <>
        <Header eyebrow={session.name} title="Meu projeto" />
        <PageShell>
          <DataState loading={loadingProject} error={error} />
          {!loadingProject && !error && (
            <p className="px-5 pt-6 text-[13px] text-ink-soft">
              Nenhum projeto vinculado a este usuário.
            </p>
          )}
        </PageShell>
      </>
    );
  }

  return (
    <>
      <Header eyebrow={session.name} title="Meu projeto" />
      <PageShell>
        <ProjectVisual area={project.area} code={project.code} className="h-36 w-full" />

        <div className="px-5 pt-5">
          <AreaChip area={project.area} />
          <h1 className="font-display text-[20px] font-semibold leading-tight mt-2">
            {project.title}
          </h1>

          <div className="mt-4 border border-line bg-white divide-y divide-line">
            <div className="flex items-center gap-3 px-4 py-3">
              <Users size={15} style={{ color: "var(--forest)" }} />
              <span className="text-[13px]">{project.group.join(", ")}</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-3">
              <MapPin size={15} style={{ color: "var(--forest)" }} />
              <span className="text-[13px]">{project.location}</span>
            </div>
          </div>

          <div className="mt-6">
            {project.score !== null ? (
              <div className="border border-line bg-white p-5 text-center">
                <p className="text-[12px] text-ink-soft">Sua nota</p>
                <div
                  className="mt-2 inline-flex items-center gap-2 font-display text-[40px] font-semibold"
                  style={{ color: "var(--forest)" }}
                >
                  <Star size={28} fill="var(--amber)" stroke="var(--amber)" />
                  {project.score.toFixed(1)}
                </div>

                {project.feedback && (
                  <div className="mt-5 text-left border-t border-line pt-4">
                    <p className="font-display font-semibold text-[14px]">
                      Feedback da banca avaliadora
                    </p>
                    <p className="text-[13px] text-ink-soft leading-relaxed mt-2">
                      {project.feedback}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="border border-line bg-white p-6 text-center">
                <Clock3 size={22} className="mx-auto" style={{ color: "var(--amber)" }} />
                <p className="font-display font-semibold text-[15px] mt-3">
                  Ainda não avaliado
                </p>
                <p className="text-[13px] text-ink-soft mt-1.5 leading-relaxed">
                  A banca avaliadora ainda não passou pelo seu estande. Assim que a nota
                  e o feedback forem lançados, eles aparecem aqui.
                </p>
              </div>
            )}
          </div>
        </div>
      </PageShell>
    </>
  );
}
