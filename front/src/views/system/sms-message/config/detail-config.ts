import { DescItem } from '@begcode/components';
import { useI18n } from '@/hooks/web/useI18n';

// begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！

const fields: DescItem[] = [
  {
    label: 'ID',
    field: 'id',
    hidden: false,
  },
  {
    label: '消息标题',
    field: 'title',
    hidden: false,
  },
  {
    label: '发送方式',
    field: 'sendType',
    hidden: false,
    format: (value, _data) => {
      const { getEnumDict } = useI18n();
      return getEnumDict('MessageSendType').find(item => item.value === value) || value;
    },
  },
  {
    label: '接收人',
    field: 'receiver',
    hidden: false,
  },
  {
    label: '发送所需参数',
    field: 'params',
    hidden: false,
  },
  {
    label: '推送内容',
    field: 'content',
    hidden: false,
  },
  {
    label: '推送时间',
    field: 'sendTime',
    hidden: false,
  },
  {
    label: '推送状态',
    field: 'sendStatus',
    hidden: false,
    format: (value, _data) => {
      const { getEnumDict } = useI18n();
      return getEnumDict('SendStatus').find(item => item.value === value) || value;
    },
  },
  {
    label: '发送次数 超过5次不再发送',
    field: 'retryNum',
    hidden: false,
  },
  {
    label: '推送失败原因',
    field: 'failResult',
    hidden: false,
  },
  {
    label: '备注',
    field: 'remark',
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
