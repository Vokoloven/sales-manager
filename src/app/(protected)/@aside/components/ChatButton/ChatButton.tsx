'use client';

import { usePathname } from 'next/navigation';
import Button from '@/components/Button/Button';
import { BUTTON_SIZE, BUTTON_TYPE } from '@/components/Button/constants/button.constant';
import { Icons } from '@/components/Icons/Icons';
import NavLink from '@/components/NavLink/NavLink';
import { APP_PATH } from '@/core/constants/appPath.constant';
import type { TChatButtonProps } from './models/chatButton.model';

const ChatButton = ({ id, name }: TChatButtonProps) => {
  const path = usePathname().replace('/chat/', '');

  return (
    <>
      <NavLink
        title={name}
        buttonType={BUTTON_TYPE.outline}
        size={BUTTON_SIZE.sm}
        text={name}
        href={`${APP_PATH.chat}/${id}`}
        isActive={path === id}
      />

      <Button
        popoverTarget={`options-${id}`}
        aria-label='options'
        title={name}
        buttonType={BUTTON_TYPE.outline}
        size={BUTTON_SIZE.sm}
        icon={<Icons.ThreeDots />}
        style={{ anchorName: `--options-button-${id}` }}
        isActive={path === id}
      />
    </>
  );
};

export default ChatButton;
