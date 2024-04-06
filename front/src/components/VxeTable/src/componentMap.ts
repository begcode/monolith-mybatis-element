import type { Component } from 'vue';

import {
  ElInput,
  ElSelect,
  ElRadio,
  ElCheckbox,
  ElAutocomplete,
  ElCascader,
  ElDatePicker,
  ElInputNumber,
  ElSwitch,
  ElTimePicker,
  ElTreeSelect,
  ElRate,
  ElEmpty,
  ElAvatar,
} from 'element-plus';
import { BaseButton, IconPicker, Icon, SelectModal, DragSort } from '@begcode/components';
import type { ComponentType } from './componentType';

const componentMap = new Map<ComponentType, Component>();

componentMap.set('EButton', BaseButton);

componentMap.set('EInput', ElInput);
componentMap.set('EInputNumber', ElInputNumber);
componentMap.set('EAutocomplete', ElAutocomplete);

componentMap.set('ESelect', ElSelect);
componentMap.set('ETreeSelect', ElTreeSelect);
componentMap.set('ESwitch', ElSwitch);
componentMap.set('ERadioGroup', ElRadio.Group);
componentMap.set('ECheckboxGroup', ElCheckbox.Group);
componentMap.set('ECascader', ElCascader);
componentMap.set('ERate', ElRate);

componentMap.set('EDatePicker', ElDatePicker);
componentMap.set('EMonthPicker', ElDatePicker.MonthPicker);
componentMap.set('ERangePicker', ElDatePicker.RangePicker);
componentMap.set('EWeekPicker', ElDatePicker.WeekPicker);
componentMap.set('EYearPicker', ElDatePicker.YearPicker);
componentMap.set('ETimePicker', ElTimePicker);

componentMap.set('EIconPicker', IconPicker);
componentMap.set('EIcon', Icon);
componentMap.set('EAvatar', ElAvatar);
componentMap.set('EImage', Image);

componentMap.set('EEmpty', ElEmpty);
componentMap.set('ESelectModal', SelectModal);
componentMap.set('EDragSort', DragSort);

export function add(compName: ComponentType, component: Component) {
  componentMap.set(compName, component);
}

export function del(compName: ComponentType) {
  componentMap.delete(compName);
}

export { componentMap };
