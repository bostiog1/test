import { useNavigate } from "react-router-dom";
import AuthService from "../service/AuthService";
import { UseLogoutResult } from "../types";

export const useLogout = (): UseLogoutResult => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await AuthService.logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return { logout };
};
