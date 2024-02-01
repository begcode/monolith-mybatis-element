<template>
  <ElTreeSelect v-bind="attrs" v-model="selectValue" @check="emitCheck" ref="treeSelect" />
</template>
<script lang="ts" setup>
import { PropType, unref, useAttrs, ref } from 'vue';
import { ElTreeSelect } from 'element-plus';
import { isArray } from 'lodash-es';

defineOptions({ name: 'TreeSelectLableIn', inheritAttrs: false });

const props = defineProps({
  labelInValue: {
    type: Boolean,
    default: true,
  },
  modelValue: {
    type: [Array, Object, String, Number] as PropType<any>,
  },
});

const emit = defineEmits(['change', 'update:modelValue']);

const attrs = useAttrs();

const treeSelectRef = ref<any>(null);

const getValue = () => {
  const value = unref(props.modelValue);
  if (!value) {
    if (attrs.multiple) {
      return [];
    } else {
      return null;
    }
  }
  const selectProps = attrs['props'];
  const labelField = selectProps?.['label'] || 'label';
  if (isArray(value)) {
    return value.map(item => {
      item.label = item[labelField];
      return item;
    });
  } else {
    value.label = value[labelField];
    return value;
  }
};

const selectValue = ref(null);

selectValue.value = getValue();

const emitCheck = (_data, { checkedNodes }) => {
  const valueKey = (attrs.valueKey || 'value') as string;
  const labelKey = (attrs?.props?.label || 'label') as string;
  const dataValue = checkedNodes.map(item => {
    return {
      [labelKey]: item[labelKey],
      [valueKey]: item[valueKey],
    };
  });
  emit('update:modelValue', unref(dataValue));
  emit('change', unref(dataValue));
};
</script>
