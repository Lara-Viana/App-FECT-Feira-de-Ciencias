import type { NextConfig } from "next";

/**
 * Configuração do Next.js.
 *
 * - `output: "export"` gera um site 100% estático na pasta `out/`.
 *   É essa pasta que o Capacitor empacota dentro do APK Android.
 * - `trailingSlash: true` gera `/projetos/index.html` em vez de `/projetos.html`,
 *   o que funciona melhor quando o app é servido de dentro do APK.
 * - `images.unoptimized` é obrigatório no modo export (não há servidor de imagens).
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
