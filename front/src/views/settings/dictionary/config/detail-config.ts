import { DescItem } from '@begcode/components';
import { h, resolveComponent } from 'vue';
import { ElSwitch } from 'element-plus';

// begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！

const fields: DescItem[] = [
  {
    label: 'ID',
    field: 'id',
    hidden: false,
  },
  {
    label: '字典名称',
    field: 'dictName',
    hidden: false,
  },
  {
    label: '字典Key',
    field: 'dictKey',
    hidden: false,
  },
  {
    label: '是否禁用',
    field: 'disabled',
    hidden: false,
    render: (value, data) =>
      h(ElSwitch, {
        disabled: true,
        checked: value,
        onChange: checked => {
          data.disabled = checked;
        },
      }),
  },
  {
    label: '排序',
    field: 'sortValue',
    hidden: false,
  },
  {
    label: '是否内置',
    field: 'builtIn',
    hidden: false,
    render: (value, data) =>
      h(ElSwitch, {
        disabled: true,
        checked: value,
        onChange: checked => {
          data.builtIn = checked;
        },
      }),
  },
  {
    label: '更新枚举',
    field: 'syncEnum',
    hidden: false,
    render: (value, data) =>
      h(ElSwitch, {
        disabled: true,
        checked: value,
        onChange: checked => {
          data.syncEnum = checked;
        },
      }),
  },
  {
    label: '字典项列表',
    field: 'items',
    render: (value, _data) => h(resolveComponent('vxe-grid'), { disabled: true, data: value, columns: {} }),
  },
];

export default {
  fields,
};
