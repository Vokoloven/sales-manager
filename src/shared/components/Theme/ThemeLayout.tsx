import { themeCookiesAction } from '@/shared/actions/actions/theme.action';
import Theme from './Theme';

const ThemeLayout = async () => {
  const cookiesTheme = await themeCookiesAction();
  return <Theme cookiesTheme={cookiesTheme} />;
};

export default ThemeLayout;
