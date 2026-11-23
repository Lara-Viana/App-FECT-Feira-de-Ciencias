import type { Metadata, Viewport } from "next";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import PwaRegister from "@/components/PwaRegister";
import "./globals.css";

// Fontes do Google carregadas pelo Next (baixadas no build e embutidas no app).
const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Título e descrição da página (aba do navegador / nome no PWA).
export const metadata: Metadata = {
  title: "FECT | IFSULDEMINAS Muzambinho",
  description:
    "Aplicativo oficial da FECT do IFSULDEMINAS | Campus Muzambinho.",
};

// Ajustes para celular: largura da tela, cor da barra do sistema e sem zoom por pinça.
export const viewport: Viewport = {
  themeColor: "#1B4332",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

/** Layout raiz: envolve TODAS as telas com o provedor de login e registra o PWA. */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink font-body">
        <AuthProvider>{children}</AuthProvider>
        {/* Registra o service worker do PWA (só no navegador, não no APK) */}
        <PwaRegister />
      </body>
    </html>
  );
}
