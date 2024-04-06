import { createEditRender, createFilterRender, createFormItemRender, createDefaultFilterRender, createDefaultRender } from './common';

export default {
  autofocus: 'input.el-input__inner',
  renderDefault: createDefaultRender(),
  renderEdit: createEditRender(),
  renderFilter: createFilterRender(),
  defaultFilterMethod: createDefaultFilterRender(),
  renderItemContent: createFormItemRender(),
};
