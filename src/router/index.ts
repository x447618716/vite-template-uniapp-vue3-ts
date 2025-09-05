import { createRouter } from 'uni-mini-router';
import type { Route } from 'uni-mini-router/lib/interfaces';
import pagesJsonToRoutes from 'uni-parse-pages';

import { useAuthStore } from '@/stores/modules/auth';

import pagesJson from '../pages.json';

const routes = pagesJsonToRoutes(pagesJson);

interface Meta {
    ignoreAuth?: boolean;
}

interface CustomRoute extends Route {
    meta?: Meta;
}

const router = createRouter({
    routes: [...routes] // 路由表信息
});

router.beforeEach((to: CustomRoute, _, next) => {
    const authStore = useAuthStore();
    if (to.meta?.ignoreAuth) {
        // 如果目标路由忽略验证直接跳转
        next();
    } else if (!authStore.isLogin && to.name !== 'Login') {
        // 如果没有登录且目标路由不是登录页面则跳转到登录页面
        next({ name: 'Login', navType: 'push' });
    } else if (authStore.isLogin && to.name === 'Login') {
        // 如果已经登录且目标页面是登录页面则跳转至首页
        next({ name: 'Home', navType: 'replaceAll' });
    } else {
        next();
    }
});

router.afterEach((to: CustomRoute) => {
    const authStore = useAuthStore();
    if (!authStore.isLogin) {
        if (to.meta?.ignoreAuth === undefined) {
            // 如果没有登录且目标路由不是忽略认证页面则跳转到登录页面
            router.replaceAll({ name: 'Login', params: { redirect: to.name ?? '', ...to.query } });
        }
    } else if (to.name === 'Login') {
        // 如果已经登录且目标页面是登录页面则跳转至首页
        router.replaceAll({ name: 'Home' });
    }
});

export default router;
