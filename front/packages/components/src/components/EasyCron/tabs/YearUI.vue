<template>
  <div :class="`${prefixCls}-config-list`">
    <ElRadioGroup v-model:value="type">
      <div class="item">
        <ElRadio :value="TypeEnum.every" v-bind="beforeRadioAttrs">每年</ElRadio>
      </div>
      <div class="item">
        <ElRadio :value="TypeEnum.range" v-bind="beforeRadioAttrs">区间</ElRadio>
        <span> 从 </span>
        <ElInputNumber class="w80" v-model:value="valueRange.start" v-bind="typeRangeAttrs" />
        <span> 年 至 </span>
        <ElInputNumber class="w80" v-model:value="valueRange.end" v-bind="typeRangeAttrs" />
        <span> 年 </span>
      </div>
      <div class="item">
        <ElRadio :value="TypeEnum.loop" v-bind="beforeRadioAttrs">循环</ElRadio>
        <span> 从 </span>
        <ElInputNumber class="w80" v-model:value="valueLoop.start" v-bind="typeLoopAttrs" />
        <span> 年开始，间隔 </span>
        <ElInputNumber class="w80" v-model:value="valueLoop.interval" v-bind="typeLoopAttrs" />
        <span> 年 </span>
      </div>
    </ElRadioGroup>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElInputNumber, ElRadio, ElRadioGroup } from 'element-plus';
import { useTabProps, useTabEmits, useTabSetup } from './useTabMixin';

export default defineComponent({
  name: 'YearUI',
  components: { ElInputNumber, ElRadio, ElRadioGroup },
  props: useTabProps({
    defaultValue: '*',
  }),
  emits: useTabEmits(),
  setup(props, context) {
    const nowYear = new Date().getFullYear();
    return useTabSetup(props, context, {
      defaultValue: '*',
      minValue: 0,
      valueRange: { start: nowYear, end: nowYear + 100 },
      valueLoop: { start: nowYear, interval: 1 },
    });
  },
});
</script>
