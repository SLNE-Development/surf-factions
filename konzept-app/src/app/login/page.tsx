'use client';

import { Suspense, useState, type FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export const dynamic = 'force-dynamic';

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      if (res.ok) {
        const from = params.get('from') || '/';
        router.replace(from.startsWith('/') ? from : '/');
        router.refresh();
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error || 'Login fehlgeschlagen.');
    } catch {
      setError('Netzwerkfehler — bitte erneut versuchen.');
    }
    setBusy(false);
  }

  return (
    <form className="login__card" onSubmit={onSubmit}>
      <div className="login__mark">FRON<span>TEN</span></div>
      <div className="login__sub">CastCrafter Factions · Konzept-Explorer</div>
      <label className="login__label" htmlFor="token">Zugangstoken</label>
      <input
        id="token"
        className="login__input"
        type="password"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Token eingeben"
        autoComplete="current-password"
        autoFocus
        disabled={busy}
      />
      {error && <div className="login__error" role="alert">{error}</div>}
      <button className="login__btn" type="submit" disabled={busy || !token}>
        {busy ? 'Prüfe …' : 'Zugang'}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="login">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
