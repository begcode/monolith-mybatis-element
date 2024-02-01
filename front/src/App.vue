<script setup lang="ts">
import { computed, provide } from 'vue';
import { useAppStore } from '@/store/modules/app';
import { ConfigGlobal } from '@/components/ConfigGlobal';
import { useDark } from '@vueuse/core';
import { useDesign } from '@begcode/components';
import { getViewComponent } from '@/views/getViews';

const { getPrefixCls } = useDesign();

provide('GET_VIEW_COMPONENT', getViewComponent);

const prefixCls = getPrefixCls('app');

const appStore = useAppStore();

const currentSize = computed(() => appStore.getCurrentSize);

const greyMode = computed(() => appStore.getGreyMode);

const isDark = useDark({
  valueDark: 'dark',
  valueLight: 'light',
});

isDark.value = appStore.getIsDark;
</script>

<template>
  <ConfigGlobal :size="currentSize">
    <RouterView :class="greyMode ? `${prefixCls}-grey-mode` : ''" />
  </ConfigGlobal>
</template>

<style lang="scss">
@import '@/styles/variables.module.scss';
$prefix-cls: '#{$namespace}-app';

.size {
  width: 100%;
  height: 100%;
}

html,
body {
  padding: 0 !important;
  margin: 0;
  overflow: hidden;
  @extend .size;

  #app {
    @extend .size;
  }
}

.#{$prefix-cls}-grey-mode {
  filter: grayscale(100%);
}
</style>
