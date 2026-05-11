'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { envClientService } from '@/core/services/EnvClient.service';
import type { PropsWithChildren } from 'react';

const GoogleProvider = ({ children }: Readonly<PropsWithChildren>) => {
  return (
    <GoogleOAuthProvider clientId={envClientService.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
};

export default GoogleProvider;
