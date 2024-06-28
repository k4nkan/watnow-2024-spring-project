'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import VerticalSelectContext from './hooks/use-vertical-select';
import clsx from 'clsx';
import clickOrTap from './utils/clickOrTap';

export type VerticalSelectOptionProps = {
  value: string | number;
  leftIcon?: React.ReactNode;
  selectedLeftIcon?: React.ReactNode;
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

  const { selectedValue, setSelectedValue, options, itemHeight, onChange } =
    context;

  const handleClick = () => {
    setSelectedValue(props.value);
    if (onChange) {
      onChange(props.value);
    }
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
        'group flex cursor-pointer items-center p-1.5 text-slate-700',
        isSelected && 'font-semibold text-slate-950'
      )}
      ref={ref}
      style={{ height: itemHeight }}
      onClick={handleClick}
    >
      <div
        className={clsx(
          'flex size-full items-center justify-between rounded px-4 transition-colors duration-150',
          !isSelected && 'group-hover:bg-slate-400/10'
        )}
      >
        <div className={'flex items-center gap-3'}>
          <div className="size-4">
            {props.selectedLeftIcon && isSelected
              ? props.selectedLeftIcon
              : props.leftIcon}
          </div>
          <div>{props.children}</div>
        </div>
        {props.subText && (
          <div className="text-sm text-gray-400">{props.subText}</div>
        )}
      </div>
    </div>
  );
};
