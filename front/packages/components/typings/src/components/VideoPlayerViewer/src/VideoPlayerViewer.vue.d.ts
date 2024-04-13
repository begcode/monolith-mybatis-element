declare const _default: import("vue").DefineComponent<{
    show: {
        type: BooleanConstructor;
        default: boolean;
    };
    url: {
        type: StringConstructor;
        default: string;
        required: true;
    };
    poster: {
        type: StringConstructor;
        default: string;
    };
    id: {
        type: StringConstructor;
        default: string;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    show: {
        type: BooleanConstructor;
        default: boolean;
    };
    url: {
        type: StringConstructor;
        default: string;
        required: true;
    };
    poster: {
        type: StringConstructor;
        default: string;
    };
    id: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    id: string;
    url: string;
    show: boolean;
    poster: string;
}, {}>;
export default _default;
