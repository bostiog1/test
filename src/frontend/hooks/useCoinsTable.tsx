import { useState, useEffect } from "react";
import { UseCoinsTableProps, UseCoinsTableResult, Coin } from "../types";
import Endpoints from "../utils/Endpoints";

export function useCoinsTable({
  coins,
  onBuySuccess,
  currentUserName,
  updateCoin,
}: UseCoinsTableProps): UseCoinsTableResult {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [filter, setFilter] = useState<"all" | "available" | "owned">("all");
  const [selectedCoinId, setSelectedCoinId] = useState<number | null>(null);
  const [purchasedCoinIds, setPurchasedCoinIds] = useState<number[]>([]);
  const [recentlyPurchasedCoins, setRecentlyPurchasedCoins] = useState<
    number[]
  >([]);

  // Add effect to refresh coins when filter changes to "owned"
  useEffect(() => {
    if (filter === "owned" && purchasedCoinIds.length > 0) {
      onBuySuccess();
      setPurchasedCoinIds([]);
    }
  }, [filter, purchasedCoinIds, onBuySuccess]);

  // Customize the filter state setter to handle refreshes
  const handleFilterChange = (newFilter: "all" | "available" | "owned") => {
    setFilter(newFilter);
    if (newFilter === "owned" && purchasedCoinIds.length > 0) {
      onBuySuccess();
      setPurchasedCoinIds([]);
    }
  };

  const handleBuy = async (coinId: number) => {
    try {
      const response = await fetch(`${Endpoints.coins}/${coinId}/buy`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Purchase failed");
      }

      // console.log(`Successfully purchased coin ${coinId}`);

      // Update local state immediately
      setPurchasedCoinIds((prev) => [...prev, coinId]);

      // Immediately update the local state to show ownership
      const updatedCoinData: Coin | undefined = coins.find(
        (c) => c.coin_id === coinId
      );
      if (updatedCoinData) {
        // console.log(
        //   `Updating coin ${coinId} to be owned by ${currentUserName}`
        // );
        updateCoin({
          ...updatedCoinData,
          owner_name: currentUserName,
        });
      }

      // Schedule a refresh for consistency with server (you can keep or remove the timeout)
      setTimeout(() => {
        // console.log("Refreshing all coins after purchase");
        onBuySuccess();
      }, 300);
      setRecentlyPurchasedCoins((prev) => [...prev, coinId]);
    } catch (err) {
      console.error("Buy error:", err);
      alert(err instanceof Error ? err.message : "Failed to buy coin");
    }
  };

  const filteredCoins = coins
    .map((coin) => {
      if (recentlyPurchasedCoins.includes(coin.coin_id)) {
        return { ...coin, owner_name: currentUserName };
      }
      return coin;
    })
    .filter((coin) => {
      if (filter === "available") return !coin.owner_name;
      if (filter === "owned")
        return (
          coin.owner_name === currentUserName ||
          recentlyPurchasedCoins.includes(coin.coin_id)
        );
      return true;
    });

  // Pagination logic
  const totalPages = Math.ceil(filteredCoins.length / itemsPerPage);
  const paginatedCoins = filteredCoins.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    filter,
    setFilter: handleFilterChange,
    selectedCoinId,
    setSelectedCoinId,
    handleBuy,
    totalPages,
    paginatedCoins,
    filteredCoins,
  };
}
