import { createEvent, createStore, sample } from 'effector';

const load = <T>(key: string): T | undefined => {
  const source = localStorage.getItem(key);

  if (source) {
    return JSON.parse(source) as T;
  }
  return undefined;
};

const save = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const createLocalStorageStore = <TData>(
  key: string,
  defaultState: TData,
) => {
  const updateLocalStorage = createEvent();

  const loadedValue = load<TData>(key);

  const state = loadedValue || defaultState;

  const $store = createStore(state, { sid: `store-${key}` }).on(
    updateLocalStorage,
    (state) => save<TData>(key, state),
  );

  sample({
    source: $store,
    target: updateLocalStorage,
  });

  return $store;
};
