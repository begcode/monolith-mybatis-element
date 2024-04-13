import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    startVal: import("vue-types").VueTypeValidableDef<number, import("vue-types/dist/types").ValidatorFunction<number>> & {
        default: number;
    } & {
        default: number;
    };
    endVal: import("vue-types").VueTypeValidableDef<number, import("vue-types/dist/types").ValidatorFunction<number>> & {
        default: number;
    } & {
        default: number;
    };
    duration: import("vue-types").VueTypeValidableDef<number, import("vue-types/dist/types").ValidatorFunction<number>> & {
        default: number;
    } & {
        default: number;
    };
    autoplay: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    decimals: import("vue-types").VueTypeValidableDef<number, import("vue-types/dist/types").ValidatorFunction<number>> & {
        default: number;
    } & {
        validator: import("vue-types/dist/types").ValidatorFunction<number>;
    } & {
        default: number;
    };
    decimal: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    separator: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    prefix: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    suffix: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    useEasing: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    easingFn: {
        type: PropType<(t: number, b: number, c: number, d: number) => number>;
        default(t: number, b: number, c: number, d: number): number;
    };
}, {
    pauseResume: () => void;
    reset: () => void;
    start: () => void;
    pause: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    mounted: (...args: any[]) => void;
    callback: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    startVal: import("vue-types").VueTypeValidableDef<number, import("vue-types/dist/types").ValidatorFunction<number>> & {
        default: number;
    } & {
        default: number;
    };
    endVal: import("vue-types").VueTypeValidableDef<number, import("vue-types/dist/types").ValidatorFunction<number>> & {
        default: number;
    } & {
        default: number;
    };
    duration: import("vue-types").VueTypeValidableDef<number, import("vue-types/dist/types").ValidatorFunction<number>> & {
        default: number;
    } & {
        default: number;
    };
    autoplay: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    decimals: import("vue-types").VueTypeValidableDef<number, import("vue-types/dist/types").ValidatorFunction<number>> & {
        default: number;
    } & {
        validator: import("vue-types/dist/types").ValidatorFunction<number>;
    } & {
        default: number;
    };
    decimal: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    separator: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    prefix: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    suffix: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    useEasing: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    easingFn: {
        type: PropType<(t: number, b: number, c: number, d: number) => number>;
        default(t: number, b: number, c: number, d: number): number;
    };
}>> & {
    onMounted?: ((...args: any[]) => any) | undefined;
    onCallback?: ((...args: any[]) => any) | undefined;
}, {
    startVal: number;
    endVal: number;
    duration: number;
    autoplay: boolean;
    decimals: number;
    decimal: string;
    separator: string;
    prefix: string;
    suffix: string;
    useEasing: boolean;
    easingFn: (t: number, b: number, c: number, d: number) => number;
}, {}>;
export default _default;
