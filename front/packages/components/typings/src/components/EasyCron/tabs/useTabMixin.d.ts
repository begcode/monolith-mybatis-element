export declare enum TypeEnum {
    unset = "UNSET",
    every = "EVERY",
    range = "RANGE",
    loop = "LOOP",
    work = "WORK",
    last = "LAST",
    specify = "SPECIFY"
}
export declare function useTabProps(options: any): any;
export declare function useTabEmits(): string[];
export declare function useTabSetup(props: any, context: any, options: any): {
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
};
