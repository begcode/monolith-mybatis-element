import { VueTypeValidableDef, VueTypesInterface } from 'vue-types';
import { CSSProperties, VNodeChild, VNode } from 'vue';
export type VueNode = VNodeChild | VNode;
type PropTypes = VueTypesInterface & {
    readonly style: VueTypeValidableDef<CSSProperties>;
    readonly VNodeChild: VueTypeValidableDef<VueNode>;
};
declare const newPropTypes: PropTypes;
declare class propTypes extends newPropTypes {
    static get style(): VueTypeValidableDef<any, import("vue-types/dist/types").ValidatorFunction<any>>;
    static get VNodeChild(): VueTypeValidableDef<any, import("vue-types/dist/types").ValidatorFunction<any>>;
}
export { propTypes };
