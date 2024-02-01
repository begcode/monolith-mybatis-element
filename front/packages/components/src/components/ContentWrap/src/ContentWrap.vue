<script setup lang="ts">
import { ElCard, ElTooltip, ElRow, ElCol } from 'element-plus';
import { propTypes } from '@/utils/propTypes';
import { useDesign } from '@/hooks/web/useDesign';

const { getPrefixCls } = useDesign();

const prefixCls = getPrefixCls('content-wrap');

defineProps({
  title: propTypes.string.def(''),
  message: propTypes.string.def(''),
});
</script>

<template>
  <ElCard :class="[prefixCls]" shadow="never">
    <template v-if="title" #header>
      <div class="flex items-center">
        <span class="text-16px font-700">{{ title }}</span>
        <ElTooltip v-if="message" effect="dark" placement="right">
          <template #content>
            <div class="max-w-200px">{{ message }}</div>
          </template>
          <Icon class="ml-5px" icon="bi:question-circle-fill" :size="14" />
        </ElTooltip>
        <div class="flex pl-20px flex-grow">
          <slot name="header"></slot>
        </div>
      </div>
    </template>
    <div>
      <slot></slot>
    </div>
    <ElRow justify="space-between">
      <ElCol :span="8">
        <ElRow justify="start">
          <ElCol :span="24"><slot name="leftFooter"></slot></ElCol>
        </ElRow>
      </ElCol>
      <ElCol :span="8">
        <ElRow justify="center">
          <ElCol :span="24"><slot name="centerFooter"></slot></ElCol>
        </ElRow>
      </ElCol>
      <ElCol :span="8">
        <ElRow justify="end">
          <ElCol :span="24"><slot name="rightFooter"></slot></ElCol>
        </ElRow>
      </ElCol>
    </ElRow>
  </ElCard>
</template>
