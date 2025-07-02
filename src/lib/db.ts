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

export async function getTransactions(): Promise<Transaction[]> {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    if ((e as any).code === 'ENOENT') return [];
    throw e;
  }
}

export async function addTransaction(tx: Omit<Transaction, 'id'>): Promise<void> {
  const transactions = await getTransactions();
  const newTx = { ...tx, id: uuidv4() };
  transactions.push(newTx);
  await fs.writeFile(DB_PATH, JSON.stringify(transactions, null, 2), 'utf-8');
} 