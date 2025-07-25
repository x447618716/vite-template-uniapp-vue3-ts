import { createSSRApp } from 'vue';
import App from './App.vue';
import pinia from '@/stores';
import router from '@/router';
import uviewPlus from 'uview-plus';

export function createApp() {
    const app = createSSRApp(App);
    app.use(router);
    app.use(pinia);
    app.use(uviewPlus);
    return {
        app,
    };
}
