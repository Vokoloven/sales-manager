import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import '@/css/globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.'
};

const RootLayout = ({ children }: Readonly<PropsWithChildren>) => {
  return (
    <html lang='en'>
      <body className={inter.variable}>{children}</body>
    </html>
  );
};

export default RootLayout;
