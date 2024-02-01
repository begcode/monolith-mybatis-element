<template>
  <!-- begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！-->
  <ElCard v-if="searchFormConfig.toggleSearchStatus" title="高级搜索" class="bc-list-search-form-card">
    <template #header>
      <div class="card-header">
        <ElText><Icon icon="ep:set-up"></Icon>高级搜索</ElText>
        <ElSpace>
          <ElButton @click="showSearchFormSetting" size="small" circle><Icon icon="ep:setting"></Icon></ElButton>
        </ElSpace>
      </div>
    </template>
    <SearchForm :config="searchFormConfig" @formSearch="formSearch" @close="handleToggleSearch" />
  </ElCard>
  <ElCard :bordered="false" class="bc-list-result-card" :bodyStyle="{ 'padding-top': '1px' }">
    <template #header>
      <div class="card-header">
        <ElButton @click="formSearch" size="small" text class="pl-0!"><Icon icon="ep:memo" />用户列表</ElButton>
        <ElSpace>
          <ElDivider direction="vertical" />
          <ElButton @click="xGrid.openImport()" size="small" circle><Icon icon="ep:upload-filled" /></ElButton>
          <ElButton @click="xGrid.openExport()" size="small" circle><Icon icon="ep:download" /></ElButton>
          <ElButton @click="xGrid.openPrint()" size="small" circle><Icon icon="ep:printer" /></ElButton>
          <ElButton size="small" circle><Icon icon="ep:setting" /></ElButton>
        </ElSpace>
      </div>
    </template>
    <ElRow :gutter="16">
      <ElCol :span="filterTreeConfig.filterTreeSpan" v-if="filterTreeConfig.filterTreeSpan > 0">
        <ElTree
          style="border: #bbcedd 1px solid; height: 100%"
          v-model="filterTreeConfig.checkedKeys"
          :expandedKeys="filterTreeConfig.expandedKeys"
          :autoExpandParent="filterTreeConfig.autoExpandParent"
          :selectedKeys="filterTreeConfig.selectedKeys"
          :treeData="filterTreeConfig.treeFilterData"
          @select="onSelect"
          @expand="onExpand"
        />
      </ElCol>
      <ElCol :span="24 - filterTreeConfig.filterTreeSpan">
        <vxe-grid ref="xGrid" v-bind="gridOptions" v-on="gridEvents">
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
              <ElCol v-if="!searchFormConfig.toggleSearchStatus">
                <ElSpace>
                  <ElInput v-model="searchValue" placeholder="请输入关键字" clearable @input="inputSearch" @change="formSearch">
                    <template #prefix>
                      <Icon icon="ant-design:search-outlined" />
                    </template>
                    <template #append>
                      <ElButton text @click="formSearch"
                        >查询<Icon icon="ant-design:filter-outlined" @click="handleToggleSearch" class="ml-2"
                      /></ElButton>
                    </template>
                  </ElInput>
                  <template v-for="button of gridOptions.toolbarConfig.buttons">
                    <ElButton v-if="!button.dropdowns">{{ button.name }}</ElButton>
                    <ElDropdown v-else :key="button.name" :content="button.name" trigger="click">
                      <template #dropdown>
                        <ElDropdownMenu @click="" v-for="subButton of button.dropdowns">
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
              <template
                v-for="operation in tableRowOperations.filter(
                  rowOperation => !rowOperation.disabled && !(rowOperation.hide && rowOperation.hide(row)),
                )"
              >
                <template v-if="operation.name === 'save'">
                  <ElButton
                    :type="operation.type || 'success'"
                    :link="operation.link"
                    status="primary"
                    v-if="xGrid.isEditByRow(row) && xGrid.props.editConfig.mode === 'row'"
                    :key="operation.name"
                    :icon="operation.icon || 'step-forward-outlined'"
                    :title="operation.title || '保存'"
                    @click="rowClick('save', row)"
                  >
                    <Icon icon="ant-design:save-outlined" #icon v-if="!operation.link" />
                    <span v-else>{{ operation.title || '保存' }}</span>
                  </ElButton>
                  <ElButton
                    :type="operation.type || 'primary'"
                    :link="operation.link"
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
                    shape="circle"
                    @click="rowClick('delete', row)"
                  >
                    <Icon :icon="operation.icon || 'ant-design:delete-outlined'" #icon v-if="!operation.link" />
                    <span v-else>{{ operation.title || '删除' }}</span>
                  </ElButton>
                </template>
                <template v-else>
                  <ElButton
                    :type="operation.type || 'primary'"
                    :link="operation.link"
                    v-if="!operation.disabled"
                    :key="operation.name"
                    :title="operation.title || '操作'"
                    shape="circle"
                    @click="rowClick(operation.name, row)"
                  >
                    <Icon :icon="operation.icon || 'ant-design:info-circle-outlined'" v-if="!operation.link" #icon />
                    <span v-else>{{ operation.title || '操作' }}</span>
                  </ElButton>
                </template>
              </template>
              <ElDropdown v-if="tableRowMoreOperations && tableRowMoreOperations.length" trigger="click">
                <template #dropdown>
                  <ElDropdownMenu @click="rowMoreClick($event, row)" style="border-radius: 25%">
                    <ElDropdownItem
                      :key="operation.name"
                      v-for="operation in tableRowMoreOperations.filter(operation => !operation.disabled)"
                    >
                      <Icon :icon="operation.icon" v-if="operation.icon" />
                      <span v-if="operation.link">{{ operation.title }}</span>
                    </ElDropdownItem>
                  </ElDropdownMenu>
                </template>
                <a class="ant-dropdown-link" @click.prevent>
                  &nbsp;
                  <Icon icon="ep:arrow-down" class="el-icon--right" />
                </a>
              </ElDropdown>
            </template>
          </template>
        </vxe-grid>
      </ElCol>
    </ElRow>
    <Dialog v-bind="modalConfig" @close="closeModalOrDrawer">
      <component
        :is="modalConfig.componentName"
        v-bind="modalConfig"
        @cancel="closeModalOrDrawer"
        @submit="closeModalOrDrawer"
        @refresh="formSearch"
        ref="modalComponentRef"
      />
      <template #footer>
        <el-button plain @click="closeModalOrDrawer({ containerType: 'modal', update: false })">关闭</el-button>
        <el-button type="primary" plain @click="okModal">保存</el-button>
      </template>
    </Dialog>
    <ElDrawer v-bind="drawerConfig" @close="closeModalOrDrawer">
      <component
        :is="drawerConfig.componentName"
        v-bind="drawerConfig"
        @cancel="closeModalOrDrawer"
        @submit="closeModalOrDrawer"
        @refresh="formSearch"
        ref="drawerComponentRef"
      />
    </ElDrawer>
  </ElCard>
</template>

<script lang="ts" setup>
import { reactive, ref, getCurrentInstance, h, shallowRef, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  ElRow,
  ElCol,
  ElCard,
  ElButton,
  ElSpace,
  ElAlert,
  ElMessage,
  ElMessageBox,
  ElDrawer,
  ElDropdown,
  ElTree,
  ElDivider,
  ElDropdownMenu,
  ElDropdownItem,
  ElInput,
  ElText,
} from 'element-plus';
import { VxeGridInstance, VxeGridListeners, VxeGridProps } from 'vxe-table';
import { mergeWith, isArray, isObject, isString, debounce } from 'lodash-es';
import { getSearchQueryData } from '@/utils/jhipster/entity-utils';
import { SearchForm, Icon, Dialog } from '@begcode/components';
import ServerProvider from '@/api/index';
import UserEdit from './user-edit.vue';
import UserDetail from './user-detail.vue';
import config from './config/list-config';

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
});

const modalComponentRef = ref<any>(null);
const drawerComponentRef = ref<any>(null);
const ctx = getCurrentInstance()?.proxy;
const { push } = useRouter();
const apiService = ctx?.$apiService as typeof ServerProvider;
const apis = {
  userService: apiService.system.userService,
  find: apiService.system.userService.retrieve,
  deleteById: apiService.system.userService.delete,
  deleteByIds: apiService.system.userService.deleteByIds,
  update: apiService.system.userService.update,
};
const pageConfig = {
  title: '用户列表',
  baseRouteName: 'systemUser',
};
const columns = config.columns();
const searchFormFields = config.searchForm();
const xGrid = ref({} as VxeGridInstance);
const searchInput = ref(null);
const searchFormConfig = reactive({
  fieldList: searchFormFields,
  toggleSearchStatus: false,
  useOr: false,
  disabled: false,
  showExpand: true,
});
const batchOperations = [];
const rowOperations = [
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
    title: '详情',
    name: 'detail',
    containerType: 'drawer',
    type: 'info',
    link: true,
  },
];
const tableRowOperations = reactive<any[]>([]);
const tableRowMoreOperations = reactive<any[]>([]);
const saveOperation = rowOperations.find(operation => operation.name === 'save');
if (rowOperations.length > 4 || (saveOperation && rowOperations.length > 3)) {
  if (saveOperation) {
    tableRowOperations.push(...rowOperations?.slice(0, 2));
    tableRowMoreOperations.push(...rowOperations.slice(3));
  } else {
    tableRowOperations.push(...rowOperations?.slice(0, 3));
    tableRowMoreOperations.push(...rowOperations.slice(4));
  }
} else {
  tableRowOperations.push(...rowOperations);
}
const selectedRows = reactive<any>([]);
const loading = ref(false);
const searchFormRef = ref<any>(null);
const searchValue = ref('');
const mapOfFilter = reactive({});
const mapOfSort: { [key: string]: any } = reactive({});
columns?.forEach(column => {
  if (column.sortable && column.field) {
    mapOfSort[column.field] = false;
  }
});
const sort = () => {
  const result: any[] = [];
  Object.keys(mapOfSort).forEach(key => {
    if (mapOfSort[key] && mapOfSort[key] !== false) {
      if (mapOfSort[key] === 'asc') {
        result.push(key + ',asc');
      } else if (mapOfSort[key] === 'desc') {
        result.push(key + ',desc');
      }
    }
  });
  return result;
};
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
  modelValue: false,
});
const drawerConfig = reactive<any>({
  componentName: '',
  containerType: 'drawer',
  entityId: '',
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
        console.log('sorts', sorts);
        const queryParams: any = {};
        queryParams.page = page?.currentPage > 0 ? page.currentPage - 1 : 0;
        queryParams.size = page?.pageSize;
        if (sort && sort.field) {
          queryParams.sort = [sort.field + ',' + (sort.order === 'desc' ? 'DESC' : 'ASC')];
        }
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
        dropdowns: [{ code: 'new', name: '删除', circle: false, icon: 'ant-design:delete-filled', status: 'primary' }],
      },
    ],
    // 表格右上角自定义按钮
    tools: [{ code: 'new', name: '新增', circle: false, icon: 'vxe-icon-add' }],
  },
  columns,
});
gridOptions!.pagerConfig!.slots = {
  left: () => {
    return h(ElAlert, { type: 'warning', closable: false, banner: true, title: `已选择 ${selectedRows.length} 项`, style: 'height: 30px' });
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
    switch (code) {
      case 'myInsert': {
        break;
      }
      case 'mySave': {
        break;
      }
      case 'myExport': {
        break;
      }
    }
  },
  // 表格右上角自定义按钮事件
  toolbarToolClick({ code }) {
    switch (code) {
      case 'new':
        if (props.editIn === 'modal') {
          modalConfig.componentName = shallowRef(UserEdit);
          modalConfig.entityId = null;
          modalConfig.modelValue = true;
          setModalProps({ visible: true });
        } else if (props.editIn === 'drawer') {
          drawerConfig.componentName = shallowRef(UserEdit);
          drawerConfig.entityId = null;
          drawerConfig.modelValue = true;
        } else {
          if (pageConfig.baseRouteName) {
            push({ name: `${pageConfig.baseRouteName}New` });
          } else {
            console.log('未定义方法');
          }
        }
        break;
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
          ElMessage({
            type: 'success',
            message: `信息更新成功。 ${field}=${cellValue}`,
            duration: 3000,
          });
          xGrid.value.reloadRow(row, null, field);
        })
        .catch(error => {
          ElMessage({
            type: 'error',
            showClose: true,
            message: `信息保存可能存在问题！ ${field}=${cellValue}`,
            onClose: () => {},
          });
        });
    }
  },
});
const closeDrawer = () => {
  drawerConfig.modelValue = false;
};
const closeModal = () => {
  modalConfig.modelValue = false;
};
const handleToggleSearch = () => {
  searchFormConfig.toggleSearchStatus = !searchFormConfig.toggleSearchStatus;
};
const formSearch = () => {
  xGrid.value.commitProxy('reload');
};

const closeModalOrDrawer = ({ containerType, update }) => {
  if (containerType === 'modal') {
    modalConfig.modelValue = false;
    modalConfig.entityId = '';
  } else if (containerType === 'drawer') {
    drawerConfig.modelValue = false;
    drawerConfig.entityId = '';
  }
  if (update) {
    formSearch();
  }
};

const okModal = () => {
  if (modalConfig.containerType === 'modal') {
    if (modalComponentRef.value) {
      modalComponentRef.value.saveOrUpdate();
      formSearch();
    }
  }
};
const okDrawer = () => {
  if (drawerConfig.containerType === 'drawer') {
    if (drawerComponentRef.value) {
      drawerComponentRef.value.saveOrUpdate();
      formSearch();
    }
  }
};

const inputSearch = debounce(formSearch, 700);

onMounted(() => {
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
    mapOfFilter[info.node.dataRef.key].value = [];
  } else if (filterData.type === 'filterItem') {
    mapOfFilter[info.node.dataRef.filterName].value = [info.node.dataRef.filterValue];
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
  rowClickHandler(name, operation, row);
};

const rowClick = (name, row) => {
  const operation = tableRowOperations.find(operation => operation.name === name);
  rowClickHandler(name, operation, row);
};

const rowClickHandler = (name, operation, row) => {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
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
            case 'modal':
              modalConfig.componentName = shallowRef(UserEdit);
              modalConfig.entityId = row.id;
              if (operation.title) {
                modalConfig.title = operation.title;
              } else {
                if (modalConfig.entityId) {
                  modalConfig.title = '编辑';
                } else {
                  modalConfig.title = '新建';
                }
              }
              modalConfig.modelValue = true;
              break;
            case 'drawer':
              drawerConfig.componentName = shallowRef(UserEdit);
              drawerConfig.entityId = row.id;
              if (operation.title) {
                drawerConfig.title = operation.title;
              } else {
                if (drawerConfig.entityId) {
                  drawerConfig.title = '编辑';
                } else {
                  drawerConfig.title = '新建';
                }
              }
              drawerConfig.modelValue = true;
              break;
            case 'route':
            default:
              if (pageConfig.baseRouteName) {
                push({ name: `${pageConfig.baseRouteName}Edit`, params: { entityId: row.id } });
              } else {
                console.log('未定义方法');
              }
          }
        }
      } else {
        if (pageConfig.baseRouteName) {
          push({ name: `${pageConfig.baseRouteName}Edit`, params: { entityId: row.id } });
        } else {
          console.log('未定义方法');
        }
      }
      break;
    case 'detail':
      if (operation) {
        if (operation.click) {
          operation.click(row);
        } else {
          switch (operation.containerType) {
            case 'modal':
              modalConfig.componentName = shallowRef(UserDetail);
              modalConfig.entityId = row.id;
              modalConfig.modelValue = true;
              break;
            case 'drawer':
              drawerConfig.componentName = shallowRef(UserDetail);
              drawerConfig.entityId = row.id;
              drawerConfig.modelValue = true;
              break;
            case 'route':
            default:
              if (pageConfig.baseRouteName) {
                push({ name: `${pageConfig.baseRouteName}Detail`, params: { entityId: row.id } });
              } else {
                console.log('未定义方法');
              }
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
      ElMessageBox.confirm(`是否确认删除ID为${row.id}的记录？`, '操作提示', { type: 'warning' }).then(({ action }) => {
        if (action === 'confirm') {
          if (operation.click) {
            operation.click(row);
          } else {
            apis
              .deleteById(row.id)
              .then(() => {
                ElMessage({
                  type: 'success',
                  message: '删除成功',
                });
                formSearch();
              })
              .catch(error => {
                ElMessage({
                  type: 'info',
                  message: '删除失败！',
                });
                console.log('error', error);
              });
          }
        }
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
</script>
<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
::v-deep(.el-card__header) {
  padding: calc((var(--el-card-padding) - 2px) * 0.8) calc(var(--el-card-padding) * 0.8);
}
</style>
