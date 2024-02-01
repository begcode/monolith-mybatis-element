import { VXETableCore, VxeGlobalInterceptorHandles } from 'vxe-table';
import EAutocomplete from './EAutocomplete';
import EInput from './EInput';
import EInputNumber from './EInputNumber';
import ESelect from './ESelect';
import ECascader from './ECascader';
import EDatePicker from './EDatePicker';
import EMonthPicker from './EMonthPicker';
import ERangePicker from './ERangePicker';
import EWeekPicker from './EWeekPicker';
import ETreeSelect from './ETreeSelect';
import ETimePicker from './ETimePicker';
import ERate from './ERate';
import ESwitch from './ESwitch';
import ERadioGroup from './ERadioGroup';
import ECheckboxGroup from './ECheckboxGroup';
import EButton from './EButton';
import EButtonGroup from './EButtonGroup';
import EEmpty from './EEmpty';
import EYearPicker from './EYearPicker';
import EIcon from './EIcon';
import EIconPicker from './EIconPicker';
import EAvatar from './EAvatar';
import EImage from './EImage';
import ESelectModal from './ESelectModal';
import EDragSort from './EDragSort';

/**
 * 检查触发源是否属于目标节点
 */
function getEventTargetNode(evnt: any, container: HTMLElement, className: string) {
  let targetElem;
  let target = evnt.target;
  while (target && target.nodeType && target !== document) {
    if (className && target.className && target.className.split && target.className.split(' ').indexOf(className) > -1) {
      targetElem = target;
    } else if (target === container) {
      return { flag: className ? !!targetElem : true, container, targetElem: targetElem };
    }
    target = target.parentNode;
  }
  return { flag: false };
}

/**
 * 事件兼容性处理
 */
function handleClearEvent(
  params:
    | VxeGlobalInterceptorHandles.InterceptorClearFilterParams
    | VxeGlobalInterceptorHandles.InterceptorClearActivedParams
    | VxeGlobalInterceptorHandles.InterceptorClearAreasParams,
) {
  const { $event } = params;
  const bodyElem = document.body;
  if (
    // 远程搜索
    getEventTargetNode($event, bodyElem, 'el-autocomplete-suggestion').flag ||
    // 下拉框
    getEventTargetNode($event, bodyElem, 'el-select-dropdown').flag ||
    // 级联
    getEventTargetNode($event, bodyElem, 'el-cascader__dropdown').flag ||
    getEventTargetNode($event, bodyElem, 'el-cascader-menus').flag ||
    // 日期
    getEventTargetNode($event, bodyElem, 'el-time-panel').flag ||
    getEventTargetNode($event, bodyElem, 'el-picker-panel').flag ||
    // 颜色
    getEventTargetNode($event, bodyElem, 'el-color-dropdown').flag
  ) {
    return false;
  }
}

/**
 * 基于 vxe-table 表格的适配插件，用于兼容 ant-design-vue 组件库
 */
export const VXETablePluginElement = {
  install(vxetablecore: VXETableCore) {
    const { interceptor, renderer } = vxetablecore;

    renderer.mixin({
      EAutocomplete,
      EInput,
      EInputNumber,
      ESelect,
      ECascader,
      EDatePicker,
      EMonthPicker,
      ERangePicker,
      EWeekPicker,
      ETimePicker,
      ETreeSelect,
      ERate,
      ESwitch,
      ERadioGroup,
      ECheckboxGroup,
      EButton,
      EButtonGroup,
      EEmpty,
      EYearPicker,
      EIcon,
      EIconPicker,
      EAvatar,
      EImage,
      ESelectModal,
      EDragSort,
    });

    interceptor.add('event.clearFilter', handleClearEvent);
    interceptor.add('event.clearActived', handleClearEvent);
    interceptor.add('event.clearAreas', handleClearEvent);
  },
};

if (typeof window !== 'undefined' && window.VXETable && window.VXETable.use) {
  window.VXETable.use(VXETablePluginElement);
}

export default VXETablePluginElement;
