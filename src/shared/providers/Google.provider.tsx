'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { envService } from '@/core/services/Env.service';
import type { PropsWithChildren } from 'react';

const GoogleProvider = ({ children }: Readonly<PropsWithChildren>) => {
  return (
    <GoogleOAuthProvider clientId={envService.envClient.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
};

export default GoogleProvider;
