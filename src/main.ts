import uviewPlus from 'uview-plus';
import { createSSRApp } from 'vue';

import router from '@/router';
import pinia from '@/stores';

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
