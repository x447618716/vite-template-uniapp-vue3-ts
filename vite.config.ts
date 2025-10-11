// Vite中文网：https://vitejs.cn/config/
import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import uni from '@dcloudio/vite-plugin-uni';
import { UnifiedViteWeappTailwindcssPlugin } from 'weapp-tailwindcss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import autoprefixer from 'autoprefixer';
import tailwindcss from '@tailwindcss/postcss';
import visualizer from 'rollup-plugin-visualizer';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig(({ mode }) => {
    const root = process.cwd();
    const env = loadEnv(mode, root);
    const isProduction = mode === 'production';
    const isH5 = process.env.UNI_PLATFORM === 'h5';
    const isApp = process.env.UNI_PLATFORM === 'app';
    const WeappTailwindcssDisabled = isH5 || isApp;
    const plugins = isProduction
        ? [
              visualizer({
                  filename: './dist/stats.html', // 报告输出路径
                  open: true, // 构建后自动打开
                  gzipSize: true, // 显示gzip压缩大小
                  brotliSize: true // 显示brotli压缩大小
              })
          ]
        : [basicSsl()];
    return {
        base: './',
        // 设置路径别名
        resolve: {
            alias: {
                '@': resolve('./src')
            },
            extensions: ['.mjs', '.js', '.json', '.ts', '.vue'] // 使用路径别名时想要省略的后缀名，可以自己 增减
        },
        build: {
            minify: isProduction ? 'terser' : false,
            terserOptions: isProduction
                ? {
                      compress: {
                          drop_console: true // 移除所有console.*
                      },
                      format: {
                          comments: false // 删除注释
                      }
                  }
                : undefined
        },
        // 开发服务器配置
        server: {
            host: true,
            port: env.VITE_PORT as any,
            proxy: {
                '/api': {
                    target: env.VITE_REQUEST_URL,
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/api/, '')
                }
            }
        },
        // CSS 预处理器配置
        css: {
            preprocessorOptions: {
                scss: {
                    silenceDeprecations: ['legacy-js-api', 'import', 'mixed-decls'],
                    additionalData: '@import "uview-plus/theme.scss";'
                }
            },
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
            }),
            AutoImport({
                imports: ['vue', 'uni-app', 'pinia'],
                dirs: ['src/services/**', 'src/utils/**', 'src/enums/**', 'src/hooks/**', 'src/stores/modules/**'],
                packagePresets: ['uni-mini-router'],
                dts: 'types/auto-imports.d.ts'
            }),
            ...plugins
        ]
    };
});
