import { ErrorDisplay } from "../components/ErrorTransactions";
import Loading from "../components/Loading";
import { useProfileData } from "../hooks/useProfileData";
import {
  SparklesIcon,
  CurrencyDollarIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/solid";

export function ProfilePage() {
  const { data, loading, error } = useProfileData();

  if (loading) return <Loading />;
  if (error) return <ErrorDisplay error={error} />;
  return (
    <div className="max-w-7xl mx-4 md:mx-auto p-4 bg-white dark:bg-gray-900">
      <header className="mb-6 md:mb-8 pb-4 md:pb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2 md:gap-3">
          <SparklesIcon className="h-6 w-6 md:h-8 md:w-8 text-yellow-500" />
          Your Profile
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Transactions Card */}
        <div className="relative group bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-transparent dark:from-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          <div className="relative">
            <ArrowsRightLeftIcon className="h-6 w-6 md:h-8 md:w-8 text-blue-600 dark:text-blue-400 mb-3 md:mb-4" />
            <h3 className="text-base md:text-lg font-semibold text-gray-700 dark:text-gray-300">
              Total Transactions
            </h3>
            <p className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1 md:mt-2">
              {data?.transactions?.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Coins Owned Card */}
        <div className="relative group bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-transparent dark:from-green-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          <div className="relative">
            <CurrencyDollarIcon className="h-6 w-6 md:h-8 md:w-8 text-green-600 dark:text-green-400 mb-3 md:mb-4" />
            <h3 className="text-base md:text-lg font-semibold text-gray-700 dark:text-gray-300">
              Coins Owned
            </h3>
            <p className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400 mt-1 md:mt-2">
              {data?.coinsOwned?.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Total Value Card */}
        <div className="relative group bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-transparent dark:from-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          <div className="relative">
            <div className="h-6 w-6 md:h-8 md:w-8 bg-purple-600 dark:bg-purple-400 rounded-full flex items-center justify-center mb-3 md:mb-4">
              <span className="text-sm md:text-base text-white dark:text-gray-900 font-bold">
                $
              </span>
            </div>
            <h3 className="text-base md:text-lg font-semibold text-gray-700 dark:text-gray-300">
              Portfolio Value
            </h3>
            <p className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400 mt-1 md:mt-2">
              ${data?.totalValue?.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
