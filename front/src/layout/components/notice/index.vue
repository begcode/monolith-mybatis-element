<script setup lang="ts">
import { ref } from 'vue';
import { ElDropdown, ElBadge, ElDropdownMenu, ElTabs, ElTabPane, ElScrollbar } from 'element-plus';
import { Icon } from '@begcode/components';
import { noticesData } from './data';
import NoticeList from './noticeList.vue';

const noticesNum = ref(0);
const notices = ref(noticesData);
const activeKey = ref(noticesData[0].key);

notices.value.map(v => (noticesNum.value += v.list.length));
</script>

<template>
  <ElDropdown trigger="click" placement="bottom-end">
    <span class="dropdown-badge navbar-bg-hover select-none">
      <ElBadge :value="noticesNum" :max="99">
        <span class="header-notice-icon">
          <Icon icon="ep:bell" />
        </span>
      </ElBadge>
    </span>
    <template #dropdown>
      <ElDropdownMenu>
        <ElTabs :stretch="true" v-model="activeKey" class="dropdown-tabs">
          <template v-for="item in notices" :key="item.key">
            <ElTabPane :label="`${item.name}(${item.list.length})`" :name="`${item.key}`">
              <ElScrollbar max-height="330px">
                <div class="noticeList-container">
                  <NoticeList :list="item.list" />
                </div>
              </ElScrollbar>
            </ElTabPane>
          </template>
        </ElTabs>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<style lang="scss" scoped>
.dropdown-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 60px;
  cursor: pointer;

  .header-notice-icon {
    font-size: 18px;
  }
}

.dropdown-tabs {
  width: 330px;

  .noticeList-container {
    padding: 15px 24px 0 24px;
  }

  :deep(.el-tabs__header) {
    margin: 0;
  }

  :deep(.el-tabs__nav-wrap)::after {
    height: 1px;
  }

  :deep(.el-tabs__nav-wrap) {
    padding: 0 36px 0 36px;
  }
}
</style>
