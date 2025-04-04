import { Database } from "bun:sqlite";
import { seedDatabase } from "./seed";
import { initializeSchema } from "./schema";

export function initializeDatabase() {
  const db = new Database("bitslow.sqlite", { create: true });
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec("PRAGMA foreign_keys = ON;");

  initializeSchema(db);

  // // CURRENT: Small dataset for testing
  seedDatabase(db, {
    clientCount: 30,
    bitSlowCount: 20,
    transactionCount: 50,
    clearExisting: false,
    forceSeed: false,
  });

  // // FUTURE SCALING TO 1000 TRANSACTIONS:
  // seedDatabase(db, {
  //   clientCount: 100,
  //   bitSlowCount: 500, // All possible BitSlow combinations
  //   transactionCount: 1000, // Larger transaction history
  //   clearExisting: true,
  //   forceSeed: true,
  // });

  return db;
}
