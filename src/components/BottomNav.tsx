"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FlaskConical, Trophy, ClipboardCheck, UserCircle2, LogIn } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type Tab = {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
};

export default function BottomNav() {
  const pathname = usePathname();
  const { session } = useAuth();

  const baseTabs: Tab[] = [
    { href: "/", label: "Início", icon: Home },
    { href: "/projetos", label: "Projetos", icon: FlaskConical },
    { href: "/premiacao", label: "Premiação", icon: Trophy },
  ];

  let lastTab: Tab;
  if (session?.role === "professor") {
    lastTab = { href: "/avaliador", label: "Avaliar", icon: ClipboardCheck };
  } else if (session?.role === "aluno") {
    lastTab = { href: "/aluno", label: "Minha nota", icon: UserCircle2 };
  } else {
    lastTab = { href: "/login", label: "Entrar", icon: LogIn };
  }

  const tabs = [...baseTabs, lastTab];

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 border-t border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80"
      aria-label="Navegação principal"
    >
      <div className="mx-auto max-w-md grid grid-cols-4">
        {tabs.map((tab) => {
          const active =
            tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center gap-1 py-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest ${
                active ? "text-forest" : "text-ink-soft"
              }`}
            >
              <Icon size={22} strokeWidth={active ? 2.4 : 1.8} />
              <span className={`text-[11px] ${active ? "font-semibold" : ""}`}>
                {tab.label}
              </span>
              <span
                className="h-1 w-1 rounded-full"
                style={{ background: active ? "var(--amber)" : "transparent" }}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
