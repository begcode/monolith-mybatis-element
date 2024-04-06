import { createEditRender, createDefaultRender, createFilterRender, createDefaultFilterRender, createFormItemRender } from './common';

export default {
  autofocus: 'input.el-input__inner',
  renderDefault: createDefaultRender(),
  renderEdit: createEditRender(),
  renderFilter: createFilterRender(),
  defaultFilterMethod: createDefaultFilterRender(),
  renderItemContent: createFormItemRender(),
};
