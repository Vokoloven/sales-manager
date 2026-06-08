import type { TNullable, TValueOf } from '@/core/models/utility.model';
import type { THEME } from '@/shared/components/Theme/constants/theme.constant';

type TTheme = TNullable<TValueOf<typeof THEME>>;

type TThemeProps = {
  cookiesTheme: TTheme;
};

export type { TTheme, TThemeProps };
