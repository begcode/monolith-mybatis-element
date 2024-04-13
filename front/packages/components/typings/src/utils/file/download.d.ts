import type { TargetContext } from '../../types/types.d';
export declare function downloadByOnlineUrl(url: string, filename: string, mime?: string, bom?: BlobPart): void;
export declare function downloadByBase64(buf: string, filename: string, mime?: string, bom?: BlobPart): void;
export declare function downloadByData(data: BlobPart, filename: string, mime?: string, bom?: BlobPart): void;
export declare function downloadByUrl(url: string, fileName?: string, target?: TargetContext): boolean;
