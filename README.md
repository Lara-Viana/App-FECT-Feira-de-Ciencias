# Feira de Ciências — IFSULDEMINAS Campus Muzambinho

Aplicativo da feira (FECT) feito em **Next.js 16 + React 19 + TypeScript + Tailwind CSS v4**, com banco de dados
**Firebase (Cloud Firestore)**, instalável como **PWA** e empacotado como **APK Android** com **Capacitor**.

## O que o app faz

| Perfil | O que pode fazer |
| --- | --- |
| Visitante | Ver programação, lista/detalhe dos projetos e a premiação |
| Aluno | Ver a nota e o feedback do próprio projeto (em tempo real) |
| Professor | Avaliar projetos **e fazer o CRUD completo de projetos** |

### CRUD (coleção `projetos` no Firestore)

| Operação | Onde no app | Função (`src/lib/projectsService.ts`) |
| --- | --- | --- |
| **C**reate | Avaliar → Gerenciar projetos → *Novo projeto* | `criarProjeto` |
| **R**ead | Projetos, Detalhe, Premiação, Avaliar, Aluno (tempo real) | `ouvirProjetos` / `ouvirProjeto` |
| **U**pdate | Gerenciar → lápis (editar) e Avaliar → nota/feedback | `atualizarProjeto` / `salvarAvaliacao` |
| **D**elete | Gerenciar → lixeira | `excluirProjeto` |

> O login ainda é **simulado** (escolhe-se um nome da lista; fica no `localStorage`). Veja `firestore.rules`.

## 1. Configurar o Firebase (uma vez)

1. Acesse <https://console.firebase.google.com> → **Adicionar projeto**.
2. **Criação → Firestore Database → Criar banco de dados** (região `southamerica-east1`, modo produção).
3. Aba **Regras** → cole o conteúdo de `firestore.rules` → **Publicar**.
4. **Configurações do projeto (engrenagem) → Seus aplicativos → ícone Web `</>`** → registre o app e copie o `firebaseConfig`.
5. Copie `.env.example` para `.env.local` e preencha com esses valores.

## 2. Rodar no computador

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000` (use o modo celular do navegador: F12 → ícone de celular).
Entre como **Professor → Gerenciar projetos → Carregar projetos de exemplo** para popular o banco.

## 3. PWA (o que é)

*Progressive Web App* é um site que o navegador deixa **instalar como app** (ícone na tela inicial, tela cheia, funciona
offline). Aqui isso é feito por:

- `src/app/manifest.ts` — nome, ícones e cores do app;
- `public/sw.js` + `src/components/PwaRegister.tsx` — *service worker* (cache para abrir sem internet);
- Firestore com cache local persistente (`src/lib/firebase.ts`) — dados já baixados ficam disponíveis offline.

Para testar: `npm run build` → servir a pasta `out/` com HTTPS (ex.: Firebase Hosting / Vercel) → menu do Chrome →
**Instalar app**.

## 4. Gerar o APK (Android)

O Capacitor pega o site exportado (`out/`) e o coloca dentro de um app Android (`android/`).

Pré-requisitos: **JDK 21** e **Android SDK** (instalados com o Android Studio) e o `.env.local` preenchido.

```bash
npm run android:sync     # build do site + copia para o projeto Android
npm run android:open     # abre no Android Studio -> Build > Build APK(s)
```

Ou pela linha de comando (Windows):

```bash
cd android
gradlew.bat assembleDebug
```

O APK sai em `android/app/build/outputs/apk/debug/app-debug.apk`.

## Estrutura principal

```
src/
  app/
    layout.tsx                 # fontes, tema, AuthProvider, registro do PWA
    manifest.ts                # manifesto do PWA
    page.tsx                   # Início — evento e cronograma
    login/page.tsx             # Login simulado — professor / aluno / visitante
    projetos/page.tsx          # Lista de projetos (Firestore) com filtro por área
    projetos/detalhe/page.tsx  # Detalhe:  /projetos/detalhe?id=...
    premiacao/page.tsx         # Pódio calculado pelas notas
    avaliador/page.tsx         # Painel do professor
    avaliador/avaliar/page.tsx # Nota + feedback (UPDATE)
    avaliador/gerenciar/page.tsx # Lista com editar / excluir (READ / DELETE)
    avaliador/editar/page.tsx  # Formulário criar/editar (CREATE / UPDATE)
    aluno/page.tsx             # Nota e feedback do aluno
  components/                  # Header, BottomNav, ProjectCard, DataState, PwaRegister...
  context/AuthContext.tsx      # Sessão simulada
  hooks/useProjects.ts         # Leitura em tempo real do Firestore
  lib/firebase.ts              # Inicialização do Firebase
  lib/projectsService.ts       # CRUD no Firestore
  lib/mockData.ts              # Tipos + dados de exemplo (seed) + evento/cronograma
android/                       # Projeto Android gerado pelo Capacitor
capacitor.config.ts            # Configuração do Capacitor
firestore.rules                # Regras de segurança do banco
```
