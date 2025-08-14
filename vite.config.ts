// Vite中文网：https://vitejs.cn/config/
import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import uni from '@dcloudio/vite-plugin-uni';
import { UnifiedViteWeappTailwindcssPlugin } from 'weapp-tailwindcss/vite';
import autoprefixer from 'autoprefixer';
import tailwindcss from '@tailwindcss/postcss';

export default defineConfig(({ mode }) => {
    const root = process.cwd();
    const env = loadEnv(mode, root);
    const isH5 = process.env.UNI_PLATFORM === 'h5';
    const isApp = process.env.UNI_PLATFORM === 'app';
    const WeappTailwindcssDisabled = isH5 || isApp;
    return {
        base: './',
        // 设置路径别名
        resolve: {
            alias: {
                '@': resolve('./src')
            },
            extensions: ['.mjs', '.js', '.json', '.ts', '.vue'] // 使用路径别名时想要省略的后缀名，可以自己 增减
        },
        // 自定义全局变量
        define: {
            'process.env': {}
        },
        // 开发服务器配置
        server: {
            host: true,
            port: env.VITE_PORT as any,
            proxy: {
                '/api': {
                    target: env.VITE_REQUEST_URL,
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/api/, '') // 取消注释并启用这个rewrite规则
                }
            }
        },
        // CSS 预处理器配置
        css: {
            postcss: {
                plugins: [tailwindcss(), autoprefixer()]
            }
        },
        // 插件
        plugins: [
            uni(),
            UnifiedViteWeappTailwindcssPlugin({
                rem2rpx: true,
                disabled: WeappTailwindcssDisabled
            })
        ]
    };
});
