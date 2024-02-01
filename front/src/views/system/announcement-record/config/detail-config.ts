import { DescItem } from '@begcode/components';
import { h } from 'vue';
import { ElSwitch } from 'element-plus';

// begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！

const fields: DescItem[] = [
  {
    label: 'ID',
    field: 'id',
    hidden: false,
  },
  {
    label: '通告ID',
    field: 'anntId',
    hidden: false,
  },
  {
    label: '用户id',
    field: 'userId',
    hidden: false,
  },
  {
    label: '是否已读',
    field: 'hasRead',
    hidden: false,
    render: (value, data) =>
      h(ElSwitch, {
        disabled: true,
        checked: value,
        onChange: checked => {
          data.hasRead = checked;
        },
      }),
  },
  {
    label: '阅读时间',
    field: 'readTime',
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
];

export default {
  fields,
};
