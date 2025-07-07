import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const DB_PATH = path.join(process.cwd(), 'db.json');

export interface Transaction {
  id: string;
  card: string;
  amount: number;
  currency: string;
  type: 'income' | 'expense';
  timestamp: string;
  merchant: string;
  raw: string;
}

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name?: string;
}

/**
 * Модуль для работы с локальной JSON-базой (db.json).
 * Поддерживает хранение транзакций и пользователей.
 * Для production рекомендуется использовать GitHub API для синхронизации db.json с приватным репозиторием.
 *
 * Структура db.json:
 * {
 *   transactions: Transaction[],
 *   users: User[]
 * }
 */

// Структура всей базы
interface Database {
  transactions: Transaction[];
  users: User[];
}

const EMPTY_DB: Database = { transactions: [], users: [] };

async function getDb(): Promise<Database> {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    const parsed = JSON.parse(data);
    // Миграция старого формата (массив транзакций)
    if (Array.isArray(parsed)) {
      return { transactions: parsed, users: [] };
    }
    return parsed;
  } catch (e) {
    if ((e as { code?: string }).code === 'ENOENT') return EMPTY_DB;
    throw e;
  }
}

async function saveDb(db: Database): Promise<void> {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
}

export async function getTransactions(): Promise<Transaction[]> {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) return parsed;
    if (parsed && Array.isArray(parsed.transactions)) return parsed.transactions;
    return [];
  } catch (e) {
    if ((e as { code?: string }).code === 'ENOENT') return [];
    throw e;
  }
}

export async function addTransaction(tx: Omit<Transaction, 'id'>): Promise<void> {
  const transactions = await getTransactions();
  const newTx = { ...tx, id: uuidv4() };
  transactions.push(newTx);
  await fs.writeFile(DB_PATH, JSON.stringify(transactions, null, 2), 'utf-8');
}

export async function getUsers(): Promise<User[]> {
  const db = await getDb();
  return db.users;
}

export async function addOrUpdateUser(user: User): Promise<void> {
  const db = await getDb();
  const idx = db.users.findIndex(u => u.id === user.id);
  if (idx === -1) {
    db.users.push(user);
  } else {
    db.users[idx] = { ...db.users[idx], ...user };
  }
  await saveDb(db);
}

export { getDb, saveDb }; 