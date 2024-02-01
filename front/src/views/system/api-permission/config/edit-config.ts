import { FormSchema } from '@begcode/components';
import { useI18n } from '@/hooks/web/useI18n';
import apiService from '@/api/index';

const apiPermissionService = apiService.system.apiPermissionService;
const relationshipApis: any = {
  children: apiService.system.apiPermissionService.tree,
  parent: apiService.system.apiPermissionService.tree,
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
      label: '服务名称',
      field: 'serviceName',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入服务名称', style: 'width: 100%' },
    },
    {
      label: '权限名称',
      field: 'name',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入权限名称', style: 'width: 100%' },
    },
    {
      label: 'Code',
      field: 'code',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入Code', style: 'width: 100%' },
    },
    {
      label: '权限描述',
      field: 'description',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入权限描述', style: 'width: 100%' },
    },
    {
      label: '类型',
      field: 'type',
      component: 'Select',
      componentProps: () => {
        const { getEnumDict } = useI18n();
        return { placeholder: '请选择类型', options: getEnumDict('ApiPermissionType'), style: 'width: 100%' };
      },
    },
    {
      label: '请求类型',
      field: 'method',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入请求类型', style: 'width: 100%' },
    },
    {
      label: 'url 地址',
      field: 'url',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入url 地址', style: 'width: 100%' },
    },
    {
      label: '状态',
      field: 'status',
      component: 'Select',
      componentProps: () => {
        const { getEnumDict } = useI18n();
        return { placeholder: '请选择状态', options: getEnumDict('ApiPermissionState'), style: 'width: 100%' };
      },
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
        props: { children: 'children', label: 'name' },
        placeholder: '请选择上级',
      },
    },
  ];
};
const rules = (): any => ({});
export default {
  fields,
  rules,
};
