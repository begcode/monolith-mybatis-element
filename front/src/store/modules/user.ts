import { defineStore } from 'pinia';
import { ElMessageBox } from 'element-plus';
import { store } from '../index';
import { useI18n } from '@/hooks/web/useI18n';
import { useTagsViewStore } from '@/store/modules/tagsView';
import router from '@/router';

export interface UserState {
  userInfo: any;
  token: string;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: '',
    userInfo: null,
  }),
  getters: {
    getUserInfo(): Object {
      return this.userInfo;
    },
    getToken(): string {
      return this.token;
    },
  },
  actions: {
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo;
    },
    setToken(token: string) {
      this.token = token;
    },
    removeToken() {
      this.token = '';
    },
    logoutConfirm() {
      const { t } = useI18n();
      ElMessageBox.confirm(t('common.loginOutMessage'), t('common.reminder'), {
        confirmButtonText: t('common.ok'),
        cancelButtonText: t('common.cancel'),
        type: 'warning',
      })
        .then(() => {
          this.reset();
        })
        .catch(() => {});
    },
    reset() {
      const tagsViewStore = useTagsViewStore();
      tagsViewStore.delAllViews();
      this.setToken('');
      this.setUserInfo(undefined);
      router.replace('/login');
    },
    logout() {
      this.token = '';
      this.userInfo = null;
      router.replace('/login');
    },
  },
  persist: true,
});

export const useUserStoreWithOut = () => {
  return useUserStore(store);
};
