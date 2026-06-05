import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { chatRequestSchema } from '@/app/(protected)/@aside/schemas/chat.schema';
import type { ComponentRef } from 'react';

const useRenameButton = (name: string) => {
  const dialogRef = useRef<ComponentRef<'dialog'>>(null);

  const form = useForm({
    resolver: zodResolver(chatRequestSchema),
    mode: 'all',
    values: {
      name
    }
  });

  return { dialogRef, form } as const;
};

export { useRenameButton };
