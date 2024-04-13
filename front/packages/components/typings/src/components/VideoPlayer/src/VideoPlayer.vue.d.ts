import Player from 'xgplayer';
import 'xgplayer/dist/index.min.css';
declare const _default: import("vue").DefineComponent<{
    url: {
        type: StringConstructor;
        default: string;
        required: true;
    };
    poster: {
        type: StringConstructor;
        default: string;
    };
}, {
    playerExpose: () => Player | undefined;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    url: {
        type: StringConstructor;
        default: string;
        required: true;
    };
    poster: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    url: string;
    poster: string;
}, {}>;
export default _default;
