import { createSSRApp } from 'vue';
import uviewPlus from 'uview-plus';

import pinia from '@/stores';
import router from '@/router';

import App from './App.vue';

export function createApp() {
    const app = createSSRApp(App);
    app.use(router);
    app.use(pinia);
    app.use(uviewPlus);
    return {
        app
    };
}
