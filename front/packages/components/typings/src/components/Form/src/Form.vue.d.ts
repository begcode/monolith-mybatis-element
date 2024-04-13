import { PropType } from 'vue';
import { FormSchema } from './types';
declare const _default: import("vue").DefineComponent<{
    schema: {
        type: PropType<FormSchema[]>;
        default: () => never[];
    };
    isCol: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    model: {
        type: PropType<any>;
        default: () => {};
    };
    autoSetPlaceholder: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    isCustom: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    labelWidth: import("vue-types").VueTypeDef<string | number> & {
        default: string | number;
    };
    rules: {
        type: PropType<Partial<Record<string, import("element-plus/es/utils").Arrayable<import("element-plus").FormItemRule>>>>;
        default: () => {};
    };
    labelPosition: import("vue-types").VueTypeDef<string> & {
        default: string;
    };
    labelSuffix: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    hideRequiredAsterisk: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    requireAsteriskPosition: import("vue-types").VueTypeDef<string> & {
        default: string;
    };
    showMessage: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    inlineMessage: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    statusIcon: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    validateOnRuleChange: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    size: {
        type: PropType<"" | "default" | "small" | "large">;
        default: undefined;
    };
    disabled: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    scrollToError: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    scrollToErrorOffset: import("vue-types").VueTypeDef<boolean | {
        [key: string]: any;
    }> & {
        default: boolean | (() => {
            [key: string]: any;
        });
    };
}, () => any, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "register"[], "register", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    schema: {
        type: PropType<FormSchema[]>;
        default: () => never[];
    };
    isCol: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    model: {
        type: PropType<any>;
        default: () => {};
    };
    autoSetPlaceholder: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    isCustom: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    labelWidth: import("vue-types").VueTypeDef<string | number> & {
        default: string | number;
    };
    rules: {
        type: PropType<Partial<Record<string, import("element-plus/es/utils").Arrayable<import("element-plus").FormItemRule>>>>;
        default: () => {};
    };
    labelPosition: import("vue-types").VueTypeDef<string> & {
        default: string;
    };
    labelSuffix: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    hideRequiredAsterisk: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    requireAsteriskPosition: import("vue-types").VueTypeDef<string> & {
        default: string;
    };
    showMessage: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    inlineMessage: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    statusIcon: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    validateOnRuleChange: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    size: {
        type: PropType<"" | "default" | "small" | "large">;
        default: undefined;
    };
    disabled: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    scrollToError: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    scrollToErrorOffset: import("vue-types").VueTypeDef<boolean | {
        [key: string]: any;
    }> & {
        default: boolean | (() => {
            [key: string]: any;
        });
    };
}>> & {
    onRegister?: ((...args: any[]) => any) | undefined;
}, {
    size: "" | "default" | "small" | "large";
    disabled: boolean;
    model: any;
    schema: FormSchema[];
    labelWidth: string | number;
    rules: Partial<Record<string, import("element-plus/es/utils").Arrayable<import("element-plus").FormItemRule>>>;
    inlineMessage: boolean;
    showMessage: boolean;
    labelPosition: string;
    requireAsteriskPosition: string;
    labelSuffix: string;
    statusIcon: boolean;
    validateOnRuleChange: boolean;
    hideRequiredAsterisk: boolean;
    scrollToError: boolean;
    isCol: boolean;
    autoSetPlaceholder: boolean;
    isCustom: boolean;
    scrollToErrorOffset: boolean | {
        [key: string]: any;
    };
}, {}>;
export default _default;
