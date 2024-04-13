import { PropType } from 'vue';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { ContextMenuSchema } from './types';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    schema: {
        type: PropType<ContextMenuSchema[]>;
        default: () => never[];
    };
    trigger: {
        type: PropType<"click" | "hover" | "contextmenu" | "focus">;
        default: string;
    };
    tagItem: {
        type: PropType<RouteLocationNormalizedLoaded>;
        default: () => {};
    };
}, {
    elDropdownMenuRef: import("vue").Ref<any>;
    tagItem: RouteLocationNormalizedLoaded;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    visibleChange: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    schema: {
        type: PropType<ContextMenuSchema[]>;
        default: () => never[];
    };
    trigger: {
        type: PropType<"click" | "hover" | "contextmenu" | "focus">;
        default: string;
    };
    tagItem: {
        type: PropType<RouteLocationNormalizedLoaded>;
        default: () => {};
    };
}>> & {
    onVisibleChange?: ((...args: any[]) => any) | undefined;
}, {
    trigger: "click" | "hover" | "contextmenu" | "focus";
    schema: ContextMenuSchema[];
    tagItem: RouteLocationNormalizedLoaded;
}, {}>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
