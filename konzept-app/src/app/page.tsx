import Link from 'next/link';
import { PILLARS, SYSTEMS } from '@/data';
import { routeOf } from '@/lib/helpers';
import { NavCard } from '@/components/Cards';

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="hstat">
      <div className="hstat__n">{n}</div>
      <div className="hstat__l">{l}</div>
    </div>
  );
}

function Frontline() {
  return (
    <svg className="hero__frontline" viewBox="0 0 1000 34" preserveAspectRatio="none" aria-hidden="true">
      <path
        id="fl"
        d="M0 17 L120 17 L150 6 L180 26 L210 12 L260 20 L300 8 L340 24 L380 14 L440 17 L1000 17"
        fill="none"
        stroke="var(--war)"
        strokeWidth="2"
        strokeDasharray="1600"
        strokeDashoffset="1600"
      >
        <animate attributeName="stroke-dashoffset" from="1600" to="0" dur="1.6s" fill="freeze" />
      </path>
      <circle r="3" fill="var(--war)">
        <animateMotion dur="1.6s" fill="freeze">
          <mpath href="#fl" />
        </animateMotion>
      </circle>
    </svg>
  );
}

export default function HomePage() {
  return (
    <div className="view">
      <div className="hero">
        <div className="hero__eyebrow">Konzeptpapier für einen Factions-Server 2026 · Arbeitstitel</div>
        <h1 className="hero__mark">
          FRON<span>TEN</span>
        </h1>
        <Frontline />
        <div className="hero__thesis">
          Man verliert Territorium, Ressourcen und Rang — aber niemals die Base, in die man 40 Stunden gesteckt hat.{' '}
          <b>Man kämpft um Kontrolle, nicht um Existenz.</b>
        </div>
        <div className="hero__meta">
          <Stat n={String(SYSTEMS.length)} l="Kernsysteme" />
          <Stat n="50" l="Feature-Ideen" />
          <Stat n="14" l="Plugin-Module" />
          <Stat n="~18" l="Wochen / Season" />
          <Stat n="6" l="Beziehungsstufen" />
        </div>
      </div>

      <div className="blockhead">
        <div className="blockhead__k">Das Profil — 5 Säulen</div>
        <div className="blockhead__t">Was es auf keinem deutschen Factions-Server gibt</div>
        <div className="blockhead__d">
          Fünf Entscheidungen, die zusammen ein Profil ergeben. Jede erbt aus der bestehenden CastCrafter-DNA: Zeit als einzige
          harte Währung, kein Server-Shop, erzwungene Spielerinteraktion, Vanilla-Gefühl vor Feature-Overload.
        </div>
      </div>

      {PILLARS.map((p, i) => (
        <Link className="pillar" href={routeOf(p.to)} key={p.t}>
          <div className="pillar__nr">{i + 1}</div>
          <div>
            <div className="pillar__t">{p.t}</div>
            <div className="pillar__d">{p.d}</div>
          </div>
        </Link>
      ))}

      <div className="blockhead">
        <div className="blockhead__k">Einstieg</div>
        <div className="blockhead__t">Erkunde das Konzept</div>
      </div>
      <div className="grid">
        <NavCard
          href="/system/belagerung"
          title="Kernsysteme"
          desc="Das Belagerungssystem, Lebenssystem, Ökonomie, Diplomatie & mehr — ausführlich erklärt."
          accent="var(--war)"
        />
        <NavCard
          href="/ideen"
          title="50 Feature-Ideen"
          desc="Der durchsuchbare Katalog aller Ideen aus Teil C, filterbar nach Fokus."
          accent="var(--gold)"
        />
        <NavCard
          href="/graph"
          title="Lagekarte"
          desc="Der interaktive Verbindungs-Graph: wie alle Systeme voneinander abhängen."
          accent="var(--peace)"
        />
        <NavCard
          href="/umsetzung"
          title="Umsetzung"
          desc="Die vier blockierenden Entscheidungen und der Season-1-Fahrplan."
          accent="var(--moss)"
        />
        <NavCard
          href="/fragen"
          title="Offene Fragen"
          desc="Team-Entscheidungen aus Teil B.5 und D — mit meiner Empfehlung."
          accent="var(--ausbau)"
        />
      </div>

      <div className="callout callout--peace" style={{ marginTop: 40 }}>
        <div className="callout__l">Zum Ausbau-Status</div>
        <p>
          <strong>„Aus dem Konzept“</strong> markiert Inhalte des Original-Papiers.{' '}
          <strong style={{ color: 'var(--ausbau)' }}>◆ Ausbau</strong>-Blöcke sind meine Ergänzungen: konkrete Zahlenvorschläge
          statt Platzhalter, Balancing-Hinweise und Empfehlungen zu offenen Fragen. Alle Original-Zahlenwerte sind laut Papier
          Platzhalter für Balancing-Tests.
        </p>
      </div>
    </div>
  );
}
