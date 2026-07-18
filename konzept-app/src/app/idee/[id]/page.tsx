import Link from 'next/link';
import { notFound } from 'next/navigation';
import { IDEAS } from '@/data';
import { ideaById } from '@/lib/helpers';
import { Blocks, OriginChip, SectionHeading, TagChips } from '@/components/primitives';
import { Connections } from '@/components/Connections';
import { DevSection } from '@/components/DevSection';
import { FeatureGraph } from '@/components/FeatureGraph';
import { PageNav } from '@/components/PageNav';

export function generateStaticParams() {
  return IDEAS.map((i) => ({ id: i.id }));
}

export default function IdeaPage({ params }: { params: { id: string } }) {
  const it = ideaById.get(params.id);
  if (!it) notFound();

  const idx = IDEAS.indexOf(it);
  const prev = IDEAS[idx - 1];
  const next = IDEAS[idx + 1];

  return (
    <div className="view">
      <div className="crumb">
        <Link href="/">Übersicht</Link>
        <span className="crumb__sep">/</span>
        <Link href="/ideen">50 Feature-Ideen</Link>
        <span className="crumb__sep">/</span>
        Nr. {it.nr}
      </div>

      <div className="eyebrow">
        Teil C · {it.cat} · Idee {it.nr}/50
      </div>
      <h1 className="title title--sm">{it.title}</h1>

      <div className="chips">
        <OriginChip origin={it.origin} />
        <TagChips tags={it.tags} />
      </div>

      <SectionHeading marker="Was">Was ist das?</SectionHeading>
      <div className="prose">
        <Blocks blocks={it.was} />
      </div>

      <SectionHeading marker="Wie" tone="war">
        Wie funktioniert es?
      </SectionHeading>
      <div className="prose">
        <Blocks blocks={it.wie} />
      </div>

      {it.warum && (
        <>
          <SectionHeading marker="Warum" tone="peace">
            Warum
          </SectionHeading>
          <div className="prose">
            <Blocks blocks={it.warum} />
          </div>
        </>
      )}

      <SectionHeading marker="⇄">Verbindungen</SectionHeading>
      <FeatureGraph id={it.id} />
      <Connections links={it.links} />

      <DevSection id={it.id} />

      <PageNav
        prev={prev ? { href: `/idee/${prev.id}`, label: prev.title, dir: `◂ Idee ${prev.nr}` } : { href: '/ideen', label: 'Katalog', dir: '◂' }}
        next={next ? { href: `/idee/${next.id}`, label: next.title, dir: `Idee ${next.nr} ▸` } : { href: '/ideen', label: 'Katalog', dir: '▸' }}
      />
    </div>
  );
}
