import React, { useState, useEffect } from "react";
import FinanceSummary from "./Finance.jsx";

const LOCAL_KEY = "finance-app-data";

const App = () => {
  const [transactions, setTransactions] = useState([]);

  // Ambil data dari localStorage saat pertama kali load
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) {
      setTransactions(JSON.parse(stored));
    }
  }, []);

  // Simpan setiap kali transaksi berubah
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const handleAddTransaction = (newTx) => {
    setTransactions([newTx, ...transactions]);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <FinanceSummary
        transactions={transactions}
        onAddTransaction={handleAddTransaction}
      />
    </div>
  );
};

export default App;
