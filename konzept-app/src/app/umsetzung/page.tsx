import Link from 'next/link';
import { ROADMAP } from '@/data';
import { Blocks, SectionHeading } from '@/components/primitives';

export default function UmsetzungPage() {
  return (
    <div className="view">
      <div className="crumb">
        <Link href="/">Übersicht</Link>
        <span className="crumb__sep">/</span>
        Umsetzung
      </div>
      <div className="eyebrow">Teil D</div>
      <h1 className="title title--sm">Empfehlung zur Umsetzung</h1>
      <p className="lede">{ROADMAP.lede}</p>

      <SectionHeading marker="!" tone="war">
        Vier Entscheidungen, die vor allem anderen fallen müssen
      </SectionHeading>
      <div className="prose">
        {ROADMAP.decisions.map((d, i) => (
          <div className="callout callout--war" key={i}>
            <div className="callout__l">Entscheidung {i + 1}</div>
            <p>
              <strong>{d.t}</strong> — {d.d}
            </p>
          </div>
        ))}
      </div>

      <SectionHeading marker="S1">Vorgeschlagener Umfang</SectionHeading>
      <div className="prose">
        <Blocks blocks={ROADMAP.scope} />
      </div>

      <SectionHeading marker="⌚" tone="peace">
        Kapitel-Fahrplan
      </SectionHeading>
      <table className="tbl">
        <thead>
          <tr>
            <th>Phase</th>
            <th>Inhalt</th>
          </tr>
        </thead>
        <tbody>
          {ROADMAP.phases.map((p, i) => (
            <tr key={i}>
              <td>
                <b>{p.t}</b>
              </td>
              <td>{p.d}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <SectionHeading marker="?">Was noch gebraucht wird</SectionHeading>
      <div className="prose">
        <Blocks blocks={ROADMAP.need} />
      </div>
    </div>
  );
}
