import Link from 'next/link';
import { IdeaCatalog } from '@/components/IdeaCatalog';

export default function IdeenPage() {
  return (
    <div className="view">
      <div className="crumb">
        <Link href="/">Übersicht</Link>
        <span className="crumb__sep">/</span>
        50 Feature-Ideen
      </div>
      <div className="eyebrow">Teil C</div>
      <h1 className="title title--sm">50 neue Feature-Ideen</h1>
      <p className="lede">
        Ideen, die dem Autor auf deutschen Factions-Servern nicht bekannt sind — jede P2W-frei, mit eigener Pluginentwicklung
        umsetzbar, und auf mindestens zwei der Ziele Langzeitmotivation, PvP, Teamplay, Wiederspielwert und einzigartige Mechanik
        einzahlend.
      </p>
      <IdeaCatalog />
    </div>
  );
}
