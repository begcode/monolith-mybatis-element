import type { VxeGridPropTypes, VxeGridProps } from 'vxe-table/types/grid';
import apiService from '@/api/index';
import { useI18n } from '@/hooks/web/useI18n';

// begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！-->

const apiPermissionService = apiService.system.apiPermissionService;
const relationshipApis: any = {
  children: apiService.system.apiPermissionService.tree,
  parent: apiService.system.apiPermissionService.tree,
  authorities: apiService.system.authorityService.tree,
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
    title: '服务名称',
    field: 'serviceName',
    componentType: 'Text',
    value: '',
    type: 'String',
    operator: '',
    span: 8,
    componentProps: {},
  },
  {
    title: '权限名称',
    field: 'name',
    componentType: 'Text',
    value: '',
    type: 'String',
    operator: '',
    span: 8,
    componentProps: {},
  },
  {
    title: 'Code',
    field: 'code',
    componentType: 'Text',
    value: '',
    type: 'String',
    operator: '',
    span: 8,
    componentProps: {},
  },
  {
    title: '权限描述',
    field: 'description',
    componentType: 'Text',
    value: '',
    type: 'String',
    operator: '',
    span: 8,
    componentProps: {},
  },
  {
    title: '类型',
    field: 'type',
    componentType: 'Select',
    value: '',
    span: 8,
    operator: '',
    type: 'Enum',
    componentProps: () => {
      const { getEnumDict } = useI18n();
      return { options: getEnumDict('ApiPermissionType'), style: 'width: 100%' };
    },
  },
  {
    title: '请求类型',
    field: 'method',
    componentType: 'Text',
    value: '',
    type: 'String',
    operator: '',
    span: 8,
    componentProps: {},
  },
  {
    title: 'url 地址',
    field: 'url',
    componentType: 'Text',
    value: '',
    type: 'String',
    operator: '',
    span: 8,
    componentProps: {},
  },
  {
    title: '状态',
    field: 'status',
    componentType: 'Select',
    value: '',
    span: 8,
    operator: '',
    type: 'Enum',
    componentProps: () => {
      const { getEnumDict } = useI18n();
      return { options: getEnumDict('ApiPermissionState'), style: 'width: 100%' };
    },
  },
  {
    title: '子节点',
    field: 'children',
    componentType: 'ESelect',
    value: '',
    operator: '',
    span: 8,
    componentProps: { api: null, style: 'width: 100%', valueField: 'id', labelField: 'name' },
  },
  {
    title: '上级',
    field: 'parent',
    componentType: 'ESelect',
    value: '',
    operator: '',
    span: 8,
    componentProps: { api: null, style: 'width: 100%', valueField: 'id', labelField: 'name' },
  },
  {
    title: '角色列表',
    field: 'authorities',
    componentType: 'ESelect',
    value: '',
    operator: '',
    span: 8,
    componentProps: { api: null, style: 'width: 100%', valueField: 'id', labelField: 'name' },
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
    visible: false,
    treeNode: false,
    params: { type: 'LONG' },
    editRender: { name: 'EInputNumber', enabled: false, props: { controls: false } },
  },
  {
    title: '服务名称',
    field: 'serviceName',
    minWidth: 160,
    visible: true,
    treeNode: false,
    params: { type: 'STRING' },
    editRender: { name: 'EInput', enabled: false },
  },
  {
    title: '权限名称',
    field: 'name',
    minWidth: 160,
    visible: true,
    treeNode: true,
    params: { type: 'STRING' },
    editRender: { name: 'EInput', enabled: false },
  },
  {
    title: 'Code',
    field: 'code',
    minWidth: 160,
    visible: true,
    treeNode: false,
    params: { type: 'STRING' },
    editRender: { name: 'EInput', enabled: false },
  },
  {
    title: '权限描述',
    field: 'description',
    minWidth: 160,
    visible: true,
    treeNode: false,
    params: { type: 'STRING' },
    editRender: { name: 'EInput', enabled: false },
  },
  {
    title: '类型',
    field: 'type',
    minWidth: 100,
    visible: true,
    treeNode: false,
    params: { type: 'ENUM' },
    formatter: ({ cellValue }) => {
      const { getEnumDict } = useI18n();
      return (getEnumDict('ApiPermissionType').find(item => item.value === cellValue) || { label: cellValue }).label;
    },
  },
  {
    title: '请求类型',
    field: 'method',
    minWidth: 160,
    visible: true,
    treeNode: false,
    params: { type: 'STRING' },
    editRender: { name: 'EInput', enabled: false },
  },
  {
    title: 'url 地址',
    field: 'url',
    minWidth: 160,
    visible: true,
    treeNode: false,
    params: { type: 'STRING' },
    editRender: { name: 'EInput', enabled: false },
  },
  {
    title: '状态',
    field: 'status',
    minWidth: 100,
    visible: true,
    treeNode: false,
    params: { type: 'ENUM' },
    formatter: ({ cellValue }) => {
      const { getEnumDict } = useI18n();
      return (getEnumDict('ApiPermissionState').find(item => item.value === cellValue) || { label: cellValue }).label;
    },
  },
  {
    title: '角色列表',
    field: 'authorities',
    minWidth: 120,
    editRender: {
      name: 'ESelectModal',
      enabled: true,
      props: {
        showComponentName: 'TreeSelect',
        api: relationshipApis.authorities,
        container: 'drawer',
        labelInValue: true,
        componentName: 'ElTree',
        multiple: true,
        avatarSlotName: 'default',
        avatarSlotField: 'name',
        avatarTipField: 'name',
        checkStrictly: true,
        fieldNames: { label: 'name', value: 'id', children: 'children' },
        style: { width: '100%' },
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
    treeConfig: {
      childrenField: 'children',
      indent: 20,
      showLine: false,
      expandAll: false,
      accordion: false,
      trigger: 'default',
    },
  };
};

export default {
  searchForm,
  columns,
  baseGridOptions,
};
