'use client';
import React, { useEffect, useState } from 'react';

/**
 * Переключатель темы (тёмная/светлая) с премиальным стилем.
 * Сохраняет выбор пользователя в localStorage.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>(
    typeof window !== 'undefined' && localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
  );

  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      className="px-4 py-2 rounded-xl font-bold bg-premium-surface text-premium-accent2 shadow-card hover:bg-premium-accent2 hover:text-premium-surface transition-all"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Переключить тему"
    >
      {theme === 'dark' ? '🌙 Тёмная' : '☀️ Светлая'}
    </button>
  );
}

/*
  Для поддержки темы в Tailwind добавьте в tailwind.config.js:
  darkMode: 'class',
*/ 