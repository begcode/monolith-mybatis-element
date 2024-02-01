import { FormSchema } from '@begcode/components';
import { useI18n } from '@/hooks/web/useI18n';
import apiService from '@/api/index';

const regionCodeService = apiService.settings.regionCodeService;
const relationshipApis: any = {
  children: apiService.settings.regionCodeService.tree,
  parent: apiService.settings.regionCodeService.tree,
};

// begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！

const fields = (): FormSchema[] => {
  const { getEnumDict } = useI18n();
  const relationshipApiData: any = {
    childrenOptions: [],
    parentOptions: [],
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
      label: '地区代码',
      field: 'areaCode',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入地区代码', style: 'width: 100%' },
    },
    {
      label: '城市代码',
      field: 'cityCode',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入城市代码', style: 'width: 100%' },
    },
    {
      label: '全名',
      field: 'mergerName',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入全名', style: 'width: 100%' },
    },
    {
      label: '短名称',
      field: 'shortName',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入短名称', style: 'width: 100%' },
    },
    {
      label: '邮政编码',
      field: 'zipCode',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入邮政编码', style: 'width: 100%' },
    },
    {
      label: '等级',
      field: 'level',
      component: 'Select',
      componentProps: () => {
        const { getEnumDict } = useI18n();
        return { placeholder: '请选择等级', options: getEnumDict('RegionCodeLevel'), style: 'width: 100%' };
      },
    },
    {
      label: '经度',
      field: 'lng',
      component: 'InputNumber',
      componentProps: { placeholder: '请输入经度', controls: false, style: 'width: 100%' },
    },
    {
      label: '纬度',
      field: 'lat',
      component: 'InputNumber',
      componentProps: { placeholder: '请输入纬度', controls: false, style: 'width: 100%' },
    },
    {
      label: '上级节点',
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
        placeholder: '请选择上级节点',
      },
    },
  ];
};
const rules = (): any => ({});
export default {
  fields,
  rules,
};
