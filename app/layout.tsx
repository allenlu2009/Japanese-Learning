import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/layout/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Japanese Learning Tracker',
  description: 'Track your Japanese language learning progress across reading, listening, writing, and speaking',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Identity Services */}
        <script src="https://accounts.google.com/gsi/client" async defer></script>
      </head>
      <body className={inter.className}>
        <Navigation />
        <main className="container-custom py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
