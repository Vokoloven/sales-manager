import { Singleton } from '@/core/decorators/Singleton.decorator';

@Singleton
class EnviromentService {
  public get baseUrl() {
    return process.env.BASE_URL;
  }
}

const enviromentService = new EnviromentService();

export { enviromentService };
