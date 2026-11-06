const TransactionList = ({ transactions, onDelete }) => {
  const formatCurrency = (num) => {
    return num.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-10 bg-[#DDE8E0] text-[#1E2B25] rounded-[2rem] border-2 border-[#5B8A68]/40 shadow-[0_25px_60px_-20px_rgba(30,43,37,0.45)]">
      <h2 className="mb-8 font-serif text-3xl md:text-4xl font-semibold tracking-tight after:content-[''] after:block after:mt-4 after:h-[2px] after:w-12 after:bg-[#5B8A68]">Riwayat Transaksi</h2>
      {transactions.length === 0 ? (
        <p className="px-4 py-3 rounded-xl bg-white border-2 border-dashed border-[#5B8A68]/40 text-sm text-[#2F5A3C]">Belum ada transaksi yang ditambahkan.</p>
      ) : (
        <ul className="space-y-3">
          {transactions.map((t) => (
            <li
              key={t.id}
              className="flex flex-col md:flex-row md:items-center justify-between px-5 py-4 bg-white rounded-2xl border-2 border-[#5B8A68]/30 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#5B8A68] hover:shadow-[0_14px_30px_-16px_rgba(30,43,37,0.5)]"
            >
              <div className="flex-1">
                <p className="font-semibold">{t.description}</p>
                <p className="mt-1 text-[11px] font-medium tracking-[0.2em] text-[#2F5A3C] uppercase">{t.type}</p>
              </div>
              <div className="flex items-center gap-4 mt-3 md:mt-0">
                <span
                  className={`font-serif text-xl font-semibold tracking-tight whitespace-nowrap ${
                    t.type === 'pemasukan' ? 'text-[#2F5A3C]' : 'text-[#B5654D]'
                  }`}
                >
                  {formatCurrency(t.amount)}
                </span>
                <button
                  onClick={() => onDelete(t.id)}
                  className="px-4 py-1.5 rounded-full border-2 border-[#C97B63] text-[#B5654D] text-xs font-medium uppercase tracking-[0.15em] transition-all duration-300 hover:bg-[#C97B63] hover:text-white"
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