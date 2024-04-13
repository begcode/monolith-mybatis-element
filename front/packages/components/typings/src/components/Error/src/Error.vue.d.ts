declare const _default: import("vue").DefineComponent<{
    type: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        validator: import("vue-types/dist/types").ValidatorFunction<string>;
    } & {
        default: string;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    errorClick: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    type: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        validator: import("vue-types/dist/types").ValidatorFunction<string>;
    } & {
        default: string;
    };
}>> & {
    onErrorClick?: ((...args: any[]) => any) | undefined;
}, {
    type: string;
}, {}>;
export default _default;
