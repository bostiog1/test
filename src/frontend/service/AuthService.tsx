import axios, { AxiosResponse, AxiosError } from "axios";
import Endpoints from "../utils/Endpoints";

interface RegistrationData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  mobile: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

const api = axios.create({
  baseURL: "http://localhost:8089", // your backend URL
  withCredentials: true,
});

class AuthService {
  async register(userData: RegistrationData): Promise<AxiosResponse<any, any>> {
    // Add a register method
    try {
      const response = await api.post(
        Endpoints.registerBack,
        {
          email: userData.email,
          password: userData.password,
          name: `${userData.firstName} ${userData.lastName}`,
          phone: userData.mobile,
        },
        {
          validateStatus: (status) => status < 500,
        },
      );

      return response;
    } catch (error: any) {
      console.error(
        "❌ Registration failed:",
        (error as AxiosError)?.response?.data || error.message,
      );
      throw error;
    }
  }
  async login(credentials: LoginCredentials): Promise<any> {
    try {
      const response = await api.post(Endpoints.loginBack, credentials);

      if (response.status === 200) {
        console.log("✅ Login successful");

        return response.data;
      }
    } catch (error: any) {
      // console.error(
      //   "❌ Login failed:",
      //   (error as AxiosError)?.response?.data || error.message
      // );
      throw error;
    }
  }
  async isAuthenticated(): Promise<boolean> {
    try {
      const response = await api.get(Endpoints.validateToken);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  async refreshToken(): Promise<string | undefined> {
    try {
      const response = await api.post(Endpoints.refreshToken, null);

      if (response.status === 200) {
        console.log("✅ Token refreshed");
        return response.data.token;
      }
    } catch (error: any) {
      console.error(
        "❌ Failed to refresh token:",
        (error as AxiosError)?.response?.data || error.message,
      );
      throw error;
    }
  }

  async logout(): Promise<any> {
    try {
      const response = await axios.post(
        Endpoints.logout,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      // Clear any client-side tokens
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      return response.data;
    } catch (error: any) {
      console.error("❌ Detailed Logout Error:", {
        message: error.message,
        response: (error as AxiosError)?.response?.data,
        status: (error as AxiosError)?.response?.status,
        headers: (error as AxiosError)?.response?.headers,
      });
      throw error;
    }
  }
}

export default new AuthService();
