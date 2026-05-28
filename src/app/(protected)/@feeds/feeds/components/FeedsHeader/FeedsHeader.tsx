'use client';

import Button from '@/components/Button/Button';
import { BUTTON_SIZE, BUTTON_TYPE } from '@/components/Button/constants/button.constant';
import { Icons } from '@/components/Icons/Icons';
import { useFeedsHeader } from './hooks/useFeedsHeader';
import styles from './FeedsHeader.module.css';

const FeedsHeader = () => {
  const { isCollapsed, toggle } = useFeedsHeader();

  return (
    <header className={styles.header}>
      <Button
        buttonType={BUTTON_TYPE.icon}
        size={BUTTON_SIZE.sm}
        icon={isCollapsed ? <Icons.Expand /> : <Icons.Collapse />}
        onClick={toggle}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      />
    </header>
  );
};

export default FeedsHeader;
