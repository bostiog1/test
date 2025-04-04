import { useState, useEffect, useCallback } from "react";
import { Coin } from "../types";
import { fetchCoins } from "../service/coinService";

export function useMarketplaceCoins() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refreshCoins = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchCoins();
      setCoins(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCoins();
  }, [refreshCoins]);

  const addCoin = useCallback((newCoin: Coin) => {
    setCoins((prevCoins) => [newCoin, ...prevCoins]);
  }, []);

  const updateCoin = useCallback((updatedCoin: Coin) => {
    setCoins((prevCoins) =>
      prevCoins.map((coin) =>
        coin.coin_id === updatedCoin.coin_id
          ? { ...coin, ...updatedCoin }
          : coin
      )
    );
  }, []);

  return { coins, loading, error, refreshCoins, addCoin, updateCoin };
}
