import { PropType } from 'vue';
import { DescriptionsSchema } from './types';
declare const _default: import("vue").DefineComponent<{
    title: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    message: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    collapse: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    border: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    column: import("vue-types").VueTypeValidableDef<number, import("vue-types/dist/types").ValidatorFunction<number>> & {
        default: number;
    } & {
        default: number;
    };
    size: import("vue-types").VueTypeDef<string> & {
        default: string;
    };
    direction: import("vue-types").VueTypeDef<string> & {
        default: string;
    };
    extra: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    schema: {
        type: PropType<DescriptionsSchema[]>;
        default: () => never[];
    };
    data: {
        type: PropType<any>;
        default: () => {};
    };
    hidden: import("vue-types").VueTypeDef<boolean | Function> & {
        default: boolean | Function;
    };
}, () => any, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    title: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    message: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    collapse: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    border: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    column: import("vue-types").VueTypeValidableDef<number, import("vue-types/dist/types").ValidatorFunction<number>> & {
        default: number;
    } & {
        default: number;
    };
    size: import("vue-types").VueTypeDef<string> & {
        default: string;
    };
    direction: import("vue-types").VueTypeDef<string> & {
        default: string;
    };
    extra: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    schema: {
        type: PropType<DescriptionsSchema[]>;
        default: () => never[];
    };
    data: {
        type: PropType<any>;
        default: () => {};
    };
    hidden: import("vue-types").VueTypeDef<boolean | Function> & {
        default: boolean | Function;
    };
}>>, {
    size: string;
    data: any;
    title: string;
    message: string;
    border: boolean;
    direction: string;
    schema: DescriptionsSchema[];
    collapse: boolean;
    column: number;
    extra: string;
    hidden: boolean | Function;
}, {}>;
export default _default;
