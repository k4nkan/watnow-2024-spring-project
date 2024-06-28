import { atom } from 'jotai';

const refs: {
  resizeObservers: ResizeObserver[];
  observerMeasureTarget: HTMLElement | null;
} = {
  resizeObservers: [],
  observerMeasureTarget: null
};
const availablePages = atom<string[]>([]);
const show = atom(false);
const isTop = atom(true);
const isScrollable = atom(false);
const scrollTo = atom(0);

export { availablePages, show, isTop, isScrollable, refs, scrollTo };
