import type { Fn } from '../../../types/global.d';
export interface MapConfigureInter {
    on: Fn;
    destroy?: Fn;
    clearEvents?: Fn;
    addControl?: Fn;
    setCenter?: Fn;
    setZoom?: Fn;
    plugin?: Fn;
}
declare const _default: import("vue").DefineComponent<{}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}>;
export default _default;
