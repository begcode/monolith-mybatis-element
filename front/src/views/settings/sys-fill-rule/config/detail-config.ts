import { DescItem } from '@begcode/components';
import { h, resolveComponent } from 'vue';
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
    label: '规则名称',
    field: 'name',
    hidden: false,
  },
  {
    label: '规则Code',
    field: 'code',
    hidden: false,
  },
  {
    label: '规则描述',
    field: 'desc',
    hidden: false,
  },
  {
    label: '是否启用',
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
    label: '重置频率',
    field: 'resetFrequency',
    hidden: false,
    format: (value, _data) => {
      const { getEnumDict } = useI18n();
      return getEnumDict('ResetFrequency').find(item => item.value === value) || value;
    },
  },
  {
    label: '序列值',
    field: 'seqValue',
    hidden: false,
  },
  {
    label: '生成值',
    field: 'fillValue',
    hidden: false,
  },
  {
    label: '规则实现类',
    field: 'implClass',
    hidden: false,
  },
  {
    label: '规则参数',
    field: 'params',
    hidden: false,
  },
  {
    label: '重置开始日期',
    field: 'resetStartTime',
    hidden: false,
  },
  {
    label: '重置结束日期',
    field: 'resetEndTime',
    hidden: false,
  },
  {
    label: '重置时间',
    field: 'resetTime',
    hidden: false,
  },
  {
    label: '配置项列表',
    field: 'ruleItems',
    render: (value, _data) => h(resolveComponent('vxe-grid'), { disabled: true, data: value, columns: {} }),
  },
];

export default {
  fields,
};
