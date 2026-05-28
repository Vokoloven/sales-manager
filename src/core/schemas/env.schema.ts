import z from 'zod';

const envServerSchema = z.object({
  API_URL: z.string()
});

const envClientSchema = z.object({
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: z.string(),
  NEXT_PUBLIC_LOGIN: z.string(),
  NEXT_PUBLIC_PASSWORD: z.string()
});

export { envServerSchema, envClientSchema };
