'use client';

import { startTransition } from 'react';
import Button from '@/components/Button/Button';
import { BUTTON_SIZE, BUTTON_TYPE } from '@/components/Button/constants/button.constant';
import { Icons } from '@/components/Icons/Icons';
import Input from '@/components/Input/Input';
import Modal from '@/components/Modal/Modal';
import { renameChatAction } from '../../actions/chat.action';
import { useRenameButton } from './hooks/useRenameButton';
import type { TRenameButtonProps } from './models/renameButton.model';

const RenameButton = ({ id, name }: TRenameButtonProps) => {
  const {
    dialogRef,
    form: {
      register,
      reset,
      handleSubmit,
      formState: { isSubmitting, errors }
    }
  } = useRenameButton(name);

  return (
    <>
      <Button
        popoverTarget={`options-${id}`}
        popoverTargetAction='hide'
        size={BUTTON_SIZE.sm}
        text='Rename'
        iconRight={<Icons.Edit />}
        onClick={() => {
          dialogRef.current?.showModal();
        }}
      />
      <Modal
        title='Rename chat'
        ref={dialogRef}
        buttons={[
          <Button
            buttonType={BUTTON_TYPE.outline}
            size={BUTTON_SIZE.sm}
            text='Cancel'
            onClick={() => {
              dialogRef.current?.close();
              reset();
            }}
            disabled={isSubmitting}
            key='Cancel'
          />,
          <Button
            type='submit'
            form={`rename-chat-${id}`}
            buttonType={BUTTON_TYPE.primary}
            size={BUTTON_SIZE.sm}
            text='Rename'
            disabled={isSubmitting}
            key='Rename'
          />
        ]}
      >
        <form
          id={`rename-chat-${id}`}
          onSubmit={(e) => {
            e.preventDefault();
            void handleSubmit(({ name }) => {
              startTransition(async () => {
                await renameChatAction({ id, name });

                dialogRef.current?.close();
              });
            })();
          }}
        >
          <Input {...register('name')} error={errors.name?.message} />
        </form>
      </Modal>
    </>
  );
};

export default RenameButton;
