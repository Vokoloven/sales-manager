'use client';

import { useRouter } from 'next/navigation';
import { useRef, useTransition } from 'react';
import Button from '@/components/Button/Button';
import { BUTTON_SIZE, BUTTON_TYPE } from '@/components/Button/constants/button.constant';
import { Icons } from '@/components/Icons/Icons';
import Modal from '@/components/Modal/Modal';
import { APP_PATH } from '@/core/constants/appPath.constant';
import { deleteChatAction } from '../../actions/chat.action';
import type { TDeleteButtonProps } from './models/deleteButton.model';
import type { ComponentRef } from 'react';

const DeleteButton = ({ id, name }: TDeleteButtonProps) => {
  const [isSubmitting, startTransition] = useTransition();
  const dialogRef = useRef<ComponentRef<'dialog'>>(null);
  const router = useRouter();

  return (
    <>
      <Button
        popoverTarget={`options-${id}`}
        popoverTargetAction='hide'
        size={BUTTON_SIZE.sm}
        text='Delete'
        iconRight={<Icons.Delete />}
        onClick={() => {
          dialogRef.current?.showModal();
        }}
      />
      <Modal
        title='Delete chat'
        ref={dialogRef}
        buttons={[
          <Button
            buttonType={BUTTON_TYPE.outline}
            size={BUTTON_SIZE.sm}
            text='Cancel'
            onClick={() => {
              dialogRef.current?.close();
            }}
            disabled={isSubmitting}
            key='Cancel'
          />,
          <Button
            buttonType={BUTTON_TYPE.primary}
            size={BUTTON_SIZE.sm}
            text='Delete'
            disabled={isSubmitting}
            key='Delete'
            onClick={() => {
              startTransition(async () => {
                await deleteChatAction(id);
                router.replace(APP_PATH.chat);
              });
            }}
          />
        ]}
      >
        Are you sure you want to delete {name}?
      </Modal>
    </>
  );
};

export default DeleteButton;
