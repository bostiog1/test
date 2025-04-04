export const Home = () => {
  return (
    <div className="dark:bg-gray-900 dark:text-white flex items-center justify-center py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
              Welcome to Our Awesome Project!
            </h1>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg">
              This project is designed to be a platform for managing and trading
              digital assets. We aim to provide a secure, user-friendly, and
              efficient experience for individuals looking to engage with the
              exciting world of cryptocurrencies and digital collectibles.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  Key Features
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>Secure Transaction Management</li>
                  <li>Real-time Asset Tracking</li>
                  <li>User-friendly Interface</li>
                  <li>Robust Authentication</li>
                  <li>Detailed Transaction History</li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  Our Mission
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Our mission is to empower users with the tools and information
                  they need to confidently navigate the digital asset landscape.
                  We are committed to security, transparency, and continuous
                  improvement.
                </p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Thank you for being part of our journey!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
