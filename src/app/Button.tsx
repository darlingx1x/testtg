'use client';
import React from 'react';

/**
 * Премиальная кнопка с градиентом, тенью и плавной анимацией.
 * Используйте для всех действий на сайте.
 *
 * Пример:
 * <Button onClick={...}>Текст</Button>
 */
export default function Button({ children, className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={
        'px-6 py-2 rounded-xl font-bold text-lg bg-gradient-to-r from-premium-accent2 to-premium-accent shadow-card text-white hover:from-premium-accent hover:to-premium-accent2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-premium-accent2 ' +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
} 