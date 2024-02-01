import type { VxeGridPropTypes, VxeGridProps } from 'vxe-table/types/grid';
import apiService from '@/api/index';
import { useI18n } from '@/hooks/web/useI18n';

// begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！-->

const smsSupplierService = apiService.files.smsSupplierService;
const relationshipApis: any = {};

const searchForm = (): any[] => [
  {
    title: 'ID',
    field: 'id',
    componentType: 'Text',
    value: '',
    type: 'Long',
    operator: '',
    span: 8,
    componentProps: {},
  },
  {
    title: '提供商',
    field: 'provider',
    componentType: 'Select',
    value: '',
    span: 8,
    operator: '',
    type: 'Enum',
    componentProps: () => {
      const { getEnumDict } = useI18n();
      return { options: getEnumDict('SmsProvider'), style: 'width: 100%' };
    },
  },
  {
    title: '配置数据',
    field: 'configData',
    componentType: 'Text',
    value: '',
    type: 'String',
    operator: '',
    span: 8,
    componentProps: {},
  },
  {
    title: '短信签名',
    field: 'signName',
    componentType: 'Text',
    value: '',
    type: 'String',
    operator: '',
    span: 8,
    componentProps: {},
  },
  {
    title: '备注',
    field: 'remark',
    componentType: 'Text',
    value: '',
    type: 'String',
    operator: '',
    span: 8,
    componentProps: {},
  },
  {
    title: '启用',
    field: 'enabled',
    componentType: 'Switch',
    value: '',
    operator: '',
    span: 8,
    type: 'Boolean',
    componentProps: {},
  },
];

const columns = (): VxeGridPropTypes.Columns => [
  {
    fixed: 'left',
    type: 'checkbox',
    width: 60,
  },
  {
    title: 'ID',
    field: 'id',
    minWidth: 80,
    visible: true,
    treeNode: false,
    params: { type: 'LONG' },
    editRender: { name: 'EInputNumber', enabled: false, props: { controls: false } },
  },
  {
    title: '提供商',
    field: 'provider',
    minWidth: 100,
    visible: true,
    treeNode: false,
    params: { type: 'ENUM' },
    formatter: ({ cellValue }) => {
      const { getEnumDict } = useI18n();
      return (getEnumDict('SmsProvider').find(item => item.value === cellValue) || { label: cellValue }).label;
    },
  },
  {
    title: '配置数据',
    field: 'configData',
    minWidth: 160,
    visible: true,
    treeNode: false,
    params: { type: 'STRING' },
    cellRender: { name: 'ECodeEditor' },
  },
  {
    title: '短信签名',
    field: 'signName',
    minWidth: 160,
    visible: true,
    treeNode: false,
    params: { type: 'STRING' },
    editRender: { name: 'EInput', enabled: false },
  },
  {
    title: '备注',
    field: 'remark',
    minWidth: 160,
    visible: true,
    treeNode: false,
    params: { type: 'STRING' },
    editRender: { name: 'EInput', enabled: false },
  },
  {
    title: '启用',
    field: 'enabled',
    minWidth: 70,
    visible: true,
    treeNode: false,
    params: { type: 'BOOLEAN' },
    cellRender: { name: 'ESwitch', props: { disabled: false } },
  },
  {
    title: '操作',
    field: 'operation',
    fixed: 'right',
    width: 160,
    slots: { default: 'recordAction' },
  },
];

const baseGridOptions = (): VxeGridProps => {
  return {
    rowConfig: {
      keyField: 'id',
      isHover: true,
    },
    border: true,
    showHeaderOverflow: true,
    showOverflow: true,
    keepSource: true,
    id: 'full_edit_1',
    height: 600,
    printConfig: {
      columns: [
        // { field: 'name' },
      ],
    },
    filterConfig: {
      remote: true,
    },
    columnConfig: {
      resizable: true,
    },
    sortConfig: {
      trigger: 'cell',
      remote: true,
      orders: ['asc', 'desc', null],
      multiple: true,
      defaultSort: {
        field: 'id',
        order: 'desc',
      },
    },
    pagerConfig: {
      layouts: ['Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump', 'Total'],
      pageSize: 15,
      pageSizes: [5, 10, 15, 20, 30, 50],
      total: 0,
      pagerCount: 5,
      currentPage: 1,
    },
    importConfig: {},
    exportConfig: {},
    checkboxConfig: {
      // labelField: 'id',
      reserve: true,
      highlight: true,
    },
    editRules: {},
    editConfig: {
      enabled: true,
      trigger: 'click',
      mode: 'cell',
      showStatus: true,
    },
  };
};

export default {
  searchForm,
  columns,
  baseGridOptions,
};
