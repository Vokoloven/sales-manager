'use client';

import Button from '@/components/Button/Button';
import { BUTTON_SIZE, BUTTON_TYPE } from '@/components/Button/constants/button.constant';
import { Icons } from '@/components/Icons/Icons';
import { THEME } from '@/shared/components/Theme/constants/theme.constant';
import { useFeedsHeader } from './hooks/useFeedsHeader';

const FeedsHeader = () => {
  const { isCollapsed, theme, toggleTheme, toggle } = useFeedsHeader();

  return (
    <>
      <Button
        buttonType={BUTTON_TYPE.icon}
        size={BUTTON_SIZE.sm}
        icon={isCollapsed ? <Icons.Expand /> : <Icons.Collapse />}
        onClick={toggle}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      />

      <Button
        buttonType={BUTTON_TYPE.icon}
        size={BUTTON_SIZE.sm}
        icon={theme === THEME.light ? <Icons.Moon /> : <Icons.Sun />}
        onClick={toggleTheme}
        aria-label={theme === THEME.light ? 'Dark theme' : 'Light theme'}
      />
    </>
  );
};

export default FeedsHeader;
