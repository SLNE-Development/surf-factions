import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { IdeaFeature } from '@/data';
import { catAccent, plain, routeOf } from '@/lib/helpers';
import { Chip } from './primitives';

/** Karte im 50-Ideen-Katalog. */
export function IdeaCard({ idea }: { idea: IdeaFeature }) {
  return (
    <Link href={routeOf(idea.id)} className="card" style={{ ['--accent' as any]: catAccent(idea.cat) } as CSSProperties}>
      <div className="card__nr">
        Nr. {idea.nr} · {idea.cat}
      </div>
      <div className="card__title">{idea.title}</div>
      <div className="card__desc">{plain(idea.was).slice(0, 140)}…</div>
      <div className="card__foot">
        {(idea.tags ?? []).map((t) => (
          <Chip key={t} c={t}>
            {t}
          </Chip>
        ))}
      </div>
    </Link>
  );
}

/** Einstiegs-Karte auf der Startseite. */
export function NavCard({ href, title, desc, accent }: { href: string; title: string; desc: string; accent: string }) {
  return (
    <Link href={href} className="card" style={{ ['--accent' as any]: accent } as CSSProperties}>
      <div className="card__title">{title}</div>
      <div className="card__desc">{desc}</div>
    </Link>
  );
}
