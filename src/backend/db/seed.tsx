import { Database } from "bun:sqlite";
import { initializeSchema } from "./schema";
import { seedClients } from "./clients";
import { seedCoins } from "./coins";
import { seedTransactions } from "./transactions";

export function seedDatabase(
  db: Database,
  options: {
    clientCount?: number;
    bitSlowCount?: number;
    transactionCount?: number;
    clearExisting?: boolean;
    forceSeed?: boolean;
  } = {},
) {
  const {
    clientCount = 20,
    bitSlowCount = 40,
    transactionCount = 20,
    clearExisting = false,
    forceSeed = false,
  } = options;


  console.log("🌱 Initializing database schema and seeding data...");

  if (clearExisting) {
    console.log("🗑️ Clearing existing data...");
    db.exec(`
      DROP TABLE IF EXISTS transactions;
      DROP TABLE IF EXISTS coins;
      DROP TABLE IF EXISTS clients;
    `);
  }

  initializeSchema(db);
  const hasExistingData =
    (
      db.query("SELECT COUNT(*) as count FROM clients").get() as {
        count: number;
      }
    ).count > 0;

  if (hasExistingData && !forceSeed) {
    console.log("✅ Database already contains data. Skipping seeding.");
    return;
  }

  const clients = seedClients(db, clientCount);
  const coins = seedCoins(db, bitSlowCount, clients.length);
  seedTransactions(db, transactionCount, coins.length, clients.length);

  return {
    clients,
    coins,
    transactionCount,
  };
}
