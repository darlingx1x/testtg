'use client';
import React from 'react';

/**
 * Премиальный Footer с тёмным фоном, золотым акцентом и минималистичной информацией.
 * Используйте для отображения копирайта, контактов и ссылок.
 */
export default function Footer() {
  return (
    <footer className="bg-premium-light border-t border-premium-border py-6 mt-12 text-center text-premium-accent2 text-sm font-sans">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 px-4">
        <span className="font-display font-bold text-premium-accent">FinMonitor</span>
        <span>© {new Date().getFullYear()} Все права защищены</span>
        <a href="https://t.me/darlinxloginbot" className="hover:underline text-premium-accent2" target="_blank" rel="noopener noreferrer">Telegram Bot</a>
      </div>
    </footer>
  );
} 