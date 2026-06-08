'use client';

import Button from '@/components/Button/Button';
import { BUTTON_SIZE, BUTTON_TYPE } from '@/components/Button/constants/button.constant';
import { Icons } from '@/components/Icons/Icons';
import { useFeedsHeader } from './hooks/useFeedsHeader';

const FeedsHeader = () => {
  const { isCollapsed, toggle } = useFeedsHeader();

  return (
    <Button
      buttonType={BUTTON_TYPE.icon}
      size={BUTTON_SIZE.sm}
      icon={isCollapsed ? <Icons.Expand /> : <Icons.Collapse />}
      onClick={toggle}
      aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
    />
  );
};

export default FeedsHeader;
