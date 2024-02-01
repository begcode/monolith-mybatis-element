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
        <ElButton @click="formSearch" size="small" text class="pl-0!"><Icon icon="ep:memo" />上传图片列表</ElButton>
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
        <div>
          <CardList v-loading="loading" ref="cardList" v-bind="cardListOptions">
            <template #header_left>
              <ElRow class="toolbar_buttons_xgrid" :gutter="16">
                <ElCol :lg="2" :md="2" :sm="4" v-if="filterTreeConfig.treeFilterData.length > 0">
                  <span class="table-page-search-submitButtons">
                    <BaseButton
                      type="primary"
                      :icon="filterTreeConfig.filterTreeSpan > 0 ? 'pic-center' : 'pic-right'"
                      @click="switchFilterTree"
                    ></BaseButton>
                  </span>
                </ElCol>
                <ElCol v-if="!searchFormConfig.toggleSearchStatus">
                  <ElInput
                    v-model="searchValue"
                    placeholder="请输入关键字"
                    clearable
                    @input="inputSearch"
                    @change="formSearch"
                    ref="searchInput"
                  >
                    <template #prefix>
                      <Icon icon="ant-design:search-outlined" />
                    </template>
                    <template #append>
                      <ElButton text @click="formSearch"
                        >查询<Icon
                          icon="ant-design:filter-outlined"
                          @click="handleToggleSearch"
                          class="ml-2"
                          v-if="!searchFormConfig.disabled"
                      /></ElButton>
                    </template>
                  </ElInput>
                </ElCol>
              </ElRow>
            </template>
          </CardList>
          <div class="flex justify-between">
            <div style="display: inline-flex; flex-grow: 1; padding-right: 10px">
              <ElAlert :title="`已经选中${selectedRows.length}条记录。`" type="warning" :closable="false"></ElAlert>
            </div>
            <div style="justify-content: end; flex-grow: 0; display: inline-flex">
              <ElPagination
                v-model:current-page="paginationProp.current"
                v-model:page-size="paginationProp.pageSize"
                :page-sizes="[10, 15, 20, 25, 30]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="paginationProp.total"
                @size-change="pageSizeChange"
                @current-change="pageChange"
              />
            </div>
          </div>
        </div>
      </ElCol>
    </ElRow>
    <Dialog v-bind="modalConfig">
      <component
        :is="modalConfig.componentName"
        @cancel="closeModalOrDrawer"
        @submit="closeModalOrDrawer"
        @refresh="formSearch"
        v-bind="modalConfig"
        ref="modalComponentRef"
      />
      <template #footer>
        <el-button plain @click="closeModalOrDrawer({ containerType: 'modal', update: false })">关闭</el-button>
        <el-button type="primary" plain @click="okModal">保存</el-button>
      </template>
    </Dialog>
    <ElDrawer v-bind="drawerConfig">
      <component
        :is="drawerConfig.componentName"
        @cancel="closeModalOrDrawer"
        @submit="closeModalOrDrawer"
        @refresh="formSearch"
        v-bind="drawerConfig"
        ref="drawerComponentRef"
      />
    </ElDrawer>
  </ElCard>
</template>

<script lang="ts" setup>
import { reactive, ref, getCurrentInstance, shallowRef, onMounted } from 'vue';
import {
  ElMessageBox,
  ElMessage,
  ElAlert,
  ElCard,
  ElRow,
  ElCol,
  ElDrawer,
  ElTree,
  ElButton,
  ElInput,
  ElPagination,
  ElText,
  ElDivider,
  ElSpace,
} from 'element-plus';
import { debounce } from 'lodash-es';
import { getSearchQueryData } from '@/utils/jhipster/entity-utils';
import { CardList, Icon, SearchForm, Dialog, BaseButton } from '@begcode/components';
import { useRouter } from 'vue-router';
import ServerProvider from '@/api/index';
import UploadImageEdit from './upload-image-edit.vue';
import UploadImageDetail from './upload-image-detail.vue';
import config from './config/list-config';

// begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！

const modalComponentRef = ref<any>(null);
const drawerComponentRef = ref<any>(null);
const searchFormRef = ref<any>(null);
const ctx = getCurrentInstance()?.proxy;
const { push } = useRouter();
const apiService = ctx?.$apiService as typeof ServerProvider;
const relationshipApis: any = {
  category: apiService.files.resourceCategoryService.tree,
};
const apis = {
  find: apiService.files.uploadImageService.retrieve,
  deleteById: apiService.files.uploadImageService.delete,
  deleteByIds: apiService.files.uploadImageService.deleteByIds,
  update: apiService.files.uploadImageService.update,
};
const pageConfig = {
  title: '上传图片列表',
  baseRouteName: 'ossUploadImage',
};
const columns = config.columns();
if (columns && columns.length && Object.keys(relationshipApis).length) {
  columns
    .filter(item => item.field && Object.keys(relationshipApis).includes(item.field))
    .forEach(item => {
      Object.assign(item, { editRender: { props: { api: relationshipApis[item.field!] } } });
    });
}
const searchFormFields = config.searchForm();
const cardList = ref<any>(null);
const searchInput = ref(null);
const searchFormConfig = reactive({
  fieldList: searchFormFields,
  toggleSearchStatus: false,
  matchType: 'and',
  disabled: false,
  showExpand: true,
});
const batchOperations = [];
const rowOperations = [
  {
    disabled: false,
    name: 'save',
  },
  {
    name: 'delete',
  },
  {
    title: '详情',
    name: 'detail',
    containerType: 'drawer',
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
const modalConfig = reactive({
  componentName: '',
  entityId: '',
  containerType: 'modal',
  modelValue: false,
});
const drawerConfig = reactive({
  componentName: '',
  containerType: 'drawer',
  entityId: '',
  modelValue: false,
});
//分页相关
const page = ref(0);
const pageSize = ref(36);
const paginationProp = ref({
  showSizeChanger: false,
  showQuickJumper: true,
  pageSize: 36,
  current: 0,
  total: 0,
  showTotal: (total: number) => `总 ${total} 条`,
  onChange: pageChange,
  onShowSizeChange: pageSizeChange,
});

function pageChange(page: number, pageSize: number) {
  paginationProp.value.page = page;
  paginationProp.value.pageSize = pageSize;
}

function pageSizeChange(_current, size: number) {
  paginationProp.value.pageSize = size;
  paginationProp.value.page = _current;
}
const cardListOptions = reactive({
  params: {},
  api: async params => {
    const filesPage = await apis.find(params);
    filesPage.records.forEach((file: any) => {
      file['showImage'] = true;
    });
    return filesPage;
  },
  imageField: 'url',
  metaTitle: '',
  metaDesc: 'createAt',
  resultField: 'records',
  totalField: 'total',
  toolButtons: [
    {
      title: '新增',
      icon: 'ep:upload',
      click: () => {
        modalConfig.componentName = shallowRef(UploadImageEdit);
        modalConfig.entityId = '';
        modalConfig.containerType = 'modal';
        modalConfig.title = '新增上传图片';
        modalConfig.modelValue = true;
        modalConfig.width = 800;
        modalConfig.destroyOnClose = true;
      },
      hidden: false,
      disabled: false,
    },
  ],
  rowOperations: [
    {
      title: '编辑',
      click: (row: any) => {
        rowClickHandler('edit', { containerType: 'modal', title: '编辑' }, row);
      },
    },
    {
      title: '删除',
      click: (row: any) => {
        rowClickHandler('delete', {}, row);
      },
    },
    {
      title: '详情',
      click: (row: any) => {
        rowClickHandler('detail', { containerType: 'drawer', title: '详情' }, row);
      },
    },
  ],
});

const showSearchFormSetting = () => {
  if (searchFormRef.value) {
    searchFormRef.value.showSettingModal();
  }
};

const handleToggleSearch = () => {
  searchFormConfig.toggleSearchStatus = !searchFormConfig.toggleSearchStatus;
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

const formSearch = () => {
  let params = {};
  if (searchValue.value) {
    params['jhiCommonSearchKeywords'] = searchValue.value;
  } else {
    params = Object.assign({}, cardListOptions.params, getSearchQueryData(searchFormConfig));
  }
  cardListOptions.api(params).then(pageData => {
    cardListOptions.data = pageData.records;
    paginationProp.value.total = pageData.total;
    paginationProp.value.pageSize = pageData.size;
    paginationProp.value.current = pageData.page;
  });
};

const inputSearch = debounce(formSearch, 700);

const onCheck = checkedKeys => {
  filterTreeConfig.checkedKeys = checkedKeys;
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
          switch (operation.containerType) {
            case 'modal':
              modalConfig.componentName = shallowRef(UploadImageEdit);
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
              drawerConfig.componentName = shallowRef(UploadImageEdit);
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
              modalConfig.componentName = shallowRef(UploadImageDetail);
              modalConfig.entityId = row.id;
              modalConfig.modelValue = true;
              break;
            case 'drawer':
              drawerConfig.componentName = shallowRef(UploadImageDetail);
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
      ElMessageBox.confirm(`是否确认删除ID为${row.id}的记录？`, '操作提示').then(() => {
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
            .catch(err => {
              ElMessage({
                type: 'info',
                message: '删除失败！',
              });
              console.log('err', err);
            });
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
onMounted(() => {
  formSearch();
});
</script>
<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.toolbar_buttons_xgrid {
  margin-left: 5px !important;
}
.table-page-search-submitButtons {
  display: inline-block !important;
}
.vxe-tools--wrapper {
  padding-right: 12px;
}
::v-deep(.el-card__header) {
  padding: calc((var(--el-card-padding) - 2px) * 0.8) calc(var(--el-card-padding) * 0.8);
}
</style>
