<template>
  <div :class="`${prefixCls}`">
    <ElInput :placeholder="placeholder" v-model:value="editCronValue" :disabled="disabled">
      <template #addonAfter>
        <a class="open-btn" :disabled="disabled ? 'disabled' : null" @click="showConfigModal">
          <Icon icon="ant-design:setting-outlined" />
          <span>选择</span>
        </a>
      </template>
    </ElInput>
    <EasyCronModal
      v-model:value="editCronValue"
      :exeStartTime="exeStartTime"
      :hideYear="hideYear"
      :remote="remote"
      :hideSecond="hideSecond"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { ElInput } from 'element-plus';
import { useDesign } from '@/hooks/web/useDesign';
import { propTypes } from '@/utils/propTypes';
import { Icon } from '@/components/Icon';
import EasyCronModal from './EasyCronModal.vue';
import { cronEmits, cronProps } from './easy.cron.data';

const { prefixCls } = useDesign('easy-cron-input');
const emit = defineEmits([...cronEmits]);
const props = defineProps({
  ...cronProps,
  placeholder: propTypes.string.def('请输入cron表达式'),
  exeStartTime: propTypes.oneOfType([propTypes.number, propTypes.string, propTypes.object]).def(0),
});
const editCronValue = ref(props.value);

watch(
  () => props.value,
  newVal => {
    if (newVal !== editCronValue.value) {
      editCronValue.value = newVal;
    }
  },
);
watch(editCronValue, newVal => {
  emit('change', newVal);
  emit('update:value', newVal);
});

function showConfigModal() {
  if (!props.disabled) {
    // openModal();
  }
}
</script>

<style>
.vben-easy-cron-input a.open-btn {
  cursor: pointer;
}
.vben-easy-cron-input a.open-btn .app-iconify {
  position: relative;
  top: 1px;
  right: 2px;
}
</style>
