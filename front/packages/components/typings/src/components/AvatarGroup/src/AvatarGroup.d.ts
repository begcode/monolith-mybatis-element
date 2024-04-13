import type { PropType, CSSProperties } from 'vue';
export declare const groupProps: () => {
    prefixCls: StringConstructor;
    maxCount: NumberConstructor;
    maxStyle: {
        type: PropType<CSSProperties>;
        default: undefined;
    };
    maxPopoverPlacement: {
        type: PropType<"bottom" | "top">;
        default: string;
    };
    maxPopoverTrigger: PropType<"click" | "hover" | "focus">;
    size: {
        type: PropType<number | "default" | "small" | "large">;
        default: string;
    };
    shape: {
        type: PropType<"circle" | "square">;
        default: string;
    };
};
declare const Group: import("vue").DefineComponent<{
    prefixCls: StringConstructor;
    maxCount: NumberConstructor;
    maxStyle: {
        type: PropType<CSSProperties>;
        default: undefined;
    };
    maxPopoverPlacement: {
        type: PropType<"bottom" | "top">;
        default: string;
    };
    maxPopoverTrigger: PropType<"click" | "hover" | "focus">;
    size: {
        type: PropType<number | "default" | "small" | "large">;
        default: string;
    };
    shape: {
        type: PropType<"circle" | "square">;
        default: string;
    };
}, () => any, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    prefixCls: StringConstructor;
    maxCount: NumberConstructor;
    maxStyle: {
        type: PropType<CSSProperties>;
        default: undefined;
    };
    maxPopoverPlacement: {
        type: PropType<"bottom" | "top">;
        default: string;
    };
    maxPopoverTrigger: PropType<"click" | "hover" | "focus">;
    size: {
        type: PropType<number | "default" | "small" | "large">;
        default: string;
    };
    shape: {
        type: PropType<"circle" | "square">;
        default: string;
    };
}>>, {
    size: number | "default" | "small" | "large";
    shape: "circle" | "square";
    maxStyle: CSSProperties;
    maxPopoverPlacement: "bottom" | "top";
}, {}>;
export default Group;
