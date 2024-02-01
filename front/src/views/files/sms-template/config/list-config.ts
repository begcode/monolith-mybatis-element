import type { VxeGridPropTypes, VxeGridProps } from 'vxe-table/types/grid';
import apiService from '@/api/index';
import { useI18n } from '@/hooks/web/useI18n';

// begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！-->

const smsTemplateService = apiService.files.smsTemplateService;
const relationshipApis: any = {
  supplier: apiService.files.smsSupplierService.retrieve,
};

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
    title: '模板标题',
    field: 'name',
    componentType: 'Text',
    value: '',
    type: 'String',
    operator: '',
    span: 8,
    componentProps: {},
  },
  {
    title: '模板CODE',
    field: 'code',
    componentType: 'Text',
    value: '',
    type: 'String',
    operator: '',
    span: 8,
    componentProps: {},
  },
  {
    title: '通知类型',
    field: 'sendType',
    componentType: 'Select',
    value: '',
    span: 8,
    operator: '',
    type: 'Enum',
    componentProps: () => {
      const { getEnumDict } = useI18n();
      return { options: getEnumDict('MessageSendType'), style: 'width: 100%' };
    },
  },
  {
    title: '模板内容',
    field: 'content',
    componentType: 'Text',
    value: '',
    type: 'String',
    operator: '',
    span: 8,
    componentProps: {},
  },
  {
    title: '模板测试json',
    field: 'testJson',
    componentType: 'Text',
    value: '',
    type: 'String',
    operator: '',
    span: 8,
    componentProps: {},
  },
  {
    title: '模板类型',
    field: 'type',
    componentType: 'Select',
    value: '',
    span: 8,
    operator: '',
    type: 'Enum',
    componentProps: () => {
      const { getEnumDict } = useI18n();
      return { options: getEnumDict('SmsTemplateType'), style: 'width: 100%' };
    },
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
  {
    title: '创建者Id',
    field: 'createdBy',
    componentType: 'Text',
    value: '',
    type: 'Long',
    operator: '',
    span: 8,
    componentProps: {},
  },
  {
    title: '修改者Id',
    field: 'lastModifiedBy',
    componentType: 'Text',
    value: '',
    type: 'Long',
    operator: '',
    span: 8,
    componentProps: {},
  },
  {
    title: '短信服务商',
    field: 'supplier',
    componentType: 'ESelect',
    value: '',
    operator: '',
    span: 8,
    componentProps: { api: null, style: 'width: 100%', valueField: 'id', labelField: 'signName' },
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
    title: '模板标题',
    field: 'name',
    minWidth: 160,
    visible: true,
    treeNode: false,
    params: { type: 'STRING' },
    editRender: { name: 'EInput', enabled: false },
  },
  {
    title: '模板CODE',
    field: 'code',
    minWidth: 160,
    visible: true,
    treeNode: false,
    params: { type: 'STRING' },
    editRender: { name: 'EInput', enabled: false },
  },
  {
    title: '通知类型',
    field: 'sendType',
    minWidth: 100,
    visible: true,
    treeNode: false,
    params: { type: 'ENUM' },
    formatter: ({ cellValue }) => {
      const { getEnumDict } = useI18n();
      return (getEnumDict('MessageSendType').find(item => item.value === cellValue) || { label: cellValue }).label;
    },
  },
  {
    title: '模板内容',
    field: 'content',
    minWidth: 160,
    visible: true,
    treeNode: false,
    params: { type: 'STRING' },
    editRender: { name: 'EInput', enabled: false },
  },
  {
    title: '模板测试json',
    field: 'testJson',
    minWidth: 160,
    visible: true,
    treeNode: false,
    params: { type: 'STRING' },
    editRender: { name: 'EInput', enabled: false },
  },
  {
    title: '模板类型',
    field: 'type',
    minWidth: 100,
    visible: true,
    treeNode: false,
    params: { type: 'ENUM' },
    formatter: ({ cellValue }) => {
      const { getEnumDict } = useI18n();
      return (getEnumDict('SmsTemplateType').find(item => item.value === cellValue) || { label: cellValue }).label;
    },
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
    title: '创建者Id',
    field: 'createdBy',
    minWidth: 80,
    visible: true,
    treeNode: false,
    params: { type: 'LONG' },
    editRender: { name: 'EInputNumber', enabled: false, props: { controls: false } },
  },
  {
    title: '修改者Id',
    field: 'lastModifiedBy',
    minWidth: 80,
    visible: true,
    treeNode: false,
    params: { type: 'LONG' },
    editRender: { name: 'EInputNumber', enabled: false, props: { controls: false } },
  },
  {
    title: '短信服务商',
    field: 'supplier',
    minWidth: 120,
    editRender: {
      name: 'ESelectModal',
      enabled: false,
      props: {
        showComponentName: 'Avatar',
        container: 'modal',
        componentName: 'SmsSupplierDetail',
        multiple: false,
        style: { width: '100%' },
        queryNames: ['id'],
        avatarSlotName: 'default',
        avatarSlotField: 'signName',
        avatarTipField: 'signName',
        rowIdField: 'value.id',
        source: 'SmsTemplate',
      },
    },
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
