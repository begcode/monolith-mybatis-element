import { PropType } from 'vue';
import { InfoTipSchema } from './types';
declare const _default: import("vue").DefineComponent<{
    title: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    schema: {
        type: PropType<(string | InfoTipSchema)[]>;
        required: true;
        default: () => never[];
    };
    showIndex: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    highlightColor: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    title: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    schema: {
        type: PropType<(string | InfoTipSchema)[]>;
        required: true;
        default: () => never[];
    };
    showIndex: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    highlightColor: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
}>> & {
    onClick?: ((...args: any[]) => any) | undefined;
}, {
    title: string;
    schema: (string | InfoTipSchema)[];
    showIndex: boolean;
    highlightColor: string;
}, {}>;
export default _default;
