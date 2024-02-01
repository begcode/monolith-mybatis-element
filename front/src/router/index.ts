import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';
import { Layout } from '@/utils/routerHelper';
import { useI18n } from '@/hooks/web/useI18n';
import { NO_RESET_WHITE_LIST } from '@/constants';

const { t } = useI18n();

export const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard/analysis',
    name: 'Root',
    meta: {
      hidden: true,
    },
  },
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/analysis',
    name: 'dashboard',
    meta: {
      hidden: true,
    },
  },
  {
    path: '/redirect',
    component: Layout,
    name: 'Redirect',
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/views/Redirect/Redirect.vue'),
        meta: {},
      },
    ],
    meta: {
      hidden: true,
      noTagsView: true,
    },
  },
  {
    path: '/user',
    component: Layout,
    name: 'user',
    redirect: 'noredirect',
    meta: {
      hidden: true,
    },
    children: [
      {
        path: '/user/profile',
        component: () => import('@/views/system/user/profile/index.vue'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' },
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/Login/Login.vue'),
    name: 'Login',
    meta: {
      hidden: true,
      title: t('router.login'),
      noTagsView: true,
    },
  },
  {
    path: '/404',
    component: () => import('@/views/Error/404.vue'),
    name: 'NoFind',
    meta: {
      hidden: true,
      title: '404',
      noTagsView: true,
    },
  },
];

export const devRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/dev',
    component: Layout,
    name: 'ComponentsDemo',
    meta: {
      title: t('router.component'),
      icon: 'bx:bxs-component',
      alwaysShow: true,
    },
    children: [
      {
        path: 'icon-picker',
        component: () => import('@/views/Components/IconPicker.vue'),
        name: 'IconPicker',
        meta: {
          title: t('router.iconPicker'),
        },
      },
      {
        path: 'doc',
        component: () => import('@/views/dev/doc.vue'),
        name: 'doc',
        meta: {
          title: t('router.apiDoc'),
        },
      },
    ],
  },
  {
    path: '/about',
    component: Layout,
    redirect: '/about/index',
    name: 'About',
    meta: {
      title: t('router.about'),
      icon: 'simple-icons:aboutdotme',
      alwaysShow: true,
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/about/index.vue'),
        name: 'AboutIndex',
        meta: {
          title: t('router.aboutme'),
        },
      },
    ],
  },
];

export const asyncRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/analysis',
    name: 'Dashboard',
    meta: {
      title: t('router.dashboard'),
      icon: 'ant-design:dashboard-filled',
      alwaysShow: true,
    },
    children: [
      {
        path: 'analysis',
        component: () => import('@/views/dashboard/Analysis.vue'),
        name: 'Analysis',
        meta: {
          title: t('router.analysis'),
          noCache: true,
          affix: true,
        },
      },
      {
        path: 'workplace',
        component: () => import('@/views/dashboard/Workplace.vue'),
        name: 'Workplace',
        meta: {
          title: t('router.workplace'),
          noCache: true,
        },
      },
    ],
  },
  {
    path: '/external-link',
    component: Layout,
    meta: {},
    name: 'ExternalLink',
    children: [
      {
        path: 'https://element-plus-admin-doc.cn/',
        name: 'DocumentLink',
        meta: {
          title: t('router.document'),
          icon: 'clarity:document-solid',
        },
      },
    ],
  },
  {
    path: '/guide',
    component: Layout,
    name: 'Guide',
    meta: {},
    children: [
      {
        path: 'index',
        component: () => import('@/views/Guide/Guide.vue'),
        name: 'GuideDemo',
        meta: {
          title: t('router.guide'),
          icon: 'cib:telegram-plane',
        },
      },
    ],
  },
  {
    path: '/components',
    component: Layout,
    name: 'ComponentsDemo',
    meta: {
      title: t('router.component'),
      icon: 'bx:bxs-component',
      alwaysShow: true,
    },
    children: [
      {
        path: 'icon-picker',
        component: () => import('@/views/Components/IconPicker.vue'),
        name: 'IconPicker',
        meta: {
          title: t('router.iconPicker'),
        },
      },
    ],
  },
  {
    path: '/error',
    component: Layout,
    redirect: '/error/404',
    name: 'Error',
    meta: {
      title: t('router.errorPage'),
      icon: 'ci:error',
      alwaysShow: true,
    },
    children: [
      {
        path: '404-demo',
        component: () => import('@/views/Error/404.vue'),
        name: '404Demo',
        meta: {
          title: '404',
        },
      },
      {
        path: '403-demo',
        component: () => import('@/views/Error/403.vue'),
        name: '403Demo',
        meta: {
          title: '403',
        },
      },
      {
        path: '500-demo',
        component: () => import('@/views/Error/500.vue'),
        name: '500Demo',
        meta: {
          title: '500',
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: constantRouterMap as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export const resetRouter = (): void => {
  router.getRoutes().forEach(route => {
    const { name } = route;
    if (name && !NO_RESET_WHITE_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
};

export const setupRouter = (app: App<Element>) => {
  app.use(router);
};

export default router;
