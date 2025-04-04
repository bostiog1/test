import { Database } from "bun:sqlite";
import { seedDatabase } from "../db/seed";
import { validateCookieToken } from "../utils/cookieUtils";

export function resetDatabaseHandler(db: Database) {
  return async (req: Request) => {
    console.log("\n=== RESET DATABASE REQUEST ===");
    try {
      const cookieHeader = req.headers.get("Cookie");
      const { valid, decoded } = validateCookieToken(cookieHeader);

      if (!valid || !decoded) {
        console.log("ERROR: Invalid token - Cannot reset database");
        return Response.json({ message: "Unauthorized" }, { status: 401 });
      }

      console.log("Valid token found. Proceeding with database reset.");

      seedDatabase(db, {
        clientCount: 30,
        bitSlowCount: 20,
        transactionCount: 50,
        clearExisting: true,
        forceSeed: true,
      });
      console.log("Database reset and reseeded successfully.");
      return new Response("Database reset and reseeded successfully", {
        status: 200,
      });
    } catch (error) {
      console.error("Error resetting database:", error);
      return new Response("Error resetting database", { status: 500 });
    } finally {
      console.log("=== RESET DATABASE REQUEST END ===\n");
    }
  };
}
