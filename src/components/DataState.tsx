// Mensagens padronizadas de "carregando" e "erro" para as telas que leem do Firestore.

export default function DataState({
  loading,
  error,
}: {
  loading: boolean;
  error: string | null;
}) {
  if (error) {
    return (
      <p
        className="mx-5 mt-5 border px-3.5 py-3 text-[13px] leading-relaxed"
        style={{ borderColor: "var(--amber)", background: "var(--paper-2)" }}
      >
        Não foi possível carregar os dados: {error}
      </p>
    );
  }
  if (loading) {
    return <p className="px-5 pt-6 text-[13px] text-ink-soft">Carregando…</p>;
  }
  return null;
}
