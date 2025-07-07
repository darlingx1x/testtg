import { Transaction } from './db';

// Категории по ключевым словам
const categories: { key: string; value: string }[] = [
  { key: 'Taxi', value: 'Транспорт' },
  { key: 'PAYME', value: 'Переводы' },
  { key: 'P2P', value: 'Переводы' },
  { key: 'ZOOMRAD', value: 'Пополнение' },
  { key: 'UB OPL', value: 'Транспорт' },
  { key: 'HUMO', value: 'Банковские операции' },
  { key: 'TASHKENT', value: 'Город' },
  // ... можно расширять
];

export function parseSmsToTransaction(sms: string): Omit<Transaction, 'id'> | null {
  // Универсальный парсер для всех форматов HUMOcardbot
  // 1. Оплата/Операция (расход)
  // 2. Пополнение (доход)
  // 3. Изменение баланса

  // Удаляем лишние пробелы и переносы
  const text = sms.replace(/\r?\n/g, '\n').trim();

  // Определяем тип операции
  let type: 'income' | 'expense' | 'change' = 'expense';
  if (/🎉 Пополнение|\+/.test(text)) type = 'income';
  if (/Счет по карте изменен|изменен/i.test(text)) type = 'change';

  // Сумма и валюта
  let amountMatch = text.match(/[➖➕💸] ?([\d., ]+)\s*([A-Z]{3})/);
  let amount = amountMatch ? parseFloat(amountMatch[1].replace(/\s|\./g, '').replace(',', '.')) : null;
  let currency = amountMatch ? amountMatch[2] : '';

  // Карта (маска)
  let cardMatch = text.match(/HUMO-?CARD \*?(\d{4})/i);
  if (!cardMatch) cardMatch = text.match(/HUMOCARD \*?(\d{4})/i);
  let card = cardMatch ? `HUMOCARD *${cardMatch[1]}` : '';

  // Дата и время
  let dateMatch = text.match(/(\d{2}:[0-5]\d) (\d{2}\.\d{2}\.\d{4})/);
  let timestamp = dateMatch ? `${dateMatch[2]}T${dateMatch[1]}:00` : '';

  // Баланс после операции
  let balanceMatch = text.match(/💰 ([\d., ]+) UZS/);
  let balanceAfter = balanceMatch ? parseFloat(balanceMatch[1].replace(/\s|\./g, '').replace(',', '.')) : null;

  // Место/описание
  let merchantMatch = text.match(/📍 ([^\n]+)/);
  let merchant = merchantMatch ? merchantMatch[1].trim() : '';

  // Категория по ключевым словам
  let category = '';
  if (type === 'income' && merchant.toLowerCase().includes('p2p')) {
    category = 'Пополнение';
  } else {
    for (const c of categories) {
      if (merchant.toLowerCase().includes(c.key.toLowerCase())) {
        category = c.value;
        break;
      }
    }
  }

  // Если ничего не распарсили — вернуть null
  if (!amount || !currency || !card || !timestamp) return null;

  return {
    card,
    amount,
    currency,
    type,
    timestamp,
    merchant,
    category,
    balanceAfter,
    raw: sms,
  };
}
