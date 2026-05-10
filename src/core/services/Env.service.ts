import { envClientSchema, envServerSchema } from '../schemas/envService.schema';

class EnvService {
  public get envServer() {
    const envData = {
      API_URL: process.env.API_URL
    } as const;

    return envServerSchema.parse(envData);
  }

  public get envClient() {
    const envData = {
      NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      NEXT_PUBLIC_LOGIN: process.env.NEXT_PUBLIC_LOGIN,
      NEXT_PUBLIC_PASSWORD: process.env.NEXT_PUBLIC_PASSWORD
    } as const;

    return envClientSchema.parse(envData);
  }

  public get isProdEnv() {
    const ENV = {
      production: true,
      development: false,
      test: false
    } as const;

    return ENV[process.env.NODE_ENV];
  }
}

const envService = new EnvService();

export { envService };
