declare const _default: import("vue").DefineComponent<{
    data: import("vue-types").VueTypeDef<any[]>;
    reset: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    width: import("vue-types").VueTypeValidableDef<number, import("vue-types/dist/types").ValidatorFunction<number>> & {
        default: number;
    } & {
        default: number;
    };
    gap: import("vue-types").VueTypeValidableDef<number, import("vue-types/dist/types").ValidatorFunction<number>> & {
        default: number;
    } & {
        default: number;
    };
    props: import("vue-types").VueTypeDef<{
        [key: string]: string | null | undefined;
    }> & {
        default: () => {
            [key: string]: string | null | undefined;
        };
    };
    cols: import("vue-types").VueTypeValidableDef<number, import("vue-types/dist/types").ValidatorFunction<number>> & {
        default: number;
    } & {
        default: number;
    };
    loadingText: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    loading: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    end: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    endText: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    autoCenter: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    layout: import("vue-types").VueTypeDef<string> & {
        default: string;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    loadMore: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    data: import("vue-types").VueTypeDef<any[]>;
    reset: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    width: import("vue-types").VueTypeValidableDef<number, import("vue-types/dist/types").ValidatorFunction<number>> & {
        default: number;
    } & {
        default: number;
    };
    gap: import("vue-types").VueTypeValidableDef<number, import("vue-types/dist/types").ValidatorFunction<number>> & {
        default: number;
    } & {
        default: number;
    };
    props: import("vue-types").VueTypeDef<{
        [key: string]: string | null | undefined;
    }> & {
        default: () => {
            [key: string]: string | null | undefined;
        };
    };
    cols: import("vue-types").VueTypeValidableDef<number, import("vue-types/dist/types").ValidatorFunction<number>> & {
        default: number;
    } & {
        default: number;
    };
    loadingText: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    loading: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    end: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    endText: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    autoCenter: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    layout: import("vue-types").VueTypeDef<string> & {
        default: string;
    };
}>> & {
    onLoadMore?: ((...args: any[]) => any) | undefined;
}, {
    props: {
        [key: string]: string | null | undefined;
    };
    width: number;
    loading: boolean;
    reset: boolean;
    end: boolean;
    loadingText: string;
    layout: string;
    gap: number;
    cols: number;
    endText: string;
    autoCenter: boolean;
}, {}>;
export default _default;
