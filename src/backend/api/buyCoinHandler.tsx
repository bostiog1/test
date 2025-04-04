import { Database } from "bun:sqlite";
import { validateCookieToken } from "../utils/cookieUtils";

interface Coin {
  coin_id: number;
  client_id: number | null;
  value: number;
}

export function buyCoinHandler(db: Database) {
  return async (req: Request) => {
    try {
      console.log("\n=== BUY REQUEST STARTED ===");
      console.log("Request URL:", req.url);

      // 1. Validate cookie and token
      const cookieHeader = req.headers.get("Cookie");

      // Use the validation utility
      const { valid, decoded } = validateCookieToken(cookieHeader);

      if (!valid || !decoded) {
        console.log("ERROR: Invalid or missing token");
        return new Response(JSON.stringify({ message: "Unauthorized" }), {
          status: 401,
        });
      }

      const buyerId = (decoded as { id: number }).id;

      // 3. Get coin ID from URL
      const url = new URL(req.url);
      console.log("Full URL Path:", url.pathname);

      const segments = url.pathname.split("/");

      const coinId = segments[3]; // Should be "17" for /api/coins/17/buy

      if (!coinId || isNaN(Number(coinId))) {
        console.log("ERROR: Invalid Coin ID -", coinId);
        return new Response(JSON.stringify({ message: "Invalid coin ID" }), {
          status: 400,
        });
      }

      // 4. Check coin availability
      const coin = db
        .query("SELECT coin_id, client_id, value FROM coins WHERE coin_id = ?")
        .get(Number(coinId)) as Coin | undefined;

      if (!coin) {
        return new Response(JSON.stringify({ message: "Coin not found" }), {
          status: 404,
        });
      }
      if (coin.client_id !== null) {
        console.log("Coin already owned");
        return new Response(JSON.stringify({ message: "Coin already owned" }), {
          status: 409,
        });
      }

      // 5. Update ownership & create transaction (atomic operation)
      db.transaction(() => {
        // Update coin owner
        db.query("UPDATE coins SET client_id = ? WHERE coin_id = ?").run(
          buyerId,
          Number(coinId),
        );

        console.log("Coin ownership updated");

        // Create transaction (seller_id is null for initial purchase)
        db.query(
          `
          INSERT INTO transactions (coin_id, seller_id, buyer_id, amount, transaction_date)
          VALUES (?, ?, ?, ?, ?)
        `,
        ).run(
          Number(coinId),
          null, // Seller ID (null = system/mint)
          buyerId,
          coin.value,
          new Date().toISOString(),
        );

        console.log("Transaction created");
      })();

      return new Response(JSON.stringify({ message: "Purchase successful" }), {
        status: 200,
      });
    } catch (error) {
      console.error("Buy error:", error);
      return new Response(
        JSON.stringify({ message: "Server error during purchase" }),
        { status: 500 },
      );
    }
  };
}
