import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm as useReactHookForm } from 'react-hook-form';
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

  return { form, showPassword, setShowPassword } as const;
};

export { useForm };
