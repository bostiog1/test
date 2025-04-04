import { useState, useMemo } from "react";
import {
  TransactionsTableProps,
  DateRangeFilter,
  ValueRangeFilter,
} from "../types";
import { TransactionFilters } from "./TransactionFilters";
import { Pagination } from "./Pagination";
import { TransactionTableRow } from "./TransactionTableRow";

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  // Filtering states
  const [dateRangeFilter, setDateRangeFilter] = useState<DateRangeFilter>({
    startDate: "",
    endDate: "",
  });

  const [valueRangeFilter, setValueRangeFilter] = useState<ValueRangeFilter>({
    min: 0,
    max: 100000,
  });

  const [buyerNameFilter, setBuyerNameFilter] = useState("");
  const [sellerNameFilter, setSellerNameFilter] = useState("");

  // Pagination states
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.transaction_date);

      // Date range filter
      const meetsDateRange =
        (!dateRangeFilter.startDate ||
          transactionDate >= new Date(dateRangeFilter.startDate)) &&
        (!dateRangeFilter.endDate ||
          transactionDate <= new Date(dateRangeFilter.endDate));

      // Value range filter
      const meetsValueRange =
        transaction.value >= valueRangeFilter.min &&
        transaction.value <= valueRangeFilter.max;

      // Buyer name filter
      const meetsBuyerNameFilter =
        !buyerNameFilter ||
        transaction.buyer_name
          .toLowerCase()
          .includes(buyerNameFilter.toLowerCase());

      // Seller name filter
      const meetsSellerNameFilter =
        !sellerNameFilter ||
        (transaction.seller_name || "Null")
          .toLowerCase()
          .includes(sellerNameFilter.toLowerCase());

      return (
        meetsDateRange &&
        meetsValueRange &&
        meetsBuyerNameFilter &&
        meetsSellerNameFilter
      );
    });
  }, [
    transactions,
    dateRangeFilter,
    valueRangeFilter,
    buyerNameFilter,
    sellerNameFilter,
  ]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="w-full dark:bg-gray-900 dark:text-gray-100">
      <TransactionFilters
        dateRangeFilter={dateRangeFilter}
        setDateRangeFilter={setDateRangeFilter}
        valueRangeFilter={valueRangeFilter}
        setValueRangeFilter={setValueRangeFilter}
        buyerNameFilter={buyerNameFilter}
        setBuyerNameFilter={setBuyerNameFilter}
        sellerNameFilter={sellerNameFilter}
        setSellerNameFilter={setSellerNameFilter}
      />

      <div className="overflow-x-auto rounded-lg shadow-md dark:shadow-gray-800">
        <table className="w-full border-collapse bg-white dark:bg-gray-800">
          <thead>
            <tr className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <th className="p-2 md:p-4 text-left font-medium text-sm md:text-base">
                ID
              </th>
              <th className="p-2 md:p-4 text-left font-medium text-sm md:text-base">
                BitSlow
              </th>
              <th className="p-2 md:p-4 text-left font-medium text-sm md:text-base">
                Seller
              </th>
              <th className="p-2 md:p-4 text-left font-medium text-sm md:text-base">
                Buyer
              </th>
              <th className="p-2 md:p-4 text-right font-medium text-sm md:text-base">
                Amount
              </th>
              <th className="p-2 md:p-4 text-left font-medium text-sm md:text-base">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.map((transaction, index) => (
              <TransactionTableRow
                key={transaction.id}
                transaction={transaction}
                isLast={index === paginatedTransactions.length - 1}
              />
            ))}
          </tbody>
        </table>

        {paginatedTransactions.length === 0 && (
          <div className="text-center p-4 text-gray-500 dark:text-gray-400 text-sm md:text-base">
            No transactions found matching the current filters.
          </div>
        )}
      </div>

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
