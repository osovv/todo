export type Id = string;

export const getId = (): Id => {
  return Date.now().toString();
};
