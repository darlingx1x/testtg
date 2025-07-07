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
