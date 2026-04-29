import { Inter } from 'next/font/google';
import Theme from '@/shared/Theme/Theme';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@/css/globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.'
};

const RootLayout = ({
  children
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.variable}>{<Theme>{children}</Theme>}</body>
    </html>
  );
};

export default RootLayout;
