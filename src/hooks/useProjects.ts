"use client";

// Hooks React que ligam as telas ao Firestore (leitura em tempo real).
// Cada tela só precisa chamar `useProjects()` / `useProject(id)` e reagir a { dados, carregando, erro }.

import { useEffect, useState } from "react";
import { firebaseConfigurado } from "@/lib/firebase";
import { ouvirProjeto, ouvirProjetos } from "@/lib/projectsService";
import type { Project } from "@/lib/mockData";

const MSG_SEM_CONFIG =
  "Firebase não configurado. Preencha o arquivo .env.local (veja .env.example).";

/** Lista de todos os projetos, atualizada sozinha sempre que o banco mudar. */
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(firebaseConfigurado);
  const [error, setError] = useState<string | null>(
    firebaseConfigurado ? null : MSG_SEM_CONFIG
  );

  useEffect(() => {
    if (!firebaseConfigurado) return;
    // O retorno de ouvirProjetos é a função que cancela a escuta ao sair da tela.
    return ouvirProjetos(
      (lista) => {
        setProjects(lista);
        setError(null);
        setLoading(false);
      },
      (e) => {
        setError(e.message);
        setLoading(false);
      }
    );
  }, []);

  return { projects, loading, error };
}

/** Um projeto específico pelo id (ou `null` quando não existe). `id` vazio = nada a buscar. */
export function useProject(id: string | null) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(Boolean(id) && firebaseConfigurado);
  const [error, setError] = useState<string | null>(
    firebaseConfigurado ? null : MSG_SEM_CONFIG
  );

  useEffect(() => {
    if (!id || !firebaseConfigurado) return;
    return ouvirProjeto(
      id,
      (p) => {
        setProject(p);
        setError(null);
        setLoading(false);
      },
      (e) => {
        setError(e.message);
        setLoading(false);
      }
    );
  }, [id]);

  return { project, loading, error };
}
