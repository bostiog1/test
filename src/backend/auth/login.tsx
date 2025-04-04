import { Database } from "bun:sqlite";
import bcrypt from "bcrypt";
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

interface Client {
  id: number;
  name: string;
  email: string;
  password: string;
}

export function loginUser(db: Database) {
  return async (req: Request) => {
    try {
      // Ensure JWT_SECRET is available
      if (!JWT_SECRET) {
        return new Response(
          JSON.stringify({
            message: "Server misconfiguration: JWT_SECRET not set",
          }),
          {
            status: 500,
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
      }

      const { email, password } = await req.json();
      // Validate input
      if (!email || !password) {
        return new Response(
          JSON.stringify({ message: "Email and password are required" }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
      }
      // Find user in database
      const userQuery = db.query("SELECT * FROM clients WHERE email = ?");
      const user = userQuery.get(email) as Client | null;
      if (!user) {
        return new Response(JSON.stringify({ message: "User not found" }), {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      // Verify password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return new Response(JSON.stringify({ message: "Invalid password" }), {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      // Generate JWT token using the secret from .env
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
      });
      return new Response(
        JSON.stringify({
          message: "Login successful",
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Set-Cookie": `token=${token}; HttpOnly; SameSite=Lax; Secure; Path=/; Max-Age=3600`,
          },
        },
      );
    } catch (error) {
      console.error("Login error:", error);
      return new Response(
        JSON.stringify({ message: "Server error during login" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }
  };
}
