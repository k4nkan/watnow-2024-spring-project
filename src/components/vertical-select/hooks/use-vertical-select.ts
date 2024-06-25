import { createContext } from 'react';
import { VerticalSelectContextType } from '../types/vertical-select-context-type';

const VerticalSelectContext = createContext<VerticalSelectContextType | null>(
  null
);

export default VerticalSelectContext;
