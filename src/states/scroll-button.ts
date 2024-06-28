import { atom } from 'jotai';

const observers: ResizeObserver[] = [];
const availablePages = atom<string[]>([]);
const show = atom(false);
const isTop = atom(true);
const isScrollable = atom(false);
const scrollTarget = atom<HTMLElement | null>(null);

export { observers, availablePages, show, isTop, isScrollable, scrollTarget };
