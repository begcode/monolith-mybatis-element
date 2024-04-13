import { UploadResultStatus } from '../typing';
declare const _default: import("vue").DefineComponent<{
    prefixCls: StringConstructor;
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
    columns: import("../typing").FileBasicColumn[];
    actionColumn: import("../typing").FileBasicColumn;
    register: any;
    closeModal: any;
    getHelpText: import("vue").ComputedRef<string>;
    getStringAccept: import("vue").ComputedRef<string>;
    getConfirmProps: import("vue").ComputedRef<ElButton>;
    getCancelProps: import("vue").ComputedRef<ElButton>;
    beforeUpload: (file: File) => false | undefined;
    getUploadState: import("vue").ComputedRef<boolean>;
    fileListRef: import("vue").Ref<{
        thumbUrl?: string | undefined;
        name: string;
        type?: string | undefined;
        size: string | number;
        percent: number;
        file: {
            readonly lastModified: number;
            readonly name: string;
            readonly webkitRelativePath: string;
            readonly size: number;
            readonly type: string;
            arrayBuffer: () => Promise<ArrayBuffer>;
            slice: (start?: number | undefined, end?: number | undefined, contentType?: string | undefined) => Blob;
            stream: () => ReadableStream<Uint8Array>;
            text: () => Promise<string>;
        };
        status?: UploadResultStatus | undefined;
        responseData?: any;
        uuid: string;
    }[]>;
    isUploadingRef: import("vue").Ref<boolean>;
    handleStartUpload: () => Promise<void>;
    handleConfirm: () => any;
    handleCloseFn: () => Promise<boolean>;
    getIsSelectFile: import("vue").ComputedRef<boolean>;
    getUploadBtnText: import("vue").ComputedRef<"上传中" | "重新上传失败文件" | "开始上传">;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("delete" | "change" | "register")[], "delete" | "change" | "register", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    prefixCls: StringConstructor;
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
    onDelete?: ((...args: any[]) => any) | undefined;
    onRegister?: ((...args: any[]) => any) | undefined;
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
