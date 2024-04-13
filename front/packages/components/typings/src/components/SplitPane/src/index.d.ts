import { PropType } from 'vue';
import './index.css';
export interface ContextProps {
    minPercent: number;
    defaultPercent: number;
    split: string;
}
declare const _default: import("vue").DefineComponent<{
    splitSet: {
        type: PropType<ContextProps>;
        require: boolean;
    };
}, () => any, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "resize"[], "resize", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    splitSet: {
        type: PropType<ContextProps>;
        require: boolean;
    };
}>> & {
    onResize?: ((...args: any[]) => any) | undefined;
}, {}, {}>;
export default _default;
