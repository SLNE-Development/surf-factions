import { NextResponse, type NextRequest } from 'next/server';
import { AUTH_COOKIE, isValidSessionValue } from '@/lib/auth';

/** Pfade, die ohne gültige Session erreichbar sein müssen. */
const PUBLIC_PATHS = ['/login', '/api/auth/login', '/api/auth/logout'];

function isPublic(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isPublic(pathname)) {
    return NextResponse.next();
  }

  const cookie = req.cookies.get(AUTH_COOKIE)?.value;
  if (cookie && (await isValidSessionValue(cookie))) {
    return NextResponse.next();
  }

  // Kein/ungültiges Cookie → auf die Login-Seite umleiten und Ziel merken.
  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = '/login';
  loginUrl.search = '';
  loginUrl.searchParams.set('from', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  // Alles schützen außer Next-Interna und statischen Dateien mit Endung.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)'],
};
