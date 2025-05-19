import React from "react";

// Fungsi bantu untuk format mata uang (Rupiah)
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const FinanceSummary = ({ transactions = [] }) => {
  const totalIncome = transactions
    .filter((t) => t.type === "pemasukan")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "pengeluaran")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-2xl space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">Ringkasan Keuangan</h2>

      <div className="space-y-2">
        <div className="flex justify-between text-green-600 font-medium">
          <span>Total Pemasukan:</span>
          <span>{formatCurrency(totalIncome)}</span>
        </div>

        <div className="flex justify-between text-red-500 font-medium">
          <span>Total Pengeluaran:</span>
          <span>{formatCurrency(totalExpense)}</span>
        </div>

        <div className="flex justify-between text-gray-800 font-bold border-t pt-2">
          <span>Saldo Akhir:</span>
          <span>{formatCurrency(balance)}</span>
        </div>
      </div>
    </div>
  );
};

export default FinanceSummary;
