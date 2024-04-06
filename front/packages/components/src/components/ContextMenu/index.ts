import { ElDropdown } from 'element-plus';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import ContextMenu from './src/ContextMenu.vue';

export type { ContextMenuSchema } from './src/types';
import type { ComponentRef } from '#/global.d';

export interface ContextMenuExpose {
  elDropdownMenuRef: ComponentRef<typeof ElDropdown>;
  tagItem: RouteLocationNormalizedLoaded;
}

export { ContextMenu };
