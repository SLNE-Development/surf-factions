import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SYSTEMS } from '@/data';
import { systemById } from '@/lib/helpers';
import { Blocks, Chip, OriginChip, SectionHeading, TagChips } from '@/components/primitives';
import { Connections } from '@/components/Connections';
import { DevSection } from '@/components/DevSection';
import { FeatureGraph } from '@/components/FeatureGraph';
import { PageNav } from '@/components/PageNav';

export function generateStaticParams() {
  return SYSTEMS.map((s) => ({ id: s.id }));
}

export default function SystemPage({ params }: { params: { id: string } }) {
  const s = systemById.get(params.id);
  if (!s) notFound();

  const idx = SYSTEMS.indexOf(s);
  const prev = SYSTEMS[idx - 1];
  const next = SYSTEMS[idx + 1];

  return (
    <div className="view">
      <div className="crumb">
        <Link href="/">Übersicht</Link>
        <span className="crumb__sep">/</span>
        Kernsysteme
        <span className="crumb__sep">/</span>
        {s.title}
      </div>

      <div className="eyebrow">{s.kicker ?? 'Kernsystem'}</div>
      <h1 className="title">{s.title}</h1>
      {s.lede && <p className="lede">{s.lede}</p>}

      <div className="chips">
        {s.status && <Chip variant="status">{s.status}</Chip>}
        <OriginChip origin={s.origin} />
        <TagChips tags={s.tags} />
      </div>

      <SectionHeading marker="Was">Was ist das?</SectionHeading>
      <div className="prose">
        <Blocks blocks={s.was} />
      </div>

      <SectionHeading marker="Wie" tone="war">
        Wie funktioniert es?
      </SectionHeading>
      <div className="prose">
        <Blocks blocks={s.wie} />
      </div>

      {s.warum && (
        <>
          <SectionHeading marker="Warum" tone="peace">
            Warum
          </SectionHeading>
          <div className="prose">
            <Blocks blocks={s.warum} />
          </div>
        </>
      )}

      <SectionHeading marker="⇄">Verbindungen</SectionHeading>
      <FeatureGraph id={s.id} />
      <Connections links={s.links} />

      <DevSection id={s.id} />

      <PageNav
        prev={prev ? { href: `/system/${prev.id}`, label: prev.title, dir: '◂ zurück' } : undefined}
        next={next ? { href: `/system/${next.id}`, label: next.title, dir: 'weiter ▸' } : undefined}
      />
    </div>
  );
}
