'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { search, type SearchEntry } from '@/lib/search-index';

/** Globale Suche als Overlay. Öffnet über ⌘/Strg-K, „/“ oder den Trigger-Button. */
export function GlobalSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo<SearchEntry[]>(() => search(query), [query]);

  // Globale Shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
        return;
      }
      if (e.key === '/' && !open) {
        const tag = (document.activeElement?.tagName || '').toLowerCase();
        if (tag !== 'input' && tag !== 'textarea') {
          e.preventDefault();
          setOpen(true);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Bei Öffnen: fokussieren + zurücksetzen
  useEffect(() => {
    if (open) {
      setActive(0);
      const t = setTimeout(() => inputRef.current?.focus(), 20);
      return () => clearTimeout(t);
    }
    setQuery('');
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const go = (e?: SearchEntry) => {
    const target = e ?? results[active];
    if (!target) return;
    setOpen(false);
    router.push(target.href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      go();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
    }
  };

  return (
    <>
      <button className="search-trigger" onClick={() => setOpen(true)} aria-label="Suche öffnen">
        <span className="search-trigger__icon">⌕</span>
        <span className="search-trigger__label">Suchen …</span>
        <span className="search-trigger__kbd">Strg K</span>
      </button>

      {open && (
        <div className="search-overlay" onMouseDown={() => setOpen(false)}>
          <div className="search-panel" onMouseDown={(e) => e.stopPropagation()}>
            <div className="search-inputrow">
              <span className="search-inputrow__icon">⌕</span>
              <input
                ref={inputRef}
                className="search-input"
                placeholder="Systeme, Ideen, Fragen durchsuchen …"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
              />
              <span className="search-esc">ESC</span>
            </div>

            <div className="search-results">
              {query && results.length === 0 && <div className="search-empty">Nichts gefunden für „{query}“.</div>}
              {results.map((r, i) => (
                <button
                  key={r.id}
                  className={`search-item${i === active ? ' is-active' : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(r)}
                >
                  <span className="search-item__title">{r.title}</span>
                  <span className="search-item__kind">{r.kind}</span>
                </button>
              ))}
              {!query && (
                <div className="search-hint">
                  Tippe, um zu suchen. <b>↑ ↓</b> navigieren, <b>Enter</b> öffnen, <b>Esc</b> schließen.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
