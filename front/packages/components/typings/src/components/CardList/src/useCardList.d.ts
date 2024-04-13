export declare function useCardList(props: any, emit: any): {
    scrollbarRef: import("vue").Ref<null>;
    containHeight: import("vue").Ref<number>;
    cardRowRef: import("vue").Ref<null>;
    onScroll: (event: any) => void;
    startOffset: import("vue").Ref<number>;
    viewListRanges: import("vue").ComputedRef<any>;
    resetViewport: () => void;
};
