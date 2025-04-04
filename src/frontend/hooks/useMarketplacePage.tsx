import { useState } from "react";
import Endpoints from "../utils/Endpoints";
import { UseMarketplacePageProps, UseMarketplacePageResult } from "../types";

export const useMarketplacePage = ({
  refreshCoins,
  addCoin,
}: UseMarketplacePageProps): UseMarketplacePageResult => {
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [remainingCombinations, setRemainingCombinations] = useState(1000);

  const handleGenerate = async (value: number) => {
    const response = await fetch(Endpoints.coins + "/generate", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (errorText.includes("No available BitSlow combinations")) {
        setRemainingCombinations(0); // 👈 Hide generate button
      }
      throw new Error(errorText);
    }

    // Parse the new coin data from the response
    const newCoin = await response.json();

    // Add the new coin to the state immediately
    if (addCoin) {
      addCoin(newCoin);
    }

    // refresh to make sure we have the latest data
    setTimeout(() => {
      refreshCoins();
    }, 300);

    return newCoin;
  };

  return {
    showGenerateModal,
    setShowGenerateModal,
    remainingCombinations,
    setRemainingCombinations,
    handleGenerate,
  };
};
