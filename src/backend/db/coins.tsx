import { Database } from "bun:sqlite";
import { generateDistinctRandomValues } from "./utils";

export function seedCoins(
  db: Database,
  count: number,
  clientCount: number,
): number[] {
  console.log(`💰 Generating ${count} random BitSlows...`);

  const coinIds: number[] = [];
  const insertCoin = db.prepare(`
    INSERT INTO coins (client_id, bit1, bit2, bit3, value)
    VALUES (?, ?, ?, ?, ?)
  `);

  const usedValues = new Set<number>();
  const usedBitCombinations = new Set<string>();

  db.transaction(() => {
    for (let i = 0; i < count; i++) {
      const clientId =
        Math.random() > 0.2
          ? Math.floor(Math.random() * clientCount) + 1
          : null;

      let bit1: number, bit2: number, bit3: number;
      let bitCombinationKey: string;

      do {
        const bitValues = generateDistinctRandomValues(3, 1, 10);
        bit1 = bitValues[0];
        bit2 = bitValues[1];
        bit3 = bitValues[2];
        bitCombinationKey = `${bit1}-${bit2}-${bit3}`;
      } while (usedBitCombinations.has(bitCombinationKey));

      usedBitCombinations.add(bitCombinationKey);

      let value: number;
      do {
        value = Math.floor(Math.random() * 90_000) + 10_000;
      } while (usedValues.has(value));

      usedValues.add(value);

      const info = insertCoin.run(clientId, bit1, bit2, bit3, value);
      coinIds.push(Number(info.lastInsertRowid));
    }
  })();

  return coinIds;
}
