import { TypeEnum } from './useTabMixin';
declare const _default: import("vue").DefineComponent<any, {
    weekOptions: import("vue").ComputedRef<{
        label: string;
        value: number;
    }[]>;
    typeLoopSelectAttrs: import("vue").ComputedRef<{
        class: string[];
        disabled: any;
    }>;
    typeRangeSelectAttrs: import("vue").ComputedRef<{
        class: string[];
        disabled: any;
    }>;
    WEEK_MAP_CN: {
        '1': string;
        '2': string;
        '3': string;
        '4': string;
        '5': string;
        '6': string;
        '7': string;
    };
    WEEK_MAP_EN: {
        '1': string;
        '2': string;
        '3': string;
        '4': string;
        '5': string;
        '6': string;
        '7': string;
    };
    type: import("vue").Ref<any>;
    TypeEnum: typeof TypeEnum;
    prefixCls: unknown;
    defaultValue: import("vue").Ref<any>;
    valueRange: any;
    valueLoop: any;
    valueWeek: any;
    valueList: import("vue").Ref<any[]>;
    valueWork: import("vue").Ref<any>;
    maxValue: import("vue").Ref<any>;
    minValue: import("vue").Ref<any>;
    computeValue: import("vue").ComputedRef<any>;
    specifyRange: import("vue").ComputedRef<number[]>;
    updateValue: (value: any) => void;
    parseValue: (value: any) => void;
    beforeRadioAttrs: import("vue").ComputedRef<{
        class: string[];
        disabled: any;
    }>;
    inputNumberAttrs: import("vue").ComputedRef<{
        class: string[];
        max: any;
        min: any;
        precision: number;
    }>;
    typeRangeAttrs: import("vue").ComputedRef<{
        class: string[];
        max: any;
        min: any;
        precision: number;
        disabled: any;
    }>;
    typeLoopAttrs: import("vue").ComputedRef<{
        class: string[];
        max: any;
        min: any;
        precision: number;
        disabled: any;
    }>;
    typeSpecifyAttrs: import("vue").ComputedRef<{
        disabled: any;
        class: string[];
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[], string, import("vue").PublicProps, Readonly<any> & {
    [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
}, {} | {
    [x: string]: any;
}, {}>;
export default _default;
