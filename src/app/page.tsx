import { MapPin, Clock, CalendarDays, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import PageShell from "@/components/PageShell";
import { eventInfo, schedule } from "@/lib/mockData";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Header
        eyebrow={`${eventInfo.edition} · ${eventInfo.institution}`}
        title={eventInfo.theme}
      />
      <PageShell>
        {/* Ficha do evento */}
        <section className="px-5 -mt-px">
          <div className="border border-line bg-white divide-y divide-line">
            <InfoRow icon={CalendarDays} label="Data" value={eventInfo.date} />
            <InfoRow icon={Clock} label="Horário" value={eventInfo.hours} />
            <InfoRow icon={MapPin} label="Local" value={eventInfo.address} />
          </div>
        </section>

        {/* Atalhos */}
        <section className="px-5 mt-4 grid grid-cols-2 gap-3">
          <Link
            href="/projetos"
            className="border border-line bg-white p-4 hover:border-forest transition-colors"
          >
            <p className="font-display font-semibold text-[15px]">Projetos</p>
            <p className="text-[12px] text-ink-soft mt-1">Veja os estandes da feira</p>
            <ArrowRight size={16} className="mt-3" style={{ color: "var(--forest)" }} />
          </Link>
          <Link
            href="/premiacao"
            className="border border-line bg-white p-4 hover:border-forest transition-colors"
          >
            <p className="font-display font-semibold text-[15px]">Premiação</p>
            <p className="text-[12px] text-ink-soft mt-1">Confira os vencedores</p>
            <ArrowRight size={16} className="mt-3" style={{ color: "var(--forest)" }} />
          </Link>
        </section>

        {/* Cronograma */}
        <section className="px-5 mt-8">
          <h2 className="font-display text-[18px] font-semibold">Programação do dia</h2>
          <ol className="mt-4 relative border-l border-line ml-1.5">
            {schedule.map((item, i) => (
              <li key={i} className="pl-5 pb-7 last:pb-0 relative">
                <span
                  className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full"
                  style={{ background: "var(--amber)" }}
                />
                <p className="font-mono-tag text-[12px]" style={{ color: "var(--forest)" }}>
                  {item.time}
                </p>
                <p className="font-display font-semibold text-[15px] mt-0.5">
                  {item.title}
                </p>
                <p className="text-[13px] text-ink-soft mt-0.5 leading-relaxed">
                  {item.description}
                </p>
                <p className="text-[12px] text-ink-soft mt-1 flex items-center gap-1">
                  <MapPin size={11} /> {item.place}
                </p>
              </li>
            ))}
          </ol>
        </section>
      </PageShell>
    </>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <span
        className="flex h-9 w-9 items-center justify-center rounded-full shrink-0"
        style={{ background: "var(--paper-2)", color: "var(--forest)" }}
      >
        <Icon size={16} strokeWidth={2} />
      </span>
      <div>
        <p className="text-[11px] text-ink-soft">{label}</p>
        <p className="text-[14px] font-medium">{value}</p>
      </div>
    </div>
  );
}
