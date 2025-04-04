import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthService from "../service/AuthService";
import { Endpoints } from "../utils/Endpoints";
export const AuthListener = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const publicPaths = ["/", Endpoints.register, Endpoints.login];
    const isPublicPath = publicPaths.includes(location.pathname);

    const checkAuth = async () => {
      try {
        const isAuthenticated = await AuthService.isAuthenticated();

        if (isAuthenticated && isPublicPath) {
          await AuthService.logout();
          navigate(location.pathname, { replace: true });
        }
      } catch (error) {
        // console.error("Auth check failed:", error);
      }
    };

    checkAuth();
  }, [location, navigate]);

  return null;
};
