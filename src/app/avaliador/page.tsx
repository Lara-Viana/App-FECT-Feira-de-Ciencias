"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CircleCheck, CircleDashed, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import PageShell from "@/components/PageShell";
import AreaChip from "@/components/AreaChip";
import { useAuth } from "@/context/AuthContext";
import { projects } from "@/lib/mockData";

export default function AvaliadorPage() {
  const { session, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && session?.role !== "professor") {
      router.replace("/login");
    }
  }, [loading, session, router]);

  if (loading || session?.role !== "professor") {
    return null;
  }

  const pending = projects.filter((p) => p.score === null);
  const done = projects.filter((p) => p.score !== null);

  return (
    <>
      <Header eyebrow={session.name} title="Avaliar projetos" />
      <PageShell>
        <div className="px-5 pt-5">
          <div className="flex gap-3">
            <StatCard label="Pendentes" value={pending.length} color="var(--amber)" />
            <StatCard label="Avaliados" value={done.length} color="var(--forest)" />
          </div>
        </div>

        <div className="px-5 mt-7">
          <h2 className="font-display text-[15px] font-semibold text-ink-soft">
            Pendentes de avaliação
          </h2>
          <div className="mt-3 space-y-2.5">
            {pending.map((p) => (
              <EvalRow key={p.id} id={p.id} code={p.code} title={p.title} area={p.area} evaluated={false} />
            ))}
            {pending.length === 0 && (
              <p className="text-[13px] text-ink-soft py-2">Todos os projetos já foram avaliados.</p>
            )}
          </div>
        </div>

        <div className="px-5 mt-7">
          <h2 className="font-display text-[15px] font-semibold text-ink-soft">Já avaliados</h2>
          <div className="mt-3 space-y-2.5">
            {done.map((p) => (
              <EvalRow key={p.id} id={p.id} code={p.code} title={p.title} area={p.area} evaluated score={p.score!} />
            ))}
          </div>
        </div>
      </PageShell>
    </>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex-1 border border-line bg-white p-3.5">
      <p className="font-display text-[24px] font-semibold" style={{ color }}>
        {value}
      </p>
      <p className="text-[12px] text-ink-soft mt-0.5">{label}</p>
    </div>
  );
}

function EvalRow({
  id,
  code,
  title,
  area,
  evaluated,
  score,
}: {
  id: string;
  code: string;
  title: string;
  area: Parameters<typeof AreaChip>[0]["area"];
  evaluated: boolean;
  score?: number;
}) {
  return (
    <Link
      href={`/avaliador/${id}`}
      className="flex items-center gap-3 border border-line bg-white p-3.5 hover:border-forest transition-colors"
    >
      {evaluated ? (
        <CircleCheck size={18} style={{ color: "var(--forest)" }} />
      ) : (
        <CircleDashed size={18} style={{ color: "var(--amber)" }} />
      )}
      <div className="min-w-0 flex-1">
        <p className="font-mono-tag text-[11px] text-ink-soft">{code}</p>
        <p className="font-display font-semibold text-[14px] leading-snug truncate">{title}</p>
        <div className="mt-1">
          <AreaChip area={area} />
        </div>
      </div>
      {evaluated && score !== undefined && (
        <span className="font-mono-tag text-[13px] font-semibold" style={{ color: "var(--forest)" }}>
          {score.toFixed(1)}
        </span>
      )}
      <ChevronRight size={16} style={{ color: "var(--ink-soft)" }} />
    </Link>
  );
}
