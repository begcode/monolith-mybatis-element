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
    label: '分类名称',
    field: 'categoryName',
    hidden: false,
  },
  {
    label: '分类Key',
    field: 'categoryKey',
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
    label: '创建者Id',
    field: 'createdBy',
    hidden: false,
  },
  {
    label: '创建时间',
    field: 'createdDate',
    hidden: false,
  },
  {
    label: '修改者Id',
    field: 'lastModifiedBy',
    hidden: false,
  },
  {
    label: '修改时间',
    field: 'lastModifiedDate',
    hidden: false,
  },
  {
    label: '配置项列表',
    field: 'items',
    render: (value, _data) => h(resolveComponent('vxe-grid'), { disabled: true, data: value, columns: {} }),
  },
];

export default {
  fields,
};
