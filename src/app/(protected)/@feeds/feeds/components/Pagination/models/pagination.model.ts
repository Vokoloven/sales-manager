import type { PAGE_SIZE_OPTION } from '../constants/pagination.constant';
import type { TFeedsPageProps } from '@/app/(protected)/@feeds/feeds/models/feeds.model';

type TPaginationProps = {
  options: typeof PAGE_SIZE_OPTION;
  sp?: string;
  totalPages: number;
} & Pick<TFeedsPageProps, 'parsedSearchParams'>;

export type { TPaginationProps };
