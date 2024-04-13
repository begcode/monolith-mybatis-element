import { PropType } from 'vue';
import { IDomEditor, IEditorConfig } from '@wangeditor/editor';
declare const _default: import("vue").DefineComponent<{
    editorId: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    height: import("vue-types").VueTypeDef<string | number> & {
        default: string | number;
    };
    editorConfig: {
        type: PropType<IEditorConfig>;
        default: () => undefined;
    };
    modelValue: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
}, {
    getEditorRef: () => Promise<IDomEditor>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (...args: any[]) => void;
    "update:modelValue": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    editorId: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    height: import("vue-types").VueTypeDef<string | number> & {
        default: string | number;
    };
    editorConfig: {
        type: PropType<IEditorConfig>;
        default: () => undefined;
    };
    modelValue: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    height: string | number;
    modelValue: string;
    editorId: string;
    editorConfig: IEditorConfig;
}, {}>;
export default _default;
