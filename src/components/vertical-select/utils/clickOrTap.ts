import { MouseEventHandler, TouchEventHandler } from 'react';

export default function clickOrTap(handler: any) {
  const onClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (typeof handler === 'function') {
      handler(event);
    }
  };

  const onTouchEnd: TouchEventHandler<HTMLDivElement> = (event) => {
    if (event.cancelable === false) {
      // スクロール時はcancellable === falseなのでハンドラーを呼ばない
      return;
    }

    const touch = event.changedTouches[0];
    if (event.currentTarget instanceof HTMLElement) {
      handler(event);
      const bound = event.currentTarget?.getBoundingClientRect();

      if (
        touch.clientX < bound.left ||
        touch.clientX > bound.right ||
        touch.clientY < bound.top ||
        touch.clientY > bound.bottom
      ) {
        // 領域外で指を離したらハンドラーを呼ばない
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      if (
        handler == null &&
        ['INPUT', 'SELECT', 'TEXTAREA'].includes(event.currentTarget.tagName)
      ) {
        event.currentTarget.focus();
      } else {
        if (typeof handler === 'function') {
          handler(event);
        }
      }
    }
  };

  return {
    onClick,
    onTouchEnd
  };
}
