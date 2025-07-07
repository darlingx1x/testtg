'use client';
import React, { useEffect, useState } from 'react';

/**
 * Премиальный Header с кастомным стилем, логотипом и навигацией.
 * Использует кастомные цвета, шрифты и плавные эффекты.
 */
export default function Header() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('tgUser');
      if (data) setUser(JSON.parse(data));
    }
  }, []);

  return (
    <header className="bg-premium-light shadow-premium p-6 mb-8 rounded-b-2xl flex items-center justify-between max-w-5xl mx-auto">
      {/* Логотип и название */}
      <div className="flex items-center gap-3">
        <span className="text-premium-accent text-3xl font-display font-bold tracking-tight" role="img" aria-label="Логотип">💎</span>
        <span className="text-white text-2xl font-display font-bold tracking-tight">FinMonitor</span>
      </div>
      {/* Навигация */}
      <nav className="flex gap-6 items-center">
        <a href="/dashboard" className="text-premium-accent2 font-semibold hover:underline transition-colors">Дашборд</a>
        <a href="/profile" className="text-premium-accent2 font-semibold hover:underline transition-colors">Профиль</a>
        {user?.username === 'senpaisenpai' && (
          <a href="/admin?secret=1" className="text-white hover:text-premium-accent2 transition-colors">Админка</a>
        )}
      </nav>
    </header>
  );
} 