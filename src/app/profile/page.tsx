'use client';
import React, { useEffect, useState } from 'react';
import Card from '../Card';
import Button from '../Button';
import { useRouter } from 'next/navigation';
import Loader from '../Loader';
import Toast from '../Toast';
import Image from 'next/image';

/**
 * Страница профиля пользователя. Данные берутся из Telegram после авторизации.
 * Если пользователь не авторизован — редирект на главную.
 */
interface TelegramUser {
  id: number | string;
  username: string;
  first_name: string;
  last_name?: string;
  hash: string;
  photo_url?: string;
  bio?: string;
  phone_number?: string;
  [key: string]: string | number | undefined;
}

export default function ProfilePage() {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const router = useRouter();
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    // Пример: получаем пользователя из localStorage (или fetch('/api/me'))
    const data = localStorage.getItem('tgUser');
    if (data) {
      setUser(JSON.parse(data));
    } else {
      router.replace('/');
    }
  }, [router]);

  if (!user) return <Loader />;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Card className="flex flex-col items-center gap-6 max-w-md w-full">
        <h1 className="text-3xl font-display font-bold text-premium-accent mb-2">Профиль</h1>
        <div className="flex flex-col items-center gap-2">
          <Image src={user.photo_url || `https://t.me/i/userpic/320/${user.username}.jpg`} alt="avatar" width={96} height={96} className="w-24 h-24 rounded-full border-4 border-premium-accent2 shadow-card" />
          <div className="text-lg text-white font-bold">{user.first_name} {user.last_name}</div>
          <div className="text-premium-accent2">@{user.username}</div>
          <div className="text-xs text-premium-accent2">ID: {user.id}</div>
          {user.bio && <div className="text-premium-accent2 text-center mt-2">{user.bio}</div>}
          {user.phone_number && <div className="text-premium-accent2 text-center mt-1">Телефон: {user.phone_number}</div>}
        </div>
        <Button className="mt-4" onClick={() => {
          localStorage.removeItem('tgUser');
          setToast('Вы успешно вышли!');
          setTimeout(() => router.replace('/'), 1200);
        }}>Выйти</Button>
        {toast && <Toast message={toast} type="success" onClose={() => setToast(null)} />}
      </Card>
    </div>
  );
} 