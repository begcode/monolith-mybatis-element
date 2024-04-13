import { PropType } from 'vue';
import QRCode from 'qrcode';
import { QrcodeLogo } from '..';
declare const _default: import("vue").DefineComponent<{
    tag: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        validator: import("vue-types/dist/types").ValidatorFunction<string>;
    } & {
        default: string;
    };
    text: {
        type: PropType<string | Recordable[]>;
        default: null;
    };
    options: {
        type: PropType<QRCode.QRCodeRenderersOptions>;
        default: () => {};
    };
    width: import("vue-types").VueTypeValidableDef<number, import("vue-types/dist/types").ValidatorFunction<number>> & {
        default: number;
    } & {
        default: number;
    };
    logo: {
        type: PropType<string | Partial<QrcodeLogo>>;
        default: string;
    };
    disabled: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    disabledText: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    done: (...args: any[]) => void;
    click: (...args: any[]) => void;
    "disabled-click": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    tag: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        validator: import("vue-types/dist/types").ValidatorFunction<string>;
    } & {
        default: string;
    };
    text: {
        type: PropType<string | Recordable[]>;
        default: null;
    };
    options: {
        type: PropType<QRCode.QRCodeRenderersOptions>;
        default: () => {};
    };
    width: import("vue-types").VueTypeValidableDef<number, import("vue-types/dist/types").ValidatorFunction<number>> & {
        default: number;
    } & {
        default: number;
    };
    logo: {
        type: PropType<string | Partial<QrcodeLogo>>;
        default: string;
    };
    disabled: import("vue-types").VueTypeValidableDef<boolean, import("vue-types/dist/types").ValidatorFunction<boolean>> & {
        default: boolean;
    };
    disabledText: import("vue-types").VueTypeValidableDef<string, import("vue-types/dist/types").ValidatorFunction<string>> & {
        default: string;
    } & {
        default: string;
    };
}>> & {
    onClick?: ((...args: any[]) => any) | undefined;
    onDone?: ((...args: any[]) => any) | undefined;
    "onDisabled-click"?: ((...args: any[]) => any) | undefined;
}, {
    width: number;
    text: string | Recordable[];
    disabled: boolean;
    tag: string;
    options: QRCode.QRCodeRenderersOptions;
    logo: string | Partial<QrcodeLogo>;
    disabledText: string;
}, {}>;
export default _default;
