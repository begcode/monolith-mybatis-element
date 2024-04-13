import { Ref } from 'vue';
export declare function checkFileExtType(file: File, accepts: string[]): boolean;
export declare function checkImgType(file: File): boolean;
export declare function isImgTypeByName(name: string): boolean;
export declare function getBase64WithFile(file: File): Promise<{
    result: string;
    file: File;
}>;
export declare function useUploadType({ acceptRef, helpTextRef, maxNumberRef, maxSizeRef, }: {
    acceptRef: Ref<string[]>;
    helpTextRef: Ref<string>;
    maxNumberRef: Ref<number>;
    maxSizeRef: Ref<number>;
}, uploadedList: Ref<String[]>): {
    getAccept: import("vue").ComputedRef<string[]>;
    getStringAccept: import("vue").ComputedRef<string>;
    getHelpText: import("vue").ComputedRef<string>;
};
