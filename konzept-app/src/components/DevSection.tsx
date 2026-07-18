import { DEV_NOTES } from '@/dev-notes';
import { Blocks, SectionHeading } from './primitives';

/** „Implementierung“-Abschnitt: verantwortliche Module + Bau-Hinweise für Developer. */
export function DevSection({ id }: { id: string }) {
  const dev = DEV_NOTES[id];
  if (!dev) return null;
  return (
    <>
      <SectionHeading marker="DEV" tone="peace">
        Implementierung
      </SectionHeading>
      <div className="devbox">
        <div className="dev-modules">
          {dev.modules.map((m) => (
            <span className="mod" key={m}>
              {m}
            </span>
          ))}
        </div>
        <div className="prose">
          <Blocks blocks={dev.notes} />
        </div>
      </div>
    </>
  );
}
