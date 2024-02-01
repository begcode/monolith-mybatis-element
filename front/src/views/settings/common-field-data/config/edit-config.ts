import { FormSchema } from '@begcode/components';
import { useI18n } from '@/hooks/web/useI18n';
import apiService from '@/api/index';

const commonFieldDataService = apiService.settings.commonFieldDataService;
const relationshipApis: any = {
  siteConfig: apiService.settings.siteConfigService.retrieve,
  dictionary: apiService.settings.dictionaryService.retrieve,
};

// begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！

const fields = (): FormSchema[] => {
  const { getEnumDict } = useI18n();
  const relationshipApiData: any = {
    siteConfigOptions: [],
    dictionaryOptions: [],
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
      label: '字段值',
      field: 'value',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入字段值', style: 'width: 100%' },
    },
    {
      label: '字段标题',
      field: 'label',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入字段标题', style: 'width: 100%' },
    },
    {
      label: '字段类型',
      field: 'valueType',
      component: 'Select',
      componentProps: () => {
        const { getEnumDict } = useI18n();
        return { placeholder: '请选择字段类型', options: getEnumDict('CommonFieldType'), style: 'width: 100%' };
      },
    },
    {
      label: '说明',
      field: 'remark',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入说明', style: 'width: 100%' },
    },
    {
      label: '排序',
      field: 'sortValue',
      component: 'InputNumber',
      componentProps: { placeholder: '请输入排序', controls: false, style: 'width: 100%' },
    },
    {
      label: '是否禁用',
      field: 'disabled',
      component: 'Switch',
      componentProps: { placeholder: '请选择是否禁用' },
    },
    {
      label: '实体名称',
      field: 'ownerEntityName',
      hidden: true,
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入实体名称', style: 'width: 100%' },
    },
    {
      label: '使用实体ID',
      field: 'ownerEntityId',
      hidden: true,
      component: 'InputNumber',
      componentProps: { placeholder: '请输入使用实体ID', controls: false, style: 'width: 100%' },
    },
  ];
};
const rules = (): any => ({});
export default {
  fields,
  rules,
};
