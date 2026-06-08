import type { TFeedsPageProps } from '@/app/(protected)/@feeds/feeds/models/feeds.model';

type TGenerateColumns = Pick<TFeedsPageProps, 'data'> & {
  scoreParsedValue: string[];
  keywordsParsedValue: string[];
};

export type { TGenerateColumns };
