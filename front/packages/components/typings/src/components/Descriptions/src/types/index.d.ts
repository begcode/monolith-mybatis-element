import { VNode } from 'vue';
export interface DescriptionsSchema {
    span?: number;
    field: string;
    label?: string;
    width?: string | number;
    minWidth?: string | number;
    align?: 'left' | 'center' | 'right';
    labelAlign?: 'left' | 'center' | 'right';
    className?: string;
    labelClassName?: string;
    slots?: {
        default?: (...args: any[]) => VNode | null;
        label?: (...args: any[]) => VNode | null;
    };
}
