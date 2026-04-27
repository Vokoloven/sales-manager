import { BehaviorSubject } from 'rxjs';
import z from 'zod';
import { STORE_KEY } from '@/core/constants/storeService.constant';

const storeSchema = z.object({
  [STORE_KEY.auth]: z.object({
    value$: z.instanceof(BehaviorSubject<boolean>),
    initialValue: z.boolean()
  })
});

export { storeSchema };
