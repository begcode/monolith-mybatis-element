import type { App } from 'vue';
import { ElButton, ElSpace, ElCard, ElDivider, ElTree, ElCol, ElRow, ElInput, ElMenuItem, ElMenu, ElDropdown } from 'element-plus';
import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css';
import { BaseButton, VXETablePluginElement, Icon } from '@begcode/components';
import { Permission } from './Permission';

export const setupGlobCom = (app: App<Element>): void => {
  app.component('Icon', Icon);
  app.component('Permission', Permission);
  app.component('BaseButton', BaseButton);
  app.component('el-button', ElButton);
  app.component('el-space', ElSpace);
  app.component('el-card', ElCard);
  app.component('el-divider', ElDivider);
  app.component('el-tree', ElTree);
  app.component('el-col', ElCol);
  app.component('el-row', ElRow);
  app.component('el-input', ElInput);
  app.component('el-menu-item', ElMenuItem);
  app.component('el-menu', ElMenu);
  app.component('el-dropdown', ElDropdown);
  VXETable.use(VXETablePluginElement);
  app.use(VXETable);
};
