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
    label: '名称',
    field: 'name',
    hidden: false,
  },
  {
    label: '字段值',
    field: 'value',
    hidden: false,
  },
  {
    label: '字段标题',
    field: 'label',
    hidden: false,
  },
  {
    label: '字段类型',
    field: 'valueType',
    hidden: false,
    format: (value, _data) => {
      const { getEnumDict } = useI18n();
      return getEnumDict('CommonFieldType').find(item => item.value === value) || value;
    },
  },
  {
    label: '说明',
    field: 'remark',
    hidden: false,
  },
  {
    label: '排序',
    field: 'sortValue',
    hidden: false,
  },
  {
    label: '是否禁用',
    field: 'disabled',
    hidden: false,
    render: (value, data) =>
      h(ElSwitch, {
        disabled: true,
        checked: value,
        onChange: checked => {
          data.disabled = checked;
        },
      }),
  },
  {
    label: '实体名称',
    field: 'ownerEntityName',
    hidden: false,
  },
  {
    label: '使用实体ID',
    field: 'ownerEntityId',
    hidden: false,
  },
  {
    label: 'Site Config',
    field: 'siteConfigId',
  },
  {
    label: 'Dictionary',
    field: 'dictionaryId',
  },
];

export default {
  fields,
};
