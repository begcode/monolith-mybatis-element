<template>
  <div>
    <ElCard class="bc-list-result-card" :bodyStyle="{ padding: '1px' }">
      <ElRow :gutter="16">
        <ElCol :span="filterTreeConfig.filterTreeSpan" v-if="filterTreeConfig.filterTreeSpan > 0">
          <ElTree
            v-model="filterTreeConfig.checkedKeys"
            :expandedKeys="filterTreeConfig.expandedKeys"
            :autoExpandParent="filterTreeConfig.autoExpandParent"
            :selectedKeys="filterTreeConfig.selectedKeys"
            :treeData="filterTreeConfig.treeFilterData"
            @select="onSelect"
            @expand="onExpand"
            style="border: #bbcedd 1px solid; height: 100%"
          />
        </ElCol>
        <ElCol :span="24 - filterTreeConfig.filterTreeSpan">
          <Grid ref="xGrid" v-bind="gridOptions" v-on="gridEvents">
            <template #toolbar_buttons>
              <ElRow :gutter="16">
                <ElCol :lg="2" :md="2" :sm="4" v-if="filterTreeConfig.treeFilterData.length > 0">
                  <span class="table-page-search-submitButtons">
                    <ElButton
                      type="primary"
                      :icon="filterTreeConfig.filterTreeSpan > 0 ? 'pic-center' : 'pic-right'"
                      @click="switchFilterTree"
                    />
                  </span>
                </ElCol>
                <ElCol v-if="!searchFormConfig.toggleSearchStatus && !searchFormConfig.disabled">
                  <ElSpace>
                    <ElInput
                      v-model="searchValue"
                      placeholder="请输入关键字"
                      clearable
                      @change="inputSearch"
                      @pressEnter="formSearch"
                      style="width: 280px"
                      ref="searchInputRef"
                    >
                      <template #prefix>
                        <Icon icon="ant-design:search-outlined" />
                      </template>
                      <template #append>
                        <ElButton type="primary" link @click="formSearch" style="height: 30px"
                          >查询
                          <!--                            <Icon icon="ant-design:filter-outlined" @click="handleToggleSearch"></Icon>-->
                        </ElButton>
                      </template>
                    </ElInput>
                    <template v-for="button of gridOptions?.toolbarConfig?.buttons">
                      <ElButton v-if="!button.dropdowns">{{ button.name }}</ElButton>
                      <ElDropdown v-else-if="selectedRows.length" :key="button.name" :content="button.name">
                        <template #dropdown>
                          <ElDropdownMenu @click="gridEvents.toolbarButtonClick(subButton)" v-for="subButton of button.dropdowns">
                            <ElDropdownItem :key="subButton.name + 's'">
                              <Icon :icon="subButton.icon"></Icon>
                              {{ subButton.name }}
                            </ElDropdownItem>
                          </ElDropdownMenu>
                        </template>
                        <ElButton>
                          {{ button.name }}
                          <Icon icon="ep:arrow-down" class="el-icon--right" />
                        </ElButton>
                      </ElDropdown>
                    </template>
                  </ElSpace>
                </ElCol>
              </ElRow>
            </template>
            <template #recordAction="{ row, column }">
              <template v-if="tableRowOperations.length">
                <ElSpace :size="4">
                  <template
                    v-for="operation in tableRowOperations.filter(
                      rowOperation => !rowOperation.disabled && !(rowOperation.hide && rowOperation.hide(row)),
                    )"
                  >
                    <template v-if="operation.name === 'save'">
                      <ElButton
                        v-if="xGrid.isEditByRow(row) && xGrid.props.editConfig.mode === 'row'"
                        :type="operation.type || 'success'"
                        :link="operation.link"
                        :key="operation.name"
                        :title="operation.title || '保存'"
                        @click="rowClick('save', row)"
                        status="primary"
                      >
                        <Icon icon="ant-design:save-outlined" #icon v-if="!operation.link" />
                        <span v-else>{{ operation.title || '保存' }}</span>
                      </ElButton>
                      <ElButton
                        :type="operation.type || 'link'"
                        :key="operation.name"
                        v-else
                        :title="operation.title || '编辑'"
                        shape="circle"
                        @click="rowClick('edit', row)"
                      >
                        <Icon icon="ant-design:edit-outlined" #icon v-if="!operation.link" />
                        <span v-else>{{ operation.title || '编辑' }}</span>
                      </ElButton>
                    </template>
                    <template v-else-if="operation.name === 'delete' && !operation.disabled">
                      <ElButton
                        :type="operation.type || 'danger'"
                        :link="operation.link"
                        :key="operation.name"
                        :title="operation.title || '删除'"
                        @click="rowClick('delete', row)"
                        shape="circle"
                      >
                        <Icon :icon="operation.icon || 'ant-design:delete-outlined'" #icon v-if="!operation.link" />
                        <span v-else>{{ operation.title || '删除' }}</span>
                      </ElButton>
                    </template>
                    <template v-else>
                      <ElButton
                        v-if="!operation.disabled"
                        :type="operation.type || 'primary'"
                        :link="operation.link"
                        :key="operation.name"
                        :title="operation.title || '操作'"
                        @click="rowClick(operation.name, row)"
                        shape="circle"
                      >
                        <Icon :icon="operation.icon || 'ant-design:info-circle-outlined'" v-if="!operation.link" #icon />
                        <span v-else>{{ operation.title || '操作' }}</span>
                      </ElButton>
                    </template>
                  </template>
                  <ElDropdown v-if="tableRowMoreOperations && tableRowMoreOperations.length">
                    <template #dropdown>
                      <ElDropdownMenu @click="rowMoreClick($event, row)">
                        <ElDropdownItem
                          :key="operation.name"
                          v-for="operation in tableRowMoreOperations.filter(operation => !operation.disabled)"
                        >
                          <Icon :icon="operation.icon" v-if="operation.icon && !operation.link" />
                          <span v-if="operation.link">{{ operation.title }}</span>
                        </ElDropdownItem>
                      </ElDropdownMenu>
                    </template>
                    <a class="ant-dropdown-link" @click.prevent>
                      &nbsp;
                      <Icon icon="ep:arrow-down" />
                    </a>
                  </ElDropdown>
                </ElSpace>
              </template>
            </template>
          </Grid>
        </ElCol>
      </ElRow>
      <Dialog v-bind="modalConfig" @ok="okModal">
        <component :is="modalConfig.componentName" @refresh="formSearch" v-bind="modalConfig" ref="modalComponentRef" />
        <template #footer>
          <ElButton @click="dialogVisible = false">close</ElButton>
        </template>
      </Dialog>
      <ElDrawer v-bind="drawerConfig" @ok="okDrawer">
        <component :is="drawerConfig.componentName" @refresh="formSearch" v-bind="drawerConfig" ref="drawerComponentRef" />
      </ElDrawer>
    </ElCard>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, getCurrentInstance, h, onMounted, shallowRef, toRaw } from 'vue';
import {
  ElAlert,
  ElButton,
  ElDrawer,
  ElMessage,
  ElMessageBox,
  ElSpace,
  ElCard,
  ElDivider,
  ElRow,
  ElCol,
  ElTree,
  ElInput,
  ElDropdown,
  ElMenu,
  ElMenuItem,
  ElDropdownMenu,
  ElDropdownItem,
} from 'element-plus';
import { Grid } from 'vxe-table';
import type { VxeGridPropTypes, VxeGridInstance, VxeGridListeners, VxeGridProps } from 'vxe-table/types/grid';
import { mergeWith, isArray, isObject, isString, merge, debounce, pickBy, isEmpty } from 'lodash-es';
import { getSearchQueryData } from '@/utils/jhipster/entity-utils';
import { transVxeSorts } from '@/utils/jhipster/sorts';
import { SearchForm, Icon, Dialog } from '@begcode/components';
import { useRouter } from 'vue-router';
import ServerProvider from '@/api/index';
import DictionaryEdit from '../dictionary-edit.vue';
import DictionaryDetail from '../dictionary-detail.vue';
import DictionaryList from '../dictionary-list.vue';

const relationships = {};

const config = {
  searchForm: (): any[] => {
    return [
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
        title: '字典名称',
        field: 'dictName',
        componentType: 'Text',
        value: '',
        type: 'String',
        operator: '',
        span: 8,
        componentProps: {},
      },
      {
        title: '字典Key',
        field: 'dictKey',
        componentType: 'Text',
        value: '',
        type: 'String',
        operator: '',
        span: 8,
        componentProps: {},
      },
      {
        title: '是否禁用',
        field: 'disabled',
        componentType: 'Switch',
        value: '',
        operator: '',
        span: 8,
        type: 'Boolean',
        componentProps: {},
      },
      {
        title: '排序',
        field: 'sortValue',
        componentType: 'Text',
        value: '',
        type: 'Integer',
        operator: '',
        span: 8,
        componentProps: {},
      },
      {
        title: '是否内置',
        field: 'builtIn',
        componentType: 'Switch',
        value: '',
        operator: '',
        span: 8,
        type: 'Boolean',
        componentProps: {},
      },
      {
        title: '更新枚举',
        field: 'syncEnum',
        componentType: 'Switch',
        value: '',
        operator: '',
        span: 8,
        type: 'Boolean',
        componentProps: {},
      },
      {
        title: '字典项列表',
        field: 'items',
        componentType: 'ESelect',
        value: '',
        operator: '',
        span: 8,
        componentProps: { api: null, style: 'width: 100%', valueField: 'id', labelField: 'name' },
      },
    ];
  },
  columns: (): VxeGridPropTypes.Columns => {
    return [
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
        title: '字典名称',
        field: 'dictName',
        minWidth: 160,
        visible: true,
        treeNode: false,
        params: { type: 'STRING' },
        editRender: { name: 'EInput', enabled: false },
      },
      {
        title: '字典Key',
        field: 'dictKey',
        minWidth: 160,
        visible: true,
        treeNode: false,
        params: { type: 'STRING' },
        editRender: { name: 'EInput', enabled: false },
      },
      {
        title: '是否禁用',
        field: 'disabled',
        minWidth: 70,
        visible: true,
        treeNode: false,
        params: { type: 'BOOLEAN' },
        cellRender: { name: 'ESwitch', props: { disabled: false } },
      },
      {
        title: '排序',
        field: 'sortValue',
        minWidth: 80,
        visible: true,
        treeNode: false,
        params: { type: 'INTEGER' },
        editRender: { name: 'EInputNumber', enabled: false, props: { controls: false } },
      },
      {
        title: '是否内置',
        field: 'builtIn',
        minWidth: 70,
        visible: true,
        treeNode: false,
        params: { type: 'BOOLEAN' },
        cellRender: { name: 'ESwitch', props: { disabled: false } },
      },
      {
        title: '更新枚举',
        field: 'syncEnum',
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
  },
  baseGridOptions: (): VxeGridProps => {
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
        autoHidden: true,
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
        enabled: false,
      },
    };
  },
};

// begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！
const props = defineProps({
  query: {
    type: Object,
    default: () => ({}),
  },
  editIn: {
    type: String,
    default: '',
  },
  field: {
    type: String,
    default: '',
  },
  source: {
    type: String,
    default: '',
  },
  baseData: {
    type: Object,
    default: () => ({}),
  },
  cardExtra: {
    type: Array,
    default: ['import', 'export', 'print'],
  },
  gridOptions: {
    type: Object,
    default: () => ({}),
  },
  searchFormOptions: {
    type: Object,
    default: () => ({
      disabled: false,
    }),
  },
  gridCustomConfig: {
    type: Object,
    default: () => ({
      hideOperations: false,
      hideSlots: [],
      hideColumns: [],
    }),
  },
  updateType: {
    type: String,
    default: 'remoteApi', // 'remoteApi' | 'emitSelected'
  },
});

const modalComponentRef = ref<any>(null);
const drawerComponentRef = ref<any>(null);
const ctx = getCurrentInstance()?.proxy;
const { push } = useRouter();
const apiService = ctx?.$apiService as typeof ServerProvider;
const relationshipApis: any = {
  items: apiService.settings.commonFieldDataService.retrieve,
};
const apis = {
  dictionaryService: apiService.settings.dictionaryService,
  find: apiService.settings.dictionaryService.retrieve,
  deleteById: apiService.settings.dictionaryService.delete,
  deleteByIds: apiService.settings.dictionaryService.deleteByIds,
  update: apiService.settings.dictionaryService.update,
  updateRelations: apiService.settings.dictionaryService.updateRelations,
};
const pageConfig = {
  title: '数据字典列表',
  baseRouteName: 'systemDictionary',
};
const columns = config.columns();
const searchFormFields = config.searchForm();
if (props.gridCustomConfig?.hideColumns?.length > 0) {
  const filterColumns = columns.filter(column => !props.gridCustomConfig.hideColumns.includes(column.field));
  columns.length = 0;
  columns.push(...filterColumns);
}
const xGrid = ref({} as VxeGridInstance);
const searchInputRef = ref(null);
const searchFormConfig = reactive(
  Object.assign(
    {
      fieldList: searchFormFields,
      toggleSearchStatus: false,
      useOr: false,
      disabled: false,
      allowSwitch: true,
    },
    props.searchFormOptions,
  ),
);
const batchOperations = [];
let rowOperations = [
  {
    disabled: false,
    name: 'save',
    type: 'success',
    link: true,
  },
  {
    name: 'delete',
    type: 'danger',
    link: true,
  },
  {
    name: 'cancelRelate',
    title: '取消关联',
    type: 'danger',
    link: true,
  },
  {
    title: '详情',
    name: 'detail',
    containerType: 'drawer',
    type: 'info',
    link: true,
  },
];
if (props.gridCustomConfig?.rowOperations && isArray(props.gridCustomConfig.rowOperations)) {
  if (props.gridCustomConfig.rowOperations.length === 0) {
    rowOperations = [];
  } else {
    rowOperations = rowOperations.filter(item =>
      props.gridCustomConfig.rowOperations.some(rowItem => (isObject(rowItem) ? item.name === rowItem['name'] : item.name === rowItem)),
    );
  }
}
const tableRowOperations = reactive<any[]>([]);
const tableRowMoreOperations = reactive<any[]>([]);
const saveOperation = rowOperations.find(operation => operation.name === 'save');
if (rowOperations.length > 4 || (saveOperation && rowOperations.length > 3)) {
  if (saveOperation) {
    tableRowOperations.push(...rowOperations?.slice(0, 3));
    tableRowMoreOperations.push(...rowOperations.slice(3));
  } else {
    tableRowOperations.push(...rowOperations?.slice(0, 4));
    tableRowMoreOperations.push(...rowOperations.slice(4));
  }
} else {
  tableRowOperations.push(...rowOperations);
}
const selectedRows = reactive<any>([]);
const loading = ref(false);
const searchFormRef = ref<any>(null);
const searchValue = ref('');
const mapOfFilter = ref({});
const treeFilterData = [];
const filterTreeConfig = reactive({
  filterTreeSpan: treeFilterData && treeFilterData.length > 0 ? 6 : 0,
  treeFilterData,
  expandedKeys: [],
  checkedKeys: [],
  selectedKeys: [],
  autoExpandParent: true,
});
const modalConfig = reactive<any>({
  componentName: '',
  entityId: '',
  containerType: 'modal',
  baseData: props.baseData,
  width: '80%',
  destroyOnClose: true,
  modelValue: false,
});
const drawerConfig = reactive<any>({
  componentName: '',
  containerType: 'drawer',
  entityId: '',
  baseData: props.baseData,
  width: '70%',
  destroyOnClose: true,
  modelValue: false,
});
const gridOptions = reactive<VxeGridProps>({
  ...config.baseGridOptions(),
  customConfig: {
    storage: true,
    checkMethod({ column }) {
      return !['nickname', 'role'].includes(column.field);
    },
  },
  proxyConfig: {
    enabled: true,
    autoLoad: true,
    seq: true,
    sort: true,
    filter: true,
    props: {
      result: 'records',
      total: 'total',
    },
    ajax: {
      query: async ({ filters, page, sort, sorts }) => {
        console.log('filters', filters);
        if (props.updateType !== 'remoteApi') {
          const queryData = pickBy(props.query, e => !!e && !isEmpty(e));
          if (!queryData || Object.keys(queryData).length === 0) {
            return new Promise<any>(resolve => {
              resolve({ records: [], size: page?.pageSize || 15, page: page.currentPage, total: 0 });
            });
          }
        }
        const queryParams: any = { ...props.query };
        queryParams.page = page?.currentPage > 0 ? page.currentPage - 1 : 0;
        queryParams.size = page?.pageSize;
        const allSort = sorts || [];
        sort && allSort.push(sort);
        queryParams.sort = transVxeSorts(allSort);
        if (searchValue.value) {
          queryParams['jhiCommonSearchKeywords'] = searchValue.value;
        } else {
          Object.assign(queryParams, getSearchQueryData(searchFormConfig));
        }
        return await apis.find(queryParams);
      },
      queryAll: async () => await apis.find({ size: -1 }),
      delete: async records => await apis.deleteByIds(records.body.removeRecords.map(record => record.id)),
    },
  },
  toolbarConfig: {
    custom: true,
    import: false,
    print: false,
    export: false,
    slots: {
      buttons: 'toolbar_buttons',
    },
    // 表格左上角自定义按钮
    buttons: [
      {
        name: '批量操作',
        circle: false,
        icon: 'vxe-icon-add',
        status: 'primary',
        dropdowns: [
          { code: 'batchDelete', name: '删除', circle: false, icon: 'ant-design:delete-filled', status: 'primary' },
          { code: 'batchCancelRelate', name: '取消关联', circle: false, icon: 'ant-design:split-cells-outlined', status: 'primary' },
        ],
      },
    ],
    // 表格右上角自定义按钮
    tools: [{ code: 'add', name: '新增', circle: false, icon: 'vxe-icon-add' }],
  },
  columns,
});
gridOptions!.pagerConfig!.slots = {
  left: () => {
    return h(ElAlert, { type: 'warning', banner: true, message: `已选择 ${selectedRows.length} 项`, style: 'height: 30px' });
  },
};
mergeWith(gridOptions, props.gridOptions, (objValue: any, srcValue: any, key: any) => {
  if (isArray(objValue) && ['buttons', 'tools'].includes(key)) {
    if (!srcValue) {
      return objValue;
    } else if (isArray(srcValue) && srcValue.length === 0) {
      return srcValue;
    } else if (isArray(srcValue) && srcValue.length > 0) {
      const newObjValue: any[] = [];
      srcValue.forEach((srcItem: any) => {
        if (isObject(srcItem)) {
          const objItem = objValue.find(item => item.code === srcItem['code']) || {};
          newObjValue.push(Object.assign(objItem, srcItem));
        } else if (isString(srcItem)) {
          const objItem = objValue.find(item => item.code === srcItem);
          objItem && newObjValue.push(objItem);
        }
      });
      return newObjValue;
    }
  }
});
const gridEvents = reactive<VxeGridListeners>({
  checkboxAll: () => {
    const $grid = xGrid.value;
    selectedRows.length = 0;
    selectedRows.push(...$grid.getCheckboxRecords());
  },
  checkboxChange: () => {
    const $grid = xGrid.value;
    selectedRows.length = 0;
    selectedRows.push(...$grid.getCheckboxRecords());
  },
  pageChange({ currentPage, pageSize }) {
    if (gridOptions.pagerConfig) {
      gridOptions.pagerConfig.currentPage = currentPage;
      gridOptions.pagerConfig.pageSize = pageSize;
    }
  },
  radioChange() {
    const $grid = xGrid.value;
    selectedRows.length = 0;
    selectedRows.push($grid.getRadioRecord());
  },
  // 表格左上角按钮事件
  toolbarButtonClick({ code }) {
    const $grid = xGrid.value;
    switch (code) {
      case 'batchDelete': {
        const records = $grid.getCheckboxRecords(true);
        if (records?.length > 0) {
          const ids = records.map(record => record.id);
          ElMessageBox.confirm(`是否删除ID为【${ids.join(',')}】的${records.length}项数据？`, `操作提示`, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info',
          }).then(() => {
            apis.deleteByIds(ids).then(() => {
              formSearch();
            });
          });
        }
        break;
      }
      case 'batchCancelRelate': {
        const records = $grid.getCheckboxRecords(true);
        if (records?.length > 0) {
          if (props.updateType === 'remoteApi') {
            const ids = records.map(record => record.id);
            ElMessageBox.confirm(`是否取消ID为【${ids.join(',')}】的${records.length}项数据的关联？`, `操作提示`, {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'info',
            }).then(() => {
              const relatedIds = ids;
              const otherEntityIds: any[] = [];
              if (props.query) {
                Object.values(props.query).forEach((value: any) => {
                  if (value !== null && value !== undefined) {
                    otherEntityIds.push(`${value}`);
                  }
                });
              }
              const relationshipName = relationships[props.source + '.' + props.field];
              apis.updateRelations(otherEntityIds, relationshipName, relatedIds, 'delete').then(result => {
                if (result) {
                  ElMessage.success({
                    message: '取消关联成功',
                    duration: 3000,
                  });
                  formSearch();
                } else {
                  ElMessage.error({
                    message: '取消关联失败',
                    duration: 5000,
                    showClose: true,
                    onClose: () => {},
                  });
                }
              });
            });
          } else {
            if (xGrid.value && records?.length > 0) {
              xGrid.value.remove(records).then(() => {
                ElMessage.success({
                  message: '取消关联成功',
                  duration: 3000,
                });
              });
            }
          }
        }
        break;
      }
      default:
        console.log('事件未定义', code);
    }
  },
  // 表格右上角自定义按钮事件
  toolbarToolClick({ code }) {
    switch (code) {
      case 'new': {
        const newConfig: any = {};
        newConfig.componentName = shallowRef(DictionaryEdit);
        newConfig.entityId = '';
        if (props.editIn === 'drawer') {
          Object.assign(drawerConfig, newConfig);
          setDrawerProps({ open: true });
        } else {
          Object.assign(modalConfig, newConfig);
          setModalProps({ open: true });
        }
        break;
      }
      case 'add': {
        const result: any = {};
        const tools: string[] = [];
        const buttons: string[] = [];
        const rowOperations = ['detail'];
        result.gridOptions = merge({}, { toolbarConfig: { import: false, print: false, export: false, custom: false, tools, buttons } });
        result.cardExtra = [];
        result.searchFormOptions = merge({});
        result.gridCustomConfig = merge({}, { rowOperations });
        result.componentName = shallowRef(DictionaryList);
        result.entityId = '';
        if (props.editIn === 'drawer') {
          Object.assign(drawerConfig, result);
          setDrawerProps({ open: true });
        } else {
          Object.assign(modalConfig, result);
          setModalProps({ open: true });
        }
        break;
      }
    }
  },
  editClosed({ row, column }) {
    const field = column.property;
    const cellValue = row[field];
    // 判断单元格值是否被修改
    if (xGrid.value.isUpdateByRow(row, field)) {
      const entity = { id: row.id };
      entity[field] = cellValue;
      apis
        .update(entity, [row.id], [field])
        .then(() => {
          ElMessage.success({
            message: `信息更新成功。 ${field}=${cellValue}`,
            duration: 3000,
          });
          xGrid.value.reloadRow(row, null, field);
        })
        .catch(error => {
          console.log('error', error);
          ElMessage.error({
            message: `信息保存可能存在问题！ ${field}=${cellValue}`,
            onClose: () => {},
            showClose: true,
          });
        });
    }
  },
});
const okModal = async () => {
  if (modalComponentRef.value) {
    const selectRows = modalComponentRef.value.getSelectRows();
    if (props.updateType === 'remoteApi') {
      // 对selectRows进行处理。
      const relatedIds = selectRows.map(row => row.id);
      const otherEntityIds: any[] = [];
      if (props.query) {
        Object.values(props.query).forEach((value: any) => {
          if (value && value.length > 0) {
            otherEntityIds.push(`${value}`);
          }
        });
      }
      const relationshipName = relationships[props.source + '.' + props.field];
      const result = await apis.updateRelations(otherEntityIds, relationshipName, relatedIds, 'add');
      if (result) {
        ElMessage.success({
          message: '关联成功',
          duration: 3000,
        });
        formSearch();
        closeModal();
      } else {
        ElMessage.error({
          content: '关联失败',
          duration: 5000,
        });
      }
    } else {
      if (xGrid.value && selectRows?.length > 0) {
        xGrid.value.insert(selectRows).then(() => {
          ElMessage.success({
            message: '关联成功',
            duration: 3000,
          });
        });
      }
      closeModal();
    }
  }
};
const okDrawer = async () => {
  if (drawerComponentRef.value) {
    const selectRows = drawerComponentRef.value.getSelectRows();
    if (props.updateType === 'remoteApi') {
      // 对selectRows进行处理。
      const relatedIds = selectRows.map(row => row.id);
      const otherEntityIds: any[] = [];
      if (props.query) {
        Object.values(props.query).forEach((value: any) => {
          if (value && value.length > 0) {
            otherEntityIds.push(`${value}`);
          }
        });
      }
      const relationshipName = relationships[props.source + '.' + props.field];
      const result = await apis.updateRelations(otherEntityIds, relationshipName, relatedIds, 'add');
      if (result) {
        ElMessage.success({
          message: '关联成功',
          duration: 3000,
        });
        closeDrawer();
        formSearch();
      } else {
        ElMessage.error({
          message: '关联失败',
          duration: 5000,
        });
      }
    } else {
      if (xGrid.value && selectRows?.length > 0) {
        xGrid.value.insert(selectRows).then(() => {
          ElMessage.success({
            message: `关联成功`,
            duration: 3000,
          });
        });
      }
      closeDrawer();
    }
  }
};
const formSearch = () => {
  xGrid.value.commitProxy('reload');
};
const inputSearch = debounce(formSearch, 700);
onMounted(() => {
  // 临时方案
  const $grid: HTMLElement = xGrid.value.$el as HTMLElement;
  const myElement = $grid.querySelector('.vxe-toolbar .vxe-custom--wrapper .vxe-button.type--button');
  if (myElement?.className) {
    myElement.className = myElement.className.replace('is--circle', '');
    myElement.setAttribute('style', 'border-radius: 4px !important;');
  }

  const parent = myElement?.parentElement;
  if (parent) {
    parent.className = parent.className + ' begcode';
  }
  const text = document.createElement('span');
  text.className = 'vxe-button--content';
  text.innerText = '列配置';
  myElement?.appendChild(text);
});

const handleToggleSearch = () => {
  searchFormConfig.toggleSearchStatus = !searchFormConfig.toggleSearchStatus;
};

const onCheck = checkedKeys => {
  filterTreeConfig.checkedKeys = checkedKeys;
};

const showSearchFormSetting = () => {
  if (searchFormRef.value) {
    searchFormRef.value.showSettingModal();
  }
};

const onSelect = (selectedKeys, info) => {
  const filterData = info.node.dataRef;
  if (filterData.type === 'filterGroup') {
    mapOfFilter.value[info.node.dataRef.key].value = [];
  } else if (filterData.type === 'filterItem') {
    mapOfFilter.value[info.node.dataRef.filterName].value = [info.node.dataRef.filterValue];
  }
  formSearch();
  filterTreeConfig.selectedKeys = selectedKeys;
};

const switchFilterTree = () => {
  filterTreeConfig.filterTreeSpan = filterTreeConfig.filterTreeSpan > 0 ? 0 : 6;
};

const rowMoreClick = (e, row) => {
  const { key } = e;
  const operation = tableRowMoreOperations.find(operation => operation.name === key);
  rowClickHandler(key, operation, row);
};

const rowClick = (name, row) => {
  const operation = tableRowOperations.find(operation => operation.name === name);
  rowClickHandler(name, operation, row);
};

const rowClickHandler = (name, operation, row) => {
  switch (name) {
    case 'save':
      break;
    case 'edit':
      if (operation) {
        if (operation.click) {
          operation.click(row);
        } else {
          const containerType = props.editIn || operation.containerType;
          switch (containerType) {
            case 'drawer':
              drawerConfig.componentName = shallowRef(DictionaryEdit);
              drawerConfig.entityId = row.id;
              drawerConfig.title = '编辑';
              drawerConfig.modelValue = true;
              break;
            case 'route':
              if (pageConfig.baseRouteName) {
                push({ name: `${pageConfig.baseRouteName}Edit`, params: { entityId: row.id } });
              } else {
                console.log('未定义方法');
              }
              break;
            case 'modal':
            default:
              modalConfig.componentName = shallowRef(DictionaryEdit);
              modalConfig.entityId = row.id;
              modalConfig.modelValue = true;
          }
        }
      } else {
        switch (props.editIn) {
          case 'drawer':
            drawerConfig.componentName = shallowRef(DictionaryEdit);
            drawerConfig.entityId = row.id;
            drawerConfig.modelValue = true;
            break;
          case 'route':
            if (pageConfig.baseRouteName) {
              push({ name: `${pageConfig.baseRouteName}Edit`, params: { entityId: row.id } });
            } else {
              console.log('未定义方法');
            }
            break;
          case 'modal':
          default:
            modalConfig.componentName = shallowRef(DictionaryEdit);
            modalConfig.entityId = row.id;
            modalConfig.modelValue = true;
        }
      }
      break;
    case 'detail':
      if (operation) {
        if (operation.click) {
          operation.click(row);
        } else {
          switch (operation.containerType) {
            case 'drawer':
              drawerConfig.componentName = shallowRef(DictionaryDetail);
              drawerConfig.entityId = row.id;
              drawerConfig.title = '详情';
              drawerConfig.modelValue = true;
              break;
            case 'route':
              if (pageConfig.baseRouteName) {
                push({ name: `${pageConfig.baseRouteName}Detail`, params: { entityId: row.id } });
              } else {
                console.log('未定义方法');
              }
              break;
            case 'modal':
            default:
              modalConfig.componentName = shallowRef(DictionaryDetail);
              modalConfig.entityId = row.id;
              modalConfig.title = '详情';
              modalConfig.modelValue = true;
          }
        }
      } else {
        if (pageConfig.baseRouteName) {
          push({ name: `${pageConfig.baseRouteName}Detail`, params: { entityId: row.id } });
        } else {
          console.log('未定义方法');
        }
      }
      break;
    case 'delete':
      Modal.confirm({
        title: `操作提示`,
        content: `是否确认删除ID为${row.id}的记录？`,
        onOk() {
          if (operation.click) {
            operation.click(row);
          } else {
            apis.deleteById(row.id).then(() => {
              formSearch();
            });
          }
        },
      });
      break;
    case 'cancelRelate':
      Modal.confirm({
        title: `操作提示`,
        content: `是否取消ID为${row.id}的关联？`,
        onOk() {
          if (operation.click) {
            operation.click(row);
          } else {
            if (props.updateType === 'remoteApi') {
              const relatedIds = [row.id];
              const otherEntityIds: any[] = [];
              if (props.query) {
                Object.values(props.query).forEach((value: any) => {
                  if (value !== null && value !== undefined) {
                    otherEntityIds.push(`${value}`);
                  }
                });
              }
              const relationshipName = relationships[props.source + '.' + props.field];
              apis.updateRelations(otherEntityIds, relationshipName, relatedIds, 'delete').then(result => {
                if (result) {
                  message.success({
                    content: `取消关联成功`,
                    duration: 1,
                  });
                  formSearch();
                } else {
                  message.error({
                    content: `取消关联失败！`,
                    duration: 1,
                  });
                }
              });
            } else {
              if (xGrid.value) {
                xGrid.value.remove([row]).then(() => {
                  message.success({
                    content: `取消成功`,
                    duration: 1,
                  });
                });
              }
            }
          }
        },
      });
      break;
    default:
      if (operation) {
        if (operation.click) {
          operation.click(row);
        } else {
          console.log('error', `click方法未定义`);
        }
      } else {
        console.log('error', `${name}未定义`);
      }
  }
};
const getCheckboxRecords = () => {
  return toRaw(selectedRows);
};

const getData = () => {
  if (xGrid.value) {
    const data = xGrid.value.getTableData();
    return data.fullData || [];
  } else {
    return [];
  }
};

defineExpose({
  getCheckboxRecords,
  getData,
});
</script>
<style lang="css" scoped>
.bc-list-result-card {
  border: none;
}
.el-card__body {
  padding: 0 !important;
}
</style>
