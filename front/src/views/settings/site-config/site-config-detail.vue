<script lang="tsx">
import { getCurrentInstance, ref, reactive, h, resolveComponent, toRef, Component } from 'vue';
import { useRoute } from 'vue-router';
import config from './config/detail-config';
import { defineComponent } from 'vue';
import { ISiteConfig } from '@/models/settings/site-config.model';

import ServerProvider from '@/api/index';
import { ContentWrap, Icon, getButtonConfig, Descriptions } from '@begcode/components';

export default defineComponent({
  // begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！
  name: 'SystemSiteConfigDetail',
  props: {
    entityId: {
      type: Number || String,
      default: 0,
    },
    containerType: {
      type: String,
      default: 'router',
    },
  },
  async setup(props) {
    const ctx = getCurrentInstance()?.proxy;
    const route = useRoute();
    // const pageControl = control(ctx);
    // const formConfig = pageControl.formRender();
    const activeNames = ref<any[]>([]);
    const handleChange = val => {
      activeNames.value = val;
      ctx?.$emit('change', activeNames.value);
    };
    const apiService = ctx?.$apiService as typeof ServerProvider;
    const siteConfig = reactive<ISiteConfig>({});
    let entityId: any = '';
    if (props.containerType === 'router') {
      entityId = route.params?.entityId;
    } else {
      entityId = props.entityId;
    }
    if (entityId) {
      const data = await apiService.settings.siteConfigService.find(Number(entityId));
      if (data) {
        Object.assign(siteConfig, data);
      }
    }
    const formItemsConfig = reactive(config.fields);
    // 获得关联表属性。
    const pageConfig = reactive({
      active: '0',
      operations: [
        {
          theme: 'close',
          click: () => {
            console.log('close');
          },
        },
      ],
      canExpand: false,
      title: '详情',
    });
    const formGroup = reactive([
      {
        title: '网站配置详情',
        operation: [],
        component: {
          name: 'a-desc',
          props: {
            schema: formItemsConfig,
            isEdit: () => false,
            // formConfig,
            labelWidth: '120px',
            data: siteConfig,
            column: 1,
          },
        },
      },
      {
        title: '关联表',
        operation: [],
        component: [
          {
            name: 'vxe-grid',
            title: '配置项列表列表',
            props: {
              data: siteConfig.items,
              columns: itemsColumns,
              columnsRender: itemsColumnsRender,
              border: true,
              showOverflow: true,
              editConfig: {
                enabled: false,
                trigger: 'click',
                mode: 'row',
                activeMethod({ row, rowIndex, column, columnIndex }) {
                  return rowIndex !== 1;
                },
              },
              fieldMapToTime: [],
              compact: true,
              size: 'default',
              disabled: !isEdit.value,
              toolbarConfig: {
                buttons: [
                  { code: 'insert_actived', name: '新增', icon: 'fa fa-plus' },
                  { code: 'remove', name: '删除', icon: 'fa fa-trash-o' },
                ],
                // 表格右上角自定义按钮
                tools: [
                  // { code: 'myPrint', name: '自定义打印' }
                ],
                import: true,
                export: true,
                print: true,
                custom: true,
              },
            },
          },
        ],
      },
    ]);
    const getXGridSlots = component => {
      if (component.recordActions) {
        const buttons = reactive(component.recordActions.map(action => getButtonConfig(action)));
        buttons.filter(button => button.icon).forEach(button => (button.slots = { default: () => <Icon icon={button.icon} /> }));
        buttons.filter(button => !button.icon).forEach(button => (button.slots = { default: () => button.text }));
        return {
          recordAction: row => (
            <div>
              <el-space>
                {buttons.map(button => {
                  return (
                    <el-button
                      {...{
                        type: button.type || 'primary',
                        shape: button.shape || 'circle',
                        title: button.text || button.name,
                        onClick: () => {
                          if (button.onClick) {
                            button.onClick(row.row, button.name);
                          } else {
                            console.log(button.name, 'onClick事件未定义！');
                          }
                        },
                      }}
                      v-slots={button.slots}
                    ></el-button>
                  );
                })}
              </el-space>
            </div>
          ),
        };
      } else {
        return {
          recordAction: () => <div />,
        };
      }
    };
    const renderChild = () => {
      const wrapperPros: any = {};
      if (!pageConfig?.canExpand) {
        wrapperPros.bordered = false;
        wrapperPros.size = 'small';
      }

      return formGroup.map(item => {
        var componentRef = toRef(item, 'component').value;
        if (componentRef && !(componentRef instanceof Array)) {
          if (componentRef.name === 'a-desc') {
            if (pageConfig?.canExpand) {
              return (
                <el-collapse-panel>
                  <Descriptions {...componentRef.props} />
                </el-collapse-panel>
              );
            } else {
              return <Descriptions {...componentRef.props} />;
            }
          } else {
            const component = resolveComponent(componentRef.name);
            return h(
              resolveComponent(pageConfig?.canExpand ? 'el-collapse-panel' : 'el-card'),
              { ...wrapperPros },
              h(component, componentRef.props),
            );
          }
        } else if (componentRef && componentRef instanceof Array) {
          return h(
            resolveComponent(pageConfig?.canExpand ? 'el-collapse-panel' : 'el-card'),
            { ...wrapperPros },
            h(
              resolveComponent('el-tabs'),
              {},
              componentRef.map((child, index) => {
                return h(
                  resolveComponent('el-tab-pane'),
                  { tab: child.title || index, key: index },
                  h(resolveComponent(child?.name) as Component, child.props, child?.name === 'vxe-grid' ? getXGridSlots(child) : {}),
                );
              }),
            ),
          );
        } else {
          return <div>无内容</div>;
        }
      });
    };
    const slots = {
      rightFooter: () => (
        <div>
          <a-space>
            {pageConfig.operations.map((operation: any) => {
              const buttonSlots: any = {};
              if (operation.icon) {
                buttonSlots.icon = () => <Icon icon={operation.icon} />;
              }
              if (operation.text) {
                buttonSlots.default = () => operation.text;
              }
              switch (operation.theme) {
                case 'save':
                  if (!buttonSlots.icon) {
                    buttonSlots.icon = () => <Icon icon={'ant-design:save-outlined'} />;
                  }
                  if (!buttonSlots.default) {
                    buttonSlots.default = () => '保存';
                  }
                  return (
                    <el-button
                      {...{
                        type: 'primary',
                        onClick: operation.click,
                      }}
                      v-slots={buttonSlots}
                    ></el-button>
                  );
                case 'update':
                  if (!buttonSlots.icon) {
                    buttonSlots.icon = () => <Icon icon={'ant-design:check-outlined'} />;
                  }
                  if (!buttonSlots.default) {
                    buttonSlots.default = () => '更新';
                  }
                  return (
                    <el-button
                      {...{
                        type: 'primary',
                        onClick: operation.click,
                      }}
                      v-slots={buttonSlots}
                    ></el-button>
                  );
                default:
                  return (
                    <el-button
                      {...{
                        type: 'primary',
                        onClick: operation.click,
                      }}
                    >
                      {operation.title}
                    </el-button>
                  );
              }
            })}
          </a-space>
        </div>
      ),
      default: () => {
        if (pageConfig?.canExpand) {
          return (
            <div>
              <el-collapse value={activeNames} onchange={handleChange} v-slots={{ default: renderChild }} />
            </div>
          );
        } else {
          return h('div', {}, { default: renderChild });
        }
      },
    };
    return {
      // formConfig,
      pageConfig,
      // pageControl,
      formGroup,
      slots,
    };
  },
  render() {
    if (this.containerType === 'modal' || this.containerType === 'drawer') {
      return <el-card {...this.pageConfig} v-slots={this.slots} />;
    } else {
      return (
        <ContentWrap
          {...{
            props: {
              title: this.pageConfig?.title || '详情',
            },
            style: 'margin-bottom: 20px',
          }}
          v-slots={this.slots}
        />
      );
    }
  },
});
</script>
