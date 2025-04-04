import { CoinsTable } from "../components/CoinsTable";
import { GenerateCoinModal } from "../components/GenerateCoinModal";
import { useMarketplaceCoins } from "../hooks/useMarketplaceCoins";
import { useMarketplacePage } from "../hooks/useMarketplacePage";
import { useProfileData } from "../hooks/useProfileData";

export function MarketplacePage() {
  const { coins, loading, error, refreshCoins, addCoin, updateCoin } =
    useMarketplaceCoins();
  const { data } = useProfileData();
  const {
    showGenerateModal,
    setShowGenerateModal,
    remainingCombinations,
    handleGenerate,
  } = useMarketplacePage({ refreshCoins, addCoin });

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white dark:bg-gray-900">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 text-center md:text-left">
          BitSlow Marketplace
        </h1>
        {remainingCombinations > 0 && (
          <button
            onClick={() => setShowGenerateModal(true)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm md:text-base w-full md:w-auto"
          >
            Generate Coin
          </button>
        )}
      </div>

      <CoinsTable
        coins={coins}
        onBuySuccess={refreshCoins}
        currentUserName={data?.name || ""}
        updateCoin={updateCoin}
      />

      <GenerateCoinModal
        isOpen={showGenerateModal}
        onClose={() => setShowGenerateModal(false)}
        onGenerate={handleGenerate}
      />
    </div>
  );
}