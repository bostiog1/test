import { BellIcon, CogIcon, UserIcon } from "@heroicons/react/24/outline";
import DarkMode from "../components/DarkMode";
import { FaBars } from "react-icons/fa";

interface TopbarProps {
  toggleSidebar: () => void;
}

const Topbar = ({ toggleSidebar }: TopbarProps) => {
  return (
    <div className="flex justify-end items-center p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <button
        onClick={toggleSidebar}
        className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <FaBars className="h-5 w-5 text-gray-600 dark:text-white" />
      </button>
      <div className="flex items-center">
        <DarkMode />
        <button className="p-1">
          <BellIcon className="h-5 w-5 text-gray-600 dark:text-white" />
        </button>
        <button className="p-1">
          <CogIcon className="h-5 w-5 text-gray-600 dark:text-white" />
        </button>
        <button className="p-1">
          <UserIcon className="h-5 w-5 text-gray-600 dark:text-white" />
        </button>
      </div>
    </div>
  );
};

export default Topbar;
