'use client';

import { startTransition } from 'react';
import Button from '@/components/Button/Button';
import { BUTTON_SIZE, BUTTON_TYPE } from '@/components/Button/constants/button.constant';
import { Icons } from '@/components/Icons/Icons';
import { logOutButtonAction } from '../actions/logOutButtonAction';

const LogOutButton = () => {
  return (
    <Button
      text='Log out'
      icon={<Icons.LogOut />}
      buttonType={BUTTON_TYPE.ghost}
      size={BUTTON_SIZE.sm}
      onClick={() => {
        startTransition(async () => {
          await logOutButtonAction();
        });
      }}
    />
  );
};

export default LogOutButton;
