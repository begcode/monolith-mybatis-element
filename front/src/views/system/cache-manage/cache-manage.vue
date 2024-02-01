<template>
  <ElCard :bordered="false">
    <ElTable :data="data" rowKey="name">
      <ElTableColumn prop="name" label="缓存名称"></ElTableColumn>
      <ElTableColumn prop="action" label="操作" width="100px">
        <template #default="scope">
          <ElButton type="primary" @click="clear(scope.row.name)"> 清除 </ElButton>
        </template>
      </ElTableColumn>
    </ElTable>
  </ElCard>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { ElCard, ElTable, ElButton, ElMessage, ElTableColumn } from 'element-plus';
import apiService from '@/api';

const data = ref<any[]>([]);

function getAll() {
  apiService.system.cacheManagerService.getAll().then(res => {
    res.forEach(cacheName => data.value.push({ name: cacheName }));
  });
}

function clear(cacheName) {
  apiService.system.cacheManagerService.clear(cacheName).then(res => {
    ElMessage.success('清除缓存成功。');
  });
}

onMounted(() => {
  getAll();
});
</script>
