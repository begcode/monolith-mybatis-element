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
    label: '名称',
    field: 'name',
    hidden: false,
  },
  {
    label: '地区代码',
    field: 'areaCode',
    hidden: false,
  },
  {
    label: '城市代码',
    field: 'cityCode',
    hidden: false,
  },
  {
    label: '全名',
    field: 'mergerName',
    hidden: false,
  },
  {
    label: '短名称',
    field: 'shortName',
    hidden: false,
  },
  {
    label: '邮政编码',
    field: 'zipCode',
    hidden: false,
  },
  {
    label: '等级',
    field: 'level',
    hidden: false,
    format: (value, _data) => {
      const { getEnumDict } = useI18n();
      return getEnumDict('RegionCodeLevel').find(item => item.value === value) || value;
    },
  },
  {
    label: '经度',
    field: 'lng',
    hidden: false,
  },
  {
    label: '纬度',
    field: 'lat',
    hidden: false,
  },
  {
    label: '上级节点',
    field: 'parentName',
  },
];

export default {
  fields,
};
