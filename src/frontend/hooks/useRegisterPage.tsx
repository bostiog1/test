import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../service/AuthService";
import { UseRegisterPageProps, UseRegisterPageResult } from "../types";

interface RegisterErrorResponse {
  data?: string; 
}

interface CustomRegisterError extends Error {
  response?: {
    status?: number;
    data?: RegisterErrorResponse;
  };
}

export const useRegisterPage = ({
  setError,
}: UseRegisterPageProps): UseRegisterPageResult => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleRegister = async (data: any) => {
    setIsSubmitting(true);
    setServerError("");

    try {
      const response = await AuthService.register(data);

      if (response.status === 201) {
        navigate("/login", {
          state: { fromRegister: true },
        });
      } else {
        const errorMsg = response.data || "Registration failed";

        if (
          errorMsg.includes("duplicate") ||
          errorMsg.includes("already exists")
        ) {
          setError("email", {
            type: "manual",
            message: "Email already registered",
          });
          setError("mobile", {
            type: "manual",
            message: "Phone number already registered",
          });
        } else {
          setServerError(errorMsg);
        }
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      const customError = error as CustomRegisterError;

      if (customError.response?.status === 500) {
        setServerError("This email or phone number is already registered");
      } else {
        setServerError("Network error. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, serverError, handleRegister };
};
