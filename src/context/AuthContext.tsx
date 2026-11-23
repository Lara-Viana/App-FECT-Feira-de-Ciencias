"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// Perfis possíveis no app.
export type Role = "visitante" | "aluno" | "professor";

export type Session = {
  role: Role;
  name: string;
  username?: string;
  projectId?: string; // usado quando role === "aluno"
};

// O que o contexto oferece às telas: sessão atual e funções de entrar/sair.
type AuthContextValue = {
  session: Session | null;
  loading: boolean;
  loginAs: (session: Session) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Chave usada no localStorage para lembrar o login entre aberturas do app.
const STORAGE_KEY = "feira-ciencias:session";

/** Provedor que envolve o app (veja layout.tsx) e guarda quem está logado. */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setSession(JSON.parse(raw));
    } catch {
      // ignora — ambiente sem storage disponível
    } finally {
      setLoading(false);
    }
  }, []);

  const loginAs = (newSession: Session) => {
    setSession(newSession);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));
    } catch {
      // silencioso — sem persistência disponível
    }
  };

  const logout = () => {
    setSession(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // silencioso
    }
  };

  return (
    <AuthContext.Provider value={{ session, loading, loginAs, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/** Hook para as telas lerem a sessão: `const { session, loginAs, logout } = useAuth()`. */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}
