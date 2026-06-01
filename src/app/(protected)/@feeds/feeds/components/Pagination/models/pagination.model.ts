import type { PAGE_SIZE_OPTION } from '../constants/pagination.constant';
import type { TFeedsPageParsedSearchParams } from '@/app/(protected)/@feeds/feeds/models/page.model';

type TPaginationProps = {
  options: typeof PAGE_SIZE_OPTION;
  totalPages: number;
  parsedSearchParams: TFeedsPageParsedSearchParams;
};

export type { TPaginationProps };
