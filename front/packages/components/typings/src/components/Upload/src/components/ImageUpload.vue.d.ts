declare const _default: import("vue").DefineComponent<{
    api: {
        type: PropType<PromiseFn>;
        default: null;
        required: boolean;
    };
    uploadName: {
        type: StringConstructor;
        default: string;
        required: boolean;
    };
    helpText: {
        type: StringConstructor;
        default: string;
    };
    maxSize: {
        type: NumberConstructor;
        default: number;
    };
    maxNumber: {
        type: NumberConstructor;
        default: number;
    };
    accept: {
        type: PropType<string[]>;
        default: () => never[];
    };
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    uploadParams: {
        type: PropType<Recordable>;
        default: {};
    };
    listType: {
        type: PropType<ListType>;
        default: string;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    delete: (...args: any[]) => void;
    change: (...args: any[]) => void;
    "update:value": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    api: {
        type: PropType<PromiseFn>;
        default: null;
        required: boolean;
    };
    uploadName: {
        type: StringConstructor;
        default: string;
        required: boolean;
    };
    helpText: {
        type: StringConstructor;
        default: string;
    };
    maxSize: {
        type: NumberConstructor;
        default: number;
    };
    maxNumber: {
        type: NumberConstructor;
        default: number;
    };
    accept: {
        type: PropType<string[]>;
        default: () => never[];
    };
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    uploadParams: {
        type: PropType<Recordable>;
        default: {};
    };
    listType: {
        type: PropType<ListType>;
        default: string;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:value"?: ((...args: any[]) => any) | undefined;
    onDelete?: ((...args: any[]) => any) | undefined;
}, {
    disabled: boolean;
    multiple: boolean;
    accept: any;
    listType: any;
    api: any;
    uploadName: string;
    helpText: string;
    maxSize: number;
    maxNumber: number;
    uploadParams: any;
}, {}>;
export default _default;
