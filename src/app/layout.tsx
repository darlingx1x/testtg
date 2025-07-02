import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['cyrillic', 'latin'] });

export const metadata: Metadata = {
  title: 'Финансовый мониторинг',
  description: 'Учёт доходов и расходов из SMS через Telegram',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={inter.className + ' bg-gray-50 min-h-screen'}>
        <header className="bg-white shadow p-4 mb-6">
          <nav className="max-w-3xl mx-auto flex gap-4">
            <a href="/dashboard" className="font-semibold hover:underline">Дашборд</a>
            <a href="/admin?secret=" className="hover:underline">Админка</a>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
