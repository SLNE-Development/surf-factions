'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { SYSTEMS } from '@/data';
import { nodeColor } from '@/lib/helpers';

interface GNode {
  id: string;
  label: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}
interface Layout {
  nodes: GNode[];
  edges: [string, string][];
  vb: { x: number; y: number; w: number; h: number };
}

const W = 1000;
const H = 680;

/** Deterministisches Force-Directed-Layout der Kernsysteme. */
function computeLayout(): Layout {
  const nodes: GNode[] = SYSTEMS.map((s) => ({ id: s.id, label: s.title, x: 0, y: 0, vx: 0, vy: 0, r: 0 }));
  const nmap = new Map(nodes.map((n) => [n.id, n]));
  const edges: [string, string][] = [];
  SYSTEMS.forEach((s) => {
    (s.links ?? []).forEach((l) => {
      if (nmap.has(l.to) && l.to !== s.id) edges.push([s.id, l.to]);
    });
  });

  const deg: Record<string, number> = {};
  edges.forEach(([a, b]) => {
    deg[a] = (deg[a] ?? 0) + 1;
    deg[b] = (deg[b] ?? 0) + 1;
  });
  nodes.forEach((n) => {
    n.r = 7 + Math.min(12, (deg[n.id] ?? 0) * 1.4);
  });
  nodes.forEach((n, i) => {
    const a = (i / nodes.length) * Math.PI * 2;
    n.x = W / 2 + Math.cos(a) * 300;
    n.y = H / 2 + Math.sin(a) * 250;
  });

  const edgeN: [GNode, GNode][] = edges.map(([a, b]) => [nmap.get(a)!, nmap.get(b)!]);
  for (let it = 0; it < 460; it++) {
    for (let a = 0; a < nodes.length; a++)
      for (let b = a + 1; b < nodes.length; b++) {
        const na = nodes[a];
        const nb = nodes[b];
        const dx = na.x - nb.x;
        const dy = na.y - nb.y;
        const d2 = dx * dx + dy * dy + 0.01;
        const d = Math.sqrt(d2);
        const f = 11000 / d2;
        const ux = dx / d;
        const uy = dy / d;
        na.vx += ux * f;
        na.vy += uy * f;
        nb.vx -= ux * f;
        nb.vy -= uy * f;
      }
    edgeN.forEach(([p, q]) => {
      const dx = q.x - p.x;
      const dy = q.y - p.y;
      const d = Math.sqrt(dx * dx + dy * dy) + 0.01;
      const f = (d - 190) * 0.009;
      const ux = dx / d;
      const uy = dy / d;
      p.vx += ux * f;
      p.vy += uy * f;
      q.vx -= ux * f;
      q.vy -= uy * f;
    });
    nodes.forEach((n) => {
      n.vx += (W / 2 - n.x) * 0.004;
      n.vy += (H / 2 - n.y) * 0.004;
      n.x += Math.max(-16, Math.min(16, n.vx));
      n.y += Math.max(-16, Math.min(16, n.vy));
      n.vx *= 0.84;
      n.vy *= 0.84;
    });
  }

  let minX = 1e9;
  let minY = 1e9;
  let maxX = -1e9;
  let maxY = -1e9;
  nodes.forEach((n) => {
    const lw = n.label.length * 6.1 + n.r + 10;
    minX = Math.min(minX, n.x - n.r);
    minY = Math.min(minY, n.y - 14);
    maxX = Math.max(maxX, n.x + lw);
    maxY = Math.max(maxY, n.y + 14);
  });
  const pad = 36;
  return { nodes, edges, vb: { x: minX - pad, y: minY - pad, w: maxX - minX + pad * 2, h: maxY - minY + pad * 2 } };
}

/** Interaktive Lagekarte: Systeme als Knoten, Abhängigkeiten als Kanten. */
export function Graph() {
  const router = useRouter();
  const { nodes, edges, vb } = useMemo(computeLayout, []);
  const svgRef = useRef<SVGSVGElement>(null);
  const posById = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const view = { ...vb };
    const apply = () => svg.setAttribute('viewBox', `${view.x} ${view.y} ${view.w} ${view.h}`);

    let panning = false;
    let moved = false;
    let px = 0;
    let py = 0;

    const onDown = (e: MouseEvent) => {
      panning = true;
      moved = false;
      px = e.clientX;
      py = e.clientY;
    };
    const onMove = (e: MouseEvent) => {
      if (!panning) return;
      moved = true;
      const r = svg.getBoundingClientRect();
      view.x -= (e.clientX - px) * (view.w / r.width);
      view.y -= (e.clientY - py) * (view.h / r.height);
      px = e.clientX;
      py = e.clientY;
      apply();
    };
    const onUp = () => {
      panning = false;
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const s = e.deltaY > 0 ? 1.1 : 0.9;
      const r = svg.getBoundingClientRect();
      const mx = view.x + ((e.clientX - r.left) / r.width) * view.w;
      const my = view.y + ((e.clientY - r.top) / r.height) * view.h;
      const ns = Math.max(220, Math.min(2400, view.w * s)) / view.w;
      view.w *= ns;
      view.h *= ns;
      view.x = mx - ((e.clientX - r.left) / r.width) * view.w;
      view.y = my - ((e.clientY - r.top) / r.height) * view.h;
      apply();
    };

    svg.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    svg.addEventListener('wheel', onWheel, { passive: false });

    const nodeEls = Array.from(svg.querySelectorAll<SVGGElement>('.g-node'));
    const edgeEls = Array.from(svg.querySelectorAll<SVGLineElement>('.g-edge'));
    const cleanups: (() => void)[] = [];

    nodeEls.forEach((node) => {
      const id = node.dataset.id!;
      const enter = () => {
        node.classList.add('hot');
        edgeEls.forEach((ed) => {
          if (ed.dataset.a === id || ed.dataset.b === id) {
            ed.classList.add('hot');
            const other = ed.dataset.a === id ? ed.dataset.b : ed.dataset.a;
            svg.querySelector(`.g-node[data-id="${other}"]`)?.classList.add('hot');
          }
        });
      };
      const leave = () => {
        Array.from(svg.querySelectorAll('.hot')).forEach((x) => x.classList.remove('hot'));
      };
      const click = () => {
        if (!moved) router.push(`/system/${id}`);
      };
      node.addEventListener('mouseenter', enter);
      node.addEventListener('mouseleave', leave);
      node.addEventListener('click', click);
      cleanups.push(() => {
        node.removeEventListener('mouseenter', enter);
        node.removeEventListener('mouseleave', leave);
        node.removeEventListener('click', click);
      });
    });

    return () => {
      svg.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      svg.removeEventListener('wheel', onWheel);
      cleanups.forEach((c) => c());
    };
  }, [vb, router]);

  return (
    <div className="graphwrap">
      <svg ref={svgRef} viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`} preserveAspectRatio="xMidYMid meet">
        <g>
          {edges.map(([a, b], i) => {
            const na = posById.get(a)!;
            const nb = posById.get(b)!;
            return (
              <line
                key={i}
                className="g-edge"
                data-a={a}
                data-b={b}
                x1={na.x.toFixed(1)}
                y1={na.y.toFixed(1)}
                x2={nb.x.toFixed(1)}
                y2={nb.y.toFixed(1)}
              />
            );
          })}
          {nodes.map((n) => {
            const c = nodeColor(n.id);
            return (
              <g key={n.id} className="g-node" data-id={n.id} transform={`translate(${n.x.toFixed(1)},${n.y.toFixed(1)})`}>
                <circle r={n.r.toFixed(1)} fill={c} fillOpacity={0.16} stroke={c} strokeWidth={1.5} />
                <circle r={3} fill={c} />
                <text x={(n.r + 6).toFixed(1)} y={4}>
                  {n.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
      <div className="graph-hint">ziehen · zoomen · klicken</div>
      <div className="graph-legend">
        <span>
          <i style={{ background: 'var(--war)' }} />
          Krieg / Territorium
        </span>
        <span>
          <i style={{ background: 'var(--gold)' }} />
          Wirtschaft / Welt
        </span>
        <span>
          <i style={{ background: 'var(--peace)' }} />
          Fraktion / Diplomatie
        </span>
        <span>
          <i style={{ background: 'var(--ausbau)' }} />
          Fortschritt / Meta
        </span>
      </div>
    </div>
  );
}
