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
    label: '排序值',
    field: 'sortValue',
    hidden: false,
  },
  {
    label: '字段参数类型',
    field: 'fieldParamType',
    hidden: false,
    format: (value, _data) => {
      const { getEnumDict } = useI18n();
      return getEnumDict('FieldParamType').find(item => item.value === value) || value;
    },
  },
  {
    label: '字段参数值',
    field: 'fieldParamValue',
    hidden: false,
  },
  {
    label: '日期格式',
    field: 'datePattern',
    hidden: false,
  },
  {
    label: '序列长度',
    field: 'seqLength',
    hidden: false,
  },
  {
    label: '序列增量',
    field: 'seqIncrement',
    hidden: false,
  },
  {
    label: '序列起始值',
    field: 'seqStartValue',
    hidden: false,
  },
  {
    label: '填充规则',
    field: 'fillRuleName',
  },
];

export default {
  fields,
};
