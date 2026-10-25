'use client';

import { useSyncExternalStore } from 'react';

// Tiny shared store so the slideshow and the headline stay in step.
let index = 0;
const listeners = new Set<() => void>();

export const heroStore = {
  get: () => index,
  set(next: number) {
    if (next === index) return;
    index = next;
    listeners.forEach((fn) => fn());
  },
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => { listeners.delete(fn); };
  },
};

export const useHeroIndex = () => useSyncExternalStore(heroStore.subscribe, heroStore.get, () => 0);
