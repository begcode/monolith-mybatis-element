import { FormSchema } from '@/components/Form';
import type { Recordable } from '#/global.d';

export interface SearchProps {
  schema?: FormSchema[];
  isCol?: boolean;
  labelWidth?: string | number;
  layout?: 'inline' | 'bottom';
  buttonPosition?: 'left' | 'right' | 'center';
  showSearch?: boolean;
  showReset?: boolean;
  showExpand?: boolean;
  expandField?: string;
  inline?: boolean;
  removeNoValueItem?: boolean;
  model?: Recordable;
}
