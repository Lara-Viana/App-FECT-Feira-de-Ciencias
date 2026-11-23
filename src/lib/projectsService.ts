// Camada de acesso ao banco (Cloud Firestore) — aqui ficam as 4 operações do CRUD.
//
//   C reate  -> criarProjeto()
//   R ead    -> ouvirProjetos() / ouvirProjeto()   (tempo real)
//   U pdate  -> atualizarProjeto() / salvarAvaliacao()
//   D elete  -> excluirProjeto()
//
// Coleção usada no Firestore: "projetos". Cada documento é um `Project` (sem o campo id,
// pois o id é o próprio nome do documento).

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  addDoc,
  updateDoc,
  writeBatch,
  type Unsubscribe,
} from "firebase/firestore";
import { getDb } from "./firebase";
import { seedProjects, type Project } from "./mockData";

const COLECAO = "projetos";

/** Dados editáveis de um projeto (tudo menos o `id`). */
export type ProjectInput = Omit<Project, "id">;

/** Converte o documento do Firestore em um `Project` (acrescenta o id e preenche campos ausentes). */
function paraProjeto(id: string, data: Record<string, unknown>): Project {
  return {
    id,
    code: (data.code as string) ?? "",
    title: (data.title as string) ?? "",
    summary: (data.summary as string) ?? "",
    description: (data.description as string) ?? "",
    area: (data.area as Project["area"]) ?? "Exatas",
    group: (data.group as string[]) ?? [],
    advisor: (data.advisor as string) ?? "",
    location: (data.location as string) ?? "",
    image: (data.image as string) ?? "",
    score: typeof data.score === "number" ? data.score : null,
    feedback: (data.feedback as string | null) ?? null,
    studentUsername: (data.studentUsername as string) ?? "",
  };
}

/** READ — escuta TODOS os projetos em tempo real (ordenados pelo código do estande). */
export function ouvirProjetos(
  aoMudar: (projetos: Project[]) => void,
  aoErrar: (erro: Error) => void
): Unsubscribe {
  const q = query(collection(getDb(), COLECAO), orderBy("code"));
  return onSnapshot(
    q,
    (snap) => aoMudar(snap.docs.map((d) => paraProjeto(d.id, d.data()))),
    aoErrar
  );
}

/** READ — escuta UM projeto em tempo real. Devolve `null` se o documento não existir. */
export function ouvirProjeto(
  id: string,
  aoMudar: (projeto: Project | null) => void,
  aoErrar: (erro: Error) => void
): Unsubscribe {
  return onSnapshot(
    doc(getDb(), COLECAO, id),
    (snap) => aoMudar(snap.exists() ? paraProjeto(snap.id, snap.data()) : null),
    aoErrar
  );
}

/** CREATE — cria um projeto novo (o Firestore gera o id) e devolve o id criado. */
export async function criarProjeto(dados: ProjectInput): Promise<string> {
  const ref = await addDoc(collection(getDb(), COLECAO), dados);
  return ref.id;
}

/** UPDATE — altera os dados cadastrais de um projeto (só os campos informados). */
export async function atualizarProjeto(
  id: string,
  dados: Partial<ProjectInput>
): Promise<void> {
  await updateDoc(doc(getDb(), COLECAO, id), dados);
}

/** UPDATE — grava a nota e o feedback dados pelo professor avaliador. */
export async function salvarAvaliacao(
  id: string,
  nota: number,
  feedback: string
): Promise<void> {
  await updateDoc(doc(getDb(), COLECAO, id), { score: nota, feedback });
}

/** DELETE — remove o projeto do banco. */
export async function excluirProjeto(id: string): Promise<void> {
  await deleteDoc(doc(getDb(), COLECAO, id));
}

/**
 * Popula o banco com os projetos de exemplo (`seedProjects`), usando ids fixos (p1, p2...)
 * para que os alunos fictícios do login continuem vinculados ao projeto certo.
 * Usa `writeBatch` para gravar tudo de uma vez só.
 */
export async function carregarProjetosDeExemplo(): Promise<void> {
  const db = getDb();
  const lote = writeBatch(db);
  for (const { id, ...dados } of seedProjects) {
    lote.set(doc(db, COLECAO, id), dados);
  }
  await lote.commit();
}

