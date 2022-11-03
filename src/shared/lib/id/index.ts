export type Id = number;

export const getId = (): Id => {
  return Date.now();
};
