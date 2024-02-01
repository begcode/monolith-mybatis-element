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
    label: '服务名称',
    field: 'serviceName',
    hidden: false,
  },
  {
    label: '权限名称',
    field: 'name',
    hidden: false,
  },
  {
    label: 'Code',
    field: 'code',
    hidden: false,
  },
  {
    label: '权限描述',
    field: 'description',
    hidden: false,
  },
  {
    label: '类型',
    field: 'type',
    hidden: false,
    format: (value, _data) => {
      const { getEnumDict } = useI18n();
      return getEnumDict('ApiPermissionType').find(item => item.value === value) || value;
    },
  },
  {
    label: '请求类型',
    field: 'method',
    hidden: false,
  },
  {
    label: 'url 地址',
    field: 'url',
    hidden: false,
  },
  {
    label: '状态',
    field: 'status',
    hidden: false,
    format: (value, _data) => {
      const { getEnumDict } = useI18n();
      return getEnumDict('ApiPermissionState').find(item => item.value === value) || value;
    },
  },
  {
    label: '上级',
    field: 'parentName',
  },
];

export default {
  fields,
};
