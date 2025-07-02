import { NextResponse } from 'next/server';
import { getTransactions } from '@/lib/db';

export async function GET() {
  const txs = await getTransactions();
  return NextResponse.json(txs);
} 