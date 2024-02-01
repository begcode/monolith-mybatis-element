import { resolve } from 'path';
import { loadEnv } from 'vite';
import type { UserConfig, ConfigEnv } from 'vite';
import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import progress from 'vite-plugin-progress';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import { viteMockServe } from 'vite-plugin-mock';
import PurgeIcons from 'vite-plugin-purge-icons';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import';
import UnoCSS from 'unocss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import dayjs from 'dayjs';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import pkg from './package.json';

// https://vitejs.dev/config/
const root = process.cwd();

function pathResolve(dir: string) {
  return resolve(root, '.', dir);
}

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
};

export default ({ command, mode }: ConfigEnv): UserConfig => {
  let env = {} as any;
  const isBuild = command === 'build';
  if (!isBuild) {
    env = loadEnv(process.argv[3] === '--mode' ? process.argv[4] : process.argv[3], root);
  } else {
    env = loadEnv(mode, root);
  }
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    Vue({
      script: {
        // 开启defineModel
        defineModel: true,
      },
    }),
    VueJsx(),
    progress(),
  ];
  !isBuild &&
    vitePlugins.push(
      viteStaticCopy({
        targets: [
          {
            src: 'node_modules/swagger-ui-dist/*.{html,css,png,js}',
            dest: 'swagger-ui',
          },
          {
            src: 'node_modules/axios/dist/axios.min.js',
            dest: 'swagger-ui',
          },
          {
            src: 'dev/swagger-ui/index.html',
            dest: 'swagger-ui',
          },
        ],
      }),
    );
  if (env.VITE_USE_ALL_ELEMENT_PLUS_STYLE === 'false') {
    vitePlugins.push(
      createStyleImportPlugin({
        resolves: [ElementPlusResolve()],
        libs: [
          {
            libraryName: 'element-plus',
            esModule: true,
            resolveStyle: name => {
              if (name === 'click-outside') {
                return '';
              }
              return `element-plus/es/components/${name.replace(/^el-/, '')}/style/css`;
            },
          },
        ],
      }),
    );
  }
  // !isBuild && vitePlugins.push(EslintPlugin({cache: false,include: ['src/**/*.vue', 'src/**/*.ts', 'src/**/*.tsx']}));
  vitePlugins.push(VueI18nPlugin({ runtimeOnly: true, compositionOnly: true, include: [resolve(__dirname, 'src/locales/**')] }));
  vitePlugins.push(createSvgIconsPlugin({ iconDirs: [pathResolve('src/assets/svgs')], symbolId: 'icon-[dir]-[name]', svgoOptions: true }));
  vitePlugins.push(PurgeIcons());
  if (env.VITE_USE_MOCK === 'true') {
    vitePlugins.push(
      viteMockServe({
        ignore: /^\_/,
        mockPath: 'mock',
        localEnabled: !isBuild,
        prodEnabled: isBuild,
        injectCode: `
import { setupProdMockServer } from '../mock/_createProductionServer'

setupProdMockServer()
`,
      }),
    );
  }
  vitePlugins.push(
    ViteEjsPlugin({
      title: env.VITE_APP_TITLE,
    }),
  );
  vitePlugins.push(UnoCSS());
  return {
    base: env.VITE_BASE_PATH,
    plugins: vitePlugins,
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.less', '.css'],
      alias: [
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
        },
        {
          find: /\@\//,
          replacement: `${pathResolve('src')}/`,
        },
      ],
    },
    esbuild: {
      pure: env.VITE_DROP_CONSOLE === 'true' ? ['console.log'] : undefined,
      drop: env.VITE_DROP_DEBUGGER === 'true' ? ['debugger'] : undefined,
    },
    build: {
      target: 'es2015',
      outDir: env.VITE_OUT_DIR || 'dist',
      sourcemap: env.VITE_SOURCEMAP === 'true',
      // brotliSize: false,
      rollupOptions: {
        plugins: env.VITE_USE_BUNDLE_ANALYZER === 'true' ? [visualizer()] : undefined,
        // 拆包
        output: {
          manualChunks: {
            'vue-chunks': ['vue', 'vue-router', 'pinia', 'vue-i18n'],
            'element-plus': ['element-plus'],
            'wang-editor': ['@wangeditor/editor', '@wangeditor/editor-for-vue'],
            echarts: ['echarts', 'echarts-wordcloud'],
          },
        },
      },
      cssCodeSplit: !(env.VITE_USE_CSS_SPLIT === 'false'),
    },
    server: {
      port: 4000,
      proxy: {
        // 选项写法
        '/api/': {
          target: 'http://127.0.0.1:8080',
          changeOrigin: true,
          // rewrite: path => path.replace(/^\/api/, '')
          // /api/,/services/,/management/,/v3/api-docs/,/h2-console/,/auth/,/upload/
        },
        '/services/': {
          target: 'http://127.0.0.1:8080',
          changeOrigin: true,
        },
        '/management/': {
          target: 'http://127.0.0.1:8080',
          changeOrigin: true,
        },
        '/v3/api-docs/': {
          target: 'http://127.0.0.1:8080',
          changeOrigin: true,
        },
        '/h2-console/': {
          target: 'http://127.0.0.1:8080',
          changeOrigin: true,
        },
        '/auth/': {
          target: 'http://127.0.0.1:8080',
          changeOrigin: true,
        },
        '/upload/': {
          target: 'http://127.0.0.1:8080',
          changeOrigin: true,
        },
      },
      hmr: {
        overlay: false,
      },
      host: '0.0.0.0',
    },
    define: {
      // setting vue-i18-next
      // Suppress warning
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        'vue-types',
        'element-plus/es/locale/lang/zh-cn',
        'element-plus/es/locale/lang/en',
        '@iconify/iconify',
        '@vueuse/core',
        'axios',
        'qs',
        'echarts',
        'echarts-wordcloud',
        'qrcode',
        '@wangeditor/editor',
        '@wangeditor/editor-for-vue',
        '@zxcvbn-ts/core',
        'dayjs',
        'cropperjs',
      ],
    },
  };
};
