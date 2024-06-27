'use client';

import { useEffect, useRef, useState, Children, ReactElement } from 'react';
import VerticalSelectContext from './hooks/use-vertical-select';
import { VerticalSelectOptionProps } from './VerticalSelectOption';
import { VerticalSelectContextType } from './types/vertical-select-context-type';

interface VerticalSelectProps {
  children: React.ReactNode;
  defaultValue?: VerticalSelectOptionProps['value'];
  itemHeight?: number;
}

type VerticalSelectValue = VerticalSelectOptionProps['value'] | null;

export const VerticalSelect = ({
  children,
  defaultValue,
  itemHeight = 48
}: VerticalSelectProps) => {
  const [selectedValue, setSelectedValue] = useState<VerticalSelectValue>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isOptionsReady, setIsOptionsReady] = useState<boolean>(false);
  const Provider = VerticalSelectContext.Provider;
  const options = useRef<VerticalSelectContextType['options']>([]);

  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (isOptionsReady) {
      if (!options.current.find((option) => option.value === defaultValue)) {
        console.error(`Invalid defaultValue: ${defaultValue}`);
      }
      if (defaultValue) {
        setSelectedIndex(
          options.current.find((option) => option.value === defaultValue)
            ?.index || 0
        );
      } else {
        setSelectedIndex(0);
      }
    }
  }, [isOptionsReady, defaultValue]);

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
  }, [children, defaultValue]);

  useEffect(() => {
    setSelectedIndex(
      options.current.find((option) => option.value === selectedValue)?.index ||
        0
    );
  }, [selectedValue]);

  return (
    <Provider
      value={{
        selectedValue,
        setSelectedValue,
        options: options.current,
        itemHeight: itemHeight
      }}
    >
      <div className={'relative flex flex-col rounded-md bg-slate-100'}>
        <div
          className={
            'absolute z-0 w-full rounded-md border-2 border-slate-400 bg-white shadow-md transition-all'
          }
          style={{
            transform: `translateY(${selectedIndex * itemHeight}px) `,
            height: itemHeight
          }}
        />
        <div className="z-20">{children}</div>
      </div>
    </Provider>
  );
};
