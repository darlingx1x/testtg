'use client';
import React from 'react';

/**
 * Премиальная карточка для отображения информации, статистики, графиков и т.д.
 * Использует глубокие тени, плавные переходы и скругления.
 *
 * Пример:
 * <Card>Контент</Card>
 */
export default function Card({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={
        'bg-premium-light rounded-2xl shadow-card p-6 transition-all duration-200 hover:shadow-premium ' +
        className
      }
      {...props}
    >
      {children}
    </div>
  );
} 