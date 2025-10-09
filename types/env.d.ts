// / <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue';

    const component: DefineComponent;
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
    readonly VITE_APP_TITLE: string;
    readonly VITE_BASE_URL: string;
    readonly VITE_REQUEST_URL: string;
    readonly VITE_PORT: number;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
