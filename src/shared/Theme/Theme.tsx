'use client';

import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

const Theme = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      {children}
    </ThemeProvider>
  );
};

export default Theme;
