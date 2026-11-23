"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, FlaskConical, Eye, ChevronLeft } from "lucide-react";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { useAuth } from "@/context/AuthContext";
import { mockProfessors, mockStudents } from "@/lib/mockData";

// Etapas da tela: escolher o perfil -> (professor | aluno) preencher o login.
type Step = "select" | "professor" | "aluno";

/**
 * Login SIMULADO: o usuário escolhe um nome da lista e a sessão é guardada no
 * localStorage (veja AuthContext). Não há verificação real de senha nesta etapa.
 */
export default function LoginPage() {
  const [step, setStep] = useState<Step>("select");
  const router = useRouter();
  const { loginAs } = useAuth();

  // Visitante não precisa de login: vai direto para o início.
  const continueAsVisitor = () => {
    router.push("/");
  };

  return (
    <>
      <div className="bg-forest text-white">
        <div className="mx-auto max-w-md px-5 pt-8 pb-10">
          {step !== "select" ? (
            <button
              onClick={() => setStep("select")}
              className="inline-flex items-center gap-1 text-[13px] text-white/85 mb-4"
            >
              <ChevronLeft size={16} /> Voltar
            </button>
          ) : (
            <p className="font-mono-tag text-[11px] text-white/70">Feira de Ciências</p>
          )}
          <h1 className="font-display text-[24px] font-semibold mt-1">
            {step === "select" && "Como você vai participar hoje?"}
            {step === "professor" && "Acesso do professor avaliador"}
            {step === "aluno" && "Acesso do aluno expositor"}
          </h1>
        </div>
      </div>

      <PageShell>
        <div className="px-5 pt-6">
          {step === "select" && (
            <div className="space-y-3">
              <RoleCard
                icon={FlaskConical}
                title="Professor avaliador"
                description="Avalie os projetos e registre notas e feedback."
                onClick={() => setStep("professor")}
              />
              <RoleCard
                icon={GraduationCap}
                title="Aluno expositor"
                description="Acompanhe a nota e o feedback do seu projeto."
                onClick={() => setStep("aluno")}
              />
              <RoleCard
                icon={Eye}
                title="Visitante"
                description="Veja os projetos e a programação, sem precisar de login."
                onClick={continueAsVisitor}
              />
            </div>
          )}

          {step === "professor" && (
            <LoginForm
              placeholderLabel="Selecione seu nome (protótipo)"
              users={mockProfessors.map((p) => ({ value: p.username, label: p.name }))}
              onSubmit={(username) => {
                const prof = mockProfessors.find((p) => p.username === username);
                if (!prof) return;
                loginAs({ role: "professor", name: prof.name, username: prof.username });
                router.push("/avaliador");
              }}
            />
          )}

          {step === "aluno" && (
            <LoginForm
              placeholderLabel="Selecione seu nome (protótipo)"
              users={mockStudents.map((s) => ({ value: s.username, label: s.name }))}
              onSubmit={(username) => {
                const student = mockStudents.find((s) => s.username === username);
                if (!student) return;
                loginAs({
                  role: "aluno",
                  name: student.name,
                  username: student.username,
                  projectId: student.projectId,
                });
                router.push("/aluno");
              }}
            />
          )}

          <p className="text-center text-[12px] text-ink-soft mt-8">
            <Link href="/" className="underline underline-offset-2">
              Continuar navegando como visitante
            </Link>
          </p>
        </div>
      </PageShell>
    </>
  );
}

/** Botão grande de escolha de perfil (professor, aluno ou visitante). */
function RoleCard({
  icon: Icon,
  title,
  description,
  onClick,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-start gap-3.5 border border-line bg-white p-4 text-left hover:border-forest transition-colors"
    >
      <span
        className="flex h-11 w-11 items-center justify-center rounded-full shrink-0"
        style={{ background: "var(--paper-2)", color: "var(--forest)" }}
      >
        <Icon size={20} strokeWidth={1.8} />
      </span>
      <div>
        <p className="font-display font-semibold text-[15px]">{title}</p>
        <p className="text-[13px] text-ink-soft mt-0.5 leading-relaxed">{description}</p>
      </div>
    </button>
  );
}

/** Formulário de login (lista de usuários + campo de senha ilustrativo). */
function LoginForm({
  placeholderLabel,
  users,
  onSubmit,
}: {
  placeholderLabel: string;
  users: { value: string; label: string }[];
  onSubmit: (username: string) => void;
}) {
  const [selected, setSelected] = useState(users[0]?.value ?? "");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(selected);
      }}
      className="space-y-4"
    >
      <div>
        <label className="text-[12px] text-ink-soft" htmlFor="user">
          {placeholderLabel}
        </label>
        <select
          id="user"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="mt-1.5 w-full border border-line bg-white px-3 py-2.5 text-[14px] focus:outline-none focus:border-forest"
        >
          {users.map((u) => (
            <option key={u.value} value={u.value}>
              {u.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-[12px] text-ink-soft" htmlFor="password">
          Senha
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="mt-1.5 w-full border border-line bg-white px-3 py-2.5 text-[14px] focus:outline-none focus:border-forest"
        />
        <p className="text-[11px] text-ink-soft mt-1.5">
          Protótipo de telas — a autenticação real será conectada na próxima etapa.
        </p>
      </div>

      <button
        type="submit"
        className="w-full py-3 text-[14px] font-semibold text-white"
        style={{ background: "var(--forest)" }}
      >
        Entrar
      </button>
    </form>
  );
}
