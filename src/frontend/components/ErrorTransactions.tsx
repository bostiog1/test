import { ErrorDisplayProps } from "../types";

export function ErrorDisplay({ error }: ErrorDisplayProps) {
  return (
    <div className="text-red-500 dark:text-red-400 p-4 text-center bg-white dark:bg-gray-900">
      Error loading transactions: {error.message}
    </div>
  );
}
