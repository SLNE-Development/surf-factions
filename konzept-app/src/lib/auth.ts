/**
 * Auth-Helfer für den Token-Gate.
 *
 * Der Zugang wird über ein einziges statisches Token (`APP_ACCESS_TOKEN` in der
 * Env) geschützt. Im Cookie steht nicht das Rohtoken, sondern dessen SHA-256-
 * Hash — so liegt der Klartext weder im Client-Bundle noch im Browser-Cookie.
 *
 * Alle Funktionen nutzen ausschließlich Web-Crypto (`crypto.subtle`), damit sie
 * sowohl in der Edge-Middleware als auch in den Node-Route-Handlern laufen.
 */

/** Name des Session-Cookies. */
export const AUTH_COOKIE = 'fronten_auth';

/** Cookie-Lebensdauer in Sekunden (7 Tage). */
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

/** SHA-256 eines Strings als Hex. */
async function sha256Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/** Konstant-zeitiger Stringvergleich (verhindert Timing-Leaks beim Login). */
export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

/** Der Cookie-Wert, der für ein gültiges Token gesetzt wird. */
export function sessionValueFor(token: string): Promise<string> {
  return sha256Hex(token);
}

/**
 * Prüft, ob ein Cookie-Wert zur konfigurierten Env gehört.
 * Fällt geschlossen aus (false), wenn kein Token konfiguriert ist.
 */
export async function isValidSessionValue(cookieValue: string): Promise<boolean> {
  const token = process.env.APP_ACCESS_TOKEN;
  if (!token) return false;
  const expected = await sessionValueFor(token);
  return timingSafeEqual(cookieValue, expected);
}
