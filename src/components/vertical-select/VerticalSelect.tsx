'use client';

import { useEffect, useState } from 'react';
import VerticalSelectContext from './hooks/use-vertical-select';
import { VerticalSelectOptionProps } from './VerticalSelectOption';

interface VerticalSelectProps {
  children: React.ReactNode;
  defaultValue?: VerticalSelectOptionProps['value'];
}

type VerticalSelectValue = VerticalSelectOptionProps['value'] | null;

export const VerticalSelect = ({
  children,
  defaultValue
}: VerticalSelectProps) => {
  const [selectedValue, setSelectedValue] = useState<VerticalSelectValue>(null);
  const Provider = VerticalSelectContext.Provider;

  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <Provider
      value={{
        selectedValue,
        setSelectedValue,
        options: []
      }}
    >
      <div className={'flex flex-col'}>{children}</div>
    </Provider>
  );
};
