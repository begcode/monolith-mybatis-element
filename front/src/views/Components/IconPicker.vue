<script lang="ts" setup>
import { ref } from 'vue';
import { IconPicker, ContentWrap } from '@begcode/components';
import { useI18n } from '@/hooks/web/useI18n';

const { t } = useI18n();

const currentIcon = ref('');
</script>

<template>
  <ContentWrap :title="t('router.iconPicker')">
    <IconPicker v-model="currentIcon" />
  </ContentWrap>
</template>
