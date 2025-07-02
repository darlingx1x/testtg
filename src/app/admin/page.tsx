import { getTransactions } from '@/lib/db';

const ADMIN_SECRET = process.env.ADMIN_SECRET;

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  if (params.secret !== ADMIN_SECRET) {
    return <div>Доступ запрещён</div>;
  }
  const transactions = await getTransactions();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Админка: все транзакции</h1>
      <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto max-h-[70vh]">{JSON.stringify(transactions, null, 2)}</pre>
    </div>
  );
} 