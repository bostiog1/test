import { CoinsTableProps } from "../types";
import { CoinFilters } from "./CoinFilters";
import { CoinHistoryModal } from "./CoinHistoryModal";
import { Pagination } from "./Pagination";
import { useCoinsTable } from "../hooks/useCoinsTable";

export function CoinsTable({
  coins,
  onBuySuccess,
  currentUserName,
  updateCoin,
}: CoinsTableProps) {
  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    filter,
    setFilter,
    selectedCoinId,
    setSelectedCoinId,
    handleBuy,
    totalPages,
    paginatedCoins,
  } = useCoinsTable({ coins, onBuySuccess, currentUserName, updateCoin });

  return (
    <div className="overflow-x-auto rounded-lg shadow-md dark:shadow-gray-800">
      <CoinFilters filter={filter} setFilter={setFilter} />

      <table className="w-full border-collapse bg-white dark:bg-gray-800">
        <thead>
          <tr className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
            <th className="p-2 md:p-4 text-left text-sm md:text-base">Hash</th>
            <th className="p-2 md:p-4 text-left text-sm md:text-base">
              Component Numbers
            </th>
            <th className="p-2 md:p-4 text-left text-sm md:text-base">Value</th>
            <th className="p-2 md:p-4 text-left text-sm md:text-base">Owner</th>
            <th className="p-2 md:p-4 text-left text-sm md:text-base">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedCoins.map((coin) => {
            return (
              <tr key={coin.coin_id} className="border-t dark:border-gray-700">
                <td className="p-2 md:p-4 text-sm md:text-base">
                  {/* Mobile: show only 8 chars */}
                  <span className="md:hidden">
                    {coin.hash?.slice(0, 5) ?? "N/A"}...
                  </span>
                  {/* Desktop: show only 15 chars */}
                  <span className="hidden md:inline">
                    {coin.hash?.slice(0, 15) ?? "N/A"}...
                  </span>
                </td>
                <td className="p-2 md:p-4 text-sm md:text-base">
                  Bits: {coin.bit1}, {coin.bit2}, {coin.bit3}
                </td>
                <td className="p-2 md:p-4 text-sm md:text-base">
                  ${coin.value.toLocaleString()}
                </td>
                <td className="p-2 md:p-4 text-sm md:text-base">
                  {coin.owner_name || "Unowned"}
                </td>
                <td className="p-2 md:p-4">
                  {!coin.owner_name ? (
                    <button
                      onClick={() => handleBuy(coin.coin_id)}
                      className="bg-blue-500 text-white px-2 py-1 md:px-3 md:py-1 rounded hover:bg-blue-600 text-sm md:text-base"
                    >
                      Buy
                    </button>
                  ) : (
                    <button
                      onClick={() => setSelectedCoinId(coin.coin_id)}
                      className="text-blue-500 hover:underline text-sm md:text-base"
                    >
                      History
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>

        {selectedCoinId && (
          <CoinHistoryModal
            coinId={selectedCoinId}
            onClose={() => setSelectedCoinId(null)}
          />
        )}
      </table>

      <Pagination
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
