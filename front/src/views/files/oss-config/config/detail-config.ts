import { DescItem, CodeEditor } from '@begcode/components';
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
    label: '提供商',
    field: 'provider',
    hidden: false,
    format: (value, _data) => {
      const { getEnumDict } = useI18n();
      return getEnumDict('OssProvider').find(item => item.value === value) || value;
    },
  },
  {
    label: '平台',
    field: 'platform',
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
    label: '备注',
    field: 'remark',
    hidden: false,
  },
  {
    label: '配置数据',
    field: 'configData',
    hidden: false,
    render: (value, data) => h(CodeEditor, { src: value, style: 'width: 100px; height: 100px; object-fit: cover; border-radius: 50%;' }),
  },
];

export default {
  fields,
};
