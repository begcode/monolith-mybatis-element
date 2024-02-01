import { FormSchema } from '@begcode/components';
import { useI18n } from '@/hooks/web/useI18n';
import apiService from '@/api/index';

const viewPermissionService = apiService.system.viewPermissionService;
const relationshipApis: any = {
  children: apiService.system.viewPermissionService.tree,
  parent: apiService.system.viewPermissionService.tree,
  authorities: apiService.system.authorityService.tree,
};

// begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！

const fields = (): FormSchema[] => {
  const { getEnumDict } = useI18n();
  const relationshipApiData: any = {
    childrenOptions: [],
    parentOptions: [],
    authoritiesOptions: [],
  };
  return [
    {
      label: 'ID',
      field: 'id',
      hidden: values => {
        return !values || !values.id;
      },
      component: 'InputNumber',
      componentProps: { placeholder: '请输入ID', controls: false, readonly: true, style: 'width: 100%' },
    },
    {
      label: '权限名称',
      field: 'text',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入权限名称', style: 'width: 100%' },
    },
    {
      label: '权限类型',
      field: 'type',
      component: 'RadioButtonGroup',
      componentProps: () => {
        return { options: getEnumDict('ViewPermissionType'), optionType: 'button', style: 'width: 100%' };
      },
    },
    {
      label: 'i18n主键',
      field: 'i18n',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入i18n主键', style: 'width: 100%' },
    },
    {
      label: '显示分组名',
      field: 'group',
      component: 'Switch',
      componentProps: { placeholder: '请选择显示分组名' },
    },
    {
      label: '路由',
      field: 'link',
      hidden: values => {
        return !(values && values.type === 'MENU');
      },
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入路由', style: 'width: 100%' },
    },
    {
      label: '外部链接',
      field: 'externalLink',
      hidden: values => {
        return !(values && values.type === 'MENU');
      },
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入外部链接', style: 'width: 100%' },
    },
    {
      label: '链接目标',
      field: 'target',
      hidden: values => {
        return !(values && values.type === 'MENU');
      },
      component: 'Select',
      componentProps: () => {
        const { getEnumDict } = useI18n();
        return { placeholder: '请选择链接目标', options: getEnumDict('TargetType'), style: 'width: 100%' };
      },
    },
    {
      label: '图标',
      field: 'icon',
      component: 'IconPicker',
      componentProps: { placeholder: '请选择图标', style: 'width: 100%' },
    },
    {
      label: '禁用菜单',
      field: 'disabled',
      component: 'Switch',
      componentProps: { placeholder: '请选择禁用菜单' },
    },
    {
      label: '隐藏菜单',
      field: 'hide',
      hidden: values => {
        return !(values && values.type === 'MENU');
      },
      component: 'Switch',
      componentProps: { placeholder: '请选择隐藏菜单' },
    },
    {
      label: '隐藏面包屑',
      field: 'hideInBreadcrumb',
      hidden: values => {
        return !(values && values.type === 'MENU');
      },
      component: 'Switch',
      componentProps: { placeholder: '请选择隐藏面包屑' },
    },
    {
      label: '快捷菜单项',
      field: 'shortcut',
      hidden: values => {
        return !(values && values.type === 'MENU');
      },
      component: 'Switch',
      componentProps: { placeholder: '请选择快捷菜单项' },
    },
    {
      label: '菜单根节点',
      field: 'shortcutRoot',
      hidden: values => {
        return !(values && values.type === 'MENU');
      },
      component: 'Switch',
      componentProps: { placeholder: '请选择菜单根节点' },
    },
    {
      label: '允许复用',
      field: 'reuse',
      hidden: values => {
        return !(values && values.type === 'MENU');
      },
      component: 'Switch',
      componentProps: { placeholder: '请选择允许复用' },
    },
    {
      label: '权限代码',
      field: 'code',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入权限代码', style: 'width: 100%' },
    },
    {
      label: '权限描述',
      field: 'description',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入权限描述', style: 'width: 100%' },
    },
    {
      label: '排序',
      field: 'order',
      component: 'InputNumber',
      componentProps: { placeholder: '请输入排序', controls: false, style: 'width: 100%' },
    },
    {
      label: 'api权限标识串',
      field: 'apiPermissionCodes',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入api权限标识串', style: 'width: 100%' },
    },
    {
      label: '组件名称',
      field: 'componentFile',
      hidden: values => {
        return !(values && values.type === 'MENU');
      },
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入组件名称', style: 'width: 100%' },
    },
    {
      label: '重定向路径',
      field: 'redirect',
      hidden: values => {
        return !(values && values.type === 'MENU');
      },
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入重定向路径', style: 'width: 100%' },
    },
    {
      label: '上级',
      field: 'parent',
      component: 'TreeSelectLabelIn',
      componentProps: {
        remote: true,
        remoteMethod: async params => {
          const result = await relationshipApis.parent(params);
          relationshipApiData.parentOptions = result.records;
        },
        valueKey: 'id',
        data: relationshipApiData.parentOptions,
        props: { children: 'children', label: 'text' },
        placeholder: '请选择上级',
      },
    },
  ];
};
const rules = (): any => ({
  text: [{ required: true, message: '必填项' }],
  code: [{ required: true, message: '必填项' }],
});
export default {
  fields,
  rules,
};
