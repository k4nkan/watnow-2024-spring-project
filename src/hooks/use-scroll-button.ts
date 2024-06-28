import { UIEventHandler, useCallback, useEffect, useState } from 'react';

import * as atom from '@/states/scroll-button';
import { useAtom } from 'jotai';
import { usePathname } from 'next/navigation';

export const useScrollButton = () => {
  const [availablePages, setAvailablePages] = useAtom(atom.availablePages);
  const [show, setShow] = useAtom(atom.show);
  const [disabled, setDisabled] = useState(false);
  const [isTop, setIsTop] = useAtom(atom.isTop);
  const [isScrollable, setIsScrollable] = useAtom(atom.isScrollable);
  const observers = atom.observers;
  const [scrollTarget, setScrollTarget] = useAtom(atom.scrollTo);
  const pathname = usePathname();

  useEffect(() => {
    if (availablePages.some((page) => pathname.startsWith(page))) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [availablePages, pathname]);

  const handleScroll: UIEventHandler = useCallback(
    (uiEvent) => {
      if (uiEvent.target instanceof HTMLElement) {
        console.log('scrolling...');
        if (uiEvent.target.scrollTop !== 0) {
          setIsTop(false);
        } else {
          setIsTop(true);
        }
      }
    },
    [setIsTop]
  );

  const registerResizeObserver = useCallback(
    (target: HTMLElement | null, type: 'inner' | 'outer') => {
      if (target) {
        const resizeObserver = new ResizeObserver((e) => {
          setIsScrollable(target.scrollHeight > target.clientHeight);
        });
        resizeObserver.observe(target);
        observers.push(resizeObserver);
      } else {
        observers.forEach((observer) => observer.disconnect());
      }
    },
    [observers, setIsScrollable]
  );

  useEffect(() => {
    if (isTop && isScrollable) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [isTop, isScrollable, setShow]);

  return {
    show,
    isTop,
    isScrollable,
    setScrollTo: setScrollTarget,
    setAvailablePages,
    handleScroll,
    registerResizeObserver,
    disabled
  };
};
