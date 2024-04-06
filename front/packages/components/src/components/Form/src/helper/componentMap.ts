import type { Component } from 'vue';
import {
  ElCascader,
  ElCheckboxGroup,
  ElColorPicker,
  ElDatePicker,
  ElInput,
  ElInputNumber,
  ElRadioGroup,
  ElRate,
  ElSelect,
  ElSelectV2,
  ElSlider,
  ElSwitch,
  ElTimePicker,
  ElTimeSelect,
  ElTransfer,
  ElAutocomplete,
  ElDivider,
  ElTreeSelect,
  ElUpload,
} from 'element-plus';
import { ComponentName } from '../types';
import TreeSelectLabelIn from '../components/TreeSelectLabelIn.vue';
import SelectFile from '../components/SelectFile.vue';
import { InputPassword } from '@/components/InputPassword';
import { Editor } from '@/components/Editor';
import { CodeEditor } from '@/components/CodeEditor';
import { IconPicker } from '@/components/IconPicker';
import { ImageUpload } from '@/components/Upload';
import type { Recordable } from '#/global.d';

const componentMap: Recordable<Component, ComponentName> = {
  RadioGroup: ElRadioGroup,
  RadioButton: ElRadioGroup,
  CheckboxGroup: ElCheckboxGroup,
  CheckboxButton: ElCheckboxGroup,
  Input: ElInput,
  Autocomplete: ElAutocomplete,
  InputNumber: ElInputNumber,
  Select: ElSelect,
  Cascader: ElCascader,
  Switch: ElSwitch,
  Slider: ElSlider,
  TimePicker: ElTimePicker,
  DatePicker: ElDatePicker,
  Rate: ElRate,
  ColorPicker: ElColorPicker,
  Transfer: ElTransfer,
  Divider: ElDivider,
  TimeSelect: ElTimeSelect,
  SelectV2: ElSelectV2,
  InputPassword: InputPassword,
  Editor: Editor,
  TreeSelect: ElTreeSelect,
  Upload: ElUpload,
  IconPicker: IconPicker,
  TreeSelectLabelIn: TreeSelectLabelIn,
  CodeEditor: CodeEditor,
  SelectFile: SelectFile,
  ImageUpload: ImageUpload,
};

export { componentMap };
