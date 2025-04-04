import { LoadingIndicatorProps } from "../types";

export function LoadingIndicator({ loadingTime }: LoadingIndicatorProps) {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-16 h-16 mb-4 border-t-4 border-b-4 border-blue-500 dark:border-blue-400 rounded-full animate-spin"></div>
      <div className="animate-pulse flex flex-col items-center">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Loading Transactions
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Time elapsed: {loadingTime} seconds
        </p>
        <div className="flex space-x-1">
          <div
            className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
