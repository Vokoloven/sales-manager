import LZString from 'lz-string';
import z from 'zod';
import { searchFilterSchema } from '../schemas/page.schema';
import type { TZodInfer } from '@/core/models/utility.model';

type TSearchFilter = TZodInfer<typeof searchFilterSchema>;

const compressFilters = (filters: TSearchFilter[]): string | null => {
  if (filters.length === 0) return null;
  return LZString.compressToEncodedURIComponent(JSON.stringify(filters));
};

const decompressFilters = (compressed: string): TSearchFilter[] | undefined => {
  try {
    const raw = LZString.decompressFromEncodedURIComponent(compressed);
    if (!raw) return undefined;
    const parsed = z.array(searchFilterSchema).safeParse(JSON.parse(raw));
    return parsed.success && parsed.data.length > 0 ? parsed.data : undefined;
  } catch {
    return undefined;
  }
};

export { compressFilters, decompressFilters, type TSearchFilter };
