declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: StringConstructor;
        default: string;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    select: (...args: any[]) => void;
    change: (...args: any[]) => void;
    "update:modelValue": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    onSelect?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: string;
}, {}>;
export default _default;
