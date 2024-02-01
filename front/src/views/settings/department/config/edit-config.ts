import { FormSchema } from '@begcode/components';
import apiService from '@/api/index';

const departmentService = apiService.settings.departmentService;
const relationshipApis: any = {
  children: apiService.settings.departmentService.tree,
  authorities: apiService.system.authorityService.tree,
  parent: apiService.settings.departmentService.tree,
  users: apiService.system.userService.retrieve,
};

// begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！

const fields = (): FormSchema[] => {
  const relationshipApiData: any = {
    childrenOptions: [],
    authoritiesOptions: [],
    parentOptions: [],
    usersOptions: [],
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
      label: '名称',
      field: 'name',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入名称', style: 'width: 100%' },
    },
    {
      label: '代码',
      field: 'code',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入代码', style: 'width: 100%' },
    },
    {
      label: '地址',
      field: 'address',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入地址', style: 'width: 100%' },
    },
    {
      label: '联系电话',
      field: 'phoneNum',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入联系电话', style: 'width: 100%' },
    },
    {
      label: 'logo地址',
      field: 'logo',
      component: 'ImageUpload',
      componentProps: { api: apiService.files.uploadImageService.create },
    },
    {
      label: '联系人',
      field: 'contact',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入联系人', style: 'width: 100%' },
    },
    {
      label: '创建用户 Id',
      field: 'createUserId',
      component: 'InputNumber',
      componentProps: { placeholder: '请输入创建用户 Id', controls: false, style: 'width: 100%' },
    },
    {
      label: '创建时间',
      field: 'createTime',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入创建时间', style: 'width: 100%' },
    },
    {
      label: '角色列表',
      field: 'authorities',
      component: 'TreeSelectLabelIn',
      componentProps: {
        labelInValue: true,
        remote: true,
        remoteMethod: async params => {
          const result = await relationshipApis.authorities(params);
          relationshipApiData.authoritiesOptions = result.records;
        },
        valueKey: 'id',
        multiple: true,
        showCheckbox: true,
        checkOnClickNode: true,
        checkStrictly: true,
        data: relationshipApiData.authoritiesOptions,
        props: { children: 'children', label: 'name' },
        placeholder: '请选择角色列表',
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
