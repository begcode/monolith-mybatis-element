import { useI18n } from '@/hooks/web/useI18n';
import router from '@/router';

export const hasPermi = (value: string) => {
  const { t } = useI18n();
  const permission = (router.currentRoute.value.meta.permission || []) as string[];
  if (!value) {
    throw new Error(t('permission.hasPermission'));
  }
  return permission.includes(value);
};
