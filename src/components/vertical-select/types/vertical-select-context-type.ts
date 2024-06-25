import { Dispatch } from 'react';
import { VerticalSelectOptionProps } from '../VerticalSelectOption';

export interface VerticalSelectContextType {
  selectedValue: VerticalSelectOptionProps['value'] | null;
  setSelectedValue: Dispatch<VerticalSelectOptionProps['value']>;
  options: (VerticalSelectOptionProps & { ref: HTMLElement | null })[];
}
