import { NextRequest, NextResponse } from 'next/server';
import { getTransactions } from '@/lib/db';

export async function GET(req: NextRequest) {
  const txs = await getTransactions();
  return NextResponse.json(txs);
} 