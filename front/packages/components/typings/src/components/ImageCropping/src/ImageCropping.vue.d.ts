import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';
declare const _default: import("vue").DefineComponent<{
    imageUrl: {
        type: StringConstructor;
        default: string;
        required: true;
    };
    cropBoxWidth: {
        type: NumberConstructor;
        default: number;
    };
    cropBoxHeight: {
        type: NumberConstructor;
        default: number;
    };
    boxWidth: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    boxHeight: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    showResult: {
        type: BooleanConstructor;
        default: boolean;
    };
    showActions: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    cropperExpose: import("vue").Ref<Cropper | undefined>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    imageUrl: {
        type: StringConstructor;
        default: string;
        required: true;
    };
    cropBoxWidth: {
        type: NumberConstructor;
        default: number;
    };
    cropBoxHeight: {
        type: NumberConstructor;
        default: number;
    };
    boxWidth: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    boxHeight: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    showResult: {
        type: BooleanConstructor;
        default: boolean;
    };
    showActions: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    imageUrl: string;
    cropBoxWidth: number;
    cropBoxHeight: number;
    boxWidth: string | number;
    boxHeight: string | number;
    showResult: boolean;
    showActions: boolean;
}, {}>;
export default _default;
