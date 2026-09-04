import { ReactNode } from "react";
import BottomNav from "./BottomNav";

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="mx-auto w-full max-w-md flex-1 pb-24">{children}</main>
      <BottomNav />
    </>
  );
}
