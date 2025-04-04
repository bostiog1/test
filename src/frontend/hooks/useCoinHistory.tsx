import { useEffect, useState } from "react";
import Endpoints from "../utils/Endpoints";
import { TransactionHistory } from "../types";

export const useCoinHistory = (coinId: number) => {
  const [transactions, setTransactions] = useState<TransactionHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(
          `${Endpoints.coinHistory}?coinId=${coinId}`,
          {
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error(
            response.status === 401
              ? "Unauthorized"
              : "Failed to fetch history",
          );
        }

        const data = await response.json();
        setTransactions(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        console.error("History fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (coinId) fetchHistory();
  }, [coinId]);

  return { transactions, loading, error };
};
