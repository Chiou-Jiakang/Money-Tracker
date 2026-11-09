# Money Tracker｜版本更新紀錄（CHANGELOG）

本文件記錄 Money Tracker 個人財務管理系統的功能新增、程式修改、錯誤修復、資料庫設計、測試結果及重要開發里程碑。

本專案使用 HTML、CSS、JavaScript、Node.js、Express 與 SQLite 開發，並透過 Git 與 GitHub 進行版本控制。

## 文件維護原則

- 採用持續累積的方式記錄開發歷程。
- 已完成且經過測試的功能，記錄於對應的更新項目。
- 已實作但尚未全面測試的功能，須明確標示驗證範圍。
- 尚未發布的功能統一記錄於 Unreleased。
- 已完成的歷史里程碑保留，不因後續開發而刪除。
- 重要的程式修改須搭配 Git Commit 保存。
- 正式發布版本時，將相關更新整理至對應的版本標籤。
- 尚未實作的功能不得標示為已完成。

---

# Unreleased｜目前開發中

更新日期：2026-11-09

目前專案已完成基本前後端架構、SQLite 資料庫建置，以及交易資料的 GET、POST、PUT API。

已經過基本功能測試與部分負向測試，但尚未完成完整交易 CRUD、前端動態整合及完整系統驗收。

## 1. Added｜新增功能

### 1.1 交易查詢 API

- 新增 `GET /api/transactions`。
- 支援從 SQLite 查詢既有交易紀錄。
- 使用 SQL `INNER JOIN` 關聯 transactions 與 categories 資料表。
- 查詢時一併取得分類名稱及交易類型。
- 回傳交易 ID、分類 ID、分類名稱、收支類型、金額、日期、備註及建立時間。
- 依交易日期由新到舊排序。
- 同一天的交易依 ID 由大到小排序。
- 使用 JSON 格式回傳查詢結果。
- 回應包含 `success`、`count` 及 `data` 欄位。
- 無交易資料時可正常回傳空陣列。

### 1.2 新增交易 API

- 新增 `POST /api/transactions`。
- 支援新增收入及支出交易紀錄。
- 使用 `category_id` 指定交易分類。
- 使用 `amount` 記錄交易金額。
- 使用 `transaction_date` 記錄交易日期。
- 使用 `note` 儲存交易備註。
- 透過 SQL `INSERT INTO` 寫入 SQLite。
- 使用參數化 SQL 降低 SQL Injection 風險。
- 新增成功後取得新交易的 ID。
- 重新查詢新增的交易，並回傳完整資訊。
- 正常新增成功時回傳 HTTP 201。
- 輸入不合法時回傳對應的 HTTP 400 錯誤。

### 1.3 修改交易 API

- 新增 `PUT /api/transactions/:id`。
- 支援依照交易 ID 修改既有交易。
- 支援修改交易分類。
- 支援修改交易金額。
- 支援修改交易日期。
- 支援修改交易備註。
- 使用 SQL `UPDATE` 更新 SQLite 既有資料。
- 修改前確認交易 ID 格式有效。
- 修改前確認指定交易確實存在。
- 修改前確認新的交易分類存在。
- 修改成功後重新查詢交易資料。
- 回傳更新後的完整交易資訊。
- 成功修改時回傳 HTTP 200。
- 不存在的交易 ID 回傳 HTTP 404。
- 不合法的交易資料回傳 HTTP 400。
- 更新既有交易不會另外新增一筆紀錄。
- 原始交易 ID 保持不變。
- 原始 `created_at` 欄位保持不變。

### 1.4 SQLite 資料儲存機制

- 使用 Node.js 內建 `node:sqlite` 模組。
- 使用 `DatabaseSync` 存取 SQLite。
- 交易資料儲存於本機資料庫檔案。
- 啟用 `PRAGMA foreign_keys = ON`。
- 使用外鍵維持交易與分類的關聯。
- 透過參數化 SQL 執行資料庫操作。
- 資料庫檔案由 `.gitignore` 排除。
- 伺服器重新啟動後，已儲存交易仍可查詢。

---

## 2. Validation｜資料驗證機制

### 2.1 交易 ID 驗證

- PUT API 使用 URL 參數指定交易 ID。
- 交易 ID 必須為有效的正整數。
- 不合法的交易 ID 回傳 HTTP 400。
- 合法但不存在的交易 ID 回傳 HTTP 404。

### 2.2 分類驗證

- `category_id` 必須為正整數。
- 分類 ID 必須對應既有分類。
- 不接受不存在的分類 ID。
- 不合法分類 ID 回傳 HTTP 400。
- 防止交易參照不存在的分類。

### 2.3 金額驗證

- `amount` 必須為正整數。
- 不接受負數金額。
- 不接受金額為零。
- 不接受小數金額。
- 使用 `Number.isSafeInteger()` 進行整數驗證。
- 不合法金額回傳 HTTP 400。
- 金額以新臺幣整數表示。

### 2.4 日期驗證

- 交易日期必須為字串。
- 日期格式必須為 `YYYY-MM-DD`。
- 檢查日期是否真實存在。
- 不接受不存在的日期，例如 `2026-02-30`。
- 不合法日期回傳 HTTP 400。

### 2.5 備註驗證

- 備註必須為字串。
- 備註長度不得超過 500 個 JavaScript 字串長度單位。
- 不接受超過限制的備註。
- 省略備註時，使用空字串。
- 不合法備註回傳 HTTP 400。

### 2.6 Request Body 驗證

- API 預期接收 JSON 物件。
- 不接受不符合要求的 Request Body。
- 使用 `express.json()` 解析 JSON 請求。
- 各項交易資料在執行 SQL 前進行驗證。
- 驗證未通過時拒絕新增或修改。

---

## 3. Tested｜已完成測試

### 3.1 基礎伺服器測試

- Express 伺服器成功啟動。
- `GET /api/health` 正常回傳 JSON。
- Health API 回傳 `status: ok`。
- Port 3000 可正常提供 HTTP 服務。
- 靜態 HTML 與 CSS 可正常載入。
- Dashboard 在桌面瀏覽器正常顯示。

### 3.2 分類查詢測試

- `GET /api/categories` 成功。
- API 正確回傳八個預設分類。
- 收入與支出分類資訊正確。
- SQLite 分類資料查詢正常。

### 3.3 交易查詢測試

- `GET /api/transactions` 成功。
- 無交易資料時回傳空陣列。
- 新增交易後可查詢到資料。
- 修改交易後可查詢到更新後的資料。
- API 回傳正確的交易筆數。
- 分類關聯查詢正常。

### 3.4 POST API 正向測試

測試資料：

- 交易 ID：1
- 分類 ID：4
- 分類名稱：餐飲
- 金額：NT$120
- 日期：2026-11-09
- 備註：Lunch test

測試結果：

- POST 新增交易成功。
- API 回傳 `success: true`。
- 新交易取得 ID 1。
- GET API 成功查詢新增資料。
- SQLite 正確保留交易紀錄。

### 3.5 POST API 負向測試

以下七個案例均已通過預定測試：

| Test ID | 測試項目            | 預期結果 | 狀態 |
| ------- | ------------------- | -------- | ---- |
| POST-01 | 正常新增交易        | 成功建立 | PASS |
| POST-02 | 負數金額            | HTTP 400 | PASS |
| POST-03 | 不存在的分類        | HTTP 400 | PASS |
| POST-04 | 不存在的日期        | HTTP 400 | PASS |
| POST-05 | 零元金額            | HTTP 400 | PASS |
| POST-06 | 小數金額            | HTTP 400 | PASS |
| POST-07 | 超過 500 字元的備註 | HTTP 400 | PASS |

測試結論：

- 不合法輸入均遭正確拒絕。
- 錯誤回應訊息符合預期。
- 負向測試未新增額外交易。
- 原始交易資料保持完整。

### 3.6 POST API 資料持久化測試

測試流程：

1. 新增一筆有效交易。
2. 使用 GET API 確認交易存在。
3. 停止 Express 伺服器。
4. 重新啟動 Express 伺服器。
5. 再次查詢交易資料。

測試結果：

- 重啟前交易筆數為 1。
- 重啟後交易筆數仍為 1。
- 原始交易資料沒有遺失。
- SQLite 資料持久化測試通過。

### 3.7 PUT API 正向測試

測試端點：

`PUT /api/transactions/1`

修改內容：

- 分類 ID：4
- 修改前金額：NT$120
- 修改後金額：NT$150
- 交易日期：2026-11-09
- 修改後備註：Updated lunch test

測試結果：

- API 回傳 `success: true`。
- API 回傳 `Transaction updated successfully`。
- 金額成功更新為 NT$150。
- 備註成功更新。
- 原始交易 ID 維持 1。
- 原始建立時間沒有改變。
- 交易筆數維持 1。
- GET API 成功查詢更新後的資料。

### 3.8 PUT API 負向測試

以下七個案例均已通過預定測試：

| Test ID | 測試項目            | 預期結果 | 狀態 |
| ------- | ------------------- | -------- | ---- |
| PUT-01  | 正常修改交易        | HTTP 200 | PASS |
| PUT-02  | 不存在的交易 ID     | HTTP 404 | PASS |
| PUT-03  | 零元金額            | HTTP 400 | PASS |
| PUT-04  | 小數金額            | HTTP 400 | PASS |
| PUT-05  | 不存在的分類        | HTTP 400 | PASS |
| PUT-06  | 不存在的日期        | HTTP 400 | PASS |
| PUT-07  | 超過 500 字元的備註 | HTTP 400 | PASS |

測試結論：

- 正常修改交易成功。
- 不存在的交易正確回傳 HTTP 404。
- 不合法金額、分類、日期及備註遭拒絕。
- 五項非法資料測試均回傳 HTTP 400。
- 錯誤訊息與預期一致。
- 負向測試沒有修改原始交易資料。

### 3.9 PUT API 資料完整性確認

完成所有 PUT 負向測試後，
再次使用 GET API 查詢 SQLite。

實際結果：

- `success`：true
- `count`：1
- `id`：1
- `category_id`：4
- `amount`：150
- `note`：Updated lunch test

確認不合法請求沒有破壞既有交易。

---

## 4. Fixed｜問題排除與修復

### 4.1 PUT API 無法識別路由

問題現象：

初次測試 PUT API 時，Express 回傳：

`Cannot PUT /api/transactions/1`

排查過程：

1. 檢查 `server.js` 是否存在 `app.put()`。
2. 確認 PUT 路由已寫入程式碼。
3. 使用 `node --check` 檢查 JavaScript 語法。
4. 確認檔案沒有基本語法錯誤。
5. 檢查 Port 3000 的監聽程序。
6. 發現 Port 3000 已由 Node.js 程序占用。
7. 使用 Port 3001 啟動最新版伺服器。
8. Port 3001 成功執行 PUT API。
9. 停止占用 Port 3000 的舊程序。
10. 重新啟動 Port 3000。
11. 再次測試 GET 與 PUT API。

最終結果：

- Port 3000 的 PUT API 恢復正常。
- PUT API 成功修改 SQLite 交易資料。
- 原有 GET API 持續正常運作。

可能原因：

舊版 Node.js 程序尚未重新載入更新後的 Express 路由。

此原因依實際排查結果推定，
未透過程序記憶體內容進一步直接驗證。

### 4.2 API 測試時無法連接伺服器

問題現象：

PowerShell 曾顯示無法連接至遠端伺服器。

處理方式：

- 確認 Express 是否持續執行。
- 將伺服器與 API 測試分別放在不同終端機。
- 避免伺服器停止後仍持續發送 API 請求。
- 使用 Health API 驗證連線。

最終結果：

- API 測試連線恢復正常。
- GET、POST、PUT API 可正常執行。

---

## 5. Pending｜尚未完成

### Backend

- `DELETE /api/transactions/:id`。
- 刪除不存在交易的錯誤處理與測試。
- 更完整的交易 ID 與輸入型態邊界測試。
- 更完整的 API 自動化測試。
- 更完整的錯誤處理與安全性驗證。

### Frontend

- 新增交易輸入表單。
- 編輯交易操作介面。
- 刪除交易操作介面。
- 將前端操作與 REST API 整合。
- 顯示即時交易清單。
- 完整的使用者輸入錯誤提示。
- 行動裝置版面測試與優化。

### Dashboard

- 從 SQLite 動態讀取交易資料。
- 計算本月總收入。
- 計算本月總支出。
- 計算本月收支淨額。
- 動態顯示最近交易紀錄。
- 處理空資料與載入失敗情況。

### Advanced Features

- 交易日期與分類篩選。
- 自訂日期區間查詢。
- 月度及年度財務統計。
- SQL 聚合查詢與分析。
- 收入與支出圖表。
- 支出分類占比分析。
- CSV 資料匯出。
- 完整的測試文件與版本發布。

---

# Development History｜歷史開發里程碑

以下記錄已完成並提交至 GitHub 的重要開發階段。

## 2026-11-09｜專案初始化

Commit：`1798256`

Commit Message：
`chore: initialize Money Tracker project`

### Project Setup

- 建立 `C:\Projects\Money-Tracker` 專案資料夾。
- 使用 VS Code 進行專案開發。
- 確認 Node.js、npm 與 Git 安裝完成。
- 建立本機 Git Repository。
- 建立 GitHub 遠端 Repository。
- 設定 Git main 分支。
- 建立 README.md。
- 建立 .gitignore。
- 完成初始 Commit。
- 成功 Push 至 GitHub。

### Learning Outcomes

- 熟悉 VS Code 工作區管理。
- 理解本機與遠端 Repository 的差異。
- 學習 Git 初始化及版本控制。
- 學習 Commit 與 Push 的開發流程。

---

## 2026-11-09｜Express 後端建置

Commit：`23e6afe`

Commit Message：
`feat: set up Express server and health API`

### Backend Setup

- 使用 npm 初始化 Node.js 專案。
- 建立 package.json。
- 安裝 Express。
- 建立 package-lock.json。
- 建立 server/server.js。
- 使用 Express 建立 HTTP Server。
- 設定 Port 3000。
- 支援使用環境變數修改 Port。
- 建立 GET /api/health。
- 設定 npm start 啟動指令。

### Testing

- Express 伺服器正常啟動。
- 瀏覽器成功連接 localhost:3000。
- Health API 成功回傳 JSON。
- API 回傳狀態正常。

### Learning Outcomes

- 理解 Node.js 後端執行環境。
- 理解 Express Routing。
- 理解 HTTP Request 與 Response。
- 理解 JSON API 的基本結構。

---

## 2026-11-09｜前端首頁建置

Commit：`fe6cd52`

Commit Message：
`feat: add styled frontend homepage`

### Frontend Setup

- 建立 public/index.html。
- 建立 public/style.css。
- 使用 HTML 建立網頁結構。
- 使用 CSS 設計深色主題。
- 建立 Money Tracker 標題區。
- 建立初步 Dashboard 版面。
- 使用 Express 提供靜態網頁。
- 成功整合前端與後端伺服器。

### Testing

- 首頁成功顯示。
- CSS 正常載入。
- 瀏覽器可透過 Port 3000 取得首頁。

---

## 2026-11-09｜Dashboard 與交易列表版面

Commit：`d654756`

Commit Message：
`feat: add dashboard summary and recent transactions layout`

### Dashboard

- 建立本月總收入卡片。
- 建立本月總支出卡片。
- 建立本月收支淨額卡片。
- 使用不同色彩區分財務資訊。
- 建立最近交易紀錄區塊。
- 新增日期、類型、分類、金額、備註欄位。
- 加入沒有交易資料時的空狀態文字。
- 調整頁面與卡片的 CSS 排版。

### Testing

- 三張財務卡片正常顯示。
- 最近交易表格正常顯示。
- 桌面瀏覽器排版符合預期。

### Limitations

- 此階段以靜態網頁版面為主。
- 尚未將 Dashboard 與 SQLite 動態整合。

---

## 2026-11-09｜SQLite 資料庫初始化

Commit：`eacbbb8`

Commit Message：
`feat: initialize SQLite database and verify schema`

### Database Setup

- 使用 Node.js 內建 SQLite API。
- 建立 data 資料夾。
- 建立 SQLite 資料庫檔案。
- 建立 categories 資料表。
- 建立 transactions 資料表。
- 設定 Primary Key。
- 設定 Foreign Key。
- 建立交易與分類的資料表關聯。
- 設定基本資料欄位與約束。
- 建立 server/init-db.js。
- 建立 server/check-db.js。
- 設定 SQLite 資料庫檔案不納入 Git。

### Default Categories

收入分類：

1. 薪資
2. 獎金
3. 其他收入

支出分類：

4. 餐飲
5. 交通
6. 購物
7. 娛樂
8. 其他支出

### Testing

- 資料庫初始化成功。
- 八個預設分類正確建立。
- transactions 初始筆數為零。
- 資料表結構檢查成功。
- Foreign Key 結構正確。
- PRAGMA integrity_check 回傳 ok。
- PRAGMA foreign_key_check 沒有違規。
- .db 檔案受到 .gitignore 排除。

### Learning Outcomes

- 理解 SQLite 資料庫初始化。
- 理解關聯式資料庫結構。
- 理解主鍵與外鍵。
- 理解資料完整性與參照完整性。

---

## 2026-11-09｜分類查詢 API

Commit：`703b3f6`

Commit Message：
`feat: add SQLite categories API`

### REST API

- 新增 GET /api/categories。
- 透過 SQLite 查詢分類資料。
- 使用 SQL SELECT 讀取 categories。
- 使用 ORDER BY id 排序。
- 使用 JSON 回傳分類清單。
- 回應包含 success、count、data。
- 加入基本例外處理。

### Testing

- Categories API 正常回應。
- 成功取得八個預設分類。
- 分類名稱及收支類型正確。
- 原本的 Health API 正常運作。

---

## 2026-11-09｜交易 API 與開發文件

Commit：`8c5b850`

Commit Message：
`feat: add transaction APIs and development documentation`

### Transactions API

- 新增 GET /api/transactions。
- 新增 POST /api/transactions。
- 加入交易資料驗證。
- 使用 SQL JOIN 查詢交易分類。
- 使用 SQL INSERT 新增交易。
- 新增成功後回傳完整交易資料。
- 加入基本 HTTP 錯誤處理。

### Documentation

- 新增 CHANGELOG.md。
- 新增 docs/DEVELOPMENT_LOG.md。
- 新增 docs/TESTING.md。
- 建立持續記錄開發歷程的文件架構。
- 記錄 API 與資料庫測試結果。
- 記錄已完成及待開發功能。

### Testing

- 正常交易新增成功。
- POST API 的七個規劃案例通過。
- SQLite 交易資料保存正常。
- 伺服器重啟後資料仍然存在。

### GitHub

- 完成第七次 Git Commit。
- 成功 Push 至遠端 main 分支。
- Git 工作目錄保持乾淨。
- 程式碼與開發文件同步保存至 GitHub。

---

# Next Milestones｜後續開發里程碑

以下為規劃事項，不代表已完成。

## Milestone 08｜交易修改 API 與測試文件

目前狀態：功能與預定基本測試完成，尚未提交 GitHub。

預計提交：

- PUT /api/transactions/:id。
- PUT API 正向及負向測試紀錄。
- Port 3000 伺服器問題排除紀錄。
- 更新 CHANGELOG.md。
- 更新 DEVELOPMENT_LOG.md。
- 更新 TESTING.md。

## Milestone 09｜交易刪除 API

目前狀態：尚未開始。

規劃內容：

- DELETE /api/transactions/:id。
- 交易刪除驗證。
- 不存在交易的錯誤處理。
- 刪除後的資料完整性測試。
- 更新開發與測試文件。

## Milestone 10｜前端 CRUD 整合

目前狀態：尚未開始。

規劃內容：

- 新增交易表單。
- 修改交易表單。
- 刪除交易操作。
- 交易清單動態更新。
- 前端與 REST API 串接。

## Milestone 11｜財務統計與圖表

目前狀態：尚未開始。

規劃內容：

- 收入及支出統計。
- 月度收支淨額。
- SQL GROUP BY 聚合分析。
- 分類支出統計。
- 財務趨勢圖表。

## Milestone 12｜進階查詢與資料匯出

目前狀態：尚未開始。

規劃內容：

- 日期區間篩選。
- 分類與收支類型篩選。
- 進階 SQL 查詢。
- CSV 資料匯出。
- 資料正確性及邊界測試。

## Milestone 13｜測試與版本發布

目前狀態：尚未開始。

規劃內容：

- 整合測試。
- 完整 CRUD 驗證。
- 錯誤情境測試。
- 前端使用流程檢查。
- README 與技術文件整理。
- 建立正式 Release Notes。
- 評估第一個穩定版本的發布條件。

---

# Versioning Notes｜版本管理規範

## Git Commit

每完成一個可驗證的開發里程碑，
建立對應的 Git Commit。

Commit 訊息採用以下前綴：

- feat：新增功能。
- fix：修正錯誤。
- docs：文件更新。
- test：新增或修改測試。
- refactor：重構程式碼。
- chore：專案設定或維護。

## Changelog 維護

每次功能開發完成後：

1. 更新 Unreleased 區段。
2. 記錄新增及修改功能。
3. 記錄實際完成的測試。
4. 記錄已確認的錯誤修復。
5. 更新尚未完成的項目。
6. 更新 DEVELOPMENT_LOG.md。
7. 更新 TESTING.md。
8. 確認 Git Status。
9. 建立 Commit 並 Push 至 GitHub。

當功能正式發布時：

1. 將對應的 Unreleased 更新移至正式版本。
2. 標示版本號及發布日期。
3. 保留所有舊版本的歷史紀錄。
4. 建立 Git Tag 或 GitHub Release。
5. 繼續使用新的 Unreleased 區段記錄後續開發。

## Release Policy

- 目前尚未發布正式版本。
- Git Commit 不等於正式 Release。
- 只有經過適當測試的穩定里程碑才考慮發布。
- 尚未完成的功能不得宣稱已經正式支援。
- 每次版本更新須保留可追溯的歷史紀錄。

---

# Documentation

相關文件：

- README.md：專案簡介、功能及使用說明。
- CHANGELOG.md：功能更新與版本歷史。
- docs/DEVELOPMENT_LOG.md：開發過程及問題排除。
- docs/TESTING.md：功能測試及驗證紀錄。

本文件將隨 Money Tracker 的開發進度持續更新，
並以 GitHub 版本控制保存各階段的歷史。
