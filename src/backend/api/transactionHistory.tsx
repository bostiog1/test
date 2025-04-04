import { Database } from "bun:sqlite";
import { validateCookieToken } from "../utils/cookieUtils";

export function getCoinHistoryHandler(db: Database) {
  return async (req: Request) => {
    try {
      const cookieHeader = req.headers.get("Cookie");
      const { valid, decoded } = validateCookieToken(cookieHeader);

      if (!valid || !decoded) {
        console.log("Unauthorized history access attempt");
        return new Response("Unauthorized", { status: 401 });
      }

      const url = new URL(req.url);
      const coinId = url.searchParams.get("coinId");

      if (!coinId || isNaN(Number(coinId))) {
        return new Response("Invalid coin ID", { status: 400 });
      }

      const transactions = db
        .query(
          `
        SELECT t.*, 
          buyer.name as buyer_name,
          seller.name as seller_name
        FROM transactions t
        LEFT JOIN clients buyer ON t.buyer_id = buyer.id
        LEFT JOIN clients seller ON t.seller_id = seller.id
        WHERE t.coin_id = ?
        ORDER BY t.transaction_date DESC
      `,
        )
        .all(Number(coinId));

      console.log("\n=== HISTORY REQUEST ===");
      console.log("Coin ID:", coinId);
      console.log("Transactions found:", transactions.length);

      console.log(
        "Transaction details:",
        JSON.stringify(transactions, null, 2),
      );
      return Response.json(transactions);
    } catch (error) {
      console.error("History error:", error);
      return new Response("Server error", { status: 500 });
    }
  };
}
