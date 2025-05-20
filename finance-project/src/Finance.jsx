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
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md space-y-10">
     
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Ringkasan Keuangan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-green-100 text-green-800 shadow-sm">
            <h4 className="text-sm font-medium">Pemasukan</h4>
            <p className="text-lg font-bold">{formatCurrency(totalIncome)}</p>
          </div>
          <div className="p-4 rounded-xl bg-red-100 text-red-800 shadow-sm">
            <h4 className="text-sm font-medium">Pengeluaran</h4>
            <p className="text-lg font-bold">{formatCurrency(totalExpense)}</p>
          </div>
          <div className="p-4 rounded-xl bg-blue-100 text-blue-800 shadow-sm">
            <h4 className="text-sm font-medium">Saldo Akhir</h4>
            <p className="text-lg font-bold">{formatCurrency(balance)}</p>
          </div>
        </div>
      </div>

      
      <form onSubmit={handleSubmit} className="space-y-5 border-t pt-6">
        <h3 className="text-xl font-semibold text-gray-700">Tambah Transaksi</h3>

        {error && (
          <div className="text-red-600 bg-red-100 px-4 py-2 rounded-md">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deskripsi
          </label>
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
           
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Jumlah (Rp)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
            
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Jenis Transaksi
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="type"
                value="pemasukan"
                checked={type === "pemasukan"}
                onChange={(e) => setType(e.target.value)}
              />
              Pemasukan
            </label>
            <label className="flex items-center gap-2">
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
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Tambah Transaksi
        </button>
      </form>
    </div>
  );
};

export default FinanceSummary;
