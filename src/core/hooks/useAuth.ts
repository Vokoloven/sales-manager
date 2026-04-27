import { useEffect, useState } from 'react';
import { STORE_KEY } from '@/core/constants/storeService.constant';
import { StoreService } from '@/core/services/Store.service';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    StoreService.get(STORE_KEY.auth).getValue()
  );

  useEffect(() => {
    const subscription = StoreService.get(STORE_KEY.auth)
      .asObservable()
      .subscribe({
        next(payload) {
          setIsAuthenticated(payload);
        }
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { isAuthenticated } as const;
};

export { useAuth };
