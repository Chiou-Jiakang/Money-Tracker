# Money Tracker｜版本更新紀錄

本文件記錄 Money Tracker 的主要功能新增、修改、修復與開發里程碑。

## Unreleased｜開發中

### Added

- 新增 GET /api/transactions 交易查詢 API。
- 使用 SQL INNER JOIN 取得交易分類名稱及類型。
- 新增 POST /api/transactions 新增交易 API。
- 新增交易資料驗證機制。
- 啟用 SQLite Foreign Key 約束。
- 支援交易資料永久儲存。

### Validation

- 金額必須為正整數。
- 分類 ID 必須有效且存在。
- 交易日期須符合 YYYY-MM-DD 且真實存在。
- 備註必須為字串，長度不得超過 500 字元。

### Tested

- 正常新增交易成功。
- 負數、零元、小數金額均遭拒絕。
- 不存在的分類遭拒絕。
- 不存在的日期遭拒絕。
- 過長備註遭拒絕。
- 非法輸入沒有增加交易筆數。
- 重啟伺服器後，交易資料仍然存在。

### Pending

- PUT /api/transactions/:id。
- DELETE /api/transactions/:id。
- 更完整的 API 邊界測試。
- 前端交易管理表單。
- Dashboard 動態資料整合。
- 財務統計分析及圖表。
- CSV 資料匯出。

---

## Initial Development｜2026-11-09

### Project Setup

- 建立 Money Tracker 專案。
- 初始化本機 Git Repository。
- 連接 GitHub 遠端儲存庫。
- 建立 README.md 與 .gitignore。

### Backend

- 初始化 Node.js 專案。
- 安裝 Express。
- 建立 server/server.js。
- 實作 GET /api/health。
- 設定 npm start 與 npm run dev。

### Frontend

- 建立 public/index.html。
- 建立 public/style.css。
- 套用深色 Dashboard 主題。
- 完成收入、支出、淨額三張摘要卡片。
- 建立最近交易紀錄表格。
- 使用 Express 提供靜態網頁。

### Database

- 使用 Node.js 內建 SQLite。
- 建立 categories 資料表。
- 建立 transactions 資料表。
- 設定主鍵、外鍵及資料約束。
- 建立八個預設交易分類。
- 建立 init-db.js 資料庫初始化程式。
- 建立 check-db.js 資料庫檢查程式。
- 完成資料庫完整性與外鍵檢查。

### REST API

- 完成 GET /api/categories。
- 成功從 SQLite 取得八個交易分類。

---

## Versioning Notes

- 目前尚未發布正式版本。
- 開發中的功能記錄於 Unreleased。
- 每個穩定里程碑可以建立 Git Commit。
- 正式版本發布時，將對應內容整理至版本標籤。
