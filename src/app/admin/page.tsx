import { getTransactions } from '@/lib/db';
import Card from '../Card';

const ADMIN_SECRET = process.env.ADMIN_SECRET;

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  // Проверяем username из localStorage на клиенте через useEffect, но на сервере — через query (или показываем инструкцию)
  // Для SSR Next.js App Router: делаем проверку на клиенте
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('tgUser');
    if (!data || JSON.parse(data).username !== 'senpaisenpai') {
      return <div>Доступ запрещён</div>;
    }
  }
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