# Feira de Ciências — IFSULDEMINAS Campus Muzambinho

Protótipo de telas (frontend) do aplicativo da feira, feito em **Next.js 16 + React 19 + TypeScript + Tailwind CSS v4**.

Nesta etapa, tudo funciona com **dados fictícios** (`src/lib/mockData.ts`) e login simulado (`src/context/AuthContext.tsx`,
guardado só no `localStorage` do navegador). Não há backend nem funcionamento offline real ainda — isso fica para a próxima etapa.

## Como rodar

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`. O layout é pensado para celular (mobile-first); use o modo de dispositivo móvel do
navegador (F12 → ícone de celular) para a melhor experiência.

## Estrutura principal

```
src/
  app/
    layout.tsx              # fontes, tema, AuthProvider
    globals.css             # paleta de cores e tokens de design (Tailwind v4 @theme)
    page.tsx                # Início — informações do evento, local e cronograma
    login/page.tsx          # Login — professor / aluno / visitante
    projetos/page.tsx       # Lista de projetos com filtro por área
    projetos/[id]/page.tsx  # Detalhe de um projeto
    premiacao/page.tsx      # Projetos vencedores
    avaliador/page.tsx      # Painel do professor: lista de projetos a avaliar
    avaliador/[id]/page.tsx # Formulário de avaliação (nota + feedback)
    aluno/page.tsx          # Painel do aluno: nota e feedback do seu projeto
  components/                # Header, BottomNav, ProjectCard, chips, etc.
  context/AuthContext.tsx    # Sessão simulada (visitante / aluno / professor)
  lib/mockData.ts            # Dados fictícios (evento, cronograma, projetos, vencedores)
```

## Próximos passos (fora do escopo desta entrega)

- Autenticação real para professores e alunos.
- Persistência das notas/feedback em um backend.
- Funcionamento offline.
