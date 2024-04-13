import { UploadApiResult } from '../../../api/sys/model/uploadModel';
import type { Fn } from '../../../types/global.d';
export declare enum UploadResultStatus {
    SUCCESS = "success",
    ERROR = "error",
    UPLOADING = "uploading"
}
export interface FileItem {
    thumbUrl?: string;
    name: string;
    type?: string;
    size: string | number;
    percent: number;
    file: File;
    status?: UploadResultStatus;
    responseData?: UploadApiResult | string;
    uuid: string;
}
export interface PreviewFileItem {
    url: string;
    name: string;
    type: string;
}
export interface FileBasicColumn {
    prop: string;
    width?: number;
    label: string;
    align?: 'left' | 'right' | 'center';
    customRender?: Fn;
}
