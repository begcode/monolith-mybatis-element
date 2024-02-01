import { watch, ref } from 'vue';
import { isString } from '@begcode/components';
import { useAppStoreWithOut } from '@/store/modules/app';
import { useI18n } from '@/hooks/web/useI18n';

export const useTitle = (newTitle?: string) => {
  const appStore = useAppStoreWithOut();
  const { t } = useI18n();
  const title = ref(newTitle ? `${appStore.getTitle} - ${t(newTitle as string)}` : appStore.getTitle);

  watch(
    title,
    (n, o) => {
      if (isString(n) && n !== o && document) {
        document.title = n;
      }
    },
    { immediate: true },
  );

  return title;
};
