import { getDatePickerCellValue } from './EDatePicker';
import { createEditRender, createCellRender, createFormItemRender, createExportMethod } from './common';

export default {
  renderEdit: createEditRender(),
  renderCell: createCellRender(getDatePickerCellValue, () => {
    return ['YYYY'];
  }),
  renderItemContent: createFormItemRender(),
  exportMethod: createExportMethod(getDatePickerCellValue, () => {
    return ['YYYY'];
  }),
};
