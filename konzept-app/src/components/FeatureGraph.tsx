'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { neighborhood } from '@/lib/graph-model';
import { nodeColor, routeOf, titleOf } from '@/lib/helpers';

interface Placed {
  id: string;
  title: string;
  x: number;
  y: number;
  dir: 'out' | 'in';
  why: string;
}

const W = 1000;
const CX = W / 2;
const RADX = 250;

const short = (s: string) => (s.length > 24 ? s.slice(0, 23).trimEnd() + '…' : s);

/** Kompakter Abhängigkeits-Graph rund um ein einzelnes Feature.
 *  Ausgehende Verweise rechts, eingehende links — als Bogen um das Zentrum. */
export function FeatureGraph({ id }: { id: string }) {
  const router = useRouter();
  const [hover, setHover] = useState<string | null>(null);

  const { nodes, H, CY, RADY } = useMemo(() => {
    const { outgoing, incoming } = neighborhood(id);
    // Höhe skaliert mit der belebteren Seite, damit auch Hubs luftig bleiben.
    const maxSide = Math.max(outgoing.length, incoming.length, 1);
    const H = Math.max(420, maxSide * 46 + 90);
    const CY = H / 2;
    const RADY = H / 2 - 46;
    const place = (arr: { id: string; why: string }[], dir: 'out' | 'in'): Placed[] => {
      const n = arr.length;
      const side = dir === 'out' ? 1 : -1;
      return arr.map((item, i) => {
        // t: 0 (oben) .. 1 (unten) — verteilt die Knoten über den Halbbogen
        const t = n === 1 ? 0.5 : i / (n - 1);
        const spread = n === 1 ? 0 : (t - 0.5) * 2; // -1..1
        const vertical = Math.sin((spread * Math.PI) / 2); // -1..1, an den Rändern gestaucht
        const horiz = 0.42 + 0.58 * Math.cos((spread * Math.PI) / 2); // 1 in der Mitte, 0.42 an den Rändern
        return {
          id: item.id,
          title: titleOf(item.id),
          x: CX + side * horiz * RADX,
          y: CY + vertical * RADY,
          dir,
          why: item.why,
        };
      });
    };
    return { nodes: [...place(outgoing, 'out'), ...place(incoming, 'in')], H, CY, RADY };
  }, [id]);

  const centerColor = nodeColor(id);

  return (
    <div className="fgraph">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Abhängigkeiten von ${titleOf(id)}`}>
        <defs>
          <marker id="fg-arrow-out" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0 0 L7 3.5 L0 7 Z" fill="var(--war)" />
          </marker>
          <marker id="fg-arrow-in" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0 0 L7 3.5 L0 7 Z" fill="var(--peace)" />
          </marker>
        </defs>

        {nodes.map((n) => {
          const active = hover === n.id;
          const stroke = n.dir === 'out' ? 'var(--war)' : 'var(--peace)';
          const dx = n.x - CX;
          const dy = n.y - CY;
          const len = Math.hypot(dx, dy) || 1;
          const near = { x: CX + (dx / len) * 28, y: CY + (dy / len) * 28 };
          const far = { x: n.x - (dx / len) * 12, y: n.y - (dy / len) * 12 };
          // out: Pfeil zeigt weg vom Zentrum (→ Nachbar). in: Pfeil zeigt zum Zentrum.
          const from = n.dir === 'out' ? near : far;
          const to = n.dir === 'out' ? far : near;
          return (
            <line
              key={`e-${n.id}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={stroke}
              strokeOpacity={active ? 0.95 : 0.42}
              strokeWidth={active ? 2 : 1.2}
              markerEnd={`url(#fg-arrow-${n.dir})`}
            />
          );
        })}

        <g>
          <circle cx={CX} cy={CY} r={26} fill={centerColor} fillOpacity={0.18} stroke={centerColor} strokeWidth={2} />
          <circle cx={CX} cy={CY} r={5} fill={centerColor} />
          <text x={CX} y={CY + 46} textAnchor="middle" className="fg-center-label">
            {titleOf(id)}
          </text>
        </g>

        {nodes.map((n) => {
          const c = nodeColor(n.id);
          const active = hover === n.id;
          return (
            <g
              key={n.id}
              className="fg-node"
              onMouseEnter={() => setHover(n.id)}
              onMouseLeave={() => setHover(null)}
              onClick={() => router.push(routeOf(n.id))}
            >
              <circle cx={n.x} cy={n.y} r={9} fill={c} fillOpacity={active ? 0.4 : 0.16} stroke={c} strokeWidth={1.6} />
              <text
                x={n.x + (n.dir === 'out' ? 15 : -15)}
                y={n.y + 4}
                textAnchor={n.dir === 'out' ? 'start' : 'end'}
                className="fg-label"
                style={{ fill: active ? '#fff' : 'var(--ink-dim)' }}
              >
                {short(n.title)}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="fg-legend">
        <span>
          <i className="fg-dot" style={{ background: 'var(--war)' }} /> hängt ab von / verweist auf
        </span>
        <span>
          <i className="fg-dot" style={{ background: 'var(--peace)' }} /> wird gebraucht von
        </span>
        <span className="fg-hint">Klick öffnet das Feature</span>
      </div>
    </div>
  );
}
