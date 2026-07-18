import type { Block } from './data';

/**
 * Implementierungshinweise pro Feature — für Developer, die an dem jeweiligen System arbeiten.
 * `modules`: verantwortliche Gradle-Module. `notes`: konkrete Bau-Hinweise (Domain-Objekte,
 * Events auf den Chronik-Bus, Persistenz, Threading/Folia, Modul-Abhängigkeiten).
 */
export interface DevNote {
  modules: string[];
  notes: Block[];
}

export const DEV_NOTES: Record<string, DevNote> = {
  // ---------------- KERNSYSTEME ----------------
  belagerung: {
    modules: ['factions-siege'],
    notes: [
      { ul: [
        '<b>SiegeScheduler:</b> DB-persistente Termine (MariaDB), <b>nicht</b> In-Memory — muss Neustarts und Sommerzeit/Zeitzonen überstehen und mit dem Discord-Bot synchron bleiben.',
        '<b>Siege-State-Machine:</b> <span class="k">Declared → Scheduled → Active → Resolved</span>. Kontrollpunkte als Welt-Marker mit PDC-Tag; Objective-Ticking auf dem Region-Thread (Folia), keine blockierenden Calls.',
        '<b>Events:</b> <span class="k">SiegeDeclaredEvent</span>, <span class="k">SiegeStartedEvent</span>, <span class="k">SiegeResolvedEvent</span> in den Chronik-Bus feuern — Web/Discord konsumieren nur.',
        '<b>Beute:</b> fester Prozentsatz aus dem Fraktionslager transferieren (Transaktion über factions-economy), Privatkisten nie anfassen.',
      ] },
      { callout: 'Abhängigkeiten: factions-claims (Ziel-Chunk & Kernblock), factions-economy (Mandat-Kosten/Beute), factions-diplomacy (Kriegszustand als Gate), factions-protection (temporäres Blockabbau-Fenster).', tone: 'peace', l: 'Cross-Modul' },
    ],
  },
  kriegszustaende: {
    modules: ['factions-diplomacy'],
    notes: [{ ul: [
      '<b>RelationState-Enum</b> (Pakt/Neutral/Krieg) pro Fraktionspaar relational persistieren; ist die Wahrheitsquelle für alle Schadens-Checks.',
      '<b>Damage-Listener:</b> ersten gezielten Treffer canceln + Title/Sound (MiniMessage) nur an den Angreifer; Flächenschaden (Crystal/TNT) zwischen Paktpartnern <b>immer stumm</b> verwerfen.',
      '<b>Bruch-Zähler</b> mit 10-min-Verfall (PDC am Spieler oder in-memory + Persistenz); 24-h-Positionierungsfenster des Anführers als geplanter DB-Task.',
      '<b>Events:</b> <span class="k">ContractBreachWarned</span> (nur Angreifer), <span class="k">ContractBroken</span> (Chronik + Anführer-Ping).',
    ] }],
  },
  claims: {
    modules: ['factions-claims'],
    notes: [{ ul: [
      '<b>Claim-Store</b> chunk-basiert, relational. Kernblock als Block mit PDC-Tag; Adjazenz-Validierung erzwingen (keine Exklaven).',
      '<b>Kapazität</b> = f(Mandat, Kernblock-Stufe), <b>nicht</b> Mitgliederzahl. Unterhalt als geplanter Tick, der Mandat abbucht (überproportional ab Chunk 20).',
      '<b>Reifezeit</b> 48 h (kein Ertrag, nicht belagerbar) und <b>Heimat-Immunität</b> (Kernblock + 8) als Flags am Claim.',
      'Grenz-Partikel bei Annäherung async über PacketEvents rendern — nie synchron pro Tick für alle Spieler.',
    ] }],
  },
  verteidigungsfenster: {
    modules: ['factions-siege', 'factions-protection'],
    notes: [{ ul: [
      '<b>DefenseWindow</b>-Entity (2×2 h/Woche) mit 7-Tage-Änderungssperre; öffentlich lesbar (Web/Discord/<span class="k">/f info</span>).',
      'Außerhalb der Fenster hartes Protection-Gate: Blockabbau, Container, TNT, Feuer, Fluids, Piston, Enderpearl-Glitch alle blockieren.',
      '<b>Mindestens-2-Verteidiger-Check</b> zum Termin; sonst Verschiebung (max. 2×), dann kampfloser Fall. Rollback über CoreProtect-Äquivalent (extern, nicht selbst bauen).',
    ] }],
  },
  pvp: {
    modules: ['factions-core', 'factions-logistics'],
    notes: [{ ul: [
      'Vanilla-Combat lassen. <b>Combat-Tag (30 s)</b> über Damage-Listener; Logout im Tag → NPC bleibt stehen und ist tötbar (Quit-Handler + kurzer NPC).',
      '<b>Fracht-Item</b> PDC-getaggt: blockiert Slots, sichtbar (Partikel/Karten-Icon), <b>enderchest-blockiert</b> über Inventory-Move-Listener + PacketEvents.',
      'Duelle/Turniere laufen auf dem Event-Server (Stufe 1) — kein Bestandteil des Factions-Plugins in Season 1.',
    ] }],
  },
  oekonomie: {
    modules: ['factions-economy'],
    notes: [{ ul: [
      'Zwei getrennte Ledger: <b>CastCoins</b> (Spieler, handelbar, Konto-Cap) und <b>Mandat</b> (Fraktion, nicht handelbar, ~5 %/Tag Decay via Scheduler).',
      '<b>PayCheck</b>-Akkumulation über AFK-sicheren Aktivitäts-Tracker (Bewegung/Interaktion, keine AFK-Pools).',
      'Alle Buchungen transaktional und relational — keine YAML-Persistenz für Kontostände. Fraktionskasse mit eigenem, höherem Cap.',
    ] }],
  },
  ressourcen: {
    modules: ['factions-core', 'factions-events', 'factions-logistics'],
    notes: [{ ul: [
      'Custom-Ressourcen als PDC-getaggte Items; regionsgebundene Generierung über eine Region→Ressource-Map.',
      'Adern (Blutstein) endlich mit langsamem Respawn-Task; Sternenerz nur aus Meteoriten-Events. <b>Mandat-Kristall → Mandat</b>-Konvertierung ruft factions-economy.',
      'Villager deaktiviert; Totems/Mending über Fishing (bestehende Survival-Logik übernehmen).',
    ] }],
  },
  items: {
    modules: ['factions-core'],
    notes: [{ ul: [
      'Taktische Items über PDC + Right-Click-Handler (Bannerstab, Rauchbombe, Anker, Signalhorn, Enterhaken) — Möglichkeiten, keine Stat-Erhöhung.',
      'Rezepte hinter Werkstattplänen gaten. Einziger „Stat“-Gegenstand: verstärkte Baumaterialien (höhere Belagerungs-HP, nur in Belagerung relevant).',
    ] }],
  },
  events: {
    modules: ['factions-events'],
    notes: [{ ul: [
      '<b>Event-Scheduler</b> mit „nur ein Event gleichzeitig“-Lock; Zeitplan DB-persistent, Tasks region-basiert (Folia).',
      'Meteorit (Krater-Spawn), Karawane (NPC-Pathing), Rift (Instanz, max. 20), Zoll (PvP-Toggle-Region), Sturmfront (Debuff-Zone) als je eigene Event-Implementierung eines gemeinsamen <span class="k">ScheduledEvent</span>-Interfaces.',
    ] }],
  },
  bosse: {
    modules: ['factions-events', 'factions-siege'],
    notes: [{ ul: [
      'Boss-Entity mit Phasen (wechselnde Schadensarten); <b>Loot nach Schadensanteil</b> über einen Damage-Tracker pro Spieler/Fraktion.',
      'Belagerungsgolem im factions-siege-Kontext (erwacht nur während Belagerung). Season-Boss-HP so skaliert, dass 3+ Fraktionen nötig sind.',
      'Kein Loot über Vanilla-Niveau — nur Mandat-Kristalle, Bannerstäbe, Cosmetics, Rezepte.',
    ] }],
  },
  dungeons: {
    modules: ['factions-dungeons'],
    notes: [{ ul: [
      'Prozedurale Zusammensetzung aus handgebauten Raum-Modulen (Schematics); Instanz-Manager mit Lifecycle und Cleanup.',
      'Per-Spieler-Lockouts (z. B. 3 Läufe/Tag für Loot), wöchentlich rotierendes Tier-3-Layout mit Bestzeiten-Leaderboard. Kein Gear-Loot.',
    ] }],
  },
  progression: {
    modules: ['factions-progression'],
    notes: [{ ul: [
      'Getrennte Rang-Achsen; Daily/Weekly-Pool mit <b>Rollover</b> (max. 3 Tage Stau). BattlePass kostenlos, 50 Stufen, Wochen-Cap.',
      'Fortschritt speist sich aus Chronik-Ereignissen (Bus-Konsument), nie aus reiner Zeit. Fraktions-Pass parallel zum Spieler-Pass.',
    ] }],
  },
  cosmetics: {
    modules: ['factions-progression', 'factions-web'],
    notes: [{ ul: [
      'Wappen-Builder auf Banner-Muster-Logik; erscheint auf Dynmap, Strukturen, Discord, Chronik. Trims/Partikel/Titel rein optisch.',
      'Trophäen als platzierbare Blöcke; Season-Rückblick-Karte serverseitig generieren (Bild + Item).',
    ] }],
  },
  chronik: {
    modules: ['factions-chronicle', 'factions-bridge'],
    notes: [
      { ul: [
        '<b>Das Herzstück der Architektur.</b> Zentraler typisierter Event-Bus: alle Module feuern <span class="k">ChronicleEvent</span>-Subtypen, factions-chronicle konsumiert und persistiert relational.',
        'Web und Discord sind <b>reine Konsumenten</b> — keine Direktzugriffe auf andere Module.',
      ] },
      { callout: 'Diesen Bus von der ersten Zeile an einbauen, nicht nachrüsten. Bei 14 Modulen ist ein nachträglicher Umbau teuer.', tone: 'war', l: 'Reihenfolge' },
    ],
  },
  toplisten: {
    modules: ['factions-progression', 'factions-web'],
    notes: [{ ul: [
      'Aggregierte Ranglisten aus Chronik-/Economy-Daten; <b>rollierende</b> Wochen-/Kapitel-Listen mit Reset.',
      'Kopfgeld-Liste selbstregulierend. Kills nie als Headline-Liste — höchstens Sub-Statistik.',
    ] }],
  },
  diplomatie: {
    modules: ['factions-diplomacy'],
    notes: [{ ul: [
      '<b>Pact</b> als signiertes Objekt (beide Anführer) mit Laufzeit/Kündigungsfrist; Beziehungsstufen Krieg→Föderation.',
      'Föderation: +15 % Mandat-Unterhalt je zusätzlicher Fraktion (economy). Kriegserklärung mit Kriegsziel + Auto-Ende. Söldnerverträge und Ansehen hier verwalten.',
    ] }],
  },
  onboarding: {
    modules: ['factions-core', 'factions-protection'],
    notes: [{ ul: [
      '72-h-Neulingsschutz an <b>aktiver</b> Spielzeit messen (nicht Wall-Clock); nicht abschaltbar. Söldner-Status für Solisten.',
      'Friedenszonen-Parzellen = Portierung des bestehenden Redstone-Fackel-Protection-Systems (bis zu 8 Ecken).',
    ] }],
  },
  community: {
    modules: ['factions-web', 'factions-discord'],
    notes: [{ ul: [
      'Discord-Bridge in beide Richtungen: Fraktionskanäle/Rollen automatisch anlegen & syncen, Chronik-Feed, Belagerungs-Pings.',
      'Fraktions-Profilseiten, Spectator-Ring, Museum und Rückblick-Karten aus Chronik-Daten rendern.',
    ] }],
  },
  adminevents: {
    modules: ['factions-events', 'factions-core'],
    notes: [{ ul: [
      'Framework für team-gesteuerte Events (NPC-Fraktion, Warlord, Turniere) — das Team spielt Rollen/baut Kulissen, greift nie schiedsrichternd ein.',
      'Wiederverwendet Event-Server-Infrastruktur für Turniere; keine neue Server-Instanz nötig.',
    ] }],
  },
  endgame: {
    modules: ['factions-siege', 'factions-events'],
    notes: [{ ul: [
      'Machtprojektion = kapitelabhängige Skalierung von Belagerungskosten/Fensterlänge (Konfig pro Season-Phase).',
      '<b>Zitadelle:</b> Spezial-Claim, alle 3 Tage belagerbar unabhängig von Fenstern; netzwerkweite Sichtbarkeit über bridge/web.',
    ] }],
  },
  season: {
    modules: ['factions-core', 'factions-chronicle'],
    notes: [{ ul: [
      'Season-Lifecycle mit hartem/weichem Reset (klar definieren, was persistiert: Chronik, Titel, Cosmetics, Legacy-Ränge).',
      '<b>Endzeit:</b> schrittweise schrumpfende Karte (world-border-artig, geplant). Reliquienschrein → Chronik/Museum. Chronik überlebt jeden Reset.',
    ] }],
  },
  monetarisierung: {
    modules: ['factions-core'],
    notes: [{ ul: [
      'Nur kosmetisch/QoL (Tebex-Anbindung bestehend). Kritische Gates: mobile Enderchest im Kriegsgebiet deaktivieren, Rabatte nur auf Friedenszonen, kompetitive Events vom Priority-Zugang ausnehmen.',
      'Jeder Kaufartikel muss den P2W-Test bestehen — als Code-Review-Guardrail behandeln.',
    ] }],
  },
  antipatterns: {
    modules: ['übergreifend'],
    notes: [{ ul: [
      'Kein eigenes Modul, sondern <b>Guardrails</b>: die 20 Ausschlüsse als Review-Checkliste und, wo sinnvoll, als Config-Flags/Feature-Toggles absichern.',
      'Besonders relevant für PRs in economy (kein Shop/Sell), core (kein Fly/TP, kein Übervanilla-Gear) und progression (keine Kill-Headline-Listen).',
    ] }],
  },
  technik: {
    modules: ['alle Module'],
    notes: [
      { ul: [
        'Stack: Paper (Backends) + Velocity (Proxy), <b>Kotlin</b> + Surf-API. Commands über die CommandAPI-Kotlin-DSL, Texte durchgängig MiniMessage.',
        '<b>Folia-Frage vor der ersten Zeile Code entscheiden:</b> bei 200+ Spielern <span class="k">foliaSupported(true)</span> → keine blockierenden Ops auf Region-Threads, alle Tasks über MCCoroutine, region-basiertes Scheduling durchgängig.',
        'Persistenz relational (MariaDB) für Fraktionen/Claims/Verträge/Chronik/Progression. Chronik-Event-Bus zuerst.',
      ] },
      { callout: 'Nicht selbst bauen: Anti-Cheat, Logging/Rollback (CoreProtect-Äquivalent), Dynmap. Gelöste Probleme — Entwicklungszeit gehört in die einzigartigen Systeme.', tone: 'peace', l: 'Build vs. Buy' },
    ],
  },

  // ---------------- 50 IDEEN ----------------
  'idee-1': { modules: ['factions-siege', 'factions-diplomacy'], notes: [{ ul: ['Kriegsziel-Objekt an die Belagerungsansage hängen; Kapitulations-Flow, der das Ziel erfüllt und Kampf überspringt — beides in die Chronik.'] }] },
  'idee-2': { modules: ['factions-siege', 'factions-web'], notes: [{ ul: ['Belagerungs-Events (Kontrollpunkt-Timeline, Kills, Positionen) mitschneiden und als Bericht rendern; als Item in der Base platzierbar.'] }] },
  'idee-3': { modules: ['factions-siege'], notes: [{ ul: ['Um jede aktive Belagerung automatisch eine Ring-Region; Zuschauer im Adventure-Mode + Übersichts-HUD, kein Eingriff.'] }] },
  'idee-4': { modules: ['factions-claims', 'factions-diplomacy'], notes: [{ ul: ['Grenz-Chunks zu Kriegs-Nachbarn als Frontline flaggen: höhere Erträge, offenes PvP, keine Nahrungsregeneration; auf der Karte rot.'] }] },
  'idee-5': { modules: ['factions-siege'], notes: [{ ul: ['Einmaliger Waffenstillstand-Aufruf pausiert den Siege-Timer bei beidseitiger Zustimmung; offener Chat-Kanal für die Verhandlung.'] }] },
  'idee-6': { modules: ['factions-diplomacy', 'factions-web'], notes: [{ ul: ['Öffentliches Söldner-Board (Spiel + Web); Vertrag + Auto-Auszahlung aus der Fraktionskasse bei nachgewiesener Teilnahme.'] }] },
  'idee-7': { modules: ['factions-siege'], notes: [{ ul: ['Rammbock/Turm/Katapult als Multi-Block-Strukturen, vor Ort aufgebaut (mehrere Spieler, Zeit), zerstörbar — Ersatz für die Cannon-Meta.'] }] },
  'idee-8': { modules: ['factions-siege'], notes: [{ ul: ['Tore/Mauern mit HP-Leiste, die nur während der Belagerung sinkt und danach regeneriert — Base bleibt physisch heil. Keine Blockdurchdringung.'] }] },
  'idee-9': { modules: ['factions-siege', 'factions-economy'], notes: [{ ul: ['War-Weariness-Zähler pro Fraktion: hebt Mandat-Kosten, senkt Erträge, baut sich in Friedenszeiten ab.'] }] },
  'idee-10': { modules: ['factions-siege'], notes: [{ ul: ['Fahnen-Item als mobiler Respawn-Punkt für Verbündete im Umkreis; Träger langsam/sichtbar/nicht angriffsfähig, Fahne fällt mit ihm.'] }] },
  'idee-11': { modules: ['factions-logistics', 'factions-economy'], notes: [{ ul: ['Vollständigkeitsprüfung einer physisch gebauten Straße/Bahn zwischen zwei Territorien; passives Einkommen, in der Wildnis unterbrechbar.'] }] },
  'idee-12': { modules: ['factions-economy', 'factions-web'], notes: [{ ul: ['Öffentlicher Preisindex aus tatsächlichen Spielerhandelsdaten der letzten 7 Tage — nur Transparenz, keine Server-Preisfestsetzung.'] }] },
  'idee-13': { modules: ['factions-logistics'], notes: [{ ul: ['TTL (~45 min Realzeit) auf bestimmte Frachtgüter (Timestamp im PDC); Verfall erzwingt spontane Konvois.'] }] },
  'idee-14': { modules: ['factions-logistics'], notes: [{ ul: ['Fraktionswerkstatt als Multi-Block, das mehrere Spieler gleichzeitig bedienen; zeitgesteuerte Produktion, natürliches Angriffsziel.'] }] },
  'idee-15': { modules: ['factions-core', 'factions-progression'], notes: [{ ul: ['Pro Kapitel eine von sechs Fraktions-Spezialisierungen mit Buffs/Mali; komplementäre Paare erzeugen natürliche Allianzen.'] }] },
  'idee-16': { modules: ['factions-economy', 'factions-events'], notes: [{ ul: ['Rotierender geheimer Ort, nur über Kartenfragmente auffindbar; Handel ohne Fraktionsprüfung, PvP an.'] }] },
  'idee-17': { modules: ['factions-diplomacy', 'factions-economy'], notes: [{ ul: ['Kreditvertrag (Betrag/Laufzeit/Zins); Zahlungsausfall → automatischer Chronik-Eintrag + kostenloser Belagerungsanspruch.'] }] },
  'idee-18': { modules: ['factions-diplomacy'], notes: [{ ul: ['Vertragstyp mit periodischer Auto-Überweisung (Scheduler) — Vasallentum als Systemzustand.'] }] },
  'idee-19': { modules: ['factions-core', 'factions-claims'], notes: [{ ul: ['Endliche Adern pro Chunk mit langsamem Respawn über Tage; macht die Karte über die Season dynamisch.'] }] },
  'idee-20': { modules: ['factions-logistics'], notes: [{ ul: ['Optionaler öffentlicher Frachtbrief: Route wird angekündigt, Belohnung verdoppelt — freiwilliges Risiko.'] }] },
  'idee-21': { modules: ['factions-endgame (siege)', 'factions-events'], notes: [{ ul: ['Zitadelle alle 14 Tage an neuen, 48 h vorher angekündigten Ort verschieben; erzwingt Wettrennen.'] }] },
  'idee-22': { modules: ['factions-core'], notes: [{ ul: ['Regionale Umwelt-Effekte (Kälteschaden, Wasserverbrauch, Slow) über einen periodischen Regions-Effekt-Tick.'] }] },
  'idee-23': { modules: ['factions-web', 'factions-chronicle'], notes: [{ ul: ['Ungekartete Regionen; Erst-Betreten feuert einen Discovery-Event → Chronik + Dynmap-Freischaltung. Billiger Anfangs-Content.'] }] },
  'idee-24': { modules: ['factions-claims'], notes: [{ ul: ['Claims über physisch platzierte, nur während Belagerungen zerstörbare Grenzsteine — Weiterführung des Redstone-Fackel-Systems.'] }] },
  'idee-25': { modules: ['factions-logistics', 'factions-protection'], notes: [{ ul: ['Nether-Highways erlaubt; Portale in fremdem Territorium blockiert, Highways in der Wildnis zerstörbar.'] }] },
  'idee-26': { modules: ['factions-claims'], notes: [{ ul: ['Unsichtbare Chunk-Eigenschaften (Erzdichte/Fruchtbarkeit), mit Werkzeug messbar — Aufklärungsrolle vor der Landnahme.'] }] },
  'idee-27': { modules: ['factions-season (core)', 'factions-chronicle'], notes: [{ ul: ['Schematic-Export echter Basen am Season-Ende; im Folgeseason als plünderbare Ruinen mit Erbauer-Namen generieren.'] }] },
  'idee-28': { modules: ['factions-claims'], notes: [{ ul: ['Optischer Verfall (Moos/Ranken/Risse) inaktiver Chunks als Signal vor der Freigabe.'] }] },
  'idee-29': { modules: ['factions-endgame (siege)'], notes: [{ ul: ['Prestige-Bauwerk, das Fraktionsmitglieder im 500-Block-Radius auf der Karte sichtbar macht — Information, kein Kampfvorteil.'] }] },
  'idee-30': { modules: ['factions-events'], notes: [{ ul: ['72 h vorher angekündigte, regionsverändernde Katastrophe; Fraktion entscheidet evakuieren/verstärken/aufgeben.'] }] },
  'idee-31': { modules: ['factions-claims', 'factions-progression'], notes: [{ ul: ['Claim-Kapazität an besetzte Rollen koppeln (Quartiermeister/Diplomat/Baumeister/Späher) — macht Nicht-Kämpfer strukturell nötig.'] }] },
  'idee-32': { modules: ['factions-diplomacy', 'factions-core'], notes: [{ ul: ['Optionale bindende Fraktionsabstimmung für Kriegserklärung/Vertrag/Kernblock-Verlegung; Ergebnis in die Chronik, kleiner Mandat-Bonus.'] }] },
  'idee-33': { modules: ['factions-progression', 'factions-onboarding (core)'], notes: [{ ul: ['Mentor-Lehrling-Beziehung; beide bekommen Fortschritt bei Lehrling-Meilensteinen, Mentor-Titel + Chronik-Einträge.'] }] },
  'idee-34': { modules: ['factions-core', 'factions-progression'], notes: [{ ul: ['Beitritts-Eid mit selbstgewählter Mindestdauer; vorzeitiger Austritt kostet Ansehen; längere Eide → mehr Fraktions-Mandat.'] }] },
  'idee-35': { modules: ['factions-core'], notes: [{ ul: ['Offizielle Fraktions-Spaltung: Offizier gründet Tochterfraktion, nimmt Anhänger + Teil des Territoriums; Beziehung frei wählbar.'] }] },
  'idee-36': { modules: ['factions-core'], notes: [{ ul: ['Auto-Nachfolge bei 14 Tage inaktivem Anführer (höchste Beitragsleistung) nach 48-h-Vorwarnung.'] }] },
  'idee-37': { modules: ['factions-web', 'factions-chronicle'], notes: [{ ul: ['Permanente, season-übergreifende Fraktionsbiografie; gleicher Name erbt die Chronik. Einziger erlaubter Cross-Season-Übertrag.'] }] },
  'idee-38': { modules: ['factions-protection', 'factions-claims'], notes: [{ ul: ['Per-Spieler-Gastrecht: Betreten/Bauen in definiertem Bereich, kein Lagerzugriff.'] }] },
  'idee-39': { modules: ['factions-diplomacy'], notes: [{ ul: ['Member-Vertragsbruch → fraktionsweiter Ansehensverlust; interner sozialer Druck statt Moderationsaufwand.'] }] },
  'idee-40': { modules: ['factions-diplomacy', 'factions-protection'], notes: [{ ul: ['Geisel/Bürgen-Austausch mit Gastrecht für die Vertragslaufzeit; Bruch → Bürge verliert Ausrüstung, Fraktion massiv Ansehen.'] }] },
  'idee-41': { modules: ['factions-chronicle', 'factions-progression'], notes: [{ ul: ['Persönlicher Score aus der Häufigkeit bedeutsamer Chronik-Einträge — nicht farmbar, weil an gemeinsame Ereignisse gebunden.'] }] },
  'idee-42': { modules: ['factions-progression'], notes: [{ ul: ['Kein Spieler-Level; stattdessen dutzende Meisterschaften mit je 5 Stufen, Titel + Cosmetic, keine Werte.'] }] },
  'idee-43': { modules: ['factions-chronicle'], notes: [{ ul: ['Auto-Nachruf-Eintrag bei dauerhaftem Verlassen/Auflösung mit den wichtigsten Momenten.'] }] },
  'idee-44': { modules: ['factions-progression'], notes: [{ ul: ['Rückkehrer (14+ Tage weg): Zusammenfassung, gedeckelte alte Dailies, 48 h doppelter BattlePass-Fortschritt. Kein P2W.'] }] },
  'idee-45': { modules: ['factions-progression', 'factions-chronicle'], notes: [{ ul: ['Auto-Erkennung des häufigsten Gegners aus Kampfdaten; persönliche Bilanz + „Erzfeind der Season“ in der Rückblick-Karte.'] }] },
  'idee-46': { modules: ['factions-progression', 'factions-core'], notes: [{ ul: ['Season-Beruf (1 von 8) mit exklusiven Nicht-Kampf-Fähigkeiten; pro Season nur einer — stärkster Wiederspielwert-Hebel.'] }] },
  'idee-47': { modules: ['factions-economy', 'factions-web'], notes: [{ ul: ['Spieler-geschriebene öffentliche Aufträge mit hinterlegten CastCoins; Auto-Auszahlung bei Erfüllung.'] }] },
  'idee-48': { modules: ['factions-diplomacy'], notes: [{ ul: ['Ansehen-Wert pro Fraktion aus gehaltenen Verträgen/fairen Kapitulationen/geschützten Neulingen; senkt Vertragskosten, erhöht Söldner-Verfügbarkeit.'] }] },
  'idee-49': { modules: ['factions-chronicle'], notes: [{ ul: ['Geheime, nicht angekündigte Rekorde, erst am Season-Ende enthüllt — nicht bespielbar, nur beiläufig gewinnbar.'] }] },
  'idee-50': { modules: ['factions-chronicle', 'factions-web'], notes: [{ ul: ['Season-Start-Nachricht, am Season-Ende automatisch neben den echten Statistiken veröffentlicht. Zwei DB-Spalten.'] }] },
};
