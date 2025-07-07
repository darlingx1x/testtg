import { getTransactions } from '@/lib/db';
import Card from '../Card';

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const transactions = await getTransactions();
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-display font-bold mb-8 text-premium-accent">Админка: все транзакции</h1>
      {/* Премиальная карточка с JSON-историей */}
      <Card className="overflow-x-auto text-xs bg-premium-surface text-white max-h-[70vh]">
        <pre>{JSON.stringify(transactions, null, 2)}</pre>
      </Card>
    </div>
  );
} 