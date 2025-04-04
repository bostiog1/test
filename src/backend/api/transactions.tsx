import { Database } from "bun:sqlite";
import { computeBitSlow } from "../utils/bitslow";
import { validateCookieToken } from "../utils/cookieUtils";

interface TransactionRecord {
  id: number;
  coin_id: number;
  amount: number;
  transaction_date: string;
  seller_id: number | null;
  seller_name: string | null;
  buyer_id: number;
  buyer_name: string;
  bit1: number;
  bit2: number;
  bit3: number;
  value: number;
}

interface EnhancedTransaction extends TransactionRecord {
  computedBitSlow: string;
}

interface TransactionsCache {
  data: EnhancedTransaction[] | null;
  timestamp: number | null;
  expiry: number;
}

const transactionsCache: TransactionsCache = {
  data: null,
  timestamp: null,
  expiry: 5000,
};

export function getTransactions(db: Database) {
  return async (req: Request) => {
    console.log("\n=== TRANSACTIONS REQUEST ===");
    try {
      const cookieHeader = req.headers.get("Cookie");
      const { valid, decoded } = validateCookieToken(cookieHeader);

      if (!valid || !decoded) {
        console.log("ERROR: Invalid or missing token");
        return Response.json({ message: "Unauthorized" }, { status: 401 });
      }

      if (
        transactionsCache.data &&
        transactionsCache.timestamp &&
        Date.now() - transactionsCache.timestamp < transactionsCache.expiry
      ) {
        console.log("✅ Serving transactions from cache");
        return Response.json(transactionsCache.data);
      }

      const transactions = db
        .query(
          `
          SELECT
            t.id,
            t.coin_id,
            t.amount,
            t.transaction_date,
            seller.id as seller_id,
            seller.name as seller_name,
            buyer.id as buyer_id,
            buyer.name as buyer_name,
            c.bit1,
            c.bit2,
            c.bit3,
            c.value
          FROM transactions t
          LEFT JOIN clients seller ON t.seller_id = seller.id
          JOIN clients buyer ON t.buyer_id = buyer.id
          JOIN coins c ON t.coin_id = c.coin_id
          WHERE t.seller_id IS NOT NULL OR t.seller_id IS NULL
          ORDER BY t.transaction_date DESC
        `,
        )
        .all() as TransactionRecord[];

      const enhancedTransactions: EnhancedTransaction[] = transactions.map(
        (transaction) => ({
          ...transaction,
          seller_name: transaction.seller_id ? transaction.seller_name : "null",
          computedBitSlow: computeBitSlow(
            transaction.bit1,
            transaction.bit2,
            transaction.bit3,
          ),
        }),
      );

      transactionsCache.data = enhancedTransactions;
      transactionsCache.timestamp = Date.now();
      console.log("💾 Fetched and cached transactions from database");
      return Response.json(enhancedTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return new Response("Error fetching transactions", { status: 500 });
    } finally {
      console.log("=== TRANSACTIONS REQUEST END ===\n");
    }
  };
}
