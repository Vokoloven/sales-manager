import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm as useReactHookForm } from 'react-hook-form';
import { useTanstackQuery } from '@/core/hooks/useTanstackQuery';
import { loginMutation } from '../mutations/Login.mutation';
import { loginSchema } from '../schemas/login.schema';

const useForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useReactHookForm({
    mode: 'all',
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(loginSchema)
  });

  const { mutate } = useTanstackQuery({
    instance: loginMutation.login
  });

  return { form, showPassword, setShowPassword, mutate } as const;
};

export { useForm };
