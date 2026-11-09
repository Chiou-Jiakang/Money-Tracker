const { DatabaseSync } = require("node:sqlite");
const path = require("node:path");

// 設定資料庫位置
const dbPath = path.join(__dirname, "../data/money-tracker.db");

// 以唯讀模式開啟既有資料庫
const db = new DatabaseSync(dbPath, {
  readOnly: true,
});

try {
  // 1. 檢查分類資料表
  console.log("\n=== Categories Table ===");

  const categoryColumns = db.prepare("PRAGMA table_info(categories)").all();

  console.table(categoryColumns);

  // 2. 檢查交易資料表
  console.log("\n=== Transactions Table ===");

  const transactionColumns = db
    .prepare("PRAGMA table_info(transactions)")
    .all();

  console.table(transactionColumns);

  // 3. 檢查外鍵
  console.log("\n=== Foreign Keys ===");

  const foreignKeys = db.prepare("PRAGMA foreign_key_list(transactions)").all();

  console.table(foreignKeys);

  // 4. 檢查資料庫完整性
  console.log("\n=== Integrity Check ===");

  const integrity = db.prepare("PRAGMA integrity_check").get();

  console.log(integrity.integrity_check);

  // 5. 檢查外鍵違規資料
  console.log("\n=== Foreign Key Check ===");

  const violations = db.prepare("PRAGMA foreign_key_check").all();

  console.log(
    violations.length === 0 ? "No foreign key violations" : violations,
  );

  // 6. 顯示預設分類
  console.log("\n=== Default Categories ===");

  const categories = db
    .prepare(
      `
    SELECT id, name, type
    FROM categories
    ORDER BY id
  `,
    )
    .all();

  console.table(categories);
} finally {
  db.close();
}
