const isOutOfBoundaries = <T>(array: Array<T>, index: number) => {
  const length = array.length;

  return index < 0 || index >= length;
};

export const arrayMove = <T>(
  array: Array<T>,
  { from, to }: { from: number; to: number },
) => {
  if (
    isOutOfBoundaries(array, from) ||
    isOutOfBoundaries(array, to) ||
    from === to
  ) {
    return array;
  }

  const newArray = array.slice();
  newArray.splice(
    to < 0 ? newArray.length + to : to,
    0,
    newArray.splice(from, 1)[0],
  );

  return newArray;
};
