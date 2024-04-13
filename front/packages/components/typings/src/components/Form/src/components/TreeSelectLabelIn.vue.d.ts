import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    labelInValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    modelValue: {
        type: PropType<any>;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (...args: any[]) => void;
    "update:modelValue": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    labelInValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    modelValue: {
        type: PropType<any>;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    labelInValue: boolean;
}, {}>;
export default _default;
