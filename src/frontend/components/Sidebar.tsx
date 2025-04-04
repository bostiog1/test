import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import userImage from "../../assets/user.png";
import Logout from "../pages/Logout";

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isCollapsed, toggleSidebar }: SidebarProps) => {
  const location = useLocation();

  return (
    <div
      className={`
        fixed md:relative
        flex flex-col
        h-screen
        z-50
        bg-white dark:bg-gray-800
        text-gray-900 dark:text-white
        border-gray-200 dark:border-gray-700
        transition-[width] duration-300
        ${
          isCollapsed
            ? "-translate-x-full md:translate-x-0 md:w-20"
            : "translate-x-0 w-64"
        }
      `}
    >
      {/* Sidebar Header */}
      <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
        {!isCollapsed && (
          <h1 className="text-xl font-bold dark:text-white mr-auto">
            Admin Panel
          </h1>
        )}
        <button
          onClick={toggleSidebar}
          className={`p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none ${
            isCollapsed ? "mx-auto" : ""
          }`}
        >
          <FaBars className="text-gray-900 dark:text-white" />
        </button>
      </div>

      <nav className="flex-1 p-4">
        {!isCollapsed && (
          <div className="mb-2">
            <div className="flex items-center justify-center">
              <img
                alt="profile-user"
                width="100px"
                height="100px"
                src={userImage}
                style={{ borderRadius: "50%" }}
              />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-700 dark:text-white mt-2">
                Coin Master
              </h2>
            </div>
          </div>
        )}

        <div className="p-2">
          <div>
            <Link
              to="/dashboard"
              className={`flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 ${
                location.pathname === "/dashboard"
                  ? "bg-blue-100 dark:bg-gray-700"
                  : ""
              }`}
            >
              <span className="text-xl">🏠</span>
              {!isCollapsed && (
                <span className="ml-3 dark:text-white">Home</span>
              )}
            </Link>

            <Link
              to="/dashboard/profile"
              className={`flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 ${
                location.pathname === "/dashboard/profile"
                  ? "bg-blue-100 dark:bg-gray-700"
                  : ""
              }`}
            >
              <span className="text-xl">🧑‍💼</span>
              {!isCollapsed && (
                <span className="ml-3 dark:text-white">Profile</span>
              )}
            </Link>
            <Link
              to="/dashboard/marketplace"
              className={`flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 ${
                location.pathname === "/dashboard/marketplace"
                  ? "bg-blue-100 dark:bg-gray-700"
                  : ""
              }`}
            >
              <span className="text-xl">🏪</span>
              {!isCollapsed && (
                <span className="ml-3 dark:text-white">Marketplace</span>
              )}
            </Link>
            <Link
              to="/dashboard/transactions"
              className={`flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 ${
                location.pathname === "/dashboard/transactions"
                  ? "bg-blue-100 dark:bg-gray-700"
                  : ""
              }`}
            >
              <span className="text-xl">💸</span>
              {!isCollapsed && (
                <span className="ml-3 dark:text-white">Transactions</span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="flex justify-center p-4 border-t border-gray-200 dark:border-gray-700">
        {!isCollapsed && <Logout />}
      </div>
    </div>
  );
};

export default Sidebar;
