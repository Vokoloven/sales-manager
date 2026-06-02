import { zodResolver } from '@hookform/resolvers/zod';
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter, useSearchParams } from 'next/navigation';
import { useActionState, useState, startTransition, useEffect } from 'react';
import { useForm as useReactHookForm } from 'react-hook-form';
import { APP_PATH } from '@/core/constants/appPath.constant';
import { envClientService } from '@/core/services/EnvClient.service';
import { loginAction } from '../actions/login.action';
import { loginSchema } from '../schemas/login.schema';
import type { TLogin } from '../models/login.model';
import type { loginResponseSchema } from '../schemas/login.schema';
import type { TNullable, TOptional, TZodInfer } from '@/core/models/utility.model';

const useForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);

  const form = useReactHookForm({
    mode: 'all',
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(loginSchema)
  });

  const [state, dispatchAction] = useActionState<
    TNullable<TZodInfer<typeof loginResponseSchema>>,
    TOptional<TNullable<TLogin>>
  >(async (_prevState, actionPayload) => {
    if (actionPayload === null) {
      return actionPayload;
    }

    actionPayload ??= {
      email: envClientService.env.NEXT_PUBLIC_LOGIN,
      password: envClientService.env.NEXT_PUBLIC_PASSWORD
    };

    const result = await loginAction(actionPayload);

    form.reset();

    if (result.success) {
      const callbackUrl = searchParams.get('callbackUrl');
      router.replace(callbackUrl ?? APP_PATH.feeds);
      return null;
    }

    return result;
  }, null);

  useEffect(() => {
    if (form.formState.isDirty) {
      startTransition(() => {
        dispatchAction(null);
      });
    }
  }, [form.formState.isDirty]);

  const googleLogin = useGoogleLogin({
    onSuccess: () => {
      (() => {
        startTransition(() => {
          dispatchAction(undefined);
        });
      })();
    }
  });

  const login = (dto: TLogin) => {
    startTransition(() => {
      dispatchAction(dto);
    });
  };

  return { state, form, showPassword, setShowPassword, googleLogin, login } as const;
};

export { useForm };
