import { FormSchema } from '@begcode/components';
import { useI18n } from '@/hooks/web/useI18n';
import apiService from '@/api/index';

const fillRuleItemService = apiService.settings.fillRuleItemService;
const relationshipApis: any = {
  fillRule: apiService.settings.sysFillRuleService.retrieve,
};

// begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！

const fields = (): FormSchema[] => {
  const { getEnumDict } = useI18n();
  const relationshipApiData: any = {
    fillRuleOptions: [],
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
      label: '排序值',
      field: 'sortValue',
      component: 'InputNumber',
      componentProps: { placeholder: '请输入排序值', controls: false, style: 'width: 100%' },
    },
    {
      label: '字段参数类型',
      field: 'fieldParamType',
      component: 'Select',
      componentProps: () => {
        const { getEnumDict } = useI18n();
        return { placeholder: '请选择字段参数类型', options: getEnumDict('FieldParamType'), style: 'width: 100%' };
      },
    },
    {
      label: '字段参数值',
      field: 'fieldParamValue',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入字段参数值', style: 'width: 100%' },
    },
    {
      label: '日期格式',
      field: 'datePattern',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入日期格式', style: 'width: 100%' },
    },
    {
      label: '序列长度',
      field: 'seqLength',
      component: 'InputNumber',
      componentProps: { placeholder: '请输入序列长度', controls: false, style: 'width: 100%' },
    },
    {
      label: '序列增量',
      field: 'seqIncrement',
      component: 'InputNumber',
      componentProps: { placeholder: '请输入序列增量', controls: false, style: 'width: 100%' },
    },
    {
      label: '序列起始值',
      field: 'seqStartValue',
      component: 'InputNumber',
      componentProps: { placeholder: '请输入序列起始值', controls: false, style: 'width: 100%' },
    },
  ];
};
const rules = (): any => ({});
export default {
  fields,
  rules,
};
