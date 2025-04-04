import { useEffect, useState } from "react";
import { GenerateCoinModalProps } from "../types";

export function GenerateCoinModal({
  isOpen,
  onClose,
  onGenerate,
}: GenerateCoinModalProps) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setValue("");
      setError("");
      setLoading(false);
    }
  }, [isOpen]); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const numericValue = parseFloat(value);
    if (isNaN(numericValue) || numericValue <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    setLoading(true);
    try {
      await onGenerate(numericValue);
      // Set a small timeout before closing the modal to ensure the refresh completes
      setTimeout(() => {
        onClose();
      }, 300);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate coin");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-sm p-4 z-[60]"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg w-full max-w-sm md:max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg md:text-xl font-bold mb-4 dark:text-gray-200">
          Generate New BitSlow
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">
              Value
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full p-2 text-sm md:text-base border rounded dark:bg-gray-700 dark:border-gray-600"
              placeholder="Enter amount"
              step="0.01"
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="flex flex-col md:flex-row justify-end gap-2 md:gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm md:text-base bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm md:text-base bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
