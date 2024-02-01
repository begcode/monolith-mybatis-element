<script lang="tsx">
import { useRoute, useRouter } from 'vue-router';
import { getCurrentInstance, reactive, computed, defineComponent, h, ref, resolveComponent, toRef, Component, PropType } from 'vue';
import { ElMessage } from 'element-plus';
import config from './config/edit-config';
import { UploadImage, IUploadImage } from '@/models/files/upload-image.model';

import ServerProvider from '@/api/index';
import { Icon, Form, ContentWrap } from '@begcode/components';
import { isBoolean, isFunction } from '@/utils/is';
import { useTagsView } from '@/hooks/web/useTagsView';

export default defineComponent({
  // begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！
  name: 'OssUploadImageEdit',
  props: {
    entityId: {
      type: [String, Number] as PropType<string | number>,
      default: '',
    },
    containerType: {
      type: String,
      default: 'router',
    },
  },
  async setup(props) {
    const ctx = getCurrentInstance()?.proxy;
    const apiService = ctx?.$apiService as typeof ServerProvider;
    const relationshipApis: any = {
      category: async params => (await apiService.files.resourceCategoryService.tree(params)).records,
    };
    const route = useRoute();
    const router = useRouter();
    const { closeCurrentToLatestView } = useTagsView();
    const activeNames = ref<any[]>([]);
    const handleChange = (val: any[]) => {
      activeNames.value = val;
      ctx?.$emit('change', activeNames.value);
    };
    let uploadImageId = ref('');
    if (props.containerType === 'router') {
      uploadImageId.value = route.params?.entityId as string;
    } else {
      uploadImageId.value = props.entityId as string;
    }
    const uploadImage = reactive<IUploadImage>(new UploadImage());
    if (uploadImageId.value) {
      const data = await apiService.files.uploadImageService.find(Number(uploadImageId.value));
      if (data) {
        Object.assign(uploadImage, data);
      }
    }
    const formItemsConfig = config.fields();
    const rules = config.rules();
    formItemsConfig.unshift({
      label: '选择文件',
      field: 'file',
      component: '',
      show: false,
    });
    const submitButtonTitlePrefix = uploadImageId.value ? '更新' : '保存';
    const saveOrUpdateApi = uploadImageId.value ? apiService.files.uploadImageService.update : apiService.files.uploadImageService.create;
    const saveOrUpdate = () => {
      validate()
        .then(result => {
          if (result) {
            Object.assign(uploadImage, result);
            saveOrUpdateApi(uploadImage)
              .then(res => {
                Object.assign(uploadImage, res);
                ElMessage({
                  type: 'success',
                  message: submitButtonTitlePrefix + '成功！',
                  duration: 1,
                });
                ctx?.$emit('refresh', { update: true, containerType: props.containerType });
              })
              .catch(error => {
                console.log('error', error);
                ElMessage({
                  type: 'error',
                  message: submitButtonTitlePrefix + '失败！',
                  onClose: () => {},
                });
              });
          } else {
            ElMessage({
              type: 'error',
              message: '数据验证失败！',
              onClose: () => {},
            });
          }
        })
        .catch(error => {
          console.log('error', error);
          ElMessage({
            type: 'error',
            message: '数据验证失败！',
            onClose: () => {},
          });
        });
    };
    //获得关联表属性。
    const pageConfig = reactive<any>({
      active: '0',
      operations: [
        {
          title: '关闭',
          type: 'default',
          theme: 'close',
          skipValidate: true,
          click: () => {
            if (props.containerType === 'router') {
              closeCurrentToLatestView(route);
            } else {
              ctx?.$emit('cancel', { containerType: props.containerType, update: false });
            }
          },
        },
        {
          hide: () => {
            return !!uploadImage.id;
          },
          type: 'primary',
          theme: 'save',
          click: saveOrUpdate,
        },
        {
          hide: () => {
            return !uploadImage.id;
          },
          theme: 'update',
          type: 'primary',
          click: saveOrUpdate,
        },
      ],
    });
    const isEdit = computed(() => {
      return true;
    });
    const validate = async () => {
      let isValid = true;
      let result = {};
      var refKeys = Object.keys(ctx?.$refs as object);
      for (const refKey of refKeys) {
        const component: any = ctx?.$refs[refKey];
        if (component && component.validate) {
          try {
            const validateResult = await component.validate();
            if (refKey === 'BASE_ENTITY') {
              if (validateResult === true) {
                const formData = component.getFormData(false);
                Object.assign(result, formData);
              } else {
                isValid = false;
                break;
              }
            } else {
              if (validateResult) {
                result[refKey] = validateResult;
              } else {
                isValid = false;
                break;
              }
            }
          } catch (error) {
            console.log('error', error);
            isValid = false;
            break;
          }
        }
      }
      if (!isValid) {
        return false;
      } else {
        return result;
      }
    };
    const formGroup = reactive([
      {
        title: props.containerType === 'router' ? '上传图片' : null,
        operation: [],
        component: {
          name: 'el-form',
          props: {
            modelName: 'BASE_ENTITY',
            model: uploadImage,
            labelWidth: '120px',
            fieldMapToTime: [],
            compact: true,
            alwaysShowLines: 1,
            schema: formItemsConfig,
            rules: rules,
            // formItemsRender,
            size: 'default',
            isCol: false,
            disabled: false,
            showAdvancedButton: false,
            showResetButton: false,
            showSubmitButton: false,
            showActionButtonGroup: false,
            resetButtonOptions: {
              type: 'default',
              size: 'default',
              text: '关闭',
              preIcon: null,
            },
            actionColOptions: {
              span: 18,
            },
            submitButtonOptions: {
              type: 'primary',
              size: 'default',
              text: submitButtonTitlePrefix,
              preIcon: null,
            },
            resetFunc: () => {
              ctx?.$emit('cancel', { update: false, containerType: props.containerType });
            },
            submitFunc: saveOrUpdate,
          },
          on: {},
        },
      },
    ]);
    const formSlots = {};
    const renderChild = () => {
      const wrapperPros: any = {};
      if (!pageConfig?.canExpand) {
        wrapperPros.bordered = false;
        wrapperPros.size = 'small';
      }
      return formGroup.map(item => {
        var componentRef = toRef(item, 'component').value;
        if (componentRef && !(componentRef instanceof Array)) {
          if (componentRef.name === 'el-form') {
            if (pageConfig?.canExpand) {
              // @ts-ignore
              return h('el-collapse-panel', {}, h(Form, { ...componentRef.props, ref: componentRef.props.modelName }, formSlots));
            } else {
              // @ts-ignore
              return h(Form, { ...componentRef.props, ref: componentRef.props.modelName }, formSlots);
            }
          } else {
            const component = resolveComponent(componentRef.name);
            return h(
              resolveComponent(pageConfig?.canExpand ? 'el-collapse-panel' : 'el-card'),
              { ...wrapperPros },
              h(component, { ...componentRef.props, ref: componentRef.props.modelName }),
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
                const childComponent: Component = resolveComponent(child.name) as Component;
                return h(
                  resolveComponent('el-tab-pane'),
                  { tab: child.title || index, key: index },
                  h(childComponent, { ...child.props, ref: child.props.modelName }, {}),
                );
              }),
            ),
          );
        } else {
          return <div>无内容</div>;
        }
      });
    };
    const slots: any = {
      rightFooter: () => (
        <div class="float-right">
          <el-space>
            {pageConfig.operations.map((operation: any) => {
              const buttonSlots: any = {};
              if (operation.icon) {
                buttonSlots.icon = () => <Icon icon={operation.icon} />;
              }
              if (operation.text) {
                buttonSlots.default = () => operation.text;
              }
              const hideButton = isBoolean(operation.hide) ? operation.hide : isFunction(operation.hide) ? operation.hide() : false;
              switch (operation.theme) {
                case 'save':
                  if (!buttonSlots.icon) {
                    buttonSlots.icon = () => <Icon icon={'ant-design:save-outlined'} />;
                  }
                  if (!buttonSlots.default) {
                    buttonSlots.default = () => '保存';
                  }
                  return hideButton ? (
                    <span />
                  ) : (
                    <el-button
                      {...{
                        type: operation.type || 'default',
                        onClick: () => {
                          validate().then(result => {
                            operation.click(result);
                          });
                        },
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
                  return hideButton ? (
                    <span />
                  ) : (
                    <el-button
                      {...{
                        type: operation.type || 'default',
                        onClick: () => {
                          validate().then(result => {
                            operation.click(result);
                          });
                        },
                      }}
                      v-slots={buttonSlots}
                    ></el-button>
                  );
                default:
                  return hideButton ? (
                    <span />
                  ) : (
                    <el-button
                      {...{
                        type: operation.type || 'default',
                        onClick: () => {
                          if (operation.skipValidate) {
                            operation.click();
                          } else {
                            validate().then(result => {
                              operation.click(result);
                            });
                          }
                        },
                      }}
                    >
                      {operation.title}
                    </el-button>
                  );
              }
            })}
          </el-space>
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
      // pageControl,
      uploadImageId,
      saveOrUpdate,
      formGroup,
      pageConfig,
      slots,
      uploadImage,
    };
  },
  render() {
    if (this.containerType === 'modal' || this.containerType === 'drawer') {
      // this.slots.actions = this.slots.rightFooter;
      delete this.slots.rightFooter;
      return <el-card {...this.pageConfig} v-slots={this.slots} />;
    } else {
      return (
        <ContentWrap
          {...{
            props: {
              title: this.pageConfig?.title || '编辑',
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
