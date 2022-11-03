import { ThemeProvider } from '@material-tailwind/react';
import React from 'react';

export const withTheme = (children: () => React.ReactNode) => () => {
  return <ThemeProvider>{children()}</ThemeProvider>;
};
