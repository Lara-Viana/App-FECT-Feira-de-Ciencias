// Inicialização do Firebase (banco de dados Cloud Firestore).
//
// As chaves vêm de variáveis de ambiente `NEXT_PUBLIC_FIREBASE_*` (arquivo `.env.local`,
// veja `.env.example`). Elas são "embutidas" no app na hora do build.

import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import {
  initializeFirestore,
  getFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  type Firestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/** `true` quando o `.env.local` foi preenchido. As telas usam isso para avisar o usuário. */
export const firebaseConfigurado = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId
);

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

/**
 * Devolve a instância do Firestore (criada uma única vez — padrão "singleton").
 *
 * No navegador/APK ligamos o cache local persistente (IndexedDB): os dados já
 * baixados continuam disponíveis sem internet e as gravações feitas offline são
 * enviadas sozinhas quando a conexão volta.
 */
export function getDb(): Firestore {
  if (db) return db;

  app = getApps().length ? getApp() : initializeApp(firebaseConfig);

  if (typeof window !== "undefined") {
    try {
      db = initializeFirestore(app, {
        localCache: persistentLocalCache({
          tabManager: persistentMultipleTabManager(),
        }),
      });
    } catch {
      // Já inicializado (ex.: hot reload) ou IndexedDB indisponível: usa o modo padrão.
      db = getFirestore(app);
    }
  } else {
    db = getFirestore(app);
  }
  return db;
}
