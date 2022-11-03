import React from 'react';

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='mx-auto flex items-center justify-center p-4 file:container'>
      <main className='mt-20 w-full max-w-screen-md'>{children}</main>
    </div>
  );
};
