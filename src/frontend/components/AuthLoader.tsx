export const AuthLoader = () => (
  <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-center">
    <div className="flex flex-col items-center">
      <div className="flex space-x-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-3 w-3 rounded-full bg-blue-500 dark:bg-blue-400 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
      <p className="mt-4 text-gray-600 dark:text-gray-300">
        Verifying session...
      </p>
    </div>
  </div>
);
