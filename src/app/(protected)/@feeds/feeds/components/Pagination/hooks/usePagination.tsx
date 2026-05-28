import { useRouter } from 'next/navigation';
import qs from 'qs';
import { useCallback, useSyncExternalStore } from 'react';
import { useFeedsTransition } from '@/app/(protected)/@feeds/feeds/context/hooks/useFeedsTransitions';
import { APP_PROTECTED_PATH } from '@/core/constants/appPath.constant';
import { PAGE_WINDOW } from '../constants/pagination.constant';
import { subscribe } from '../utils/pagination.util';
import type { TPaginationProps } from '../models/pagination.model';
import type { TOption } from '@/core/models/option.model';
import type { SingleValue } from 'react-select';

const usePagination = ({
  parsedSearchParams,
  totalPages,
  sp
}: Omit<TPaginationProps, 'options'>) => {
  const router = useRouter();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
  const { isPending, startTransition } = useFeedsTransition();

  const currentPage = Number(parsedSearchParams.pageNumber);

  const { searchParameters: _, ...urlParams } = parsedSearchParams;

  const windowStart = Math.max(1, Math.min(currentPage - 2, totalPages - PAGE_WINDOW + 1));
  const windowEnd = Math.min(totalPages, windowStart + PAGE_WINDOW - 1);
  const pages = Array.from({ length: windowEnd - windowStart + 1 }, (_, i) => windowStart + i);

  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  const navigate = (pageNumber: number) => {
    startTransition(() => {
      router.push(
        `${APP_PROTECTED_PATH.feeds}?${qs.stringify({ ...urlParams, pageNumber, sp }, { skipNulls: true })}`
      );
    });
  };

  const selectNavigate = useCallback(
    (newValue: SingleValue<TOption>) => {
      startTransition(() => {
        router.push(
          `${APP_PROTECTED_PATH.feeds}?${qs.stringify(
            { ...urlParams, pageNumber: 1, pageSize: newValue?.value, sp },
            { skipNulls: true }
          )}`
        );
      });
    },
    [router, sp, startTransition, urlParams]
  );

  return {
    isPending,
    pages,
    mounted,
    isFirst,
    isLast,
    currentPage,
    navigate,
    selectNavigate
  } as const;
};

export { usePagination };
