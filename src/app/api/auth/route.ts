import { NextRequest, NextResponse } from 'next/server';
import { addOrUpdateUser, User } from '@/lib/db';
import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const JWT_SECRET = process.env.JWT_SECRET!;

interface TelegramAuthData {
  id: number | string;
  username: string;
  first_name: string;
  last_name?: string;
  hash: string;
  [key: string]: string | number | undefined;
}

function checkTelegramAuth(data: TelegramAuthData): boolean {
  // Проверка подписи Telegram (https://core.telegram.org/widgets/login#checking-authorization)
  const { hash, ...fields } = data;
  const secret = crypto.createHash('sha256').update(TELEGRAM_BOT_TOKEN).digest();
  const dataCheckString = Object.keys(fields)
    .sort()
    .map(key => `${key}=${fields[key]}`)
    .join('\n');
  const hmac = crypto.createHmac('sha256', secret).update(dataCheckString).digest('hex');
  return hmac === hash;
}

export async function POST(req: NextRequest) {
  try {
    const data: TelegramAuthData = await req.json();
    if (!checkTelegramAuth(data)) {
      return NextResponse.json({ error: 'Invalid Telegram signature' }, { status: 403 });
    }
    const user: User = {
      id: Number(data.id),
      username: data.username,
      first_name: data.first_name,
      last_name: data.last_name,
    };
    await addOrUpdateUser(user);
    // Генерируем JWT
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
    // Можно установить cookie, но для простоты возвращаем токен
    return NextResponse.json({ token });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
} 