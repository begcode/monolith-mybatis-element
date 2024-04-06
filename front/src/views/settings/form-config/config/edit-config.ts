import { FormSchema } from '@begcode/components';
import { h } from 'vue';
import { ElOption } from 'element-plus';
import apiService from '@/api/index';

const formConfigService = apiService.settings.formConfigService;
const relationshipApis: any = {
  businessType: apiService.settings.businessTypeService.retrieve,
};

// begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！

const fields = (): FormSchema[] => {
  const relationshipApiData: any = {
    businessTypeOptions: [],
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
      label: '表单Key',
      field: 'formKey',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入表单Key', style: 'width: 100%' },
    },
    {
      label: '名称',
      field: 'formName',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入名称', style: 'width: 100%' },
    },
    {
      label: '表单配置',
      field: 'formJson',
      component: 'Editor',
      componentProps: { placeholder: '请输入表单配置', style: 'width: 100%' },
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
      label: '业务类别',
      field: 'businessType',
      component: 'SelectV2',
      componentProps: {
        remote: true,
        remoteMethod: async params => {
          const result = await relationshipApis.businessType(params);
          relationshipApiData.businessTypeOptions = result.records;
        },
        valueKey: 'id',
        slots: {
          default: ({ node, data }) => {
            return h(ElOption, { key: node.key, label: node.label, value: data });
          },
        },
        options: relationshipApiData.businessTypeOptions,
        props: { value: 'id', label: 'name' },
        placeholder: '请选择业务类别',
      },
    },
  ];
};
const rules = (): any => ({
  formKey: [{ type: 'string', max: 100 }],
  formName: [{ type: 'string', max: 100 }],
});
export default {
  fields,
  rules,
};
