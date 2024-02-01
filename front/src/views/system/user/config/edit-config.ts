import { FormSchema } from '@begcode/components';
import { h } from 'vue';
import { ElOption } from 'element-plus';
import apiService from '@/api/index';

const userService = apiService.system.userService;
const relationshipApis: any = {
  department: apiService.settings.departmentService.tree,
  position: apiService.settings.positionService.retrieve,
  authorities: apiService.system.authorityService.tree,
};

// begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！

const fields = (): FormSchema[] => {
  const relationshipApiData: any = {
    departmentOptions: [],
    positionOptions: [],
    authoritiesOptions: [],
  };
  return [
    {
      label: '用户ID',
      field: 'id',
      hidden: values => {
        return !values || !values.id;
      },
      component: 'InputNumber',
      componentProps: { placeholder: '请输入用户ID', controls: false, readonly: true, style: 'width: 100%' },
    },
    {
      label: '账户名',
      field: 'login',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入账户名', style: 'width: 100%' },
    },
    {
      label: '密码',
      field: 'password',
      hidden: true,
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入密码', style: 'width: 100%' },
    },
    {
      label: '名字',
      field: 'firstName',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入名字', style: 'width: 100%' },
    },
    {
      label: '姓氏',
      field: 'lastName',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入姓氏', style: 'width: 100%' },
    },
    {
      label: '电子邮箱',
      field: 'email',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入电子邮箱', style: 'width: 100%' },
    },
    {
      label: '手机号码',
      field: 'mobile',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入手机号码', style: 'width: 100%' },
    },
    {
      label: '出生日期',
      field: 'birthday',
      component: 'DatePicker',
      componentProps: { valueFormat: 'YYYY-MM-DD hh:mm:ss', placeholder: '请选择出生日期', style: 'width: 100%' },
    },
    {
      label: '激活状态',
      field: 'activated',
      component: 'Switch',
      componentProps: { placeholder: '请选择激活状态' },
    },
    {
      label: '语言Key',
      field: 'langKey',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入语言Key', style: 'width: 100%' },
    },
    {
      label: '头像地址',
      field: 'imageUrl',
      component: 'Avatar',
    },
    {
      label: '激活Key',
      field: 'activationKey',
      hidden: true,
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入激活Key', style: 'width: 100%' },
    },
    {
      label: '重置码',
      field: 'resetKey',
      hidden: true,
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入重置码', style: 'width: 100%' },
    },
    {
      label: '重置时间',
      field: 'resetDate',
      hidden: true,
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入重置时间', style: 'width: 100%' },
    },
    {
      label: '创建者Id',
      field: 'createdBy',
      hidden: true,
      component: 'InputNumber',
      componentProps: { placeholder: '请输入创建者Id', controls: false, style: 'width: 100%' },
    },
    {
      label: '创建时间',
      field: 'createdDate',
      hidden: true,
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入创建时间', style: 'width: 100%' },
    },
    {
      label: '修改者Id',
      field: 'lastModifiedBy',
      hidden: true,
      component: 'InputNumber',
      componentProps: { placeholder: '请输入修改者Id', controls: false, style: 'width: 100%' },
    },
    {
      label: '修改时间',
      field: 'lastModifiedDate',
      hidden: true,
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入修改时间', style: 'width: 100%' },
    },
    {
      label: '部门',
      field: 'department',
      component: 'TreeSelectLabelIn',
      componentProps: {
        remote: true,
        remoteMethod: async params => {
          const result = await relationshipApis.department(params);
          relationshipApiData.departmentOptions = result.records;
        },
        valueKey: 'id',
        data: relationshipApiData.departmentOptions,
        props: { children: 'children', label: 'name' },
        placeholder: '请选择部门',
      },
    },
    {
      label: '岗位',
      field: 'position',
      component: 'SelectV2',
      componentProps: {
        remote: true,
        remoteMethod: async params => {
          const result = await relationshipApis.position(params);
          relationshipApiData.positionOptions = result.records;
        },
        valueKey: 'id',
        slots: {
          default: ({ node, data }) => {
            return h(ElOption, { key: node.key, label: node.label, value: data });
          },
        },
        options: relationshipApiData.positionOptions,
        props: { value: 'id', label: 'name' },
        placeholder: '请选择岗位',
      },
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
  ];
};
const rules = (): any => ({
  id: [{ required: true, message: '必填项' }],
  login: [{ required: true, message: '必填项' }],
  email: [{ required: true, message: '必填项' }],
});
export default {
  fields,
  rules,
};
