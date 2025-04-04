import { serve } from "bun";
import { initializeDatabase } from "./db";
import { getTransactions } from "./api/transactions";
import { registerUser } from "./auth/register";
import { loginUser } from "./auth/login";
import { seedDatabase } from "./db/seed";
import { logoutUser } from "./auth/logout";
import { getCoins } from "./api/coins";
import { buyCoinHandler } from "./api/buyCoinHandler";
import { getProfileHandler } from "./api/profile";
import { generateCoinHandler } from "./api/generateCoin";
import { getCoinHistoryHandler } from "./api/transactionHistory";
import { validateTokenHandler } from "./auth/validateToken";
import { getClients } from "./api/clients";
import { refreshTokenHandler } from "./auth/refreshTokenHandler";

const db = initializeDatabase();

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:5173", // Make sure this matches your frontend URL
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Expose-Headers": "Set-Cookie",
};

type ApiHandler = (req: Request) => Promise<Response>;

const server = serve({
  port: 8089,
  fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname;

    // Handle preflight OPTIONS requests
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          ...corsHeaders,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
        },
      });
    }

    const handleApiResponse = async (
      apiHandler: ApiHandler,
    ): Promise<Response> => {
      try {
        const response = await apiHandler(req);

        // Create new headers combining CORS and response headers
        const combinedHeaders = new Headers(corsHeaders);

        // Copy all headers from the response
        if (response.headers) {
          response.headers.forEach((value: string, key: string) => {
            combinedHeaders.set(key, value);
          });
        }

        return new Response(response.body, {
          status: response.status,
          headers: combinedHeaders,
        });
      } catch (error) {
        console.error("API Error:", error);
        return new Response("Internal Server Error", {
          status: 500,
          headers: corsHeaders,
        });
      }
    };

    // API routes
    if (path === "/api/transactions") {
      return handleApiResponse(getTransactions(db));
    }
    if (path === "/api/coins") {
      return handleApiResponse(getCoins(db));
    }
    if (path === "/api/clients") {
      return handleApiResponse(getClients(db));
    }
    if (path === "/api/register") {
      return handleApiResponse(registerUser(db));
    }
    if (path === "/api/login") {
      return handleApiResponse(loginUser(db));
    }
    if (path.startsWith("/api/coins/") && req.method === "POST") {
      const segments = path.split("/");
      const coinId = segments[3]; // Correct position for coin ID
      const action = segments[4]; // "buy"

      if (action === "buy") {
        return handleApiResponse(buyCoinHandler(db));
      }
    }
    if (path === "/api/profile") {
      return handleApiResponse(getProfileHandler(db));
    }
    if (path === "/api/coins/generate" && req.method === "POST") {
      return handleApiResponse(generateCoinHandler(db));
    }
    if (path === "/api/transactions/history") {
      return handleApiResponse(getCoinHistoryHandler(db));
    }
    if (path === "/api/logout" && req.method === "POST") {
      return handleApiResponse(logoutUser(db));
    }
    if (path === "/api/reset") {
      seedDatabase(db, {
        clientCount: 30,
        bitSlowCount: 20,
        transactionCount: 50,
        clearExisting: true, // Clear existing data
        forceSeed: true, // Force seeding
      });
      return new Response("Database reset and reseeded", { status: 200 });
    }

    if (path === "/api/validate-token") {
      return handleApiResponse(validateTokenHandler());
    }

    if (path === "/api/refresh-token") {
      // Add the new route
      return handleApiResponse(refreshTokenHandler());
    }

    console.log("Unmatched route:", {
      path,
      method: req.method,
      fullUrl: req.url,
    });

    return new Response("Not Found", {
      status: 404,
      headers: corsHeaders,
    });
  },
});

console.log(`🚀 Server running at ${server.url}`);
