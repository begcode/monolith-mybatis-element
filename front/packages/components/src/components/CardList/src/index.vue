<template>
  <el-scrollbar ref="scrollbarRef" data-test="card-list" v-bind="$attrs" always @scroll="onScroll">
    <div class="card-contain">
      <div class="card-wrap" :style="{ height: `${containHeight}px` }">
        <div class="flex justify-between space-x-2 mt-8px">
          <div>
            <slot name="header_left" />
          </div>
          <div>
            <slot name="header_right"></slot>
            <ElSpace>
              <template v-for="button in toolButtons">
                <ElTooltip v-if="!button.hidden">
                  <template #content>{{ button.title }}</template>
                  <ElButton :disabled="button.disabled" @click="button.click">
                    <Icon :icon="button.icon" v-if="button.icon"></Icon>
                    {{ button.title }}
                  </ElButton>
                </ElTooltip>
              </template>
              <ElTooltip trigger="click">
                <template #content>
                  <div class="w-50">每行显示数量</div>
                  <ElSlider id="slider" v-bind="sliderProp" v-model:value="grid" @change="sliderChange" />
                </template>
                <ElButton><Icon icon="ep:grid" />列数</ElButton>
              </ElTooltip>
            </ElSpace>
          </div>
        </div>
      </div>
      <div class="card-list" :style="{ transform: `translate3d(0,${startOffset}px,0)` }">
        <div :class="[fixedColumn ? 'card-fixed-column' : 'card-content', { 'fixed-width': width }]">
          <div
            class="card-row border-radius pointer"
            v-for="(item, index) in viewListRanges"
            :key="index"
            :class="[selectedId === item[keyId] ? 'select-style' : '', bitNotAllowed(item) ? 'not-allowed' : 'hover-style', rowClassStyle]"
            @click="clickHandle(item)"
            ref="cardRowRef"
            @mouseenter="$emit('mouseenter', item)"
            @mouseleave="$emit('mouseleave', item)"
          >
            <div class="card-list-content">
              <slot :row="item" :index="item.rowIndex">
                <ElCard>
                  <template #header v-if="$slots.card_header_left || $slots.card_header_right">
                    <div class="card-header">
                      <slot name="card_header_left"></slot>
                      <slot name="card_header_right"></slot>
                    </div>
                  </template>
                  <template #default>
                    <ElImage
                      v-if="item.showImage"
                      :src="item[props.imageField]"
                      v-bind="imageConfig"
                      @click="imageClick($event, item)"
                      style="width: 100%"
                    />
                    <div class="card-meta">
                      <div class="card-meta-title">
                        <ElText truncated>{{ titleValue(item) }}</ElText>
                      </div>
                      <div class="card-meta-avatar">
                        <ElAvatar :src="item.avatar" v-if="showAvatar" />
                      </div>
                      <div class="card-meta-desc" v-if="showDesc">
                        {{ descValue(item) }}
                      </div>
                    </div>
                  </template>
                  <template class="ant-card-actions" #footer>
                    <template v-for="operation in rowOperations">
                      <ElButton @click="operation.click(item)" text>{{ operation.title }}</ElButton>
                    </template>
                    <ElDropdown trigger="click">
                      <ElButton text>
                        <Icon icon="ep:more-filled" />
                      </ElButton>
                      <template #dropdown>
                        <ElDropdownMenu>
                          <ElDropdownItem>Demo</ElDropdownItem>
                        </ElDropdownMenu>
                      </template>
                    </ElDropdown>
                  </template>
                </ElCard>
              </slot>
            </div>
            <div class="sign">
              <slot name="sign" :row="item" :index="item.rowIndex" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <ElImageViewer v-if="showViewer" @close="closeViewer" :url-list="viewerImgList" />
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref, computed, watchEffect } from 'vue';
import {
  ElCard,
  ElScrollbar,
  ElTooltip,
  ElButton,
  ElSpace,
  ElSlider,
  ElImage,
  ElImageViewer,
  ElAvatar,
  ElText,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
} from 'element-plus';
import { Icon } from '@/components/Icon';
import { useCardList } from './useCardList';
import { useSlider, grid } from './data';
import { isFunction, isString } from 'lodash-es';

defineOptions({
  name: 'CardList',
});

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  data: { type: Array, default: () => [] },
  width: { type: String, default: '' },
  columns: { type: Number, default: 5 },
  fixedColumn: { type: Boolean, default: false }, // 固定column
  gridGap: { type: Number, default: 20 },
  disabled: { type: Boolean, default: false }, // 是否可选
  keyId: { type: String, default: 'id' },
  highlight: { type: Boolean, default: false }, // 点击是否高亮
  rowClass: { type: [String, Object], default: 'border' },
  toolButtons: { type: Array, default: () => [] },
  imageField: { type: String, default: 'url' },
  rowOperations: { type: Array, default: () => [] },
  showAvatar: { type: Boolean, default: false },
  showDesc: { type: Boolean, default: true },
  metaDesc: { type: [String, Function], default: '' },
  metaTitle: { type: [String, Function], default: '' },
  metaAvatar: { type: [String, Function], default: '' },
  imageConfig: { type: Object, default: () => ({ preview: true }) },
});

const emit = defineEmits(['click', 'mouseenter', 'mouseleave', 'update:modelValue', 'scroll']);

const calcnum = computed(() => `${Number((100 / props.columns).toFixed(1))}%`);
const gridgap = computed(() => `${props.gridGap}px`);
const columnwidth = computed(() => `${props.width}`);

const height = computed(() => {
  return `h-${120 - grid.value * 6}`;
});

const showViewer = ref(false);
const viewerImgList = ref([]);
const closeViewer = () => {
  showViewer.value = false;
};

const imageClick = (e, item) => {
  if (props.imageConfig.preview) {
    viewerImgList.value = [item[props.imageField]];
    showViewer.value = true;
  } else {
    if (isFunction(props.imageConfig.click)) {
      props.imageConfig.click(e, item);
    }
  }
};

// 获取slider属性
const sliderProp = computed(() => useSlider(4));

// 可选
const bitNotAllowed = item => item.disabled || props.disabled;

const rowClassStyle = computed(() => {
  if (props.rowClass === 'border') return 'border-row';
  if (props.rowClass === 'shadow') return 'box-shadow';
  return props.rowClass;
});

const selectedId = ref('');

watchEffect(() => {
  selectedId.value = props.modelValue;
});

const clickHandle = item => {
  if (bitNotAllowed(item)) return;
  if (props.highlight) {
    selectedId.value = item[props.keyId];
    emit('update:modelValue', item[props.keyId]);
  }
  emit('click', item);
};

const fetch = () => {};

async function handleDelete(id: number) {
  emit('delete', id);
}

function sliderChange(n) {
  pageSize.value = n * 4;
  fetch();
}

const titleValue = item => {
  if (isString(props.metaTitle)) {
    return item[props.metaTitle];
  } else if (isFunction(props.metaTitle)) {
    return props.metaTitle(item);
  } else {
    return '';
  }
};
const descValue = item => {
  if (isString(props.metaDesc)) {
    return item[props.metaDesc];
  } else if (isFunction(props.metaDesc)) {
    return props.metaDesc(item);
  } else {
    return '';
  }
};

const { scrollbarRef, containHeight, cardRowRef, startOffset, viewListRanges, onScroll, resetViewport } = useCardList(props, emit);
</script>

<style lang="scss" scoped>
.card-contain {
  padding: 50px 10px 10px 10px;
  position: relative;

  .card-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
}

.card-list {
  .card-content,
  .card-fixed-column {
    display: grid;
    grid-gap: v-bind(gridgap);
    grid-template-columns: repeat(v-bind(columns), calc(v-bind(calcnum) - v-bind(gridgap)));
  }

  .fixed-width {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, v-bind(columnwidth)) !important;
  }

  .card-row {
    line-height: 1.4;
    overflow: hidden;
    position: relative;
  }

  .border-row {
    border: 1px solid var(--el-border-color-dark);
  }

  .box-shadow {
    box-shadow: var(--el-box-shadow-light);
  }

  .goods-img {
    height: v-bind(imgheight);
    width: 100%;
  }

  .card-img,
  .card-list-content {
    position: relative;

    .stock-contain {
      height: 150px;
      width: 100%;
      position: absolute;
      top: -5px;
      right: 0;
    }

    .nostock-icon {
      background-color: #000;
      border-radius: 50%;
      color: #fff;
      height: 100px;
      opacity: 0.55;
      width: 100px;
      z-index: 1;
    }
  }

  .commodity-contain {
    .stock-contain {
      height: 100px;
    }

    .nostock-icon {
      width: 80px;
      height: 80px;
    }
  }

  .img-container {
    .item-img {
      height: 100%;
      object-fit: cover;
      width: 100%;
    }
  }

  .not-allowed {
    cursor: not-allowed;
  }

  .select-style {
    border: 1px solid var(--el-color-primary);

    // box-shadow: var(--el-box-shadow-light);
  }

  .hover-style {
    &:hover {
      // box-shadow: var(--el-box-shadow-light);
      border: 1px solid var(--el-color-primary);
      animation: pulse 0.4s ease-in-out;
    }
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media screen and (max-width: 1650px) {
  .card-content {
    grid-template-columns: repeat(5, calc(20% - 20px)) !important;
  }
}

@media screen and (max-width: 1500px) {
  .card-content {
    grid-template-columns: repeat(4, calc(25% - 20px)) !important;
  }
}

@media screen and (max-width: 1400px) {
  .card-content {
    grid-template-columns: repeat(3, calc(33.3% - 20px)) !important;
  }
}

@media screen and (max-width: 1200px) {
  .card-content {
    grid-template-columns: repeat(2, calc(50% - 20px)) !important;
  }
}
</style>
