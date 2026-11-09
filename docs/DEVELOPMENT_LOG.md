# Money Tracker｜開發日誌

## 專案概述

Money Tracker 是使用 HTML、CSS、JavaScript、
Node.js、Express 與 SQLite 建立的個人財務管理系統。

本專案以實際操作的方式學習：

- 前端與後端整合
- REST API 設計
- SQLite 關聯式資料庫
- SQL 查詢與資料管理
- CRUD 功能
- 輸入驗證與錯誤處理
- Git 與 GitHub 版本控制
- 軟體測試與技術文件維護

---

## 2026-11-09｜開發環境初始化

### 完成內容

- 建立 C:\Projects\Money-Tracker 專案資料夾。
- 使用 VS Code 管理專案。
- 確認 Node.js、npm 與 Git 可以正常執行。
- 建立 GitHub Repository。
- 完成 Git 初始化、Commit 與 Push。

### 學習成果

理解本機工作目錄、Git Commit、遠端儲存庫
及 Git Push 之間的關係。

---

## 2026-11-09｜Express 後端建置

### 完成內容

- 使用 npm 初始化 Node.js 專案。
- 安裝 Express。
- 建立 HTTP 伺服器。
- 建立 GET /api/health。
- 設定 npm start 啟動指令。

### 測試結果

- 伺服器成功監聽 Port 3000。
- 瀏覽器成功收到 JSON Response。

### 學習成果

理解 HTTP Request、Express Routing
及 JSON Response 的基本運作方式。

---

## 2026-11-09｜前端 Dashboard

### 完成內容

- 建立 HTML 網頁。
- 建立深色 CSS 主題。
- 建立三張財務摘要卡片。
- 建立最近交易紀錄表格。
- 將靜態網頁整合至 Express。

### 測試結果

- 首頁正常顯示。
- CSS 成功載入。
- 桌面版卡片排列正常。

### 尚待完成

- 前端互動功能。
- 動態財務資料。
- 行動裝置版面完整測試。

---

## 2026-11-09｜SQLite 資料庫設計

### 完成內容

- 建立 SQLite 資料庫。
- 設計 categories 與 transactions。
- 建立主鍵及外鍵關聯。
- 加入八個預設分類。
- 建立資料庫初始化與驗證程式。

### 測試結果

- PRAGMA integrity_check 回傳 ok。
- PRAGMA foreign_key_check 無違規。
- 八筆預設分類正確建立。
- 資料庫檔案受到 .gitignore 排除。

### 學習成果

理解關聯式資料庫、Primary Key、
Foreign Key 與參照完整性的用途。

---

## 2026-11-09｜交易 API 開發

### 完成內容

- GET /api/categories。
- GET /api/transactions。
- POST /api/transactions。
- 使用 SQL JOIN 查詢交易分類。
- 建立新增交易的輸入驗證。
- 使用 Prepared Statements 執行 SQL。

### 測試結果

- 八個分類成功回傳。
- 空交易資料表可正常查詢。
- 成功新增一筆測試交易。
- 不合法的金額、分類、日期及備註遭拒絕。
- 非法輸入沒有增加交易筆數。
- 重新啟動伺服器後，原始交易仍存在。

### 遇到的問題

第一次使用 PowerShell 測試 POST API 時，
出現無法連線至遠端伺服器的錯誤。

### 問題原因

測試當下，Express 伺服器沒有持續執行。

### 解決方式

將 Express Server 與 API Testing
分別放在兩個 PowerShell 終端機中執行。

### 學習成果

理解 API 測試流程、HTTP Status Code、
資料驗證、錯誤處理與資料持久化。

---

## 下一階段規劃

1. 完成 PUT 交易修改 API。
2. 完成 DELETE 交易刪除 API。
3. 測試 CRUD 邊界條件。
4. 建立前端記帳表單。
5. 整合 Dashboard 與 SQLite。
6. 開發財務統計與 CSV 匯出。
