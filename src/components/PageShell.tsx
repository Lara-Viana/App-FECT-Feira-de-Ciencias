import { ReactNode } from "react";
import BottomNav from "./BottomNav";

/**
 * Moldura padrão das telas: conteúdo centralizado (largura de celular) com espaço
 * embaixo para a barra de navegação inferior.
 */
export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="mx-auto w-full max-w-md flex-1 pb-24">{children}</main>
      <BottomNav />
    </>
  );
}
