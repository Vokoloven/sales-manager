type TErrorProps = {
  error: Error & { digest?: string };
  unstable_retry: VoidFunction;
};

export type { TErrorProps };
