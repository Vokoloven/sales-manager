import GoogleProvider from '@/shared/providers/Google.provider';
import type { PropsWithChildren } from 'react';

const PublicLayout = ({ children }: Readonly<PropsWithChildren>) => {
  return <GoogleProvider>{children}</GoogleProvider>;
};

export default PublicLayout;
