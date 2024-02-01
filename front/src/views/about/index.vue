<script setup lang="ts">
import { ElDescriptions, ElDescriptionsItem, ElCard } from 'element-plus';
import { Descriptions } from '@begcode/components';
import { useColumns } from './columns';
export interface schemaItem {
  field: string;
  label: string;
}

defineOptions({
  name: 'About',
});

const { pkg } = __APP_INFO__;
const { dependencies, devDependencies } = pkg;

const schema: schemaItem[] = [];
const devSchema: schemaItem[] = [];

const { columns } = useColumns();

Object.keys(dependencies).forEach(key => {
  schema.push({ field: dependencies[key], label: key });
});

Object.keys(devDependencies).forEach(key => {
  devSchema.push({ field: devDependencies[key], label: key });
});
</script>

<template>
  <div>
    <ElCard class="box-card mb-4" shadow="never">
      <template #header>
        <div class="card-header">
          <span class="font-medium">关于</span>
        </div>
      </template>
      <span style="font-size: 15px">
        BegCode Element Plus Admin 是一个基于Vue3、Vite4、TypeScript、Element-Plus
        的中后台解决方案，它可以帮助您快速搭建企业级中后台，提供现成的开箱解决方案。
      </span>
    </ElCard>

    <ElCard class="box-card mb-4" shadow="never">
      <template #header>
        <div class="card-header">
          <span class="font-medium">项目信息</span>
        </div>
      </template>
      <Descriptions :schema="columns" border :column="3" align="middle" />
    </ElCard>

    <ElCard class="box-card mb-4" shadow="never">
      <template #header>
        <div class="card-header">
          <span class="font-medium">生产环境依赖</span>
        </div>
      </template>
      <ElDescriptions border>
        <ElDescriptionsItem :label="item.label" label-align="left" align="left" v-for="(item, index) in schema" :key="index">
          <a :href="'https://www.npmjs.com/package/' + item.label" target="_blank">
            <span style="color: var(--el-color-primary)">{{ item.field }}</span>
          </a>
        </ElDescriptionsItem>
      </ElDescriptions>
    </ElCard>

    <ElCard class="box-card mb-4" shadow="never">
      <template #header>
        <div class="card-header">
          <span class="font-medium">开发环境依赖</span>
        </div>
      </template>
      <ElDescriptions border>
        <ElDescriptionsItem :label="item.label" label-align="left" align="left" v-for="(item, index) in devSchema" :key="index">
          <a :href="'https://www.npmjs.com/package/' + item.label" target="_blank">
            <span style="color: var(--el-color-primary)">{{ item.field }}</span>
          </a>
        </ElDescriptionsItem>
      </ElDescriptions>
    </ElCard>
  </div>
</template>

<style lang="scss" scoped>
.main-content {
  margin: 0 !important;
}
</style>
