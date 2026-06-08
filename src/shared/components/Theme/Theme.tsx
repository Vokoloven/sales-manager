'use client';

import { useTheme } from './hooks/useTheme';
import type { TThemeProps } from './models/theme.model';

const Theme = (props: TThemeProps) => {
  useTheme(props);
  return null;
};

export default Theme;
