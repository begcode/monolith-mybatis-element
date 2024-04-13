import { CSSProperties } from 'vue';
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: PropType<string[]>;
        default: () => never[];
    };
    showThumb: {
        type: BooleanConstructor;
        default: boolean;
    };
    thumbSize: {
        type: NumberConstructor;
        default: number;
    };
    showPreview: {
        type: BooleanConstructor;
        default: boolean;
    };
    showPreviewNumber: {
        type: BooleanConstructor;
        default: boolean;
    };
    emptyHidePreview: {
        type: BooleanConstructor;
        default: boolean;
    };
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
}, {
    prefixCls: any;
    fileList: import("vue").Ref<string[]>;
    showPreview: import("vue").ComputedRef<boolean>;
    getProps: import("vue").ComputedRef<{
        disabled: boolean;
        modelValue: any;
        multiple: boolean;
        accept: any;
        listType: any;
        api: any;
        uploadName: string;
        helpText: string;
        maxSize: number;
        maxNumber: number;
        uploadParams: any;
        showThumb: boolean;
        thumbSize: number;
        showPreview: boolean;
        showPreviewNumber: boolean;
        emptyHidePreview: boolean;
        onChange: ((...args: any[]) => any) | undefined;
        "onUpdate:modelValue": ((...args: any[]) => any) | undefined;
        onDelete: ((...args: any[]) => any) | undefined;
        "onPreview-delete": ((...args: any[]) => any) | undefined;
    }>;
    getBindValues: import("vue").ComputedRef<Partial<{
        disabled: boolean;
        modelValue: any;
        multiple: boolean;
        accept: any;
        listType: any;
        api: any;
        uploadName: string;
        helpText: string;
        maxSize: number;
        maxNumber: number;
        uploadParams: any;
        showThumb: boolean;
        thumbSize: number;
        showPreview: boolean;
        showPreviewNumber: boolean;
        emptyHidePreview: boolean;
        onChange: ((...args: any[]) => any) | undefined;
        "onUpdate:modelValue": ((...args: any[]) => any) | undefined;
        onDelete: ((...args: any[]) => any) | undefined;
        "onPreview-delete": ((...args: any[]) => any) | undefined;
    }>>;
    getThumbStyle: import("vue").ComputedRef<CSSProperties>;
    registerUploadModal: any;
    openUpload: () => void;
    handleChange: (urls: string[]) => void;
    handlePreviewChange: (urls: string[]) => void;
    registerPreviewModal: any;
    openPreview: () => void;
    handleDelete: (record: Recordable) => void;
    handlePreviewDelete: (url: string) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("delete" | "change" | "update:modelValue" | "preview-delete")[], "delete" | "change" | "update:modelValue" | "preview-delete", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: PropType<string[]>;
        default: () => never[];
    };
    showThumb: {
        type: BooleanConstructor;
        default: boolean;
    };
    thumbSize: {
        type: NumberConstructor;
        default: number;
    };
    showPreview: {
        type: BooleanConstructor;
        default: boolean;
    };
    showPreviewNumber: {
        type: BooleanConstructor;
        default: boolean;
    };
    emptyHidePreview: {
        type: BooleanConstructor;
        default: boolean;
    };
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
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onDelete?: ((...args: any[]) => any) | undefined;
    "onPreview-delete"?: ((...args: any[]) => any) | undefined;
}, {
    disabled: boolean;
    modelValue: any;
    multiple: boolean;
    accept: any;
    listType: any;
    api: any;
    uploadName: string;
    helpText: string;
    maxSize: number;
    maxNumber: number;
    uploadParams: any;
    showThumb: boolean;
    thumbSize: number;
    showPreview: boolean;
    showPreviewNumber: boolean;
    emptyHidePreview: boolean;
}, {}>;
export default _default;
