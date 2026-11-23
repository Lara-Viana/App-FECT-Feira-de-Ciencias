"use client";

import Link from "next/link";
import { Microscope, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

/**
 * Cabeçalho fixo no topo de cada tela: logo FECT, botão Entrar/Sair e (opcional)
 * uma linha pequena (`eyebrow`) + título grande (`title`).
 */
export default function Header({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title?: string;
}) {
  // Sessão atual (null = visitante sem login) e função de sair.
  const { session, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-forest text-white">
      <div className="mx-auto max-w-md px-5 pt-4 pb-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
              <Microscope size={16} strokeWidth={2.2} />
            </span>
            <span className="font-display font-semibold text-[15px] tracking-tight">
              FECT
            </span>
          </Link>

          {/* Logado: mostra o primeiro nome + sair. Visitante: link para a tela de login. */}
          {session ? (
            <button
              onClick={logout}
              className="flex items-center gap-1 text-[12px] text-white/75 hover:text-white transition-colors"
            >
              {session.name.split(" ")[0]}
              <LogOut size={14} />
            </button>
          ) : (
            <Link
              href="/login"
              className="text-[12px] font-medium text-white/85 hover:text-white transition-colors"
            >
              Entrar
            </Link>
          )}
        </div>

        {(eyebrow || title) && (
          <div className="mt-5">
            {eyebrow && (
              <p className="font-mono-tag text-[11px] text-amber-soft" style={{ color: "var(--amber-soft)" }}>
                {eyebrow}
              </p>
            )}
            {title && (
              <h1 className="font-display text-[26px] leading-tight font-semibold mt-1">
                {title}
              </h1>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
