import { FormSchema } from '@begcode/components';
import { h } from 'vue';
import { ElOption } from 'element-plus';
import { useI18n } from '@/hooks/web/useI18n';
import apiService from '@/api/index';

const smsTemplateService = apiService.files.smsTemplateService;
const relationshipApis: any = {
  supplier: apiService.files.smsSupplierService.retrieve,
};

// begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！

const fields = (): FormSchema[] => {
  const { getEnumDict } = useI18n();
  const relationshipApiData: any = {
    supplierOptions: [],
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
      label: '模板标题',
      field: 'name',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入模板标题', style: 'width: 100%' },
    },
    {
      label: '模板CODE',
      field: 'code',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入模板CODE', style: 'width: 100%' },
    },
    {
      label: '通知类型',
      field: 'sendType',
      component: 'Select',
      componentProps: () => {
        const { getEnumDict } = useI18n();
        return { placeholder: '请选择通知类型', options: getEnumDict('MessageSendType'), style: 'width: 100%' };
      },
    },
    {
      label: '模板内容',
      field: 'content',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入模板内容', style: 'width: 100%' },
    },
    {
      label: '模板测试json',
      field: 'testJson',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入模板测试json', style: 'width: 100%' },
    },
    {
      label: '模板类型',
      field: 'type',
      component: 'Select',
      componentProps: () => {
        const { getEnumDict } = useI18n();
        return { placeholder: '请选择模板类型', options: getEnumDict('SmsTemplateType'), style: 'width: 100%' };
      },
    },
    {
      label: '备注',
      field: 'remark',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入备注', style: 'width: 100%' },
    },
    {
      label: '启用',
      field: 'enabled',
      component: 'Switch',
      componentProps: { placeholder: '请选择启用' },
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
      label: '短信服务商',
      field: 'supplier',
      component: 'SelectV2',
      componentProps: {
        remote: true,
        remoteMethod: async params => {
          const result = await relationshipApis.supplier(params);
          relationshipApiData.supplierOptions = result.records;
        },
        valueKey: 'id',
        slots: {
          default: ({ node, data }) => {
            return h(ElOption, { key: node.key, label: node.label, value: data });
          },
        },
        options: relationshipApiData.supplierOptions,
        props: { value: 'id', label: 'signName' },
        placeholder: '请选择短信服务商',
      },
    },
  ];
};
const rules = (): any => ({});
export default {
  fields,
  rules,
};
