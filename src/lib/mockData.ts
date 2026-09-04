// Dados fictícios para prototipagem das telas.
// No próximo passo isso será substituído por chamadas a um backend / storage local.

export type Area =
  | "Exatas"
  | "Biológicas"
  | "Agrárias"
  | "Humanas"
  | "Tecnologia";

export type Project = {
  id: string;
  code: string; // código do estande, ex: "A-08"
  title: string;
  summary: string;
  description: string;
  area: Area;
  group: string[];
  advisor: string;
  location: string; // pavilhão / bloco
  image: string;
  score: number | null;
  feedback: string | null;
  studentUsername: string; // dono do projeto, p/ tela do aluno
};

export type ScheduleItem = {
  time: string;
  title: string;
  description: string;
  place: string;
};

export type Winner = {
  place: 1 | 2 | 3 | "menção";
  projectId: string;
  category: string;
};

export const eventInfo = {
  name: "Feira de Ciências",
  edition: "10ª Edição",
  institution: "IFSULDEMINAS – Campus Muzambinho",
  date: "18 de setembro de 2026",
  hours: "8h às 17h",
  address: "Quadra 1",
  theme: "Ciência, Tecnologia e Sustentabilidade no Campo",
};

export const schedule: ScheduleItem[] = [
  {
    time: "08h00",
    title: "Credenciamento e abertura",
    description: "Recepção de visitantes e montagem final dos estandes.",
    place: "Auditório",
  },
  {
    time: "09h00",
    title: "Avaliação dos projetos",
    description: "Professores avaliadores percorrem os estandes.",
    place: "Quadra 1",
  },
  {
    time: "12h00",
    title: "Intervalo para almoço",
    description: "Praça de alimentação aberta a expositores e visitantes.",
    place: "Refeitório",
  },
  {
    time: "13h30",
    title: "Visitação aberta ao público",
    description: "Escolas da região e comunidade visitam os projetos.",
    place: "Quadra 1",
  },
  {
    time: "16h00",
    title: "Cerimônia de premiação",
    description: "Anúncio dos projetos vencedores por categoria.",
    place: "Auditório",
  },
];

export const projects: Project[] = [
  {
    id: "p1",
    code: "A-01",
    title: "Biodigestor de baixo custo para propriedades familiares",
    summary: "Transformando resíduos orgânicos em biogás para pequenas propriedades.",
    description:
      "Protótipo de biodigestor construído com materiais de baixo custo, capaz de gerar biogás suficiente para uso doméstico a partir de dejetos de animais e restos de poda, pensado para pequenos produtores da região de Muzambinho.",
    area: "Agrárias",
    group: ["Maria Eduarda Souza", "João Pedro Lima"],
    advisor: "Prof. Carlos Andrade",
    location: "Quadra 1",
    image: "biodigestor rural agricultura sustentavel",
    score: 9.2,
    feedback:
      "Excelente aplicação prática. O grupo demonstrou domínio técnico e apresentou dados reais de rendimento de biogás. Sugiro aprofundar a análise de custo-benefício para diferentes escalas de propriedade.",
    studentUsername: "maria.souza",
  },
  {
    id: "p2",
    code: "A-02",
    title: "Sensor de umidade do solo com IoT",
    summary: "Irrigação inteligente monitorada por sensores conectados.",
    description:
      "Sistema de sensores de umidade conectados via Wi-Fi que enviam dados em tempo real para um aplicativo, permitindo irrigação automatizada e economia de água em cultivos de café.",
    area: "Tecnologia",
    group: ["Lucas Ferreira", "Ana Clara Ribeiro", "Pedro Henrique Melo"],
    advisor: "Prof.ª Renata Costa",
    location: "Quadra 1",
    image: "sensor solo irrigacao tecnologia agricola",
    score: null,
    feedback: null,
    studentUsername: "lucas.ferreira",
  },
  {
    id: "p3",
    code: "B-05",
    title: "Extração de corantes naturais de plantas do Cerrado",
    summary: "Corantes têxteis sustentáveis a partir de espécies nativas.",
    description:
      "Estudo da extração de pigmentos naturais de plantas do Cerrado mineiro para uso como corantes têxteis, avaliando fixação em tecidos e impacto ambiental reduzido frente aos corantes sintéticos.",
    area: "Biológicas",
    group: ["Beatriz Almeida", "Rafaela Nunes"],
    advisor: "Prof.ª Camila Duarte",
    location: "Quadra 1",
    image: "corantes naturais plantas laboratorio",
    score: 8.7,
    feedback:
      "Trabalho muito bem fundamentado, com boa revisão bibliográfica. A demonstração prática dos tecidos tingidos impressionou a banca. Poderia explorar mais a viabilidade de produção em escala.",
    studentUsername: "beatriz.almeida",
  },
  {
    id: "p4",
    code: "B-06",
    title: "Robô coletor de resíduos recicláveis",
    summary: "Protótipo robótico para triagem automática de recicláveis.",
    description:
      "Robô autônomo de baixo custo, controlado por Arduino, capaz de identificar e separar materiais recicláveis por tipo utilizando sensores de cor e peso.",
    area: "Tecnologia",
    group: ["Gustavo Torres", "Isabela Martins"],
    advisor: "Prof. Fábio Nogueira",
    location: "Quadra 1",
    image: "robo reciclagem arduino protótipo",
    score: 9.5,
    feedback:
      "Um dos projetos mais completos da feira. Engenharia sólida, apresentação clara e aplicação social evidente. Parabéns ao grupo pelo cuidado com os detalhes de construção.",
    studentUsername: "gustavo.torres",
  },
  {
    id: "p5",
    code: "C-09",
    title: "Educação financeira para pequenos agricultores",
    summary: "Jogo educativo sobre gestão financeira rural.",
    description:
      "Jogo de tabuleiro e aplicativo simples desenvolvidos para ensinar noções de gestão financeira e planejamento de safra para pequenos produtores rurais da região.",
    area: "Humanas",
    group: ["Camila Rodrigues", "Thiago Barbosa"],
    advisor: "Prof.ª Juliana Prado",
    location: "Quadra 1",
    image: "jogo educativo financas rural",
    score: 8.1,
    feedback:
      "Proposta criativa e bem conectada à realidade local. A dinâmica do jogo é clara. Recomendo testar com um grupo maior de produtores para validar o material.",
    studentUsername: "camila.rodrigues",
  },
  {
    id: "p6",
    code: "C-10",
    title: "Análise da qualidade da água de nascentes locais",
    summary: "Monitoramento físico-químico de nascentes da bacia do Muzambinho.",
    description:
      "Coleta e análise físico-química e microbiológica de amostras de água de nascentes próximas ao campus, comparando os resultados com os padrões de potabilidade estabelecidos pela legislação.",
    area: "Exatas",
    group: ["Eduardo Campos", "Larissa Freitas", "Vitor Hugo Silva"],
    advisor: "Prof. Marcelo Teixeira",
    location: "Quadra 1",
    image: "analise agua laboratorio quimica",
    score: null,
    feedback: null,
    studentUsername: "eduardo.campos",
  },
];

export const winners: Winner[] = [
  { place: 1, projectId: "p4", category: "Melhor Projeto Geral" },
  { place: 2, projectId: "p1", category: "Melhor Projeto Geral" },
  { place: 3, projectId: "p3", category: "Melhor Projeto Geral" },
  { place: "menção", projectId: "p5", category: "Destaque em Impacto Social" },
];

// Usuários fictícios apenas para simular os fluxos de login nesta etapa de telas.
export const mockProfessors = [
  { username: "carlos.andrade", name: "Prof. Carlos Andrade" },
  { username: "renata.costa", name: "Prof.ª Renata Costa" },
];

export const mockStudents = [
  { username: "maria.souza", name: "Maria Eduarda Souza", projectId: "p1" },
  { username: "lucas.ferreira", name: "Lucas Ferreira", projectId: "p2" },
];
