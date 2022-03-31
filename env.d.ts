/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_FIREBASE_API_KEY: String,
    readonly VITE_APP_FIREBASE_AUTH_DOMAIN: String,
    readonly VITE_APP_FIREBASE_PROJECT_ID: String,
    readonly VITE_APP_FIREBASE_STORAGE_BUCKET: String,
    readonly VITE_APP_FIREBASE_MESSAGE_SENDER_ID: String,
    readonly VITE_APP_FIREBASE_APP_ID: String,
    readonly VITE_APP_DEFAULT_EMAIL: String,
    readonly VITE_APP_DEFAULT_PASSWORD: String,
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv;
}