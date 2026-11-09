const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// 讓伺服器能夠解析 JSON 格式的請求
app.use(express.json());

// 第一個 API：檢查伺服器是否正常運作
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
