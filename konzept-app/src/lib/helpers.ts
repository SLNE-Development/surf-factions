import { SYSTEMS, IDEAS, NAVGROUPS, type Block } from '@/data';

/** Schnelle Nachschlage-Maps für Systeme und Ideen. */
export const systemById = new Map(SYSTEMS.map((s) => [s.id, s]));
export const ideaById = new Map(IDEAS.map((i) => [i.id, i]));

/** Titel eines Systems oder einer Idee anhand der ID. */
export function titleOf(id: string): string {
  return systemById.get(id)?.title ?? ideaById.get(id)?.title ?? id;
}

/** Route zu einem System oder einer Idee anhand der ID. */
export function routeOf(id: string): string {
  if (systemById.has(id)) return `/system/${id}`;
  if (ideaById.has(id)) return `/idee/${id}`;
  return '/';
}

const CAT_ACCENT: Record<string, string> = {
  'Krieg und Belagerung': 'var(--war)',
  'Wirtschaft und Logistik': 'var(--gold)',
  'Territorium und Welt': 'var(--moss)',
  'Fraktionen und Teamplay': 'var(--peace)',
  'Fortschritt und Motivation': 'var(--ausbau)',
};

/** Akzentfarbe einer Ideen-Kategorie. */
export function catAccent(cat: string): string {
  return CAT_ACCENT[cat] ?? 'var(--war)';
}

const GROUP_COLORS = ['var(--war)', 'var(--gold)', 'var(--peace)', 'var(--ausbau)'];

/** Knotenfarbe im Graph anhand der Navigationsgruppe des Systems. */
export function nodeColor(id: string): string {
  for (let i = 0; i < NAVGROUPS.length; i++) {
    if (NAVGROUPS[i].ids.includes(id)) return GROUP_COLORS[i];
  }
  return 'var(--ink-faint)';
}

/** Reiner Text aus einem Block-Array (für Karten-Auszüge, Suche). */
export function plain(blocks: Block[] | undefined): string {
  return (blocks ?? [])
    .map((b) => {
      if (typeof b === 'string') return b;
      if ('ul' in b) return b.ul.join(' ');
      if ('ausbau' in b) return Array.isArray(b.ausbau) ? b.ausbau.join(' ') : b.ausbau;
      if ('callout' in b) return b.callout;
      return '';
    })
    .join(' ')
    .replace(/<[^>]+>/g, '');
}
