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
    label: '任务名称',
    field: 'name',
    hidden: false,
  },
  {
    label: '任务类名',
    field: 'jobClassName',
    hidden: false,
  },
  {
    label: 'cron表达式',
    field: 'cronExpression',
    hidden: false,
  },
  {
    label: '参数',
    field: 'parameter',
    hidden: false,
  },
  {
    label: '描述',
    field: 'description',
    hidden: false,
  },
  {
    label: '任务状态',
    field: 'jobStatus',
    hidden: false,
    format: (value, _data) => {
      const { getEnumDict } = useI18n();
      return getEnumDict('JobStatus').find(item => item.value === value) || value;
    },
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
