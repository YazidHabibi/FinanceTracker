import React, { useState } from "react";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);

const FinanceSummary = ({ transactions = [], onAddTransaction }) => {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState("");

  const totalIncome = transactions
    .filter((t) => t.type === "pemasukan")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "pengeluaran")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!desc || !amount || !type) {
      setError("Semua field wajib diisi.");
      return;
    }
    if (amount <= 0) {
      setError("Jumlah harus lebih dari 0.");
      return;
    }
    onAddTransaction({
      id: Date.now(),
      type,
      amount: Number(amount),
      description: desc,
    });
    setDesc("");
    setAmount("");
    setType("");
    setError("");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-10 bg-[#FFF6E5] text-[#14110F] border-[3px] border-[#14110F] rounded-[2rem] shadow-[10px_10px_0_0_#14110F] space-y-10">
     
      <div>
        <h2 className="inline-block -rotate-1 mb-8 px-4 py-1 bg-[#FFD84D] border-[3px] border-[#14110F] rounded-xl shadow-[4px_4px_0_0_#14110F] text-3xl md:text-4xl font-black uppercase tracking-tight">Ringkasan Keuangan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-4 rounded-2xl bg-[#7CE3B4] text-[#14110F] border-[3px] border-[#14110F] shadow-[5px_5px_0_0_#14110F] -rotate-1 transition-all duration-200 hover:rotate-0 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[9px_9px_0_0_#14110F]">
            <h4 className="text-xs font-bold uppercase tracking-widest">Pemasukan</h4>
            <p className="mt-3 text-xl font-black tracking-tight whitespace-nowrap">{formatCurrency(totalIncome)}</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#FF8FA3] text-[#14110F] border-[3px] border-[#14110F] shadow-[5px_5px_0_0_#14110F] rotate-1 transition-all duration-200 hover:rotate-0 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[9px_9px_0_0_#14110F]">
            <h4 className="text-xs font-bold uppercase tracking-widest">Pengeluaran</h4>
            <p className="mt-3 text-xl font-black tracking-tight whitespace-nowrap">{formatCurrency(totalExpense)}</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#3B5BFF] text-white border-[3px] border-[#14110F] shadow-[5px_5px_0_0_#14110F] -rotate-1 transition-all duration-200 hover:rotate-0 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[9px_9px_0_0_#14110F]">
            <h4 className="text-xs font-bold uppercase tracking-widest">Saldo Akhir</h4>
            <p className="mt-3 text-xl font-black tracking-tight whitespace-nowrap">{formatCurrency(balance)}</p>
          </div>
        </div>
      </div>

      
      <form onSubmit={handleSubmit} className="space-y-6 border-t-[3px] border-dashed border-[#14110F] pt-8">
        <h3 className="text-2xl font-black uppercase tracking-tight">Tambah Transaksi</h3>

        {error && (
          <div className="px-4 py-3 bg-[#FF8FA3] text-[#14110F] border-[3px] border-[#14110F] rounded-xl font-bold shadow-[4px_4px_0_0_#14110F]">
            {error}
          </div>
        )}

        <div>
          <label className="block mb-2 text-xs font-bold uppercase tracking-widest text-[#14110F]">
            Deskripsi
          </label>
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full px-4 py-3 bg-white border-[3px] border-[#14110F] rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:bg-[#FFF3B0] focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[5px_5px_0_0_#14110F]"
           
          />
        </div>

        <div>
          <label className="block mb-2 text-xs font-bold uppercase tracking-widest text-[#14110F]">
            Jumlah (Rp)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 bg-white border-[3px] border-[#14110F] rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:bg-[#FFF3B0] focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[5px_5px_0_0_#14110F]"
            
          />
        </div>

        <div>
          <label className="block mb-2 text-xs font-bold uppercase tracking-widest text-[#14110F]">
            Jenis Transaksi
          </label>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 cursor-pointer [&_input]:h-4 [&_input]:w-4 [&_input]:accent-[#14110F] px-5 py-2 bg-white border-[3px] border-[#14110F] rounded-full font-bold shadow-[3px_3px_0_0_#14110F] transition-all duration-200 hover:-translate-y-0.5 has-[:checked]:bg-[#7CE3B4]">
              <input
                type="radio"
                name="type"
                value="pemasukan"
                checked={type === "pemasukan"}
                onChange={(e) => setType(e.target.value)}
              />
              Pemasukan
            </label>
            <label className="flex items-center gap-2 cursor-pointer [&_input]:h-4 [&_input]:w-4 [&_input]:accent-[#14110F] px-5 py-2 bg-white border-[3px] border-[#14110F] rounded-full font-bold shadow-[3px_3px_0_0_#14110F] transition-all duration-200 hover:-translate-y-0.5 has-[:checked]:bg-[#FF8FA3]">
              <input
                type="radio"
                name="type"
                value="pengeluaran"
                checked={type === "pengeluaran"}
                onChange={(e) => setType(e.target.value)}
              />
              Pengeluaran
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#3B5BFF] text-white py-3 rounded-xl border-[3px] border-[#14110F] font-black uppercase tracking-widest shadow-[6px_6px_0_0_#14110F] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_0_#14110F] active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          Tambah Transaksi
        </button>
      </form>
    </div>
  );
};

export default FinanceSummary;