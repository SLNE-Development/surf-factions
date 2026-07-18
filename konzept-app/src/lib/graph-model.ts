import { SYSTEMS, IDEAS, type LinkRef } from '@/data';

export interface Related {
  id: string;
  why: string;
}
export interface Neighborhood {
  outgoing: Related[]; // dieses Feature hängt von … ab / verweist auf …
  incoming: Related[]; // … verweist auf dieses Feature
}

const ALL = [...SYSTEMS, ...IDEAS];
const linksById = new Map<string, LinkRef[]>(ALL.map((f) => [f.id, f.links ?? []]));

/** Direkte Nachbarschaft eines Features: ausgehende Verweise + eingehende Verweise. */
export function neighborhood(id: string): Neighborhood {
  const outgoing: Related[] = (linksById.get(id) ?? []).map((l) => ({ id: l.to, why: l.why }));
  const outSet = new Set(outgoing.map((o) => o.id));

  const incoming: Related[] = [];
  for (const f of ALL) {
    if (f.id === id) continue;
    const l = (f.links ?? []).find((x) => x.to === id);
    if (l && !outSet.has(f.id)) incoming.push({ id: f.id, why: l.why });
  }
  return { outgoing, incoming };
}
