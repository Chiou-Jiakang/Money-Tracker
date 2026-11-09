const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// 解析 JSON 格式的請求
app.use(express.json());

// 提供 public 資料夾中的前端靜態檔案
app.use(express.static(path.join(__dirname, "../public")));

// API：檢查伺服器是否正常運作
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Money Tracker API is running",
  });
});

// 啟動 HTTP 伺服器
app.listen(PORT, () => {
  console.log(`Money Tracker server running at http://localhost:${PORT}`);
});
