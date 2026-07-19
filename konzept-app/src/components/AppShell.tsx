'use client';

import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';
import {type ReactNode, useEffect, useState} from 'react';
import {NAVGROUPS} from '@/data';
import {systemById} from '@/lib/helpers';
import {GlobalSearch} from './GlobalSearch';

function normalize(path: string): string {
    return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
}

function LogoutButton() {
    const router = useRouter();
    const [busy, setBusy] = useState(false);

    async function logout() {
        setBusy(true);
        await fetch('/api/auth/logout', {method: 'POST'}).catch(() => {
        });
        router.replace('/login');
        router.refresh();
    }

    return (
        <button className="brand__logout" onClick={logout} disabled={busy}>
            {busy ? 'Abmelden …' : 'Abmelden'}
        </button>
    );
}

function NavItem({href, num, label, active}: { href: string; num?: string; label: string; active: boolean }) {
    return (
        <Link href={href} className={`nav__item${active ? ' is-active' : ''}`}>
            <span className="nav__num">{num}</span>
            {label}
        </Link>
    );
}

function SidebarNav({path}: { path: string }) {
    const is = (href: string) => path === href;
    const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

    useEffect(() => {
        try {
            const raw = localStorage.getItem('nav-collapsed');
            if (raw) setCollapsed(JSON.parse(raw) as Record<string, boolean>);
        } catch {
        }
    }, []);

    const toggle = (label: string) =>
        setCollapsed((c) => {
            const next = {...c, [label]: !c[label]};
            try {
                localStorage.setItem('nav-collapsed', JSON.stringify(next));
            } catch {
            }
            return next;
        });

    const group = (label: string, items: ReactNode) => {
        const isCollapsed = !!collapsed[label];
        return (
            <div className="nav__group" key={label}>
                <button
                    className={`nav__label${isCollapsed ? ' is-collapsed' : ''}`}
                    onClick={() => toggle(label)}
                    aria-expanded={!isCollapsed}
                >
          <span className="nav__caret" aria-hidden>
            ▾
          </span>
                    <span className="nav__label-text">{label}</span>
                </button>
                <div className="nav__items" data-collapsed={isCollapsed ? 'true' : undefined}>
                    <div className="nav__items-inner">{items}</div>
                </div>
            </div>
        );
    };

    return (
        <nav className="nav">
            <div className="nav__group">
                <NavItem href="/" num="◆" label="Übersicht" active={is('/')}/>
                <NavItem href="/graph" num="◈" label="Lagekarte" active={is('/graph')}/>
            </div>

            {NAVGROUPS.map((g) =>
                group(
                    g.label,
                    g.ids.map((id) => {
                        const s = systemById.get(id);
                        if (!s) return null;
                        const href = `/system/${id}`;
                        return <NavItem key={id} href={href} num={s.nrLabel} label={s.title} active={is(href)}/>;
                    }),
                ),
            )}

            {group(
                'Katalog & Plan',
                <>
                    <NavItem href="/ideen" num="50" label="Feature-Ideen" active={path.startsWith('/idee')}/>
                    <NavItem href="/roadmap" num="⌖" label="Roadmap" active={is('/roadmap')}/>
                    <NavItem href="/umsetzung" num="▸" label="Umsetzung" active={is('/umsetzung')}/>
                    <NavItem href="/fragen" num="?" label="Offene Fragen" active={is('/fragen')}/>
                </>,
            )}
        </nav>
    );
}

/** Layout-Rahmen: fixe Sidebar, mobile Navigationsleiste, Hauptbereich. */
export function AppShell({children}: { children: ReactNode }) {
    const path = normalize(usePathname());
    const [open, setOpen] = useState(false);

    // Bei Routenwechsel das mobile Menü schließen.
    useEffect(() => {
        setOpen(false);
    }, [path]);

    // Die Login-Seite läuft ohne App-Rahmen (kein Sidebar/Suche).
    if (path === '/login') {
        return <>{children}</>;
    }

    return (
        <div className="app">
            <button className={`scrim${open ? ' is-on' : ''}`} onClick={() => setOpen(false)}
                    aria-label="Menü schließen"/>

            <aside className={`sidebar${open ? ' is-open' : ''}`}>
                <div className="brand">
                    <Link href="/">
                        <div className="brand__mark">FRONTEN</div>
                        <div className="brand__sub">CastCrafter Factions · Konzept</div>
                    </Link>
                    <div className="brand__tag">Diskussionsgrundlage v0.4</div>
                    <LogoutButton/>
                </div>
                <div className="sidebar__search">
                    <GlobalSearch/>
                </div>
                <SidebarNav path={path}/>
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
