declare const _default: import("vue").DefineComponent<{
    value: {
        type: PropType<string | Record<string, any>>;
    };
    language: {
        type: StringConstructor;
        default: string;
    };
    showErrorMsg: {
        type: BooleanConstructor;
        default: boolean;
    };
    readonly: {
        type: BooleanConstructor;
    };
    autoFormat: {
        type: BooleanConstructor;
        default: boolean;
    };
    bordered: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (...args: any[]) => void;
    "update:value": (...args: any[]) => void;
    "format-error": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    value: {
        type: PropType<string | Record<string, any>>;
    };
    language: {
        type: StringConstructor;
        default: string;
    };
    showErrorMsg: {
        type: BooleanConstructor;
        default: boolean;
    };
    readonly: {
        type: BooleanConstructor;
    };
    autoFormat: {
        type: BooleanConstructor;
        default: boolean;
    };
    bordered: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:value"?: ((...args: any[]) => any) | undefined;
    "onFormat-error"?: ((...args: any[]) => any) | undefined;
}, {
    value: any;
    language: string;
    showErrorMsg: boolean;
    readonly: boolean;
    autoFormat: boolean;
    bordered: boolean;
}, {}>;
export default _default;
