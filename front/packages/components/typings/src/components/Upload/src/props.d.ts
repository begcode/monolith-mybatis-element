import { FileBasicColumn } from './typing';
export declare const uploadProps: {
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
};
export declare const fileListProps: {
    columns: {
        type: PropType<FileBasicColumn[]>;
        default: null;
    };
    actionColumn: {
        type: PropType<FileBasicColumn>;
        default: null;
    };
    dataSource: {
        type: PropType<Recordable[]>;
        default: null;
    };
};
export declare const customProps: {
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
};
export declare const basicProps: {
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
};
