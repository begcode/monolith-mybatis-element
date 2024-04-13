import { PropType, Component } from 'vue';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    size: {
        type: PropType<"" | "default" | "small" | "large">;
        default: undefined;
    };
    type: {
        type: PropType<import("element-plus/es/utils").EpPropMergeType<StringConstructor, "" | "default" | "text" | "success" | "warning" | "info" | "primary" | "danger", unknown>>;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    plain: {
        type: BooleanConstructor;
        default: boolean;
    };
    text: {
        type: BooleanConstructor;
        default: boolean;
    };
    bg: {
        type: BooleanConstructor;
        default: boolean;
    };
    link: {
        type: BooleanConstructor;
        default: boolean;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    circle: {
        type: BooleanConstructor;
        default: boolean;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    loadingIcon: {
        type: PropType<String | Component>;
        default: undefined;
    };
    icon: {
        type: PropType<String | Component>;
        default: undefined;
    };
    autofocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    nativeType: {
        type: PropType<"button" | "reset" | "submit">;
        default: string;
    };
    autoInsertSpace: {
        type: BooleanConstructor;
        default: boolean;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
    darker: {
        type: BooleanConstructor;
        default: boolean;
    };
    tag: {
        type: PropType<String | Component>;
        default: string;
    };
    onClick: {
        type: PropType<(...args: any[]) => any>;
        default: null;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    size: {
        type: PropType<"" | "default" | "small" | "large">;
        default: undefined;
    };
    type: {
        type: PropType<import("element-plus/es/utils").EpPropMergeType<StringConstructor, "" | "default" | "text" | "success" | "warning" | "info" | "primary" | "danger", unknown>>;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    plain: {
        type: BooleanConstructor;
        default: boolean;
    };
    text: {
        type: BooleanConstructor;
        default: boolean;
    };
    bg: {
        type: BooleanConstructor;
        default: boolean;
    };
    link: {
        type: BooleanConstructor;
        default: boolean;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    circle: {
        type: BooleanConstructor;
        default: boolean;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    loadingIcon: {
        type: PropType<String | Component>;
        default: undefined;
    };
    icon: {
        type: PropType<String | Component>;
        default: undefined;
    };
    autofocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    nativeType: {
        type: PropType<"button" | "reset" | "submit">;
        default: string;
    };
    autoInsertSpace: {
        type: BooleanConstructor;
        default: boolean;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
    darker: {
        type: BooleanConstructor;
        default: boolean;
    };
    tag: {
        type: PropType<String | Component>;
        default: string;
    };
    onClick: {
        type: PropType<(...args: any[]) => any>;
        default: null;
    };
}>> & {
    onClick?: ((...args: any[]) => any) | undefined;
}, {
    onClick: (...args: any[]) => any;
    type: import("element-plus/es/utils").EpPropMergeType<StringConstructor, "" | "default" | "text" | "success" | "warning" | "info" | "primary" | "danger", unknown>;
    icon: String | Component;
    color: string;
    size: "" | "default" | "small" | "large";
    link: boolean;
    circle: boolean;
    text: boolean;
    bg: boolean;
    disabled: boolean;
    nativeType: "button" | "reset" | "submit";
    loading: boolean;
    loadingIcon: String | Component;
    plain: boolean;
    autofocus: boolean;
    round: boolean;
    autoInsertSpace: boolean;
    tag: String | Component;
    darker: boolean;
}, {}>, {
    default?(_: {}): any;
    icon?(_: {}): any;
    loading?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
