const { DatabaseSync } = require("node:sqlite");
const fs = require("node:fs");
const path = require("node:path");

// 1. 設定資料庫檔案位置
const dataDir = path.join(__dirname, "../data");
const dbPath = path.join(dataDir, "money-tracker.db");

// 確保 data 資料夾存在
fs.mkdirSync(dataDir, { recursive: true });

// 2. 建立或開啟 SQLite 資料庫
const db = new DatabaseSync(dbPath);

// 啟用外鍵約束
db.exec("PRAGMA foreign_keys = ON;");

// 3. 建立資料表
db.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL
      CHECK (type IN ('income', 'expense')),
    UNIQUE (name, type)
  );

  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER NOT NULL,
    amount INTEGER NOT NULL CHECK (amount > 0),
    transaction_date TEXT NOT NULL,
    note TEXT DEFAULT '',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (category_id)
      REFERENCES categories(id)
      ON DELETE RESTRICT
  );

  CREATE INDEX IF NOT EXISTS idx_transactions_date
    ON transactions(transaction_date);
`);

// 4. 建立預設收支分類
const defaultCategories = [
  ["薪資", "income"],
  ["獎金", "income"],
  ["其他收入", "income"],
  ["餐飲", "expense"],
  ["交通", "expense"],
  ["購物", "expense"],
  ["娛樂", "expense"],
  ["其他支出", "expense"],
];

const insertCategory = db.prepare(`
  INSERT OR IGNORE INTO categories (name, type)
  VALUES (?, ?)
`);

for (const [name, type] of defaultCategories) {
  insertCategory.run(name, type);
}

// 5. 檢查資料表與分類
const categoryCount = db
  .prepare(
    `
  SELECT COUNT(*) AS total FROM categories
`,
  )
  .get();

const transactionCount = db
  .prepare(
    `
  SELECT COUNT(*) AS total FROM transactions
`,
  )
  .get();

console.log("Money Tracker database initialized successfully!");
console.log(`Database path: ${dbPath}`);
console.log(`Categories: ${categoryCount.total}`);
console.log(`Transactions: ${transactionCount.total}`);

// 6. 關閉資料庫連線
db.close();
