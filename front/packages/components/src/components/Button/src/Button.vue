<script setup lang="ts">
import { useDesign } from '@/hooks/web/useDesign';
import { ElButton, ComponentSize, ButtonType } from 'element-plus';
import { PropType, Component, computed, unref, inject, useAttrs } from 'vue';
import { Icon } from '@/components/Icon';

defineOptions({
  name: 'BaseButton',
  inheritAttrs: false,
});

const getTheme: any = inject('GET_THEME', {});

const { getPrefixCls } = useDesign();

const prefixCls = getPrefixCls('button');

const props = defineProps({
  size: {
    type: String as PropType<ComponentSize>,
    default: undefined,
  },
  type: {
    type: String as PropType<ButtonType>,
    default: 'default',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  plain: {
    type: Boolean,
    default: false,
  },
  text: {
    type: Boolean,
    default: false,
  },
  bg: {
    type: Boolean,
    default: false,
  },
  link: {
    type: Boolean,
    default: false,
  },
  round: {
    type: Boolean,
    default: false,
  },
  circle: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  loadingIcon: {
    type: [String, Object] as PropType<String | Component>,
    default: undefined,
  },
  icon: {
    type: [String, Object] as PropType<String | Component>,
    default: undefined,
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
  nativeType: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button',
  },
  autoInsertSpace: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: '',
  },
  darker: {
    type: Boolean,
    default: false,
  },
  tag: {
    type: [String, Object] as PropType<String | Component>,
    default: 'button',
  },
  onClick: { type: Function as PropType<(...args) => any>, default: null },
});

const emits = defineEmits(['click']);

const color = computed(() => {
  const { type } = props;
  if (type === 'primary') {
    return unref(getTheme).elColorPrimary;
  }
  return '';
});

const style = computed(() => {
  const { type } = props;
  if (type === 'primary') {
    return '--el-button-text-color: #fff; --el-button-hover-text-color: #fff';
  }
  return '';
});

const attrs = useAttrs();
</script>

<template>
  <ElButton :class="`${prefixCls} color-#fff`" v-bind="{ ...attrs, ...props }" :color="color" :style="style" @click="onClick">
    <slot></slot>
    <slot name="icon" v-if="typeof props.icon === 'string'">
      <Icon :icon="props.icon" />
    </slot>
    <slot name="loading"></slot>
  </ElButton>
</template>
