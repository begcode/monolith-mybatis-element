declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    modelValue: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    title: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    fullscreen: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    maxHeight: import("vue-types").VueTypeDef<string | number> & {
        default: string | number;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    title: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    fullscreen: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    maxHeight: import("vue-types").VueTypeDef<string | number> & {
        default: string | number;
    };
}>>, {
    title: string;
    modelValue: boolean;
    maxHeight: string | number;
    fullscreen: boolean;
}, {}>, {
    title?(_: {}): any;
    default?(_: {}): any;
    footer?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
