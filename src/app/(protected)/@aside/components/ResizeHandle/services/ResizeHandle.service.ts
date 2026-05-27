import { ASIDE } from '../constants/resizeHandle.constant';

class ResizeHandleService {
  public clamp = (v: number) => Math.min(Math.max(v, ASIDE.asideMinWidth), ASIDE.asideMaxWidth);

  public setCookie = (name: string, value: string) => {
    document.cookie = `${name}=${value};path=/;max-age=${ASIDE.cookieMaxAge};samesite=strict`;
  };

  public deleteCookie = (name: string) => {
    document.cookie = `${name}=;path=/;max-age=0;samesite=strict`;
  };
}

const resizeHandleService = new ResizeHandleService();

export { resizeHandleService };
