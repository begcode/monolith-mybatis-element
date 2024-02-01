<script lang="ts" setup>
import { useIcon } from '@/hooks/web/useIcon';
import { propTypes } from '@/utils/propTypes';
import { useI18n } from '@/hooks/web/useI18nOut';

const { t } = useI18n();

defineProps({
  showSearch: propTypes.bool.def(true),
  showReset: propTypes.bool.def(true),
  showExpand: propTypes.bool.def(false),
  visible: propTypes.bool.def(true),
  searchLoading: propTypes.bool.def(false),
  resetLoading: propTypes.bool.def(false),
});

const emit = defineEmits(['search', 'reset', 'expand']);

const onSearch = () => {
  emit('search');
};

const onReset = () => {
  emit('reset');
};

const onExpand = visible => {
  emit('expand', visible);
};
</script>

<template>
  <BaseButton v-if="showSearch" type="primary" :loading="searchLoading" :icon="useIcon({ icon: 'ep:search' })" @click="onSearch">
    {{ t('common.query') }}
  </BaseButton>
  <BaseButton v-if="showReset" :loading="resetLoading" :icon="useIcon({ icon: 'ep:refresh-right' })" @click="onReset">
    {{ t('common.reset') }}
  </BaseButton>
  <BaseButton
    v-if="showExpand"
    :icon="useIcon({ icon: visible ? 'ep:arrow-down' : 'ep:arrow-up' })"
    text
    @click="onExpand(!visible)"
    style="margin-left: 0"
  >
    {{ t(visible ? 'common.shrink' : 'common.expand') }}
  </BaseButton>
</template>
