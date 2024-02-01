import { DescItem, Icon } from '@begcode/components';
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
    label: '权限名称',
    field: 'text',
    hidden: false,
  },
  {
    label: '权限类型',
    field: 'type',
    hidden: false,
    format: (value, _data) => {
      const { getEnumDict } = useI18n();
      return getEnumDict('ViewPermissionType').find(item => item.value === value) || value;
    },
  },
  {
    label: 'i18n主键',
    field: 'i18n',
    hidden: false,
  },
  {
    label: '显示分组名',
    field: 'group',
    hidden: false,
    render: (value, data) =>
      h(ElSwitch, {
        disabled: true,
        checked: value,
        onChange: checked => {
          data.group = checked;
        },
      }),
  },
  {
    label: '路由',
    field: 'link',
    hidden: false,
  },
  {
    label: '外部链接',
    field: 'externalLink',
    hidden: false,
  },
  {
    label: '链接目标',
    field: 'target',
    hidden: false,
    format: (value, _data) => {
      const { getEnumDict } = useI18n();
      return getEnumDict('TargetType').find(item => item.value === value) || value;
    },
  },
  {
    label: '图标',
    field: 'icon',
    hidden: false,
    render: (value, data) => h(Icon, { class: value, style: 'font-size: 20px;' }),
  },
  {
    label: '禁用菜单',
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
    label: '隐藏菜单',
    field: 'hide',
    hidden: false,
    render: (value, data) =>
      h(ElSwitch, {
        disabled: true,
        checked: value,
        onChange: checked => {
          data.hide = checked;
        },
      }),
  },
  {
    label: '隐藏面包屑',
    field: 'hideInBreadcrumb',
    hidden: false,
    render: (value, data) =>
      h(ElSwitch, {
        disabled: true,
        checked: value,
        onChange: checked => {
          data.hideInBreadcrumb = checked;
        },
      }),
  },
  {
    label: '快捷菜单项',
    field: 'shortcut',
    hidden: false,
    render: (value, data) =>
      h(ElSwitch, {
        disabled: true,
        checked: value,
        onChange: checked => {
          data.shortcut = checked;
        },
      }),
  },
  {
    label: '菜单根节点',
    field: 'shortcutRoot',
    hidden: false,
    render: (value, data) =>
      h(ElSwitch, {
        disabled: true,
        checked: value,
        onChange: checked => {
          data.shortcutRoot = checked;
        },
      }),
  },
  {
    label: '允许复用',
    field: 'reuse',
    hidden: false,
    render: (value, data) =>
      h(ElSwitch, {
        disabled: true,
        checked: value,
        onChange: checked => {
          data.reuse = checked;
        },
      }),
  },
  {
    label: '权限代码',
    field: 'code',
    hidden: false,
  },
  {
    label: '权限描述',
    field: 'description',
    hidden: false,
  },
  {
    label: '排序',
    field: 'order',
    hidden: false,
  },
  {
    label: 'api权限标识串',
    field: 'apiPermissionCodes',
    hidden: false,
  },
  {
    label: '组件名称',
    field: 'componentFile',
    hidden: false,
  },
  {
    label: '重定向路径',
    field: 'redirect',
    hidden: false,
  },
  {
    label: '上级',
    field: 'parentText',
  },
];

export default {
  fields,
};
