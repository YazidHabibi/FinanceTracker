import React from 'react';

const TransactionList = ({ transactions, onDelete }) => {
  const formatCurrency = (amount) =>
    amount.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });

  return (
    <div className="bg-white rounded-2xl shadow p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">🧾 Riwayat Transaksi</h2>

      {transactions.length === 0 ? (
        <p className="text-gray-500">Belum ada transaksi.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {transactions.map((t) => (
            <li
              key={t.id}
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 px-2 hover:bg-gray-50 transition rounded-lg"
            >
              <div className="flex-1">
                <p className="text-lg font-medium">{t.description}</p>
                <p
                  className={`text-sm font-semibold capitalize ${
                    t.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {t.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-lg font-bold">
                  {formatCurrency(t.amount)}
                </span>
                <button
                  onClick={() => onDelete(t.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-xl text-sm hover:bg-red-600 transition"
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
