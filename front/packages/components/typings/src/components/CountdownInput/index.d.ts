export declare const CountdownInput: {
    new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: (NumberConstructor | StringConstructor)[];
            default: string;
        };
        count: {
            type: NumberConstructor;
            default: number;
        };
        sendCodeApi: {
            type: import("vue").PropType<() => Promise<boolean>>;
            default: null;
        };
    }>> & {
        onChange?: ((...args: any[]) => any) | undefined;
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    }, {
        prefixCls: any;
        loading: import("vue").Ref<boolean>;
        isStart: import("vue").Ref<boolean>;
        innerValueRef: import("vue").Ref<any>;
        getButtonText: import("vue").ComputedRef<string>;
        handleStart: () => Promise<void>;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "update:modelValue")[], import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: (NumberConstructor | StringConstructor)[];
            default: string;
        };
        count: {
            type: NumberConstructor;
            default: number;
        };
        sendCodeApi: {
            type: import("vue").PropType<() => Promise<boolean>>;
            default: null;
        };
    }>> & {
        onChange?: ((...args: any[]) => any) | undefined;
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    }, {
        modelValue: string | number;
        count: number;
        sendCodeApi: () => Promise<boolean>;
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: (NumberConstructor | StringConstructor)[];
            default: string;
        };
        count: {
            type: NumberConstructor;
            default: number;
        };
        sendCodeApi: {
            type: import("vue").PropType<() => Promise<boolean>>;
            default: null;
        };
    }>> & {
        onChange?: ((...args: any[]) => any) | undefined;
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    }, {
        prefixCls: any;
        loading: import("vue").Ref<boolean>;
        isStart: import("vue").Ref<boolean>;
        innerValueRef: import("vue").Ref<any>;
        getButtonText: import("vue").ComputedRef<string>;
        handleStart: () => Promise<void>;
    }, {}, {}, {}, {
        modelValue: string | number;
        count: number;
        sendCodeApi: () => Promise<boolean>;
    }>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    count: {
        type: NumberConstructor;
        default: number;
    };
    sendCodeApi: {
        type: import("vue").PropType<() => Promise<boolean>>;
        default: null;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    prefixCls: any;
    loading: import("vue").Ref<boolean>;
    isStart: import("vue").Ref<boolean>;
    innerValueRef: import("vue").Ref<any>;
    getButtonText: import("vue").ComputedRef<string>;
    handleStart: () => Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "update:modelValue")[], "change" | "update:modelValue", {
    modelValue: string | number;
    count: number;
    sendCodeApi: () => Promise<boolean>;
}, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Plugin;
