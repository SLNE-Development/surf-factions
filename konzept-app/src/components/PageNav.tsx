import Link from 'next/link';

interface NavTarget {
  href: string;
  label: string;
  dir: string;
}

/** Vor/Zurück-Navigation am Seitenende. */
export function PageNav({ prev, next }: { prev?: NavTarget; next?: NavTarget }) {
  return (
    <div className="pagenav">
      {prev ? (
        <Link href={prev.href}>
          <span className="dir">{prev.dir}</span>
          {prev.label}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={next.href} className="r">
          <span className="dir">{next.dir}</span>
          {next.label}
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
