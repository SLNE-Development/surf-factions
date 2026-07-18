'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';
import { NAVGROUPS } from '@/data';
import { systemById } from '@/lib/helpers';
import { GlobalSearch } from './GlobalSearch';

function normalize(path: string): string {
  return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
}

function NavItem({ href, num, label, active }: { href: string; num?: string; label: string; active: boolean }) {
  return (
    <Link href={href} className={`nav__item${active ? ' is-active' : ''}`}>
      <span className="nav__num">{num}</span>
      {label}
    </Link>
  );
}

function SidebarNav({ path }: { path: string }) {
  const is = (href: string) => path === href;
  return (
    <nav className="nav">
      <div className="nav__group">
        <NavItem href="/" num="◆" label="Übersicht" active={is('/')} />
        <NavItem href="/graph" num="◈" label="Lagekarte" active={is('/graph')} />
      </div>

      {NAVGROUPS.map((group) => (
        <div className="nav__group" key={group.label}>
          <div className="nav__label">{group.label}</div>
          {group.ids.map((id) => {
            const s = systemById.get(id);
            if (!s) return null;
            const href = `/system/${id}`;
            return <NavItem key={id} href={href} num={s.nrLabel} label={s.title} active={is(href)} />;
          })}
        </div>
      ))}

      <div className="nav__group">
        <div className="nav__label">Katalog &amp; Plan</div>
        <NavItem href="/ideen" num="50" label="Feature-Ideen" active={path.startsWith('/idee')} />
        <NavItem href="/umsetzung" num="▸" label="Umsetzung" active={is('/umsetzung')} />
        <NavItem href="/fragen" num="?" label="Offene Fragen" active={is('/fragen')} />
      </div>
    </nav>
  );
}

/** Layout-Rahmen: fixe Sidebar, mobile Navigationsleiste, Hauptbereich. */
export function AppShell({ children }: { children: ReactNode }) {
  const path = normalize(usePathname());
  const [open, setOpen] = useState(false);

  // Bei Routenwechsel das mobile Menü schließen.
  useEffect(() => {
    setOpen(false);
  }, [path]);

  return (
    <div className="app">
      <button className={`scrim${open ? ' is-on' : ''}`} onClick={() => setOpen(false)} aria-label="Menü schließen" />

      <aside className={`sidebar${open ? ' is-open' : ''}`}>
        <div className="brand">
          <Link href="/">
            <div className="brand__mark">FRONTEN</div>
            <div className="brand__sub">CastCrafter Factions · Konzept</div>
          </Link>
          <div className="brand__tag">Diskussionsgrundlage v0.4</div>
        </div>
        <div className="sidebar__search">
          <GlobalSearch />
        </div>
        <SidebarNav path={path} />
      </aside>

      <main className="main">
        <div className="mobiletop">
          <button className="mobiletop__b" onClick={() => setOpen(true)} aria-label="Menü öffnen">
            ☰
          </button>
          <div className="mobiletop__t">FRONTEN</div>
        </div>
        {children}
      </main>
    </div>
  );
}
