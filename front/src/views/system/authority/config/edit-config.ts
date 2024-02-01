import { FormSchema } from '@begcode/components';
import apiService from '@/api/index';

const authorityService = apiService.system.authorityService;
const relationshipApis: any = {
  children: apiService.system.authorityService.tree,
  viewPermissions: apiService.system.viewPermissionService.tree,
  apiPermissions: apiService.system.apiPermissionService.tree,
  parent: apiService.system.authorityService.tree,
  users: apiService.system.userService.retrieve,
  department: apiService.settings.departmentService.tree,
};

// begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！

const fields = (): FormSchema[] => {
  const relationshipApiData: any = {
    childrenOptions: [],
    viewPermissionsOptions: [],
    apiPermissionsOptions: [],
    parentOptions: [],
    usersOptions: [],
    departmentOptions: [],
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
      label: '角色名称',
      field: 'name',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入角色名称', style: 'width: 100%' },
    },
    {
      label: '角色代号',
      field: 'code',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入角色代号', style: 'width: 100%' },
    },
    {
      label: '信息',
      field: 'info',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入信息', style: 'width: 100%' },
    },
    {
      label: '排序',
      field: 'order',
      component: 'InputNumber',
      componentProps: { placeholder: '请输入排序', controls: false, style: 'width: 100%' },
    },
    {
      label: '展示',
      field: 'display',
      component: 'Switch',
      componentProps: { placeholder: '请选择展示' },
    },
    {
      label: '菜单列表',
      field: 'viewPermissions',
      component: 'TreeSelectLabelIn',
      componentProps: {
        labelInValue: true,
        remote: true,
        remoteMethod: async params => {
          const result = await relationshipApis.viewPermissions(params);
          relationshipApiData.viewPermissionsOptions = result.records;
        },
        valueKey: 'id',
        multiple: true,
        showCheckbox: true,
        checkOnClickNode: true,
        checkStrictly: true,
        data: relationshipApiData.viewPermissionsOptions,
        props: { children: 'children', label: 'text' },
        placeholder: '请选择菜单列表',
      },
    },
    {
      label: 'Api权限列表',
      field: 'apiPermissions',
      component: 'TreeSelectLabelIn',
      componentProps: {
        labelInValue: true,
        remote: true,
        remoteMethod: async params => {
          const result = await relationshipApis.apiPermissions(params);
          relationshipApiData.apiPermissionsOptions = result.records;
        },
        valueKey: 'id',
        multiple: true,
        showCheckbox: true,
        checkOnClickNode: true,
        checkStrictly: true,
        data: relationshipApiData.apiPermissionsOptions,
        props: { children: 'children', label: 'name' },
        placeholder: '请选择Api权限列表',
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
