declare const _default: import("vue").DefineComponent<{
    strength: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    modelValue: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    strength: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    modelValue: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: string;
    strength: boolean;
}, {}>;
export default _default;
