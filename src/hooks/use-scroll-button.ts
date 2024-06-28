import {
  UIEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';

import * as atom from '@/states/scroll-button';
import { useAtom } from 'jotai';

export const useScrollButton = () => {
  const [availablePages, setAvailablePages] = useAtom(atom.availablePages);
  const [show, setShow] = useAtom(atom.show);
  const [isTop, setIsTop] = useAtom(atom.isTop);
  const [isScrollable, setIsScrollable] = useAtom(atom.isScrollable);
  const resizeObservers = atom.refs.resizeObservers;
  const refs = atom.refs;
  const [scrollTo, setScrollTo] = useAtom(atom.scrollTo);

  useEffect(() => {
    console.log(`isTop: ${isTop} isScrollable: ${isScrollable}`);
  }, [isTop, isScrollable]);

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

  const registerResizeObserver = useCallback(() => {
    const target = refs.observerMeasureTarget;
    if (!target) {
      console.log('observerMeasureTarget is not set');
      return;
    }
    const resizeObserver = new ResizeObserver((entries) => {
      setIsScrollable(target.scrollHeight > target.clientHeight);
    });
    resizeObserver.observe(target);
    resizeObservers.push(resizeObserver);
  }, [refs.observerMeasureTarget, resizeObservers, setIsScrollable]);

  const disconnectAllResizeObservers = useCallback(() => {
    console.log('disconnecting all resize observers...');
    resizeObservers.forEach((resizeObserver) => {
      resizeObserver.disconnect();
    });
  }, [resizeObservers]);

  const callbackRefToObserve = useCallback(
    (element: HTMLDivElement | null) => {
      if (element) {
        console.log('registering resize observer...', element);
        registerResizeObserver();
      } else {
        disconnectAllResizeObservers();
      }
    },
    [disconnectAllResizeObservers, registerResizeObserver]
  );

  const setObserverMeasureTarget = useCallback(
    (element: HTMLDivElement | null) => {
      console.log('setting observer measure target...', element);
      refs.observerMeasureTarget = element;
    },
    [refs]
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
    setScrollTo,
    setAvailablePages,
    setObserverMeasureTarget,
    handleScroll,
    callbackRefToObserve
  };
};
