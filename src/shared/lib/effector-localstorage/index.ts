import { createEffect, createEvent, createStore, sample } from 'effector';
import localforage from 'localforage';

type Key = string;

export const createLocalStorageStore = <TData>(
  key: Key,
  defaultState: TData,
) => {
  const updateLocalStorageFx = createEffect(async (state: TData) =>
    localforage.setItem(key, state),
  );

  const getLocalStorageValueFx = createEffect<void, TData | null>(() =>
    localforage.getItem<TData>(key),
  );

  const storeCreated = createEvent();

  const $store = createStore<TData>(defaultState, {
    sid: `store-${key}`,
  });

  sample({
    source: $store,
    target: updateLocalStorageFx,
  });

  sample({
    source: storeCreated,
    target: getLocalStorageValueFx,
  });

  $store.on(getLocalStorageValueFx.doneData, (_, data) => data || undefined);

  storeCreated();

  return { $store, getLocalStorageValueFx };
};
