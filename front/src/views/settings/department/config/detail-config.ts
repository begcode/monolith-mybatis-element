import { DescItem } from '@begcode/components';
import { h } from 'vue';
import { ElSelect } from 'element-plus';

// begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！

const fields: DescItem[] = [
  {
    label: 'ID',
    field: 'id',
    hidden: false,
  },
  {
    label: '名称',
    field: 'name',
    hidden: false,
  },
  {
    label: '代码',
    field: 'code',
    hidden: false,
  },
  {
    label: '地址',
    field: 'address',
    hidden: false,
  },
  {
    label: '联系电话',
    field: 'phoneNum',
    hidden: false,
  },
  {
    label: 'logo地址',
    field: 'logo',
    hidden: false,
    render: (value, data) => h('img', { src: value, style: 'width: 100px; height: 100px; object-fit: cover; border-radius: 50%;' }),
  },
  {
    label: '联系人',
    field: 'contact',
    hidden: false,
  },
  {
    label: '创建用户 Id',
    field: 'createUserId',
    hidden: false,
  },
  {
    label: '创建时间',
    field: 'createTime',
    hidden: false,
  },
  {
    label: '角色列表',
    field: 'authorities',
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
