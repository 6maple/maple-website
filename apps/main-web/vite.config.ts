import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import VueRouter from 'vue-router/vite';
import tailwindcss from '@tailwindcss/vite';
import { createViteVueMDPlugin } from '@repo/markdown-core/vite';

export default defineConfig(() => {
  return {
    plugins: [
      createViteVueMDPlugin({ includes: ['src/pages/articles/**/*.md'] }),
      tailwindcss(),
      VueRouter({
        dts: 'src/route-map.d.ts',
        extensions: ['.vue', '.md'],
      }),
      vue({
        include: [/\.vue$/, /\.md$/],
      }),
      vueJsx(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@repo/utils': fileURLToPath(
          new URL('./../../packages/utils/src', import.meta.url),
        ),
        '@repo/ui': fileURLToPath(
          new URL('./../../packages/ui/src', import.meta.url),
        ),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          hostRewrite: 'localhost',
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});
