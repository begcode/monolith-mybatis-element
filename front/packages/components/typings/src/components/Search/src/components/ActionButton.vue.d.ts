declare const _default: import("vue").DefineComponent<{
    showSearch: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    showReset: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    showExpand: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    visible: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    searchLoading: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    resetLoading: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    search: (...args: any[]) => void;
    reset: (...args: any[]) => void;
    expand: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    showSearch: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    showReset: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    showExpand: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    visible: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    searchLoading: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    resetLoading: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
}>> & {
    onReset?: ((...args: any[]) => any) | undefined;
    onSearch?: ((...args: any[]) => any) | undefined;
    onExpand?: ((...args: any[]) => any) | undefined;
}, {
    visible: boolean;
    showSearch: boolean;
    showReset: boolean;
    showExpand: boolean;
    searchLoading: boolean;
    resetLoading: boolean;
}, {}>;
export default _default;
