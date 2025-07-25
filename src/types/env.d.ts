// / <reference types="vite/client" />

declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<object, object, any>;
    export default component;
}

declare module '*.png' {
    const value: string;
    export default value;
}
declare module '*.jpg' {
    const value: string;
    export default value;
}

interface ImportMetaEnv {
    readonly VITE_ENV: string;
    readonly VITE_APP_TITLE: string;
    readonly VITE_BASE_URL: string;
    readonly VITE_UPLOAD_URL: string;
    readonly VITE_APP_CACHE_PREFIX: string;
    readonly VITE_PORT: number;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
