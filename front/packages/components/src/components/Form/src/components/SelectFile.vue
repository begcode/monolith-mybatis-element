<template>
  <div class="clearfix">
    <ElUpload
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :custom-request="requestMethod"
      :auto-upload="false"
    >
      <ElButton>
        <Icon icon="ep:upload" />
        选择文件
      </ElButton>
    </ElUpload>
    <Dialog v-model="previewOpen" :footer="null" @cancel="handleCancel()">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </Dialog>
  </div>
</template>
<script lang="ts" setup>
import type { UploadProps } from 'element-plus';
import { ref } from 'vue';
import { Dialog } from '@/components/Dialog';
import { Icon } from '@/components/Icon';
import { ElUpload, ElButton } from 'element-plus';

defineOptions({
  name: 'SelectFile',
});

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue', 'select', 'change']);

const fileList = ref<UploadProps['fileList']>([]);
if (props.modelValue) {
  fileList.value.push({ url: props.modelValue, name: props.modelValue, status: 'done' });
}
const uploading = ref<boolean>(false);
//预览图
const previewImage = ref<string | undefined>('');
//预览框状态
const previewOpen = ref<boolean>(false);

const handleRemove: UploadProps['onRemove'] = file => {
  const index = fileList.value.indexOf(file);
  const newFileList = fileList.value.slice();
  newFileList.splice(index, 1);
  fileList.value = newFileList;
  emit('update:modelValue', fileList.value[0]);
};

const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  emit('change', uploadFile);
};

const beforeUpload: UploadProps['beforeUpload'] = (file: UploadRawFile) => {
  fileList.value = [...fileList.value, file];
  emit('select', file);
  return false;
};

const requestMethod: UploadProps['customRequest'] = ({ file, onSuccess }) => {
  console.log('requestMethod', file);
};
</script>
<style scoped>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
