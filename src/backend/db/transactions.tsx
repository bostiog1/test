import { Database } from "bun:sqlite";

interface CoinValueResult {
  value: number;
}
export function seedTransactions(
  db: Database,
  count: number,
  coinCount: number,
  clientCount: number,
) {
  console.log(`💸 Generating ${count} random transactions...`);

  const insertTransaction = db.prepare(`
    INSERT INTO transactions (coin_id, seller_id, buyer_id, amount, transaction_date)
    VALUES (?, ?, ?, ?, ?)
  `);

  const updateCoinOwner = db.prepare(`
    UPDATE coins SET client_id = ? WHERE coin_id = ?
  `);

  const coinOwners: Record<number, number | null> = {};
  let latestTransactionDate = new Date();
  latestTransactionDate.setMonth(latestTransactionDate.getMonth() - 6);

  db.transaction(() => {
    for (let i = 0; i < count; i++) {
      const coinId = Math.floor(Math.random() * coinCount) + 1;
      const sellerId = coinOwners[coinId] || null;

      let buyerId: number;

      do {
        buyerId = Math.floor(Math.random() * clientCount) + 1;
      } while (buyerId === sellerId);

      const coinValue =
        (
          db.query("SELECT value FROM coins WHERE coin_id = ?").get(coinId) as
            | CoinValueResult
            | undefined
        )?.value || 0;
      const amount = coinValue;

      const minutesToAdd = Math.floor(Math.random() * 2880) + 1;
      latestTransactionDate = new Date(
        latestTransactionDate.getTime() + minutesToAdd * 60000,
      );

      insertTransaction.run(
        coinId,
        sellerId,
        buyerId,
        amount.toFixed(2),
        latestTransactionDate.toISOString(),
      );

      if (Math.random() > 0.9) {
        updateCoinOwner.run(buyerId, coinId);
        coinOwners[coinId] = buyerId;
      } else {
        updateCoinOwner.run(null, coinId);
        coinOwners[coinId] = null;
      }
    }
  })();
}
