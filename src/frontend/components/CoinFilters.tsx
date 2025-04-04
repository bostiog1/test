import { CoinFiltersProps } from "../types";

export function CoinFilters({ filter, setFilter }: CoinFiltersProps) {
  return (
    <div className="p-2 md:p-4 bg-gray-100 dark:bg-gray-800 mb-4">
      <select
        value={filter}
        onChange={(e) =>
          setFilter(e.target.value as "all" | "available" | "owned")
        }
        className="border rounded p-1 md:p-2 dark:bg-gray-700 dark:text-gray-300 w-full md:w-auto text-sm md:text-base"
      >
        <option value="all">All Coins</option>
        <option value="available">Available Only</option>
        <option value="owned">Owned by Me</option>
      </select>
    </div>
  );
}
