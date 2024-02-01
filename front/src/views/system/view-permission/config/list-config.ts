import type { VxeGridPropTypes, VxeGridProps } from 'vxe-table/types/grid';
import apiService from '@/api/index';
import { useI18n } from '@/hooks/web/useI18n';

// begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！-->

const viewPermissionService = apiService.system.viewPermissionService;
const relationshipApis: any = {
  children: apiService.system.viewPermissionService.tree,
  parent: apiService.system.viewPermissionService.tree,
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
    title: '权限名称',
    field: 'text',
    componentType: 'Text',
    value: '',
    type: 'String',
    operator: '',
    span: 8,
    componentProps: {},
  },
  {
    title: '权限类型',
    field: 'type',
    componentType: 'Select',
    value: '',
    span: 8,
    operator: '',
    type: 'Enum',
    componentProps: () => {
      const { getEnumDict } = useI18n();
      return { options: getEnumDict('ViewPermissionType'), style: 'width: 100%' };
    },
  },
  {
    title: 'i18n主键',
    field: 'i18n',
    componentType: 'Text',
    value: '',
    type: 'String',
    operator: '',
    span: 8,
    componentProps: {},
  },
  {
    title: '显示分组名',
    field: 'group',
    componentType: 'Switch',
    value: '',
    operator: '',
    span: 8,
    type: 'Boolean',
    componentProps: {},
  },
  {
    title: '路由',
    field: 'link',
    componentType: 'Text',
    value: '',
    type: 'String',
    operator: '',
    span: 8,
    componentProps: {},
  },
  {
    title: '外部链接',
    field: 'externalLink',
    componentType: 'Text',
    value: '',
    type: 'String',
    operator: '',
    span: 8,
    componentProps: {},
  },
  {
    title: '链接目标',
    field: 'target',
    componentType: 'Select',
    value: '',
    span: 8,
    operator: '',
    type: 'Enum',
    componentProps: () => {
      const { getEnumDict } = useI18n();
      return { options: getEnumDict('TargetType'), style: 'width: 100%' };
    },
  },
  {
    title: '图标',
    field: 'icon',
    componentType: 'Text',
    value: '',
    type: 'String',
    operator: '',
    span: 8,
    componentProps: {},
  },
  {
    title: '禁用菜单',
    field: 'disabled',
    componentType: 'Switch',
    value: '',
    operator: '',
    span: 8,
    type: 'Boolean',
    componentProps: {},
  },
  {
    title: '隐藏菜单',
    field: 'hide',
    componentType: 'Switch',
    value: '',
    operator: '',
    span: 8,
    type: 'Boolean',
    componentProps: {},
  },
  {
    title: '隐藏面包屑',
    field: 'hideInBreadcrumb',
    componentType: 'Switch',
    value: '',
    operator: '',
    span: 8,
    type: 'Boolean',
    componentProps: {},
  },
  {
    title: '快捷菜单项',
    field: 'shortcut',
    componentType: 'Switch',
    value: '',
    operator: '',
    span: 8,
    type: 'Boolean',
    componentProps: {},
  },
  {
    title: '菜单根节点',
    field: 'shortcutRoot',
    componentType: 'Switch',
    value: '',
    operator: '',
    span: 8,
    type: 'Boolean',
    componentProps: {},
  },
  {
    title: '允许复用',
    field: 'reuse',
    componentType: 'Switch',
    value: '',
    operator: '',
    span: 8,
    type: 'Boolean',
    componentProps: {},
  },
  {
    title: '权限代码',
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
    title: '排序',
    field: 'order',
    componentType: 'Text',
    value: '',
    type: 'Integer',
    operator: '',
    span: 8,
    componentProps: {},
  },
  {
    title: 'api权限标识串',
    field: 'apiPermissionCodes',
    componentType: 'Text',
    value: '',
    type: 'String',
    operator: '',
    span: 8,
    componentProps: {},
  },
  {
    title: '组件名称',
    field: 'componentFile',
    componentType: 'Text',
    value: '',
    type: 'String',
    operator: '',
    span: 8,
    componentProps: {},
  },
  {
    title: '重定向路径',
    field: 'redirect',
    componentType: 'Text',
    value: '',
    type: 'String',
    operator: '',
    span: 8,
    componentProps: {},
  },
  {
    title: '子节点',
    field: 'children',
    componentType: 'ESelect',
    value: '',
    operator: '',
    span: 8,
    componentProps: { api: null, style: 'width: 100%', valueField: 'id', labelField: 'text' },
  },
  {
    title: '上级',
    field: 'parent',
    componentType: 'ESelect',
    value: '',
    operator: '',
    span: 8,
    componentProps: { api: null, style: 'width: 100%', valueField: 'id', labelField: 'text' },
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
    title: '权限名称',
    field: 'text',
    minWidth: 160,
    visible: true,
    treeNode: true,
    params: { type: 'STRING' },
    editRender: { name: 'EInput', enabled: false },
  },
  {
    title: '权限类型',
    field: 'type',
    minWidth: 100,
    visible: true,
    treeNode: false,
    params: { type: 'ENUM' },
    formatter: ({ cellValue }) => {
      const { getEnumDict } = useI18n();
      return (getEnumDict('ViewPermissionType').find(item => item.value === cellValue) || { label: cellValue }).label;
    },
  },
  {
    title: 'i18n主键',
    field: 'i18n',
    minWidth: 160,
    visible: false,
    treeNode: false,
    params: { type: 'STRING' },
    editRender: { name: 'EInput', enabled: false },
  },
  {
    title: '显示分组名',
    field: 'group',
    minWidth: 70,
    visible: true,
    treeNode: false,
    params: { type: 'BOOLEAN' },
    cellRender: { name: 'ESwitch', props: { disabled: false } },
  },
  {
    title: '路由',
    field: 'link',
    minWidth: 160,
    visible: true,
    treeNode: false,
    params: { type: 'STRING' },
    editRender: { name: 'EInput', enabled: false },
  },
  {
    title: '外部链接',
    field: 'externalLink',
    minWidth: 160,
    visible: true,
    treeNode: false,
    params: { type: 'STRING' },
    editRender: { name: 'EInput', enabled: false },
  },
  {
    title: '链接目标',
    field: 'target',
    minWidth: 100,
    visible: true,
    treeNode: false,
    params: { type: 'ENUM' },
    formatter: ({ cellValue }) => {
      const { getEnumDict } = useI18n();
      return (getEnumDict('TargetType').find(item => item.value === cellValue) || { label: cellValue }).label;
    },
  },
  {
    title: '图标',
    field: 'icon',
    minWidth: 50,
    visible: true,
    treeNode: false,
    params: { type: 'STRING' },
    cellRender: { name: 'EIcon', props: { disabled: false, size: 18 } },
  },
  {
    title: '禁用菜单',
    field: 'disabled',
    minWidth: 70,
    visible: true,
    treeNode: false,
    params: { type: 'BOOLEAN' },
    cellRender: { name: 'ESwitch', props: { disabled: false } },
  },
  {
    title: '隐藏菜单',
    field: 'hide',
    minWidth: 70,
    visible: true,
    treeNode: false,
    params: { type: 'BOOLEAN' },
    cellRender: { name: 'ESwitch', props: { disabled: false } },
  },
  {
    title: '隐藏面包屑',
    field: 'hideInBreadcrumb',
    minWidth: 70,
    visible: true,
    treeNode: false,
    params: { type: 'BOOLEAN' },
    cellRender: { name: 'ESwitch', props: { disabled: false } },
  },
  {
    title: '快捷菜单项',
    field: 'shortcut',
    minWidth: 70,
    visible: true,
    treeNode: false,
    params: { type: 'BOOLEAN' },
    cellRender: { name: 'ESwitch', props: { disabled: false } },
  },
  {
    title: '菜单根节点',
    field: 'shortcutRoot',
    minWidth: 70,
    visible: true,
    treeNode: false,
    params: { type: 'BOOLEAN' },
    cellRender: { name: 'ESwitch', props: { disabled: false } },
  },
  {
    title: '允许复用',
    field: 'reuse',
    minWidth: 70,
    visible: false,
    treeNode: false,
    params: { type: 'BOOLEAN' },
    cellRender: { name: 'ESwitch', props: { disabled: false } },
  },
  {
    title: '权限代码',
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
    visible: false,
    treeNode: false,
    params: { type: 'STRING' },
    editRender: { name: 'EInput', enabled: false },
  },
  {
    title: '排序',
    field: 'order',
    minWidth: 50,
    visible: true,
    treeNode: false,
    params: { type: 'INTEGER' },
    titlePrefix: { icon: 'vxe-icon-sort', content: '排序操作列' },
    editRender: { name: 'EDragSort', enabled: false, props: { remoteApi: viewPermissionService.updateSortValue } },
  },
  {
    title: 'api权限标识串',
    field: 'apiPermissionCodes',
    minWidth: 160,
    visible: false,
    treeNode: false,
    params: { type: 'STRING' },
    editRender: { name: 'EInput', enabled: false },
  },
  {
    title: '组件名称',
    field: 'componentFile',
    minWidth: 160,
    visible: true,
    treeNode: false,
    params: { type: 'STRING' },
    editRender: { name: 'EInput', enabled: false },
  },
  {
    title: '重定向路径',
    field: 'redirect',
    minWidth: 160,
    visible: true,
    treeNode: false,
    params: { type: 'STRING' },
    editRender: { name: 'EInput', enabled: false },
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