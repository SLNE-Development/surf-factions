import type { Metadata } from 'next';
import '@/app-styles.css';
import { AppShell } from '@/components/AppShell';

export const metadata: Metadata = {
  title: 'FRONTEN — CastCrafter Factions · Konzept-Explorer',
  description:
    'Interaktiver Konzept-Explorer für einen CastCrafter Factions-Server 2026: Kernsysteme, 50 Feature-Ideen, Lagekarte und Umsetzungsplan.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
