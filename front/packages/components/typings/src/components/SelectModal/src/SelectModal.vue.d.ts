import type { PropType } from 'vue';
import type { VxeGridInstance } from 'vxe-table/types/grid';
declare const _default: import("vue").DefineComponent<{
    value: {
        type: (NumberConstructor | ObjectConstructor | StringConstructor | ArrayConstructor)[];
    };
    disabled: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    loading: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    maxTagCount: import("vue-types").VueTypeValidableDef<number, import("vue-types/dist/types").ValidatorFunction<number>> & {
        default: number;
    };
    buttonIcon: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    modalTitle: {
        type: StringConstructor;
        default: string;
    };
    showComponentName: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    componentName: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    api: import("vue-types").VueTypeValidableDef<(...args: any[]) => any, import("vue-types/dist/types").ValidatorFunction<(...args: any[]) => any>> & {
        default: (...args: any[]) => any;
    };
    resultField: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    fieldNames: import("vue-types").VueTypeValidableDef<{
        [key: string]: any;
    }, import("vue-types/dist/types").ValidatorFunction<{
        [key: string]: any;
    }>> & {
        default: () => {
            [key: string]: any;
        };
    } & {
        default: () => {
            [key: string]: any;
        };
    };
    labelInValue: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    checkStrictly: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    container: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    avatarSlotName: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    avatarSlotField: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    avatarTipField: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    queryNames: import("vue-types").VueTypeDef<(string | null | undefined)[]> & {
        default: () => (string | null | undefined)[];
    };
    xGrid: {
        type: PropType<VxeGridInstance>;
    };
    row: {
        type: ObjectConstructor;
        default: null;
    };
    column: {
        type: ObjectConstructor;
        default: {};
    };
    rowIdField: {
        type: StringConstructor;
        default: string;
    };
    source: {
        type: StringConstructor;
        default: string;
    };
    gridCustomConfig: import("vue-types").VueTypeValidableDef<{
        [key: string]: any;
    }, import("vue-types/dist/types").ValidatorFunction<{
        [key: string]: any;
    }>> & {
        default: () => {
            [key: string]: any;
        };
    } & {
        default: () => {
            [key: string]: any;
        };
    };
    searchFormOptions: import("vue-types").VueTypeValidableDef<{
        [key: string]: any;
    }, import("vue-types/dist/types").ValidatorFunction<{
        [key: string]: any;
    }>> & {
        default: () => {
            [key: string]: any;
        };
    } & {
        default: () => {
            [key: string]: any;
        };
    };
    gridOptions: import("vue-types").VueTypeValidableDef<{
        [key: string]: any;
    }, import("vue-types/dist/types").ValidatorFunction<{
        [key: string]: any;
    }>> & {
        default: () => {
            [key: string]: any;
        };
    } & {
        default: () => {
            [key: string]: any;
        };
    };
    updateType: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    valueType: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (...args: any[]) => void;
    "update:modelValue": (...args: any[]) => void;
    handleOpen: (...args: any[]) => void;
    register: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    value: {
        type: (NumberConstructor | ObjectConstructor | StringConstructor | ArrayConstructor)[];
    };
    disabled: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    loading: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    maxTagCount: import("vue-types").VueTypeValidableDef<number, import("vue-types/dist/types").ValidatorFunction<number>> & {
        default: number;
    };
    buttonIcon: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    modalTitle: {
        type: StringConstructor;
        default: string;
    };
    showComponentName: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    componentName: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    api: import("vue-types").VueTypeValidableDef<(...args: any[]) => any, import("vue-types/dist/types").ValidatorFunction<(...args: any[]) => any>> & {
        default: (...args: any[]) => any;
    };
    resultField: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    fieldNames: import("vue-types").VueTypeValidableDef<{
        [key: string]: any;
    }, import("vue-types/dist/types").ValidatorFunction<{
        [key: string]: any;
    }>> & {
        default: () => {
            [key: string]: any;
        };
    } & {
        default: () => {
            [key: string]: any;
        };
    };
    labelInValue: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    checkStrictly: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    container: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    avatarSlotName: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    avatarSlotField: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    avatarTipField: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    queryNames: import("vue-types").VueTypeDef<(string | null | undefined)[]> & {
        default: () => (string | null | undefined)[];
    };
    xGrid: {
        type: PropType<VxeGridInstance>;
    };
    row: {
        type: ObjectConstructor;
        default: null;
    };
    column: {
        type: ObjectConstructor;
        default: {};
    };
    rowIdField: {
        type: StringConstructor;
        default: string;
    };
    source: {
        type: StringConstructor;
        default: string;
    };
    gridCustomConfig: import("vue-types").VueTypeValidableDef<{
        [key: string]: any;
    }, import("vue-types/dist/types").ValidatorFunction<{
        [key: string]: any;
    }>> & {
        default: () => {
            [key: string]: any;
        };
    } & {
        default: () => {
            [key: string]: any;
        };
    };
    searchFormOptions: import("vue-types").VueTypeValidableDef<{
        [key: string]: any;
    }, import("vue-types/dist/types").ValidatorFunction<{
        [key: string]: any;
    }>> & {
        default: () => {
            [key: string]: any;
        };
    } & {
        default: () => {
            [key: string]: any;
        };
    };
    gridOptions: import("vue-types").VueTypeValidableDef<{
        [key: string]: any;
    }, import("vue-types/dist/types").ValidatorFunction<{
        [key: string]: any;
    }>> & {
        default: () => {
            [key: string]: any;
        };
    } & {
        default: () => {
            [key: string]: any;
        };
    };
    updateType: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
    valueType: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onRegister?: ((...args: any[]) => any) | undefined;
    onHandleOpen?: ((...args: any[]) => any) | undefined;
}, {
    source: string;
    disabled: boolean;
    loading: boolean;
    container: string;
    placeholder: string;
    column: Record<string, any>;
    row: Record<string, any>;
    multiple: boolean;
    checkStrictly: boolean;
    labelInValue: boolean;
    api: (...args: any[]) => any;
    fieldNames: {
        [key: string]: any;
    };
    maxTagCount: number;
    buttonIcon: string;
    modalTitle: string;
    showComponentName: string;
    componentName: string;
    resultField: string;
    avatarSlotName: string;
    avatarSlotField: string;
    avatarTipField: string;
    queryNames: (string | null | undefined)[];
    rowIdField: string;
    gridCustomConfig: {
        [key: string]: any;
    };
    searchFormOptions: {
        [key: string]: any;
    };
    gridOptions: {
        [key: string]: any;
    };
    updateType: string;
    valueType: string;
}, {}>;
export default _default;
