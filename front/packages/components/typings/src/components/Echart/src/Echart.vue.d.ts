import type { EChartsOption } from 'echarts';
import { PropType } from 'vue';
import 'echarts-wordcloud';
declare const _default: import("vue").DefineComponent<{
    options: {
        type: PropType<EChartsOption>;
        required: true;
    };
    width: import("vue-types").VueTypeDef<string | number> & {
        default: string | number;
    };
    height: import("vue-types").VueTypeDef<string | number> & {
        default: string | number;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    options: {
        type: PropType<EChartsOption>;
        required: true;
    };
    width: import("vue-types").VueTypeDef<string | number> & {
        default: string | number;
    };
    height: import("vue-types").VueTypeDef<string | number> & {
        default: string | number;
    };
}>>, {
    width: string | number;
    height: string | number;
}, {}>;
export default _default;
