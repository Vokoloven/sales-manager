import { NextResponse, type NextRequest } from 'next/server';
import { getTokens } from './core/actions/tokens.action';

const publicRoutes = ['/login', '/version'];
const protectedRoutes = ['/dashboard'];

export const proxy = async (req: NextRequest) => {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const isAuth = Boolean((await getTokens()).accessToken);

  if (path === '/') {
    return NextResponse.redirect(new URL(isAuth ? '/dashboard' : '/login', req.nextUrl));
  }

  if (isProtectedRoute && !isAuth) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  if (isPublicRoute && isAuth) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$).*)']
};
