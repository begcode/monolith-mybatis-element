import type { FileBasicColumn } from './typing';
import type { Fn } from '../../../types/global.d';
export declare function createTableColumns(): FileBasicColumn[];
export declare function createActionColumn(handleRemove: Fn): FileBasicColumn;
export declare function createPreviewColumns(): FileBasicColumn[];
export declare function createPreviewActionColumn({ handleRemove, handleDownload }: {
    handleRemove: Fn;
    handleDownload: Fn;
}): FileBasicColumn;
