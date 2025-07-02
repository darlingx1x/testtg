import fetch from 'node-fetch';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const GITHUB_REPO = process.env.GITHUB_REPO!; // формат: username/repo
const GITHUB_DB_PATH = 'db.json';

/**
 * Получить содержимое db.json из GitHub
 */
export async function getDbFromGitHub(): Promise<any> {
  const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_DB_PATH}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3.raw',
    },
  });
  if (!res.ok) throw new Error('Не удалось получить db.json из GitHub');
  return await res.json();
}

/**
 * Сохранить db.json в GitHub (создаёт коммит)
 */
export async function saveDbToGitHub(db: any, message = 'Update db.json'): Promise<void> {
  // Получаем SHA текущего файла
  const metaRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_DB_PATH}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });
  if (!metaRes.ok) throw new Error('Не удалось получить SHA db.json');
  const meta = await metaRes.json();
  const sha = meta.sha;

  // Кодируем содержимое в base64
  const content = Buffer.from(JSON.stringify(db, null, 2)).toString('base64');

  // Делаем PUT-запрос для обновления файла
  const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_DB_PATH}`, {
    method: 'PUT',
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    },
    body: JSON.stringify({
      message,
      content,
      sha,
    }),
  });
  if (!res.ok) throw new Error('Не удалось сохранить db.json в GitHub');
} 