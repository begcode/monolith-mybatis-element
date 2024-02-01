import { defineStore } from 'pinia';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import en from 'element-plus/es/locale/lang/en';
import { store } from '../index';
import { useStorage } from '@/hooks/web/useStorage';
import { LocaleDropdownType } from '@/components/LocaleDropdown';

const { getStorage, setStorage } = useStorage('localStorage');

const elLocaleMap = {
  'zh-cn': zhCn,
  en: en,
};
interface LocaleState {
  currentLocale: LocaleDropdownType;
  localeMap: LocaleDropdownType[];
}

export const useLocaleStore = defineStore('locales', {
  state: (): LocaleState => {
    return {
      currentLocale: {
        lang: getStorage('lang') || 'zh-cn',
        elLocale: elLocaleMap[getStorage('lang') || 'zh-CN'],
      },
      // 多语言
      localeMap: [
        {
          lang: 'zh-cn',
          name: '简体中文',
        },
        {
          lang: 'en',
          name: 'English',
        },
      ],
    };
  },
  getters: {
    getCurrentLocale(): LocaleDropdownType {
      return this.currentLocale;
    },
    getLocaleMap(): LocaleDropdownType[] {
      return this.localeMap;
    },
  },
  actions: {
    setCurrentLocale(localeMap: LocaleDropdownType) {
      // this.locale = Object.assign(this.locale, localeMap)
      this.currentLocale.lang = localeMap?.lang;
      this.currentLocale.elLocale = elLocaleMap[localeMap?.lang];
      setStorage('lang', localeMap?.lang);
    },
  },
});

export const useLocaleStoreWithOut = () => {
  return useLocaleStore(store);
};
