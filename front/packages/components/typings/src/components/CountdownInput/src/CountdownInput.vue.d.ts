import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    count: {
        type: NumberConstructor;
        default: number;
    };
    sendCodeApi: {
        type: PropType<() => Promise<boolean>>;
        default: null;
    };
}, {
    prefixCls: any;
    loading: import("vue").Ref<boolean>;
    isStart: import("vue").Ref<boolean>;
    innerValueRef: import("vue").Ref<any>;
    getButtonText: import("vue").ComputedRef<string>;
    handleStart: () => Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "update:modelValue")[], "change" | "update:modelValue", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    count: {
        type: NumberConstructor;
        default: number;
    };
    sendCodeApi: {
        type: PropType<() => Promise<boolean>>;
        default: null;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: string | number;
    count: number;
    sendCodeApi: () => Promise<boolean>;
}, {}>;
export default _default;
