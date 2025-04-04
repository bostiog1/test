export const Loading = () => (
  <div className="flex justify-center space-x-1">
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="h-3 w-3 rounded-full bg-gray-400 dark:bg-gray-500"
        style={{
          animation: `wave 1s ease-in-out infinite`,
          animationDelay: `${i * 0.15}s`,
        }}
      />
    ))}
  </div>
);

export default Loading;
