# Money Tracker｜版本更新紀錄（CHANGELOG）

本文件記錄 Money Tracker 個人財務管理系統的功能新增、程式修改、錯誤修復、資料庫設計、測試結果及重要開發里程碑。

本專案使用 HTML、CSS、JavaScript、Node.js、Express 與 SQLite 開發，並透過 Git 與 GitHub 進行版本控制。

本文件同時作為產品功能更新紀錄及開發歷史索引。詳細技術實作與排錯過程記錄於 `docs/DEVELOPMENT_LOG.md`，測試案例及驗證結果記錄於 `docs/TESTING.md`。

## 文件維護原則

- 採用持續累積的方式記錄開發歷程。
- 已完成且經過測試的功能，記錄於對應的更新項目。
- 已實作但尚未全面測試的功能，須明確標示驗證範圍。
- 尚未發布的功能統一記錄於 Unreleased。
- 已完成的歷史里程碑保留，不因後續開發而刪除。
- 重要的程式修改須搭配 Git Commit 保存。
- 正式發布版本時，將相關更新整理至對應的版本標籤。
- 尚未實作的功能不得標示為已完成。
- 測試紀錄以實際執行結果為依據，不將預期結果視為測試成功。
- 每次開發里程碑應記錄功能範圍、驗證情況、已知限制及後續工作。
- 未完成 Commit 或 Push 的功能，不得宣稱已同步至 GitHub。
- 程式碼與文件的更新應盡可能保持一致。
- 已完成的測試不得推論為尚未執行之其他測試也已通過。
- 尚未確認的問題原因應標示為推定原因，而非已證實原因。
- 測試用資料與正式使用資料應明確區分。
- 重要功能測試應包含正向測試、負向測試及必要的資料完整性檢查。
- 開發紀錄中的 Commit SHA 應以實際 Git 紀錄為準。
- 每次更新時應檢查是否存在過時的功能狀態。
- 更新歷史文件時，應保留重要的技術決策及可追溯資訊。
- 功能實作完成不代表系統整合測試已完成。
- Git Commit 不等於正式產品 Release。

---

# Unreleased｜目前開發中

更新日期：2026-11-10

## 目前專案狀態

Money Tracker 已完成基本前後端架構、SQLite 資料庫建置，以及交易資料的 GET、POST、PUT、DELETE API。

目前已完成：

- Node.js 與 Express 後端伺服器。
- Health API。
- SQLite 資料庫初始化。
- Categories 分類資料表。
- Transactions 交易資料表。
- 八個預設收支分類。
- GET 分類查詢 API。
- GET 交易查詢 API。
- POST 交易新增 API。
- PUT 交易修改 API。
- DELETE 交易刪除 API。
- 基本交易資料驗證。
- HTTP 錯誤狀態處理。
- SQLite 資料完整性檢查。
- Dashboard 靜態視覺版面。
- 最近交易紀錄表格版面。
- Git 與 GitHub 版本控制。
- 基本開發日誌與測試紀錄。

## GitHub 同步狀態

GET、POST、PUT API 已完成既定開發階段及部分功能驗證，並提交至 GitHub。

截至本文件本次更新前，最近一次已確認提交至 GitHub 的功能里程碑為 Milestone 08。

Milestone 08：

- Commit：`5b3486b`
- 功能：PUT Transaction API。
- 狀態：已完成 Commit 與 Push。

Milestone 09：

- 功能：DELETE Transaction API。
- 後端功能：已實作。
- 正向測試：已通過。
- 負向測試：已通過。
- 刪除後資料驗證：已通過。
- SQLite 完整性檢查：已通過。
- 文件更新：進行中。
- Git Commit：尚未執行。
- GitHub Push：尚未執行。

Milestone 09 完成提交後，應更新本節的同步狀態及實際 Commit SHA。

## 尚未完成的主要工作

- 前端交易新增表單。
- 前端交易修改功能。
- 前端交易刪除功能。
- 前端與 REST API 的完整串接。
- Dashboard 即時財務統計。
- 最近交易紀錄動態載入。
- 完整交易 CRUD 自動化回歸測試。
- 更完整的輸入邊界測試。
- 資料庫失敗情境測試。
- 使用者操作流程驗證。
- 行動裝置版面優化。
- 財務分析與圖表。
- 交易資料篩選。
- CSV 匯出功能。
- 完整系統整合測試。
- 第一個正式穩定版本發布。

目前尚無正式發布版本。

---

## 1. Added｜新增功能

### 1.1 交易查詢 API

API：

`GET /api/transactions`

功能：

- 支援從 SQLite 查詢既有交易紀錄。
- 使用 SQL `INNER JOIN` 關聯 transactions 與 categories 資料表。
- 查詢時一併取得分類名稱及交易類型。
- 回傳交易 ID。
- 回傳分類 ID。
- 回傳分類名稱。
- 回傳收入或支出類型。
- 回傳交易金額。
- 回傳交易日期。
- 回傳備註。
- 回傳建立時間。
- 依交易日期由新到舊排序。
- 同一天的交易依 ID 由大到小排序。
- 使用 JSON 格式回傳結果。
- 回應包含 `success`、`count` 及 `data` 欄位。
- 無交易資料時可正常回傳空陣列。
- 新增交易後可查詢最新資料。
- 修改交易後可查詢更新後的資料。
- 刪除交易後可反映剩餘紀錄。
- 已用於交易資料持久化驗證。
- 已用於 PUT API 資料完整性驗證。
- 已用於 DELETE API 資料完整性驗證。

已確認：

- GET API 正常運作。
- SQLite 查詢正常。
- 分類關聯查詢正常。
- 新增、修改及刪除操作後，GET API 能反映測試資料的變化。

### 1.2 新增交易 API

API：

`POST /api/transactions`

功能：

- 支援新增收入交易。
- 支援新增支出交易。
- 使用 `category_id` 指定交易分類。
- 使用 `amount` 記錄交易金額。
- 使用 `transaction_date` 記錄交易日期。
- 使用 `note` 儲存交易備註。
- 使用 SQL `INSERT INTO` 寫入 SQLite。
- 使用參數化 SQL 降低 SQL Injection 風險。
- 新增成功後取得交易 ID。
- 重新查詢新交易，並回傳完整資訊。
- 正常新增成功時回傳 HTTP 201。
- 輸入不合法時回傳 HTTP 400。
- 支援建立供其他 API 測試使用的專用交易。

已確認：

- 成功建立 ID 1 的交易。
- 已使用 GET API 驗證資料存在。
- SQLite 能持久化保留資料。
- 已完成既定正向及負向測試。
- 已於 Milestone 09 成功建立專用測試交易 ID 2。

### 1.3 修改交易 API

API：

`PUT /api/transactions/:id`

Milestone：08

功能：

- 支援依照交易 ID 修改既有交易。
- 支援修改交易分類。
- 支援修改交易金額。
- 支援修改交易日期。
- 支援修改交易備註。
- 使用 SQL `UPDATE` 更新 SQLite 資料。
- 修改前確認交易 ID 格式有效。
- 修改前確認指定交易存在。
- 修改前確認新的分類存在。
- 修改成功後重新查詢交易資料。
- 回傳更新後的完整交易資訊。
- 成功修改時回傳 HTTP 200。
- 不存在交易回傳 HTTP 404。
- 不合法交易資料回傳 HTTP 400。
- 修改既有資料不另外新增交易。
- 原始交易 ID 保持不變。
- 原始 `created_at` 保持不變。

已確認：

- ID 1 交易成功更新。
- 金額由 NT$120 改為 NT$150。
- 備註更新為 `Updated lunch test`。
- 交易筆數維持 1。
- 已完成既定負向測試。
- 已完成 Git Commit 與 Push。

Commit：

`5b3486b`

### 1.4 刪除交易 API

功能名稱：

DELETE Transaction API

Milestone：09

API：

`DELETE /api/transactions/:id`

主要程式：

`server/server.js`

功能說明：

使用 HTTP DELETE 方法，依指定交易 ID 刪除 SQLite 資料庫中的既有交易紀錄。

新增功能：

- 新增 DELETE API 路由。
- 支援透過 URL 參數指定欲刪除的交易。
- 接收並驗證交易 ID。
- 交易 ID 必須為有效的正整數。
- 無效交易 ID 不執行刪除。
- 刪除前確認交易是否存在。
- 使用 SQLite 執行指定交易刪除。
- 刪除成功後回傳 JSON。
- 成功回應包含 `success`、`message`、`data`。
- 成功刪除時回傳 HTTP 200。
- 不合法 ID 回傳 HTTP 400。
- 合法但不存在的 ID 回傳 HTTP 404。
- 資料庫操作失敗時應由後端錯誤處理機制處理。
- 刪除指定交易時不應影響其他交易。
- 刪除後可使用 GET API 確認資料變化。
- 不需要新增額外資料表。
- 保留既有 SQLite 關聯架構。
- 不修改原有交易 ID 的產生方式。
- 不修改既有預設分類。

成功刪除回應：

```json
{
  "success": true,
  "message": "Transaction deleted successfully",
  "data": {
    "id": 2
  }
}
```

不合法 ID 回應：

```json
{
  "success": false,
  "message": "Invalid transaction ID"
}
```

不存在交易回應：

```json
{
  "success": false,
  "message": "Transaction not found"
}
```

實際驗證：

- DELETE API 路由成功載入。
- 不合法 ID 回傳 HTTP 400。
- 正常刪除回傳 HTTP 200。
- 重複刪除已不存在的交易回傳 HTTP 404。
- 刪除後交易數量由 2 筆減少為 1 筆。
- 被刪除的 ID 2 已不存在。
- 原有 ID 1 完整保留。
- SQLite 完整性檢查通過。
- 外鍵檢查沒有發現違規。
- 八個預設分類仍然存在。

目前狀態：

- 後端功能：已實作。
- 正常刪除測試：PASS。
- 不合法 ID 測試：PASS。
- 不存在交易測試：PASS。
- 刪除後資料驗證：PASS。
- SQLite 完整性檢查：PASS。
- 前端 DELETE 介面：尚未實作。
- 完整回歸測試：尚未完成。
- Git Commit：尚未執行。
- GitHub Push：尚未執行。
- 正式 Release：尚未發布。

### 1.5 SQLite 資料儲存機制

資料庫：

`data/money-tracker.db`

技術：

- Node.js 內建 `node:sqlite`。
- `DatabaseSync`。
- SQLite 關聯式資料庫。

資料儲存：

- 使用本機 SQLite 資料庫。
- 建立 categories 資料表。
- 建立 transactions 資料表。
- 使用 Primary Key 識別紀錄。
- 使用 Foreign Key 維持資料關聯。
- 啟用 `PRAGMA foreign_keys = ON`。
- 使用參數化 SQL 操作資料。
- SQLite 資料庫檔案受到 `.gitignore` 保護。
- 資料庫重新開啟後已儲存交易仍可查詢。
- 支援交易新增、查詢、修改及刪除。

完整性：

- 使用 `PRAGMA integrity_check`。
- 使用 `PRAGMA foreign_key_check`。
- 保留交易與分類的關聯。
- 分類參照規則為 `ON DELETE RESTRICT`。
- 限制刪除仍被交易引用的分類。
- 不限制正常刪除交易本身。
- 已確認 DELETE 測試後資料庫完整性檢查正常。

### 1.6 分類查詢 API

API：

`GET /api/categories`

功能：

- 從 SQLite 查詢分類資料。
- 使用 SQL `SELECT` 讀取 categories。
- 使用 `ORDER BY id` 排序。
- 使用 JSON 回傳分類清單。
- 回應包含 `success`、`count`、`data`。
- 支援前端後續建立分類選單。

預設收入分類：

1. 薪資
2. 獎金
3. 其他收入

預設支出分類：

4. 餐飲
5. 交通
6. 購物
7. 娛樂
8. 其他支出

已確認：

- API 成功回傳 8 個分類。
- 分類名稱正確。
- 收入與支出類型正確。
- DELETE API 測試後分類仍然存在。

### 1.7 前端頁面與 Dashboard

已建立：

- `public/index.html`
- `public/style.css`

前端技術：

- HTML
- CSS
- JavaScript

頁面功能：

- Money Tracker 主標題。
- 個人財務管理系統副標題。
- 深色主題設計。
- 財務總覽 Dashboard 區塊。
- 本月總收入卡片。
- 本月總支出卡片。
- 本月收支淨額卡片。
- 最近交易紀錄區塊。
- 日期欄位。
- 交易類型欄位。
- 分類欄位。
- 金額欄位。
- 備註欄位。
- 無交易資料時的空狀態文字。

目前限制：

- 財務統計尚未動態連接 SQLite。
- 交易列表尚未動態載入 API。
- 尚未提供新增、修改、刪除交易的操作介面。
- 目前主要完成基礎視覺與靜態版面。

---

## 2. Validation｜資料驗證機制

### 2.1 交易 ID 驗證

適用 API：

- PUT
- DELETE

驗證要求：

- ID 必須為有效的正整數。
- 不接受非數字字串。
- 不接受不合法交易 ID。
- 合法但不存在的 ID 應回傳 HTTP 404。
- 不合法 ID 應回傳 HTTP 400。
- 不合法請求不得修改或刪除交易。

已驗證：

- DELETE `/abc` 回傳 HTTP 400。
- DELETE 已刪除的 ID 2 回傳 HTTP 404。
- PUT 不存在交易 ID 回傳 HTTP 404。

尚待測試：

- ID 0。
- 負數 ID。
- 小數 ID。
- 超大整數。
- 空白字串。
- 特殊字元。
- 其他特殊 URL 輸入情境。

上述項目屬於後續規劃，不宣稱已全部完成。

### 2.2 分類驗證

適用 API：

- POST
- PUT

驗證要求：

- `category_id` 必須為正整數。
- 分類 ID 必須存在。
- 不接受不存在的分類。
- 不合法分類回傳 HTTP 400。
- 防止交易參照不存在的分類。

已驗證：

- POST 不存在分類的負向測試。
- PUT 不存在分類的負向測試。
- SQLite 外鍵完整性檢查。

DELETE API 使用交易 ID，不需要額外傳入分類 ID。

### 2.3 金額驗證

欄位：

`amount`

驗證要求：

- 金額必須為正整數。
- 不接受負數。
- 不接受零。
- 不接受小數。
- 使用 `Number.isSafeInteger()` 驗證。
- 不合法金額回傳 HTTP 400。
- 金額以新臺幣整數表示。

已驗證：

- POST 負數金額。
- POST 零元金額。
- POST 小數金額。
- PUT 零元金額。
- PUT 小數金額。

DELETE API 不接受新的交易金額，不涉及金額修改。

### 2.4 日期驗證

欄位：

`transaction_date`

驗證要求：

- 日期必須為字串。
- 格式為 `YYYY-MM-DD`。
- 日期必須真實存在。
- 不接受不合法日期。
- 不合法日期回傳 HTTP 400。

已驗證：

- POST 不合法日期。
- PUT 不合法日期。
- `2026-02-30` 會遭拒絕。

尚待測試：

- 更多閏年邊界案例。
- 不同日期格式。
- 非字串日期型態。
- 其他特殊日期輸入。

### 2.5 備註驗證

欄位：

`note`

驗證要求：

- 備註必須為字串。
- 長度不得超過 500 個 JavaScript 字串長度單位。
- 不接受超過限制的備註。
- 省略備註時使用空字串。
- 不合法備註回傳 HTTP 400。

已驗證：

- POST 過長備註。
- PUT 過長備註。
- 不合法備註遭正確拒絕。

### 2.6 Request Body 驗證

- API 預期接收符合規格的 JSON 物件。
- 使用 `express.json()` 解析 JSON。
- POST 與 PUT 會檢查必要交易欄位。
- 不符合資料規格的請求應遭拒絕。
- 執行 SQL 前進行資料驗證。
- 驗證失敗不得新增或修改交易。
- DELETE API 主要使用 URL 中的交易 ID。
- DELETE 的既定測試不需要額外 Request Body。

尚待補充：

- 不合法 JSON 格式測試。
- Content-Type 錯誤測試。
- 非 JSON 物件測試。
- 更多欄位型態測試。

---

## 3. Tested｜已完成測試

本節記錄目前已實際執行的主要測試。

詳細測試流程及後續回歸測試記錄，另見：

`docs/TESTING.md`

### 3.1 基礎伺服器測試

- Express 正常啟動。
- `GET /api/health` 正常回傳 JSON。
- Health API 回傳 `status: ok`。
- Port 3000 可提供 HTTP 服務。
- 靜態 HTML 正常載入。
- CSS 正常載入。
- Dashboard 在桌面瀏覽器正常顯示。
- 使用 PowerShell 成功發送 API 請求。
- 使用 Microsoft Edge 成功查看 API 結果。
- 重新啟動伺服器後，新版路由成功載入。

測試狀態：PASS

### 3.2 分類查詢測試

API：

`GET /api/categories`

測試結果：

- API 正常回應。
- 成功取得 8 個預設分類。
- 收入分類正確。
- 支出分類正確。
- 分類 ID 正確。
- SQLite 查詢正常。
- DELETE API 測試後分類仍完整。

測試狀態：PASS

### 3.3 交易查詢測試

API：

`GET /api/transactions`

測試結果：

- API 正常回應。
- 無交易時回傳空陣列。
- 新增交易後可查詢。
- 修改交易後可查詢。
- 刪除交易後可反映剩餘資料。
- 回傳交易筆數正確。
- 分類關聯查詢正常。

測試狀態：PASS

### 3.4 POST API 正向測試

測試交易：

- ID：1
- 分類 ID：4
- 分類：餐飲
- 類型：expense
- 金額：NT$120
- 日期：2026-11-09
- 備註：Lunch test

測試結果：

- POST 新增成功。
- 回傳 `success: true`。
- 新增交易取得 ID 1。
- GET API 可查詢該筆交易。
- SQLite 成功儲存資料。

測試狀態：PASS

### 3.5 POST API 負向測試

| Test ID | 測試項目   | 預期結果 | 狀態 |
| ------- | ---------- | -------- | ---- |
| POST-01 | 正常新增   | 成功建立 | PASS |
| POST-02 | 負數金額   | HTTP 400 | PASS |
| POST-03 | 不存在分類 | HTTP 400 | PASS |
| POST-04 | 不合法日期 | HTTP 400 | PASS |
| POST-05 | 零元金額   | HTTP 400 | PASS |
| POST-06 | 小數金額   | HTTP 400 | PASS |
| POST-07 | 過長備註   | HTTP 400 | PASS |

測試結果：

- 不合法輸入遭拒絕。
- 錯誤訊息符合預期。
- 負向測試未新增額外交易。
- 原始交易資料保持完整。

測試狀態：PASS

### 3.6 POST API 資料持久化測試

測試流程：

1. 新增有效交易。
2. 使用 GET API 確認存在。
3. 停止 Express 伺服器。
4. 重新啟動 Express。
5. 再次查詢交易。

測試結果：

- 重啟前交易筆數為 1。
- 重啟後交易筆數仍為 1。
- SQLite 資料沒有遺失。
- 資料持久化正常。

測試狀態：PASS

### 3.7 PUT API 正向測試

Milestone：08

API：

`PUT /api/transactions/1`

修改資料：

- 分類 ID：4。
- 原始金額：NT$120。
- 更新金額：NT$150。
- 日期：2026-11-09。
- 備註：Updated lunch test。

測試結果：

- HTTP 200。
- `success: true`。
- 回傳 `Transaction updated successfully`。
- 金額更新為 NT$150。
- 備註成功更新。
- 原始 ID 維持 1。
- 建立時間沒有改變。
- 交易筆數維持 1。
- GET API 查詢結果正確。

測試狀態：PASS

### 3.8 PUT API 負向測試

| Test ID | 測試項目      | 預期結果 | 狀態 |
| ------- | ------------- | -------- | ---- |
| PUT-01  | 正常修改      | HTTP 200 | PASS |
| PUT-02  | 不存在交易 ID | HTTP 404 | PASS |
| PUT-03  | 零元金額      | HTTP 400 | PASS |
| PUT-04  | 小數金額      | HTTP 400 | PASS |
| PUT-05  | 不存在分類    | HTTP 400 | PASS |
| PUT-06  | 不合法日期    | HTTP 400 | PASS |
| PUT-07  | 過長備註      | HTTP 400 | PASS |

測試結果：

- 正常修改成功。
- 不存在交易回傳 HTTP 404。
- 五項不合法資料測試回傳 HTTP 400。
- 負向測試沒有破壞既有交易。

測試狀態：PASS

### 3.9 PUT API 資料完整性確認

完成 PUT 負向測試後，再次執行 GET API。

實際資料：

- success：true
- count：1
- id：1
- category_id：4
- category_name：餐飲
- type：expense
- amount：150
- transaction_date：2026-11-09
- note：Updated lunch test

確認不合法 PUT 請求未破壞既有交易。

測試狀態：PASS

### 3.10 DELETE API 路由驗證

Milestone：09

測試期間：2026-11-09 至 2026-11-10

API：

`DELETE /api/transactions/:id`

初次測試：

Express 回傳：

`Cannot DELETE /api/transactions/abc`

此結果並非預期的 API 驗證回應。

排查內容：

- 確認 `server.js` 存在 `app.delete()`。
- 確認 DELETE 路由位於 `app.listen()` 之前。
- 使用 `node --check` 檢查 JavaScript 語法。
- 檢查 Port 3000。
- 檢查 Port 3001。
- 確認兩個 Port 存在 Node.js 程序。
- 停止舊程序。
- 重新啟動最新版 Express。
- 再次執行 DELETE API 測試。

修復後：

- Express 正確識別 DELETE 路由。
- 不合法 ID 回傳 HTTP 400。
- 回傳預期 JSON 錯誤訊息。
- 後續成功完成正常刪除與不存在交易測試。

測試狀態：PASS

### 3.11 DELETE API 不合法 ID 測試

Test ID：

DELETE-01

測試目的：

確認不合法交易 ID 不會造成資料刪除。

測試請求：

`DELETE /api/transactions/abc`

測試指令：

```powershell
curl.exe -i -X DELETE "http://localhost:3000/api/transactions/abc"
```

預期結果：

- HTTP 400。
- success 為 false。
- 回傳 Invalid transaction ID。
- 不執行資料刪除。

實際結果：

```json
{
  "success": false,
  "message": "Invalid transaction ID"
}
```

HTTP Status：

`400 Bad Request`

測試狀態：PASS

### 3.12 DELETE API 正常刪除測試

Test ID：

DELETE-02

測試目的：

確認 DELETE API 能刪除指定交易。

為避免直接刪除原有 ID 1，先建立專用測試資料。

測試資料：

- 交易 ID：2。
- 分類 ID：4。
- 分類名稱：餐飲。
- 類型：expense。
- 金額：NT$123。
- 日期：2026-11-10。
- 備註：DELETE API temporary test。
- 建立時間：2026-11-09 16:29:38（SQLite 回傳值）。

測試準備：

1. 使用 POST API 建立專用交易。
2. 確認新增成功。
3. 取得新交易 ID。
4. 使用 GET API 查詢。
5. 確認 ID 1 和 ID 2 都存在。
6. 確認測試金額及備註正確。

刪除前資料：

| ID  | 分類 | 金額   | 備註                      |
| --- | ---- | ------ | ------------------------- |
| 2   | 餐飲 | NT$123 | DELETE API temporary test |
| 1   | 餐飲 | NT$150 | Updated lunch test        |

刪除請求：

`DELETE /api/transactions/2`

測試指令：

```powershell
curl.exe -i -X DELETE "http://localhost:3000/api/transactions/2"
```

預期結果：

- HTTP 200。
- success 為 true。
- 回傳成功刪除訊息。
- 回傳被刪除的交易 ID。
- 不影響其他交易。

實際結果：

```json
{
  "success": true,
  "message": "Transaction deleted successfully",
  "data": {
    "id": 2
  }
}
```

HTTP Status：

`200 OK`

測試狀態：PASS

### 3.13 DELETE API 刪除後資料驗證

Test ID：

DELETE-03

測試目的：

確認刪除結果正確寫入 SQLite，且其他交易不受影響。

驗證 API：

`GET /api/transactions`

刪除後資料：

- success：true
- count：1
- 剩餘 ID：1
- 分類 ID：4
- 分類名稱：餐飲
- 類型：expense
- 金額：NT$150
- 日期：2026-11-09
- 備註：Updated lunch test
- 建立時間：2026-11-09 13:40:14

確認事項：

1. 交易筆數由 2 變成 1。
2. ID 2 已不存在。
3. ID 1 仍然存在。
4. ID 1 金額不變。
5. ID 1 備註不變。
6. GET API 結果符合預期。

PowerShell 自動驗證輸出：

`PASS: DELETE API data integrity verified`

測試狀態：PASS

### 3.14 DELETE API 不存在交易測試

Test ID：

DELETE-04

測試目的：

確認刪除不存在的交易會回傳正確錯誤。

測試方式：

再次刪除已經移除的 ID 2。

測試請求：

`DELETE /api/transactions/2`

測試指令：

```powershell
curl.exe -i -X DELETE "http://localhost:3000/api/transactions/2"
```

預期結果：

- HTTP 404。
- success 為 false。
- 回傳 Transaction not found。
- 不影響其他資料。

實際結果：

```json
{
  "success": false,
  "message": "Transaction not found"
}
```

HTTP Status：

`404 Not Found`

測試狀態：PASS

### 3.15 DELETE API SQLite 完整性測試

Test ID：

DELETE-05

測試工具：

`server/check-db.js`

測試指令：

```powershell
node server/check-db.js
```

檢查內容：

1. Categories 資料表。
2. Transactions 資料表。
3. Primary Key。
4. Foreign Key。
5. SQLite Integrity Check。
6. SQLite Foreign Key Check。
7. 預設分類。

Categories 資料表：

| 欄位 | 型態    | 約束        |
| ---- | ------- | ----------- |
| id   | INTEGER | Primary Key |
| name | TEXT    | NOT NULL    |
| type | TEXT    | NOT NULL    |

Transactions 資料表：

| 欄位             | 型態    | 約束                             |
| ---------------- | ------- | -------------------------------- |
| id               | INTEGER | Primary Key                      |
| category_id      | INTEGER | NOT NULL                         |
| amount           | INTEGER | NOT NULL                         |
| transaction_date | TEXT    | NOT NULL                         |
| note             | TEXT    | 可為空                           |
| created_at       | TEXT    | NOT NULL，預設 CURRENT_TIMESTAMP |

Foreign Key：

- 來源：transactions.category_id。
- 參照：categories.id。
- ON UPDATE：NO ACTION。
- ON DELETE：RESTRICT。

Integrity Check：

`ok`

Foreign Key Check：

`No foreign key violations`

預設分類：

| ID  | 分類     | 類型    |
| --- | -------- | ------- |
| 1   | 薪資     | income  |
| 2   | 獎金     | income  |
| 3   | 其他收入 | income  |
| 4   | 餐飲     | expense |
| 5   | 交通     | expense |
| 6   | 購物     | expense |
| 7   | 娛樂     | expense |
| 8   | 其他支出 | expense |

測試結果：

- 資料庫完整性正常。
- 沒有偵測到外鍵違規。
- 資料表結構正常。
- 八個預設分類完整保留。
- 沒有發現本次 DELETE 操作造成的資料庫完整性問題。

測試狀態：PASS

### 3.16 DELETE API 測試總結

| Test ID   | 測試項目       | 預期結果             | 實際結果 | 狀態 |
| --------- | -------------- | -------------------- | -------- | ---- |
| DELETE-01 | 不合法 ID      | HTTP 400             | HTTP 400 | PASS |
| DELETE-02 | 正常刪除       | HTTP 200             | HTTP 200 | PASS |
| DELETE-03 | 刪除後資料驗證 | ID 2 消失，ID 1 保留 | 符合預期 | PASS |
| DELETE-04 | 不存在交易     | HTTP 404             | HTTP 404 | PASS |
| DELETE-05 | SQLite 完整性  | 無完整性與外鍵錯誤   | 符合預期 | PASS |

本階段結論：

- DELETE API 已完成主要功能驗證。
- 正常刪除成功。
- 不合法 ID 被拒絕。
- 不存在交易被正確辨識。
- 刪除其他資料時，原有 ID 1 保持完整。
- SQLite 完整性檢查通過。
- 尚未完成全部可能輸入的邊界測試。
- 尚未完成完整自動化回歸測試。
- 尚未完成前端 DELETE 操作介面。
- 尚未完成整體系統驗收。

---

## 4. Fixed｜問題排除與修復

### 4.1 PUT API 無法識別路由

問題現象：

初次測試 PUT API 時，Express 回傳：

`Cannot PUT /api/transactions/1`

排查過程：

1. 檢查 `server.js`。
2. 確認存在 `app.put()`。
3. 確認 PUT 路由已寫入原始碼。
4. 使用 `node --check` 檢查語法。
5. 確認沒有基本 JavaScript 語法錯誤。
6. 檢查 Port 3000 監聽程序。
7. 發現 Port 3000 已由 Node.js 占用。
8. 使用 Port 3001 啟動新版伺服器。
9. Port 3001 成功執行 PUT API。
10. 停止占用 Port 3000 的舊程序。
11. 重新啟動 Port 3000。
12. 再次執行 GET 與 PUT 測試。

最終結果：

- PUT API 恢復正常。
- SQLite 交易資料成功更新。
- 原本 GET API 持續正常。

可能原因：

舊版 Node.js 程序尚未載入更新後的路由。

此原因依排查結果推定，未直接驗證舊程序記憶體中的路由內容。

### 4.2 API 測試時無法連接伺服器

問題現象：

PowerShell 顯示無法連接遠端伺服器。

處理方式：

- 確認 Express 是否正在執行。
- 使用獨立終端機執行 API 測試。
- 保持伺服器終端機持續運作。
- 使用 Health API 驗證連線。
- 確認測試 Port 正確。

最終結果：

- API 連線恢復正常。
- GET、POST、PUT 可以正常執行。

### 4.3 DELETE API 無法識別路由

Milestone：09

問題期間：

2026-11-09 至 2026-11-10

問題現象：

新增 DELETE 路由後，Express 回傳：

`Cannot DELETE /api/transactions/abc`

HTTP Status：

`404 Not Found`

Content-Type：

`text/html`

問題分析：

該回應來自 Express 預設的未匹配路由處理，而不是預期的 DELETE API 自訂驗證回應。

預期回應應為：

```json
{
  "success": false,
  "message": "Invalid transaction ID"
}
```

排查流程：

1. 確認 `server/server.js` 已加入 DELETE。
2. 使用 `Select-String` 搜尋 `app.delete()`。
3. 確認 DELETE 路由位於第 405 行。
4. 確認 `app.listen()` 位於第 456 行。
5. 確認 DELETE 路由位於 `app.listen()` 之前。
6. 使用 `node --check` 檢查語法。
7. 確認沒有基本語法錯誤。
8. 重新嘗試啟動 Express。
9. 發現請求仍回傳 Cannot DELETE。
10. 檢查 Port 3000。
11. 檢查 Port 3001。
12. 確認兩個 Port 均有 Node.js 程序。
13. 檢查程序名稱。
14. 檢查程序啟動命令。
15. 確認使用 `node server/server.js`。
16. 停止已確認的舊版伺服器。
17. 確認 Port 已釋放。
18. 清除 PORT 測試環境變數。
19. 重新啟動最新版 Express。
20. 再次執行 DELETE 請求。
21. 確認 HTTP 400。
22. 確認 JSON 錯誤訊息正確。

排查時的程序：

Port 3000：

- PID：13460。
- Name：node.exe。
- CommandLine：node server/server.js。

Port 3001：

- PID：14724。
- Name：node.exe。
- CommandLine：node server/server.js。

上述 PID 僅供保留當次排錯紀錄，不代表後續執行時仍使用相同 PID。

處理方式：

- 停止已確認的舊程序。
- 確認 Port 3000 與 3001 已釋放。
- 清除測試用 PORT 環境變數。
- 重新執行 `npm start`。
- 使用 Port 3000 測試新版路由。

修復後：

- DELETE API 成功載入。
- Express 正確識別路由。
- 不合法 ID 回傳 HTTP 400。
- 正常刪除回傳 HTTP 200。
- 不存在交易回傳 HTTP 404。

可能原因：

背景中仍有舊版 Node.js 程序執行，導致測試連接到尚未載入新版路由的伺服器。

此原因依程序狀態及重新啟動後的結果推定。

### 4.4 停止伺服器後無法連線

問題現象：

停止 Node.js 程序後執行 curl，出現：

`curl: (7) Failed to connect`

原因：

目標 Port 沒有伺服器正在監聽。

處理方式：

1. 確認 Port 3000 已釋放。
2. 回到 Money Tracker 專案。
3. 執行 `npm start`。
4. 保持伺服器持續執行。
5. 使用另一個終端機測試 API。

修復後：

- Express 正常啟動。
- Health API 正常回應。
- DELETE API 正常執行。

學習重點：

- HTTP 404 與連線失敗不同。
- HTTP 404 代表伺服器有回應。
- curl 連線失敗表示未成功連接目標伺服器。
- 修改程式碼後須確認執行中的程序已更新。
- 不應同時保留不必要的測試伺服器。
- 不應在未確認程序用途前任意停止其他 Node.js 程序。

---

## 5. Pending｜尚未完成

### 5.1 Backend

- 更完整的交易 ID 邊界測試。
- 更完整的資料型態驗證。
- 完整 CRUD API 回歸測試。
- API 自動化測試。
- 資料庫操作失敗測試。
- 錯誤回應格式一致性檢查。
- API 安全性驗證。
- 大量資料測試。
- 資料庫效能測試。
- 更完整的伺服器程序管理。
- 其他異常輸入處理。
- 完整後端整合測試。

### 5.2 Frontend

- 新增交易表單。
- 編輯交易介面。
- 刪除交易介面。
- REST API 串接。
- 交易清單動態載入。
- 表單資料驗證。
- 新增成功提示。
- 修改成功提示。
- 刪除成功提示。
- 刪除前確認。
- HTTP 錯誤提示。
- 載入失敗提示。
- 空資料狀態。
- 交易操作後畫面同步更新。
- 行動裝置版面測試。
- 響應式排版優化。
- 使用者操作流程驗證。

### 5.3 Dashboard

- SQLite 動態資料讀取。
- 本月總收入計算。
- 本月總支出計算。
- 本月收支淨額計算。
- 最近交易動態顯示。
- 新增交易後更新統計。
- 修改交易後更新統計。
- 刪除交易後更新統計。
- 空資料處理。
- API 失敗處理。
- 日期及時區邊界檢查。
- 統計結果一致性驗證。

### 5.4 Advanced Features

- 交易日期篩選。
- 分類篩選。
- 收支類型篩選。
- 自訂日期區間。
- 月度統計。
- 年度統計。
- SQL 聚合分析。
- 支出分類占比。
- 財務趨勢圖表。
- CSV 匯出。
- 資料匯出正確性測試。
- 完整測試套件。
- 技術文件整理。
- 正式版本發布。

---

# Development History｜歷史開發里程碑

以下依照開發歷程記錄重要階段。

已提交 GitHub 的階段會標示實際 Commit。

尚未提交的階段會標示為本機開發狀態。

---

## 2026-11-09｜Milestone 01：專案初始化

Commit：

`1798256`

Commit Message：

`chore: initialize Money Tracker project`

### Project Setup

- 建立 `C:\Projects\Money-Tracker`。
- 使用 VS Code 開發。
- 確認 Node.js、npm、Git。
- 建立本機 Git Repository。
- 建立 GitHub Repository。
- 設定 main 分支。
- 建立 README.md。
- 建立 .gitignore。
- 完成初始 Commit。
- 成功 Push 至 GitHub。

### Learning Outcomes

- VS Code 工作區管理。
- 本機與遠端 Repository 的差異。
- Git 初始化。
- Git Commit。
- Git Push。
- GitHub 版本控制流程。

狀態：已完成並提交 GitHub。

---

## 2026-11-09｜Milestone 02：Express 後端建置

Commit：

`23e6afe`

Commit Message：

`feat: set up Express server and health API`

### Backend Setup

- 使用 npm 初始化 Node.js。
- 建立 package.json。
- 安裝 Express。
- 建立 package-lock.json。
- 建立 server/server.js。
- 建立 HTTP Server。
- 設定 Port 3000。
- 支援 PORT 環境變數。
- 建立 GET /api/health。
- 設定 npm start。

### Testing

- Express 啟動成功。
- localhost:3000 可連線。
- Health API 回傳 JSON。
- status 為 ok。

### Learning Outcomes

- Node.js 執行環境。
- Express Routing。
- HTTP Request。
- HTTP Response。
- JSON API。

狀態：已完成並提交 GitHub。

---

## 2026-11-09｜Milestone 03：前端首頁建置

Commit：

`fe6cd52`

Commit Message：

`feat: add styled frontend homepage`

### Frontend Setup

- 建立 public/index.html。
- 建立 public/style.css。
- 使用 HTML 建立頁面。
- 使用 CSS 設計深色主題。
- 建立標題區。
- 建立初步 Dashboard。
- 使用 Express 提供靜態檔案。
- 完成前後端基本整合。

### Testing

- 首頁正常顯示。
- CSS 正常載入。
- Port 3000 可取得首頁。

狀態：已完成並提交 GitHub。

---

## 2026-11-09｜Milestone 04：Dashboard 與交易列表版面

Commit：

`d654756`

Commit Message：

`feat: add dashboard summary and recent transactions layout`

### Dashboard

- 建立本月總收入卡片。
- 建立本月總支出卡片。
- 建立本月收支淨額卡片。
- 使用不同顏色區分資訊。
- 建立最近交易區塊。
- 新增日期欄位。
- 新增類型欄位。
- 新增分類欄位。
- 新增金額欄位。
- 新增備註欄位。
- 加入沒有交易時的文字提示。
- 調整頁面 CSS。

### Testing

- 三張財務卡片正常顯示。
- 交易表格正常顯示。
- 桌面版面符合預期。

### Limitations

- 此階段以靜態版面為主。
- 尚未連接動態財務資料。

狀態：已完成並提交 GitHub。

---

## 2026-11-09｜Milestone 05：SQLite 資料庫初始化

Commit：

`eacbbb8`

Commit Message：

`feat: initialize SQLite database and verify schema`

### Database Setup

- 使用 Node.js 內建 SQLite。
- 建立 data 資料夾。
- 建立 SQLite 資料庫。
- 建立 categories。
- 建立 transactions。
- 設定 Primary Key。
- 設定 Foreign Key。
- 建立交易與分類關聯。
- 設定基本欄位約束。
- 建立 server/init-db.js。
- 建立 server/check-db.js。
- 設定 .gitignore 排除資料庫。

### Default Categories

收入：

1. 薪資
2. 獎金
3. 其他收入

支出：

4. 餐飲
5. 交通
6. 購物
7. 娛樂
8. 其他支出

### Testing

- 初始化成功。
- 八個分類正確建立。
- 初始交易筆數為 0。
- 資料表結構正常。
- Foreign Key 正確。
- integrity_check 回傳 ok。
- foreign_key_check 無違規。
- .db 受 Git 忽略規則保護。

### Learning Outcomes

- SQLite 初始化。
- 關聯式資料庫。
- 主鍵與外鍵。
- 資料完整性。
- 參照完整性。

狀態：已完成並提交 GitHub。

---

## 2026-11-09｜Milestone 06：分類查詢 API

Commit：

`703b3f6`

Commit Message：

`feat: add SQLite categories API`

### REST API

- 新增 GET /api/categories。
- 使用 SQLite 查詢分類。
- 使用 SELECT。
- 使用 ORDER BY id。
- 使用 JSON 回傳。
- 回應包含 success、count、data。
- 加入基本例外處理。

### Testing

- Categories API 正常。
- 成功取得八個分類。
- 分類名稱正確。
- 收支類型正確。
- Health API 仍然正常。

狀態：已完成並提交 GitHub。

---

## 2026-11-09｜Milestone 07：交易 API 與開發文件

Commit：

`8c5b850`

Commit Message：

`feat: add transaction APIs and development documentation`

### Transactions API

- 新增 GET /api/transactions。
- 新增 POST /api/transactions。
- 加入交易資料驗證。
- 使用 SQL JOIN 查詢分類。
- 使用 SQL INSERT 新增交易。
- 新增後回傳完整資料。
- 加入 HTTP 錯誤處理。

### Documentation

- 新增 CHANGELOG.md。
- 新增 docs/DEVELOPMENT_LOG.md。
- 新增 docs/TESTING.md。
- 建立持續記錄開發歷程的制度。
- 記錄 API 測試。
- 記錄 SQLite 測試。
- 記錄已完成與待開發功能。

### Testing

- 新增交易成功。
- POST 七個既定測試案例通過。
- SQLite 資料保存正常。
- 重啟伺服器後資料仍存在。

### GitHub

- 完成第七次 Git Commit。
- 成功 Push。
- Git 工作目錄於提交後保持乾淨。

### Learning Outcomes

- GET 與 POST 的差異。
- SQL INSERT。
- SQL JOIN。
- API 資料驗證。
- HTTP 201。
- HTTP 400。
- 資料持久化。

狀態：已完成並提交 GitHub。

---

## 2026-11-09｜Milestone 08：交易修改 API 與測試文件

Commit：

`5b3486b`

Commit Message：

`feat: implement PUT transaction API and document tests`

### Development

- 新增 PUT /api/transactions/:id。
- 支援交易修改。
- 支援修改分類。
- 支援修改金額。
- 支援修改日期。
- 支援修改備註。
- 加入交易 ID 驗證。
- 加入 HTTP 400 處理。
- 加入 HTTP 404 處理。
- 使用 SQLite UPDATE。
- 修改後重新查詢資料。
- 保持原始 ID。
- 保持原始建立時間。

### Testing

- 正常修改成功。
- 金額從 NT$120 更新為 NT$150。
- ID 維持 1。
- 備註更新。
- 不存在交易回傳 HTTP 404。
- 不合法金額回傳 HTTP 400。
- 不存在分類回傳 HTTP 400。
- 不合法日期回傳 HTTP 400。
- 過長備註回傳 HTTP 400。
- 負向測試未破壞資料。
- GET API 取得更新後資料。

### Troubleshooting

- 排除 Port 3000 舊程序問題。
- 確認 PUT 路由存在。
- 確認 JavaScript 語法正常。
- 使用 Port 3001 驗證新版伺服器。
- 停止舊程序。
- 重新啟動 Port 3000。
- PUT API 恢復正常。

### Documentation

- 更新 CHANGELOG.md。
- 更新 DEVELOPMENT_LOG.md。
- 更新 TESTING.md。
- 補充測試紀錄。
- 補充伺服器排錯紀錄。

### GitHub

- 完成第八次 Git Commit。
- 成功 Push 至 main。
- 工作目錄於提交後保持乾淨。

### Learning Outcomes

- REST PUT。
- SQL UPDATE。
- HTTP 400 與 404。
- 更新與新增的差異。
- Node.js 程序管理。
- PowerShell API 測試。
- Git 里程碑保存。

狀態：已完成並提交 GitHub。

---

## 2026-11-09～2026-11-10｜Milestone 09：交易刪除 API

Milestone：

09

目前 Git 狀態：

本機功能及主要測試已完成，文件更新與 GitHub 提交尚待完成。

### Development

- 新增 DELETE /api/transactions/:id。
- 加入交易 ID 驗證。
- 加入不存在交易處理。
- 加入正常刪除回應。
- 使用 SQLite 刪除指定交易。
- 保留既有資料庫架構。
- 保留 GET、POST、PUT API。
- 不新增額外資料表。

### Troubleshooting

- 初次測試回傳 Cannot DELETE。
- 確認 DELETE 路由已寫入。
- 確認路由位於 app.listen 之前。
- 確認 JavaScript 語法正常。
- 檢查 Port 3000。
- 檢查 Port 3001。
- 確認舊版 Node.js 程序。
- 停止已確認的舊程序。
- 釋放 Port。
- 重新啟動 Express。
- DELETE API 恢復正常。

### Testing

完成：

1. 不合法 ID，HTTP 400。
2. 建立專用交易 ID 2。
3. 正常刪除，HTTP 200。
4. GET 確認 ID 2 不存在。
5. GET 確認 ID 1 保留。
6. 再次刪除 ID 2，HTTP 404。
7. SQLite Integrity Check。
8. SQLite Foreign Key Check。
9. 八個預設分類檢查。

結果：

- 正常刪除成功。
- 不合法 ID 被拒絕。
- 不存在交易正確回傳 404。
- 剩餘交易筆數為 1。
- ID 1 金額維持 NT$150。
- ID 1 備註保持不變。
- SQLite 完整性檢查通過。
- Foreign Key Check 無違規。
- 分類資料保持完整。

### Learning Outcomes

- REST DELETE。
- SQL DELETE。
- CRUD 刪除流程。
- 刪除與修改的差異。
- 專用測試資料的重要性。
- HTTP 200、400、404 的差異。
- GET 驗證 DELETE。
- SQLite 完整性檢查。
- Node.js 程序與 Port。
- Express 預設 404 與自訂 JSON 錯誤。
- 產品測試紀錄。
- 排錯歷程保存。

### Current Status

- DELETE API：已實作。
- 正常刪除：PASS。
- 負向測試：PASS。
- 刪除後資料驗證：PASS。
- SQLite 完整性：PASS。
- 文件更新：進行中。
- Git Commit：待執行。
- GitHub Push：待執行。
- Release：尚未發布。

完成 Git Commit 與 Push 後，應補充：

- 實際 Commit SHA。
- Commit Message。
- Push 結果。
- Git 工作目錄狀態。
- 完成日期。

---

# Next Milestones｜後續開發里程碑

本節區分已完成階段、收尾工作與尚未開始的規劃。

## Milestone 08｜交易修改 API

目前狀態：

已完成並提交 GitHub。

對應 Commit：

`5b3486b`

完成：

- PUT API。
- 正向測試。
- 負向測試。
- 資料完整性驗證。
- 開發文件更新。
- Git Commit。
- GitHub Push。

## Milestone 09｜交易刪除 API

目前狀態：

後端功能與本階段主要驗證完成，文件與 GitHub 提交進行中。

已完成：

- DELETE API。
- 交易 ID 驗證。
- HTTP 200。
- HTTP 400。
- HTTP 404。
- 專用交易建立。
- 正常交易刪除。
- 刪除後資料驗證。
- SQLite 完整性檢查。
- 外鍵檢查。
- 預設分類檢查。
- 舊版伺服器排錯。

尚待完成：

- 完成 CHANGELOG.md 更新。
- 完成 DEVELOPMENT_LOG.md 更新。
- 完成 TESTING.md 更新。
- 核對文件與實際測試。
- Git 差異檢查。
- Git Commit。
- Git Push。
- 確認 Git 工作目錄乾淨。
- 補充 Commit SHA。

## Milestone 10｜前端 CRUD 整合

目前狀態：

尚未開始。

### Planned Features

- 新增交易表單。
- 修改交易表單。
- 刪除交易操作。
- 交易清單動態載入。
- 前端與 REST API 串接。
- 表單資料驗證。
- 操作成功提示。
- 刪除前確認功能。
- HTTP 錯誤訊息顯示。
- 空資料狀態處理。
- 交易清單自動更新。
- 基本響應式版面。

### Planned Testing

- 使用者能從網頁新增交易。
- 使用者能從網頁修改交易。
- 使用者能從網頁刪除交易。
- 前端與 SQLite 資料一致。
- 無效輸入不會破壞既有資料。
- 新增交易後列表正確更新。
- 修改交易後列表正確更新。
- 刪除交易後列表正確更新。
- 不存在交易時有適當提示。
- API 失敗時不顯示錯誤的成功訊息。
- 刪除操作應要求使用者確認。
- 空資料頁面能正確顯示。
- 操作流程在桌面瀏覽器正常。
- 基本行動裝置版面可使用。

### Acceptance Criteria

本里程碑的完成條件：

1. 使用者可透過網頁新增交易。
2. 使用者可透過網頁修改交易。
3. 使用者可透過網頁刪除交易。
4. 使用者可透過網頁查看交易列表。
5. 操作結果正確保存於 SQLite。
6. 前端顯示與後端資料一致。
7. 基本錯誤處理正常。
8. 正向及主要負向測試通過。
9. 更新技術與測試文件。
10. 完成 Git Commit 與 Push。

上述均為預定驗收標準，尚未宣稱完成。

---

## Milestone 11｜財務統計與圖表

目前狀態：

尚未開始。

### Planned Features

- Dashboard 動態載入。
- 本月總收入。
- 本月總支出。
- 本月收支淨額。
- 最近交易紀錄。
- 收入與支出分類統計。
- SQL 聚合查詢。
- SQL GROUP BY。
- 月度財務分析。
- 年度財務分析。
- 財務趨勢圖表。
- 分類支出占比。
- 無資料時的統計處理。
- 統計數據更新機制。

### Planned Testing

- 收入總額計算正確。
- 支出總額計算正確。
- 收支淨額計算正確。
- 分類統計正確。
- 日期篩選不影響其他月份。
- 新增交易後統計同步更新。
- 修改交易後統計同步更新。
- 刪除交易後統計同步更新。
- 空資料時不顯示錯誤數值。
- 圖表與資料庫內容一致。
- 跨月份交易計算正確。
- 日期與時區邊界正確。

### Acceptance Criteria

- Dashboard 能讀取真實資料。
- 統計結果與 SQLite 一致。
- 圖表能正確顯示。
- 主要資料變動能反映於統計。
- 完成基本功能與負向測試。
- 完成文件更新與 Git 提交。

---

## Milestone 12｜進階查詢與資料匯出

目前狀態：

尚未開始。

### Planned Features

- 交易日期區間篩選。
- 交易分類篩選。
- 收入與支出類型篩選。
- 複合查詢條件。
- 進階 SQL 查詢。
- 查詢結果排序。
- 月度及年度範圍查詢。
- CSV 資料匯出。
- 匯出資料欄位設定。
- 空結果處理。
- 資料匯出失敗提示。

### Planned Testing

- 日期區間查詢正確。
- 分類查詢正確。
- 收支類型查詢正確。
- 多條件篩選正確。
- 不合法日期區間遭拒絕。
- CSV 資料筆數正確。
- CSV 欄位完整。
- 中文資料正確。
- 特殊字元正確處理。
- 匯出資料與查詢結果一致。
- 空資料匯出行為正確。
- 不同試算表軟體讀取結果可用。

### Acceptance Criteria

- 進階查詢功能可用。
- 篩選結果正確。
- CSV 匯出成功。
- 匯出資料無明顯遺漏。
- 已完成基本測試。
- 已更新文件並提交 GitHub。

---

## Milestone 13｜整合測試與版本發布

目前狀態：

尚未開始。

### Planned Work

- 完整 CRUD 整合測試。
- API 自動化回歸測試。
- 資料庫完整性測試。
- 前端使用流程測試。
- 錯誤情境測試。
- 資料驗證邊界測試。
- 基本安全性檢查。
- UI 可用性檢查。
- 響應式版面測試。
- Dashboard 數據驗證。
- 財務統計驗證。
- CSV 匯出驗證。
- 效能與穩定性測試。
- README.md 更新。
- CHANGELOG.md 更新。
- DEVELOPMENT_LOG.md 更新。
- TESTING.md 更新。
- Release Notes 整理。
- Git Repository 狀態檢查。
- 正式版本標籤規劃。

### Release Readiness

正式發布前應確認：

1. 核心功能符合預定需求。
2. 正常使用流程測試通過。
3. 重要負向測試通過。
4. 已知重大錯誤已處理。
5. SQLite 資料完整性正常。
6. Git Repository 不包含不應公開的本機財務資料。
7. README 提供正確的安裝與操作說明。
8. 開發文件與實際功能一致。
9. 測試報告列明尚未驗證的範圍。
10. 版本號、Git Tag、Release Notes 一致。

### Planned Release

第一個穩定版本的發布時間與版本號，須於上述驗收完成後再決定。

目前不宣告正式穩定版已發布。

---

# Versioning Notes｜版本管理規範

## 1. Git Commit

每完成一個可驗證的開發里程碑，建立對應 Git Commit。

Commit 訊息採用一致命名方式：

- `feat`：新增功能。
- `fix`：錯誤修復。
- `docs`：文件更新。
- `test`：測試新增或修改。
- `refactor`：程式碼重構。
- `chore`：專案設定或維護。

範例：

`feat: add SQLite categories API`

`feat: implement PUT transaction API and document tests`

`fix: resolve API route loading issue`

`docs: update development and testing records`

## 2. Git 提交流程

建議流程：

1. 完成功能實作。
2. 執行必要測試。
3. 確認測試結果。
4. 檢查資料完整性。
5. 更新相關文件。
6. 執行 Git Status。
7. 執行 Git Diff。
8. 檢查敏感資料及資料庫忽略規則。
9. 執行必要語法檢查。
10. 使用 Git Add 加入預定檔案。
11. 再次確認暫存內容。
12. 建立 Git Commit。
13. Push 至 GitHub。
14. 確認遠端 Commit 已更新。
15. 確認本機工作目錄狀態。
16. 記錄 Commit SHA。
17. 更新里程碑狀態。

## 3. Changelog 維護

每次功能開發完成後：

1. 更新 Unreleased。
2. 記錄新增功能。
3. 記錄功能修改。
4. 記錄實際完成的測試。
5. 記錄已確認的錯誤。
6. 記錄錯誤修復。
7. 更新 Pending。
8. 更新 Development History。
9. 更新 DEVELOPMENT_LOG.md。
10. 更新 TESTING.md。
11. 核對功能與文件一致性。
12. 保存重要 Git Commit。
13. 記錄 GitHub 同步狀態。

不得將尚未執行的測試寫成 PASS。

不得將預計開發的功能寫成已完成。

不得將尚未提交的程式碼寫成已同步 GitHub。

## 4. Release 管理

當功能正式發布時：

1. 確認版本發布條件。
2. 設定版本號。
3. 標示發布日期。
4. 整理對應 CHANGELOG。
5. 建立 Release Notes。
6. 建立 Git Tag。
7. 視需要建立 GitHub Release。
8. 保留舊版本紀錄。
9. 建立新的 Unreleased 區段。
10. 繼續累積後續開發歷程。

## 5. Release Policy

- 目前尚未發布正式版本。
- Git Commit 不等於 Release。
- Git Push 不等於 Release。
- 功能實作不等於完整驗收。
- 正式發布前應完成適當測試。
- 尚未完成的功能不得宣稱正式支援。
- 已知限制應明確記錄。
- 測試證據與版本應可追溯。
- 重要功能更新應保留歷史紀錄。
- 發布後仍應持續維護 Changelog。

## 6. 資料保護原則

- 本機 SQLite 財務資料不應直接提交公開 GitHub Repository。
- `data/money-tracker.db` 應受 `.gitignore` 保護。
- 不應提交包含個人敏感資訊的測試檔案。
- 不應提交 API 金鑰、密碼或其他憑證。
- 發布前應檢查 Git 暫存內容。
- 資料庫結構程式碼與真實財務資料應區分。
- 測試資料應避免包含真實敏感財務資訊。
- 未來若增加使用者帳號功能，應重新評估資料保護與驗證機制。

---

# Documentation｜專案文件索引

## README.md

用途：

- 專案簡介。
- 開發目標。
- 技術架構。
- 安裝方式。
- 啟動方式。
- 已完成功能。
- 使用說明。
- 開發規劃。

## CHANGELOG.md

用途：

- 功能新增。
- 功能修改。
- 錯誤修復。
- 版本歷史。
- 開發里程碑。
- 已完成與待完成狀態。
- 版本發布紀錄。

## docs/DEVELOPMENT_LOG.md

用途：

- 詳細開發過程。
- 技術決策。
- 程式實作。
- 遇到的問題。
- 排錯流程。
- 解決方法。
- 學習成果。
- 開發里程碑紀錄。

## docs/TESTING.md

用途：

- 功能測試。
- API 測試。
- HTTP 狀態驗證。
- 正向測試。
- 負向測試。
- SQLite 完整性檢查。
- 資料持久化驗證。
- 回歸測試。
- 測試限制。
- 驗收結論。

## server/init-db.js

用途：

- SQLite 資料庫初始化。
- 建立資料表。
- 建立預設分類。
- 設定基本資料庫結構。

## server/check-db.js

用途：

- 檢查資料表結構。
- 檢查外鍵。
- 執行 SQLite 完整性驗證。
- 檢查預設分類資料。

## server/server.js

用途：

- Express HTTP Server。
- 靜態網頁服務。
- REST API。
- 交易資料驗證。
- SQLite 交易查詢與操作。
- HTTP 錯誤回應。

---

# Current Project Summary｜目前專案總結

截至 2026-11-10：

Money Tracker 已完成本機單人個人財務管理系統的基礎全端架構。

後端使用 Node.js、Express 及 SQLite，已具備分類查詢及交易資料 GET、POST、PUT、DELETE 的基本操作能力。

前端已完成深色主題 Dashboard、財務摘要卡片與最近交易列表的靜態版面。

資料庫已建立 categories 與 transactions 資料表，並透過主鍵、外鍵及基本資料驗證維持資料關聯。

已實際完成主要 API 功能測試、部分負向測試、交易資料持久化驗證，以及 DELETE API 的資料完整性檢查。

Milestone 08 已完成 Git Commit 與 GitHub Push。

Milestone 09 的 DELETE API 已完成本機實作及主要測試，尚待完成文件更新、Git Commit 與 GitHub Push。

接下來的主要工作為前端 CRUD 整合、動態財務統計、進階查詢、CSV 匯出及完整系統驗收。

目前尚未發布正式穩定版本。

---

# Maintenance Statement｜文件維護聲明

本文件將隨 Money Tracker 的開發進度持續更新。

每次新增功能、修正錯誤、完成測試或達成開發里程碑時，均應補充對應紀錄。

已完成的歷史開發階段應持續保留，避免因後續更新而遺失重要資訊。

開發進度以實際程式碼、測試結果及 Git Commit 紀錄為準。

本文件與 DEVELOPMENT_LOG.md、TESTING.md 應相互對應，但各自保留不同的文件用途。

當專案正式發布版本時，應依據實際完成內容整理版本更新紀錄，並建立適當的 Git Tag 或 GitHub Release。

Money Tracker 將持續以可驗證、可追溯、逐步完成的方式開發與維護。
