"use client";
import { useEffect, useState } from 'react';
import Card from './Card';
import Toast from './Toast';

interface TelegramAuthData {
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

// Расширяем глобальный интерфейс Window для onTelegramAuth
declare global {
  interface Window {
    onTelegramAuth: (user: TelegramAuthData) => void;
  }
}

export default function Home() {
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    // Глобальная функция для Telegram Login Widget
    window.onTelegramAuth = async function(user: TelegramAuthData) {
      // Если Telegram возвращает дополнительные поля, сохраняем их
      const fullUser = { ...user };
      if (user.photo_url) fullUser.photo_url = user.photo_url;
      if (user.bio) fullUser.bio = user.bio;
      if (user.phone_number) fullUser.phone_number = user.phone_number;
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      if (res.ok) {
        localStorage.setItem('tgUser', JSON.stringify(fullUser)); // сохраняем расширенного пользователя
        window.location.href = '/dashboard';
      } else {
        setToast('Ошибка авторизации через Telegram');
      }
    };
    // Удаляем старый виджет, если он был
    const old = document.getElementById('tg-login-script');
    if (old) old.remove();
    // Создаём новый скрипт
    const script = document.createElement('script');
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute('data-telegram-login', 'darlinxloginbot');
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.setAttribute('data-request-access', 'write');
    script.async = true;
    script.id = 'tg-login-script';
    const widgetDiv = document.getElementById('telegram-login-widget');
    if (widgetDiv) widgetDiv.appendChild(script);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-premium">
      <Card className="flex flex-col items-center gap-6 max-w-md w-full">
        <h1 className="text-4xl font-display font-bold text-premium-accent mb-2">Вход в FinMonitor</h1>
        <div className="mb-2 text-premium-accent2 text-lg">Войдите через Telegram для доступа к вашему дашборду</div>
        <div id="telegram-login-widget" className="mb-4" />
        <div className="flex gap-4 mt-2">
          <a href="/profile" className="text-premium-accent2 underline">Профиль</a>
          <a href="/admin?secret=1" className="text-premium-accent2 underline">Админка</a>
        </div>
        <div className="text-xs text-premium-accent2 mt-2">Ваши данные защищены и используются только для входа</div>
      </Card>
      {toast && <Toast message={toast} type="error" onClose={() => setToast(null)} />}
      {/* Кнопка для теста (можно убрать) */}
      {/* <Button className="mt-8">Премиальная кнопка</Button> */}
    </div>
  );
}
