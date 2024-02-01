<template>
  <div :class="`${prefixCls}-config-list`">
    <ElRadioGroup v-model:value="type">
      <div class="item">
        <ElRadio :value="TypeEnum.unset" v-bind="beforeRadioAttrs">不设置</ElRadio>
        <span class="tip-info">日和周只能设置其中之一</span>
      </div>
      <div class="item">
        <ElRadio :value="TypeEnum.every" v-bind="beforeRadioAttrs">每日</ElRadio>
      </div>
      <div class="item">
        <ElRadio :value="TypeEnum.range" v-bind="beforeRadioAttrs">区间</ElRadio>
        <span> 从 </span>
        <ElInputNumber v-model:value="valueRange.start" v-bind="typeRangeAttrs" />
        <span> 日 至 </span>
        <ElInputNumber v-model:value="valueRange.end" v-bind="typeRangeAttrs" />
        <span> 日 </span>
      </div>
      <div class="item">
        <ElRadio :value="TypeEnum.loop" v-bind="beforeRadioAttrs">循环</ElRadio>
        <span> 从 </span>
        <ElInputNumber v-model:value="valueLoop.start" v-bind="typeLoopAttrs" />
        <span> 日开始，间隔 </span>
        <ElInputNumber v-model:value="valueLoop.interval" v-bind="typeLoopAttrs" />
        <span> 日 </span>
      </div>
      <!--       工作日暂不支持，会报错，先隐藏了 -->
      <!--      <div class="item">-->
      <!--        <Radio :value="TypeEnum.work" v-bind="beforeRadioAttrs">工作日</Radio>-->
      <!--        <span> 本月 </span>-->
      <!--        <InputNumber v-model:value="valueWork" v-bind="typeWorkAttrs" />-->
      <!--        <span> 日，最近的工作日 </span>-->
      <!--      </div>-->
      <div class="item">
        <Radio :value="TypeEnum.last" v-bind="beforeRadioAttrs">最后一日</Radio>
      </div>
      <div class="item">
        <Radio :value="TypeEnum.specify" v-bind="beforeRadioAttrs">指定</Radio>
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
import { computed, defineComponent, watch } from 'vue';
import { ElInputNumber, ElRadio, ElRadioGroup, ElCheckbox, ElCheckboxGroup } from 'element-plus';
import { TypeEnum, useTabEmits, useTabProps, useTabSetup } from './useTabMixin';

export default defineComponent({
  name: 'DayUI',
  components: { ElInputNumber, ElRadio, ElRadioGroup, ElCheckbox, ElCheckboxGroup },
  props: useTabProps({
    defaultValue: '*',
    props: {
      week: { type: String, default: '?' },
    },
  }),
  emits: useTabEmits(),
  setup(props, context) {
    const disabledChoice = computed(() => {
      return (props.week && props.week !== '?') || props.disabled;
    });
    const setup = useTabSetup(props, context, {
      defaultValue: '*',
      valueWork: 1,
      minValue: 1,
      maxValue: 31,
      valueRange: { start: 1, end: 31 },
      valueLoop: { start: 1, interval: 1 },
      disabled: disabledChoice,
    });
    const typeWorkAttrs = computed(() => ({
      disabled: setup.type.value !== TypeEnum.work || props.disabled || disabledChoice.value,
      ...setup.inputNumberAttrs.value,
    }));

    watch(
      () => props.week,
      () => {
        setup.updateValue(disabledChoice.value ? '?' : setup.computeValue.value);
      },
    );

    return { ...setup, typeWorkAttrs };
  },
});
</script>
