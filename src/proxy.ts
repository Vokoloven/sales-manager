import { NextResponse, type NextRequest } from 'next/server';
import { APP_PATH, APP_PROTECTED_PATH, APP_PUBLIC_PATH } from './core/constants/appPath.constant';
import { TOKEN } from './core/constants/token.constant';
import { apiService } from './core/services/ApiService.service';
import { envServerService } from './core/services/EnvServer.service';

const publicRoutes = Object.values(APP_PUBLIC_PATH) as string[];
const protectedRoutes = Object.values(APP_PROTECTED_PATH) as string[];

const proxy = async (req: NextRequest) => {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
  const isPublicRoute = publicRoutes.includes(path);

  const accessToken = req.cookies.get(TOKEN.accessToken)?.value ?? null;
  const refreshToken = req.cookies.get(TOKEN.refreshToken)?.value ?? null;

  const isAuth = Boolean(accessToken);
  const isRefresh = Boolean(refreshToken);

  if (path === APP_PATH.base) {
    return NextResponse.redirect(new URL(isAuth ? APP_PATH.feeds : APP_PATH.login, req.nextUrl));
  }

  if (isProtectedRoute && !isAuth) {
    if (isRefresh) {
      let response: NextResponse;
      const result = await apiService().refreshAccessToken(refreshToken);

      if (result.success) {
        response = NextResponse.next();

        response.cookies.set(TOKEN.accessToken, result.data.access.accessToken, {
          httpOnly: true,
          secure: envServerService.isProdEnv,
          sameSite: 'strict',
          maxAge: 60 * 5
        });

        return response;
      }

      const loginUrlOnFailure = new URL(APP_PATH.login, req.nextUrl);
      loginUrlOnFailure.searchParams.set('callbackUrl', req.nextUrl.pathname + req.nextUrl.search);
      response = NextResponse.redirect(loginUrlOnFailure);
      response.cookies.delete(TOKEN.accessToken);
      response.cookies.delete(TOKEN.refreshToken);
      return response;
    }

    const loginUrl = new URL(APP_PATH.login, req.nextUrl);
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  if (isPublicRoute && isAuth) {
    return NextResponse.redirect(new URL(APP_PATH.feeds, req.nextUrl));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$).*)']
};

export { proxy };
