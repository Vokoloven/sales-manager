'use client';

import { usePathname, useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import { BUTTON_SIZE, BUTTON_TYPE } from '@/components/Button/constants/button.constant';
import { NAV_BUTTONS } from './constants/navButtons.constant';

const NavButtons = () => {
  const path = usePathname();
  const route = useRouter();

  return NAV_BUTTONS.map(({ id, icon, name }) => (
    <Button
      role='link'
      buttonType={BUTTON_TYPE.ghost}
      size={BUTTON_SIZE.sm}
      icon={icon}
      popoverTarget='user-popover'
      popoverTargetAction='hide'
      key={id}
      text={name}
      isActive={path === id}
      onClick={() => {
        route.push(id);
      }}
    />
  ));
};

export default NavButtons;
