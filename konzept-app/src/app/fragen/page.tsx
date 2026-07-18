import Link from 'next/link';
import { QUESTIONS } from '@/data';
import { Blocks } from '@/components/primitives';

export default function FragenPage() {
  return (
    <div className="view">
      <div className="crumb">
        <Link href="/">Übersicht</Link>
        <span className="crumb__sep">/</span>
        Offene Fragen
      </div>
      <div className="eyebrow">Teil B.5 &amp; D</div>
      <h1 className="title title--sm">Offene Fragen</h1>
      <p className="lede">
        Bewusst nicht entschieden. Keine Balancing-Details, sondern Aussagen darüber, wofür der Server da ist und wen er schützt.
        Zu jeder Frage meine Empfehlung.
      </p>

      {QUESTIONS.map((q, i) => (
        <div className="q" key={i}>
          <div className="q__k">
            {q.block && <span className="block">Blockierend</span>}
            Offene Frage
          </div>
          <div className="q__t">{q.t}</div>
          <div className="q__body">
            <Blocks blocks={q.body} />
          </div>
          {q.rec && (
            <div className="q__rec">
              <span className="l">Meine Empfehlung</span>
              <p>{q.rec}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
