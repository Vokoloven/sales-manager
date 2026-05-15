import z from 'zod';

const optionSchema = z.object({
  label: z.string(),
  value: z.string()
});
export { optionSchema };
