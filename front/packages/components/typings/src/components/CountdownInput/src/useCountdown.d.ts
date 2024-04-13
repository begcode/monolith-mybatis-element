export declare function useCountdown(count: number): {
    currentCount: import("vue").Ref<number>;
    isStart: import("vue").Ref<boolean>;
    start: () => void;
    reset: () => void;
    restart: () => void;
    clear: () => void;
    stop: () => void;
};
