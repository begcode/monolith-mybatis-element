import { FormSchema } from '@begcode/components';
import apiService from '@/api/index';

const resourceCategoryService = apiService.files.resourceCategoryService;
const relationshipApis: any = {
  children: apiService.files.resourceCategoryService.tree,
  parent: apiService.files.resourceCategoryService.tree,
  images: apiService.files.uploadImageService.retrieve,
  files: apiService.files.uploadFileService.retrieve,
};

// begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！

const fields = (): FormSchema[] => {
  const relationshipApiData: any = {
    childrenOptions: [],
    parentOptions: [],
    imagesOptions: [],
    filesOptions: [],
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
      label: '标题',
      field: 'title',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入标题', style: 'width: 100%' },
    },
    {
      label: '代码',
      field: 'code',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入代码', style: 'width: 100%' },
    },
    {
      label: '排序',
      field: 'orderNumber',
      component: 'InputNumber',
      componentProps: { placeholder: '请输入排序', controls: false, style: 'width: 100%' },
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
        props: { children: 'children', label: 'title' },
        placeholder: '请选择上级',
      },
    },
  ];
};
const rules = (): any => ({
  title: [{ type: 'string', max: 40 }],
  code: [{ type: 'string', max: 20 }],
});
export default {
  fields,
  rules,
};
