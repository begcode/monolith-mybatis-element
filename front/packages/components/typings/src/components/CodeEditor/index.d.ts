export declare const CodeEditor: {
    new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
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
    }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        change: (...args: any[]) => void;
        "update:value": (...args: any[]) => void;
        "format-error": (...args: any[]) => void;
    }, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
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
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
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
    }, {}, {}, {}, {}, {
        value: any;
        language: string;
        showErrorMsg: boolean;
        readonly: boolean;
        autoFormat: boolean;
        bordered: boolean;
    }>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
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
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (...args: any[]) => void;
    "update:value": (...args: any[]) => void;
    "format-error": (...args: any[]) => void;
}, string, {
    value: any;
    language: string;
    showErrorMsg: boolean;
    readonly: boolean;
    autoFormat: boolean;
    bordered: boolean;
}, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Plugin;
export * from './src/typing';
