'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const mounted = useSyncExternalStore(
    () => () => {
      // Unsub
    },
    () => true,
    () => false
  );

  if (!mounted) return null;

  return (
    <div>
      The current theme is: {theme}
      <button
        onClick={() => {
          setTheme('light');
        }}
      >
        Light Mode
      </button>
      <button
        onClick={() => {
          setTheme('dark');
        }}
      >
        Dark Mode
      </button>
    </div>
  );
};

export default ThemeToggle;
