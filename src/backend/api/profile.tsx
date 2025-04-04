import { Database } from "bun:sqlite";
import { validateCookieToken } from "../utils/cookieUtils";

interface User {
  name: string;
}

interface CountResult {
  count: number;
}

interface TotalValueResult {
  total: number;
}

export function getProfileHandler(db: Database) {
  return async (req: Request) => {
    console.log("\n=== PROFILE REQUEST ===");
    try {
      // Get and validate Token
      const cookieHeader = req.headers.get("Cookie");
      const { valid, decoded } = validateCookieToken(cookieHeader);

      if (!valid || !decoded) {
        console.log("ERROR: Invalid token");
        return Response.json({ message: "Unauthorized" }, { status: 401 });
      }

      const userId = decoded.id;
      console.log("Decoded JWT:", decoded);

      // 👇 NEW: Get user name
      const user = db
        .query("SELECT name FROM clients WHERE id = ?")
        .get(userId) as User | undefined; // Use undefined in case no user is found

      if (!user) {
        return Response.json({ message: "User not found" }, { status: 404 });
      }

      // Get profile data
      const transactionsCount =
        (
          db
            .query(
              "SELECT COUNT(*) as count FROM transactions WHERE buyer_id = ? OR seller_id = ?",
            )
            .get(userId, userId) as CountResult | undefined
        )?.count || 0;

      const coinsOwned =
        (
          db
            .query("SELECT COUNT(*) as count FROM coins WHERE client_id = ?")
            .get(userId) as CountResult | undefined
        )?.count || 0;

      const totalValue =
        (
          db
            .query("SELECT SUM(value) as total FROM coins WHERE client_id = ?")
            .get(userId) as TotalValueResult | undefined
        )?.total || 0;

      return Response.json({
        name: user.name,
        transactions: Number(transactionsCount),
        coinsOwned: Number(coinsOwned),
        totalValue: Number(totalValue),
      });
    } catch (error) {
      console.error("Profile error:", error);
      return Response.json({ message: "Server error" }, { status: 500 });
    } finally {
      console.log("=== PROFILE REQUEST END ===\n");
    }
  };
}
