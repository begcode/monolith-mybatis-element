import { Ref } from 'vue';
export declare function useUploadType({ acceptRef, helpTextRef, maxNumberRef, maxSizeRef, }: {
    acceptRef: Ref<string[]>;
    helpTextRef: Ref<string>;
    maxNumberRef: Ref<number>;
    maxSizeRef: Ref<number>;
}): {
    getAccept: import("vue").ComputedRef<string[]>;
    getStringAccept: import("vue").ComputedRef<string>;
    getHelpText: import("vue").ComputedRef<string>;
};
