<template>
  <ElForm>
    <ElRow :gutter="8">
      <ElCol :md="item.span || 4" v-for="(item, index) in config.fieldList.filter(field => !field.hidden)" :key="index">
        <SearchFormItem :field="item" />
      </ElCol>
      <ElCol :span="blankCols" v-if="blankCols.blankCount > 0" />
      <ElCol :sm="12" :md="8" :lg="8">
        <div :style="bottomButtonStyle">
          <ActionButton
            :show-reset="config.showReset"
            :show-search="config.showSearch"
            :show-expand="config.showExpand"
            :search-loading="config.searchLoading"
            :reset-loading="config.resetLoading"
            @expand="handleToggleAdvanced"
            @reset="reset"
            @search="search"
          />
        </div>
      </ElCol>
    </ElRow>
    <Dialog title="高级搜索设置" :modelValue="settingModalVisible">
      <Form v-bind="formConfig"></Form>
      <template #footer>
        <ElButton @click="settingModalVisible = false">close</ElButton>
      </template>
    </Dialog>
  </ElForm>
</template>

<script lang="ts" setup>
import { unref, reactive, ref, computed } from 'vue';
import { ElForm, ElRow, ElCol, ElButton, ElRadioGroup, ElRadioButton } from 'element-plus';
import SearchFormItem from './search-form-item.vue';
import { Dialog } from '@/components/Dialog';
import { Form } from '@/components/Form';
import ActionButton from '@/components/Search/src/components/ActionButton.vue';

defineOptions({
  name: 'SearchForm',
});

const props = defineProps({
  config: {
    type: Object,
    required: true,
    default: () => {
      return {};
    },
  },
  /*
   * 这个回调函数接收一个数组参数 即查询条件
   * */
  callback: {
    type: String,
    required: false,
    default: 'handleSuperQuery',
  },
  // 当前是否在加载中
  loading: {
    type: Boolean,
    default: false,
  },
  // 保存查询条件的唯一 code，通过该 code 区分
  // 默认为 null，代表以当前路由全路径为区分Code
  saveCode: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(['formSearch', 'export', 'close']);

const settingModalVisible = ref(false);

const formConfig = reactive({
  schemas: [
    {
      label: '条件组合关系',
      field: 'useOr',
      show: true,
      component: 'RadioButtonGroup',
      componentProps: {
        style: 'width: 100%',
        options: [
          { value: true, label: '或者' },
          { value: false, label: '并且' },
        ],
      },
    },
  ],
  model: props.config,
  showSubmitButton: true,
  showResetButton: true,
  submitButtonOptions: {
    preIcon: '',
    text: '确认',
  },
  resetButtonOptions: {
    text: '关闭',
    preIcon: '',
  },
  resetFunc() {
    settingModalVisible.value = false;
  },
  submitFunc(params) {
    settingModalVisible.value = false;
  },
  actionColOptions: {
    span: 24,
  },
});

const fieldTreeData = ref([]);

// 查询类型，过滤条件匹配（and、or）
const matchType = ref('and');

const blankCols = computed(() => {
  let count = 0;
  let newLine = true;
  props.config.fieldList
    .filter(field => !field.hidden)
    .forEach(field => {
      count = count + (field.span || 8);
      if (count > 24) {
        count = field.span || 8;
      }
      if (count === 24) {
        count = 0;
      }
    });
  if (count > 16) {
    count = 0;
  }
  if (count > 0) {
    newLine = false;
  }
  let blankCount = 24 - count - 8;
  if (blankCount < 0) {
    blankCount = 0;
  }
  return {
    blankCount,
    newLine,
  };
});

const bottomButtonStyle = computed(() => {
  return {
    textAlign: unref(props.config).buttonPosition as unknown as 'left' | 'center' | 'right',
    float: blankCols.value.newLine ? 'left' : 'right',
  };
});

const reset = params => {
  props.config.fieldList.forEach(field => {
    field.value = field.defaultValue || null;
  });
  emit('formSearch');
};

const showSettingModal = () => {
  settingModalVisible.value = true;
};

const submitAction = params => {
  return new Promise(() => {
    emit('formSearch');
  });
};

const handleToggleAdvanced = visible => {
  // this.formActionConfig.isAdvanced = !this.formActionConfig.isAdvanced;
  if (!visible) {
    emit('close');
  }
  // console.log('this.formActionConfig.isAdvanced', this.formActionConfig.isAdvanced)
};

const search = () => {
  emit('formSearch');
};

defineExpose({
  showSettingModal,
});
</script>

<style lang="scss" scoped>
.j-super-query-box {
  display: inline-block;
}

.j-super-query-modal {
  .j-super-query-history-card {
    :deep(.ant-card-body),
    :deep(.ant-card-head-title) {
      padding: 0;
    }

    :deep(.ant-card-head) {
      padding: 4px 8px;
      min-height: initial;
    }
  }

  .j-super-query-history-empty {
    :deep(.ant-empty-image) {
      height: 80px;
      line-height: 80px;
      margin-bottom: 0;
    }

    :deep(img) {
      width: 80px;
      height: 65px;
    }

    :deep(.ant-empty-description) {
      color: #afafaf;
      margin: 8px 0;
    }
  }

  .j-super-query-history-tree {
    .j-history-tree-title {
      width: calc(100% - 24px);
      position: relative;
      display: inline-block;

      &-closer {
        color: #999999;
        position: absolute;
        top: 0;
        right: 0;
        width: 24px;
        height: 24px;
        text-align: center;
        opacity: 0;
        transition:
          opacity 0.3s,
          color 0.3s;

        &:hover {
          color: #666666;
        }

        &:active {
          color: #333333;
        }
      }

      &:hover {
        .j-history-tree-title-closer {
          opacity: 1;
        }
      }
    }

    :deep(.ant-tree-switcher) {
      display: none;
    }

    :deep(.ant-tree-node-content-wrapper) {
      width: 100%;
    }
  }
}
</style>
