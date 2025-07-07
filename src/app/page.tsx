"use client";
import { useEffect } from 'react';
import Card from './Card';
import Button from './Button';

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-premium">
      <Card className="flex flex-col items-center gap-6 max-w-md w-full">
        <h1 className="text-4xl font-display font-bold text-premium-accent mb-2">Вход в FinMonitor</h1>
        <div className="mb-2 text-premium-accent2 text-lg">Войдите через Telegram для доступа к вашему дашборду</div>
        <div id="telegram-login-widget" className="mb-4" />
        <div className="text-xs text-premium-accent2 mt-2">Ваши данные защищены и используются только для входа</div>
      </Card>
      {/* Кнопка для теста (можно убрать) */}
      {/* <Button className="mt-8">Премиальная кнопка</Button> */}
    </div>
  );
}
