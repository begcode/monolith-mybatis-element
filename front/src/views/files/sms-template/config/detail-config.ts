import { DescItem } from '@begcode/components';
import { h } from 'vue';
import { ElSwitch } from 'element-plus';
import { useI18n } from '@/hooks/web/useI18n';

// begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！

const fields: DescItem[] = [
  {
    label: 'ID',
    field: 'id',
    hidden: false,
  },
  {
    label: '模板标题',
    field: 'name',
    hidden: false,
  },
  {
    label: '模板CODE',
    field: 'code',
    hidden: false,
  },
  {
    label: '通知类型',
    field: 'sendType',
    hidden: false,
    format: (value, _data) => {
      const { getEnumDict } = useI18n();
      return getEnumDict('MessageSendType').find(item => item.value === value) || value;
    },
  },
  {
    label: '模板内容',
    field: 'content',
    hidden: false,
  },
  {
    label: '模板测试json',
    field: 'testJson',
    hidden: false,
  },
  {
    label: '模板类型',
    field: 'type',
    hidden: false,
    format: (value, _data) => {
      const { getEnumDict } = useI18n();
      return getEnumDict('SmsTemplateType').find(item => item.value === value) || value;
    },
  },
  {
    label: '备注',
    field: 'remark',
    hidden: false,
  },
  {
    label: '启用',
    field: 'enabled',
    hidden: false,
    render: (value, data) =>
      h(ElSwitch, {
        disabled: true,
        checked: value,
        onChange: checked => {
          data.enabled = checked;
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
    label: '短信服务商',
    field: 'supplierSignName',
  },
];

export default {
  fields,
};
