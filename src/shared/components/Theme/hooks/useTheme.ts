import { startTransition, useEffectEvent, useLayoutEffect, useSyncExternalStore } from 'react';
import { themeCookiesAction } from '@/shared/actions/actions/theme.action';
import { THEME, THEME_ATTRIBUTE } from '@/shared/components/Theme/constants/theme.constant';
import type { TTheme, TThemeProps } from '../models/theme.model';

const useTheme = ({ cookiesTheme }: TThemeProps) => {
  const systemTheme = useSyncExternalStore(
    (onStoreChange) => {
      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      mql.addEventListener('change', onStoreChange);
      return () => {
        mql.removeEventListener('change', onStoreChange);
      };
    },
    () => (window.matchMedia('(prefers-color-scheme: dark)').matches ? THEME.dark : THEME.light),
    () => THEME.light
  );

  const setTheme = useEffectEvent((systemTheme: NonNullable<TTheme>) => {
    const theme = cookiesTheme ?? systemTheme;

    startTransition(async () => {
      await themeCookiesAction(theme);
    });

    document.querySelector('html')?.setAttribute(THEME_ATTRIBUTE, theme);
  });

  useLayoutEffect(() => {
    setTheme(systemTheme);
  }, [systemTheme]);
};

export { useTheme };
