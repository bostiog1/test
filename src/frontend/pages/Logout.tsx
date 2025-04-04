import { useLogout } from "../hooks/useLogout";

const Logout = () => {
  const { logout } = useLogout();

  return (
    <button
      onClick={logout}
      className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md shadow-md cursor-pointer hover:bg-red-700 transition duration-300"
    >
      Logout
    </button>
  );
};

export default Logout;
