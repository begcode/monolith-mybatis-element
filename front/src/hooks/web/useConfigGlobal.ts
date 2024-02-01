import { inject } from 'vue';
import { ConfigGlobalTypes } from '@/components/ConfigGlobal';

export const useConfigGlobal = () => {
  const configGlobal = inject('configGlobal', {}) as ConfigGlobalTypes;

  return {
    configGlobal,
  };
};
