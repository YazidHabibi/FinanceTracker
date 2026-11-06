import React, { useState, useEffect } from 'react';
import './financesummary.jsx'
import './transactionlist.jsx'
import TransactionList from './transactionlist.jsx';
import FinanceSummary from './financesummary.jsx';

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div className="p-4 max-w-3xl mx-auto mt-10 space-y-6">
      <h1 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight text-[#1E2B25]">Personal Finance Tracker</h1>
      <FinanceSummary transactions={transactions} onAddTransaction={addTransaction} />
      <TransactionList transactions={transactions} onDelete={deleteTransaction} />
    </div>
  );
}

export default App;