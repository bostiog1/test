import jwt from "jsonwebtoken";
import { config } from "dotenv";

// Load environment variables
config();

// Get the JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || "";

// Check if JWT_SECRET is available
if (!JWT_SECRET) {
  console.error("WARNING: JWT_SECRET is not set in environment variables!");
}

export function refreshTokenHandler() {
  return async (req: Request) => {
    try {
      const cookieHeader = req.headers.get("Cookie");

      if (!cookieHeader) {
        return new Response(JSON.stringify({ message: "No cookies found" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Improved cookie parsing
      const cookies = cookieHeader.split(";").reduce(
        (acc, cookie) => {
          const [key, value] = cookie.trim().split("=");
          acc[key] = value;
          return acc;
        },
        {} as Record<string, string>,
      );

      const refreshToken = cookies.refreshToken;

      console.log("Cookies received:", JSON.stringify(cookies));
      console.log("Refresh token found:", refreshToken ? "Yes" : "No");

      if (!refreshToken) {
        return new Response(
          JSON.stringify({ message: "Refresh token not found" }),
          {
            status: 401,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      const decoded = jwt.verify(refreshToken, JWT_SECRET) as jwt.JwtPayload;

      // Generate a new access token
      const accessToken = jwt.sign(
        { id: decoded.id, email: decoded.email },
        JWT_SECRET,
        {
          expiresIn: "1h",
        },
      );

      return new Response(
        JSON.stringify({
          message: "Access token refreshed",
          token: accessToken, // Include token in response body for debugging
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Set-Cookie": `token=${accessToken}; HttpOnly; SameSite=Lax; Secure; Path=/; Max-Age=3600`,
          },
        },
      );
    } catch (error) {
      console.error("Refresh token verification failed:", error);
      return new Response(
        JSON.stringify({
          message: "Invalid or expired refresh token",
          error: (error as Error).message,
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  };
}
