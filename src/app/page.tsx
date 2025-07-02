"use client";
import { useEffect } from 'react';

interface TelegramAuthData {
  id: number | string;
  username: string;
  first_name: string;
  last_name?: string;
  hash: string;
  [key: string]: string | number | undefined;
}

// Расширяем глобальный интерфейс Window для onTelegramAuth
declare global {
  interface Window {
    onTelegramAuth: (user: TelegramAuthData) => void;
  }
}

export default function Home() {
  useEffect(() => {
    // Глобальная функция для Telegram Login Widget
    window.onTelegramAuth = async function(user: TelegramAuthData) {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      if (res.ok) {
        window.location.href = '/dashboard';
      } else {
        alert('Ошибка авторизации через Telegram');
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Вход в финансовый мониторинг</h1>
      <div className="mb-4 text-gray-600">Войдите через Telegram для доступа к вашему дашборду</div>
      <div id="telegram-login-widget" className="mb-8" />
      <div className="text-xs text-gray-400 mt-8">Ваши данные защищены и используются только для входа</div>
    </div>
  );
}
