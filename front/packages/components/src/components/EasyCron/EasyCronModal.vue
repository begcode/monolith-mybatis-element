<template>
  <Dialog title="Cron表达式" width="800px">
    <EasyCron v-bind="attrs" />
  </Dialog>
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue';

import EasyCron from './EasyCronInner.vue';
import { Dialog } from '@/components/Dialog';

defineOptions({
  name: 'EasyCronModal',
  inheritAttrs: false,
});
const attrs = useAttrs();
</script>
