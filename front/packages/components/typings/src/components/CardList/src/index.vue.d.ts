declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    modelValue: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    data: {
        type: ArrayConstructor;
        default: () => never[];
    };
    width: {
        type: StringConstructor;
        default: string;
    };
    columns: {
        type: NumberConstructor;
        default: number;
    };
    fixedColumn: {
        type: BooleanConstructor;
        default: boolean;
    };
    gridGap: {
        type: NumberConstructor;
        default: number;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    keyId: {
        type: StringConstructor;
        default: string;
    };
    highlight: {
        type: BooleanConstructor;
        default: boolean;
    };
    rowClass: {
        type: (ObjectConstructor | StringConstructor)[];
        default: string;
    };
    toolButtons: {
        type: ArrayConstructor;
        default: () => never[];
    };
    imageField: {
        type: StringConstructor;
        default: string;
    };
    rowOperations: {
        type: ArrayConstructor;
        default: () => never[];
    };
    showAvatar: {
        type: BooleanConstructor;
        default: boolean;
    };
    showDesc: {
        type: BooleanConstructor;
        default: boolean;
    };
    metaDesc: {
        type: (StringConstructor | FunctionConstructor)[];
        default: string;
    };
    metaTitle: {
        type: (StringConstructor | FunctionConstructor)[];
        default: string;
    };
    metaAvatar: {
        type: (StringConstructor | FunctionConstructor)[];
        default: string;
    };
    imageConfig: {
        type: ObjectConstructor;
        default: () => {
            preview: boolean;
        };
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (...args: any[]) => void;
    scroll: (...args: any[]) => void;
    mouseenter: (...args: any[]) => void;
    mouseleave: (...args: any[]) => void;
    "update:modelValue": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    data: {
        type: ArrayConstructor;
        default: () => never[];
    };
    width: {
        type: StringConstructor;
        default: string;
    };
    columns: {
        type: NumberConstructor;
        default: number;
    };
    fixedColumn: {
        type: BooleanConstructor;
        default: boolean;
    };
    gridGap: {
        type: NumberConstructor;
        default: number;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    keyId: {
        type: StringConstructor;
        default: string;
    };
    highlight: {
        type: BooleanConstructor;
        default: boolean;
    };
    rowClass: {
        type: (ObjectConstructor | StringConstructor)[];
        default: string;
    };
    toolButtons: {
        type: ArrayConstructor;
        default: () => never[];
    };
    imageField: {
        type: StringConstructor;
        default: string;
    };
    rowOperations: {
        type: ArrayConstructor;
        default: () => never[];
    };
    showAvatar: {
        type: BooleanConstructor;
        default: boolean;
    };
    showDesc: {
        type: BooleanConstructor;
        default: boolean;
    };
    metaDesc: {
        type: (StringConstructor | FunctionConstructor)[];
        default: string;
    };
    metaTitle: {
        type: (StringConstructor | FunctionConstructor)[];
        default: string;
    };
    metaAvatar: {
        type: (StringConstructor | FunctionConstructor)[];
        default: string;
    };
    imageConfig: {
        type: ObjectConstructor;
        default: () => {
            preview: boolean;
        };
    };
}>> & {
    onClick?: ((...args: any[]) => any) | undefined;
    onMouseenter?: ((...args: any[]) => any) | undefined;
    onMouseleave?: ((...args: any[]) => any) | undefined;
    onScroll?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    width: string;
    data: unknown[];
    disabled: boolean;
    modelValue: string | number;
    columns: number;
    fixedColumn: boolean;
    gridGap: number;
    keyId: string;
    highlight: boolean;
    rowClass: string | Record<string, any>;
    toolButtons: unknown[];
    imageField: string;
    rowOperations: unknown[];
    showAvatar: boolean;
    showDesc: boolean;
    metaDesc: string | Function;
    metaTitle: string | Function;
    metaAvatar: string | Function;
    imageConfig: Record<string, any>;
}, {}>, {
    header_left?(_: {}): any;
    header_right?(_: {}): any;
    default?(_: {
        row: any;
        index: any;
    }): any;
    card_header_left?(_: {}): any;
    card_header_right?(_: {}): any;
    sign?(_: {
        row: any;
        index: any;
    }): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
