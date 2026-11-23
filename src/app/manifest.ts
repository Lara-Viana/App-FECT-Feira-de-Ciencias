import type { MetadataRoute } from "next";

// Necessário para o modo `output: "export"`: o manifesto é gerado uma vez, no build.
export const dynamic = "force-static";

/**
 * Manifesto PWA (Progressive Web App).
 *
 * É este arquivo que faz o navegador entender o site como "um aplicativo instalável":
 * nome, ícones, cor do tema e como abrir (tela cheia, sem barra do navegador).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FECT | IFSULDEMINAS Muzambinho",
    short_name: "FECT",
    description: "Aplicativo da Feira de Ciências do IFSULDEMINAS – Campus Muzambinho.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#F5F1E8",
    theme_color: "#1B4332",
    lang: "pt-BR",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
