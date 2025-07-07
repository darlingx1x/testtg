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
    <div className="mb-4 flex flex-wrap gap-2 items-center">
      <label>
        <span className="mr-1">Карта:</span>
        <select className="border rounded px-2 py-1" value={card} onChange={e => handleChange(e.target.value, date)}>
          <option value="">Все</option>
          {cards.map(card => <option key={card} value={card}>{card}</option>)}
        </select>
      </label>
      <label>
        <span className="mr-1">Дата:</span>
        <select className="border rounded px-2 py-1" value={date} onChange={e => handleChange(card, e.target.value)}>
          <option value="">Все</option>
          {dates.map(date => <option key={date} value={date}>{date}</option>)}
        </select>
      </label>
    </div>
  );
} 