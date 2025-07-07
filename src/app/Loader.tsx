'use client';
import React from 'react';

/**
 * Премиальный Loader/Spinner для асинхронных операций.
 * Используйте <Loader /> для отображения загрузки.
 */
export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
      <div className="w-16 h-16 border-4 border-premium-accent2 border-t-transparent rounded-full animate-spin" aria-label="Загрузка" role="status"></div>
      <div className="mt-4 text-premium-accent2 font-semibold">Загрузка...</div>
    </div>
  );
}

/*
  Для анимации spin можно добавить в globals.css:
  @keyframes spin { to { transform: rotate(360deg); } }
  .animate-spin { animation: spin 1s linear infinite; }
*/ 