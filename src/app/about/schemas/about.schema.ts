import z from 'zod';
import { responseSchema } from '@/core/schemas/response.schema';

const aboutDataSchema = z.object({
  majorBuildVersion: z.string(),
  minorBuildVersion: z.string(),
  date: z.string()
});

const aboutResponseSchema = responseSchema(aboutDataSchema);

export { aboutResponseSchema };
