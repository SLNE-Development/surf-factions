// AUTO-GENERIERT aus dem Konzept-Inhalt. Enthält alle Texte 1:1.
// Bearbeiten: Inhalte hier pflegen — die Komponenten rendern rein datengetrieben.

export type Tag = 'LZ' | 'PVP' | 'TP' | 'WW' | 'EM';
export type Tone = 'war' | 'peace' | 'gold';
export type Origin = 'kern' | 'ausbau';

export type Block =
  | string
  | { ul: string[] }
  | { ausbau: string | string[] }
  | { callout: string; tone?: Tone; l?: string };

export interface LinkRef { to: string; why: string; }

export interface SystemFeature {
  id: string; title: string; nrLabel?: string; kicker?: string; lede?: string;
  status?: string; origin?: Origin; tags?: Tag[];
  was: Block[]; wie: Block[]; warum?: Block[]; links: LinkRef[];
}

export interface IdeaFeature {
  id: string; nr: number; cat: string; title: string; origin?: Origin; tags?: Tag[];
  was: Block[]; wie: Block[]; warum?: Block[]; links: LinkRef[];
}

export interface Pillar { t: string; d: string; to: string; }
export interface Question { t: string; block?: boolean; body: Block[]; rec?: string; }
export interface RoadmapDecision { t: string; d: string; }
export interface RoadmapPhase { t: string; d: string; }
export interface Roadmap {
  lede: string; decisions: RoadmapDecision[]; scope: Block[]; phases: RoadmapPhase[]; need: Block[];
}

/** Status-Band eines Meilensteins auf der Roadmap-Timeline. */
export type MilestoneStatus = 'launch' | 'geplant' | 'ausbau';
/** Ein Knoten auf der vertikalen Roadmap-Timeline. */
export interface Milestone {
  phase: string;              // Kurzmarke links am Zeitstrahl, z. B. "MVP · Season 1"
  title: string;             // Überschrift des Meilensteins
  status: MilestoneStatus;   // Status-Band (Launch / Geplant / Ausbau)
  desc: string;              // ein Satz Einordnung
  chips?: string[];          // Feature-Chips (Track „Allgemein")
  modules?: string[];        // verantwortliche Module (Track „Dev")
  note?: string;             // optionaler Guardrail/Hinweis (Track „Dev")
}
/** Ein Roadmap-Track = ein Tab (Allgemein oder Dev) mit eigener Meilenstein-Liste. */
export interface RoadmapTrack {
  id: 'allgemein' | 'dev';
  label: string;
  lede: string;
  milestones: Milestone[];
}

export interface NavGroup { label: string; ids: string[]; }

export const TAGS: Record<Tag, string> = {
  "LZ": "Langzeitmotivation",
  "PVP": "PvP",
  "TP": "Teamplay",
  "WW": "Wiederspielwert",
  "EM": "Einzigartige Mechanik"
};

export const PILLARS: Pillar[] = [
  {
    "t": "Belagerung statt Raid",
    "d": "Territorium wechselt über angekündigte Belagerungen mit klaren Objectives — nicht durch heimliches Sprengen. Beide Seiten wissen, wann es losgeht. Zuschauerbar, streambar, planbar.",
    "to": "belagerung"
  },
  {
    "t": "Logistik als Spielinhalt",
    "d": "Ressourcen müssen physisch transportiert werden. Wer die Nachschublinie kappt, gewinnt die Front ohne einen Kampf. Das gibt Nicht-PvP-Spielern eine kriegsentscheidende Rolle.",
    "to": "pvp"
  },
  {
    "t": "Der Kernblock",
    "d": "Jede Fraktion hat genau einen physischen Block als Herz. Er bestimmt Claim-Radius, Respawn und Lager — und ist bei Belagerung das Ziel. Daraus entsteht echte Geopolitik.",
    "to": "claims"
  },
  {
    "t": "Zeit ist Kriegsmacht",
    "d": "Nicht Grind, sondern aktive Anwesenheit erzeugt die Kriegsressource „Mandat“. Ein 8-Mann-Clan mit 8 Aktiven schlägt einen 40-Mann-Clan mit 5 Aktiven. Zerg-Clans sind strukturell benachteiligt.",
    "to": "oekonomie"
  },
  {
    "t": "Öffentliche Chronik",
    "d": "Jede Belagerung, jeder Vertrag, jeder Verrat wird automatisch verewigt — Web + Discord. Sie erzeugt Content statt nur Gameplay und ist die Vorlage für das Season-Abschlussvideo.",
    "to": "chronik"
  }
];

export const SYSTEMS: SystemFeature[] = [
  {
    "id": "belagerung",
    "title": "Belagerung",
    "nrLabel": "A8",
    "kicker": "Teil A · Punkt 8 · Säule 1 · Das Kernsystem",
    "status": "MVP · Season 1",
    "origin": "kern",
    "tags": [
      "PVP",
      "TP",
      "EM"
    ],
    "lede": "Territorium wechselt nicht durch heimliches Sprengen, sondern durch angekündigte Belagerungen mit klaren Objectives. Beide Seiten wissen, wann es losgeht — zuschauerbar, streambar, planbar.",
    "was": [
      "Die Belagerung ersetzt das klassische Raid. Statt eine Base über Nacht wegzusprengen, kündigt der Angreifer einen Kampf an, der zu einem für den Verteidiger planbaren Zeitpunkt in einem festen Zeitfenster stattfindet. Erst dann — und nur dann — ist im Zielterritorium überhaupt etwas zerstörbar.",
      "Das ist die eine Design-Entscheidung, an der das ganze Konzept hängt: <em>Man kämpft um Kontrolle, nicht um Existenz.</em>"
    ],
    "wie": [
      {
        "ul": [
          "<b>1. Ansage.</b> Der Angreifer erklärt eine Belagerung: <span class='k'>/f siege declare &lt;Fraktion&gt; &lt;Chunk&gt;</span> und zahlt Mandat. Die Kosten skalieren mit der Entfernung zur eigenen Grenze — Fernangriffe auf die andere Kartenseite sind teuer.",
          "<b>2. Öffentlichkeit.</b> Die Ansage landet automatisch im Belagerungskalender, im Discord und in der Chronik. Vorlaufzeit: 24–48 h.",
          "<b>3. Fensterwahl.</b> Der Verteidiger wählt aus seinen hinterlegten Verteidigungsfenstern eines aus.",
          "<b>4. Öffnung.</b> Zum Zeitpunkt X öffnet sich die Zone. Nur dann ist Blockzerstörung im Ziel möglich, und nur in definierten Grenzen (Tore, Türme, sichtbare Strukturen — nie Blockdurchdringung).",
          "<b>5. Objective.</b> Der Angreifer muss drei automatisch generierte Kontrollpunkte am Claim-Rand für je 5 Minuten halten und danach den Kernblock-Bereich 3 Minuten kontrollieren. Zeitlimit: 45 Minuten.",
          "<b>6. Ergebnis.</b> Angreifer gewinnt → Chunk-Übernahme + Plünderung des Fraktionslagers (nie der Privatkisten). Verteidiger gewinnt → Angreifer verliert das eingesetzte Mandat, Territorium bleibt, Verteidiger bekommt „Standhaft“-Bonus."
        ]
      },
      {
        "callout": "Persönliche Bauwerke und Privatkisten sind niemals Beute. Beute ist immer nur das Fraktionslager — also das, was die Fraktion bewusst als Kriegskasse riskiert hat. Wer nichts einlagert, riskiert nichts, verliert aber auch die Lager-Boni.",
        "tone": "war",
        "l": "Der Vertrag mit dem Spieler"
      },
      {
        "ausbau": [
          "Konkrete Startwerte für Balancing-Tests: Grundkosten einer Ansage ≈ 400 Mandat, +25 Mandat pro Chunk Distanz zur eigenen Grenze. Kontrollpunkt-Radius 6 Blöcke, Fortschritt friert ein, sobald ein Verteidiger im Punkt steht.",
          "Statt harter TNT-Sperre empfehle ich einen <b>Wall-Breaker-Timer</b> (siehe Idee 8): Tore/Mauern haben eine sichtbare HP-Leiste, die nur während der Belagerung sinkt und danach regeneriert. So bleibt die Base physisch heil, der Angreifer sieht seinen Fortschritt, und niemand braucht Cannon-Wissen."
        ]
      }
    ],
    "warum": [
      "Offline-Raiding, Cannon-Meta und Bunker-Bases — die drei Killer des Genres — werden gleichzeitig gelöst: Angriffe sind zeitlich planbar, laufen über ein Objective statt über Sprengtechnik, und zielen auf sichtbare Strukturen statt auf 40×40-Obsidianwürfel.",
      "Für einen Creator-Server ist der Nebeneffekt Gold: Konflikte liegen in planbaren Fenstern, also entsteht automatisch ein Kalender aus Stream-Highlights."
    ],
    "links": [
      {
        "to": "verteidigungsfenster",
        "why": "Die <b>Verteidigungsfenster</b> legen fest, <b>wann</b> eine Belagerung überhaupt stattfinden darf — sie sind die Voraussetzung des ganzen Systems."
      },
      {
        "to": "claims",
        "why": "Ziel jeder Belagerung ist der <b>Kernblock-Bereich</b>; die Heimat-Chunks sind dabei immer unantastbar."
      },
      {
        "to": "oekonomie",
        "why": "Eine Ansage kostet <b>Mandat</b> — verliert der Angreifer, ist es verbrannt. Das ist die zentrale Kriegssenke."
      },
      {
        "to": "kriegszustaende",
        "why": "Eine Belagerung ist nur im Zustand <b>Krieg</b> möglich — im Pakt ist sie gesperrt."
      },
      {
        "to": "chronik",
        "why": "Jede Belagerung wird automatisch protokolliert — Zeitverlauf, Wendepunkte, Beteiligte."
      },
      {
        "to": "bosse",
        "why": "Der <b>Belagerungsgolem</b> ist ein reines Verteidigungswerkzeug, das nur während einer Belagerung erwacht."
      },
      {
        "to": "idee-3",
        "why": "Der <b>Belagerungsring</b> macht aus jeder Belagerung eine Veranstaltung mit Publikum."
      },
      {
        "to": "idee-5",
        "why": "Der <b>Waffenstillstand mit Countdown</b> erlaubt Verhandlung mitten im Kampf."
      },
      {
        "to": "idee-7",
        "why": "<b>Belagerungsgerät als Bauwerk</b> ersetzt die alte Cannon-Meta durch sichtbare, kooperative Strukturen."
      }
    ]
  },
  {
    "id": "kriegszustaende",
    "title": "Kriegszustände & Vertragsbruch",
    "nrLabel": "B3",
    "kicker": "Teil B.3 / B.4",
    "status": "MVP · Season 1",
    "origin": "kern",
    "tags": [
      "PVP",
      "TP",
      "EM"
    ],
    "lede": "Das Verhältnis zweier Fraktionen ist immer genau einer von drei Zuständen — Pakt, Neutral, Krieg. Jeder definiert eindeutig, was PvP-technisch passiert. Verrat ist möglich, aber er hat einen Preis und ein Gedächtnis.",
    "was": [
      "Bewusst auf drei Zustände reduziert — vier oder mehr sind im Kampf nicht mehr lesbar. Der Zustand entscheidet über direkten Schaden, Flächenschaden, Belagerbarkeit."
    ],
    "wie": [
      {
        "callout": "<b>Pakt</b> (Nichtangriff/Bündnis/Föderation): erster gezielter Treffer wird gecancelt + Warnung, zweiter geht durch und leitet den Bruch ein. AoE/Crystal/TNT zwischen Paktpartnern wird <b>immer stumm verworfen</b>. Belagerung nicht möglich. — <b>Neutral</b>: normaler Schaden, keine Belagerung. — <b>Krieg</b>: alles normal, Belagerung möglich.",
        "tone": "peace",
        "l": "Die drei Zustände"
      },
      "Die AoE-Sonderbehandlung ist der wichtigste technische Punkt: Würde ein Crystal-Blast zwischen Verbündeten zählen, könnten sie nicht mehr Seite an Seite kämpfen — jeder Schuss wäre ein potenzieller Vertragsbruch. Nur ein bewusster, gezielter, direkter Angriff kann ein Bruch sein.",
      "<b>Vertragsbruch-Ablauf:</b>",
      {
        "ul": [
          "<b>Treffer 1 — Warnung.</b> Schaden wird gecancelt (kein Schaden, kein Knockback). Nur der Angreifer bekommt Title + Sound: „VERTRAGSBRUCH — der nächste Treffer bricht den Vertrag.“ Zähler-Verfall: 10 Minuten.",
          "<b>Treffer 2 — Bruch.</b> Schaden geht durch. Der Spieler wird persönlich als „Vertragsbrüchig“ markiert (Tab, Chat, Chronik). Beide Anführer werden gepingt. Der Pakt bricht hier aber noch nicht.",
          "<b>24-h-Frist.</b> Der Anführer der Täterfraktion muss sich positionieren: Member bestrafen/kicken → Pakt hält, kleiner Ansehensverlust. Schweigen → Pakt bricht automatisch, voller Ansehensverlust, 14 Tage „Vertragsbrüchig“ für die ganze Fraktion.",
          "<b>3 markierte Member gleichzeitig</b> → Pakt bricht sofort, unabhängig vom Anführer."
        ]
      },
      "Das schließt zwei Exploits: Ein eingeschleuster Troll-Alt kann kein Bündnis zerstören (man kickt ihn), und keine Fraktion kann sich hinter einem designierten „Brecher“ verstecken."
    ],
    "warum": [
      "Ein Diplomatiesystem ohne Verrat ist eine Freundschaftsliste. Aber Verrat darf nie aus Versehen passieren: Zweimal zuschlagen ist eine Entscheidung, einmal ist ein Fehlklick. Und es erzeugt genau die Szene, die man sehen will — schützt der Anführer seinen Freund oder sein Bündnis? Öffentlich, mit Countdown, in der Chronik."
    ],
    "links": [
      {
        "to": "diplomatie",
        "why": "Die Zustände sind das PvP-Rückgrat des <b>Vertragssystems</b> — Verträge definieren, wer im Pakt steht."
      },
      {
        "to": "belagerung",
        "why": "Belagerung ist nur im Zustand Krieg möglich; ein Pakt muss erst gekündigt werden (48 h)."
      },
      {
        "to": "chronik",
        "why": "Jeder Bruch erzeugt automatisch einen Eintrag und Pings an beide Anführer — Diplomatie wird zu öffentlichem Drama."
      },
      {
        "to": "idee-39",
        "why": "„Die gemeinsame Schuld“ erweitert das Haftungsprinzip: die ganze Fraktion trägt den Ansehensverlust eines Bruchs."
      }
    ]
  },
  {
    "id": "claims",
    "title": "Claims & Kernblock",
    "nrLabel": "A19",
    "kicker": "Teil A · Punkt 19 · Säule 3",
    "status": "MVP · Season 1",
    "origin": "kern",
    "tags": [
      "TP",
      "EM"
    ],
    "lede": "Chunk-basierte Claims, ausgehend von einem einzigen physischen Block — dem Kernblock (Faction Heart). Er bestimmt Claim-Radius, Respawn und Lager. Wo man ihn hinstellt, ist die zentrale geopolitische Entscheidung.",
    "was": [
      "Jede Fraktion hat genau <em>einen</em> Kernblock als Herz. Claims sind zusammenhängend: Jeder geclaimte Chunk muss an einen bestehenden angrenzen — Exklaven gibt es nicht. Das erzeugt echte Grenzen, Nachbarschaften und Frontlinien statt eines bedeutungslosen Flickenteppichs."
    ],
    "wie": [
      {
        "ul": [
          "<b>Kapazität</b> = Funktion aus Mandat (aktive Mitglieder) + Kernblock-Ausbaustufe. <b>Nicht</b> aus Mitgliederzahl. Ein 10-Mann-Clan mit 9 Aktiven claimt mehr als ein 30-Mann-Clan mit 6 Aktiven.",
          "<b>Unterhalt.</b> Jeder Chunk kostet laufend Mandat, überproportional steigend (z. B. quadratisch ab Chunk 20). Ein Riesenreich ist möglich, frisst aber alles — der eingebaute Anti-Snowball-Regler.",
          "<b>Claim-Reifezeit.</b> Ein frisch eroberter Chunk ist 48 h nicht weiter belagerbar und gibt 48 h keine Erträge. Verhindert Blitz-Ketteneroberungen.",
          "<b>Heimat-Chunks</b> (Kernblock + 8 angrenzende): immer unantastbar, kein Unterhalt. Man kann eine Fraktion zurückdrängen, aber nie auslöschen.",
          "<b>Wildnis.</b> Ein fester Anteil der Karte (Vorschlag: 40 %) bleibt permanent unclaimbar — dort liegen Events, Dungeons, Ressourcen.",
          "<b>Sichtbarkeit.</b> Grenzen sind im Spiel sichtbar (Partikel an der Chunk-Kante, <span class='k'>/f seechunk</span>, Dynmap). Niemand löst versehentlich Krieg aus."
        ]
      },
      {
        "callout": "Bewusst <b>kein</b> Power-per-Player-System (das klassische Factions-Modell). Es belohnt Masse und bestraft Tod — beides erzeugt genau die Anreize, die man nicht will: Alt-Accounts, Todesangst, passives Spiel.",
        "tone": "war",
        "l": "Was NICHT"
      },
      {
        "ausbau": [
          "Kernblock-Ausbaustufen als konkrete Progression: Stufe 1 = 12 Chunks Kapazität, jede weitere Stufe +8, finanziert über Mandat + seltene Baupläne aus Dungeons (Werkstattpläne). Das verknüpft Territorialgröße direkt mit Gruppen-Content statt mit Kopfzahl."
        ]
      }
    ],
    "warum": [
      "Der Kernblock macht aus einer abstrakten Claim-Liste eine physische Geopolitik: Stelle ich mein Herz sicher hinten hin oder aggressiv an die Front, wo die guten Ressourcen liegen? Die Heimat-Immunität deckelt Snowballing und garantiert Comebacks."
    ],
    "links": [
      {
        "to": "belagerung",
        "why": "Der Kernblock-Bereich ist das finale Objective jeder Belagerung."
      },
      {
        "to": "oekonomie",
        "why": "Claim-Kapazität und Unterhalt laufen komplett über <b>Mandat</b> — Claims sind die größte Mandat-Senke."
      },
      {
        "to": "verteidigungsfenster",
        "why": "Kernblock-Immunität und Verteidigungsfenster bilden zusammen den Anti-Snowball-Schutz."
      },
      {
        "to": "ressourcen",
        "why": "Besondere Ressourcen liegen in der unclaimbaren Wildnis — Territorium allein ernährt keine Fraktion."
      },
      {
        "to": "idee-24",
        "why": "„Grenzsteine“ machen Claims zu physischen, zerstörbaren Objekten statt zu Commands."
      },
      {
        "to": "idee-31",
        "why": "„Die Rollenpflicht“ koppelt Claim-Kapazität an besetzte Fraktionsrollen."
      },
      {
        "to": "idee-19",
        "why": "„Ressourcen-Erschöpfung“ macht ausgebeutete Territorien über die Season wertlos und erzwingt Expansion."
      }
    ]
  },
  {
    "id": "verteidigungsfenster",
    "title": "Verteidigungsfenster & Anti-Grief",
    "nrLabel": "A18",
    "kicker": "Teil A · Punkt 18 · Die wichtigste Frage",
    "status": "MVP · Season 1",
    "origin": "kern",
    "tags": [
      "TP",
      "EM"
    ],
    "lede": "Jede Fraktion legt zwei 2-Stunden-Fenster pro Woche fest, in denen sie belagerbar ist. Außerhalb ist das Territorium absolut geschützt. Das löst Offline-Raiding nicht teilweise, sondern vollständig.",
    "was": [
      "„Wenn dieser Punkt falsch gelöst wird, ist alles andere egal.“ Die Verteidigungsfenster sind öffentlich einsehbar (<span class='k'>/f info</span>, Website, Discord). Änderungen greifen erst nach 7 Tagen — man kann sich nicht kurzfristig aus einer angekündigten Belagerung herausschieben."
    ],
    "wie": [
      {
        "ul": [
          "<b>Absoluter Schutz außerhalb der Fenster:</b> keine Blockzerstörung, keine Container-Zugriffe, kein Betreten für Fremde, kein TNT, Feuer, Flüssigkeiten, Pistonschieben, keine Enderpearl-Glitches.",
          "<b>Zwingende Anwesenheit:</b> Eine Belagerung findet nur statt, wenn ≥2 Verteidiger online sind. Sonst wird sie verschoben (max. 2×), danach fällt der Chunk kampflos — Land verloren, aber kein Loot-Rausch.",
          "<b>Kernblock-Immunität:</b> Kernblock-Chunk + 8 Nachbarn sind nie eroberbar.",
          "<b>Getrennte Beutebereiche:</b> Privatkisten niemals plünderbar; Fraktionslager bei verlorener Belagerung zu festem Prozentsatz (z. B. 25 %).",
          "<b>Neulingsschutz:</b> erste 72 h — keine Belagerungspflicht, Startgebiet PvP-frei, reduzierter Ausrüstungsverlust. Nicht abschaltbar.",
          "<b>Rollback-Fähigkeit:</b> CoreProtect-äquivalentes Logging als Support-Werkzeug, nicht als Gameplay."
        ]
      },
      {
        "callout": "Man kann schlafen. Man kann in den Urlaub fahren. Man verliert dann Territorium, weil man die Belagerung nicht verteidigt — aber man verliert nicht seine Base, seine Kisten und seine Motivation. Wer nicht spielt, verliert Land. Wer nicht spielt, verliert nicht sein Zuhause.",
        "tone": "peace",
        "l": "Das Versprechen"
      }
    ],
    "warum": [
      "Offline-Raiding ist der Grund, warum das Genre gestorben ist: Der Spieler, der nachts um 2 online ist, gewinnt gegen den, der arbeitet oder zur Schule geht. Das ist kein Skill-, sondern ein Verfügbarkeitswettbewerb. Die Fenster machen daraus einen fairen Termin."
    ],
    "links": [
      {
        "to": "belagerung",
        "why": "Die Fenster sind die Voraussetzung des gesamten Belagerungssystems — sie bestimmen das <b>Wann</b>."
      },
      {
        "to": "claims",
        "why": "Kernblock-Immunität + Fenster = der Anti-Snowball-Schutz."
      },
      {
        "to": "onboarding",
        "why": "72-h-Neulingsschutz ist Teil desselben Systems."
      },
      {
        "to": "antipatterns",
        "why": "Offline-Raiding steht ganz oben auf der Liste der absolut ausgeschlossenen Features."
      },
      {
        "to": "technik",
        "why": "Der Belagerungs-Scheduler muss Fenster über Neustarts und Sommerzeit hinweg persistent halten."
      }
    ]
  },
  {
    "id": "pvp",
    "title": "PvP & Logistik",
    "nrLabel": "A8",
    "kicker": "Teil A · Punkt 8 · Säule 2",
    "status": "MVP + Kapitel 2",
    "origin": "kern",
    "tags": [
      "PVP",
      "TP",
      "EM"
    ],
    "lede": "Die Frage ist nicht „welches Combat-System“, sondern „wofür wird gekämpft und wann“. Vier Systeme bauen aufeinander auf — und Logistik macht Nicht-PvP-Spieler kriegsentscheidend.",
    "was": [
      "Combat bleibt <em>Vanilla 1.21+</em> (Attack-Cooldown), keine Custom-Kits, keine Fähigkeiten mit Cooldown-Bars. Ausrüstung ist der Skill-Ausdruck, und Ausrüstung kommt aus der Wirtschaft — womit sich der Kreis zur Logistik schließt. CastCrafters Publikum will Minecraft spielen, kein MOBA."
    ],
    "wie": [
      {
        "ul": [
          "<b>System 1 — Belagerung</b> (eigenes Kernsystem): der Kampf um Territorium.",
          "<b>System 2 — Feldkampf.</b> Außerhalb von Claims offenes PvP (nur die Startzone ist sicher), aber ohne Blockzerstörung an fremdem Eigentum. Ressourcenkonflikte, Scharmützel — die tägliche Brot-und-Butter-Action.",
          "<b>System 3 — Duelle & Turniere.</b> Skill-Ventil. Stufe 1: angekündigte Turniere auf dem bestehenden Event-Server (1v1/3v3/Clan-vs-Clan, standardisiertes Gear) ab Season 1. Stufe 2: persistenter Duell-Ladder mit ELO — Neubau, Empfehlung Season 2.",
          "<b>System 4 — Konvoi/Überfall.</b> Kriegsressourcen stecken in einem sichtbaren „Fracht“-Item, das nicht in die Enderchest passt, Inventar-Slots blockiert und den Träger markiert (Partikel, Karten-Icon). Straßenraub als eigenes Spielfeld."
        ]
      },
      {
        "callout": "Wer die Nachschublinie kappt, gewinnt die Front, ohne einen Kampf zu führen. Kein <span class='k'>/sethome</span> in Kriegsgebiete, keine Enderchest-Wirtschaft für Kriegsgüter. Das gibt Logistikern, Spähern und Fuhrleuten eine kriegsentscheidende, nicht dekorative Rolle.",
        "tone": "peace",
        "l": "Logistik als Waffe"
      },
      "<b>Combat-Tag:</b> 30 Sekunden. Logout im Tag = der Charakter bleibt 30 s stehen und ist tötbar. Technisch erzwungen statt moderativ nachverfolgt.",
      {
        "ausbau": [
          "Konsequenz, die man aushalten muss: Ohne persistenten Ladder fehlt in Season 1 das Skill-Ventil — Sweats haben keinen anderen Ort als die Hauptwelt. Gedämpft durch die Belagerungsfenster, aber nicht beseitigt. Ich empfehle, die Duell-Server-Frage bewusst zu beantworten statt sie liegen zu lassen."
        ]
      }
    ],
    "warum": [
      "Indem Ausrüstung der einzige Skill-Verstärker ist und Ausrüstung physisch transportiert werden muss, wird jeder Nicht-Kämpfer-Beruf spielentscheidend. Das ist die Antwort auf das größte Retention-Problem: „Warum sollte ein Nicht-PvP-Spieler bleiben?“"
    ],
    "links": [
      {
        "to": "ressourcen",
        "why": "Fracht, Blutstein und Sternenerz sind die Güter, die durch die Logistik-Systeme fließen."
      },
      {
        "to": "belagerung",
        "why": "Die Belagerung ist System 1 und das Ziel, auf das Logistik und Feldkampf zulaufen."
      },
      {
        "to": "oekonomie",
        "why": "Rohstoffe sind die eigentliche Wirtschaft — Handel entsteht aus Logistik."
      },
      {
        "to": "events",
        "why": "Karawanen und Meteoriten sind die automatischen Magnetkonflikte für Feldkampf."
      },
      {
        "to": "idee-13",
        "why": "„Verderbliche Fracht“ erzeugt hektische, spontane Konvois abseits geplanter Routine."
      },
      {
        "to": "idee-20",
        "why": "Der „Frachtbrief“ lässt Spieler sich freiwillig eine Zielscheibe auf den Rücken malen."
      }
    ]
  },
  {
    "id": "oekonomie",
    "title": "Ökonomie — CastCoins & Mandat",
    "nrLabel": "A6",
    "kicker": "Teil A · Punkt 6/7 · Säule 4",
    "status": "MVP · Season 1",
    "origin": "kern",
    "tags": [
      "TP",
      "LZ",
      "EM"
    ],
    "lede": "Das bestehende CastCrafter-Modell übernehmen und um eine zweite, nicht handelbare Kriegsressource ergänzen. Man kann sich Wohlstand erhandeln, aber keine Macht kaufen.",
    "was": [
      "Drei Ebenen. Die Survival-Economy funktioniert, weil sie eine Regel radikal durchhält: Der Server ist keine Geldquelle und keine Geldsenke für Items. Genau das bleibt."
    ],
    "wie": [
      {
        "ul": [
          "<b>Ebene 1 — CastCoins</b> (handelbar). Identisch zum Survival: PayCheck pro aktiver Spielstunde, fester Konto-Cap, <span class='k'>/pay</span> zwischen Spielern, kein Server-Ankauf. Für Handel, Söldnerverträge, Kopfgelder, Friedenszonen-Parzellen.",
          "<b>Ebene 2 — Mandat</b> (nicht handelbar, fraktionsgebunden). Die Kriegswährung. Entsteht aus aktiver Spielzeit der Mitglieder und gehaltenem Territorium, verfällt langsam (Decay ~5 %/Tag). Bezahlt: Belagerungsansagen, Claim-Erweiterung, Kernblock-Verlegung, Fraktionsstrukturen.",
          "<b>Ebene 3 — Rohstoffe</b> als eigentliche Wirtschaft. Der echte Handel läuft über Güter, nicht über Coins."
        ]
      },
      {
        "callout": "Warum zwei Ebenen? Eine einzige Währung ist entweder handelbar (reiche Fraktion kauft sich Krieg) oder nicht handelbar (tote Wirtschaft). Die Trennung löst beides. Wohlstand ist handelbar, Macht nicht.",
        "tone": "gold",
        "l": "Der Kern-Trick"
      },
      "<b>PayCheck-Regeln:</b> „Aktiv“ muss AFK-sicher definiert sein (Bewegung, Interaktion, keine AFK-Pools). Kein Kill-Reward in Coins (sonst wird Spawnkilling zum Geschäftsmodell). Keine Quest-Belohnungen in Coins (untergräbt das Zeit-Prinzip) — Quests zahlen in Ressourcen, Mandat, Cosmetics, BattlePass.",
      "<b>Inflationsschutz:</b> Konto-Cap, Mandat-Decay, Belagerungen verbrennen Ausrüstung (permanente Senke), kein Villager-Handel, kein Server-Shop.",
      {
        "ausbau": [
          "Konkrete Startwerte: PayCheck 500 CastCoins/Std. mit Cap 100.000 (1:1 vom Survival). Fraktionskasse mit höherem Cap (~1 Mio.), aus der Söldnerverträge und Kopfgelder bezahlt werden. Mandat-Grundrate ≈ 60/aktiver Std./Mitglied, damit ein 8er-Kernteam eine Belagerung pro Woche stemmt."
        ]
      }
    ],
    "warum": [
      "Der deutsche Factions-Markt ist von P2W und Hyperinflation verbrannt. „Du kannst hier nichts kaufen, was dich stärker macht“ ist 2026 kein Verzicht, sondern das Alleinstellungsmerkmal — und CastCrafter hat diese Position bereits."
    ],
    "links": [
      {
        "to": "claims",
        "why": "Mandat bezahlt Claim-Kapazität und Unterhalt — die größte Senke."
      },
      {
        "to": "belagerung",
        "why": "Belagerungsansagen kosten Mandat; verlorene Ansagen verbrennen es."
      },
      {
        "to": "ressourcen",
        "why": "Mandat-Kristalle aus Bossen sind die einzige Mandat-Quelle außerhalb von Spielzeit."
      },
      {
        "to": "diplomatie",
        "why": "Söldnerverträge, Tribute und Kredite laufen über die Coin-Ebene."
      },
      {
        "to": "monetarisierung",
        "why": "Kaufbar ist nur Kosmetik/QoL — niemals Coins, Mandat oder Vorteile."
      },
      {
        "to": "toplisten",
        "why": "Keine Topliste darf reine Zeit belohnen — sonst gewinnt Verfügbarkeit statt Können."
      },
      {
        "to": "idee-12",
        "why": "„Der Wechselkurs“ macht echte Spielerhandelsdaten öffentlich lesbar."
      },
      {
        "to": "idee-17",
        "why": "„Kredite und Schulden“ verwandeln Zahlungsausfall in einen legitimen Kriegsgrund."
      }
    ]
  },
  {
    "id": "ressourcen",
    "title": "Besondere Ressourcen",
    "nrLabel": "A23",
    "kicker": "Teil A · Punkt 23",
    "status": "Kapitel 2+",
    "origin": "kern",
    "tags": [
      "EM",
      "TP",
      "WW"
    ],
    "lede": "Das Konfliktdesign-Werkzeug Nummer eins. Ihre Verteilung auf der Karte ist die Geopolitik des Servers — sie liegen überwiegend in der unclaimbaren Wildnis und in Grenzregionen, nie sicher im eigenen Reich.",
    "was": [
      "Sechs Ressourcentypen mit klaren Rollen. Keine ist einfach „besseres Erz“ — jede erzwingt eine bestimmte Spielweise: Events besuchen, laut in der Wildnis schürfen, physisch transportieren oder gemeinsam Bosse legen."
    ],
    "wie": [
      {
        "ul": [
          "<b>Sternenerz</b> (aus Meteoriten, event-gebunden): Basis für verstärkte Baumaterialien und Belagerungsgerät. Nicht farmbar → planbare Konfliktpunkte.",
          "<b>Blutstein</b> (Wildnis-Adern, respawnt langsam): Basis für Kriegsverbrauch (Rauchbomben, Anker, Signalhorn). Abbau dauert und macht weithin sichtbare Geräusche/Partikel → kein heimliches Farmen.",
          "<b>Frachtgüter</b> (Karawanen, Dungeons, Produktion): das Transport-Item — nicht enderchest-fähig, blockiert Slots, sichtbar → Logistik als Spielinhalt.",
          "<b>Mandat-Kristalle</b> (Weltbosse, große Dungeons): wandeln sich in Fraktions-Mandat — die einzige Mandat-Quelle außerhalb von Spielzeit, hinter Gruppen-Content mit PvP-Risiko.",
          "<b>Regionale Bindung:</b> Bestimmte Regionen produzieren exklusiv bestimmte Materialien. Keine Fraktion kann alles selbst herstellen.",
          "<b>Reliquien</b> (siehe seltene Items): kosmetisch, sammelbar, wertvoll."
        ]
      },
      {
        "callout": "Die regionale Bindung ist die stärkste Einzelentscheidung des ganzen Wirtschaftsdesigns: Handel wird nicht empfohlen, er wird <b>erzwungen</b>. Aus erzwungenem Handel entsteht Diplomatie, aus Diplomatie Verrat, aus Verrat Content.",
        "tone": "gold",
        "l": "Der Hebel"
      },
      {
        "ausbau": [
          "Villager bleiben deaktiviert (wie im Survival), Totems/Mending kommen über Fishing. Konkreter Respawn: Blutstein-Ader regeneriert 1 Block/3 h bis zu ihrer Ursprungsgröße; ein Chunk kann so nicht dauerhaft eine Fraktion allein ernähren."
        ]
      }
    ],
    "warum": [
      "Ressourcen, die sicher im eigenen Reich lägen, würden die Karte am Tag 3 einfrieren. Indem das Wertvolle draußen und regional verteilt liegt, bleibt die ganze Welt umkämpft — und jeder Spielertyp (Schürfer, Fuhrmann, Boss-Gruppe) hat einen eigenen Weg zu Macht."
    ],
    "links": [
      {
        "to": "pvp",
        "why": "Fracht ist das Herz des Konvoi-Systems; Blutstein-Adern sind Feldkampf-Magnete."
      },
      {
        "to": "events",
        "why": "Sternenerz kommt ausschließlich aus Meteoriten-Events."
      },
      {
        "to": "bosse",
        "why": "Mandat-Kristalle droppen aus Weltbossen — Teamplay wird direkt in Machtprojektion umgesetzt."
      },
      {
        "to": "oekonomie",
        "why": "Rohstoffe sind Ebene 3 der Wirtschaft — der eigentliche Handel."
      },
      {
        "to": "items",
        "why": "Verstärkte Baumaterialien und Kriegsverbrauch werden aus diesen Ressourcen gefertigt."
      },
      {
        "to": "idee-19",
        "why": "„Ressourcen-Erschöpfung“ macht die Verteilung über die Season dynamisch."
      },
      {
        "to": "idee-15",
        "why": "„Spezialisierung“ verstärkt die regionale Arbeitsteilung auf Fraktionsebene."
      }
    ]
  },
  {
    "id": "items",
    "title": "Seltene Items",
    "nrLabel": "A22",
    "kicker": "Teil A · Punkt 22",
    "status": "Kapitel 2+",
    "origin": "kern",
    "tags": [
      "EM",
      "PVP",
      "TP"
    ],
    "lede": "Design-Regel: Seltene Items dürfen Möglichkeiten eröffnen, aber niemals Zahlen erhöhen. Ein Item, das mehr Schaden macht, ist ein Balance-Problem. Ein Item, das etwas anderes tut, ist ein Werkzeug.",
    "was": [
      "Eine Sammlung taktischer Werkzeuge, die eine Situation verändern, ohne sie allein zu gewinnen — plus rein kosmetische Wertanlagen für den Markt."
    ],
    "wie": [
      {
        "ul": [
          "<b>Bannerstab:</b> setzt einen zusätzlichen Kontrollpunkt bei einer Belagerung. Einmalverbrauch, aus Weltbossen.",
          "<b>Rauchbombe:</b> blockiert Sicht in einem Radius für 20 s. Kein Schaden, im 15v15 ein Werkzeug. Craftbar aus Blutstein.",
          "<b>Enterhaken:</b> begrenzte Nutzungen, wirkt nicht über Claim-Mauern. Mobilität, kein Power.",
          "<b>Signalhorn:</b> markiert Feinde im Umkreis von 50 Blöcken für 10 s. Aufklärung als Item.",
          "<b>Der Anker:</b> verhindert Enderpearl-Nutzung im Umkreis von 30 Blöcken für 5 min. Reines Verteidigungswerkzeug.",
          "<b>Werkstattpläne:</b> Rezepte für Fraktionsstrukturen (Türme, Tore, Golem) aus Dungeons Tier 3+. Nicht handelbar, aber der ganzen Fraktion nutzbar.",
          "<b>Reliquien:</b> kosmetische Einzelstücke mit Lore und Findername, feste Anzahl pro Season (z. B. 30). Handelbar, wertvoll, völlig funktionslos.",
          "<b>Kartenfragmente:</b> ergeben zusammengesetzt die Position eines Meteoriten/Dungeon-Eingangs — erzwingen Handel.",
          "<b>Verstärkte Baumaterialien:</b> halten mehr Belagerungsschaden aus. Der einzige „Stat“-Gegenstand — und er wirkt ausschließlich defensiv und nur im geplanten Konflikt."
        ]
      },
      {
        "callout": "Was NICHT existieren darf: Waffen/Rüstung über Netherit-Niveau, Custom-Enchantments mit PvP-Wirkung, alles, was einen Spieler ohne Gegenwehr besser macht als einen gleich ausgerüsteten. Die QoL-Enchantment-Linie (z. B. Replenish) ist genau die richtige Grenze.",
        "tone": "war",
        "l": "Die harte Linie"
      }
    ],
    "warum": [
      "Sobald ein Item Zahlen erhöht, wird der Server ein Wettrüsten und kein Spiel. Werkzeuge dagegen schaffen taktische Tiefe und Handelsanreize, ohne das Machtgefälle zu zementieren. Reliquien sind der Beweis, dass man Wertanlagen ohne Balance-Kosten bauen kann."
    ],
    "links": [
      {
        "to": "ressourcen",
        "why": "Fast jedes Werkzeug wird aus Blutstein oder Sternenerz gefertigt — wirtschaftlich verankert."
      },
      {
        "to": "belagerung",
        "why": "Bannerstab, verstärkte Materialien und Werkstattpläne verändern Belagerungen taktisch."
      },
      {
        "to": "bosse",
        "why": "Bannerstäbe und Mandat-Kristalle droppen aus Weltbossen."
      },
      {
        "to": "dungeons",
        "why": "Werkstattpläne stammen aus Dungeons Tier 3+ — ein Läufer wird für seinen Clan wertvoll."
      },
      {
        "to": "cosmetics",
        "why": "Reliquien überschneiden sich mit dem kosmetischen Prestige-System."
      },
      {
        "to": "idee-16",
        "why": "Der „Schwarzmarkt“ ist der Umschlagplatz für Reliquien, Fragmente und Pläne."
      }
    ]
  },
  {
    "id": "events",
    "title": "Automatische Events",
    "nrLabel": "A9",
    "kicker": "Teil A · Punkt 9",
    "status": "Kapitel 2+",
    "origin": "kern",
    "tags": [
      "PVP",
      "TP",
      "LZ"
    ],
    "lede": "Der Herzschlag zwischen den Belagerungen. Eine Regel entscheidet über alles: Jedes automatische Event muss Fraktionen an denselben Ort ziehen. Ein Event, bei dem jeder allein für sich Loot sammelt, ist verschwendete Server-Laufzeit.",
    "was": [
      "Ein getakteter Kalender aus täglichen, wöchentlichen und monatlichen Ereignissen, die alle nach demselben Prinzip funktionieren: Sie erzeugen Magnetkonflikte, indem sie Wertvolles an einen Ort und zu einer Zeit legen."
    ],
    "wie": [
      "<b>Täglich:</b>",
      {
        "ul": [
          "<b>Meteoritenschlag</b> (1×, zufällige Abendzeit, 15 min Vorwarnung mit Koordinaten): Krater mit Sternenerz in der Wildnis, langer Abbau, offenes PvP.",
          "<b>Karawane</b> (2×): NPC-Konvoi auf fester Route. Eskortieren <em>oder</em> überfallen — beides gleichzeitig unmöglich.",
          "<b>Ressourcen-Rift</b>: temporäres Portal (30 min) in eine Instanz mit erhöhter Erzdichte, max. 20 Spieler. Wer draußen wartet, kann reingehen oder die Rausgehenden abfangen."
        ]
      },
      "<b>Wöchentlich:</b>",
      {
        "ul": [
          "<b>Der Zoll</b> (z. B. Sonntag 19 Uhr): neutraler Marktplatz, 2 h, PvP aus, Handel an. Der einzige Zeitpunkt, an dem verfeindete Fraktionen sich sicher begegnen.",
          "<b>Sturmfront</b>: eine Zone wird 24 h zur Hochertragszone mit Debuff (keine Nahrungsregeneration). Alle wollen hin, keiner will bleiben.",
          "<b>Weltboss</b> (fester Termin, streambar)."
        ]
      },
      "<b>Monatlich / pro Season-Phase:</b>",
      {
        "ul": [
          "<b>Die Kluft</b>: die Weltkarte reißt auf, eine neue Region wird freigeschaltet. Wer zuerst da ist, claimt das Beste — der zentrale Anti-Stagnations-Hebel.",
          "<b>Belagerungsfestival</b>: 48 h mit 50 % Mandat-Rabatt auf Ansagen — planbare Eskalationswellen, perfekt für einen Stream-Marathon."
        ]
      },
      {
        "callout": "Ereignisdichte-Regel: <b>Nie mehr als ein Event gleichzeitig.</b> Der häufigste Fehler bei Event-Systemen ist, die Spieler zu zerstreuen statt sie zu bündeln.",
        "tone": "war",
        "l": "Die eine Regel"
      }
    ],
    "warum": [
      "Klassische Factions-Server bieten zwischen den Raids nichts außer AFK-Farmen. Die Events geben jeden Tag einen Termin, an dem etwas passiert, das man verpasst, wenn man nicht da ist — ein Grund online zu kommen, der kein Grind ist."
    ],
    "links": [
      {
        "to": "ressourcen",
        "why": "Meteoriten liefern Sternenerz, Karawanen Frachtgüter — Events sind die Quelle der Konfliktressourcen."
      },
      {
        "to": "pvp",
        "why": "Karawanen-Überfälle und Rift-Abfänge sind das Rückgrat des täglichen Feldkampfs."
      },
      {
        "to": "bosse",
        "why": "Der Wochenboss ist ein festes Event; der Season-Boss das Finale."
      },
      {
        "to": "community",
        "why": "Der Zoll ist zugleich das wichtigste soziale Event — der einzige sichere Treffpunkt."
      },
      {
        "to": "season",
        "why": "„Die Kluft“ und das Endzeit-Schrumpfen strukturieren die Season-Phasen."
      },
      {
        "to": "progression",
        "why": "„Nimm an einem Weltereignis teil“ ist ein Kern-Daily."
      },
      {
        "to": "idee-30",
        "why": "„Naturkatastrophen mit Vorwarnung“ erweitern die Weltereignisse um permanente Kartenänderung."
      }
    ]
  },
  {
    "id": "bosse",
    "title": "Bosskämpfe",
    "nrLabel": "A10",
    "kicker": "Teil A · Punkt 10",
    "status": "Kapitel 3",
    "origin": "kern",
    "tags": [
      "TP",
      "PVP",
      "WW"
    ],
    "lede": "Bosse haben genau zwei legitime Funktionen: Sie bündeln Spieler an einem Ort, und sie sind Quelle für nicht-farmbare Materialien. Ein Boss, den ein Clan allein in Ruhe abfarmt, ist ein Designfehler.",
    "was": [
      "Vier Bosstypen mit unterschiedlichen Rollen — vom öffentlichen PvP-Magneten bis zum Season-Finale, das Erzfeinde zur Kooperation zwingt."
    ],
    "wie": [
      {
        "ul": [
          "<b>Der Wächter der Tiefe</b> (wöchentlich, öffentlich, PvP an): mehrere Phasen mit wechselnden Schadensarten (Nah/Fern/Explosiv) — eine Gruppe muss divers ausgerüstet sein. Beute nach Schadensanteil → Fraktionen kämpfen gegen den Boss <em>und</em> gegeneinander.",
          "<b>Der Belagerungsgolem</b> (Verteidigungswerkzeug): für hohe Kosten im Kernblock-Bereich stationierbar, erwacht nur während einer Belagerung. Stark, aber besiegbar — kauft der Verteidigung Zeit, gewinnt nichts allein.",
          "<b>Dungeon-Endbosse</b> (instanziert, kein PvP innen, skalieren 3–8): das Casual-/Gruppen-Ventil und die Quelle für Cosmetics und Rezepte.",
          "<b>Der Season-Boss</b> (einmalig, Finale): HP absichtlich so hoch, dass mindestens drei Fraktionen kooperieren müssen. Erzwingt am Season-Ende einen Moment, in dem Erzfeinde zusammenarbeiten oder alle verlieren."
        ]
      },
      {
        "callout": "Was Bosse NICHT droppen dürfen: Waffen/Rüstung über Vanilla-Niveau. Sonst ist Boss-Zugang = Sieg und das Machtgefälle zementiert. Bosse droppen Mandat-Kristalle, Bannerstäbe, Cosmetics und Rezepte — nie rohe Kampfkraft.",
        "tone": "war",
        "l": "Die Loot-Regel"
      }
    ],
    "warum": [
      "Der Season-Boss ist als Finale eines Abschlussvideos kaum zu schlagen: erzwungene Kooperation der Erzfeinde, live, mit sichtbarem Ausgang. Und der Wächter der Tiefe ist der beste PvP-Content, den man automatisieren kann — weil Loot-nach-Schaden Kooperation und Konflikt gleichzeitig erzeugt."
    ],
    "links": [
      {
        "to": "events",
        "why": "Der Wochenboss ist ein festes Event im Kalender."
      },
      {
        "to": "ressourcen",
        "why": "Mandat-Kristalle aus Bossen sind die einzige Mandat-Quelle außerhalb von Spielzeit."
      },
      {
        "to": "belagerung",
        "why": "Der Belagerungsgolem gibt Verteidigungsinvestition ein sichtbares Gesicht."
      },
      {
        "to": "endgame",
        "why": "Der Season-Boss ist Endgame-Ebene 3 und das erzwungene Kooperations-Finale."
      },
      {
        "to": "dungeons",
        "why": "Dungeon-Endbosse sind das instanzierte Gruppen-Ventil."
      },
      {
        "to": "cosmetics",
        "why": "Trophäen für jeden besiegten Weltboss werden physisch in der Base aufstellbar."
      }
    ]
  },
  {
    "id": "dungeons",
    "title": "Dungeons — Die Schächte",
    "nrLabel": "A11",
    "kicker": "Teil A · Punkt 11",
    "status": "Kapitel 3",
    "origin": "kern",
    "tags": [
      "TP",
      "WW",
      "LZ"
    ],
    "lede": "Instanzen sind heikel — sie ziehen Spieler aus der Welt. Deshalb müssen sie kurz, sozial und ressourcenrelevant sein: prozedural zusammengesetzte Kurz-Dungeons aus handgebauten Raum-Modulen.",
    "was": [
      "„Die Schächte“ dauern 15–25 Minuten, funktionieren für Gruppen von 3–8 (solo langsamer) und werden aus vorgefertigten Raum-Modulen zufällig kombiniert — Wiederspielwert ohne 50 handgebaute Dungeons."
    ],
    "wie": [
      "<b>Eingang physisch in der Welt</b>, oft in umkämpften Regionen. Der Dungeon ist sicher, der Weg dorthin nicht — man kann am Ausgang abgefangen werden.",
      "<b>Beute:</b> Rezepte, Cosmetics, Baumaterialien, seltene Blöcke, Dungeon-Marken (Währung für den Kosmetik-Händler). <em>Kein Gear.</em>",
      "<b>Varianten:</b>",
      {
        "ul": [
          "<b>Die Bergungsstollen</b> (Tier 1, ab Tag 1): lehrt die Mechaniken.",
          "<b>Die Versunkene Bastion</b> (Tier 2): Gruppe nötig, Redstone-Rätsel — spielt direkt in die CastCrafter-Redstone-Kultur.",
          "<b>Der Wandelnde Schacht</b> (Tier 3, wöchentlich rotierend): Layout ändert sich jede Woche, Bestenliste nach Zeit — der Wiederspielwert-Motor.",
          "<b>Die Fraktionsprüfung</b> (Tier 4): nur als Fraktionsgruppe, skaliert auf 8, Beute geht ins Fraktionslager."
        ]
      },
      {
        "callout": "Dungeon-Lockouts pro Spieler (z. B. 3 Läufe/Tag für Belohnung, danach unbegrenzt aber ohne Loot). Sonst ist der Dungeon eine Farm und die Welt leer.",
        "tone": "gold",
        "l": "Anti-Farm"
      }
    ],
    "warum": [
      "Dungeons sind das Ventil für Casuals und Gruppen, die nicht dauernd im PvP stehen wollen — und die Quelle für Werkstattpläne, die einen einzelnen Läufer für seinen ganzen Clan wertvoll machen. Der wöchentlich rotierende Tier-3-Schacht hält Wiederspielwert über die Season."
    ],
    "links": [
      {
        "to": "bosse",
        "why": "Dungeon-Endbosse sind das instanzierte Gruppen-Ventil und die Cosmetic-Quelle."
      },
      {
        "to": "items",
        "why": "Werkstattpläne (Türme, Tore, Golem) stammen aus Dungeons Tier 3+."
      },
      {
        "to": "cosmetics",
        "why": "Dungeon-Marken sind die Währung des Kosmetik-Händlers."
      },
      {
        "to": "toplisten",
        "why": "Der Wandelnde Schacht hat eine wöchentliche Bestzeiten-Liste."
      },
      {
        "to": "ressourcen",
        "why": "Große Dungeons können Mandat-Kristalle liefern."
      },
      {
        "to": "progression",
        "why": "„Schließe einen Dungeon-Lauf ab“ ist ein Kern-Daily."
      }
    ]
  },
  {
    "id": "diplomatie",
    "title": "Diplomatie & Verträge",
    "nrLabel": "A20",
    "kicker": "Teil A · Punkt 20",
    "status": "MVP-Basis · Season 1",
    "origin": "kern",
    "tags": [
      "TP",
      "EM",
      "LZ"
    ],
    "lede": "Auf den meisten Servern ist Diplomatie eine /f ally-Liste — ein Freundschaftsbuch. Was man braucht, sind Verträge mit Kosten, Laufzeit und Konsequenz.",
    "was": [
      "Sechs Beziehungsstufen — Krieg → Feindschaft → Neutral → Nichtangriffspakt → Bündnis → Föderation — und ein Vertragssystem, in dem jeder Vertrag ein signiertes Objekt mit Bedingungen ist."
    ],
    "wie": [
      {
        "ul": [
          "<b>Vertrag</b> (<span class='k'>/f pact</span>): Laufzeit (7/14/30 Tage), Kündigungsfrist 48 h. Inhalte: Nichtangriff, Durchmarschrecht, Ressourcentribut, Beistandspflicht, Handelsprivilegien, Zollsätze, Gebietsabtretung.",
          "<b>Bruch ohne Kündigung:</b> hohe Mandat-Strafe + öffentlicher Status „Vertragsbrüchig“ für 14 Tage, Chronik-Eintrag, Malus auf künftige Vertragskosten. Verrat ist möglich, hat aber Preis und Gedächtnis.",
          "<b>Föderation</b> (höchste Stufe): gemeinsamer Kanal, Topliste, geteilte Belagerungsrechte — aber +15 % Mandat-Unterhalt pro zusätzlicher Fraktion. Das Mega-Bündnis wird nicht verboten, nur ruinös teuer.",
          "<b>Kriegserklärung:</b> kostet Mandat, öffentlich, mit Kriegsziel (z. B. „3 Chunks von X“), endet automatisch bei Zielerreichung oder nach 14 Tagen → erzeugt einen Friedensvertrag mit Bedingungen.",
          "<b>Söldnerverträge:</b> Fraktionslose Spieler werden für einzelne Belagerungen angeheuert (Bezahlung aus der Fraktionskasse) — der Solo-Spieler bekommt eine bezahlte Endgame-Rolle, ohne beizutreten.",
          "<b>Diplomaten-Rolle:</b> markiert, auf neutralem Gebiet während des Zoll-Events unangreifbar."
        ]
      },
      {
        "callout": "Der Server verhindert das Mega-Bündnis nicht per Regel, er macht es einfach unattraktiv. Das ist immer eleganter als ein hartes Limit.",
        "tone": "peace",
        "l": "Design-Prinzip"
      },
      {
        "ausbau": [
          "Ich empfehle, „Ansehen“ (siehe Idee 48) von Anfang an mitzudenken: gehaltene vs. gebrochene Verträge speisen einen Reputationswert, der Vertragskosten senkt und Söldner-Verfügbarkeit erhöht. So wird der freundliche Weg ein strategisch valider Weg, nicht nur ein moralischer."
        ]
      }
    ],
    "warum": [
      "Erzwungener Handel (regionale Ressourcen) erzeugt Abhängigkeiten; Verträge geben ihnen Form; die Chronik gibt ihnen Publikum. Diplomatie, über die niemand redet, ist wertlos — Diplomatie, die jeder mitliest, ist Drama, und Drama ist Retention."
    ],
    "links": [
      {
        "to": "kriegszustaende",
        "why": "Verträge definieren, welcher der drei PvP-Zustände zwischen zwei Fraktionen gilt."
      },
      {
        "to": "oekonomie",
        "why": "Tribute, Söldnerlöhne und Kredite laufen über CastCoins und die Fraktionskasse."
      },
      {
        "to": "ressourcen",
        "why": "Regionale Ressourcenbindung erzwingt die Abhängigkeiten, aus denen Diplomatie entsteht."
      },
      {
        "to": "chronik",
        "why": "Jeder Vertrag, jede Kündigung, jeder Bruch geht automatisch in die Chronik."
      },
      {
        "to": "onboarding",
        "why": "Söldnerstatus ist die Rolle für Solisten, die keiner Fraktion beitreten wollen."
      },
      {
        "to": "idee-40",
        "why": "„Der Vertrauensbeweis“ (Geiseln/Bürgen) treibt Verträge auf die intensivste Rollenspiel-Stufe."
      },
      {
        "to": "idee-18",
        "why": "„Der Tribut-Automat“ macht Vasallentum zu einem echten Systemzustand."
      }
    ]
  },
  {
    "id": "onboarding",
    "title": "Onboarding & Solisten",
    "nrLabel": "A18",
    "kicker": "Teil A · Punkt 3/18/25",
    "status": "MVP · Season 1",
    "origin": "kern",
    "tags": [
      "LZ",
      "TP"
    ],
    "lede": "Ein Neuling spawnt, weiß nicht was ein Claim ist, hat keinen Clan, wird von einem Vollausgerüsteten getötet, geht. Das ist Problem 8 — und es entscheidet, ob der Server über die Top-5-Clans hinaus lebt.",
    "was": [
      "Ein geschützter Einstieg plus eine echte, statusrelevante Rolle für alle, die keiner Fraktion beitreten wollen — den Söldner."
    ],
    "wie": [
      {
        "ul": [
          "<b>Neulingsschutz:</b> erste 72 h aktiver Spielzeit — keine Belagerungspflicht, PvP-freies Startgebiet, reduzierter Ausrüstungsverlust. Automatisch ablaufend, nicht abschaltbar (sonst Exploit).",
          "<b>Pflicht-Fraktionszuweisung</b> als Angebot in den ersten 7 Tagen; „Söldner“-Status für alle, die solo bleiben wollen.",
          "<b>Solisten als Beruf:</b> über den Söldnermarkt heuern Fraktionen sie für einzelne Belagerungen an — bezahlt, wichtig, ohne Bindung.",
          "<b>Friedenszonen-Parzellen:</b> Bau-Grundstücke nach dem bestehenden Redstone-Fackel-System, kaufbar mit CastCoins — die Brücke zur Survival-Community für Händler und Builder."
        ]
      },
      {
        "callout": "Der größte Teil einer deutschen Community sind keine PvP-Sweats. Ein Server, der nur für die Top-5-Clans designt ist, hat nach vier Wochen 40 Spieler. Es braucht Rollen abseits des Frontkämpfers — und die müssen spielentscheidend sein, nicht dekorativ.",
        "tone": "peace",
        "l": "Die Zielgruppe"
      },
      {
        "ausbau": [
          "Ich empfehle, die „Lehre“ (Idee 33) direkt ins Onboarding einzubauen: Ein erfahrener Spieler nimmt einen Neuling als Lehrling, beide bekommen Fortschritt. Bei einer Whitelist-Community mit hoher sozialer Bindung wird Onboarding so von einer Team-Aufgabe zu einem Community-Feature."
        ]
      }
    ],
    "warum": [
      "Onboarding ist der billigste Retention-Hebel überhaupt: Wer die ersten drei Tage übersteht und eine Rolle findet, bleibt. Wer in den ersten zehn Minuten von einem Vollausgerüsteten getötet wird, kommt nie wieder."
    ],
    "links": [
      {
        "to": "verteidigungsfenster",
        "why": "Der 72-h-Neulingsschutz ist Teil des Anti-Grief-Systems."
      },
      {
        "to": "diplomatie",
        "why": "Der Söldnermarkt gibt Solisten eine bezahlte Endgame-Rolle."
      },
      {
        "to": "claims",
        "why": "Friedenszonen-Parzellen nutzen das bestehende Redstone-Fackel-Protection-System."
      },
      {
        "to": "community",
        "why": "Der Community-Baubereich in der Friedenszone ist die Brücke zur Survival-Community."
      },
      {
        "to": "idee-33",
        "why": "„Die Lehre“ macht aus Onboarding ein Mentoren-Feature mit Chronik-Belohnung."
      }
    ]
  },
  {
    "id": "community",
    "title": "Community-Features",
    "nrLabel": "A28",
    "kicker": "Teil A · Punkt 28",
    "status": "MVP + laufend",
    "origin": "kern",
    "tags": [
      "LZ",
      "TP"
    ],
    "lede": "CastCrafters größter Wettbewerbsvorteil ist nicht Technik, sondern dass die Community bereits existiert und über Discord verbunden ist. Das muss ins Spiel hineinwirken.",
    "was": [
      "Eine Reihe von Features, die die bestehende Discord-/Whitelist-Community mit dem Server verzahnen — von der Chronik über Fraktions-Profilseiten bis zum Museum vergangener Seasons."
    ],
    "wie": [
      {
        "ul": [
          "<b>Discord-Integration in beide Richtungen:</b> Fraktionskanäle automatisch erstellt, Belagerungen gepingt, Rollen synchronisiert (Fraktion → Discord-Rolle), Chronik-Feed.",
          "<b>Fraktions-Profilseiten</b> auf der Website: Wappen, Mitglieder, Geschichte, Statistiken, Verträge, Territoriumskarte — freiwillig geteilt = kostenloses Marketing.",
          "<b>Der Zoll:</b> der wöchentliche PvP-freie Markt — sozialer Kitt und einziger sicherer Treffpunkt aller.",
          "<b>Öffentliche Belagerungs-Zuschauerplätze</b> (Spectator-Ring): verwandelt einen Kampf in ein Ereignis mit Publikum.",
          "<b>Das Museum:</b> Reliquien vergangener Seasons im Startgebiet, mit Namen.",
          "<b>Season-Rückblick pro Spieler:</b> generierte, teilbare Statistik-Karte.",
          "<b>Feedback-Board</b> „vorgeschlagen → geplant → live“ (der bestehende Community-Manager-Rang existiert genau dafür)."
        ]
      },
      {
        "callout": "Der Season-Abschlussstream mit Auswertung — Toplisten, Chronik-Höhepunkte, Anführer-Interviews — ist der Moment, der Spieler für die nächste Season hält.",
        "tone": "gold",
        "l": "Der Klebstoff"
      }
    ],
    "warum": [
      "Retention entsteht nicht aus Loot, sondern aus sozialer Verpflichtung: Man loggt ein, weil acht Leute morgen um 20 Uhr auf einen warten. Alles hier zahlt auf Bindung zwischen Menschen ein, nicht auf Bindung an eine Fortschrittsleiste."
    ],
    "links": [
      {
        "to": "chronik",
        "why": "Die Chronik ist das zentrale Community-Feature — Web + Discord-Bot."
      },
      {
        "to": "events",
        "why": "Der Zoll ist zugleich das wichtigste soziale Event."
      },
      {
        "to": "cosmetics",
        "why": "Die Season-Rückblick-Karte und das Museum sind kosmetische Community-Anker."
      },
      {
        "to": "season",
        "why": "Das Museum und der Abschlussstream sind die Brücke zwischen zwei Seasons."
      },
      {
        "to": "onboarding",
        "why": "Der Community-Baubereich holt die Survival-Community ab."
      },
      {
        "to": "idee-37",
        "why": "„Fraktionsgedächtnis“ macht Fraktionsnamen über Seasons hinweg zu Marken."
      }
    ]
  },
  {
    "id": "adminevents",
    "title": "Admin-Events",
    "nrLabel": "A27",
    "kicker": "Teil A · Punkt 27",
    "status": "laufend",
    "origin": "kern",
    "tags": [
      "PVP",
      "TP",
      "LZ"
    ],
    "lede": "CastCrafter hat bereits eine Event-Server-Kultur mit Twitch-Übertragung — ein Asset, das ein normaler Factions-Server nicht hat. Admin-Events sollten deshalb als Sendungen gedacht werden, nicht als Server-Feature.",
    "was": [
      "Inszenierte Ereignisse, bei denen das Team Rollen spielt oder Kulissen baut — aber nie schiedsrichternd zugunsten einer Fraktion eingreift."
    ],
    "wie": [
      {
        "ul": [
          "<b>Die Invasion:</b> das Team spielt eine NPC-Fraktion mit eigener Base und eigenen Verteidigungsfenstern. Alle Spieler müssen entscheiden: gemeinsam gegen die Invasion oder Separatfrieden. Der beste Diplomatie-Generator, den es gibt.",
          "<b>CastCrafter als Warlord:</b> CastCrafter selbst führt eine Fraktion für eine Phase. Jeder will ihn schlagen — der Stream schreibt sich von selbst.",
          "<b>Das Turnier:</b> Clan-vs-Clan-Bracket auf dem Event-Server, kommentiert, Preis = Cosmetics + Chronik-Eintrag.",
          "<b>Der Kaiser:</b> eine neutrale Autorität vergibt Aufträge („Wer mir bis Sonntag 500 Blutstein liefert …“) und erzeugt Wettrennen ohne Eingriff.",
          "<b>Der Verrat:</b> jede Fraktion bekommt heimlich eine Geheimmission mit gegenläufigen Zielen, Auflösung live im Stream.",
          "<b>Der Jahrmarkt:</b> reines Spaß-Event, kein PvP — ein Abend, an dem niemand stirbt. Wichtig als Ventil nach 8 Wochen Krieg."
        ]
      },
      {
        "callout": "Regel für alle Admin-Events: Das Team greift nie schiedsrichternd zugunsten einer Fraktion ein. Es spielt Rollen oder es baut Kulissen — es entscheidet nichts.",
        "tone": "war",
        "l": "Die eiserne Regel"
      }
    ],
    "warum": [
      "Für einen Creator-Server ist jedes Admin-Event zugleich Content-Produktion. Weil die Events als Sendungen gedacht sind, entsteht Stream- und YouTube-Material als Nebenprodukt des Servergeschehens — ohne dass jemand extra Kameraarbeit macht."
    ],
    "links": [
      {
        "to": "events",
        "why": "Admin-Events ergänzen die automatischen Events um inszenierte Höhepunkte."
      },
      {
        "to": "pvp",
        "why": "Turniere laufen über das Duell-/Turniersystem auf dem Event-Server."
      },
      {
        "to": "diplomatie",
        "why": "„Die Invasion“ und „Der Verrat“ sind reine Diplomatie-Generatoren."
      },
      {
        "to": "chronik",
        "why": "Admin-Event-Ergebnisse (Preise, Sieger) fließen in die Chronik."
      },
      {
        "to": "season",
        "why": "„CastCrafter als Warlord“ läuft typischerweise über eine ganze Season-Phase."
      }
    ]
  },
  {
    "id": "progression",
    "title": "Progression, Ränge & BattlePass",
    "nrLabel": "A12",
    "kicker": "Teil A · Punkt 12/13/14",
    "status": "Kapitel 4",
    "origin": "kern",
    "tags": [
      "LZ",
      "WW"
    ],
    "lede": "Vier getrennte Rang-Achsen, Aufgaben, die niemals „töte 10 Spieler“ sagen, und ein BattlePass, der kostenlos ist — vollständig, für alle. Denn sobald es einen Premium-Track gibt, hat man den ersten Riss in der P2W-freien Wand.",
    "was": [
      "Ein Progressions-System, das jeden Spielertyp belohnt und Zeit nie direkt in Macht umsetzt. Fortschritt läuft über Beteiligung an Ereignissen, nicht über Grind."
    ],
    "wie": [
      "<b>Vier Rang-Achsen:</b>",
      {
        "ul": [
          "<b>Team-Ränge</b> (bestehend): Administration, Developer, Supporter …",
          "<b>Premium</b> (bestehend, kaufbar): kosmetisch + QoL, keine Factions-Vorteile.",
          "<b>Verdiente Spielerränge</b> (Prestige, nicht kaufbar): Rekrut→Soldat→Veteran→Hauptmann→Feldherr (über Belagerungsteilnahme, nicht Kills); Träger→Fuhrmann→Karawanenmeister (Fracht); Schürfer→Bergmeister; Baumeister-Ränge; Chronist.",
          "<b>Fraktionsränge</b> (intern): Anführer→Offizier→Diplomat→Quartiermeister→Mitglied, frei benennbar, granulare Permissions."
        ]
      },
      {
        "callout": "Ein Fuhrmann-Titel muss genauso begehrenswert dargestellt werden wie ein Feldherr-Titel. Wenn Logistik strukturell wichtig ist, muss sie auch statusrelevant sein.",
        "tone": "peace",
        "l": "Die Kernregel"
      },
      "<b>Aufgaben:</b> Dailies (3 aus Pool, ~30–45 min: „sei bei einer Belagerung anwesend“, „liefere 1 Fracht“, „handle mit einer anderen Fraktion“ …), Weeklies (5), Monthly/Season-Kapitel (2–3, Prestige). <em>Nie</em> „töte X Spieler“ — das produziert Spawnkilling. Dailies rollen über (max. 3 Tage Stau), damit Abwesenheit nicht bestraft wird.",
      "<b>BattlePass:</b> kostenlos, 50 Stufen über ein Season-Kapitel (~8 Wochen), Fortschritt nur über Aufgaben und Chronik. Inhalt zu 100 % kosmetisch (Titel, Partikel, Banner-Muster, Marken) — null Ressourcen, Gear, Mandat oder Coins. Stufen-Cap pro Woche (z. B. 8), damit Vielspieler nicht in Woche 1 durch sind.",
      {
        "ausbau": [
          "Der <b>Fraktions-BattlePass</b> ist das stärkste Bindungswerkzeug im ganzen Konzept und kostet null Balance: Er steigt durch die gemeinsame Leistung aller Mitglieder und schaltet Fraktionsbanner, Wappen-Elemente und Titel-Präfixe für alle frei. Der aktive Solo-Spieler trägt sichtbar zu etwas bei, das die ganze Fraktion sieht. Ich empfehle, ihn nicht als „Zusatzidee“, sondern als festen Bestandteil zu behandeln."
        ]
      }
    ],
    "warum": [
      "Getrennte Achsen verhindern, dass immer derselbe Spielertyp gewinnt. Der kostenlose BattlePass ist die einzige Variante, die zu einem Server passt, dessen ganze Identität „Wir verkaufen keine Vorteile“ ist — der Reputationsschaden eines Bezahl-Passes wäre teurer als der Umsatz."
    ],
    "links": [
      {
        "to": "cosmetics",
        "why": "Fast alle Belohnungen sind Cosmetics — Titel, Partikel, Banner, Marken."
      },
      {
        "to": "chronik",
        "why": "Chronik-Ereignisse und der Chronist-Rang speisen Prestige-Fortschritt."
      },
      {
        "to": "monetarisierung",
        "why": "Weil der Pass gratis ist, kommt Geld nur aus Premium + kosmetischen Einzelkäufen."
      },
      {
        "to": "oekonomie",
        "why": "Aufgaben belohnen in Mandat/Ressourcen/Cosmetics — nie in Coins."
      },
      {
        "to": "toplisten",
        "why": "Verdiente Ränge und Aktivitätsquote speisen die Fraktions- und Spielerlisten."
      },
      {
        "to": "idee-42",
        "why": "„Meisterschaften statt Level“ ersetzt ein Spieler-Level durch dutzende kleine Progressionen."
      },
      {
        "to": "idee-46",
        "why": "„Saisonale Berufe“ geben jeder Season eine eigene Progression und Spielweise."
      }
    ]
  },
  {
    "id": "cosmetics",
    "title": "Cosmetics & Wappen",
    "nrLabel": "A15",
    "kicker": "Teil A · Punkt 15",
    "status": "Kapitel 4",
    "origin": "kern",
    "tags": [
      "LZ",
      "TP"
    ],
    "lede": "Der Ort, an dem der Server großzügig sein darf, weil Cosmetics Balance nicht berühren. Regel: Alles Erspielbare ist prestigeträchtiger als alles Kaufbare.",
    "was": [
      "Ein breites kosmetisches System, dessen Herzstück das Wappen ist — jede Fraktion baut sich eines aus Formen, Symbolen und Farben (Banner-Muster-Logik). Es erscheint überall: Dynmap, Fraktionsstrukturen, über dem Kernblock, im Discord-Bot, in der Chronik."
    ],
    "wie": [
      {
        "ul": [
          "<b>Wappen-System:</b> zusätzliche Symbole werden durch Belagerungssiege, Bosse und Season-Abschlüsse freigeschaltet.",
          "<b>Rüstungs-Trims & Färbungen:</b> rein optisch. Eine Fraktion in einheitlicher Färbung auf dem Schlachtfeld ist visuell großartig und kostet keine Balance.",
          "<b>Kill-/Tod-Effekte, Titel, Chat-Präfixe, Emotes:</b> beliebt, harmlos, begehrt.",
          "<b>Basen-Dekoration & Trophäen:</b> eine Trophäe für jeden besiegten Weltboss, jede erfolgreiche Verteidigung, jede eroberte Region — physisch aufstellbar. Die Base wird zum Museum der eigenen Season.",
          "<b>Season-Rückblick-Karte:</b> am Season-Ende eine persönliche, generierte Karte (Territorien, Belagerungen, Statistiken) als Item und Bild zum Teilen — kostenloses Marketing.",
          "<b>Hüte:</b> <span class='k'>/hat</span> bleibt Premium (der Command), Spielleistung gibt die Objekte — so wird Premium nicht entwertet."
        ]
      },
      {
        "callout": "Kaufbare Cosmetics müssen sich optisch klar von erspielten unterscheiden — andere Formensprache, nicht „dasselbe, aber besser“. Sonst entwertet Geld die Leistung.",
        "tone": "war",
        "l": "Die Trennlinie"
      }
    ],
    "warum": [
      "Cosmetics sind der Ventil-Ort für Belohnung ohne Balance-Kosten — und der stärkste sichtbare Ausdruck von Zugehörigkeit und Leistung. Ein einheitlich gefärbter Clan mit eigenem Wappen auf der Dynmap ist Identität, die kein Statwert erzeugen kann."
    ],
    "links": [
      {
        "to": "progression",
        "why": "BattlePass, Ränge und Aufgaben schütten fast ausschließlich Cosmetics aus."
      },
      {
        "to": "monetarisierung",
        "why": "Kaufbare Kosmetik ist die Haupteinnahmequelle — klar unterscheidbar vom Erspielten."
      },
      {
        "to": "bosse",
        "why": "Trophäen und Wappen-Symbole werden aus Boss-Siegen freigeschaltet."
      },
      {
        "to": "dungeons",
        "why": "Dungeon-Marken sind die Währung des Kosmetik-Händlers."
      },
      {
        "to": "chronik",
        "why": "Chronik-Badges und die Rückblick-Karte sind kosmetische Erinnerungsanker."
      },
      {
        "to": "community",
        "why": "Das Museum stellt kosmetische Reliquien vergangener Seasons aus."
      }
    ]
  },
  {
    "id": "toplisten",
    "title": "Toplisten",
    "nrLabel": "A21",
    "kicker": "Teil A · Punkt 21",
    "status": "Kapitel 4",
    "origin": "kern",
    "tags": [
      "LZ",
      "PVP"
    ],
    "lede": "Eine einzige Topliste erzeugt einen einzigen Gewinner und 200 Verlierer. Viele Toplisten erzeugen viele Gewinner. Und keine Liste darf reine Zeit belohnen — sonst gewinnt der Arbeitslose gegen den Berufstätigen.",
    "was": [
      "Ein Bündel paralleler Ranglisten für Fraktionen und Spieler — kurzfristige (Wochen-/Kapitel-)Listen inklusive, damit auch der Neuling in Woche 12 noch etwas gewinnen kann."
    ],
    "wie": [
      {
        "ul": [
          "<b>Fraktionslisten:</b> Territorium, <em>erfolgreiche Verteidigungen</em> (die wichtigere), erfolgreiche Belagerungen, Kriegsressourcen-Ertrag, Fraktions-BattlePass, Aktivitätsquote (aktive/Gesamt — belohnt kleine, eingespielte Teams), Diplomatie-Ansehen.",
          "<b>Spielerlisten:</b> Turnierplatzierungen, transportierte Fracht, Belagerungsteilnahmen, Dungeon-Bestzeiten, Kopfgeld-Einlösungen.",
          "<b>Höchstes Kopfgeld auf dem eigenen Kopf</b> — die beste Liste des Systems: Der Spitzenreiter wird zum Ziel aller. Selbstregulierend, permanenter Content, eingebauter Anti-Snowball.",
          "<b>Kurzfristige Listen:</b> Wochen- und Kapitel-Listen, die zurückgesetzt werden — ohne sie ist jede Topliste nach vier Wochen tot."
        ]
      },
      {
        "callout": "Anti-Pattern: Kein „Kills“-Ranking als Hauptliste. Es produziert Spawnkilling, Kill-Trading mit Alts und Jagd auf Neulinge. Kills dürfen nur in Sub-Statistiken auftauchen, nie als Headline.",
        "tone": "war",
        "l": "Die Falle"
      }
    ],
    "warum": [
      "Toplisten sind der billigste Dauer-Motivator — aber nur, wenn sie viele Gewinner erzeugen und Können statt Verfügbarkeit belohnen. Live präsentiert (Website, Discord-Bot, Hologramme im Startgebiet), sonst motiviert eine Liste, die man suchen muss, niemanden."
    ],
    "links": [
      {
        "to": "oekonomie",
        "why": "Keine Topliste darf reine Zeit belohnen — das Kernprinzip der Wirtschaft."
      },
      {
        "to": "progression",
        "why": "Aktivitätsquote und verdiente Ränge speisen die Listen."
      },
      {
        "to": "diplomatie",
        "why": "Diplomatie-Ansehen (gehaltene vs. gebrochene Verträge) ist eine eigene Fraktionsliste."
      },
      {
        "to": "belagerung",
        "why": "Erfolgreiche Verteidigungen und Belagerungen sind zentrale Listen."
      },
      {
        "to": "chronik",
        "why": "Kopfgelder und ihre Einlösung werden in der Chronik verewigt."
      },
      {
        "to": "idee-45",
        "why": "„Der Rivalen-Tracker“ macht aus anonymem PvP eine benannte, gelistete Rivalität."
      }
    ]
  },
  {
    "id": "chronik",
    "title": "Die Chronik",
    "nrLabel": "S5",
    "kicker": "Teil A · Punkt 4 · Säule 5 · Punkt 28",
    "status": "MVP · Season 1",
    "origin": "kern",
    "tags": [
      "LZ",
      "EM"
    ],
    "lede": "Jede Belagerung, jeder Vertrag, jeder Verrat, jeder Boss, jede Reliquie wird automatisch verewigt — mit Datum, Beteiligten, Ergebnis. Web + Discord-Bot. Das ist der Feature, der Content erzeugt statt nur Gameplay.",
    "was": [
      "Das zentrale, verbindende Feature des gesamten Konzepts und technisch sein Rückgrat: ein Event-Bus, in den alle Module typisierte Ereignisse feuern und den Website und Discord als reine Konsumenten anzapfen."
    ],
    "wie": [
      "Die Chronik ist zugleich Erzählwerkzeug und Architekturprinzip: Alle Systeme melden ihre Ereignisse an einen zentralen Bus, <span class='k'>factions-chronicle</span> persistiert sie relational, und Web + Discord rendern daraus Feeds, Fraktions-Profilseiten und den Chronik-Score.",
      "<b>Was sie festhält:</b> Belagerungsausgänge und Wendepunkte, Vertragsabschlüsse/-kündigungen/-brüche, Kriegserklärungen und Friedensverträge, Boss-Siege, gefundene Reliquien, Entdeckung neuer Regionen, Season-Sieger.",
      {
        "callout": "Am Season-Ende ist die Chronik die Vorlage für CastCrafters Abschlussvideo — und während der Season ist sie das, worüber die Community redet. Sie kostet nach dem Bau nichts und produziert dauerhaft Gesprächsstoff.",
        "tone": "gold",
        "l": "Der Content-Motor"
      },
      {
        "ausbau": [
          "Architektur-Empfehlung mit Nachdruck: Den Event-Bus <b>von der ersten Zeile an</b> einbauen, nicht nachrüsten. Wenn jedes Modul seine Ereignisse typisiert feuert, werden Website, Discord-Bot, Toplisten und der Chronik-Score (Idee 41) zu reinen Konsumenten — die sauberste denkbare Trennung. Nachträglich einzuziehen ist bei 14 Modulen teuer."
        ]
      }
    ],
    "warum": [
      "Ein Gegner mit Gesicht erzeugt Bindung; anonyme Raids erzeugen Frust. Die Chronik gibt jedem Ereignis einen Namen, ein Datum und ein Publikum — sie verwandelt „irgendwer hat meine Base gesprengt“ in „Die Nordallianz hat unsere Mine genommen, morgen um 20 Uhr holen wir sie zurück“. Das ist Retention-Gold, und die Whitelist macht es real."
    ],
    "links": [
      {
        "to": "belagerung",
        "why": "Belagerungen sind die dramatischsten Chronik-Einträge — inklusive Kriegstagebuch."
      },
      {
        "to": "diplomatie",
        "why": "Jeder Vertrag und jeder Bruch geht automatisch in die Chronik."
      },
      {
        "to": "kriegszustaende",
        "why": "Vertragsbrüche erzeugen Einträge und Pings an beide Anführer."
      },
      {
        "to": "community",
        "why": "Die Chronik ist das zentrale Community-Feature — Web + Discord."
      },
      {
        "to": "technik",
        "why": "Der Chronik-Event-Bus ist die tragende Architektur-Entscheidung des Projekts."
      },
      {
        "to": "season",
        "why": "Die Chronik bleibt über Resets permanent — das Gedächtnis des Servers."
      },
      {
        "to": "idee-41",
        "why": "„Der Chronik-Score“ macht Beteiligung an Ereignissen zum ehrlichsten Prestige-Wert."
      }
    ]
  },
  {
    "id": "endgame",
    "title": "Endgame-Inhalte",
    "nrLabel": "A24",
    "kicker": "Teil A · Punkt 24",
    "status": "Kapitel 3–4",
    "origin": "kern",
    "tags": [
      "LZ",
      "PVP",
      "EM"
    ],
    "lede": "„Endgame“ heißt: Was tue ich in Woche 10, wenn ich alles habe? Die ehrliche Antwort der meisten Server: nichts — deshalb sterben sie in Woche 10. Hier dreht der Server bewusst den Konflikt-Regler hoch, statt leerzulaufen.",
    "was": [
      "Sechs Ebenen, die zusammen dafür sorgen, dass Woche 16 spannender ist als Woche 8 — von Machtprojektion über die Zitadelle bis zum erzwungenen Kooperations-Finale."
    ],
    "wie": [
      {
        "ul": [
          "<b>Machtprojektion:</b> ab Kapitel 3 werden Belagerungen billiger und Verteidigungsfenster länger. Fraktionen, die alles haben, haben plötzlich alles zu verlieren.",
          "<b>Die Zitadelle:</b> ein einziger Ort, ab Kapitel 3 aktiv. Wer sie hält, bekommt netzwerkweite Sichtbarkeit (Wappen im Hub, Website, Discord-Banner) und einen kleinen Bonus. Alle 3 Tage belagerbar, unabhängig von Fenstern. Sie ist kein Sieg, sie ist eine Zielscheibe.",
          "<b>Der Season-Boss:</b> erzwungene Kooperation der Erzfeinde.",
          "<b>Prestige-Bauten:</b> Weltwunder (Leuchtturm, Große Halle, Monument) ohne mechanische Boni — auf der Dynmap sichtbar, in der Chronik, im Museum der nächsten Season. Für eine Bau-Community ein stärkeres Ziel als jede Statistik.",
          "<b>Turniere/Ladder:</b> für Spieler, deren Endgame Skill ist.",
          "<b>Das Endzeit-Kapitel:</b> die schrumpfende Karte."
        ]
      },
      {
        "callout": "Die Zitadelle ist bewusst prestigeträchtig und mechanisch schwach: enormer Prestige-Wert, geringer mechanischer Wert. Genau richtig — sie zieht Konflikt an, ohne den Sieger uneinholbar zu machen.",
        "tone": "gold",
        "l": "Prestige vor Macht"
      }
    ],
    "warum": [
      "Das teuerste Versäumnis eines Factions-Servers ist der leere Spätverlauf. Indem der Server selbst den Konflikt eskaliert (billigere Belagerungen, wandernde Zitadelle, schrumpfende Karte, Kooperations-Boss), sorgt er dafür, dass niemand „fertig“ ist, solange die Season läuft."
    ],
    "links": [
      {
        "to": "season",
        "why": "Endgame und die Endzeit-Mechanik (schrumpfende Karte) sind eng verzahnt."
      },
      {
        "to": "bosse",
        "why": "Der Season-Boss ist Endgame-Ebene 3 und das Finale."
      },
      {
        "to": "belagerung",
        "why": "Die Zitadelle ist außerhalb der Fenster belagerbar — bewusst riskant."
      },
      {
        "to": "cosmetics",
        "why": "Prestige-Bauten und Trophäen sind rein kosmetische Endgame-Ziele."
      },
      {
        "to": "pvp",
        "why": "Turniere/Ladder sind das Skill-Endgame."
      },
      {
        "to": "idee-21",
        "why": "„Die wandernde Zitadelle“ mischt die Machtgeografie alle zwei Wochen neu."
      }
    ]
  },
  {
    "id": "season",
    "title": "Season & Reset",
    "nrLabel": "A16",
    "kicker": "Teil A · Punkt 16/17",
    "status": "Rahmen",
    "origin": "kern",
    "tags": [
      "LZ",
      "WW",
      "EM"
    ],
    "lede": "Empfehlung: 4 Monate Kernlaufzeit in vier Kapiteln à 4 Wochen plus 2 Wochen Finale — ca. 18 Wochen. Zu kurz, und der Aufbau lohnt sich nicht. Zu lang, und die Machtverhältnisse zementieren sich.",
    "was": [
      "Eine Season mit dramaturgischem Bogen: Landnahme → Konsolidierung → Eskalation → Endzeit → Finale. Sie endet nicht mit einer Abschaltung, sondern mit einem sichtbaren Kollaps."
    ],
    "wie": [
      "<b>Kapitelstruktur (je 4 Wochen):</b>",
      {
        "ul": [
          "<b>1. Landnahme:</b> kleine Karte, hohe Dichte, viele kleine Fraktionen, billige Belagerungen.",
          "<b>2. Konsolidierung:</b> erste Kartenerweiterung („Die Kluft“), Allianzen, Kriegsressourcen werden relevant.",
          "<b>3. Eskalation:</b> zweite Erweiterung, Weltbosse auf höchster Stufe, Belagerungen billiger, Fenster länger.",
          "<b>4. Endzeit:</b> die Karte schrumpft wieder, Mandat-Decay steigt, alles läuft auf wenige Zentren zu.",
          "<b>5. Finale (2 Wochen):</b> Season-Boss, letzte Belagerungswelle, Auswertung, Abschluss-Stream."
        ]
      },
      "<b>Reset — hart:</b> Welt, Bauten, Claims, Items, Coins, Mandat, Toplisten. <b>Weich (bleibt):</b> Chronik, Titel/Ränge/Cosmetics/Wappen/Trophäen, Legacy-Ränge, Statistiken, persönliche Season-Karte, Premium.",
      "<b>Endzeit-Mechanik:</b> In den letzten zwei Wochen schrumpft die Karte schrittweise (ein sich schließender Ring). Territorien fallen automatisch, Fraktionen werden aufeinander gedrängt. Der Server kollabiert sichtbar — die letzten Tage sind der intensivste Content, nicht der leerste.",
      "<b>Das Erbe-System:</b> Jeder legt am Season-Ende einen Gegenstand in einen „Reliquienschrein“ — er wird nicht übertragen, sondern als Foto/Eintrag mit Kommentar in die Chronik aufgenommen. Nach dem Reset steht im Startgebiet ein Museum. Aus einem Wipe wird ein Abschied statt einer Löschung.",
      {
        "ausbau": [
          "Konflikt mit dem Survival-Prinzip „Season = Major Version“: Für Factions ist das nicht übertragbar — Major-Versionen erscheinen unregelmäßig, eine Factions-Season braucht einen dramaturgisch gesetzten Endtermin. Meine Empfehlung: eigener Factions-Kalender; eine Major-Version wird genutzt, wenn sie zeitlich passt, aber nicht als Bedingung. Das ist eine der vier blockierenden Entscheidungen."
        ]
      }
    ],
    "warum": [
      "CastCrafter macht Saisonalität im Survival schon richtig: Season endet, Abschlussvideo, alle wissen, wofür sie gespielt haben. Für Factions ist das stärker, weil ein Sieger existiert. Eine Season braucht einen Endkampf, keine Endabschaltung — 4 Monate überleben eine Schulferienphase und erlauben zwei bis drei echte Machtwechsel."
    ],
    "links": [
      {
        "to": "endgame",
        "why": "Die Endzeit-Mechanik ist zugleich Endgame-Ebene 6."
      },
      {
        "to": "chronik",
        "why": "Die Chronik bleibt über Resets permanent — das Gedächtnis des Servers."
      },
      {
        "to": "events",
        "why": "„Die Kluft“ und Kartenerweiterungen strukturieren die Kapitel."
      },
      {
        "to": "cosmetics",
        "why": "Alles Erspielte (Titel, Wappen, Trophäen) übersteht den Reset."
      },
      {
        "to": "community",
        "why": "Museum und Abschlussstream überbrücken die Zwischen-Seasons-Pause."
      },
      {
        "to": "idee-50",
        "why": "„Die Zeitkapsel“ liefert das emotionale Ende, das ein Abschlussvideo trägt."
      },
      {
        "to": "idee-27",
        "why": "„Die Ruinen“ lassen die letzte Season physisch in der neuen Welt weiterleben."
      }
    ]
  },
  {
    "id": "monetarisierung",
    "title": "Monetarisierung (P2W-frei)",
    "nrLabel": "A26",
    "kicker": "Teil A · Punkt 26",
    "status": "MVP · Season 1",
    "origin": "kern",
    "tags": [
      "LZ"
    ],
    "lede": "CastCrafter hat die Antwort bereits gefunden — das bestehende Premium-Modell ist sauber. Der Auftrag lautet nicht „finde neue Einnahmequellen“, sondern „erweitere das Modell, ohne es zu brechen“.",
    "was": [
      "Ein rein kosmetisches/QoL-Monetarisierungsmodell mit einem einzigen, harten Testkriterium für jeden Kaufartikel."
    ],
    "wie": [
      "<b>Bestehend, unverändert:</b> Premium mit Prefix, farbigen Clan-Tags, Lobby-Elytra-Boost, größerer/mobiler Enderchest, <span class='k'>/rename</span>, <span class='k'>/sign</span>, <span class='k'>/invsort</span>, <span class='k'>/hat</span>, priorisiertem Event-Zugang, Discord-Rolle.",
      "<b>Kritische Factions-Anpassungen:</b>",
      {
        "ul": [
          "Mobile Enderchest: im Kriegsgebiet deaktiviert (sonst Loot-Vorteil im Feld = P2W). Im Frieden erlaubt.",
          "Größere Enderchest: Kriegsressourcen/Fracht sind grundsätzlich enderchest-blockiert → automatisch balance-neutral.",
          "20 % Grundstücksrabatt: nur auf Friedenszonen-Parzellen, nie auf Kriegs-Claims oder Mandat-Kosten.",
          "Priorisierter Event-Zugang: gilt nicht bei kompetitiven Events (z. B. Rift mit 20 Plätzen)."
        ]
      },
      "<b>Erweiterbar (alles kosmetisch):</b> Kosmetik-Einzelkäufe, Fraktions-Kosmetik (ein Anführer kauft ein Wappen-Set für alle), Namens-/Fraktions-Umbenennung, Season-Andenken, Unterstützer-Denkmal im Startgebiet.",
      {
        "callout": "Der Test, den jeder Kaufartikel bestehen muss: Kann ein Spieler, der nichts bezahlt hat, gegen einen zahlenden bei gleichem Können und gleicher Spielzeit gewinnen? Wenn die Antwort nicht ein unbedingtes Ja ist, wird der Artikel nicht verkauft.",
        "tone": "war",
        "l": "Der eine Test"
      }
    ],
    "warum": [
      "Der deutsche Markt ist auf P2W konditioniert — genau deshalb ist konsequente P2W-Freiheit das Alleinstellungsmerkmal. Ein BattlePass oder Kit, das Geld kostet, wäre ein Bruch mit der eigenen Marke; der Reputationsschaden ist teurer als der Umsatz."
    ],
    "links": [
      {
        "to": "oekonomie",
        "why": "Niemals kaufbar: Coins, Mandat, Ressourcen, Claim-Boni — nur die Zeit-Währung zählt."
      },
      {
        "to": "cosmetics",
        "why": "Kaufbare Kosmetik muss sich optisch klar vom Erspielten unterscheiden."
      },
      {
        "to": "progression",
        "why": "Der BattlePass bleibt gratis — Geld kommt aus Premium + Einzelkäufen."
      },
      {
        "to": "antipatterns",
        "why": "Kaufbare Spielvorteile stehen ganz oben auf der Ausschlussliste."
      }
    ]
  },
  {
    "id": "antipatterns",
    "title": "Was NIE eingebaut werden darf",
    "nrLabel": "A30",
    "kicker": "Teil A · Punkt 30",
    "status": "Leitplanke",
    "origin": "kern",
    "tags": [
      "EM"
    ],
    "lede": "Diese Liste ist wichtiger als die Feature-Liste. Jeder einzelne Punkt hier hat schon einmal einen Factions-Server getötet.",
    "was": [
      "Zwanzig absolut ausgeschlossene Mechaniken — die negativen Leitplanken, an denen jede Design-Entscheidung gemessen wird."
    ],
    "wie": [
      {
        "ul": [
          "<b>Offline-Raiding</b> in jeder Form — der Grund, warum das Genre gestorben ist.",
          "<b>Kaufbare Spielvorteile</b> (Kits, Ressourcen, Coins, Mandat, Claim-Boni, XP-Boosts, Belagerungsrabatte).",
          "<b>Lootboxen/Crates</b> mit Gameplay-Inhalt — in Deutschland rechtlich heikel, bei junger Zielgruppe ein Reputationsrisiko.",
          "<b>Fly</b> und <b>freie Teleportation</b> — töten Geografie, Logistik und Verteidigungsdesign gleichzeitig.",
          "<b>Server-Shop</b> mit Item-An-/Verkauf, <b>Villager-Handel</b>, <b>Sell-Wands/Auto-Sell/Spawner-Ökonomie</b> — der Anfang jeder Inflation.",
          "<b>Custom-Gear über Vanilla-Niveau</b> und <b>PvP-Custom-Enchantments</b> — sobald es eine Godsword gibt, ist es ein Wettrüsten.",
          "<b>Power-per-Player-Claims</b> und <b>Alt-Account-Toleranz</b> — belohnen Masse, bestrafen Tod, brechen das Mandat-System.",
          "<b>Kill-basierte Haupt-Toplisten</b> und <b>Login-Streaks</b> — erzeugen Spawnkilling bzw. verwandeln ein Hobby in eine Pflicht.",
          "<b>Permanente Fraktionsvernichtung</b> — wer ausgelöscht werden kann, hört auf.",
          "<b>Priority-Queue für Zahlende</b>, <b>Cross-Season-Übertrag von Macht</b>, <b>automatisierte Moderation ohne Menschen</b>.",
          "<b>Alles, was Bauzeit vernichtet</b> — der teuerste Fehler von allen: Er vertreibt genau die Spieler, die am längsten geblieben wären."
        ]
      },
      {
        "callout": "Wenn 90 % der Spieler ein System nie sehen, war es die Entwicklungszeit nicht wert. Ein Feature, das nur die Top-5-Clans betrifft, gehört ebenfalls auf diese Liste.",
        "tone": "war",
        "l": "Der Kompass"
      }
    ],
    "warum": [
      "Die Ausschlussliste ist der Filter, der die CastCrafter-DNA schützt. Jede spätere Feature-Idee, jeder Monetarisierungsvorschlag und jeder Balancing-Kompromiss wird gegen diese zwanzig Punkte gehalten — sie sind das Immunsystem des Konzepts."
    ],
    "links": [
      {
        "to": "verteidigungsfenster",
        "why": "Löst Offline-Raiding — Punkt 1 der Liste — vollständig."
      },
      {
        "to": "monetarisierung",
        "why": "Setzt die P2W-Ausschlüsse (Punkte 2, 3, 14) positiv um."
      },
      {
        "to": "oekonomie",
        "why": "Kein Server-Shop, kein Villager-Handel — die Inflations-Ausschlüsse."
      },
      {
        "to": "claims",
        "why": "Kein Power-per-Player; keine permanente Vernichtung durch Kernblock-Immunität."
      }
    ]
  },
  {
    "id": "technik",
    "title": "Technik & Plugin-Architektur",
    "nrLabel": "A29",
    "kicker": "Teil A · Punkt 29 · Teil D",
    "status": "Fundament",
    "origin": "kern",
    "tags": [
      "EM"
    ],
    "lede": "Aus Entwicklersicht: Paper (Backends) + Velocity (Proxy) mit Kotlin und der Surf-API, entsprechend dem bestehenden Stack. 14 Module. Zwei Entscheidungen müssen vor der ersten Zeile Code fallen.",
    "was": [
      "Ein modulares Gradle-Projekt mit 14 Modulen und einem zentralen Event-Bus. Realistisch kein Zwei-Monats-Projekt: Core + Claims + Siege + Economy sind allein eine MVP-Season."
    ],
    "wie": [
      "<b>Modulübersicht:</b> factions-core, -claims, -siege, -economy, -diplomacy, -logistics, -events, -dungeons, -progression, -chronicle (Paper + Velocity), -bridge (Velocity), -protection, -web (extern), -discord (extern).",
      {
        "ul": [
          "<b>Surf-API</b> als Basis für beide Plattformen. Command-Registrierung über die CommandAPI-Kotlin-DSL, Text durchgängig über MiniMessage.",
          "<b>Folia-Frage früh klären:</b> Ein Server mit 200+ Spielern und großflächigen Belagerungen ist genau der Folia-Anwendungsfall. Bei <span class='k'>foliaSupported(true)</span> gilt: keine blockierenden Operationen auf Region-Threads, alle Tasks über MCCoroutine, region-basiertes Scheduling durchgängig. Eine Architektur-, keine Detailentscheidung.",
          "<b>Belagerungs-Scheduler</b> = kritischster Teil: persistent über Neustarts, korrekte Zeitzonen (Sommerzeit!), synchron mit dem Discord-Bot. Persistenz über die Datenbank, nicht über In-Memory-Timer.",
          "<b>Chronik als Event-Bus:</b> alle Module feuern typisierte Events, factions-chronicle konsumiert und persistiert. Von Anfang an einbauen.",
          "<b>Datenbank relational</b> (MariaDB/MySQL) für Fraktionen, Claims, Verträge, Chronik, Progression. Keine YAML-Persistenz für Kern-Zustände.",
          "<b>Fracht-Items & Enderchest-Blacklist</b> greifen tief ins Inventory-Handling — PacketEvents + sauberes Item-Tagging (PersistentDataContainer)."
        ]
      },
      {
        "callout": "Was NICHT selbst gebaut werden sollte: Anti-Cheat, Logging/Rollback (CoreProtect-Äquivalent), Dynmap. Das sind gelöste Probleme. Die Entwicklungszeit gehört in die Systeme, die den Server einzigartig machen.",
        "tone": "peace",
        "l": "Build vs. Buy"
      }
    ],
    "warum": [
      "Ein 14-Modul-Projekt nachträglich auf region-basiertes Scheduling (Folia) umzubauen ist teurer als das ganze Feature-Set. Deshalb müssen Folia und der Season-Rhythmus vor der ersten Zeile Code entschieden sein — und der Chronik-Bus von Anfang an stehen, sonst wird er zum Wartungsalptraum."
    ],
    "links": [
      {
        "to": "chronik",
        "why": "Der Chronik-Event-Bus ist die tragende Architektur des ganzen Projekts."
      },
      {
        "to": "verteidigungsfenster",
        "why": "Der persistente Belagerungs-Scheduler ist der technisch kritischste Teil."
      },
      {
        "to": "belagerung",
        "why": "Belagerungen bei 200+ Spielern sind der Grund, warum die Folia-Frage zählt."
      },
      {
        "to": "pvp",
        "why": "Fracht-Items und Enderchest-Blacklist greifen tief ins Inventory-Handling."
      },
      {
        "to": "season",
        "why": "Der Season-Rhythmus (eigener Kalender vs. Major-Version) ist eine der vier blockierenden Entscheidungen."
      }
    ]
  }
];

export const IDEAS: IdeaFeature[] = [
  {
    "id": "idee-1",
    "nr": 1,
    "cat": "Krieg und Belagerung",
    "title": "Belagerungsverträge mit Bedingungen",
    "origin": "kern",
    "tags": [
      "EM",
      "LZ",
      "TP"
    ],
    "was": [
      "Eine Belagerungsansage ist kein Blanko-Angriff, sondern enthält ein konkretes Kriegsziel: „Dieser Chunk“, „Tribut von 5.000 Blutstein für 14 Tage“, „Abtretung des Hafens“, „Entmilitarisierung der Nordgrenze“."
    ],
    "wie": [
      "Der Verteidiger kann vor der Belagerung kapitulieren und die Forderung erfüllen — dann findet kein Kampf statt, der Angreifer bekommt sein Ziel, beides geht in die Chronik. Das erzeugt echte Verhandlung: Ist die Forderung es wert, dafür zu kämpfen? — und Content ohne Serverlast."
    ],
    "links": [
      {
        "to": "belagerung",
        "why": "Erweitert die Ansage um verhandelbare Ziele statt reiner Chunk-Übernahme."
      },
      {
        "to": "diplomatie",
        "why": "Kapitulation und Forderung sind ein diplomatischer Akt mit Chronik-Eintrag."
      },
      {
        "to": "chronik",
        "why": "Jede Forderung und Kapitulation wird verewigt."
      }
    ]
  },
  {
    "id": "idee-2",
    "nr": 2,
    "cat": "Krieg und Belagerung",
    "title": "Das Kriegstagebuch",
    "origin": "kern",
    "tags": [
      "LZ",
      "TP"
    ],
    "was": [
      "Nach jeder Belagerung generiert das System automatisch einen Bericht: Zeitverlauf der Kontrollpunkte, Schadenskarte, wer wann wo war, Wendepunkte."
    ],
    "wie": [
      "Als Item in der Base aufhängbar und auf der Website einsehbar. Clans analysieren ihre Niederlagen wie ein Fußballteam das Spiel — das verwandelt einen verlorenen Kampf von Frust in Lernstoff und ist der stärkste Retention-Hebel nach einer Niederlage."
    ],
    "links": [
      {
        "to": "belagerung",
        "why": "Wertet jede Belagerung im Nachhinein detailliert aus."
      },
      {
        "to": "chronik",
        "why": "Speist die öffentliche Geschichte mit granularen Kampfdaten."
      },
      {
        "to": "cosmetics",
        "why": "Das Tagebuch ist als Base-Dekoration aufhängbar."
      }
    ]
  },
  {
    "id": "idee-3",
    "nr": 3,
    "cat": "Krieg und Belagerung",
    "title": "Der Belagerungsring (Spectator-Zone)",
    "origin": "kern",
    "tags": [
      "EM",
      "LZ"
    ],
    "was": [
      "Um jede aktive Belagerung entsteht automatisch ein Ring, in dem unbeteiligte Spieler im Adventure-Mode zusehen können — ohne Eingriffsmöglichkeit, mit Übersichts-HUD."
    ],
    "wie": [
      "Belagerungen werden zu Veranstaltungen mit Publikum. Für einen Creator-Server ist das direkt Stream-Material, ohne dass jemand extra Kameraarbeit macht."
    ],
    "links": [
      {
        "to": "belagerung",
        "why": "Macht aus jedem Kampf ein Ereignis mit Zuschauern."
      },
      {
        "to": "community",
        "why": "Öffentliche Zuschauerplätze sind ein Kern-Community-Feature."
      },
      {
        "to": "adminevents",
        "why": "Liefert Stream-taugliche Perspektiven für Sendungen."
      }
    ]
  },
  {
    "id": "idee-4",
    "nr": 4,
    "cat": "Krieg und Belagerung",
    "title": "Frontlinien statt Grenzen",
    "origin": "kern",
    "tags": [
      "EM",
      "PVP"
    ],
    "was": [
      "Ein Chunk, der an das Territorium einer verfeindeten Fraktion grenzt, wird automatisch zur Frontlinie: erhöhte Ressourcenerträge, aber permanentes offenes PvP und keine Nahrungsregeneration."
    ],
    "wie": [
      "Frieden = Wohlstand ohne Risiko. Krieg = Ertrag mit Risiko. Die Karte zeigt Fronten in Rot — man sieht auf einen Blick, wo der Server brennt."
    ],
    "links": [
      {
        "to": "kriegszustaende",
        "why": "Die Frontlinie entsteht aus dem Zustand Krieg zwischen Nachbarn."
      },
      {
        "to": "claims",
        "why": "Definiert einen Sonderstatus für Grenz-Chunks."
      },
      {
        "to": "ressourcen",
        "why": "Höhere Erträge an der Front koppeln Risiko an Belohnung."
      }
    ]
  },
  {
    "id": "idee-5",
    "nr": 5,
    "cat": "Krieg und Belagerung",
    "title": "Der Waffenstillstand mit Countdown",
    "origin": "kern",
    "tags": [
      "EM",
      "TP"
    ],
    "was": [
      "Während einer laufenden Belagerung kann der Verteidiger einmal einen 3-Minuten-Waffenstillstand aufrufen, in dem offen verhandelt werden kann."
    ],
    "wie": [
      "Nimmt der Angreifer an, pausiert die Uhr. Ein Mechanismus, den kein Minecraft-Server hat — und er produziert die besten Stream-Momente, die man sich vorstellen kann."
    ],
    "links": [
      {
        "to": "belagerung",
        "why": "Fügt der laufenden Belagerung ein Verhandlungsfenster hinzu."
      },
      {
        "to": "diplomatie",
        "why": "Verwandelt einen Kampf in eine Verhandlung."
      },
      {
        "to": "adminevents",
        "why": "Erzeugt dramatische, streambare Momente."
      }
    ]
  },
  {
    "id": "idee-6",
    "nr": 6,
    "cat": "Krieg und Belagerung",
    "title": "Söldnermarkt",
    "origin": "kern",
    "tags": [
      "EM",
      "PVP",
      "TP"
    ],
    "was": [
      "Ein öffentliches Board (im Spiel + Website), auf dem Fraktionen Söldner für konkrete Belagerungen anheuern — Angebot, Preis in CastCoins, Vertrag über das System, automatische Bezahlung bei Teilnahme."
    ],
    "wie": [
      "Fraktionslose Spieler haben damit einen Beruf statt eines Handicaps. Und ein Söldner, der für beide Seiten unterschreibt, ist eine Geschichte, die sich von selbst schreibt."
    ],
    "links": [
      {
        "to": "diplomatie",
        "why": "Söldnerverträge sind Teil des Vertragssystems."
      },
      {
        "to": "onboarding",
        "why": "Gibt Solisten eine bezahlte, wichtige Endgame-Rolle."
      },
      {
        "to": "oekonomie",
        "why": "Bezahlung läuft über CastCoins aus der Fraktionskasse."
      }
    ]
  },
  {
    "id": "idee-7",
    "nr": 7,
    "cat": "Krieg und Belagerung",
    "title": "Belagerungsgerät als Bauwerk",
    "origin": "kern",
    "tags": [
      "TP",
      "EM"
    ],
    "was": [
      "Rammbock, Belagerungsturm und Katapult sind keine Items, sondern Multi-Block-Strukturen, die vor Ort während der Belagerung aufgebaut werden müssen (60–90 s, mehrere Spieler, zerstörbar)."
    ],
    "wie": [
      "Das Gegenstück zur alten Cannon-Meta: sichtbar, kooperativ, mit klaren Konter-Optionen. Ein Rammbock, den acht Leute schieben, sieht großartig aus — und ersetzt asymmetrisches Redstone-Wissen durch Teamwork."
    ],
    "links": [
      {
        "to": "belagerung",
        "why": "Ersetzt Sprengtechnik durch sichtbare, kooperative Strukturen."
      },
      {
        "to": "ressourcen",
        "why": "Belagerungsgerät wird aus Sternenerz/Blutstein gefertigt."
      },
      {
        "to": "items",
        "why": "Verstärkte Baumaterialien sind der defensive Gegenpart."
      }
    ]
  },
  {
    "id": "idee-8",
    "nr": 8,
    "cat": "Krieg und Belagerung",
    "title": "Der Wall-Breaker-Timer",
    "origin": "kern",
    "tags": [
      "PVP",
      "EM"
    ],
    "was": [
      "Statt Blockdurchdringung: Fraktionstore und -mauern haben eine sichtbare HP-Leiste, die nur während Belagerungen sinkt und danach automatisch regeneriert."
    ],
    "wie": [
      "Der Angreifer sieht, wie lange er noch braucht, der Verteidiger, wie viel Zeit er hat — beide treffen informierte Entscheidungen. Nach der Belagerung ist die Base physisch unbeschädigt: Der Bau bleibt, das Territorium wechselt."
    ],
    "links": [
      {
        "to": "belagerung",
        "why": "Die technische Umsetzung von „Bau bleibt, Kontrolle wechselt“."
      },
      {
        "to": "claims",
        "why": "Schützt gebaute Strukturen vor dauerhafter Zerstörung."
      },
      {
        "to": "antipatterns",
        "why": "Verhindert die Bunker-Base und die Vernichtung von Bauzeit."
      }
    ]
  },
  {
    "id": "idee-9",
    "nr": 9,
    "cat": "Krieg und Belagerung",
    "title": "Kriegsmüdigkeit",
    "origin": "kern",
    "tags": [
      "EM",
      "LZ"
    ],
    "was": [
      "Jede Belagerung, die eine Fraktion führt, erhöht ihre Kriegsmüdigkeit. Bei hoher Müdigkeit steigen Mandat-Kosten und sinken Erträge; sie baut sich in Friedenszeiten ab."
    ],
    "wie": [
      "Der aggressivste Clan der Woche ist in Woche 3 erschöpft. Ein automatischer Anti-Snowball-Regler, der niemanden bestraft, sondern zu Rhythmus zwingt."
    ],
    "links": [
      {
        "to": "oekonomie",
        "why": "Wirkt über steigende Mandat-Kosten."
      },
      {
        "to": "belagerung",
        "why": "Bremst Dauer-Aggressoren ohne hartes Limit."
      },
      {
        "to": "claims",
        "why": "Ergänzt den quadratischen Unterhalt als zweiter Anti-Snowball-Regler."
      }
    ]
  },
  {
    "id": "idee-10",
    "nr": 10,
    "cat": "Krieg und Belagerung",
    "title": "Die Fahne",
    "origin": "kern",
    "tags": [
      "TP",
      "PVP",
      "EM"
    ],
    "was": [
      "Jede Fraktion hat eine physische Fahne im Kernblock-Bereich. Man kann sie in eine Belagerung mitnehmen: Der Träger ist langsamer, sichtbar und darf nicht angreifen."
    ],
    "wie": [
      "Dafür respawnen alle Verbündeten in 30 Blöcken Umkreis am Fahnenpunkt statt zu Hause. Fällt der Träger, fällt die Fahne. Ein einzelnes Item, das eine ganze Rollenklasse erzeugt."
    ],
    "links": [
      {
        "to": "belagerung",
        "why": "Verändert die Respawn-Logik einer laufenden Belagerung."
      },
      {
        "to": "progression",
        "why": "Erzeugt eine eigene, statusrelevante Rolle (Fahnenträger)."
      }
    ]
  },
  {
    "id": "idee-11",
    "nr": 11,
    "cat": "Wirtschaft und Logistik",
    "title": "Handelsrouten als Bauwerk",
    "origin": "kern",
    "tags": [
      "TP",
      "LZ",
      "EM"
    ],
    "was": [
      "Zwei Fraktionen können eine Handelsroute etablieren, indem sie physisch eine Straße oder Bahn zwischen ihren Territorien bauen (Vollständigkeitsprüfung durch das Plugin)."
    ],
    "wie": [
      "Eine bestehende Route erzeugt für beide Seiten passives Einkommen — und kann von Dritten unterbrochen werden, indem sie Streckenabschnitte in der Wildnis zerstören. Bauen wird zu Infrastruktur, Infrastruktur wird zum Kriegsziel."
    ],
    "links": [
      {
        "to": "oekonomie",
        "why": "Erzeugt passives Einkommen aus gebauter Infrastruktur."
      },
      {
        "to": "pvp",
        "why": "Zerstörte Streckenabschnitte werden zum Konfliktziel."
      },
      {
        "to": "idee-25",
        "why": "Verzahnt sich mit dem Nether-Highway-Straßennetz."
      }
    ]
  },
  {
    "id": "idee-12",
    "nr": 12,
    "cat": "Wirtschaft und Logistik",
    "title": "Der Wechselkurs",
    "origin": "kern",
    "tags": [
      "EM",
      "LZ"
    ],
    "was": [
      "Der Zoll-Markt zeigt einen automatisch berechneten, öffentlichen Preisindex für die wichtigsten Güter, basierend auf tatsächlichen Spielerhandelsdaten der letzten 7 Tage."
    ],
    "wie": [
      "Keine Server-Preisfestsetzung, nur Transparenz. Spieler bekommen ein Werkzeug, um Märkte zu lesen — und Spekulanten bekommen ein Spielfeld."
    ],
    "links": [
      {
        "to": "oekonomie",
        "why": "Macht die reine Spieler-Economy transparent lesbar."
      },
      {
        "to": "events",
        "why": "Läuft über das wöchentliche Zoll-Event."
      },
      {
        "to": "community",
        "why": "Gibt der Community ein gemeinsames Marktbild."
      }
    ]
  },
  {
    "id": "idee-13",
    "nr": 13,
    "cat": "Wirtschaft und Logistik",
    "title": "Verderbliche Fracht",
    "origin": "kern",
    "tags": [
      "EM",
      "PVP"
    ],
    "was": [
      "Bestimmte Frachtgüter (Proviant, Alchemistisches) verfallen nach 45 Minuten Realzeit und müssen sofort transportiert werden."
    ],
    "wie": [
      "Das erzeugt hektische, spontane Konvois zu unvorhersehbaren Zeiten — der beste Gegner geplanter Belagerungsroutine."
    ],
    "links": [
      {
        "to": "pvp",
        "why": "Erzwingt spontane Konvois abseits geplanter Fenster."
      },
      {
        "to": "ressourcen",
        "why": "Eine Sonderform der Frachtgüter mit Zeitdruck."
      },
      {
        "to": "events",
        "why": "Ergänzt die geplanten Karawanen um ungeplante Läufe."
      }
    ]
  },
  {
    "id": "idee-14",
    "nr": 14,
    "cat": "Wirtschaft und Logistik",
    "title": "Die Werkstatt",
    "origin": "kern",
    "tags": [
      "TP",
      "LZ",
      "EM"
    ],
    "was": [
      "Fortgeschrittene Gegenstände (Belagerungsgerät, verstärkte Materialien) werden nicht am Crafting-Table hergestellt, sondern in einer Fraktionswerkstatt — einem Multi-Block-Bauwerk, das mehrere Spieler gleichzeitig bedienen müssen."
    ],
    "wie": [
      "Einer legt ein, einer kurbelt, einer entnimmt; es braucht Zeit. Produktion wird zum Gruppenerlebnis statt zu einem Klick — und ist gleichzeitig ein natürliches Angriffsziel."
    ],
    "links": [
      {
        "to": "items",
        "why": "Fertigt verstärkte Materialien und Belagerungsgerät."
      },
      {
        "to": "ressourcen",
        "why": "Verarbeitet Blutstein und Sternenerz."
      },
      {
        "to": "idee-31",
        "why": "Braucht besetzte Rollen — passt zur Rollenpflicht."
      }
    ]
  },
  {
    "id": "idee-15",
    "nr": 15,
    "cat": "Wirtschaft und Logistik",
    "title": "Spezialisierung",
    "origin": "kern",
    "tags": [
      "EM",
      "TP",
      "LZ"
    ],
    "was": [
      "Eine Fraktion wählt pro Kapitel eine von sechs Spezialisierungen (Bergbau, Handel, Krieg, Logistik, Handwerk, Aufklärung). Jede gibt Boni in ihrem Feld und Mali in einem anderen."
    ],
    "wie": [
      "Keine Fraktion kann alles. Zwei Fraktionen mit komplementären Spezialisierungen sind natürliche Verbündete — Diplomatie entsteht aus Mechanik statt aus gutem Willen."
    ],
    "links": [
      {
        "to": "ressourcen",
        "why": "Verstärkt die regionale Arbeitsteilung auf Fraktionsebene."
      },
      {
        "to": "diplomatie",
        "why": "Komplementäre Spezialisierungen erzeugen natürliche Allianzen."
      },
      {
        "to": "claims",
        "why": "Kann Claim- und Produktionsboni beeinflussen."
      }
    ]
  },
  {
    "id": "idee-16",
    "nr": 16,
    "cat": "Wirtschaft und Logistik",
    "title": "Der Schwarzmarkt",
    "origin": "kern",
    "tags": [
      "EM",
      "LZ"
    ],
    "was": [
      "Ein rotierender, geheimer Ort in der Wildnis, dessen Position nur über Kartenfragmente auffindbar ist. Dort werden Reliquien, Kartenfragmente und Werkstattpläne gehandelt — ohne Fraktionszugehörigkeitsprüfung, PvP an."
    ],
    "wie": [
      "Wer hingeht, weiß, dass Feinde dort auch hingehen. Trotzdem gehen alle hin."
    ],
    "links": [
      {
        "to": "items",
        "why": "Umschlagplatz für Reliquien, Fragmente und Werkstattpläne."
      },
      {
        "to": "pvp",
        "why": "PvP-Zone, die alle Fraktionen anzieht."
      },
      {
        "to": "ressourcen",
        "why": "Kartenfragmente erzwingen den Weg zum Markt."
      }
    ]
  },
  {
    "id": "idee-17",
    "nr": 17,
    "cat": "Wirtschaft und Logistik",
    "title": "Kredite und Schulden",
    "origin": "kern",
    "tags": [
      "EM",
      "LZ"
    ],
    "was": [
      "Fraktionen können anderen Kredite gewähren: Betrag, Laufzeit, Zins — alles im Vertragssystem."
    ],
    "wie": [
      "Zahlt der Schuldner nicht, geht die Forderung automatisch in einen öffentlichen Chronik-Eintrag, und der Gläubiger bekommt einen kostenlosen Belagerungsanspruch. Schulden werden zum legitimen Kriegsgrund — Geopolitik in einem Feature."
    ],
    "links": [
      {
        "to": "diplomatie",
        "why": "Kredite sind ein Vertragstyp mit Konsequenz."
      },
      {
        "to": "oekonomie",
        "why": "Bewegt CastCoins zwischen Fraktionskassen."
      },
      {
        "to": "belagerung",
        "why": "Zahlungsausfall erzeugt einen legitimen Belagerungsanspruch."
      }
    ]
  },
  {
    "id": "idee-18",
    "nr": 18,
    "cat": "Wirtschaft und Logistik",
    "title": "Der Tribut-Automat",
    "origin": "kern",
    "tags": [
      "TP"
    ],
    "was": [
      "Ein Vertragstyp, der automatisch periodisch Ressourcen überweist."
    ],
    "wie": [
      "Klingt banal, ist aber der Unterschied zwischen „Vasall sein“ als Rollenspiel und „Vasall sein“ als Systemzustand. Ein starker Clan kann drei schwächere zu Tributpflichtigen machen, statt sie zu zerstören — und hat damit einen Grund, sie zu beschützen."
    ],
    "links": [
      {
        "to": "diplomatie",
        "why": "Macht Vasallentum zu einem echten, automatisierten Vertragszustand."
      },
      {
        "to": "oekonomie",
        "why": "Periodische Ressourcen-/Coin-Überweisung."
      },
      {
        "to": "antipatterns",
        "why": "Alternative zur ausgeschlossenen permanenten Vernichtung."
      }
    ]
  },
  {
    "id": "idee-19",
    "nr": 19,
    "cat": "Wirtschaft und Logistik",
    "title": "Ressourcen-Erschöpfung",
    "origin": "kern",
    "tags": [
      "EM",
      "WW"
    ],
    "was": [
      "Eine Blutstein-Ader in einem Chunk ist endlich und respawnt über Tage. Ein lange ausgebeutetes Territorium wird wertlos."
    ],
    "wie": [
      "Das zwingt zu Expansion und macht die Karte über die Season dynamisch: Die begehrten Regionen von Woche 2 sind in Woche 10 leer. Ohne diesen Mechanismus zementiert sich die Geografie am Tag 3."
    ],
    "links": [
      {
        "to": "ressourcen",
        "why": "Macht die Ressourcenverteilung über die Season dynamisch."
      },
      {
        "to": "claims",
        "why": "Entwertet statische Territorien und erzwingt Bewegung."
      },
      {
        "to": "season",
        "why": "Treibt den Wandel der Machtgeografie über die Kapitel."
      }
    ]
  },
  {
    "id": "idee-20",
    "nr": 20,
    "cat": "Wirtschaft und Logistik",
    "title": "Der Frachtbrief",
    "origin": "kern",
    "tags": [
      "EM",
      "PVP"
    ],
    "was": [
      "Wer eine Fracht abliefert, kann optional einen Frachtbrief ausstellen: Die Route wird öffentlich angekündigt, die Belohnung ist doppelt."
    ],
    "wie": [
      "Freiwilliges Risiko gegen freiwilligen Ertrag. Spieler, die Action wollen, malen sich selbst eine Zielscheibe auf den Rücken — und der Server bekommt garantierte Konvoi-Überfälle, ohne dass jemand sie planen musste."
    ],
    "links": [
      {
        "to": "pvp",
        "why": "Erzeugt planbare, freiwillige Konvoi-Überfälle."
      },
      {
        "to": "ressourcen",
        "why": "Verdoppelt den Frachtwert gegen Risiko."
      },
      {
        "to": "idee-13",
        "why": "Kombinierbar mit verderblicher Fracht für maximale Hektik."
      }
    ]
  },
  {
    "id": "idee-21",
    "nr": 21,
    "cat": "Territorium und Welt",
    "title": "Die wandernde Zitadelle",
    "origin": "kern",
    "tags": [
      "EM",
      "PVP",
      "LZ"
    ],
    "was": [
      "Die Zitadelle steht nicht fest: Alle 14 Tage verschwindet sie und erscheint an einem neuen Ort, der 48 h vorher angekündigt wird."
    ],
    "wie": [
      "Das erzwingt ein Wettrennen und verhindert, dass eine Fraktion einfach dauerhaft daneben baut. Die Machtgeografie des Servers wird alle zwei Wochen neu gemischt."
    ],
    "links": [
      {
        "to": "endgame",
        "why": "Verschärft die Zitadelle aus dem Endgame-System."
      },
      {
        "to": "belagerung",
        "why": "Bleibt außerhalb der Fenster belagerbar."
      },
      {
        "to": "season",
        "why": "Mischt die Machtgeografie über die Kapitel neu."
      }
    ]
  },
  {
    "id": "idee-22",
    "nr": 22,
    "cat": "Territorium und Welt",
    "title": "Regionale Wetter- und Umweltsysteme",
    "origin": "kern",
    "tags": [
      "EM",
      "WW"
    ],
    "was": [
      "Regionen haben permanente Umweltcharakteristika: Der Norden erzeugt Kälteschaden ohne passende Ausrüstung, die Wüste kostet Wasser, die Sümpfe verlangsamen."
    ],
    "wie": [
      "Das macht Territorium charakteristisch statt austauschbar und verändert Kampfausrüstung je nach Front. Wer im Norden angreift, muss anders packen als im Süden."
    ],
    "links": [
      {
        "to": "claims",
        "why": "Gibt jedem Territorium einen eigenen Charakter."
      },
      {
        "to": "pvp",
        "why": "Zwingt zu frontabhängiger Ausrüstung."
      },
      {
        "to": "ressourcen",
        "why": "Verstärkt die regionale Arbeitsteilung."
      }
    ]
  },
  {
    "id": "idee-23",
    "nr": 23,
    "cat": "Territorium und Welt",
    "title": "Der Nebel",
    "origin": "kern",
    "tags": [
      "EM",
      "WW"
    ],
    "was": [
      "Ein Teil der Karte ist zu Season-Beginn nicht kartiert. Wer als Erster eine Region betritt, wird als Entdecker in der Chronik verewigt und die Region wird auf der Dynmap für alle sichtbar."
    ],
    "wie": [
      "Der Anreiz zu erkunden ist Prestige, nicht Loot. Kostet fast nichts in der Entwicklung und liefert die ersten zwei Wochen Season-Content gratis."
    ],
    "links": [
      {
        "to": "chronik",
        "why": "Entdeckungen werden namentlich verewigt."
      },
      {
        "to": "season",
        "why": "Trägt die ersten zwei Wochen (Landnahme) mit Content."
      },
      {
        "to": "progression",
        "why": "„Erkunde unentdeckte Regionen“ ist ein Daily."
      }
    ]
  },
  {
    "id": "idee-24",
    "nr": 24,
    "cat": "Territorium und Welt",
    "title": "Grenzsteine",
    "origin": "kern",
    "tags": [
      "EM",
      "TP"
    ],
    "was": [
      "Claims werden nicht per Command gesetzt, sondern durch physisch platzierte Grenzsteine, die in der Welt stehen und — nur während Belagerungen — zerstörbar sind."
    ],
    "wie": [
      "Grenzen sind Objekte, keine Zahlen. Man kann sie sehen, fotografieren, darum kämpfen. Die konsequente Weiterführung des bestehenden Redstone-Fackel-Systems in den Kriegskontext."
    ],
    "links": [
      {
        "to": "claims",
        "why": "Macht Claims zu physischen, sichtbaren Objekten."
      },
      {
        "to": "belagerung",
        "why": "Grenzsteine sind nur während Belagerungen zerstörbar."
      },
      {
        "to": "onboarding",
        "why": "Baut auf dem bekannten Redstone-Fackel-System auf."
      }
    ]
  },
  {
    "id": "idee-25",
    "nr": 25,
    "cat": "Territorium und Welt",
    "title": "Der Landweg",
    "origin": "kern",
    "tags": [
      "EM",
      "TP",
      "LZ"
    ],
    "was": [
      "Der Nether ist für Highways nutzbar (wie im Survival), aber Nether-Portale in fremdem Territorium sind blockiert und Nether-Highways können in der Wildnis von jedem zerstört werden."
    ],
    "wie": [
      "Die Community baut das Straßennetz gemeinsam — und das Straßennetz wird zum strategischen Ziel. Übernimmt die Highway-Kultur des Survival-Servers und macht sie kriegsrelevant."
    ],
    "links": [
      {
        "to": "pvp",
        "why": "Das Straßennetz wird zum Logistik- und Kriegsziel."
      },
      {
        "to": "idee-11",
        "why": "Trägt die gebauten Handelsrouten."
      },
      {
        "to": "community",
        "why": "Gemeinsam gebaute Infrastruktur bindet die Community."
      }
    ]
  },
  {
    "id": "idee-26",
    "nr": 26,
    "cat": "Territorium und Welt",
    "title": "Bodenqualität",
    "origin": "kern",
    "tags": [
      "EM",
      "WW"
    ],
    "was": [
      "Chunks haben unsichtbare Eigenschaften (Erzdichte, Fruchtbarkeit, Bauuntergrund), die man mit einem Werkzeug vermessen kann. Ein guter Chunk ist nicht offensichtlich."
    ],
    "wie": [
      "Das erzeugt eine Aufklärungs-Rolle vor der Landnahme und belohnt Spieler, die sich vorbereiten, statt Spieler, die zuerst da sind."
    ],
    "links": [
      {
        "to": "claims",
        "why": "Macht die Standortwahl zu einer informierten Entscheidung."
      },
      {
        "to": "idee-46",
        "why": "Der Kartograf-Beruf kann Bodenqualität sehen."
      },
      {
        "to": "ressourcen",
        "why": "Verbindet Standort mit Ertragspotenzial."
      }
    ]
  },
  {
    "id": "idee-27",
    "nr": 27,
    "cat": "Territorium und Welt",
    "title": "Die Ruinen",
    "origin": "kern",
    "tags": [
      "WW",
      "EM"
    ],
    "was": [
      "An zufälligen Orten der Wildnis generieren sich Ruinen der vergangenen Season — vereinfachte Nachbildungen echter Spielerbasen aus der letzten Season, mit dem Namen der Erbauer."
    ],
    "wie": [
      "Sie sind plünderbar, enthalten kleine Belohnungen und ein Chronik-Fragment. Der Server erzählt seine eigene Geschichte durch die Landschaft. Technisch mit einem Schematic-Export am Season-Ende machbar."
    ],
    "links": [
      {
        "to": "season",
        "why": "Trägt die letzte Season physisch in die neue Welt."
      },
      {
        "to": "chronik",
        "why": "Ruinen enthalten Chronik-Fragmente."
      },
      {
        "to": "community",
        "why": "Emotionale Würdigung vergangener Basen."
      }
    ]
  },
  {
    "id": "idee-28",
    "nr": 28,
    "cat": "Territorium und Welt",
    "title": "Aufgegebene Territorien verfallen sichtbar",
    "origin": "kern",
    "tags": [
      "EM",
      "LZ"
    ],
    "was": [
      "Ein Chunk, dessen Fraktion inaktiv wird, verwildert optisch schrittweise (Moos, Ranken, Risse) — als sichtbares Signal, bevor er freigegeben wird."
    ],
    "wie": [
      "Man sieht auf der Karte, wo der Server stirbt und wo er lebt — und man sieht rechtzeitig, wo bald Land frei wird."
    ],
    "links": [
      {
        "to": "claims",
        "why": "Signalisiert bevorstehende Claim-Freigabe visuell."
      },
      {
        "to": "season",
        "why": "Macht Aktivität und Verfall über die Season sichtbar."
      },
      {
        "to": "idee-36",
        "why": "Ergänzt die Erbfolge als Anti-Inaktivitäts-Signal."
      }
    ]
  },
  {
    "id": "idee-29",
    "nr": 29,
    "cat": "Territorium und Welt",
    "title": "Der Leuchtturm",
    "origin": "kern",
    "tags": [
      "TP",
      "LZ"
    ],
    "was": [
      "Ein Prestige-Bauwerk, das im Umkreis von 500 Blöcken alle Fraktionsmitglieder auf der Karte für die eigene Fraktion sichtbar macht. Teuer, sichtbar, angreifbar."
    ],
    "wie": [
      "Es gibt keinen Kampfvorteil, nur Information — und Information ist im Krieg die wertvollste Ressource."
    ],
    "links": [
      {
        "to": "endgame",
        "why": "Ein Prestige-Bauwerk im Endgame-Sinn."
      },
      {
        "to": "pvp",
        "why": "Aufklärung als gebaute Struktur."
      },
      {
        "to": "cosmetics",
        "why": "Sichtbares Statussymbol auf der Dynmap."
      }
    ]
  },
  {
    "id": "idee-30",
    "nr": 30,
    "cat": "Territorium und Welt",
    "title": "Naturkatastrophen mit Vorwarnung",
    "origin": "kern",
    "tags": [
      "EM",
      "WW"
    ],
    "was": [
      "Ein Erdrutsch/Vulkan/Sturm wird 72 h vorher angekündigt und trifft eine benannte Region. Die dort ansässige Fraktion muss entscheiden: evakuieren, verstärken oder aufgeben."
    ],
    "wie": [
      "Erzeugt Umbrüche, die niemand persönlich verursacht hat — der Server als dritter Spieler, ohne dass ein Admin eingreift."
    ],
    "links": [
      {
        "to": "events",
        "why": "Eine Sonderform der Weltereignisse mit permanenter Wirkung."
      },
      {
        "to": "claims",
        "why": "Zwingt zu Evakuierungs-/Verstärkungsentscheidungen."
      },
      {
        "to": "adminevents",
        "why": "Live streambar als Show mit Konsequenz."
      }
    ]
  },
  {
    "id": "idee-31",
    "nr": 31,
    "cat": "Fraktionen und Teamplay",
    "title": "Die Rollenpflicht",
    "origin": "kern",
    "tags": [
      "TP",
      "EM"
    ],
    "was": [
      "Eine Fraktion kann nur so viele Chunks halten, wie sie Rollen besetzt hat: Ein Quartiermeister, ein Diplomat, ein Baumeister, ein Späher sind für die Ausbaustufe erforderlich."
    ],
    "wie": [
      "Ein Clan aus 10 PvP-Spielern kann nicht expandieren. Das macht Nicht-Kämpfer nicht nur nützlich, sondern strukturell notwendig — und ist die Antwort auf „Warum sollte ein Builder auf einen Factions-Server kommen?“"
    ],
    "links": [
      {
        "to": "claims",
        "why": "Koppelt Claim-Kapazität an besetzte Rollen."
      },
      {
        "to": "progression",
        "why": "Macht die Fraktionsränge spielentscheidend."
      },
      {
        "to": "onboarding",
        "why": "Schafft echten Bedarf für Nicht-PvP-Spielertypen."
      }
    ]
  },
  {
    "id": "idee-32",
    "nr": 32,
    "cat": "Fraktionen und Teamplay",
    "title": "Die Ratsversammlung",
    "origin": "kern",
    "tags": [
      "TP",
      "EM"
    ],
    "was": [
      "Fraktionsentscheidungen (Kriegserklärung, Vertrag, Kernblock-Verlegung) können optional an eine interne Abstimmung gebunden werden, die der Anführer aktiviert."
    ],
    "wie": [
      "Das Ergebnis ist bindend und geht in die Chronik. Clans, die es nutzen, bekommen einen kleinen Mandat-Bonus („Einigkeit“). Demokratie als Spielmechanik — und ein Werkzeug gegen Anführer-Willkür, den häufigsten Grund für Clan-Zerfall."
    ],
    "links": [
      {
        "to": "diplomatie",
        "why": "Bindet diplomatische Akte an Fraktionsabstimmungen."
      },
      {
        "to": "progression",
        "why": "Belohnt Einigkeit mit einem Mandat-Bonus."
      },
      {
        "to": "chronik",
        "why": "Abstimmungsergebnisse werden verewigt."
      }
    ]
  },
  {
    "id": "idee-33",
    "nr": 33,
    "cat": "Fraktionen und Teamplay",
    "title": "Die Lehre",
    "origin": "kern",
    "tags": [
      "TP",
      "LZ"
    ],
    "was": [
      "Ein erfahrener Spieler kann einen Neuling als Lehrling annehmen. Beide bekommen Fortschritt, wenn der Lehrling Meilensteine erreicht."
    ],
    "wie": [
      "Der Mentor bekommt einen sichtbaren Titel und Chronik-Einträge für jeden Lehrling, der es weit bringt. Onboarding wird von einer Team-Aufgabe zu einem Community-Feature — bei einer Whitelist-Community mit hoher Bindung außergewöhnlich wirksam."
    ],
    "links": [
      {
        "to": "onboarding",
        "why": "Macht aus Onboarding ein Mentoren-Feature."
      },
      {
        "to": "community",
        "why": "Nutzt die hohe soziale Bindung der Whitelist-Community."
      },
      {
        "to": "progression",
        "why": "Mentor-Titel und Chronik-Einträge als Belohnung."
      }
    ]
  },
  {
    "id": "idee-34",
    "nr": 34,
    "cat": "Fraktionen und Teamplay",
    "title": "Der Eid",
    "origin": "kern",
    "tags": [
      "EM",
      "TP"
    ],
    "was": [
      "Beim Beitritt leistet ein Spieler einen Eid mit selbstgewählter Mindestbindungsdauer (7/14/30 Tage). Vorzeitiger Austritt kostet Ansehen und wird in der Chronik vermerkt."
    ],
    "wie": [
      "Längere Eide geben der Fraktion mehr Mandat. Clan-Hopping wird nicht verboten, sondern hat Kosten. Und ein 30-Tage-Eid ist ein Statement, das man sichtbar trägt."
    ],
    "links": [
      {
        "to": "progression",
        "why": "Der Eid ist ein sichtbar getragenes Commitment."
      },
      {
        "to": "oekonomie",
        "why": "Längere Eide erhöhen das Fraktions-Mandat."
      },
      {
        "to": "idee-48",
        "why": "Speist das Ansehen-System bei Eidbruch."
      }
    ]
  },
  {
    "id": "idee-35",
    "nr": 35,
    "cat": "Fraktionen und Teamplay",
    "title": "Split-Mechanik",
    "origin": "kern",
    "tags": [
      "EM",
      "LZ"
    ],
    "was": [
      "Eine Fraktion kann sich offiziell spalten: Ein Offizier gründet eine Tochterfraktion, nimmt seine Anhänger und einen Teil des Territoriums mit."
    ],
    "wie": [
      "Das Verhältnis zur Mutterfraktion ist frei wählbar (Bündnis oder Krieg). Statt dass ein zerstrittener Clan im Discord implodiert und alle aufhören, produziert der Streit einen neuen Akteur. Der häufigste Community-Killer wird zum Content-Generator."
    ],
    "links": [
      {
        "to": "diplomatie",
        "why": "Die Tochterfraktion startet mit einem gewählten Beziehungsstatus."
      },
      {
        "to": "claims",
        "why": "Territorium wird bei der Spaltung geteilt."
      },
      {
        "to": "community",
        "why": "Verhindert, dass ein Clan-Streit die Community leert."
      }
    ]
  },
  {
    "id": "idee-36",
    "nr": 36,
    "cat": "Fraktionen und Teamplay",
    "title": "Erbfolge",
    "origin": "kern",
    "tags": [
      "EM",
      "LZ"
    ],
    "was": [
      "Wird ein Anführer 14 Tage inaktiv, übernimmt automatisch der Offizier mit der höchsten Beitragsleistung — nach einer öffentlichen 48-h-Vorwarnung."
    ],
    "wie": [
      "Verhindert den Klassiker „Anführer hört auf, Clan mit 20 aktiven Leuten ist tot“. Ein Detail, das kaum jemand bemerkt und das Dutzende Spielerkarrieren rettet."
    ],
    "links": [
      {
        "to": "progression",
        "why": "Nutzt die Beitragsleistung zur Nachfolgebestimmung."
      },
      {
        "to": "community",
        "why": "Rettet aktive Clans vor dem Anführer-Ausfall."
      },
      {
        "to": "idee-28",
        "why": "Greift, bevor Territorium sichtbar verfällt."
      }
    ]
  },
  {
    "id": "idee-37",
    "nr": 37,
    "cat": "Fraktionen und Teamplay",
    "title": "Fraktionsgedächtnis",
    "origin": "kern",
    "tags": [
      "LZ",
      "EM"
    ],
    "was": [
      "Jede Fraktion hat eine permanente Seite mit ihrer gesamten Geschichte über alle Seasons hinweg: Gründung, Anführer, Kriege, Siege, Spaltungen."
    ],
    "wie": [
      "Wer eine Fraktion mit demselben Namen neu gründet, erbt die Chronik. Ein Fraktionsname wird über Jahre zu einer Marke innerhalb der Community — der stärkste denkbare Cross-Season-Übertrag, und er kostet null Balance."
    ],
    "links": [
      {
        "to": "chronik",
        "why": "Aggregiert die Chronik zu einer permanenten Fraktionsbiografie."
      },
      {
        "to": "season",
        "why": "Der einzige erlaubte Cross-Season-Übertrag — reine Geschichte."
      },
      {
        "to": "community",
        "why": "Macht Fraktionsnamen zu langlebigen Marken."
      }
    ]
  },
  {
    "id": "idee-38",
    "nr": 38,
    "cat": "Fraktionen und Teamplay",
    "title": "Gastrecht",
    "origin": "kern",
    "tags": [
      "TP",
      "EM"
    ],
    "was": [
      "Eine Fraktion kann einzelnen fremden Spielern Gastrecht gewähren: Betreten und Bauen in einem definierten Bereich, kein Lagerzugriff."
    ],
    "wie": [
      "Ermöglicht neutrale Händler, befreundete Builder und Diplomaten in fremden Basen. Kleine Mechanik, riesige soziale Wirkung — plötzlich sind fremde Basen Orte, die man besuchen kann."
    ],
    "links": [
      {
        "to": "diplomatie",
        "why": "Erweitert Beziehungen um Einzelperson-Zugang."
      },
      {
        "to": "community",
        "why": "Macht fremde Basen zu besuchbaren Orten."
      },
      {
        "to": "idee-40",
        "why": "Voraussetzung für Bürgen im Vertrauensbeweis."
      }
    ]
  },
  {
    "id": "idee-39",
    "nr": 39,
    "cat": "Fraktionen und Teamplay",
    "title": "Die gemeinsame Schuld",
    "origin": "kern",
    "tags": [
      "EM",
      "TP"
    ],
    "was": [
      "Wenn ein Fraktionsmitglied einen Vertrag bricht oder gegen eine Waffenruhe verstößt, trägt die ganze Fraktion den Ansehensverlust."
    ],
    "wie": [
      "Clans müssen ihre eigenen Leute kontrollieren. Das erzeugt internen sozialen Druck statt Moderationsaufwand — genau der Mechanismus, mit dem CastCrafters Whitelist-Kultur ohnehin arbeitet."
    ],
    "links": [
      {
        "to": "kriegszustaende",
        "why": "Erweitert die Haftungslogik des Vertragsbruchs."
      },
      {
        "to": "idee-48",
        "why": "Wirkt über den Ansehen-Wert der Fraktion."
      },
      {
        "to": "community",
        "why": "Ersetzt Moderationsaufwand durch sozialen Druck."
      }
    ]
  },
  {
    "id": "idee-40",
    "nr": 40,
    "cat": "Fraktionen und Teamplay",
    "title": "Der Vertrauensbeweis",
    "origin": "kern",
    "tags": [
      "EM",
      "TP"
    ],
    "was": [
      "Zwei verfeindete Fraktionen können Geiseln/Bürgen austauschen: Ein Spieler jeder Seite geht freiwillig für die Vertragslaufzeit in das Territorium der anderen (mit Gastrecht)."
    ],
    "wie": [
      "Bricht eine Seite den Vertrag, verliert ihr Bürge Ausrüstung und die Fraktion massiv Ansehen. Ein mittelalterliches Konzept, das in Minecraft noch niemand gebaut hat — und das die intensivsten Rollenspielmomente erzeugt, die ein Factions-Server haben kann."
    ],
    "links": [
      {
        "to": "diplomatie",
        "why": "Die intensivste Vertrauensstufe im Vertragssystem."
      },
      {
        "to": "idee-38",
        "why": "Nutzt das Gastrecht für den Bürgen-Aufenthalt."
      },
      {
        "to": "idee-48",
        "why": "Vertragsbruch trifft das Ansehen massiv."
      }
    ]
  },
  {
    "id": "idee-41",
    "nr": 41,
    "cat": "Fortschritt und Motivation",
    "title": "Der Chronik-Score",
    "origin": "kern",
    "tags": [
      "LZ",
      "EM"
    ],
    "was": [
      "Ein persönlicher Wert, der nicht durch Grind steigt, sondern dadurch, wie oft man in bedeutsamen Chronik-Einträgen vorkommt: Belagerungen entschieden, Verträge verhandelt, Reliquien gefunden, Konvois gerettet."
    ],
    "wie": [
      "Er ist nicht farmbar, weil er nur durch Beteiligung an Ereignissen steigt, die andere Menschen ebenfalls erlebt haben. Der ehrlichste Prestige-Wert, den man bauen kann."
    ],
    "links": [
      {
        "to": "chronik",
        "why": "Leitet sich direkt aus den Chronik-Einträgen ab."
      },
      {
        "to": "progression",
        "why": "Ein grind-freier Prestige-Wert neben den Rängen."
      },
      {
        "to": "toplisten",
        "why": "Kann eine eigene, nicht-farmbare Topliste speisen."
      }
    ]
  },
  {
    "id": "idee-42",
    "nr": 42,
    "cat": "Fortschritt und Motivation",
    "title": "Meisterschaften statt Level",
    "origin": "kern",
    "tags": [
      "LZ",
      "WW"
    ],
    "was": [
      "Kein Spieler-Level. Stattdessen dutzende kleine Meisterschaften mit je 5 Stufen (Bergbau in der Wildnis, Fracht unter Beschuss, Verteidigung von Kontrollpunkten, Dungeon-Zeiten, Handelsvolumen)."
    ],
    "wie": [
      "Jede gibt einen Titel und ein Cosmetic, keine Werte. Es gibt immer noch etwas zu erreichen, und jeder Spielertyp hat seine eigene Progression."
    ],
    "links": [
      {
        "to": "progression",
        "why": "Ersetzt ein einzelnes Level durch viele parallele Fortschritte."
      },
      {
        "to": "cosmetics",
        "why": "Belohnt mit Titeln und Cosmetics, nie mit Werten."
      },
      {
        "to": "toplisten",
        "why": "Speist spezialisierte Bestenlisten."
      }
    ]
  },
  {
    "id": "idee-43",
    "nr": 43,
    "cat": "Fortschritt und Motivation",
    "title": "Der Nachruf",
    "origin": "kern",
    "tags": [
      "EM",
      "LZ"
    ],
    "was": [
      "Wenn ein Spieler eine Fraktion dauerhaft verlässt oder eine Fraktion sich auflöst, generiert das System einen Nachruf-Eintrag mit den wichtigsten Momenten."
    ],
    "wie": [
      "Klingt morbide, ist aber Würdigung: Nichts verschwindet einfach. Bei einer Community, die zusammen Videos schaut, ist das ein starkes Signal."
    ],
    "links": [
      {
        "to": "chronik",
        "why": "Der Nachruf ist ein automatischer Chronik-Eintrag."
      },
      {
        "to": "community",
        "why": "Würdigung statt kommentarlosem Verschwinden."
      },
      {
        "to": "idee-37",
        "why": "Ergänzt das Fraktionsgedächtnis um ein Ende."
      }
    ]
  },
  {
    "id": "idee-44",
    "nr": 44,
    "cat": "Fortschritt und Motivation",
    "title": "Rückkehrer-Fenster",
    "origin": "kern",
    "tags": [
      "LZ"
    ],
    "was": [
      "Ein Spieler, der 14+ Tage weg war, bekommt beim Login eine Zusammenfassung, seine alten Dailies gutgeschrieben (gedeckelt) und 48 h lang doppelten BattlePass-Fortschritt."
    ],
    "wie": [
      "Kein Pay2Win, keine Ressourcen — nur ein sanfter Wiedereinstieg. Wer zurückkommt, soll nicht 4 Wochen hinterherhinken."
    ],
    "links": [
      {
        "to": "progression",
        "why": "Doppelter BattlePass-Fortschritt beim Wiedereinstieg."
      },
      {
        "to": "onboarding",
        "why": "Re-Onboarding für Rückkehrer statt Neulinge."
      },
      {
        "to": "community",
        "why": "Senkt die Hürde zurückzukommen."
      }
    ]
  },
  {
    "id": "idee-45",
    "nr": 45,
    "cat": "Fortschritt und Motivation",
    "title": "Der Rivalen-Tracker",
    "origin": "kern",
    "tags": [
      "PVP",
      "LZ",
      "EM"
    ],
    "was": [
      "Das System erkennt automatisch, gegen welchen Spieler oder welche Fraktion man am häufigsten gekämpft hat, und zeigt eine persönliche Bilanz: Siege, Niederlagen, Belagerungen, letzte Begegnung."
    ],
    "wie": [
      "Aus anonymem PvP wird eine benannte Rivalität. Am Season-Ende bekommt jeder seinen „Erzfeind der Season“ in die Rückblick-Karte. Der billigste Weg, Bindung zu erzeugen."
    ],
    "links": [
      {
        "to": "toplisten",
        "why": "Macht aus anonymem PvP eine benannte, gelistete Rivalität."
      },
      {
        "to": "chronik",
        "why": "Der Erzfeind landet in der Season-Rückblick-Karte."
      },
      {
        "to": "pvp",
        "why": "Gibt jedem Feldkampf eine Fortsetzungsgeschichte."
      }
    ]
  },
  {
    "id": "idee-46",
    "nr": 46,
    "cat": "Fortschritt und Motivation",
    "title": "Saisonale Berufe",
    "origin": "kern",
    "tags": [
      "WW",
      "LZ",
      "EM"
    ],
    "was": [
      "Zu Season-Beginn wählt jeder Spieler einen von acht Berufen (Schmied, Kartograf, Fuhrmann, Späher, Alchemist, Baumeister, Händler, Söldner). Der Beruf gibt keine Kampfvorteile, sondern exklusive Fähigkeiten in seinem Feld."
    ],
    "wie": [
      "Der Kartograf sieht Chunk-Bodenqualität, der Fuhrmann trägt mehr Fracht, der Schmied repariert billiger. Man kann pro Season nur einen Beruf haben — jede Season spielt man ein anderes Spiel. Der stärkste Wiederspielwert-Hebel im ganzen Konzept."
    ],
    "links": [
      {
        "to": "progression",
        "why": "Gibt jeder Season eine eigene Spielweise und Progression."
      },
      {
        "to": "pvp",
        "why": "Verteilt kriegsentscheidende Nicht-Kampf-Rollen."
      },
      {
        "to": "idee-26",
        "why": "Der Kartograf-Beruf liest Bodenqualität."
      }
    ]
  },
  {
    "id": "idee-47",
    "nr": 47,
    "cat": "Fortschritt und Motivation",
    "title": "Der offene Auftrag",
    "origin": "kern",
    "tags": [
      "TP",
      "LZ"
    ],
    "was": [
      "Jeder Spieler kann öffentliche Aufträge ausschreiben und mit CastCoins hinterlegen: „500 Blutstein zum Nordtor“, „Eskortiere mich nach X“, „Kopfgeld auf Y“, „Baue mir eine Mauer“."
    ],
    "wie": [
      "Bezahlung automatisch bei Erfüllung. Ein Quest-System, das von Spielern für Spieler geschrieben wird — unendlicher Content, null Content-Erstellungskosten, und für den Solo-Spieler eine echte Einnahmequelle."
    ],
    "links": [
      {
        "to": "oekonomie",
        "why": "Hinterlegte CastCoins werden bei Erfüllung ausgezahlt."
      },
      {
        "to": "onboarding",
        "why": "Eine echte Einnahmequelle für Solisten."
      },
      {
        "to": "toplisten",
        "why": "Kopfgeld-Aufträge speisen die Kopfgeld-Listen."
      }
    ]
  },
  {
    "id": "idee-48",
    "nr": 48,
    "cat": "Fortschritt und Motivation",
    "title": "Ansehen als zweite Reputation",
    "origin": "kern",
    "tags": [
      "EM",
      "LZ"
    ],
    "was": [
      "Neben Kampfrängen existiert ein Ansehen-Wert pro Fraktion, gespeist aus gehaltenen Verträgen, fairen Kapitulationen, geschützten Neulingen und erfüllten Aufträgen."
    ],
    "wie": [
      "Hohes Ansehen senkt Vertragskosten und macht mehr Söldner verfügbar (Söldner arbeiten ungern für Vertragsbrecher). Der freundliche Weg ist damit ein strategisch valider Weg — nicht nur ein moralischer. Ungewöhnlich, und passt exakt zur CastCrafter-Kultur."
    ],
    "links": [
      {
        "to": "diplomatie",
        "why": "Ansehen senkt Vertragskosten und steuert Söldner-Verfügbarkeit."
      },
      {
        "to": "kriegszustaende",
        "why": "Vertragsbrüche senken das Ansehen."
      },
      {
        "to": "toplisten",
        "why": "Diplomatie-Ansehen ist eine eigene Fraktionsliste."
      }
    ]
  },
  {
    "id": "idee-49",
    "nr": 49,
    "cat": "Fortschritt und Motivation",
    "title": "Der stille Rekord",
    "origin": "kern",
    "tags": [
      "WW",
      "EM"
    ],
    "was": [
      "Eine Handvoll geheimer, nicht angekündigter Rekorde („längste gehaltene Frontlinie“, „weiteste Fracht-Einzelstrecke“, „längste ununterbrochene Allianz“)."
    ],
    "wie": [
      "Sie werden erst am Season-Ende enthüllt, mit Namen. Niemand kann darauf hinspielen — man kann sie nur beiläufig gewinnen. Das gibt Spielern, die nie in einer Topliste standen, ihren Moment im Abschlussvideo."
    ],
    "links": [
      {
        "to": "season",
        "why": "Enthüllung am Season-Ende als Überraschung."
      },
      {
        "to": "chronik",
        "why": "Stille Rekorde werden namentlich verewigt."
      },
      {
        "to": "toplisten",
        "why": "Ergänzt sichtbare Listen um verborgene Auszeichnungen."
      }
    ]
  },
  {
    "id": "idee-50",
    "nr": 50,
    "cat": "Fortschritt und Motivation",
    "title": "Die Zeitkapsel",
    "origin": "kern",
    "tags": [
      "LZ",
      "EM"
    ],
    "was": [
      "Jeder Spieler kann zu Season-Beginn eine Nachricht an sich selbst und an die Community schreiben, die am Season-Ende automatisch veröffentlicht wird — neben seinen tatsächlichen Statistiken."
    ],
    "wie": [
      "„Ich werde diese Season den größten Clan des Servers führen.“ — vier Monate später, öffentlich, neben dem echten Ergebnis. Das kostet zwei Datenbankspalten und liefert das emotionale Ende, das ein Abschlussvideo trägt."
    ],
    "links": [
      {
        "to": "season",
        "why": "Öffnet sich am Season-Ende neben den echten Statistiken."
      },
      {
        "to": "chronik",
        "why": "Wird in die öffentliche Chronik aufgenommen."
      },
      {
        "to": "community",
        "why": "Liefert das emotionale Finale für den Abschlussstream."
      }
    ]
  }
];

export const QUESTIONS: Question[] = [
  {
    "t": "Verteidigungsfenster: ja oder nein?",
    "block": true,
    "body": [
      "Die Grundsatzentscheidung, an der das gesamte Konzept hängt.",
      {
        "ul": [
          "<b>Mit Fenstern:</b> casual-freundlich, streambar, community-kompatibel — der Anti-Offline-Raid-Schutz funktioniert.",
          "<b>Ohne Fenster:</b> authentisch und hardcore, aber Offline-Raiding kehrt zurück und die Casual-Basis bricht nach wenigen Wochen weg."
        ]
      }
    ],
    "rec": "Klar mit Fenstern. Aber die Entscheidung muss bewusst und geschlossen fallen, weil sich Belagerung, Claims und Anti-Grief daran aufhängen."
  },
  {
    "t": "Season-Rhythmus: eigener Kalender oder Kopplung an Major-Versionen?",
    "block": false,
    "body": [
      "Weicht vom Survival-Modell ab, wo eine Season an eine Minecraft-Major-Version gekoppelt ist.",
      {
        "ul": [
          "<b>Eigener Kalender:</b> planbarer, dramaturgisch gesetzter Endtermin (~18 Wochen).",
          "<b>Major-Version-Kopplung:</b> konsistent mit dem Netzwerk, aber unregelmäßig und schlecht planbar."
        ]
      }
    ],
    "rec": "Eigener Factions-Kalender. Eine Major-Version wird genutzt, wenn sie zeitlich passt, aber nicht als Bedingung. Mit CastCrafter und der Administration abstimmen — es betrifft die Content-Planung des Kanals."
  },
  {
    "t": "Folia: ja oder nein?",
    "block": true,
    "body": [
      "Reine Entwicklerentscheidung, aber sie muss vor der ersten Zeile Code fallen — nachträglicher Umbau auf region-basiertes Scheduling ist teurer als das ganze Feature-Set.",
      {
        "ul": [
          "<b>Ja:</b> nötig für 200+ Spieler und großflächige Belagerungen; erzwingt aber durchgängig region-basiertes, nicht-blockierendes Scheduling (MCCoroutine).",
          "<b>Nein:</b> einfacher zu entwickeln, aber begrenzt die Spielerzahl pro Belagerung."
        ]
      }
    ],
    "rec": "Bei Zielgröße 200+ eindeutig ja — und dann von Anfang an konsequent. Hängt direkt an der noch offenen Zielgrößen-Frage."
  },
  {
    "t": "Persistenter Duell-Server: bauen oder nicht?",
    "block": false,
    "body": [
      "Er existiert nicht und wird von mehreren Systemen als Skill-Ventil vorausgesetzt (PvP, Ränge, Endgame).",
      {
        "ul": [
          "<b>Season 1:</b> über terminierte Turniere auf dem bestehenden Event-Server überbrückbar.",
          "<b>Persistenter Ladder mit ELO:</b> eigenes Projekt mit eigener Wartung, Moderation und Spielerbasis."
        ]
      }
    ],
    "rec": "Season 1 über Event-Server-Turniere, persistenten Ladder frühestens Season 2. Wichtig ist, die Frage bewusst zu beantworten statt sie liegen zu lassen."
  },
  {
    "t": "Whitelist oder offener Zugang?",
    "block": false,
    "body": [
      "Der Survival-Server ist whitelistgeschützt. Ein offener Factions-Server wäre eine Positionsentscheidung mit massiven Folgen für Moderation, Regelwerk und Toxizitätsrisiko."
    ],
    "rec": "Whitelist. Ohne sie trägt dieses Konzept nicht — die Durchsetzung von Anti-Alt-, Anti-Grief- und Anti-Toxizitäts-Regeln beruht auf identifizierbaren Spielern."
  }
];

export const ROADMAP: Roadmap = {
  "lede": "Ein Server, der mit 60 % Feature-Umfang launcht und dann sichtbar wächst, ist stärker als einer, der mit 100 % launcht und dann stillsteht. Und er ist realistisch — das hier ist kein Zwei-Monats-Projekt.",
  "decisions": [
    {
      "t": "Verteidigungsfenster: ja oder nein.",
      "d": "Die Grundsatzentscheidung. Mit Fenstern ist der Server casual-freundlich, streambar, community-kompatibel. Ohne Fenster ist er authentisch, hardcore — und hat nach 6 Wochen 30 Spieler. Klare Empfehlung: die Fenster. Aber die Entscheidung muss bewusst und geschlossen fallen, weil sich das gesamte Konzept daran aufhängt."
    },
    {
      "t": "Season-Rhythmus: eigener Kalender oder Major-Version-Kopplung.",
      "d": "Weicht vom etablierten Survival-Modell ab. Muss mit CastCrafter und der Administration abgestimmt werden, weil es die Content-Planung des Kanals betrifft."
    },
    {
      "t": "Folia: ja oder nein.",
      "d": "Reine Entwicklerentscheidung, aber sie muss vor der ersten Zeile Code fallen. Ein 14-Modul-Projekt nachträglich auf region-basiertes Scheduling umzubauen ist teurer als das ganze Feature-Set."
    }
  ],
  "scope": [
    "<b>Launch-Umfang (MVP, Season 1):</b> Core, Claims/Kernblock, Belagerung mit Fenstern, Economy (PayCheck + Mandat), Kriegszustände und Vertragsbruch (B.3/B.4), Diplomatie-Basis (Verträge, Beziehungsstufen), Chronik, Protection-Portierung, Discord-Bot, Dynmap.",
    {
      "callout": "factions-core + claims + siege + economy sind allein eine MVP-Season. Dungeons, BattlePass, Weltbosse und Events kommen als Kapitel-Updates während der laufenden Season — das ist gleichzeitig gutes Live-Ops-Design: Der Server bekommt sichtbar Content.",
      "tone": "peace",
      "l": "Realistische Einschätzung"
    }
  ],
  "phases": [
    {
      "t": "Kapitel 2",
      "d": "Logistik / Fracht / Konvois, Karawanen."
    },
    {
      "t": "Kapitel 3",
      "d": "Weltbosse, Zitadelle, Dungeons Tier 1–2."
    },
    {
      "t": "Kapitel 4",
      "d": "BattlePass, saisonale Berufe, Endzeit-Mechanik."
    },
    {
      "t": "Season 2",
      "d": "Berufe von Anfang an, Dungeons vollständig, Spezialisierungen, erweiterte Diplomatie, Ruinen der Season 1."
    }
  ],
  "need": [
    {
      "ul": [
        "<b>Ton und Stil des Kanals.</b> Naming (Fraktion vs. Clan vs. Haus, „Mandat“ vs. etwas Besseres), Lore-Rahmen und Event-Präsentation hängen komplett daran.",
        "<b>Zielgröße.</b> 80 gleichzeitige Spieler oder 500? Belagerungsdesign, Kartengröße und die Folia-Frage hängen davon ab.",
        "<b>Whitelist oder offen?</b> Einschätzung: Ohne Whitelist trägt dieses Konzept nicht — Moderation, Regelwerk und Toxizitätsrisiko hängen unmittelbar daran.",
        "<b>Duell-Server: bauen oder nicht?</b> Er existiert nicht und wird von mehreren Systemen als Skill-Ventil vorausgesetzt. Für Season 1 über Event-Server-Turniere überbrückbar.",
        "<b>Team-Kapazität.</b> Wie viele Entwicklerstunden pro Woche? Davon hängt ab, ob dieses Konzept ein Plan oder ein Wunschzettel ist."
      ]
    }
  ]
};

export const ROADMAP_TRACKS: RoadmapTrack[] = [
  {
    id: 'allgemein',
    label: 'Allgemein',
    lede: 'Was auf dem Server passiert — von Season-1-Launch bis in die zweite Saison. Ein bewusst kleiner Kern zum Start, danach sichtbares Wachstum über Kapitel-Updates.',
    milestones: [
      {
        phase: 'MVP · Season 1',
        title: 'Der spielbare Kern',
        status: 'launch',
        desc: 'Territorium, Belagerung und Wirtschaft stehen — die Season läuft mit 60 % Umfang an und wächst sichtbar weiter.',
        chips: ['Core', 'Claims / Kernblock', 'Belagerung mit Fenstern', 'Economy', 'Kriegszustände', 'Diplomatie-Basis', 'Chronik', 'Discord-Bot', 'Dynmap'],
      },
      {
        phase: 'Kapitel 2',
        title: 'Nachschub wird Spielinhalt',
        status: 'geplant',
        desc: 'Ressourcen müssen physisch bewegt werden. Wer die Linie kappt, gewinnt die Front ohne Kampf — die Rolle für Nicht-PvP-Spieler.',
        chips: ['Logistik', 'Fracht', 'Konvois', 'Karawanen'],
      },
      {
        phase: 'Kapitel 3',
        title: 'Bedrohungen der Welt',
        status: 'geplant',
        desc: 'Kooperativer Endgame-Content und ein netzwerkweites Ziel, das mehrere Fraktionen zugleich fordert.',
        chips: ['Weltbosse', 'Zitadelle', 'Dungeons T1–2'],
      },
      {
        phase: 'Kapitel 4',
        title: 'Meta & Endzeit',
        status: 'geplant',
        desc: 'Langzeitmotivation und ein dramatischer Season-Ausklang mit schrumpfender Karte und Reliquienschrein.',
        chips: ['BattlePass', 'Saison-Berufe', 'Endzeit-Mechanik'],
      },
      {
        phase: 'Season 2',
        title: 'Die zweite Saison',
        status: 'ausbau',
        desc: 'Alles Gelernte ab Tag 1 — plus neue Systeme und die plünderbaren Ruinen der ersten Season.',
        chips: ['Berufe ab Start', 'Dungeons vollständig', 'Spezialisierungen', 'Erweiterte Diplomatie', 'Ruinen aus S1'],
      },
    ],
  },
  {
    id: 'dev',
    label: 'Dev',
    lede: 'Die technische Bau-Reihenfolge. Der Chronik-Event-Bus steht vor allem anderen; drei Grundsatzentscheidungen fallen vor der ersten Zeile Code. Module in der Reihenfolge, in der sie aufeinander aufbauen.',
    milestones: [
      {
        phase: 'Phase 0 · Fundament',
        title: 'Entscheidungen & Event-Bus',
        status: 'launch',
        desc: 'Drei Grundsatzentscheidungen fallen zuerst — Verteidigungsfenster (ja/nein), Season-Rhythmus, Folia (ja/nein). Dann der zentrale, typisierte Chronik-Bus als Herzstück der Architektur.',
        modules: ['factions-chronicle', 'factions-bridge'],
        note: 'Den Bus von der ersten Zeile an einbauen, nicht nachrüsten: Bei 14 Modulen ist ein nachträglicher Umbau teurer als das ganze Feature-Set. Stack steht fest — Paper + Velocity, Kotlin + Surf-API, MariaDB.',
      },
      {
        phase: 'Phase 1 · MVP',
        title: 'Kern-Module',
        status: 'launch',
        desc: 'Der launchfähige Kern. Alle Module feuern von Anfang an in den Chronik-Bus; Web und Discord sind reine Konsumenten.',
        modules: ['factions-core', 'factions-claims', 'factions-siege', 'factions-economy', 'factions-diplomacy', 'factions-protection', 'factions-discord'],
        note: 'Persistenz durchgängig relational (MariaDB) für Fraktionen, Claims, Verträge, Kontostände. Nicht selbst bauen: Anti-Cheat, Rollback (CoreProtect-Äquivalent), Dynmap.',
      },
      {
        phase: 'Phase 2',
        title: 'Logistik-Layer',
        status: 'geplant',
        desc: 'Fracht als PDC-getaggte Items, physische Transportrouten und unterbrechbare Nachschublinien.',
        modules: ['factions-logistics'],
      },
      {
        phase: 'Phase 3',
        title: 'Welt-Content',
        status: 'geplant',
        desc: 'Event-Scheduler mit „nur ein Event gleichzeitig"-Lock, Boss-Phasen mit schadensbasiertem Loot und instanzierte Dungeons.',
        modules: ['factions-events', 'factions-siege', 'factions-dungeons'],
      },
      {
        phase: 'Phase 4',
        title: 'Progression & Season-Lifecycle',
        status: 'geplant',
        desc: 'BattlePass und Berufe speisen sich aus Chronik-Ereignissen, nie aus reiner Zeit. Season-Lifecycle mit hartem/weichem Reset — die Chronik überlebt jeden Reset.',
        modules: ['factions-progression', 'factions-season'],
      },
      {
        phase: 'Season 2 · Ausbau',
        title: 'Erweiterung',
        status: 'ausbau',
        desc: 'Die verbleibenden Ideen aus dem Katalog: Spezialisierungen, erweiterte Diplomatie, season-übergreifende Systeme.',
        modules: ['übergreifend'],
      },
    ],
  },
];

export const NAVGROUPS: NavGroup[] = [
  {
    "label": "Krieg & Territorium",
    "ids": [
      "belagerung",
      "kriegszustaende",
      "claims",
      "verteidigungsfenster",
      "pvp"
    ]
  },
  {
    "label": "Wirtschaft & Welt",
    "ids": [
      "oekonomie",
      "ressourcen",
      "items",
      "events",
      "bosse",
      "dungeons"
    ]
  },
  {
    "label": "Fraktion & Diplomatie",
    "ids": [
      "diplomatie",
      "onboarding",
      "community",
      "adminevents"
    ]
  },
  {
    "label": "Fortschritt & Meta",
    "ids": [
      "progression",
      "cosmetics",
      "toplisten",
      "chronik",
      "endgame",
      "season",
      "monetarisierung",
      "antipatterns",
      "technik"
    ]
  }
];
