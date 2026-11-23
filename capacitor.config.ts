import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Configuração do Capacitor — a ferramenta que "embrulha" o site (pasta `out/`)
 * dentro de um aplicativo Android nativo, gerando o APK.
 */
const config: CapacitorConfig = {
  appId: "br.edu.ifsuldeminas.fect", // identificador único do app no Android
  appName: "FECT",
  webDir: "out", // pasta gerada por `npm run build` (next export)
};

export default config;
