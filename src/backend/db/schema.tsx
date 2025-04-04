import { Database } from "bun:sqlite";

export function initializeSchema(db: Database) {
  console.log("📝 Creating tables and indexes...");

  db.exec(`
    -- Core Tables
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      address TEXT,
      password TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS coins (
      coin_id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_id INTEGER,
      bit1 INTEGER NOT NULL,
      bit2 INTEGER NOT NULL,
      bit3 INTEGER NOT NULL,
      value REAL NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (client_id) REFERENCES clients (id)
    );

    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      coin_id INTEGER NOT NULL,
      seller_id INTEGER,
      buyer_id INTEGER NOT NULL,
      amount REAL NOT NULL,
      transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (coin_id) REFERENCES coins (coin_id),
      FOREIGN KEY (seller_id) REFERENCES clients (id),
      FOREIGN KEY (buyer_id) REFERENCES clients (id)
    );

    CREATE INDEX IF NOT EXISTS idx_transactions_coin ON transactions(coin_id);
    CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(transaction_date DESC);
    CREATE INDEX IF NOT EXISTS idx_coins_owner ON coins(client_id);

    CREATE INDEX IF NOT EXISTS idx_transactions_buyer ON transactions(buyer_id);
    CREATE INDEX IF NOT EXISTS idx_transactions_seller ON transactions(seller_id);
    CREATE INDEX IF NOT EXISTS idx_coins_value ON coins(value);  -- For price filtering

    CREATE INDEX IF NOT EXISTS idx_coins_bit1 ON coins(bit1);
    CREATE INDEX IF NOT EXISTS idx_coins_bit2 ON coins(bit2);
    CREATE INDEX IF NOT EXISTS idx_coins_bit3 ON coins(bit3);
    CREATE INDEX IF NOT EXISTS idx_coins_bits ON coins(bit1, bit2, bit3);
  `);
}
