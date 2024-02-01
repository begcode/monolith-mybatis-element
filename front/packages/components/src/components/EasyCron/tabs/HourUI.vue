<template>
  <div :class="`${prefixCls}-config-list`">
    <ElRadioGroup v-model:value="type">
      <div class="item">
        <ElRadio :value="TypeEnum.every" v-bind="beforeRadioAttrs">每时</ElRadio>
      </div>
      <div class="item">
        <ElRadio :value="TypeEnum.range" v-bind="beforeRadioAttrs">区间</ElRadio>
        <span> 从 </span>
        <ElInputNumber v-model:value="valueRange.start" v-bind="typeRangeAttrs" />
        <span> 时 至 </span>
        <ElInputNumber v-model:value="valueRange.end" v-bind="typeRangeAttrs" />
        <span> 时 </span>
      </div>
      <div class="item">
        <ElRadio :value="TypeEnum.loop" v-bind="beforeRadioAttrs">循环</ElRadio>
        <span> 从 </span>
        <ElInputNumber v-model:value="valueLoop.start" v-bind="typeLoopAttrs" />
        <span> 时开始，间隔 </span>
        <ElInputNumber v-model:value="valueLoop.interval" v-bind="typeLoopAttrs" />
        <span> 时 </span>
      </div>
      <div class="item">
        <ElRadio :value="TypeEnum.specify" v-bind="beforeRadioAttrs">指定</ElRadio>
        <div class="list">
          <ElCheckboxGroup v-model:value="valueList">
            <template v-for="i in specifyRange" :key="i">
              <ElCheckbox :value="i" v-bind="typeSpecifyAttrs">{{ i }}</ElCheckbox>
            </template>
          </ElCheckboxGroup>
        </div>
      </div>
    </ElRadioGroup>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElInputNumber, ElRadio, ElRadioGroup, ElCheckbox, ElCheckboxGroup } from 'element-plus';
import { useTabProps, useTabEmits, useTabSetup } from './useTabMixin';

export default defineComponent({
  name: 'HourUI',
  components: { ElInputNumber, ElRadio, ElRadioGroup, ElCheckbox, ElCheckboxGroup },
  props: useTabProps({
    defaultValue: '*',
  }),
  emits: useTabEmits(),
  setup(props, context) {
    return useTabSetup(props, context, {
      defaultValue: '*',
      minValue: 0,
      maxValue: 23,
      valueRange: { start: 0, end: 23 },
      valueLoop: { start: 0, interval: 1 },
    });
  },
});
</script>
