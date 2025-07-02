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

## Авторизация через Telegram Login Widget

1. Откройте страницу входа (`/` или `src/app/page.tsx`).
2. На странице отображается Telegram Login Widget:
   ```html
   <script async src="https://telegram.org/js/telegram-widget.js?22"
     data-telegram-login="darlingxloginbot"
     data-size="large"
     data-onauth="onTelegramAuth(user)"
     data-request-access="write"></script>
   ```
3. После успешной авторизации пользователь автоматически создаётся или обновляется в базе (GitHub db.json).
4. После входа происходит редирект на `/dashboard`.

### Ссылка на бота для входа
- [@darlingxloginbot](https://t.me/darlingxloginbot)

## Переменные окружения

Создайте файл `.env.local` и добавьте:
```env
TELEGRAM_BOT_TOKEN=8089091309:AAFGLChcMw7mjjNFGWC7wMbEzhp2QVLUwJo
JWT_SECRET=your_jwt_secret_here
WEBHOOK_SECRET=your_webhook_secret
ADMIN_SECRET=your_admin_secret
```

На Render.com добавьте эти переменные в настройках проекта (Environment > Secret Files или Environment Variables).

## Деплой на Render.com

1. Зарегистрируйтесь на [Render.com](https://render.com/).
2. Создайте новый Web Service, выберите ваш репозиторий.
3. Build command: `npm install && npm run build`
4. Start command: `npm start`
5. Добавьте переменные окружения из `.env.local`.
6. После деплоя настройте Telegram-бота на отправку webhook на ваш Render-домен.

## Синхронизация базы через GitHub

- Все пользователи и транзакции хранятся в `db.json` в корне проекта.
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

## Безопасность
- Все данные передаются только по HTTPS.
- Telegram Bot Token и JWT Secret хранятся только в переменных окружения.
- Подпись Telegram проверяется на сервере.
- API-роуты защищены JWT.

## Вопросы и поддержка
- По вопросам интеграции Telegram Login, деплоя или расширения функционала — создавайте issue или pull request.

### Переменные для GitHub API

Для работы с приватным репозиторием и синхронизации базы добавьте:
```env
GITHUB_TOKEN=ghp_xxx # Personal Access Token с правами repo
GITHUB_REPO=username/repo # например, darlingx/finance-db
```

---

**Вопросы и предложения:** создавайте issue или pull request в репозитории.
