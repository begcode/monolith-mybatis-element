import { ElTag } from 'element-plus';

export function useColumns() {
  const { pkg, lastBuildTime } = __APP_INFO__;
  const { version } = pkg;
  const columns = [
    {
      label: '版本',
      slots: {
        default: () => {
          return <ElTag size="small">{version}</ElTag>;
        },
      },
    },
    {
      label: '最后编译时间',
      slots: {
        default: () => {
          return <ElTag size="small">{lastBuildTime}</ElTag>;
        },
      },
    },
    {
      label: '文档地址',
      slots: {
        default: () => {
          return (
            <a href="https://www.begcode.com/" target="_blank">
              <span style="color: var(--el-color-primary)">文档地址</span>
            </a>
          );
        },
      },
    },
    {
      label: 'Github',
      slots: {
        default: () => {
          return (
            <a href="https://github.com/pure-admin/vue-pure-admin" target="_blank">
              <span style="color: var(--el-color-primary)">Github</span>
            </a>
          );
        },
      },
    },
  ];

  return {
    columns,
  };
}
