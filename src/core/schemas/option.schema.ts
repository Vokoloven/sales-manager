import z from 'zod';

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  __isNew__: z.boolean().optional()
});
export { optionSchema };
