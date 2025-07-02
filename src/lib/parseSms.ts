import { Transaction } from './db';

// Категории по ключевым словам
const categories = [
  { key: 'пятёрочка', value: 'Продукты' },
  { key: 'магнит', value: 'Продукты' },
  { key: 'яндекс', value: 'Транспорт' },
  { key: 'аптека', value: 'Здоровье' },
  { key: 'кино', value: 'Развлечения' },
  // ...добавьте свои
];

export function parseSmsToTransaction(sms: string): Transaction | null {
  // Пример: "VISA1234 12.03.23 14:22 Покупка 500.00 RUB Магнит Баланс: 1000.00 RUB"
  const regex = /(VISA|MASTERCARD|МИР)(\d{4})\s+(\d{2}\.\d{2}\.\d{2})\s+(\d{2}:\d{2})\s+(Покупка|Зачисление|Списание)\s+(\d+[.,]?\d*)\s*(RUB|₽|USD|EUR)\s+([^\d]+)\s+Баланс:/i;
  const match = sms.match(regex);
  if (!match) return null;
  const [, cardType, cardNum, date, time, opType, amount, currency, merchant] = match;
  const type = opType === 'Зачисление' ? 'income' : 'expense';
  // const category = categories.find(c => merchant.toLowerCase().includes(c.key))?.value || 'Другое';
  return {
    id: '',
    card: cardType + cardNum,
    amount: parseFloat(amount.replace(',', '.')),
    currency: currency.replace('₽', 'RUB'),
    type,
    timestamp: `${date} ${time}`,
    merchant: merchant.trim(),
    raw: sms,
    // category, // если нужно добавить в Transaction
  };
} 