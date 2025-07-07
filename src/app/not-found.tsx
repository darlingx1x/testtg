'use client';
import React from 'react';
import Card from './Card';
import Button from './Button';
import { useRouter } from 'next/navigation';

/**
 * Премиальная страница 404 (Not Found) с фирменным стилем и кнопкой возврата.
 */
export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <Card className="flex flex-col items-center gap-6 max-w-md w-full animate-fade-in">
        <div className="text-7xl font-display font-bold text-premium-accent animate-bounce">404</div>
        <div className="text-xl text-premium-accent2 mb-2">Страница не найдена</div>
        <div className="text-premium-accent2 text-center">Возможно, вы ошиблись адресом или страница была удалена.</div>
        <Button className="mt-4" onClick={() => router.replace('/')}>На главную</Button>
      </Card>
    </div>
  );
}

/*
  Для анимации fade-in можно добавить в globals.css:
  @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
  .animate-fade-in { animation: fade-in 0.7s ease; }
*/ 