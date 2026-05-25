'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import { BUTTON_SIZE, BUTTON_TYPE } from '@/components/Button/constants/button.constant';
import { Icons } from '@/components/Icons/Icons';

const ReturnButton = () => {
  const router = useRouter();

  return (
    <Button
      buttonType={BUTTON_TYPE.ghost}
      size={BUTTON_SIZE.xs}
      iconRight={<Icons.ChevronLeft />}
      text='Upwork feed'
      onClick={() => {
        router.back();
      }}
    />
  );
};

export default ReturnButton;
