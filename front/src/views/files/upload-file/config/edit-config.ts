import { FormSchema } from '@begcode/components';
import apiService from '@/api/index';

const uploadFileService = apiService.files.uploadFileService;
const relationshipApis: any = {
  category: apiService.files.resourceCategoryService.tree,
};

// begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！

const fields = (): FormSchema[] => {
  const relationshipApiData: any = {
    categoryOptions: [],
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
      label: 'Url地址',
      field: 'url',
      component: 'SelectFile',

      componentProps: ({ formModelRef }) => ({
        on: {
          change: (file: any) => {
            formModelRef.value.url = file.name;
            formModelRef.value.file = file.raw;
          },
        },
      }),
    },
    {
      label: '完整文件名',
      field: 'fullName',
      hidden: true,
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入完整文件名', style: 'width: 100%' },
    },
    {
      label: '文件名',
      field: 'name',
      hidden: true,
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入文件名', style: 'width: 100%' },
    },
    {
      label: '缩略图Url地址',
      field: 'thumb',
      hidden: true,
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入缩略图Url地址', style: 'width: 100%' },
    },
    {
      label: '扩展名',
      field: 'ext',
      hidden: true,
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入扩展名', style: 'width: 100%' },
    },
    {
      label: '文件类型',
      field: 'type',
      hidden: true,
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入文件类型', style: 'width: 100%' },
    },
    {
      label: '本地路径',
      field: 'path',
      hidden: true,
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入本地路径', style: 'width: 100%' },
    },
    {
      label: '存储目录',
      field: 'folder',
      hidden: true,
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入存储目录', style: 'width: 100%' },
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
    {
      label: '业务标题',
      field: 'businessTitle',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入业务标题', style: 'width: 100%' },
    },
    {
      label: '业务自定义描述内容',
      field: 'businessDesc',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入业务自定义描述内容', style: 'width: 100%' },
    },
    {
      label: '业务状态',
      field: 'businessStatus',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入业务状态', style: 'width: 100%' },
    },
    {
      label: '创建时间',
      field: 'createAt',
      hidden: true,
      component: 'DatePicker',
      componentProps: { valueFormat: 'YYYY-MM-DD hh:mm:ss', placeholder: '请选择创建时间', style: 'width: 100%' },
    },
    {
      label: '文件大小',
      field: 'fileSize',
      hidden: true,
      component: 'InputNumber',
      componentProps: { placeholder: '请输入文件大小', controls: false, style: 'width: 100%' },
    },
    {
      label: '被引次数',
      field: 'referenceCount',
      hidden: true,
      component: 'InputNumber',
      componentProps: { placeholder: '请输入被引次数', controls: false, style: 'width: 100%' },
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
      label: '所属分类',
      field: 'category',
      component: 'TreeSelectLabelIn',
      componentProps: {
        remote: true,
        remoteMethod: async params => {
          const result = await relationshipApis.category(params);
          relationshipApiData.categoryOptions = result.records;
        },
        valueKey: 'id',
        data: relationshipApiData.categoryOptions,
        props: { children: 'children', label: 'title' },
        placeholder: '请选择所属分类',
      },
    },
  ];
};
const rules = (): any => ({
  url: [{ required: true, message: '必填项' }],
});
export default {
  fields,
  rules,
};
