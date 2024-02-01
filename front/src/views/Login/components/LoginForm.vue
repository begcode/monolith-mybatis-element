<script setup lang="tsx">
import { reactive, ref, watch, onMounted, unref } from 'vue';
import { Form, FormSchema, BaseButton, Icon } from '@begcode/components';
import { useI18n } from '@/hooks/web/useI18n';
import { ElCheckbox, ElLink } from 'element-plus';
import { useForm } from '@/hooks/web/useForm';
import accountApi from '@/api/account/account.service';
import viewPermissionService from '@/api/system/view-permission.service';
import { useAppStore } from '@/store/modules/app';
import { useUserStoreWithOut } from '@/store/modules/user';
import { usePermissionStore } from '@/store/modules/permission';
import { useRouter } from 'vue-router';
import type { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router';
import { UserType } from '@/api/login/types';
import { useValidator } from '@/hooks/web/useValidator';

const { required } = useValidator();

const emit = defineEmits(['to-register']);

const appStore = useAppStore();

const permissionStore = usePermissionStore();

const userStore = useUserStoreWithOut();

const { currentRoute, addRoute, push } = useRouter();

const { t } = useI18n();

const rules = {
  username: [required()],
  password: [required()],
};

const schema = reactive<FormSchema[]>([
  {
    field: 'title',
    colProps: {
      span: 24,
    },
    formItemProps: {
      slots: {
        default: () => {
          return <h2 class="text-2xl font-bold text-center w-[100%]">{t('login.login')}</h2>;
        },
      },
    },
  },
  {
    field: 'username',
    label: t('login.username'),
    value: 'admin',
    component: 'Input',
    colProps: {
      span: 24,
    },
    componentProps: {
      placeholder: t('login.usernamePlaceholder'),
    },
  },
  {
    field: 'password',
    label: t('login.password'),
    value: 'admin',
    component: 'InputPassword',
    colProps: {
      span: 24,
    },
    componentProps: {
      style: {
        width: '100%',
      },
      placeholder: t('login.passwordPlaceholder'),
    },
  },
  {
    field: 'tool',
    colProps: {
      span: 24,
    },
    formItemProps: {
      slots: {
        default: () => {
          return (
            <>
              <div class="flex justify-between items-center w-[100%]">
                <ElCheckbox v-model={remember.value} label={t('login.remember')} size="small" />
                <ElLink type="primary" underline={false}>
                  {t('login.forgetPassword')}
                </ElLink>
              </div>
            </>
          );
        },
      },
    },
  },
  {
    field: 'login',
    colProps: {
      span: 24,
    },
    formItemProps: {
      slots: {
        default: () => {
          return (
            <>
              <div class="w-[100%]">
                <BaseButton loading={loading.value} type="primary" class="w-[100%]" onClick={signIn}>
                  {t('login.login')}
                </BaseButton>
              </div>
              <div class="w-[100%] mt-15px">
                <BaseButton class="w-[100%]" onClick={toRegister}>
                  {t('login.register')}
                </BaseButton>
              </div>
            </>
          );
        },
      },
    },
  },
  {
    field: 'other',
    component: 'Divider',
    label: t('login.otherLogin'),
    componentProps: {
      contentPosition: 'center',
    },
  },
  {
    field: 'otherIcon',
    colProps: {
      span: 24,
    },
    formItemProps: {
      slots: {
        default: () => {
          return (
            <>
              <div class="flex justify-between w-[100%]">
                <Icon
                  icon="ant-design:github-filled"
                  size={iconSize}
                  class="cursor-pointer ant-icon"
                  color={iconColor}
                  hoverColor={hoverColor}
                />
                <Icon
                  icon="ant-design:wechat-filled"
                  size={iconSize}
                  class="cursor-pointer ant-icon"
                  color={iconColor}
                  hoverColor={hoverColor}
                />
                <Icon
                  icon="ant-design:alipay-circle-filled"
                  size={iconSize}
                  color={iconColor}
                  hoverColor={hoverColor}
                  class="cursor-pointer ant-icon"
                />
                <Icon
                  icon="ant-design:weibo-circle-filled"
                  size={iconSize}
                  color={iconColor}
                  hoverColor={hoverColor}
                  class="cursor-pointer ant-icon"
                />
              </div>
            </>
          );
        },
      },
    },
  },
]);

const iconSize = 30;

const remember = ref(userStore.getRememberMe);

const initLoginInfo = () => {
  const loginInfo = userStore.getLoginInfo;
  if (loginInfo) {
    const { username, password } = loginInfo;
    setValues({ username, password });
  }
};
onMounted(() => {
  initLoginInfo();
});

const { formRegister, formMethods, setValues } = useForm();
const { getFormData, getElFormExpose } = formMethods;

const loading = ref(false);

const iconColor = '#999';

const hoverColor = 'var(--el-color-primary)';

const redirect = ref<string>('');

watch(
  () => currentRoute.value,
  (route: RouteLocationNormalizedLoaded) => {
    redirect.value = route?.query?.redirect as string;
  },
  {
    immediate: true,
  },
);

// 登录
const signIn = async () => {
  const formRef = await getElFormExpose();
  await formRef?.validate(async isValid => {
    if (isValid) {
      loading.value = true;
      const formData = await getFormData<UserType>();

      try {
        const res: any = await accountApi.authenticateWithoutCaptcha(formData);

        if (res && res.id_token) {
          userStore.setToken(res.id_token);
          const userInfo = await accountApi.getAccount();
          // userStore.setRememberMe(unref(remember))
          userStore.setUserInfo(userInfo);
          // 是否使用动态路由
          if (appStore.getDynamicRouter) {
            await getRole();
          } else {
            await permissionStore.generateRoutes('static').catch(() => {});
            permissionStore.getAddRouters.forEach(route => {
              addRoute(route as RouteRecordRaw); // 动态添加可访问路由表
            });
            permissionStore.setIsAddRouters(true);
            push({ path: redirect.value || permissionStore.addRouters[0].path });
          }
        }
      } finally {
        loading.value = false;
      }
    }
  });
};

// 获取角色信息
const getRole = async () => {
  const formData = await getFormData<UserType>();
  const params = {
    roleName: formData.username,
  };
  // admin - 模拟后端过滤菜单
  // test - 模拟前端过滤菜单
  const res = await viewPermissionService.treeByLogin();
  if (res) {
    const routers = res || [];
    await permissionStore.generateRoutes('backend', routers).catch(() => {});

    permissionStore.getAddRouters.forEach(route => {
      addRoute(route as RouteRecordRaw); // 动态添加可访问路由表
    });
    permissionStore.setIsAddRouters(true);
    push({ path: redirect.value || permissionStore.addRouters[0].path });
  }
};

// 去注册页面
const toRegister = () => {
  emit('to-register');
};
</script>

<template>
  <Form
    :schema="schema"
    :rules="rules"
    label-position="top"
    hide-required-asterisk
    size="large"
    class="dark:(border-1 border-[var(--el-border-color)] border-solid)"
    @register="formRegister"
  />
</template>
