import { Database } from "bun:sqlite";
import bcrypt from "bcrypt";

export function registerUser(db: Database) {
  return async (req: Request) => {
    const { email, password, name, phone } = await req.json();

    // Validate input
    if (!email || !password || !name || !phone) {
      return new Response("All fields are required", { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Insert user into database
    try {
      db.query(
        "INSERT INTO clients (name, email, phone, password) VALUES (?, ?, ?, ?)",
      ).run(name, email, phone, hashedPassword);
      return new Response("User registered", { status: 201 });
    } catch (error) {
      console.error("Error registering user:", error);
      return new Response("Error registering user", { status: 500 });
    }
  };
}
