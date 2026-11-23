"use client";

import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";

/**
 * Registra o Service Worker (`public/sw.js`) para o app funcionar como PWA no navegador.
 *
 * Dentro do APK (Capacitor) NÃO registramos: os arquivos já estão empacotados no aplicativo,
 * então o service worker seria desnecessário.
 */
export default function PwaRegister() {
  useEffect(() => {
    if (Capacitor.isNativePlatform()) return;
    if (!("serviceWorker" in navigator)) return;
    // Só em produção, para não atrapalhar o `npm run dev`.
    if (process.env.NODE_ENV !== "production") return;

    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Falha ao registrar não impede o app de funcionar.
    });
  }, []);

  return null;
}
