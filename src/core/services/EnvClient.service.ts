import { envClientSchema } from '../schemas/env.schema';

class EnvClientService {
  public get env() {
    const envData = {
      NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      NEXT_PUBLIC_LOGIN: process.env.NEXT_PUBLIC_LOGIN,
      NEXT_PUBLIC_PASSWORD: process.env.NEXT_PUBLIC_PASSWORD
    } as const;

    return envClientSchema.parse(envData);
  }
}

const envClientService = new EnvClientService();

export { envClientService };
