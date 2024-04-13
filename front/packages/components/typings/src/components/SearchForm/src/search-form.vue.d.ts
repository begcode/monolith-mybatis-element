declare const _default: import("vue").DefineComponent<{
    config: {
        type: ObjectConstructor;
        required: true;
        default: () => {};
    };
    callback: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    saveCode: {
        type: StringConstructor;
        default: null;
    };
}, {
    showSettingModal: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    close: (...args: any[]) => void;
    formSearch: (...args: any[]) => void;
    export: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    config: {
        type: ObjectConstructor;
        required: true;
        default: () => {};
    };
    callback: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    saveCode: {
        type: StringConstructor;
        default: null;
    };
}>> & {
    onClose?: ((...args: any[]) => any) | undefined;
    onFormSearch?: ((...args: any[]) => any) | undefined;
    onExport?: ((...args: any[]) => any) | undefined;
}, {
    loading: boolean;
    callback: string;
    config: Record<string, any>;
    saveCode: string;
}, {}>;
export default _default;
