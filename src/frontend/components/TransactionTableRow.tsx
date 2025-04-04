import { TransactionTableRowProps } from "../types";

export function TransactionTableRow({
  transaction,
  isLast,
}: TransactionTableRowProps) {
  return (
    <tr
      className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
        isLast ? "" : "border-b border-gray-200 dark:border-gray-700"
      }`}
    >
      <td className="p-2 md:p-4 text-gray-600 dark:text-gray-300 text-sm md:text-base">
        {transaction.id}
      </td>
      <td className="p-2 md:p-4">
        <div>
          <div className="font-medium text-gray-800 dark:text-gray-200 text-sm md:text-base">
            <span className="md:hidden font-medium text-gray-800 dark:text-gray-200 text-sm">
              {/* Mobile: show only 8 chars  */}
              {transaction.computedBitSlow?.slice(0, 5) ?? "N/A"}...
            </span>

            {/* Desktop: show only 15 chars  */}
            <span className="hidden md:inline font-medium text-gray-800 dark:text-gray-200 text-sm md:text-base">
              {transaction.computedBitSlow?.slice(0, 15) ?? "N/A"}...
            </span>
          </div>
          <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Bits: {transaction.bit1}, {transaction.bit2}, {transaction.bit3}
          </div>
          <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
            Value: ${transaction.value.toLocaleString()}
          </div>
        </div>
      </td>
      <td className="p-2 md:p-4 text-gray-700 dark:text-gray-300 text-sm md:text-base">
        {transaction.seller_name || "Null"}
      </td>
      <td className="p-2 md:p-4 text-gray-700 dark:text-gray-300 text-sm md:text-base">
        {transaction.buyer_name}
      </td>
      <td className="p-2 md:p-4 text-right font-semibold text-gray-800 dark:text-gray-200 text-sm md:text-base">
        ${transaction.amount.toLocaleString()}
      </td>
      <td className="p-2 md:p-4 text-sm text-gray-600 dark:text-gray-400">
        {new Date(transaction.transaction_date).toLocaleString()}
      </td>
    </tr>
  );
}
