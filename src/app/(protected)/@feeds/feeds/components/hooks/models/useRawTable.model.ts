import type { TFeedsPageProps } from '@/app/(protected)/@feeds/feeds/models/feeds.model.ts';

type TUseRawTable =
  TFeedsPageProps extends Readonly<
    {
      promise: Promise<infer P>;
    } & infer Rest
  >
    ? Readonly<{ data: P } & Omit<Rest, 'promise'>>
    : never;

export type { TUseRawTable };
