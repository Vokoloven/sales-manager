import z from 'zod';

const searchParamValueSchema = z.string().optional();

export { searchParamValueSchema };
