<script lang="tsx">
import { computed, defineComponent, unref, PropType } from 'vue';
import { ElMenu, ElScrollbar } from 'element-plus';
import { useAppStore } from '@/store/modules/app';
import { usePermissionStore } from '@/store/modules/permission';
import { useRenderMenuItem } from './components/useRenderMenuItem';
import { useRouter } from 'vue-router';
import { isUrl } from '@/utils/is';
import { useDesign } from '@begcode/components';

const { getPrefixCls } = useDesign();

const prefixCls = getPrefixCls('menu');

export default defineComponent({
  name: 'Menu',
  props: {
    menuSelect: {
      type: Function as PropType<(index: string) => void>,
      default: undefined,
    },
  },
  setup(props) {
    const appStore = useAppStore();

    const layout = computed(() => appStore.getLayout);

    const { push, currentRoute } = useRouter();

    const permissionStore = usePermissionStore();

    const menuMode = computed((): 'vertical' | 'horizontal' => {
      // 竖
      const vertical: LayoutType[] = ['classic', 'topLeft', 'cutMenu'];

      if (vertical.includes(unref(layout))) {
        return 'vertical';
      } else {
        return 'horizontal';
      }
    });

    const routers = computed(() => (unref(layout) === 'cutMenu' ? permissionStore.getMenuTabRouters : permissionStore.getRouters));

    const collapse = computed(() => appStore.getCollapse);

    const uniqueOpened = computed(() => appStore.getUniqueOpened);

    const activeMenu = computed(() => {
      const { meta, path } = unref(currentRoute);
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu as string;
      }
      return path;
    });

    const menuSelect = (index: string) => {
      if (props.menuSelect) {
        props.menuSelect(index);
      }
      // 自定义事件
      if (isUrl(index)) {
        window.open(index);
      } else {
        push(index);
      }
    };

    const renderMenuWrap = () => {
      if (unref(layout) === 'top') {
        return renderMenu();
      } else {
        return <ElScrollbar>{renderMenu()}</ElScrollbar>;
      }
    };

    const renderMenu = () => {
      return (
        <ElMenu
          defaultActive={unref(activeMenu)}
          mode={unref(menuMode)}
          collapse={unref(layout) === 'top' || unref(layout) === 'cutMenu' ? false : unref(collapse)}
          uniqueOpened={unref(layout) === 'top' ? false : unref(uniqueOpened)}
          backgroundColor="var(--left-menu-bg-color)"
          textColor="var(--left-menu-text-color)"
          activeTextColor="var(--left-menu-text-active-color)"
          onSelect={menuSelect}
        >
          {{
            default: () => {
              const { renderMenuItem } = useRenderMenuItem(unref(menuMode));
              return renderMenuItem(unref(routers));
            },
          }}
        </ElMenu>
      );
    };

    return () => (
      <div
        id={prefixCls}
        class={[
          `${prefixCls} ${prefixCls}__${unref(menuMode)}`,
          'h-[100%] overflow-hidden flex-col bg-[var(--left-menu-bg-color)]',
          {
            'w-[var(--left-menu-min-width)]': unref(collapse) && unref(layout) !== 'cutMenu',
            'w-[var(--left-menu-max-width)]': !unref(collapse) && unref(layout) !== 'cutMenu',
          },
        ]}
      >
        {renderMenuWrap()}
      </div>
    );
  },
});
</script>

<style scoped>
.v-menu {
  position: relative;
  transition: width var(--transition-time-02);
}
.v-menu :deep(.el-menu) {
  width: 100% !important;
  border-right: none;
}
.v-menu :deep(.el-menu) .is-active > .el-sub-menu__title {
  color: var(--left-menu-text-active-color) !important;
}
.v-menu :deep(.el-menu) .el-sub-menu__title:hover,
.v-menu :deep(.el-menu) .el-menu-item:hover {
  color: var(--left-menu-text-active-color) !important;
  background-color: var(--left-menu-bg-color) !important;
}
.v-menu :deep(.el-menu) .el-menu-item.is-active {
  color: var(--left-menu-text-active-color) !important;
  background-color: var(--left-menu-bg-active-color) !important;
}
.v-menu :deep(.el-menu) .el-menu-item.is-active:hover {
  background-color: var(--left-menu-bg-active-color) !important;
}
.v-menu :deep(.el-menu) .el-menu-item.is-active {
  position: relative;
}
.v-menu :deep(.el-menu) .el-menu .el-sub-menu__title,
.v-menu :deep(.el-menu) .el-menu .el-menu-item:not(.is-active) {
  background-color: var(--left-menu-bg-light-color) !important;
}
.v-menu :deep(.el-menu--collapse) {
  width: var(--left-menu-min-width);
}
.v-menu :deep(.el-menu--collapse) > .is-active,
.v-menu :deep(.el-menu--collapse) > .is-active > .el-sub-menu__title {
  position: relative;
  background-color: var(--left-menu-collapse-bg-active-color) !important;
}
.v-menu :deep(.horizontal-collapse-transition) .v-menu__title {
  display: none;
}
.v-menu__horizontal {
  height: calc(var(--top-tool-height)) !important;
}
.v-menu__horizontal :deep(.el-menu--horizontal) {
  height: calc(var(--top-tool-height));
  border-bottom: none;
}
.v-menu__horizontal :deep(.el-menu--horizontal) > .el-sub-menu.is-active .el-sub-menu__title {
  border-bottom-color: var(--el-color-primary) !important;
}
.v-menu__horizontal :deep(.el-menu--horizontal) .el-menu-item.is-active {
  position: relative;
}
.v-menu__horizontal :deep(.el-menu--horizontal) .el-menu-item.is-active::after {
  display: none !important;
}
.v-menu__horizontal :deep(.el-menu--horizontal) .v-menu__title {
  /* stylelint-disable-next-line */
  max-height: calc(var(--top-tool-height) - 2px) !important;
  /* stylelint-disable-next-line */
  line-height: calc(var(--top-tool-height) - 2px);
}

.v-menu-popper--vertical .is-active > .el-sub-menu__title,
.v-menu-popper--horizontal .is-active > .el-sub-menu__title {
  color: var(--left-menu-text-active-color) !important;
}
.v-menu-popper--vertical .el-sub-menu__title:hover,
.v-menu-popper--horizontal .el-sub-menu__title:hover,
.v-menu-popper--vertical .el-menu-item:hover,
.v-menu-popper--horizontal .el-menu-item:hover {
  color: var(--left-menu-text-active-color) !important;
  background-color: var(--left-menu-bg-color) !important;
}
.v-menu-popper--vertical .el-menu-item.is-active,
.v-menu-popper--horizontal .el-menu-item.is-active {
  position: relative;
  background-color: var(--left-menu-bg-active-color) !important;
}
.v-menu-popper--vertical .el-menu-item.is-active:hover,
.v-menu-popper--horizontal .el-menu-item.is-active:hover {
  background-color: var(--left-menu-bg-active-color) !important;
}
</style>
