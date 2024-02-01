import { FormSchema } from '@begcode/components';
import { useI18n } from '@/hooks/web/useI18n';
import apiService from '@/api/index';

const siteConfigService = apiService.settings.siteConfigService;
const commonFieldDataService = apiService.settings.commonFieldDataService;
const relationshipApis: any = {
  items: apiService.settings.commonFieldDataService.retrieve,
};

// begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！

const fields = (): FormSchema[] => {
  const relationshipApiData: any = {
    itemsOptions: [],
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
      label: '分类名称',
      field: 'categoryName',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入分类名称', style: 'width: 100%' },
    },
    {
      label: '分类Key',
      field: 'categoryKey',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入分类Key', style: 'width: 100%' },
    },
    {
      label: '是否禁用',
      field: 'disabled',
      component: 'Switch',
      componentProps: { placeholder: '请选择是否禁用' },
    },
    {
      label: '排序',
      field: 'sortValue',
      component: 'InputNumber',
      componentProps: { placeholder: '请输入排序', controls: false, style: 'width: 100%' },
    },
    {
      label: '是否内置',
      field: 'builtIn',
      component: 'Switch',
      componentProps: { placeholder: '请选择是否内置' },
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
  ];
};
const rules = (): any => ({
  categoryName: [{ required: true, message: '必填项' }],
  categoryKey: [{ required: true, message: '必填项' }],
});
const itemsColumns = [
  {
    fixed: 'left',
    type: 'checkbox',
    width: 60,
  },
  {
    title: '名称',
    field: 'name',
    minWidth: 160,
    visible: true,
    treeNode: false,
    params: { type: 'STRING' },
    editRender: { name: 'EInput', enabled: true },
  },
  {
    title: '字段值',
    field: 'value',
    minWidth: 160,
    visible: true,
    treeNode: false,
    params: { type: 'STRING' },
    editRender: { name: 'EInput', enabled: true },
  },
  {
    title: '字段标题',
    field: 'label',
    minWidth: 160,
    visible: true,
    treeNode: false,
    params: { type: 'STRING' },
    editRender: { name: 'EInput', enabled: true },
  },
  {
    title: '字段类型',
    field: 'valueType',
    minWidth: 100,
    visible: true,
    treeNode: false,
    params: { type: 'ENUM' },
    formatter: ({ cellValue }) => {
      const { getEnumDict } = useI18n();
      return (getEnumDict('CommonFieldType').find(item => item.value === cellValue) || { label: cellValue }).label;
    },
  },
  {
    title: '说明',
    field: 'remark',
    minWidth: 160,
    visible: true,
    treeNode: false,
    params: { type: 'STRING' },
    editRender: { name: 'EInput', enabled: true },
  },
  {
    title: '排序',
    field: 'sortValue',
    minWidth: 80,
    visible: true,
    treeNode: false,
    params: { type: 'INTEGER' },
    titlePrefix: { icon: 'vxe-icon-sort', content: '排序操作列' },
    editRender: { name: 'EDragSort', enabled: true, props: { remoteApi: commonFieldDataService.updateSortValue } },
  },
  {
    title: '是否禁用',
    field: 'disabled',
    minWidth: 70,
    visible: true,
    treeNode: false,
    params: { type: 'BOOLEAN' },
    cellRender: { name: 'ESwitch', props: { disabled: true } },
  },
  {
    title: '实体名称',
    field: 'ownerEntityName',
    minWidth: 160,
    visible: false,
    treeNode: false,
    params: { type: 'STRING' },
    editRender: { name: 'EInput', enabled: true },
  },
  {
    title: '使用实体ID',
    field: 'ownerEntityId',
    minWidth: 80,
    visible: false,
    treeNode: false,
    params: { type: 'LONG' },
    editRender: { name: 'EInputNumber', enabled: true, props: { controls: false } },
  },
  {
    title: '操作',
    field: 'operation',
    fixed: 'right',
    width: 160,
    slots: { default: 'recordAction' },
  },
];
export default {
  fields,
  rules,
  itemsColumns,
};
