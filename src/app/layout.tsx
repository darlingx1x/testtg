'use client';
import React from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import Header from './Header';
import Footer from './Footer';

const inter = Inter({ subsets: ['cyrillic', 'latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <title>FinMonitor — Премиальный финансовый мониторинг</title>
        <meta name="description" content="Премиальный сервис для учёта доходов и расходов из SMS через Telegram. Современный дашборд, аналитика, безопасность." />
        <meta property="og:title" content="FinMonitor — Премиальный финансовый мониторинг" />
        <meta property="og:description" content="Премиальный сервис для учёта доходов и расходов из SMS через Telegram." />
        <meta property="og:image" content="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className + ' bg-premium min-h-screen'}>
        {/* Премиальный Header */}
        <Header />
        <main>{children}</main>
        {/* Премиальный Footer */}
        <Footer />
      </body>
    </html>
  );
}
