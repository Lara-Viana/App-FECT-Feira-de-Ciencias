// Service Worker do PWA — permite abrir o app mesmo sem internet.
//
// Estratégia simples:
//  - Arquivos estáticos do app (HTML, JS, CSS, ícones): tenta a internet primeiro e guarda uma
//    cópia; se estiver offline, entrega a cópia guardada.
//  - Chamadas ao Firebase NÃO passam por aqui: o próprio Firestore já mantém seu cache offline.

const CACHE = "fect-v1";

// Instala e já assume o controle sem esperar as abas antigas fecharem.
self.addEventListener("install", () => self.skipWaiting());

// Ao ativar, apaga caches de versões antigas.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Só cuidamos de GET do mesmo domínio (ignora Firebase, Google Fonts, etc.).
  if (req.method !== "GET" || url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(req)
      .then((res) => {
        // Guarda uma cópia da resposta para uso offline.
        const copia = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copia));
        return res;
      })
      .catch(() => caches.match(req).then((cached) => cached || caches.match("/")))
  );
});
