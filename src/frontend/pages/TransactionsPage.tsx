import { useState, useEffect } from "react";
import { useTransactions } from "../hooks/useTransactions";
import { TransactionsTable } from "../components/TransactionTable";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { ErrorDisplay } from "../components/ErrorTransactions";

export function TransactionsPage() {
  const { transactions, loading, error } = useTransactions();
  const [loadingTime, setLoadingTime] = useState(0);

  useEffect(() => {
    let timerId: number | undefined;

    if (loading) {
      timerId = window.setInterval(() => {
        setLoadingTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [loading]);

  if (loading) {
    return <LoadingIndicator loadingTime={loadingTime} />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }
  return (
    <div className="max-w-7xl mx-auto p-4 bg-white dark:bg-gray-900">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-800 dark:text-gray-200">
        BitSlow Transactions
      </h1>
      <TransactionsTable transactions={transactions} />
    </div>
  );
}
