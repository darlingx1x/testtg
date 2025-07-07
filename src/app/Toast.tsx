'use client';
import React, { useEffect } from 'react';

/**
 * Премиальный Toast для уведомлений. Используйте для ошибок, успеха, выхода и т.д.
 * Пример: <Toast message="Ошибка!" type="error" onClose={() => ...} />
 */
export default function Toast({ message, type = 'info', onClose }: { message: string, type?: 'info' | 'success' | 'error', onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  let color = 'bg-premium-accent2';
  if (type === 'error') color = 'bg-red-500';
  if (type === 'success') color = 'bg-green-500';

  return (
    <div className={`fixed z-50 bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl shadow-card text-white font-bold animate-fade-in ${color}`}
      role="alert" aria-live="assertive">
      {message}
    </div>
  );
} 