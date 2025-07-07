'use client';
import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from './Header';

const inter = Inter({ subsets: ['cyrillic', 'latin'] });

export const metadata: Metadata = {
  title: 'Финансовый мониторинг',
  description: 'Учёт доходов и расходов из SMS через Telegram',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={inter.className + ' bg-premium min-h-screen'}>
        {/* Премиальный Header */}
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
