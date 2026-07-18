'use client';

import { useMemo, useState } from 'react';
import { IDEAS, type Tag } from '@/data';
import { plain } from '@/lib/helpers';
import { IdeaCard } from './Cards';

const TAG_LIST: Tag[] = ['LZ', 'PVP', 'TP', 'WW', 'EM'];

/** Durchsuch- und filterbarer Katalog aller 50 Feature-Ideen. */
export function IdeaCatalog() {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<Tag[]>([]);

  const toggle = (t: Tag) => setActive((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));

  const list = useMemo(() => {
    const q = query.toLowerCase().trim();
    return IDEAS.filter((it) => {
      if (active.length && !active.every((t) => (it.tags ?? []).includes(t))) return false;
      if (q) {
        const blob = `${it.title} ${it.cat} ${plain(it.was)} ${plain(it.wie)}`.toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    });
  }, [query, active]);

  return (
    <>
      <div className="filter">
        <input
          className="filter__search"
          placeholder="Ideen durchsuchen …"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {TAG_LIST.map((t) => (
          <button key={t} className={`toggle${active.includes(t) ? ' is-on' : ''}`} data-c={t} onClick={() => toggle(t)}>
            {t}
          </button>
        ))}
        <span className="filter__count">{list.length} / 50</span>
      </div>

      <div className="grid">
        {list.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </div>
    </>
  );
}
