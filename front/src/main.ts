// 引入windi css
import '@/plugins/unocss';

// 导入全局的svg图标
import '@/plugins/svgIcon';

// 初始化多语言
import { createApp } from 'vue';
import { setupPermission } from './directives';
import { setupRouter } from './router';
import App from './App.vue';
import { setupI18n } from '@/plugins/vueI18n';

// 引入状态管理
import { setupStore } from '@/store';

// 全局组件
import { setupGlobCom } from '@/components';

// 引入element-plus
import { setupElementPlus } from '@/plugins/elementPlus';

// 引入全局样式
import '@/styles/index.scss';

// 引入动画
import '@/plugins/animate.css';

// 路由

// 权限

import './permission';

import apiService from '@/api/index';

import './utils/useMonacoWork';

// 创建实例
const setupAll = async () => {
  const app = createApp(App);
  app.config.globalProperties.$apiService = apiService;

  await setupI18n(app);

  setupStore(app);

  setupGlobCom(app);

  setupElementPlus(app);

  setupRouter(app);

  setupPermission(app);

  app.mount('#app');
};

setupAll();
