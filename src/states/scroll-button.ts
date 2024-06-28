import { atom } from 'jotai';

const observers: ResizeObserver[] = [];
const availablePages = atom<string[]>([]);
const show = atom(false);
const isTop = atom(true);
const isScrollable = atom(false);
const scrollTo = atom(0);

export { observers, availablePages, show, isTop, isScrollable, scrollTo };
