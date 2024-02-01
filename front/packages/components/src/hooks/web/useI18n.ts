import { i18n } from '@/plugins/vueI18n';
import { allEnums } from '@/models/enumerations/all-enums';

type I18nGlobalTranslation = {
  (key: string): string;
  (key: string, locale: string): string;
  (key: string, locale: string, list: unknown[]): string;
  (key: string, locale: string, named: Record<string, unknown>): string;
  (key: string, list: unknown[]): string;
  (key: string, named: Record<string, unknown>): string;
};

type getEnumDictType = {
  (enumType: any): any[];
};

type I18nTranslationRestParameters = [string, any];

const getKey = (namespace: string | undefined, key: string) => {
  if (!namespace) {
    return key;
  }
  if (key.startsWith(namespace)) {
    return key;
  }
  return `${namespace}.${key}`;
};

export const useI18n = (
  namespace?: string,
): {
  t: I18nGlobalTranslation;
  getEnumDict: getEnumDictType;
} => {
  const normalFn = {
    t: (key: string) => {
      return getKey(namespace, key);
    },
    getEnumDict: (enumType: any) => {
      const enumDictKeys = allEnums[enumType];
      const result: any[] = [];
      Object.keys(enumDictKeys).forEach(key => {
        result.push({ label: key, value: key });
      });
      return result;
    },
  };

  if (!i18n) {
    return normalFn;
  }

  const { t, ...methods } = i18n.global;

  const tFn: I18nGlobalTranslation = (key: string, ...arg: any[]) => {
    if (!key) return '';
    if (!key.includes('.') && !namespace) return key;
    return (t as any)(getKey(namespace, key), ...(arg as I18nTranslationRestParameters));
  };
  const getEnumDict = (enumType: any) => {
    const enumDictKeys = allEnums[enumType];
    const result: any[] = [];
    Object.keys(enumDictKeys).forEach(key => {
      result.push({ label: tFn(`testElementApp.${enumType}.` + key), value: key });
    });
    return result;
  };
  return {
    ...methods,
    t: tFn,
    getEnumDict,
  };
};

export const t = (key: string) => key;
