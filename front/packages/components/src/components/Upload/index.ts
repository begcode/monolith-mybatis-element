import basicUpload from './src/BasicUpload.vue';
import uploadImage from './src/components/ImageUpload.vue';
import { withInstall } from '@/utils';

export const BasicUpload = withInstall(basicUpload);
export const ImageUpload = withInstall(uploadImage);
