'use client';
import React from 'react';

/**
 * Премиальное модальное окно для подтверждения действий.
 * Пример: <Modal open={open} onClose={...} onConfirm={...} title="Вы уверены?">Текст</Modal>
 */
export default function Modal({ open, onClose, onConfirm, title, children }: {
  open: boolean,
  onClose: () => void,
  onConfirm: () => void,
  title: string,
  children: React.ReactNode
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in">
      <div className="bg-premium-light rounded-2xl shadow-premium p-8 max-w-md w-full animate-fade-in">
        <h2 className="text-xl font-bold text-premium-accent mb-4">{title}</h2>
        <div className="mb-6 text-premium-accent2">{children}</div>
        <div className="flex gap-4 justify-end">
          <button className="px-4 py-2 rounded-xl bg-premium-surface text-premium-accent2 font-bold hover:bg-premium-accent2 hover:text-premium-surface transition-all" onClick={onClose}>Отмена</button>
          <button className="px-4 py-2 rounded-xl bg-premium-accent2 text-premium-surface font-bold hover:bg-premium-accent hover:text-white transition-all" onClick={onConfirm}>Подтвердить</button>
        </div>
      </div>
    </div>
  );
} 