import { SYSTEMS, IDEAS, QUESTIONS } from '@/data';
import { plain } from './helpers';

export interface SearchEntry {
  id: string;
  title: string;
  kind: string; // Label für die Zeile
  href: string;
  haystack: string;
}

/** Flacher Suchindex über Systeme, Ideen, Fragen und die festen Bereiche. */
export const SEARCH_INDEX: SearchEntry[] = [
  ...SYSTEMS.map((s) => ({
    id: s.id,
    title: s.title,
    kind: 'Kernsystem',
    href: `/system/${s.id}`,
    haystack: `${s.title} ${s.kicker ?? ''} ${s.lede ?? ''} ${plain(s.was)} ${plain(s.wie)} ${plain(s.warum)} ${(s.tags ?? []).join(' ')}`.toLowerCase(),
  })),
  ...IDEAS.map((i) => ({
    id: i.id,
    title: i.title,
    kind: `Idee ${i.nr} · ${i.cat}`,
    href: `/idee/${i.id}`,
    haystack: `${i.title} ${i.cat} ${plain(i.was)} ${plain(i.wie)} ${plain(i.warum)} ${(i.tags ?? []).join(' ')}`.toLowerCase(),
  })),
  ...QUESTIONS.map((q, idx) => ({
    id: `frage-${idx}`,
    title: q.t,
    kind: 'Offene Frage',
    href: '/fragen',
    haystack: `${q.t} ${plain(q.body)} ${q.rec ?? ''}`.toLowerCase(),
  })),
  { id: 'sec-ideen', title: '50 Feature-Ideen', kind: 'Bereich', href: '/ideen', haystack: 'katalog 50 feature ideen teil c' },
  { id: 'sec-graph', title: 'Lagekarte', kind: 'Bereich', href: '/graph', haystack: 'graph lagekarte verbindungen abhängigkeiten' },
  { id: 'sec-umsetzung', title: 'Umsetzung', kind: 'Bereich', href: '/umsetzung', haystack: 'umsetzung roadmap teil d mvp season' },
  { id: 'sec-fragen', title: 'Offene Fragen', kind: 'Bereich', href: '/fragen', haystack: 'offene fragen entscheidungen' },
];

/** Einfache, tolerante Suche: alle Query-Wörter müssen im Haystack vorkommen. */
export function search(query: string, limit = 12): SearchEntry[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const terms = q.split(/\s+/);
  const scored: { e: SearchEntry; score: number }[] = [];
  for (const e of SEARCH_INDEX) {
    if (!terms.every((t) => e.haystack.includes(t))) continue;
    // Titel-Treffer höher gewichten
    const titleHit = terms.filter((t) => e.title.toLowerCase().includes(t)).length;
    scored.push({ e, score: titleHit * 10 + 1 });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.e);
}
