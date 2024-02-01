import { FormSchema } from '@begcode/components';
import apiService from '@/api/index';

const uReportFileService = apiService.report.uReportFileService;
const relationshipApis: any = {};

// begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！

const fields = (): FormSchema[] => {
  const relationshipApiData: any = {};
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
      label: '内容',
      field: 'content',
      component: 'Editor',
      componentProps: { placeholder: '请输入内容', style: 'width: 100%' },
    },
    {
      label: '创建时间',
      field: 'createAt',
      component: 'DatePicker',
      componentProps: { valueFormat: 'YYYY-MM-DD hh:mm:ss', placeholder: '请选择创建时间', style: 'width: 100%' },
    },
    {
      label: '更新时间',
      field: 'updateAt',
      component: 'DatePicker',
      componentProps: { valueFormat: 'YYYY-MM-DD hh:mm:ss', placeholder: '请选择更新时间', style: 'width: 100%' },
    },
  ];
};
const rules = (): any => ({
  name: [{ required: true, message: '必填项' }],
});
export default {
  fields,
  rules,
};
