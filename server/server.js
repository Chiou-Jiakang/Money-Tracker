const express = require("express");
const path = require("node:path");
const fs = require("node:fs");
const { DatabaseSync } = require("node:sqlite");

const app = express();
const PORT = process.env.PORT || 3000;

// 1. 設定資料庫位置
const dbPath = path.join(__dirname, "../data/money-tracker.db");

// 防止連接到不存在的資料庫
if (!fs.existsSync(dbPath)) {
  console.error("Database not found. Run node server/init-db.js first.");
  process.exit(1);
}

// 2. 開啟可讀寫的 SQLite 資料庫
const db = new DatabaseSync(dbPath);

// 啟用外鍵約束
db.exec("PRAGMA foreign_keys = ON;");

// 3. Middleware
app.use(express.json());

// 提供前端靜態檔案
app.use(express.static(path.join(__dirname, "../public")));

// 4. 健康檢查 API
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Money Tracker API is running",
  });
});

// 5. 取得所有收支分類
app.get("/api/categories", (req, res) => {
  try {
    const categories = db
      .prepare(
        `
      SELECT id, name, type
      FROM categories
      ORDER BY id
    `,
      )
      .all();

    res.json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    console.error("Failed to fetch categories:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
    });
  }
});

// 6. 取得所有交易紀錄
app.get("/api/transactions", (req, res) => {
  try {
    const transactions = db
      .prepare(
        `
      SELECT
        t.id,
        t.category_id,
        c.name AS category_name,
        c.type,
        t.amount,
        t.transaction_date,
        t.note,
        t.created_at
      FROM transactions AS t
      INNER JOIN categories AS c
        ON t.category_id = c.id
      ORDER BY
        t.transaction_date DESC,
        t.id DESC
    `,
      )
      .all();

    res.json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    console.error("Failed to fetch transactions:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch transactions",
    });
  }
});

// 7. 新增交易紀錄
app.post("/api/transactions", (req, res) => {
  try {
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
      return res.status(400).json({
        success: false,
        message: "Invalid request body",
      });
    }

    const { category_id, amount, transaction_date, note = "" } = req.body;

    // 驗證分類 ID
    if (!Number.isSafeInteger(category_id) || category_id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    // 驗證金額
    if (!Number.isSafeInteger(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be a positive integer",
      });
    }

    // 驗證日期格式
    if (
      typeof transaction_date !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(transaction_date)
    ) {
      return res.status(400).json({
        success: false,
        message: "Date must use YYYY-MM-DD format",
      });
    }

    // 驗證日期是否存在
    const parsedDate = new Date(`${transaction_date}T00:00:00.000Z`);

    if (
      Number.isNaN(parsedDate.getTime()) ||
      parsedDate.toISOString().slice(0, 10) !== transaction_date
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid transaction date",
      });
    }

    // 驗證備註
    if (typeof note !== "string" || note.length > 500) {
      return res.status(400).json({
        success: false,
        message: "Note must be a string of at most 500 characters",
      });
    }

    // 確認分類存在
    const category = db
      .prepare(
        `
      SELECT id
      FROM categories
      WHERE id = ?
    `,
      )
      .get(category_id);

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category does not exist",
      });
    }

    // 寫入交易資料
    const result = db
      .prepare(
        `
      INSERT INTO transactions (
        category_id,
        amount,
        transaction_date,
        note
      )
      VALUES (?, ?, ?, ?)
    `,
      )
      .run(category_id, amount, transaction_date, note);

    const newId = Number(result.lastInsertRowid);

    // 查詢新建立的交易
    const transaction = db
      .prepare(
        `
      SELECT
        t.id,
        t.category_id,
        c.name AS category_name,
        c.type,
        t.amount,
        t.transaction_date,
        t.note,
        t.created_at
      FROM transactions AS t
      INNER JOIN categories AS c
        ON t.category_id = c.id
      WHERE t.id = ?
    `,
      )
      .get(newId);

    return res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: transaction,
    });
  } catch (error) {
    console.error("Failed to create transaction:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create transaction",
    });
  }
});

// 8. 修改既有交易紀錄
app.put("/api/transactions/:id", (req, res) => {
  try {
    // 驗證 URL 中的交易 ID
    const rawId = req.params.id;
    const transactionId = Number(rawId);

    if (!/^[1-9]\d*$/.test(rawId) || !Number.isSafeInteger(transactionId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid transaction ID",
      });
    }

    // 確認 Request Body 是 JSON 物件
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
      return res.status(400).json({
        success: false,
        message: "Invalid request body",
      });
    }

    const { category_id, amount, transaction_date, note = "" } = req.body;

    // 驗證分類 ID
    if (!Number.isSafeInteger(category_id) || category_id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    // 驗證金額：必須為正整數
    if (!Number.isSafeInteger(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be a positive integer",
      });
    }

    // 驗證日期格式
    if (
      typeof transaction_date !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(transaction_date)
    ) {
      return res.status(400).json({
        success: false,
        message: "Date must use YYYY-MM-DD format",
      });
    }

    // 驗證日期真實存在
    const parsedDate = new Date(`${transaction_date}T00:00:00.000Z`);

    if (
      Number.isNaN(parsedDate.getTime()) ||
      parsedDate.toISOString().slice(0, 10) !== transaction_date
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid transaction date",
      });
    }

    // 驗證備註
    if (typeof note !== "string" || note.length > 500) {
      return res.status(400).json({
        success: false,
        message: "Note must be a string of at most 500 characters",
      });
    }

    // 確認交易紀錄存在
    const existingTransaction = db
      .prepare(
        `
      SELECT id
      FROM transactions
      WHERE id = ?
    `,
      )
      .get(transactionId);

    if (!existingTransaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    // 確認新分類存在
    const category = db
      .prepare(
        `
      SELECT id
      FROM categories
      WHERE id = ?
    `,
      )
      .get(category_id);

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category does not exist",
      });
    }

    // 更新原本的交易
    const result = db
      .prepare(
        `
      UPDATE transactions
      SET
        category_id = ?,
        amount = ?,
        transaction_date = ?,
        note = ?
      WHERE id = ?
    `,
      )
      .run(category_id, amount, transaction_date, note, transactionId);

    if (result.changes === 0) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    // 重新查詢更新後的交易
    const updatedTransaction = db
      .prepare(
        `
      SELECT
        t.id,
        t.category_id,
        c.name AS category_name,
        c.type,
        t.amount,
        t.transaction_date,
        t.note,
        t.created_at
      FROM transactions AS t
      INNER JOIN categories AS c
        ON t.category_id = c.id
      WHERE t.id = ?
    `,
      )
      .get(transactionId);

    return res.json({
      success: true,
      message: "Transaction updated successfully",
      data: updatedTransaction,
    });
  } catch (error) {
    console.error("Failed to update transaction:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update transaction",
    });
  }
});

// 9. 啟動 HTTP 伺服器
app.listen(PORT, () => {
  console.log(`Money Tracker server running at http://localhost:${PORT}`);
});
