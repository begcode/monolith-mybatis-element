<template>
  <div>
    <ElRow class="select-row" type="flex" :gutter="8">
      <ElCol class="left" :class="{ full: true }">
        <!-- 显示加载效果 -->
        <ElInput v-if="loading" readOnly placeholder="加载中…" />
        <ElSelect
          v-if="false"
          ref="select"
          v-model:value="selectData.value"
          :placeholder="placeholder"
          :mode="multiple ? 'tags' : undefined"
          :open="false"
          :disabled="true"
          :maxTagCount="maxTagCount"
          :labelInValue="labelInValue"
          style="width: 100%"
          @click="!disabled && openModal()"
        />
        <BaseButton v-else-if="showComponentName === 'Button'" :icon="buttonIcon" @click="!disabled && openModal()">{{
          modalTitle
        }}</BaseButton>
        <div class="flex items-center justify-between">
          <AvatarGroup v-bind="showComponentProps" v-if="avatarGroupData.length">
            <ElTooltip :content="item[avatarSlotField]" placement="top" v-for="item in avatarGroupData">
              <ElAvatar :src="avatarSlotName === 'src' ? item[avatarSlotField] : undefined" :size="30" shape="square">
                <template #icon v-if="avatarSlotName === 'icon' && item[avatarSlotField]"><Icon :icon="item[avatarSlotField]" /></template>
                <span v-if="avatarSlotName === 'default'">{{ (avatarSlotField && item[avatarSlotField]) || item }}</span>
              </ElAvatar>
            </ElTooltip>
          </AvatarGroup>
          <BaseButton v-if="disabled" icon="ant-design:file-search-outlined" link @click.stop="openModal"></BaseButton>
          <BaseButton v-else icon="ant-design:edit-outlined" link @click.stop="openModal"></BaseButton>
        </div>
      </ElCol>
    </ElRow>
    <Dialog
      v-model="modalVisible"
      :title="modalOrDrawerTitle"
      :mask-closable="false"
      @close="handleOk"
      width="900px"
      destroy-on-close
      wrap-class-name="vxe-table--ignore-clear"
    >
      <component v-bind="componentProps" v-on="componentEvents" :is="dynamicComponent" ref="tableModalRef" />
    </Dialog>
    <ElDrawer
      v-model="drawerVisible"
      :title="modalOrDrawerTitle"
      :mask-closable="false"
      :showFooter="!disabled"
      @close="handleOk"
      width="450px"
      destroy-on-close
      root-class-name="vxe-table--ignore-clear"
    >
      <component v-bind="componentProps" v-on="componentEvents" :is="dynamicComponent" ref="tableDrawerRef" />
    </ElDrawer>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, computed, inject, onMounted, useAttrs, toRaw } from 'vue';
import type { PropType } from 'vue';
import { ElRow, ElCol, ElInput, ElSelect, ElAvatar, ElTooltip, ElCascader, ElTree, ElDrawer } from 'element-plus';
import type { VxeGridInstance } from 'vxe-table/types/grid';
import { isArray, isObject, merge } from 'lodash-es';
import { propTypes } from '@/utils/propTypes';
import { Icon } from '@/components/Icon';
import { BaseButton } from '@/components/Button';
import { Dialog } from '@/components/Dialog';
import { AvatarGroup } from '@/components/AvatarGroup';
import TreeSelectLabelIn from '@/components/Form/src/components/TreeSelectLabelIn.vue';

defineOptions({
  name: 'SelectModal',
  inheritAttrs: false,
});

const props = defineProps({
  value: { type: [Array, Object, String, Number] },
  disabled: propTypes.bool.def(false),
  placeholder: {
    type: String,
    default: '请选择',
  },
  // 是否支持多选，默认 true
  multiple: {
    type: Boolean,
    default: true,
  },
  // 是否正在加载
  loading: propTypes.bool.def(false),
  // 最多显示多少个 tag
  maxTagCount: propTypes.number,
  // buttonIcon
  buttonIcon: propTypes.string.def(''),
  modalTitle: {
    type: String,
    default: '请选择',
  },
  showComponentName: propTypes.string.def('Select'),
  componentName: propTypes.string.def(''),
  api: propTypes.func,
  resultField: propTypes.string.def('records'),
  fieldNames: propTypes.object.def({
    label: 'label',
    value: 'value',
    children: 'children',
  }),
  labelInValue: propTypes.bool.def(false),
  checkStrictly: propTypes.bool.def(false),
  container: propTypes.string.def('modal'),
  avatarSlotName: propTypes.string.def('default'), // default icon src
  avatarSlotField: propTypes.string.def(''),
  avatarTipField: propTypes.string.def(''),
  queryNames: propTypes.arrayOf(propTypes.string).def([]),
  xGrid: { type: Object as PropType<VxeGridInstance> },
  row: { type: Object, default: null },
  column: { type: Object, default: {} },
  rowIdField: { type: String, default: '' },
  source: { type: String, default: '' },
  gridCustomConfig: propTypes.object.def({}),
  searchFormOptions: propTypes.object.def({}),
  gridOptions: propTypes.object.def({}),
  updateType: propTypes.string.def('remoteApi'), // default icon src
  valueType: propTypes.string.def(''), // array | object | splitString
});

const emit = defineEmits(['change', 'update:modelValue', 'register', 'handleOpen']);

const getViewComponent: any = inject('GET_VIEW_COMPONENT');
const { value: valueField, label: labelField } = props.fieldNames;
const selectData = reactive({ value: props.value, change: false });

if (props.componentName === 'ElTree') {
  if (selectData.value) {
    selectData.value = (selectData.value as Array<any>).map(valueItem => valueItem[valueField]);
  } else {
    selectData.value = [];
  }
}
const getComponent = (componentName: string) => {
  if (componentName === 'ElSelect') {
    return ElSelect;
  }
  if (componentName === 'ElTreeSelectLabelIn') {
    return TreeSelectLabelIn;
  }
  if (componentName === 'ElCascader') {
    return ElCascader;
  }
  if (componentName === 'ElTree') {
    return ElTree;
  }
  return getViewComponent(componentName);
};
const tableDrawerRef = ref<any>(null);
const tableModalRef = ref<any>(null);
const tableRef = computed(() => {
  return props.container === 'modal' ? tableModalRef.value : tableDrawerRef.value;
});

const options = reactive<any[]>([]);
//接收下拉框选项
// if (props.labelInValue) {
//   if (isArray(props.value) && props.value.length) {
//     options.push(
//       ...props.value.map(valueItem => ({
//         ...valueItem,
//         value: valueItem[valueField],
//         label: valueItem[labelField],
//       })),
//     );
//   }
//   if (isObject(props.value) && Object.keys(props.value).length > 1) {
//     options.push({ ...props.value, value: props.value[valueField], label: props.value[labelField] });
//   }
// } else if (props.api) {
//   const params: any = {};
//   if (props.multiple && isArray(props.value) && props.value.length > 0) {
//     params[`${valueField}.in`] = props.value.map(valueItem => valueItem[valueField]);
//   }
//   if (!props.multiple && props.value) {
//     // eslint-disable-next-line vue/no-setup-props-destructure
//     params[`${valueField}.equals`] = props.value;
//   }
//   const data = await props.api(params);
//   if (data.records && data.records.length) {
//     options.push(...data.records.map(record => ({ ...record, value: record[valueField], label: record[labelField] })));
//   }
// }

if (props.api) {
  const params: any = {};
  const data = await props.api(params);
  if (data.records && data.records.length) {
    options.push(...data.records.map(record => ({ ...record, value: record[valueField], label: record[labelField] })));
  }
}

//接收选择的值
const attrs = useAttrs();
const dynamicComponent = computed(() => {
  return getComponent(props.componentName);
});
const modalVisible = ref(false);
const drawerVisible = ref(false);

const componentProps = computed(() => {
  const result: any = { ...toRaw(attrs) };
  if (['ElSelect', 'TreeSelectLabelIn', 'ElTree'].includes(props.componentName)) {
    result.disabled = props.disabled;
    result.resultField = props.resultField;
    result.labelInValue = props.labelInValue;
    result.style = {
      width: '100%',
    };
    if (['TreeSelectLabelIn', 'ElTree'].includes(props.componentName)) {
      result.multiple = props.multiple;
      result.checkStrictly = props.checkStrictly;
    }
    result.fieldNames = props.fieldNames;
    if (props.componentName === 'ElTree') {
      result.defaultExpandAll = true;
      result.showCheckbox = true;
      result.nodeKey = props.fieldNames.value;
      result.props = {
        label: props.fieldNames.label,
        children: props.fieldNames.children,
      };
      if (props.disabled) {
        result.props.disabled = () => true;
      }
      (result.style as any).height = '400px';
    }
    if (['ElTree', 'TreeSelectLabelIn'].includes(props.componentName)) {
      result.data = options;
      result.checkedKeys = selectData.value;
      result.defaultCheckedKeys = selectData.value;
    } else {
      if (props.api) {
        result.api = props.api;
      } else {
        result.options = options;
      }
    }
  } else if (props.componentName?.endsWith('List') || props.componentName?.endsWith('Relation')) {
    result.updateType = props.updateType;
    const tools: string[] = [];
    const buttons: string[] = [];
    const rowOperations = ['detail'];
    if (props.componentName?.endsWith('Relation')) {
      tools.push('add');
      buttons.push('cancelRelate');
      rowOperations.push('cancelRelate');
    }
    result.gridOptions = merge(
      {},
      { toolbarConfig: { import: false, print: false, export: false, custom: false, tools, buttons } },
      props.gridOptions,
    );
    result.cardExtra = [];
    result.searchFormOptions = merge({}, props.searchFormOptions);
    result.gridCustomConfig = merge({}, { rowOperations }, props.gridCustomConfig);
    if (props.queryNames && props.rowIdField) {
      const queryParams: any = {};
      const valueData = props.valueType === 'splitString' ? JSON.parse(`[${props.value || ''}]`) : props.value;
      const valueObject = props.rowIdField.startsWith('row.') ? props.row : valueData || (props.multiple ? [] : {});
      const valueField = props.rowIdField.includes('.') ? props.rowIdField.split('.')[1] : props.rowIdField;
      props.queryNames
        .filter(item => item)
        .forEach(key => {
          if (Array.isArray(valueObject)) {
            if (props.valueType === 'splitString') {
              queryParams[key!] = valueObject;
            } else {
              queryParams[key!] = valueObject.map(valueItem => valueItem[valueField]);
            }
          } else {
            queryParams[key!] = valueObject[valueField];
          }
        });
      if (props?.column?.field) {
        result.field = props.column.field;
      }
      if (props?.source) {
        result.source = props.source;
      }
      result.query = queryParams;
    }
  } else if (props.componentName?.endsWith('Detail')) {
    result.containerType = props.container;
    const valueObject = props.rowIdField.startsWith('row.') ? props.row : props.value || {};
    const valueField = props.rowIdField.split('.')[1];
    result.entityId = valueObject[valueField];
  }
  return result;
});

const componentEvents = computed(() => {
  const result: any = {};
  if (props.componentName === 'ElTree') {
    result.check = ({ checked }) => {
      selectData.value = checked;
      selectData.change = true;
    };
  } else if (props.componentName?.endsWith('List')) {
  } else if (props.componentName?.endsWith('Desc')) {
  }
  return result;
});

const showComponentProps = computed(() => {
  const result: any = { size: 'small' };
  if (['Avatar'].includes(props.showComponentName)) {
    result.shape = 'square';
    if (props.avatarSlotName === 'icon') {
      result.shape = 'circle';
    }
  }
  result.maxCount = 3;
  return result;
});

const avatarGroupData = computed(() => {
  const data = props.value;
  if (isArray(data)) {
    return data;
  } else {
    return data ? [data] : [];
  }
});

const modalOrDrawerTitle = computed(() => {
  let title = props.modalTitle;
  if (!!props.disabled) {
    title = '查看';
  }
  return title;
});

/**
 * 打开弹出框
 */
function openModal(event) {
  if (props.container === 'modal') {
    modalVisible.value = true;
    setTimeout(() => {
      if (tableRef.value) {
        const $grid = tableRef.value as VxeGridInstance;
        // $grid.setCheckboxRow(selectData['value'] || [], true);
      }
    }, 800);
  } else {
    drawerVisible.value = true;
    setTimeout(() => {
      if (tableRef.value) {
        const $grid = tableRef.value as VxeGridInstance;
        // $grid.setCheckboxRow(selectData['value'] || [], true);
      }
    }, 800);
  }
}

function handleOk() {
  if (props.updateType === 'emitSelected') {
    let selectRecords: any[] = [];
    if (props.componentName === 'ElTree') {
      if (props.labelInValue) {
        const data: any[] = (selectData.value as Array<any>).map(key => {
          return {
            [valueField]: key,
          };
        });
        selectRecords.push(...data);
      }
    } else {
      if (tableRef.value) {
        // selectRecords = tableRef.value.getCheckboxRecords() || [];
        selectRecords = tableRef.value.getData() || [];
      }
    }
    if (props.valueType === 'splitString') {
      const valueField = props.rowIdField.includes('.') ? props.rowIdField.split('.')[1] : props.rowIdField;
      let joinData = selectRecords.map(record => record[valueField]).join(',');
      emit('change', joinData);
      emit('update:value', joinData);
    } else {
      emit('change', selectRecords);
      emit('update:value', selectRecords);
    }
  }
  if (props.container === 'modal') {
    modalVisible.value = false;
  } else {
    drawerVisible.value = false;
  }
}
function visibleChange(_visible) {}
</script>
<style scoped>
.select-row .left {
  width: calc(10%);
}
.select-row .right {
  width: 82px;
}
.select-row .full {
  width: 100%;
}
.select-row :deep(.ant-select-search__field) {
  display: none !important;
}
</style>
