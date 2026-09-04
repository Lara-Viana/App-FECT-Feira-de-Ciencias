"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type Role = "visitante" | "aluno" | "professor";

export type Session = {
  role: Role;
  name: string;
  username?: string;
  projectId?: string; // usado quando role === "aluno"
};

type AuthContextValue = {
  session: Session | null;
  loading: boolean;
  loginAs: (session: Session) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "feira-ciencias:session";

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

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}
