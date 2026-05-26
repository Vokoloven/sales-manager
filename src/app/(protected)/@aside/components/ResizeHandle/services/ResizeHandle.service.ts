import { COOKIE_MAX_AGE, MAX, MIN } from '../constants/resizeHandle.constant';

class ResizeHandleService {
  public clamp = (v: number) => Math.min(Math.max(v, MIN), MAX);

  public setCookie = (name: string, value: string) => {
    document.cookie = `${name}=${value};path=/;max-age=${COOKIE_MAX_AGE};samesite=strict`;
  };

  public deleteCookie = (name: string) => {
    document.cookie = `${name}=;path=/;max-age=0;samesite=strict`;
  };
}

const resizeHandleService = new ResizeHandleService();

export { resizeHandleService };
