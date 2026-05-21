'use server';

import { randomUUID } from 'crypto';
import { cookies } from 'next/headers';
import z from 'zod';
import { FEEDS_FILTER_COOKIE } from '../constants/filter.constant';
import { searchFilterSchema } from '../schemas/page.schema';
import { filterStore } from '../store/filterStore';
import type { TZodInfer } from '@/core/models/utility.model';

const saveSearchParamsAction = async (searchParameters: TZodInfer<typeof searchFilterSchema>[]) => {
  const parsed = z.array(searchFilterSchema).safeParse(searchParameters);
  if (!parsed.success) return null;

  const cookieStore = await cookies();

  if (parsed.data.length === 0) {
    const existingId = cookieStore.get(FEEDS_FILTER_COOKIE)?.value;
    if (existingId) filterStore.delete(existingId);
    cookieStore.delete(FEEDS_FILTER_COOKIE);
    return null;
  }

  const filterId = cookieStore.get(FEEDS_FILTER_COOKIE)?.value ?? randomUUID();
  filterStore.set(filterId, parsed.data);

  cookieStore.set(FEEDS_FILTER_COOKIE, filterId, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/'
  });

  return filterId;
};

export { saveSearchParamsAction };
