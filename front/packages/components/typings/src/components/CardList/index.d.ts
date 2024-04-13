export declare const CardList: {
    new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
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
    }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        click: (...args: any[]) => void;
        scroll: (...args: any[]) => void;
        mouseenter: (...args: any[]) => void;
        mouseleave: (...args: any[]) => void;
        "update:modelValue": (...args: any[]) => void;
    }, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
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
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
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
    }, {}, {}, {}, {}, {
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
    }>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
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
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (...args: any[]) => void;
    scroll: (...args: any[]) => void;
    mouseenter: (...args: any[]) => void;
    mouseleave: (...args: any[]) => void;
    "update:modelValue": (...args: any[]) => void;
}, string, {
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
}, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
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
    };
}) & Plugin;
