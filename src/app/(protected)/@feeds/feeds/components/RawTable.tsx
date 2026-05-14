'use client';

import { use } from 'react';
import type { TFeedsReponseSchema } from '../models/feeds.schema';

const RawTable = ({ promise }: { promise: Promise<TFeedsReponseSchema> }) => {
  const _result = use(promise);

  return null;
};

export default RawTable;
