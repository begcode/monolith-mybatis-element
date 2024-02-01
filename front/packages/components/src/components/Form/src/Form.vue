<script lang="tsx">
import { computed, defineComponent, onMounted, PropType, ref, unref, watch } from 'vue';
import { ComponentSize, ElCol, ElForm, ElFormItem, ElRow, FormRules } from 'element-plus';
import { componentMap } from './helper/componentMap';
import { propTypes } from '@/utils/propTypes';
import { getSlot } from '@/utils/tsxHelper';
import { initModel, setComponentProps, setGridProp, setItemComponentSlots, setTextPlaceholder } from './helper';
import { useRenderSelect } from './components/useRenderSelect';
import { useRenderRadio } from './components/useRenderRadio';
import { useRenderCheckbox } from './components/useRenderCheckbox';
import { useDesign } from '@/hooks/web/useDesign';
import { findIndex } from '@/utils';
import { get, isFunction, isObject, set } from 'lodash-es';
import {
  CheckboxGroupComponentProps,
  ComponentNameEnum,
  FormProps,
  FormSchema,
  FormSetProps,
  RadioGroupComponentProps,
  SelectComponentProps,
} from './types';
import { isEmptyVal } from '@/utils/is';

const { renderSelectOptions } = useRenderSelect();
const { renderRadioOptions } = useRenderRadio();
const { renderCheckboxOptions } = useRenderCheckbox();

const { getPrefixCls } = useDesign();

const prefixCls = getPrefixCls('form');

export default defineComponent({
  name: 'Form',
  props: {
    // 生成Form的布局结构数组
    schema: {
      type: Array as PropType<FormSchema[]>,
      default: () => [],
    },
    // 是否需要栅格布局
    isCol: propTypes.bool.def(true),
    // 表单数据对象
    model: {
      type: Object as PropType<any>,
      default: () => ({}),
    },
    // 是否自动设置placeholder
    autoSetPlaceholder: propTypes.bool.def(true),
    // 是否自定义内容
    isCustom: propTypes.bool.def(false),
    // 表单label宽度
    labelWidth: propTypes.oneOfType([String, Number]).def('auto'),
    rules: {
      type: Object as PropType<FormRules>,
      default: () => ({}),
    },
    labelPosition: propTypes.oneOf(['left', 'right', 'top']).def('right'),
    labelSuffix: propTypes.string.def(''),
    hideRequiredAsterisk: propTypes.bool.def(false),
    requireAsteriskPosition: propTypes.oneOf(['left', 'right']).def('left'),
    showMessage: propTypes.bool.def(true),
    inlineMessage: propTypes.bool.def(false),
    statusIcon: propTypes.bool.def(false),
    validateOnRuleChange: propTypes.bool.def(true),
    size: {
      type: String as PropType<ComponentSize>,
      default: undefined,
    },
    disabled: propTypes.bool.def(false),
    scrollToError: propTypes.bool.def(false),
    scrollToErrorOffset: propTypes.oneOfType([Boolean, Object]).def(undefined),
    // onValidate: {
    //   type: Function as PropType<(prop: FormItemProp, isValid: boolean, message: string) => void>,
    //   default: () => {}
    // }
  },
  emits: ['register'],
  setup(props, { slots, expose, emit, attrs }) {
    // element form 实例
    const elFormRef = ref<ComponentRef<typeof ElForm>>();

    const mergeProps = ref<FormProps>({});

    const getProps = computed(() => {
      const propsObj = { ...props, ...attrs };
      Object.assign(propsObj, unref(mergeProps));
      return propsObj;
    });

    // 存储表单实例
    const formComponents = ref({});

    // 存储form-item实例
    const formItemComponents = ref({});

    // 表单数据
    const formModel = ref<Recordable>(props.model);

    onMounted(() => {
      emit('register', unref(elFormRef)?.$parent, unref(elFormRef));
    });

    // 对表单赋值
    const setValues = (data: Recordable = {}) => {
      formModel.value = Object.assign(unref(formModel), data);
    };

    const setProps = (props: FormProps = {}) => {
      mergeProps.value = Object.assign(unref(mergeProps), props);
    };

    const delSchema = (field: string) => {
      const { schema } = unref(getProps);

      const index = findIndex(schema, (v: FormSchema) => v.field === field);
      if (index > -1) {
        schema.splice(index, 1);
      }
    };

    const addSchema = (formSchema: FormSchema, index?: number) => {
      const { schema } = unref(getProps);
      if (index !== void 0) {
        schema.splice(index, 0, formSchema);
        return;
      }
      schema.push(formSchema);
    };

    const setSchema = (schemaProps: FormSetProps[]) => {
      const { schema } = unref(getProps);
      for (const v of schema) {
        for (const item of schemaProps) {
          if (v.field === item.field) {
            set(v, item.path, item.value);
          }
        }
      }
    };

    const getOptions = async (fn: Function, item: FormSchema) => {
      const options = await fn();
      setSchema([
        {
          field: item.field,
          path: item.component === ComponentNameEnum.TREE_SELECT ? 'componentProps.data' : 'componentProps.options',
          value: options,
        },
      ]);
    };

    /**
     * @description: 获取表单组件实例
     * @param filed 表单字段
     */
    const getComponentExpose = (filed: string) => {
      return unref(formComponents)[filed];
    };

    /**
     * @description: 获取formItem实例
     * @param filed 表单字段
     */
    const getFormItemExpose = (filed: string) => {
      return unref(formItemComponents)[filed];
    };

    const setComponentRefMap = (ref: any, filed: string) => {
      formComponents.value[filed] = ref;
    };

    const setFormItemRefMap = (ref: any, filed: string) => {
      formItemComponents.value[filed] = ref;
    };

    const validate = async () => {
      return await unref(elFormRef)?.validate();
    };

    /**
     * @description 获取表单数据
     * @returns form data
     */
    const getFormData = (filterEmptyVal = true) => {
      const model = formModel.value as any;
      if (filterEmptyVal) {
        // 使用reduce过滤空值，并返回一个新对象
        return Object.keys(model).reduce((prev, next) => {
          const value = model[next];
          if (!isEmptyVal(value)) {
            if (isObject(value)) {
              if (Object.keys(value).length > 0) {
                prev[next] = value;
              }
            } else {
              prev[next] = value;
            }
          }
          return prev;
        }, {});
      } else {
        return model;
      }
    };

    expose({
      setValues,
      formModel,
      setProps,
      delSchema,
      addSchema,
      setSchema,
      getComponentExpose,
      getFormItemExpose,
      validate,
      getFormData,
    });

    // 监听表单结构化数组，重新生成formModel
    watch(
      () => unref(getProps).schema,
      (schema = []) => {
        formModel.value = initModel(schema, unref(formModel));
      },
      {
        immediate: true,
        deep: true,
      },
    );

    watch(
      () => unref(getProps).model,
      () => {
        const { model } = unref(getProps);
        if (!model) return;
        setValues(model);
      },
      {
        immediate: true,
      },
    );

    // 渲染包裹标签，是否使用栅格布局
    const renderWrap = () => {
      const { isCol } = unref(getProps);
      return isCol ? <ElRow gutter={20}>{renderFormItemWrap()}</ElRow> : renderFormItemWrap();
    };

    // 是否要渲染el-col
    const renderFormItemWrap = () => {
      // hidden属性表示隐藏，不做渲染
      const { schema = [], isCol } = unref(getProps);

      return schema
        .filter(v => {
          let hidden;
          if (isFunction(v.hidden)) {
            hidden = v.hidden(formModel.value);
          } else {
            hidden = v.hidden;
          }
          let remove;
          if (isFunction(v.remove)) {
            remove = v.remove(formModel.value);
          } else {
            remove = v.remove;
          }
          return !remove && !hidden;
        })
        .map(item => {
          // 如果是 Divider 组件，需要自己占用一行
          const isDivider = item.component === 'Divider';
          const Com = componentMap['Divider'] as ReturnType<typeof defineComponent>;
          return isDivider ? (
            <Com {...{ contentPosition: 'left', ...item.componentProps }}>{item?.label}</Com>
          ) : isCol ? (
            // 如果需要栅格，需要包裹 ElCol
            <ElCol {...setGridProp(item.colProps)}>{renderFormItem(item)}</ElCol>
          ) : (
            renderFormItem(item)
          );
        });
    };

    // 渲染formItem
    const renderFormItem = (item: FormSchema) => {
      // 如果有optionApi，优先使用optionApi
      if (item.optionApi) {
        // 内部自动调用接口，不影响其他渲染
        getOptions(item.optionApi, item);
      }
      if (isFunction(item.componentProps)) {
        item.componentProps = item.componentProps({ formModelRef: formModel });
      }
      const formItemSlots: Recordable = {
        default: () => {
          if (item?.formItemProps?.slots?.default) {
            return item?.formItemProps?.slots?.default(formModel.value);
          } else {
            const Com = componentMap[item.component as string] as ReturnType<typeof defineComponent>;

            const { autoSetPlaceholder } = unref(getProps);

            const componentSlots = (item?.componentProps as any)?.slots || {};
            const slotsMap: Recordable = {
              ...setItemComponentSlots(componentSlots),
            };
            // // 如果是select组件，并且没有自定义模板，自动渲染options
            if (item.component === ComponentNameEnum.SELECT) {
              slotsMap.default = !componentSlots.default
                ? () => renderSelectOptions(item)
                : () => {
                    return componentSlots.default(unref((item?.componentProps as SelectComponentProps)?.options));
                  };
            }

            // 虚拟列表
            if (item.component === ComponentNameEnum.SELECT_V2 && componentSlots.default) {
              slotsMap.default = ({ item }) => {
                return componentSlots.default(item);
              };
            }

            // 单选框组和按钮样式
            if (item.component === ComponentNameEnum.RADIO_GROUP || item.component === ComponentNameEnum.RADIO_BUTTON) {
              slotsMap.default = !componentSlots.default
                ? () => renderRadioOptions(item)
                : () => {
                    return componentSlots.default(unref((item?.componentProps as CheckboxGroupComponentProps)?.options));
                  };
            }

            // 多选框组和按钮样式
            if (item.component === ComponentNameEnum.CHECKBOX_GROUP || item.component === ComponentNameEnum.CHECKBOX_BUTTON) {
              slotsMap.default = !componentSlots.default
                ? () => renderCheckboxOptions(item)
                : () => {
                    return componentSlots.default(unref((item?.componentProps as RadioGroupComponentProps)?.options));
                  };
            }

            const Comp = () => {
              // 如果field是多层路径，需要转换成对象
              const itemVal = computed({
                get: () => {
                  return get(formModel.value, item.field);
                },
                set: val => {
                  set(formModel.value, item.field, val);
                },
              });

              return item.component === ComponentNameEnum.UPLOAD ? (
                <Com
                  vModel:file-list={itemVal.value}
                  ref={(el: any) => setComponentRefMap(el, item.field)}
                  {...(autoSetPlaceholder && setTextPlaceholder(item))}
                  {...setComponentProps(item)}
                  style={
                    item.componentProps?.style || {
                      width: '100%',
                    }
                  }
                >
                  {{ ...slotsMap }}
                </Com>
              ) : (
                <Com
                  vModel={itemVal.value}
                  ref={(el: any) => setComponentRefMap(el, item.field)}
                  {...(autoSetPlaceholder && setTextPlaceholder(item))}
                  {...setComponentProps(item)}
                  style={
                    item.componentProps?.style || {
                      width: '100%',
                    }
                  }
                >
                  {{ ...slotsMap }}
                </Com>
              );
            };

            return <>{Comp()}</>;
          }
        },
      };
      if (item?.formItemProps?.slots?.label) {
        formItemSlots.label = (...args: any[]) => {
          return (item?.formItemProps?.slots as any)?.label(...args);
        };
      }
      if (item?.formItemProps?.slots?.error) {
        formItemSlots.error = (...args: any[]) => {
          return (item?.formItemProps?.slots as any)?.error(...args);
        };
      }
      let hidden;
      if (isFunction(item.hidden)) {
        hidden = item.hidden(formModel.value);
      } else {
        hidden = item.hidden;
      }
      return (
        <ElFormItem
          v-show={!hidden}
          ref={(el: any) => setFormItemRefMap(el, item.field)}
          {...(item.formItemProps || {})}
          prop={item.field}
          label={item.label || ''}
        >
          {formItemSlots}
        </ElFormItem>
      );
    };

    // 过滤传入Form组件的属性
    const getFormBindValue = () => {
      // 避免在标签上出现多余的属性
      const delKeys = ['schema', 'isCol', 'autoSetPlaceholder', 'isCustom', 'model'];
      const props = { ...unref(getProps) };
      for (const key in props) {
        if (delKeys.indexOf(key) !== -1) {
          delete props[key];
        }
      }
      return props as FormProps;
    };

    return () => (
      <ElForm
        ref={elFormRef}
        {...getFormBindValue()}
        model={unref(getProps).isCustom ? unref(getProps).model : formModel}
        class={prefixCls}
        onSubmit={(e: Event) => {
          e.preventDefault();
        }}
      >
        {{
          // 如果需要自定义，就什么都不渲染，而是提供默认插槽
          default: () => {
            const { isCustom } = unref(getProps);
            return isCustom ? getSlot(slots, 'default') : renderWrap();
          },
        }}
      </ElForm>
    );
  },
});
</script>

<style lang="scss" scoped>
.el-form .el-form .el-row {
  margin-right: 0 !important;
  margin-left: 0 !important;
}
.el-form--inline .el-input {
  width: 245px;
}
</style>
