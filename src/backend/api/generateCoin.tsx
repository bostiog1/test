import { Database } from "bun:sqlite";
import { generateDistinctRandomValues } from "../db/utils";
import { validateCookieToken } from "../utils/cookieUtils";

interface CoinBits {
  bit1: number;
  bit2: number;
  bit3: number;
}

export function generateCoinHandler(db: Database) {
  return async (req: Request) => {
    console.log("\n=== GENERATE COIN REQUEST ===");
    try {
      // 1.Get and validate Token
      const cookieHeader = req.headers.get("Cookie");
      const { valid, decoded } = validateCookieToken(cookieHeader);

      if (!valid || !decoded) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), {
          status: 401,
        });
      }

      const userId = decoded.id;
      console.log("Authenticated user ID:", userId);

      // 2. Validate input
      const { value } = await req.json();
      if (typeof value !== "number" || value <= 0) {
        return new Response(JSON.stringify({ message: "Invalid value" }), {
          status: 400,
        });
      }
      console.log("Coin value to generate:", value);

      // 3. Generate unique bits
      // Get existing coins with type assertion
      const usedCombinations = new Set<string>();

      const existingCoins = db
        .query("SELECT bit1, bit2, bit3 FROM coins")
        .all() as CoinBits[];

      existingCoins.forEach((coin) =>
        usedCombinations.add(`${coin.bit1}-${coin.bit2}-${coin.bit3}`),
      );

      let bit1: number, bit2: number, bit3: number;
      let attempts = 0;
      do {
        [bit1, bit2, bit3] = generateDistinctRandomValues(3, 1, 10);
        if (++attempts > 100) {
          return new Response(
            JSON.stringify({ message: "No available BitSlow combinations" }),
            { status: 409 },
          );
        }
      } while (usedCombinations.has(`${bit1}-${bit2}-${bit3}`));
      console.log("Generated bits:", bit1, bit2, bit3);

      // 4. Atomic transaction with added logging
      let newCoinId: number = 0;
      db.transaction(() => {
        // Insert coin
        const coinInsert = db.prepare(`
          INSERT INTO coins (client_id, bit1, bit2, bit3, value)
          VALUES (?, ?, ?, ?, ?)
        `);
        const coinResult = coinInsert.run(userId, bit1, bit2, bit3, value);
        newCoinId = Number(coinResult.lastInsertRowid);
        console.log("New coin ID:", newCoinId);

        // Insert transaction
        const transactionInsert = db.prepare(`
          INSERT INTO transactions (coin_id, seller_id, buyer_id, amount, transaction_date)
          VALUES (?, NULL, ?, ?, ?)
        `);
        const transactionResult = transactionInsert.run(
          newCoinId,
          userId,
          value,
          new Date().toISOString(),
        );
      })();

      // 5. Return new coin
      const newCoin = db
        .query("SELECT * FROM coins WHERE coin_id = ?")
        .get(newCoinId);
      return new Response(JSON.stringify(newCoin), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Generate error:", error);
      return new Response(
        JSON.stringify({
          message: "Failed to generate coin",
          error: String(error),
        }),
        { status: 500 },
      );
    }
  };
}
