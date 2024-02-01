import { VueTypeValidableDef, VueTypesInterface, createTypes, toValidableType } from 'vue-types';
import { CSSProperties, VNodeChild } from 'vue';

export type VueNode = VNodeChild | JSX.Element;

// 自定义扩展vue-types
type PropTypes = VueTypesInterface & {
  readonly style: VueTypeValidableDef<CSSProperties>;
  readonly VNodeChild: VueTypeValidableDef<VueNode>;
};

const newPropTypes = createTypes({
  func: undefined,
  bool: undefined,
  string: undefined,
  number: undefined,
  object: undefined,
  integer: undefined,
}) as PropTypes;

// 需要自定义扩展的类型
// see: https://dwightjack.github.io/vue-types/advanced/extending-vue-types.html#the-extend-method
class propTypes extends newPropTypes {
  // a native-like validator that supports the `.validable` method
  static get style() {
    return toValidableType('style', {
      type: [String, Object],
    });
  }

  static get VNodeChild() {
    return toValidableType('VNodeChild', {
      type: undefined,
    });
  }
}

export { propTypes };
