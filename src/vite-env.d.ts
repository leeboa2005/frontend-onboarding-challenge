/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    // 환경 변수
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
