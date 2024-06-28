'use client';

import { useEffect, useRef, useState, Children, ReactElement } from 'react';
import VerticalSelectContext from './hooks/use-vertical-select';
import { VerticalSelectOptionProps } from './VerticalSelectOption';
import { VerticalSelectContextType } from './types/vertical-select-context-type';

interface VerticalSelectProps {
  children: React.ReactNode;
  value?: VerticalSelectOptionProps['value'];
  itemHeight?: number;
  onChange?: (value: VerticalSelectOptionProps['value']) => void;
}

type VerticalSelectValue = VerticalSelectOptionProps['value'] | null;

export const VerticalSelect = ({
  children,
  value,
  itemHeight = 48,
  onChange
}: VerticalSelectProps) => {
  const [selectedValue, setSelectedValue] = useState<VerticalSelectValue>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isOptionsReady, setIsOptionsReady] = useState<boolean>(false);
  const [isOtherValue, setIsOtherValue] = useState<boolean>(false);
  const Provider = VerticalSelectContext.Provider;
  const options = useRef<VerticalSelectContextType['options']>([]);
  const itemCount = Children.count(children);

  useEffect(() => {
    if (value) {
      setSelectedValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (isOptionsReady) {
      setIsOtherValue(
        options.current.findIndex(
          (option) => option.value === selectedValue
        ) === -1
      );
    }
  }, [isOptionsReady, selectedValue, value]);

  // 渡ってきたchildrenをmapで回して、それぞれのoptionにindexを設定する
  useEffect(() => {
    Children.forEach(children, (child, index) => {
      child = child as ReactElement<VerticalSelectOptionProps>;
      if (child) {
        options.current.forEach((option) => {
          if (option.value === child.props.value) option.index = index;
        });
      }

      // 全てのoptionにindexが設定された時の処理
      if (
        Children.count(children) ===
        options.current.filter((option) => option.index !== undefined).length
      ) {
        setIsOptionsReady(true);
      }
    });
  }, [children, value]);

  useEffect(() => {
    const index = options.current.find(
      (option) => option.value === selectedValue
    )?.index;
    index !== undefined && index !== -1 && setSelectedIndex(index);
  }, [selectedValue]);

  return (
    <Provider
      value={{
        selectedValue,
        setSelectedValue,
        options: options.current,
        itemHeight: itemHeight,
        onChange: onChange
      }}
    >
      <div className={'relative flex w-full flex-col rounded-md bg-slate-100'}>
        <div
          className={
            'absolute z-10 rounded-md border-2 border-slate-400 bg-white shadow-md transition-all'
          }
          style={{
            transform: `translateY(${selectedIndex * itemHeight - 2}px) translateX(-3px)`,
            width: 'calc(100% + 6px)',
            height: `${itemHeight + 4}px`,
            opacity: isOtherValue ? 0 : 1
          }}
        />
        <div className="z-0">
          {[...Array(itemCount - 1)].map((_, index) => {
            return <Divider key={index} posY={(index + 1) * itemHeight} />;
          })}
        </div>
        <div className="z-20">{children}</div>
      </div>
    </Provider>
  );
};

const Divider = ({ posY }: { posY: number }) => {
  return (
    <div className="absolute w-full">
      <div
        className="mx-5 rounded-full border-t-2 border-slate-200"
        style={{
          transform: `translateY(${posY - 1}px)`
        }}
      />
    </div>
  );
};
