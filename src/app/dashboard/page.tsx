'use client';
import { useState, useEffect } from 'react';
import Filters from './Filters';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Transaction } from '@/lib/db';
import Card from '../Card';
import Loader from '../Loader';
import { saveAs } from 'file-saver';
import Button from '../Button';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function sum(transactions: Transaction[], type: 'income' | 'expense') {
  return transactions.filter(t => t.type === type).reduce((acc, t) => acc + t.amount, 0);
}

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filters, setFilters] = useState<{ card: string; date: string }>({ card: '', date: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/transactions')
      .then(res => res.json())
      .then(data => setTransactions(data))
      .finally(() => setLoading(false));
  }, []);

  const filtered = transactions.filter(t =>
    (!filters.card || t.card === filters.card) &&
    (!filters.date || t.timestamp.split(' ')[0] === filters.date)
  );
  const income = sum(filtered, 'income');
  const expense = sum(filtered, 'expense');
  const balance = income - expense;

  // График баланса по отфильтрованным данным
  let runningBalance = 0;
  const sorted = [...filtered].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  const chartData = sorted.map((t) => {
    runningBalance += t.type === 'income' ? t.amount : -t.amount;
    return { date: t.timestamp.split(' ')[0], balance: runningBalance };
  });
  const labels = chartData.map((d) => d.date);
  const data = {
    labels,
    datasets: [
      {
        label: 'Баланс',
        data: chartData.map((d) => d.balance),
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        tension: 0.3,
      },
    ],
  };

  const cards = Array.from(new Set(transactions.map(t => t.card)));
  const dates = Array.from(new Set(transactions.map(t => t.timestamp.split(' ')[0])));

  // Экспорт в CSV
  function exportCSV() {
    const header = 'Дата,Карта,Тип,Сумма,Магазин\n';
    const rows = filtered.map(t => [t.timestamp, t.card, t.type === 'income' ? 'Доход' : 'Расход', `${t.amount} ${t.currency}`, t.merchant].join(','));
    const csv = header + rows.join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'transactions.csv');
  }
  // Экспорт в PDF (простой вариант)
  function exportPDF() {
    const win = window.open('', '', 'width=800,height=600');
    if (!win) return;
    win.document.write('<html><head><title>Транзакции</title></head><body>');
    win.document.write('<h1>История транзакций</h1>');
    win.document.write('<table border="1" style="width:100%;border-collapse:collapse;">');
    win.document.write('<tr><th>Дата</th><th>Карта</th><th>Тип</th><th>Сумма</th><th>Магазин</th></tr>');
    filtered.forEach(t => {
      win!.document.write(`<tr><td>${t.timestamp}</td><td>${t.card}</td><td>${t.type === 'income' ? 'Доход' : 'Расход'}</td><td>${t.amount} ${t.currency}</td><td>${t.merchant}</td></tr>`);
    });
    win.document.write('</table></body></html>');
    win.document.close();
    win.print();
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-display font-bold mb-8 text-premium-accent">Финансовый дашборд</h1>
      {/* Премиальные карточки с балансом */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="flex flex-col items-center bg-gradient-to-br from-premium-light to-premium-surface">
          <div className="text-lg text-premium-accent2 mb-1">Доходы</div>
          <div className="text-2xl font-bold text-premium-accent">{income} ₽</div>
        </Card>
        <Card className="flex flex-col items-center bg-gradient-to-br from-premium-light to-premium-surface">
          <div className="text-lg text-red-300 mb-1">Расходы</div>
          <div className="text-2xl font-bold text-red-200">{expense} ₽</div>
        </Card>
        <Card className="flex flex-col items-center bg-gradient-to-br from-premium-light to-premium-surface">
          <div className="text-lg text-premium-accent mb-1">Баланс</div>
          <div className="text-2xl font-bold text-premium-accent2">{balance} ₽</div>
        </Card>
      </div>
      {/* Фильтры */}
      <Filters cards={cards} dates={dates} onChange={setFilters} />
      {/* График баланса */}
      <div className="mb-10">
        <h2 className="text-2xl font-display font-semibold mb-4 text-premium-accent">Динамика баланса</h2>
        <Card className="overflow-x-auto">
          <Line data={data} options={{ responsive: true, plugins: { legend: { display: false } } }} height={200} />
        </Card>
      </div>
      {/* История транзакций */}
      <div className="flex gap-4 mb-4">
        <Button onClick={exportCSV}>Экспорт CSV</Button>
        <Button onClick={exportPDF}>Экспорт PDF</Button>
      </div>
      <h2 className="text-2xl font-display font-semibold mb-4 text-premium-accent">История транзакций</h2>
      <Card className="overflow-x-auto p-0">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2 text-premium-accent2">Дата</th>
              <th className="px-4 py-2 text-premium-accent2">Карта</th>
              <th className="px-4 py-2 text-premium-accent2">Тип</th>
              <th className="px-4 py-2 text-premium-accent2">Сумма</th>
              <th className="px-4 py-2 text-premium-accent2">Магазин</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} className="hover:bg-premium-surface transition-colors">
                <td className="border-t border-premium-border px-4 py-2 text-white">{t.timestamp}</td>
                <td className="border-t border-premium-border px-4 py-2 text-premium-accent2">{t.card}</td>
                <td className="border-t border-premium-border px-4 py-2 text-premium-accent">{t.type === 'income' ? 'Доход' : 'Расход'}</td>
                <td className="border-t border-premium-border px-4 py-2 text-white">{t.amount} {t.currency}</td>
                <td className="border-t border-premium-border px-4 py-2 text-white">{t.merchant}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
} 