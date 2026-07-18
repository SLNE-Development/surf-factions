'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ROADMAP_TRACKS, type Milestone, type MilestoneStatus, type RoadmapTrack } from '@/data';

const STATUS_LABEL: Record<MilestoneStatus, string> = {
  launch: 'Launch',
  geplant: 'Geplant',
  ausbau: 'Ausbau',
};

/** Ein Knoten der vertikalen Timeline: Phasenmarke, Titel, Status, Chips/Module. */
function TimelineNode({ m, dev }: { m: Milestone; dev: boolean }) {
  return (
    <div className={`tl__node status-${m.status}`}>
      <div className="tl__rail" aria-hidden>
        <span className="tl__dot" />
      </div>
      <div className="tl__body">
        <div className="tl__head">
          <span className="tl__phase">{m.phase}</span>
          <span className={`tl__status status-${m.status}`}>{STATUS_LABEL[m.status]}</span>
        </div>
        <h3 className="tl__title">{m.title}</h3>
        <p className="tl__desc">{m.desc}</p>

        {dev && m.modules && (
          <div className="tl__mods">
            {m.modules.map((mod) => (
              <span className="mod" key={mod}>
                {mod}
              </span>
            ))}
          </div>
        )}

        {!dev && m.chips && (
          <div className="tl__chips">
            {m.chips.map((c) => (
              <span className="tl__chip" key={c}>
                {c}
              </span>
            ))}
          </div>
        )}

        {m.note && (
          <div className="callout callout--peace tl__note">
            <div className="callout__l">Hinweis</div>
            <p>{m.note}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Timeline({ track }: { track: RoadmapTrack }) {
  const dev = track.id === 'dev';
  return (
    <>
      <p className="lede">{track.lede}</p>
      <div className="tl">
        {track.milestones.map((m, i) => (
          <TimelineNode key={i} m={m} dev={dev} />
        ))}
      </div>
    </>
  );
}

export default function RoadmapPage() {
  const [tab, setTab] = useState<RoadmapTrack['id']>('allgemein');
  const active = ROADMAP_TRACKS.find((t) => t.id === tab) ?? ROADMAP_TRACKS[0];

  return (
    <div className="view">
      <div className="crumb">
        <Link href="/">Übersicht</Link>
        <span className="crumb__sep">/</span>
        Roadmap
      </div>
      <div className="eyebrow">Fahrplan</div>
      <h1 className="title title--sm">Roadmap</h1>

      <div className="rtabs" role="tablist" aria-label="Roadmap-Ansicht">
        {ROADMAP_TRACKS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={t.id === tab}
            className={`rtab${t.id === tab ? ' is-active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <Timeline track={active} />
    </div>
  );
}
