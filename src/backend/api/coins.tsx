import { Database } from "bun:sqlite";
import { computeBitSlow } from "../utils/bitslow";
import { validateCookieToken } from "../utils/cookieUtils";

// Define interfaces for your coin data
interface CoinRecord {
  coin_id: number;
  value: number;
  bit1: number;
  bit2: number;
  bit3: number;
  owner_name: string;
}

interface EnhancedCoin extends CoinRecord {
  hash: string;
}

// Define a proper type for your cache
interface CoinsCache {
  data: EnhancedCoin[] | null;
  timestamp: number | null;
  expiry: number;
}

const coinsCache: CoinsCache = {
  data: null,
  timestamp: null,
  expiry: 5000,
};

export function getCoins(db: Database) {
  return async (req: Request) => {
    console.log("\n=== COINS REQUEST ===");
    try {
      const cookieHeader = req.headers.get("Cookie");

      const { valid, decoded, token } = validateCookieToken(cookieHeader);

      if (!valid || !decoded) {
        console.log("ERROR: Invalid authentication");
        return Response.json({ message: "Unauthorized" }, { status: 401 });
      }

      if (
        coinsCache.data &&
        coinsCache.timestamp &&
        Date.now() - coinsCache.timestamp < coinsCache.expiry
      ) {
        return Response.json(coinsCache.data);
      }

      const coins = db
        .query(
          `
          SELECT
            c.coin_id,
            c.value,
            c.bit1,
            c.bit2,
            c.bit3,
            cl.name as owner_name
          FROM coins c
          LEFT JOIN clients cl ON c.client_id = cl.id
        `
        )
        .all() as CoinRecord[];

      const enhancedCoins = coins.map((coin) => ({
        ...coin,
        hash: computeBitSlow(coin.bit1, coin.bit2, coin.bit3),
      }));

      coinsCache.data = enhancedCoins;
      coinsCache.timestamp = Date.now();
      console.log("💾 Fetched and cached coins from database");
      return Response.json(enhancedCoins);
    } catch (error) {
      console.error("Error fetching coins:", error);
      return new Response("Error fetching coins", { status: 500 });
    } finally {
      console.log("=== COINS REQUEST END ===\n");
    }
  };
}
