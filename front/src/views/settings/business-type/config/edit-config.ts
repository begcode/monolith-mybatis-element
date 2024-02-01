import { FormSchema } from '@begcode/components';
import apiService from '@/api/index';

const businessTypeService = apiService.settings.businessTypeService;
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
      label: '代码',
      field: 'code',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入代码', style: 'width: 100%' },
    },
    {
      label: '描述',
      field: 'description',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入描述', style: 'width: 100%' },
    },
    {
      label: '图标',
      field: 'icon',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入图标', style: 'width: 100%' },
    },
  ];
};
const rules = (): any => ({});
export default {
  fields,
  rules,
};
