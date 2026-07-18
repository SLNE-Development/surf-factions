import type { ReactNode } from 'react';
import { TAGS, type Block, type Origin, type Tag, type Tone } from '@/data';

/** Rendert vertrauenswürdiges Inline-HTML (fett, Inline-Code etc.) aus dem Datensatz. */
export function Html({ html, as = 'span', className }: { html: string; as?: keyof JSX.IntrinsicElements; className?: string }) {
  const Tag = as as any;
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

export function Chip({ children, c, variant }: { children: ReactNode; c?: Tag; variant?: 'status' | 'kern' | 'ausbau' }) {
  return (
    <span className={`chip${variant ? ` chip--${variant}` : ''}`} data-c={c}>
      {children}
    </span>
  );
}

export function TagChips({ tags }: { tags?: Tag[] }) {
  return (
    <>
      {(tags ?? []).map((t) => (
        <Chip key={t} c={t}>
          {t} · {TAGS[t]}
        </Chip>
      ))}
    </>
  );
}

export function OriginChip({ origin }: { origin?: Origin }) {
  return origin === 'ausbau' ? <Chip variant="ausbau">Ausbau</Chip> : <Chip variant="kern">Aus dem Konzept</Chip>;
}

export function Callout({ callout, tone = 'war', l }: { callout: string; tone?: Tone; l?: string }) {
  return (
    <div className={`callout callout--${tone}`}>
      {l && <div className="callout__l">{l}</div>}
      <Html as="p" html={callout} />
    </div>
  );
}

export function AusbauBlock({ items }: { items: string[] }) {
  return (
    <div className="ausbau">
      <div className="ausbau__tag">Ausbau — meine Ergänzung</div>
      {items.map((p, i) => (
        <Html key={i} as="p" html={p} />
      ))}
    </div>
  );
}

/** Rendert ein Array von Inhaltsblöcken (Absatz, Liste, Ausbau-Kasten, Callout). */
export function Blocks({ blocks }: { blocks?: Block[] }) {
  return (
    <>
      {(blocks ?? []).map((b, i) => {
        if (typeof b === 'string') return <Html key={i} as="p" html={b} />;
        if ('ul' in b)
          return (
            <ul key={i}>
              {b.ul.map((li, j) => (
                <Html key={j} as="li" html={li} />
              ))}
            </ul>
          );
        if ('ausbau' in b) return <AusbauBlock key={i} items={Array.isArray(b.ausbau) ? b.ausbau : [b.ausbau]} />;
        if ('callout' in b) return <Callout key={i} callout={b.callout} tone={b.tone} l={b.l} />;
        return null;
      })}
    </>
  );
}

export function SectionHeading({ marker, tone, children }: { marker: string; tone?: 'war' | 'peace'; children: ReactNode }) {
  return (
    <h2 className={`sec${tone ? ` tone-${tone}` : ''}`}>
      <span className="k-marker">{marker}</span>
      {children}
    </h2>
  );
}
