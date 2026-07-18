import Link from 'next/link';
import type { LinkRef } from '@/data';
import { routeOf, titleOf } from '@/lib/helpers';
import { Html } from './primitives';

/** Der „Verbindungen“-Block: klickbare Querverweise zu verwandten Features. */
export function Connections({ links }: { links?: LinkRef[] }) {
  if (!links || links.length === 0) return <p style={{ color: 'var(--ink-faint)' }}>—</p>;
  return (
    <div className="links">
      {links.map((l, i) => (
        <Link key={i} href={routeOf(l.to)} className="link">
          <span className="link__to">
            <span className="arrow">▸</span>
            {titleOf(l.to)}
          </span>
          <Html className="link__why" html={l.why} />
        </Link>
      ))}
    </div>
  );
}
