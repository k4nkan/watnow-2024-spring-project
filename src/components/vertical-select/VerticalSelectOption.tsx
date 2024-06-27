'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import VerticalSelectContext from './hooks/use-vertical-select';
import clsx, { ClassValue } from 'clsx';

export type VerticalSelectOptionProps = {
  value: string | number;
  leftIcon?: React.ReactNode;
  children: React.ReactNode;
  subText?: string;
};

export const VerticalSelectOption = (props: VerticalSelectOptionProps) => {
  const context = useContext(VerticalSelectContext);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  if (!context) {
    throw new Error(
      'Option component must be used within a VerticalSelect component'
    );
  }

  const { selectedValue, setSelectedValue, options, itemHeight } = context;

  const handleClick = () => {
    setSelectedValue(props.value);
  };

  useEffect(() => {
    if (options.some((option) => option.value === props.value)) {
      console.error(`Duplicate value: ${props.value}`);
    } else {
      options.push({ ...props, ref: ref.current });
    }
    return () => {
      const index = options.findIndex((option) => option.value === props.value);
      options.splice(index, 1);
    };
  }, [options, props]);

  useEffect(() => {
    setIsSelected(selectedValue === props.value);
  }, [selectedValue, props.value]);

  return (
    <div
      className={clsx(
        'flex cursor-pointer items-center justify-between px-6',
        isSelected && 'font-semibold'
      )}
      style={{ height: itemHeight }}
      onClick={handleClick}
      ref={ref}
    >
      <div className={'flex items-center gap-3'}>
        <div className="size-4">{props.leftIcon}</div>
        <div>{props.children}</div>
      </div>
      {props.subText && (
        <div className="text-sm text-gray-400">{props.subText}</div>
      )}
    </div>
  );
};
