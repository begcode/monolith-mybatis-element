import type { VxeGridPropTypes, VxeGridProps } from 'vxe-table/types/grid';
import dayjs from 'dayjs';
import apiService from '@/api/index';
import { useI18n } from '@/hooks/web/useI18n';

// begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！-->

const announcementService = apiService.system.announcementService;
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
    title: '标题',
    field: 'title',
    componentType: 'Text',
    value: '',
    type: 'String',
    operator: '',
    span: 8,
    componentProps: {},
  },
  {
    title: '开始时间',
    field: 'startTime',
    componentType: 'DateTime',
    operator: '',
    span: 8,
    type: 'ZonedDateTime',
    componentProps: { type: 'date', format: 'YYYY-MM-DD hh:mm:ss', style: 'width: 100%' },
  },
  {
    title: '结束时间',
    field: 'endTime',
    componentType: 'DateTime',
    operator: '',
    span: 8,
    type: 'ZonedDateTime',
    componentProps: { type: 'date', format: 'YYYY-MM-DD hh:mm:ss', style: 'width: 100%' },
  },
  {
    title: '发布人Id',
    field: 'senderId',
    componentType: 'Text',
    value: '',
    type: 'Long',
    operator: '',
    span: 8,
    componentProps: {},
  },
  {
    title: '优先级',
    field: 'priority',
    componentType: 'Select',
    value: '',
    span: 8,
    operator: '',
    type: 'Enum',
    componentProps: () => {
      const { getEnumDict } = useI18n();
      return { options: getEnumDict('PriorityLevel'), style: 'width: 100%' };
    },
  },
  {
    title: '消息类型',
    field: 'category',
    componentType: 'Select',
    value: '',
    span: 8,
    operator: '',
    type: 'Enum',
    componentProps: () => {
      const { getEnumDict } = useI18n();
      return { options: getEnumDict('AnnoCategory'), style: 'width: 100%' };
    },
  },
  {
    title: '通告对象类型',
    field: 'receiverType',
    componentType: 'Select',
    value: '',
    span: 8,
    operator: '',
    type: 'Enum',
    componentProps: () => {
      const { getEnumDict } = useI18n();
      return { options: getEnumDict('ReceiverType'), style: 'width: 100%' };
    },
  },
  {
    title: '发布状态',
    field: 'sendStatus',
    componentType: 'Select',
    value: '',
    span: 8,
    operator: '',
    type: 'Enum',
    componentProps: () => {
      const { getEnumDict } = useI18n();
      return { options: getEnumDict('AnnoSendStatus'), style: 'width: 100%' };
    },
  },
  {
    title: '发布时间',
    field: 'sendTime',
    componentType: 'DateTime',
    operator: '',
    span: 8,
    type: 'ZonedDateTime',
    componentProps: { type: 'date', format: 'YYYY-MM-DD hh:mm:ss', style: 'width: 100%' },
  },
  {
    title: '撤销时间',
    field: 'cancelTime',
    componentType: 'DateTime',
    operator: '',
    span: 8,
    type: 'ZonedDateTime',
    componentProps: { type: 'date', format: 'YYYY-MM-DD hh:mm:ss', style: 'width: 100%' },
  },
  {
    title: '业务类型',
    field: 'businessType',
    componentType: 'Select',
    value: '',
    span: 8,
    operator: '',
    type: 'Enum',
    componentProps: () => {
      const { getEnumDict } = useI18n();
      return { options: getEnumDict('AnnoBusinessType'), style: 'width: 100%' };
    },
  },
  {
    title: '业务id',
    field: 'businessId',
    componentType: 'Text',
    value: '',
    type: 'Long',
    operator: '',
    span: 8,
    componentProps: {},
  },
  {
    title: '打开方式',
    field: 'openType',
    componentType: 'Select',
    value: '',
    span: 8,
    operator: '',
    type: 'Enum',
    componentProps: () => {
      const { getEnumDict } = useI18n();
      return { options: getEnumDict('AnnoOpenType'), style: 'width: 100%' };
    },
  },
  {
    title: '组件/路由 地址',
    field: 'openPage',
    componentType: 'Text',
    value: '',
    type: 'String',
    operator: '',
    span: 8,
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
    title: '标题',
    field: 'title',
    minWidth: 160,
    visible: true,
    treeNode: false,
    params: { type: 'STRING' },
    editRender: { name: 'EInput', enabled: false },
  },
  {
    title: '开始时间',
    field: 'startTime',
    minWidth: 140,
    visible: true,
    treeNode: false,
    params: { type: 'ZONED_DATE_TIME' },
    formatter: ({ cellValue }) => (cellValue ? dayjs(cellValue).format('YYYY-MM-DD hh:mm:ss') : ''),
  },
  {
    title: '结束时间',
    field: 'endTime',
    minWidth: 140,
    visible: true,
    treeNode: false,
    params: { type: 'ZONED_DATE_TIME' },
    formatter: ({ cellValue }) => (cellValue ? dayjs(cellValue).format('YYYY-MM-DD hh:mm:ss') : ''),
  },
  {
    title: '发布人Id',
    field: 'senderId',
    minWidth: 80,
    visible: true,
    treeNode: false,
    params: { type: 'LONG' },
    editRender: { name: 'EInputNumber', enabled: false, props: { controls: false } },
  },
  {
    title: '优先级',
    field: 'priority',
    minWidth: 100,
    visible: true,
    treeNode: false,
    params: { type: 'ENUM' },
    formatter: ({ cellValue }) => {
      const { getEnumDict } = useI18n();
      return (getEnumDict('PriorityLevel').find(item => item.value === cellValue) || { label: cellValue }).label;
    },
  },
  {
    title: '消息类型',
    field: 'category',
    minWidth: 100,
    visible: true,
    treeNode: false,
    params: { type: 'ENUM' },
    formatter: ({ cellValue }) => {
      const { getEnumDict } = useI18n();
      return (getEnumDict('AnnoCategory').find(item => item.value === cellValue) || { label: cellValue }).label;
    },
  },
  {
    title: '通告对象类型',
    field: 'receiverType',
    minWidth: 100,
    visible: true,
    treeNode: false,
    params: { type: 'ENUM' },
    formatter: ({ cellValue }) => {
      const { getEnumDict } = useI18n();
      return (getEnumDict('ReceiverType').find(item => item.value === cellValue) || { label: cellValue }).label;
    },
  },
  {
    title: '发布状态',
    field: 'sendStatus',
    minWidth: 100,
    visible: true,
    treeNode: false,
    params: { type: 'ENUM' },
    formatter: ({ cellValue }) => {
      const { getEnumDict } = useI18n();
      return (getEnumDict('AnnoSendStatus').find(item => item.value === cellValue) || { label: cellValue }).label;
    },
  },
  {
    title: '发布时间',
    field: 'sendTime',
    minWidth: 140,
    visible: true,
    treeNode: false,
    params: { type: 'ZONED_DATE_TIME' },
    formatter: ({ cellValue }) => (cellValue ? dayjs(cellValue).format('YYYY-MM-DD hh:mm:ss') : ''),
  },
  {
    title: '撤销时间',
    field: 'cancelTime',
    minWidth: 140,
    visible: true,
    treeNode: false,
    params: { type: 'ZONED_DATE_TIME' },
    formatter: ({ cellValue }) => (cellValue ? dayjs(cellValue).format('YYYY-MM-DD hh:mm:ss') : ''),
  },
  {
    title: '业务类型',
    field: 'businessType',
    minWidth: 100,
    visible: true,
    treeNode: false,
    params: { type: 'ENUM' },
    formatter: ({ cellValue }) => {
      const { getEnumDict } = useI18n();
      return (getEnumDict('AnnoBusinessType').find(item => item.value === cellValue) || { label: cellValue }).label;
    },
  },
  {
    title: '业务id',
    field: 'businessId',
    minWidth: 80,
    visible: true,
    treeNode: false,
    params: { type: 'LONG' },
    editRender: { name: 'EInputNumber', enabled: false, props: { controls: false } },
  },
  {
    title: '打开方式',
    field: 'openType',
    minWidth: 100,
    visible: true,
    treeNode: false,
    params: { type: 'ENUM' },
    formatter: ({ cellValue }) => {
      const { getEnumDict } = useI18n();
      return (getEnumDict('AnnoOpenType').find(item => item.value === cellValue) || { label: cellValue }).label;
    },
  },
  {
    title: '组件/路由 地址',
    field: 'openPage',
    minWidth: 160,
    visible: true,
    treeNode: false,
    params: { type: 'STRING' },
    editRender: { name: 'EInput', enabled: false },
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
