import { useCoinHistory } from "../hooks/useCoinHistory";
import { CoinHistoryModalProps } from "../types";

export function CoinHistoryModal({ coinId, onClose }: CoinHistoryModalProps) {
  const { transactions, loading, error } = useCoinHistory(coinId);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-sm p-4 z-[60]"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg max-w-sm md:max-w-xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg md:text-xl font-bold mb-4 dark:text-gray-200">
          Ownership History
        </h2>

        {loading ? (
          <p className="dark:text-gray-300">Loading history...</p>
        ) : error ? (
          <p className="text-red-500 dark:text-red-400">
            Error loading history: {error}
          </p>
        ) : (
          <div className="max-h-96 overflow-y-auto px-2 md:px-0">
            <div className="space-y-3">
              {transactions.length === 0 ? (
                <p className="dark:text-gray-300">No history found</p>
              ) : (
                transactions.map((txn) => (
                  <div
                    key={txn.id}
                    className="border-b py-2 dark:border-gray-700"
                  >
                    <p className="text-sm md:text-base dark:text-gray-300">
                      {txn.seller_name
                        ? `Sold by ${txn.seller_name} to ${txn.buyer_name}`
                        : `Minted by ${txn.buyer_name}`}
                    </p>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      ${txn.amount} -{" "}
                      {new Date(txn.transaction_date).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-4 px-3 py-1.5 md:px-4 md:py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors w-full md:w-auto text-sm md:text-base"
        >
          Close
        </button>
      </div>
    </div>
  );
}
