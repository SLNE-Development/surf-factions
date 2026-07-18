import Link from 'next/link';
import { Graph } from '@/components/Graph';

export default function GraphPage() {
  return (
    <div className="view">
      <div className="crumb">
        <Link href="/">Übersicht</Link>
        <span className="crumb__sep">/</span>
        Lagekarte
      </div>
      <div className="eyebrow">Verbindungen</div>
      <h1 className="title title--sm">Die Lagekarte</h1>
      <p className="lede">
        Jeder Knoten ist ein Kernsystem, jede Linie eine Abhängigkeit. Das Konzept ist kein Feature-Katalog, sondern ein Geflecht
        — kaum ein System steht allein. Ziehen zum Verschieben, Scrollen zum Zoomen, Klick öffnet das System.
      </p>
      <Graph />
    </div>
  );
}
