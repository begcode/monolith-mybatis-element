import type { FileBasicColumn } from '../typing';
declare const _default: import("vue").DefineComponent<{
    prefixCls: StringConstructor;
}, {
    fileListRef: import("vue").Ref<{
        url: string;
        name: string;
        type: string;
    }[]>;
    columns: FileBasicColumn[];
    actionColumn: FileBasicColumn;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("delete" | "register" | "list-change")[], "delete" | "register" | "list-change", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    prefixCls: StringConstructor;
}>> & {
    onDelete?: ((...args: any[]) => any) | undefined;
    onRegister?: ((...args: any[]) => any) | undefined;
    "onList-change"?: ((...args: any[]) => any) | undefined;
}, {}, {}>;
export default _default;
