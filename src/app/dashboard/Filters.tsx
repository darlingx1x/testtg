'use client';
import { useState } from 'react';

export default function Filters({ cards, dates, onChange }: {
  cards: string[];
  dates: string[];
  onChange: (filters: { card: string; date: string }) => void;
}) {
  const [card, setCard] = useState('');
  const [date, setDate] = useState('');

  function handleChange(newCard: string, newDate: string) {
    setCard(newCard);
    setDate(newDate);
    onChange({ card: newCard, date: newDate });
  }

  return (
    <div className="mb-4 flex flex-wrap gap-4 items-center">
      {/* Премиальный фильтр по карте */}
      <label className="flex items-center gap-2 text-premium-accent2 font-semibold">
        <span>Карта:</span>
        <select className="border border-premium-border bg-premium-light text-white rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-premium-accent2 transition-all" value={card} onChange={e => handleChange(e.target.value, date)}>
          <option value="">Все</option>
          {cards.map(card => <option key={card} value={card}>{card}</option>)}
        </select>
      </label>
      {/* Премиальный фильтр по дате */}
      <label className="flex items-center gap-2 text-premium-accent2 font-semibold">
        <span>Дата:</span>
        <select className="border border-premium-border bg-premium-light text-white rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-premium-accent2 transition-all" value={date} onChange={e => handleChange(card, e.target.value)}>
          <option value="">Все</option>
          {dates.map(date => <option key={date} value={date}>{date}</option>)}
        </select>
      </label>
    </div>
  );
} 