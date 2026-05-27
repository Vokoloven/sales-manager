import type { TFeedsPageProps } from '../../../models/feeds.model';

type TGenerateColumns = Pick<TFeedsPageProps, 'data'> & {
  scoreParsedValue: string[];
  keywordsParsedValue: string[];
};

export type { TGenerateColumns };
