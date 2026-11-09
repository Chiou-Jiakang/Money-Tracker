const express = require("express");
const path = require("path");
const { DatabaseSync } = require("node:sqlite");

const app = express();
const PORT = process.env.PORT || 3000;

// 1. 設定 SQLite 資料庫路徑
const dbPath = path.join(__dirname, "../data/money-tracker.db");

// 開啟既有的 SQLite 資料庫
const db = new DatabaseSync(dbPath, {
  readOnly: true,
});

// 2. Middleware
app.use(express.json());

// 提供前端靜態檔案
app.use(express.static(path.join(__dirname, "../public")));

// 3. 健康檢查 API
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Money Tracker API is running",
  });
});

// 4. 取得所有收支分類
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

// 5. 啟動 HTTP 伺服器
app.listen(PORT, () => {
  console.log(`Money Tracker server running at http://localhost:${PORT}`);
});
