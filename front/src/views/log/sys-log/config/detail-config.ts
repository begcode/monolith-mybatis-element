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
    label: '日志类型',
    field: 'logType',
    hidden: false,
    format: (value, _data) => {
      const { getEnumDict } = useI18n();
      return getEnumDict('LogType').find(item => item.value === value) || value;
    },
  },
  {
    label: '日志内容',
    field: 'logContent',
    hidden: false,
  },
  {
    label: '操作类型',
    field: 'operateType',
    hidden: false,
    format: (value, _data) => {
      const { getEnumDict } = useI18n();
      return getEnumDict('OperateType').find(item => item.value === value) || value;
    },
  },
  {
    label: '操作用户账号',
    field: 'userid',
    hidden: false,
  },
  {
    label: '操作用户名称',
    field: 'username',
    hidden: false,
  },
  {
    label: 'IP',
    field: 'ip',
    hidden: false,
  },
  {
    label: '请求java方法',
    field: 'method',
    hidden: false,
  },
  {
    label: '请求路径',
    field: 'requestUrl',
    hidden: false,
  },
  {
    label: '请求参数',
    field: 'requestParam',
    hidden: false,
  },
  {
    label: '请求类型',
    field: 'requestType',
    hidden: false,
  },
  {
    label: '耗时',
    field: 'costTime',
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
