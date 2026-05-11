import { envServerSchema } from '../schemas/envService.schema';

class EnvServerService {
  public get env() {
    const envData = {
      API_URL: process.env.API_URL
    } as const;

    return envServerSchema.parse(envData);
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

const envServerService = new EnvServerService();

export { envServerService };
