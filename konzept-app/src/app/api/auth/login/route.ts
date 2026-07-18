import { NextResponse, type NextRequest } from 'next/server';
import { AUTH_COOKIE, COOKIE_MAX_AGE, sessionValueFor, timingSafeEqual } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const token = process.env.APP_ACCESS_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: 'Auth ist serverseitig nicht konfiguriert (APP_ACCESS_TOKEN fehlt).' },
      { status: 500 },
    );
  }

  let input = '';
  try {
    const body = (await req.json()) as { token?: unknown };
    if (typeof body.token === 'string') input = body.token;
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  }

  if (!input || !timingSafeEqual(input, token)) {
    return NextResponse.json({ error: 'Falsches Token.' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(AUTH_COOKIE, await sessionValueFor(token), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: COOKIE_MAX_AGE,
  });
  return res;
}
