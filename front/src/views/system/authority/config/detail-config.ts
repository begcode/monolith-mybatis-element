import { DescItem } from '@begcode/components';
import { h } from 'vue';
import { ElSwitch, ElSelect } from 'element-plus';

// begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！

const fields: DescItem[] = [
  {
    label: 'ID',
    field: 'id',
    hidden: false,
  },
  {
    label: '角色名称',
    field: 'name',
    hidden: false,
  },
  {
    label: '角色代号',
    field: 'code',
    hidden: false,
  },
  {
    label: '信息',
    field: 'info',
    hidden: false,
  },
  {
    label: '排序',
    field: 'order',
    hidden: false,
  },
  {
    label: '展示',
    field: 'display',
    hidden: false,
    render: (value, data) =>
      h(ElSwitch, {
        disabled: true,
        checked: value,
        onChange: checked => {
          data.display = checked;
        },
      }),
  },
  {
    label: '菜单列表',
    field: 'viewPermissions',
    render: value =>
      h(ElSelect, {
        disabled: true,
        labelInValue: true,
        mode: 'multiple',
        fieldNames: { label: 'id', value: 'text' },
        value: (value || []).map(item => ({ value: item.id, label: item.text })),
      }),
  },
  {
    label: 'Api权限列表',
    field: 'apiPermissions',
    render: value =>
      h(ElSelect, {
        disabled: true,
        labelInValue: true,
        mode: 'multiple',
        fieldNames: { label: 'id', value: 'name' },
        value: (value || []).map(item => ({ value: item.id, label: item.name })),
      }),
  },
  {
    label: '上级',
    field: 'parentName',
  },
];

export default {
  fields,
};
