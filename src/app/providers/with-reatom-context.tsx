import { createCtx } from '@reatom/core';
import { reatomContext } from '@reatom/npm-react';

const ctx = createCtx();

export const withReatomContext = (children: () => React.ReactNode) => () => {
  return (
    <reatomContext.Provider value={ctx}>{children()}</reatomContext.Provider>
  );
};
