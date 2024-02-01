import { defineStore } from 'pinia';
import { cloneDeep } from 'lodash-es';
import { store } from '../index';
import { asyncRouterMap, constantRouterMap, devRouterMap } from '@/router';
import { generateRoutesByFrontEnd, generateRoutesByServer, flatMultiLevelRoutes } from '@/utils/routerHelper';
import { isDevMode } from '@/utils/env';

export interface PermissionState {
  routers: AppRouteRecordRaw[];
  addRouters: AppRouteRecordRaw[];
  isAddRouters: boolean;
  menuTabRouters: AppRouteRecordRaw[];
}

export const usePermissionStore = defineStore('permission', {
  state: (): PermissionState => ({
    routers: [],
    addRouters: [],
    isAddRouters: false,
    menuTabRouters: [],
  }),
  getters: {
    getRouters(): AppRouteRecordRaw[] {
      return this.routers;
    },
    getAddRouters(): AppRouteRecordRaw[] {
      return flatMultiLevelRoutes(cloneDeep(this.addRouters));
    },
    getIsAddRouters(): boolean {
      return this.isAddRouters;
    },
    getMenuTabRouters(): AppRouteRecordRaw[] {
      return this.menuTabRouters;
    },
  },
  actions: {
    generateRoutes(type: 'backend' | 'frontend' | 'static', routers?: AppCustomRouteRecordRaw[] | string[]): Promise<unknown> {
      return new Promise<void>(resolve => {
        let routerMap: AppRouteRecordRaw[] = [];
        if (type === 'backend') {
          // 模拟后端过滤菜单
          // 去掉第一层数据。
          const finalRouters: any[] = [];
          routers?.forEach(item => {
            finalRouters.push(...item.children);
          });
          routerMap = generateRoutesByServer(finalRouters as AppCustomRouteRecordRaw[]);
        } else if (type === 'frontend') {
          // 模拟前端过滤菜单
          routerMap = generateRoutesByFrontEnd(cloneDeep(asyncRouterMap), routers as string[]);
        } else {
          // 直接读取静态路由表
          routerMap = cloneDeep(asyncRouterMap);
        }
        // 补充关于/开发菜单
        if (isDevMode()) {
          routerMap.push(...cloneDeep(devRouterMap));
        }
        // 动态路由，404一定要放到最后面
        this.addRouters = routerMap.concat([
          {
            path: '/:path(.*)*',
            redirect: '/404',
            name: '404Page',
            meta: {
              hidden: true,
              breadcrumb: false,
            },
          },
        ]);
        // 渲染菜单的所有路由
        this.routers = cloneDeep(constantRouterMap).concat(routerMap);
        resolve();
      });
    },
    setIsAddRouters(state: boolean): void {
      this.isAddRouters = state;
    },
    setMenuTabRouters(routers: AppRouteRecordRaw[]): void {
      this.menuTabRouters = routers;
    },
  },
  persist: {
    paths: ['routers', 'addRouters', 'menuTabRouters'],
  },
});

export const usePermissionStoreWithOut = () => {
  return usePermissionStore(store);
};
