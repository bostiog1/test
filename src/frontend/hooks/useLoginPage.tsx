import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../service/AuthService";
import Endpoints from "../utils/Endpoints";
import { UseLoginPageResult } from "../types";

interface LoginErrorResponse {
  message?: string;
}

interface CustomError extends Error {
  response?: {
    data?: LoginErrorResponse;
  };
}

export const useLoginPage = (): UseLoginPageResult => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      await AuthService.login({
        email: data.email,
        password: data.password,
      });

      console.log("Login successful!");
      navigate(Endpoints.dashboard, { replace: true });
    } catch (error: any) {
      const customError = error as CustomError;
      console.error(
        "Login failed:",
        customError.response?.data?.message || customError.message,
      );
      setMessage(
        customError.response?.data?.message ||
          customError.message ||
          "Login failed. Please try again.",
      );
    }
  };

  return { message, setMessage, handleLogin };
};
