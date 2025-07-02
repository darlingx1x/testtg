# Финансовый мониторинг из SMS через Telegram

## Описание
Веб-приложение для учёта доходов и расходов по SMS-уведомлениям, пересылаемым через Telegram-бота. Все транзакции сохраняются в JSON-базу, которая хранится и версионируется в приватном репозитории GitHub. На сайте доступна аналитика, графики и история операций.

## Технологии
- Next.js 14 (App Router, API routes)
- Tailwind CSS
- React Chart (для графиков)
- Telegram Bot API
- JSON-база (db.json) в GitHub
- Деплой: Render.com

## Быстрый старт
1. Клонируйте репозиторий:
   ```bash
   git clone <ваш-репозиторий>
   cd <ваш-репозиторий>
   ```
2. Установите зависимости:
   ```bash
   npm install
   ```
3. Создайте файл `.env.local` и укажите переменные:
   ```env
   WEBHOOK_SECRET=your_webhook_secret
   ADMIN_SECRET=your_admin_secret
   ```
4. Запустите локально:
   ```bash
   npm run dev
   ```
5. Откройте [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

## Интеграция Telegram-бота
1. Создайте бота через [@BotFather](https://t.me/BotFather) и получите токен.
2. Настройте пересылку SMS на бота (например, через переадресацию или API).
3. В коде бота реализуйте отправку POST-запроса на ваш endpoint:
   - URL: `https://<ваш-домен>/api/webhook`
   - Метод: POST
   - Заголовок: `x-webhook-secret: <ваш WEBHOOK_SECRET>`
   - Тело: `{ "message": "текст SMS" }`

## Синхронизация базы с GitHub
- Все транзакции хранятся в `db.json` в корне проекта.
- Для автоматической синхронизации используйте GitHub Actions или делайте pull request с обновлённым файлом.
- Пример workflow для push изменений:
  ```yaml
  name: Sync DB
  on:
    push:
      paths:
        - 'db.json'
  jobs:
    sync:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - name: Commit & Push
          run: |
            git config user.name 'github-actions'
            git config user.email 'github-actions@github.com'
            git add db.json
            git commit -m 'Update db.json' || echo 'No changes'
            git push
  ```

## Деплой на Render.com
1. Зарегистрируйтесь на [Render.com](https://render.com/).
2. Создайте новый Web Service, выберите ваш репозиторий.
3. Укажите build command: `npm install && npm run build`
4. Start command: `npm start` или `npm run start`
5. Добавьте переменные окружения из `.env.local`.
6. После деплоя настройте Telegram-бота на отправку webhook на ваш Render-домен.

## Админка
- Доступна по адресу `/admin?secret=your_admin_secret`
- Показывает все транзакции в сыром виде для отладки.

## Безопасность
- Webhook защищён секретом (`x-webhook-secret`).
- Админка защищена секретом через query-параметр.

## Возможности для расширения
- Категоризация трат по ключевым словам.
- Уведомления в Telegram о превышении бюджета.
- Мультиаккаунтность.
- Экспорт в CSV/JSON.
- Интеграция Telegram Login Widget для авторизации.

---

**Вопросы и предложения:** создавайте issue или pull request в репозитории.
