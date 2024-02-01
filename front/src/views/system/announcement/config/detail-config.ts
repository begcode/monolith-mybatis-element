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
    label: '标题',
    field: 'title',
    hidden: false,
  },
  {
    label: '摘要',
    field: 'summary',
    hidden: false,
  },
  {
    label: '内容',
    field: 'content',
    hidden: false,
  },
  {
    label: '开始时间',
    field: 'startTime',
    hidden: false,
  },
  {
    label: '结束时间',
    field: 'endTime',
    hidden: false,
  },
  {
    label: '发布人Id',
    field: 'senderId',
    hidden: false,
  },
  {
    label: '优先级',
    field: 'priority',
    hidden: false,
    format: (value, _data) => {
      const { getEnumDict } = useI18n();
      return getEnumDict('PriorityLevel').find(item => item.value === value) || value;
    },
  },
  {
    label: '消息类型',
    field: 'category',
    hidden: false,
    format: (value, _data) => {
      const { getEnumDict } = useI18n();
      return getEnumDict('AnnoCategory').find(item => item.value === value) || value;
    },
  },
  {
    label: '通告对象类型',
    field: 'receiverType',
    hidden: false,
    format: (value, _data) => {
      const { getEnumDict } = useI18n();
      return getEnumDict('ReceiverType').find(item => item.value === value) || value;
    },
  },
  {
    label: '发布状态',
    field: 'sendStatus',
    hidden: false,
    format: (value, _data) => {
      const { getEnumDict } = useI18n();
      return getEnumDict('AnnoSendStatus').find(item => item.value === value) || value;
    },
  },
  {
    label: '发布时间',
    field: 'sendTime',
    hidden: false,
  },
  {
    label: '撤销时间',
    field: 'cancelTime',
    hidden: false,
  },
  {
    label: '业务类型',
    field: 'businessType',
    hidden: false,
    format: (value, _data) => {
      const { getEnumDict } = useI18n();
      return getEnumDict('AnnoBusinessType').find(item => item.value === value) || value;
    },
  },
  {
    label: '业务id',
    field: 'businessId',
    hidden: false,
  },
  {
    label: '打开方式',
    field: 'openType',
    hidden: false,
    format: (value, _data) => {
      const { getEnumDict } = useI18n();
      return getEnumDict('AnnoOpenType').find(item => item.value === value) || value;
    },
  },
  {
    label: '组件/路由 地址',
    field: 'openPage',
    hidden: false,
  },
  {
    label: '指定接收者id',
    field: 'receiverIds',
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
