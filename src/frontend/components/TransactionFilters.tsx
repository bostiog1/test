import { TransactionFiltersProps } from "../types";

export function TransactionFilters({
  dateRangeFilter,
  setDateRangeFilter,
  valueRangeFilter,
  setValueRangeFilter,
  buyerNameFilter,
  setBuyerNameFilter,
  sellerNameFilter,
  setSellerNameFilter,
}: TransactionFiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-100 dark:bg-gray-800">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Date Range
        </label>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <input
            type="date"
            value={dateRangeFilter.startDate}
            onChange={(e) =>
              setDateRangeFilter({
                ...dateRangeFilter,
                startDate: e.target.value,
              })
            }
            className="border rounded p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          />
          <input
            type="date"
            value={dateRangeFilter.endDate}
            onChange={(e) =>
              setDateRangeFilter({
                ...dateRangeFilter,
                endDate: e.target.value,
              })
            }
            className="border rounded p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          BitSlow Value Range
        </label>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <input
            type="number"
            placeholder="Min Value"
            value={valueRangeFilter.min}
            onChange={(e) =>
              setValueRangeFilter({
                ...valueRangeFilter,
                min: Number(e.target.value),
              })
            }
            className="border rounded p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          />
          <input
            type="number"
            placeholder="Max Value"
            value={valueRangeFilter.max}
            onChange={(e) =>
              setValueRangeFilter({
                ...valueRangeFilter,
                max: Number(e.target.value),
              })
            }
            className="border rounded p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Seller Name
        </label>
        <input
          type="text"
          placeholder="Search Seller"
          value={sellerNameFilter}
          onChange={(e) => setSellerNameFilter(e.target.value)}
          className="border rounded p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Buyer Name
        </label>
        <input
          type="text"
          placeholder="Search Buyer"
          value={buyerNameFilter}
          onChange={(e) => setBuyerNameFilter(e.target.value)}
          className="border rounded p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
        />
      </div>
    </div>
  );
}
