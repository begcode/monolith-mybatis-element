import { PlaceholderModel, FormSchema, ColProps } from '../types';
export declare const setTextPlaceholder: (schema: FormSchema) => PlaceholderModel;
export declare const setGridProp: (col?: ColProps) => ColProps;
export declare const setComponentProps: (item: FormSchema) => Recordable;
export declare const setItemComponentSlots: (slotsProps?: Recordable) => Recordable;
export declare const initModel: (schema: FormSchema[], formModel: Recordable) => Recordable;
