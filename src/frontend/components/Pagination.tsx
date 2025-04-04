import { PaginationProps } from "../types";
import { getVisiblePages } from "../utils/pagination";

export function Pagination({
  itemsPerPage,
  setItemsPerPage,
  currentPage,
  setCurrentPage,
  totalPages,
}: PaginationProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-4 dark:bg-gray-800 gap-4">
      {setItemsPerPage && (
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <span className="dark:text-gray-300 text-sm md:text-base">Show</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded p-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 text-sm md:text-base w-full md:w-auto"
          >
            {[15, 30, 50].map((num) => (
              <option key={num} value={num} className="dark:bg-gray-800">
                {num}
              </option>
            ))}
          </select>
          <span className="dark:text-gray-300 text-sm md:text-base">
            entries
          </span>
        </div>
      )}
      <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-2 py-1 md:px-3 md:py-1 border rounded disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 text-sm md:text-base"
        >
          Previous
        </button>

        {getVisiblePages(currentPage, totalPages).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={`px-2 py-1 md:px-3 md:py-1 border rounded text-sm md:text-base ${
              currentPage === pageNumber
                ? "bg-blue-500 text-white dark:bg-blue-600"
                : "dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
            }`}
          >
            {pageNumber}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-2 py-1 md:px-3 md:py-1 border rounded disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 text-sm md:text-base"
        >
          Next
        </button>
      </div>
    </div>
  );
}
