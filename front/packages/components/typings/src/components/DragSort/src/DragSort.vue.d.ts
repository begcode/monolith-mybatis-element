declare const _default: import("vue").DefineComponent<{
    type: {
        type: StringConstructor;
        default: string;
    };
    params: {
        type: ObjectConstructor;
        default: () => {};
    };
    value: {
        type: NumberConstructor;
        default: number;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    remoteApi: {
        type: FunctionConstructor;
        default: null;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:value": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    type: {
        type: StringConstructor;
        default: string;
    };
    params: {
        type: ObjectConstructor;
        default: () => {};
    };
    value: {
        type: NumberConstructor;
        default: number;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    remoteApi: {
        type: FunctionConstructor;
        default: null;
    };
}>> & {
    "onUpdate:value"?: ((...args: any[]) => any) | undefined;
}, {
    type: string;
    disabled: boolean;
    value: number;
    params: Record<string, any>;
    remoteApi: Function;
}, {}>;
export default _default;
