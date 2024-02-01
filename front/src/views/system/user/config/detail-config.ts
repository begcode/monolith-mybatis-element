import { DescItem } from '@begcode/components';
import { h } from 'vue';
import { ElSwitch, ElSelect } from 'element-plus';

// begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！

const fields: DescItem[] = [
  {
    label: '用户ID',
    field: 'id',
    hidden: false,
  },
  {
    label: '账户名',
    field: 'login',
    hidden: false,
  },
  {
    label: '密码',
    field: 'password',
    hidden: false,
  },
  {
    label: '名字',
    field: 'firstName',
    hidden: false,
  },
  {
    label: '姓氏',
    field: 'lastName',
    hidden: false,
  },
  {
    label: '电子邮箱',
    field: 'email',
    hidden: false,
  },
  {
    label: '手机号码',
    field: 'mobile',
    hidden: false,
  },
  {
    label: '出生日期',
    field: 'birthday',
    hidden: false,
  },
  {
    label: '激活状态',
    field: 'activated',
    hidden: false,
    render: (value, data) =>
      h(ElSwitch, {
        disabled: true,
        checked: value,
        onChange: checked => {
          data.activated = checked;
        },
      }),
  },
  {
    label: '语言Key',
    field: 'langKey',
    hidden: false,
  },
  {
    label: '头像地址',
    field: 'imageUrl',
    hidden: false,
    render: (value, data) => h('img', { src: value, style: 'width: 100px; height: 100px; object-fit: cover; border-radius: 50%;' }),
  },
  {
    label: '激活Key',
    field: 'activationKey',
    hidden: false,
  },
  {
    label: '重置码',
    field: 'resetKey',
    hidden: false,
  },
  {
    label: '重置时间',
    field: 'resetDate',
    hidden: false,
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
    label: '部门',
    field: 'departmentName',
  },
  {
    label: '岗位',
    field: 'positionName',
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
];

export default {
  fields,
};
