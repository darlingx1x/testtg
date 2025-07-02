import { NextRequest, NextResponse } from 'next/server';

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

// Пример структуры транзакции
interface Transaction {
  id: string;
  card: string;
  amount: number;
  currency: string;
  type: 'income' | 'expense';
  timestamp: string;
  merchant: string;
  raw: string;
}

// Импортируем функции для работы с JSON-базой (создадим позже)
import { addTransaction } from '@/lib/db';
import { parseSmsToTransaction } from '@/lib/parseSms';

export async function POST(req: NextRequest) {
  try {
    const secret = req.headers.get('x-webhook-secret');
    if (!secret || secret !== WEBHOOK_SECRET) {
      console.error('Неверный секрет!');
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    const data = await req.json();
    // Ожидаем, что data содержит { message: string }
    if (!data.message) {
      console.error('Нет поля message!');
      return NextResponse.json({ error: 'No message' }, { status: 400 });
    }
    // Парсим SMS (реализуем парсер позже)
    const transaction = parseSmsToTransaction(data.message);
    if (!transaction) {
      console.error('Ошибка парсинга SMS:', data.message);
      return NextResponse.json({ error: 'Parse error' }, { status: 422 });
    }
    await addTransaction(transaction);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('Ошибка обработки webhook:', e);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
} 