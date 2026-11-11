# Money Tracker｜完整開發日誌（DEVELOPMENT LOG）

本文件記錄 Money Tracker 個人財務管理系統從專案初始化至各階段功能開發的實際歷程，涵蓋開發目標、技術選擇、系統架構、資料庫設計、REST API 實作、前端整合、測試驗證、錯誤排除、版本控制、學習成果及後續開發規劃。

本文件採取持續累積的方式維護，目的不僅是記錄專案目前具備哪些功能，也保留每個功能的開發背景、實作原因、測試證據與曾經遇到的問題，讓未來回顧、維護及擴充專案時有明確的參考依據。

本文件不將尚未完成的功能記錄為已完成，也不將單一測試通過解讀為整個系統已完成驗收。

## 文件資訊

- 專案名稱：Money Tracker
- 中文名稱：個人財務管理系統
- 開發起始日期：2026-11-09
- 最後整理日期：2026-11-11
- 目前開發階段：Milestone 10-3｜Frontend Edit Transaction
- 目前主要成果：基本後端 CRUD、動態 Dashboard、前端新增交易及編輯交易
- 目前待完成項目：Milestone 10-3 文件及 Git 提交、前端刪除交易、進階財務分析與完整系統驗收
- 正式 Release：尚未發布

## 目前 Git 狀態

截至本文件整理時：

- Milestone 01～09 已完成 GitHub 提交。
- Milestone 10-1 已完成 GitHub 提交。
- Milestone 10-2 已完成 GitHub 提交。
- Milestone 10-3 已完成本機功能實作與既定主要測試。
- Milestone 10-3 尚未完成正式 Git Commit 與 Push。
- Milestone 10-3 尚未取得實際 Commit SHA。

注意：文件內容更新完成，不代表已自動提交到 GitHub。

---

# 一、專案基本資訊

## 1.1 專案資訊

| 項目            | 內容                      |
| --------------- | ------------------------- |
| 專案名稱        | Money Tracker             |
| 中文名稱        | 個人財務管理系統          |
| 專案性質        | 個人全端網頁開發專案      |
| 開發模式        | 本機、單人開發            |
| 作業系統        | Windows                   |
| 程式編輯器      | Visual Studio Code        |
| 前端技術        | HTML5、CSS3、JavaScript   |
| 後端執行環境    | Node.js                   |
| 後端框架        | Express                   |
| 資料庫          | SQLite                    |
| SQLite 模組     | node:sqlite               |
| SQLite 介面     | DatabaseSync              |
| API 風格        | REST API                  |
| 資料交換格式    | JSON                      |
| API 測試工具    | PowerShell、curl.exe      |
| 前端測試瀏覽器  | Microsoft Edge            |
| 版本控制        | Git                       |
| 遠端 Repository | GitHub                    |
| 本機開發位置    | C:\Projects\Money-Tracker |
| 預設 HTTP Port  | 3000                      |
| 專案起始日期    | 2026-11-09                |

GitHub Repository：

https://github.com/Chiou-Jiakang/Money-Tracker

## 1.2 初始開發環境

專案初始化時確認的版本：

- Node.js：v24.15.0
- npm：11.12.1
- Git：2.54.0.windows.1

以上為當次環境檢查結果。

後續若 Node.js、npm、Git 或其他相依套件更新，不代表本文件原始版本資訊必須同步改寫。

必要時可另外增加環境升級紀錄，以保留原始開發條件。

## 1.3 專案建立背景

Money Tracker 是獨立於其他練習專案的全端開發作品。

本專案的主要目的，是透過一套具備實際資料儲存及使用者操作介面的財務管理系統，練習完整的網頁應用程式開發流程。

相較於僅使用 HTML、CSS、JavaScript 建立靜態頁面，本專案需要整合：

1. 使用者操作介面。
2. HTTP 請求與回應。
3. 後端路由。
4. 資料驗證。
5. SQL 資料操作。
6. SQLite 持久化儲存。
7. 使用者介面更新。
8. 例外與錯誤處理。
9. 測試與除錯。
10. Git 版本管理。

因此，開發流程採取逐步建立、逐項驗證的方式，而不是一次完成全部功能後才進行測試。

## 1.4 專案功能目標

Money Tracker 預計提供：

1. 新增收入交易。
2. 新增支出交易。
3. 查詢歷史交易。
4. 修改既有交易。
5. 刪除指定交易。
6. 使用交易分類。
7. 顯示本月總收入。
8. 顯示本月總支出。
9. 計算本月收支淨額。
10. 顯示最近交易紀錄。
11. 依日期查詢交易。
12. 依分類查詢交易。
13. 依收支類型篩選。
14. 進行月度財務統計。
15. 進行年度財務統計。
16. 顯示支出分類占比。
17. 顯示財務趨勢。
18. 匯出 CSV。
19. 保存歷史交易紀錄。
20. 提供基本錯誤處理與資料驗證。

其中交易分類查詢、交易 CRUD 後端 API、基本 Dashboard、前端新增交易及前端編輯交易，已依各階段完成既定功能及主要驗證。

其餘功能依照後續里程碑逐步實作。

## 1.5 核心學習目標

本專案希望建立下列能力：

### Frontend

- 理解 HTML 文件結構。
- 使用 CSS 設計頁面。
- 使用 JavaScript 操作 DOM。
- 處理表單輸入。
- 處理按鈕事件。
- 使用 Fetch API。
- 解析 JSON。
- 根據 API 結果動態更新畫面。
- 顯示成功與錯誤訊息。
- 理解使用者介面狀態管理。

### Backend

- 使用 Node.js 執行 JavaScript。
- 使用 Express 建立 HTTP Server。
- 建立 REST API。
- 理解 HTTP Method。
- 理解 HTTP Status Code。
- 驗證 Request Body。
- 處理 URL Parameter。
- 執行 SQL。
- 處理資料庫例外。
- 回傳一致的 JSON 結果。

### Database

- 建立 SQLite 資料庫。
- 設計關聯式資料表。
- 理解 Primary Key。
- 理解 Foreign Key。
- 使用 SQL SELECT。
- 使用 SQL INSERT。
- 使用 SQL UPDATE。
- 使用 SQL DELETE。
- 理解資料持久化。
- 維護資料完整性。

### Software Engineering

- 將需求拆分為可執行階段。
- 建立可驗證的 Milestone。
- 執行正向與負向測試。
- 記錄問題排除過程。
- 理解開發環境與執行程序的關係。
- 使用 Git Commit 保存版本。
- 使用 GitHub 維護原始碼。
- 撰寫技術與測試文件。
- 保留可追溯的開發歷史。

## 1.6 開發方法

本專案目前採用下列基本流程：

1. 定義本階段功能目標。
2. 檢查現有程式碼。
3. 確認要修改的檔案。
4. 實作單一功能或相關功能集合。
5. 執行基本語法檢查。
6. 啟動本機伺服器。
7. 執行正常功能測試。
8. 執行主要負向測試。
9. 確認資料完整性。
10. 記錄問題與排查方式。
11. 更新 CHANGELOG。
12. 更新 DEVELOPMENT_LOG。
13. 更新 TESTING。
14. 檢查 Git 差異。
15. 建立 Commit。
16. Push 至 GitHub。
17. 確認提交結果。
18. 進入下一階段。

此流程不表示每個階段都需要執行完全相同的測試，而是依功能風險選擇適當的驗證方式。

---

# 二、系統技術架構

## 2.1 系統分層

Money Tracker 主要分成三個層次：

1. Frontend。
2. Backend。
3. Database。

各層負責不同工作，透過明確的介面交換資料。

### Frontend

技術：

- HTML。
- CSS。
- JavaScript。

主要責任：

- 顯示 Money Tracker 網頁。
- 顯示 Dashboard。
- 顯示最近交易。
- 提供使用者操作表單。
- 讀取使用者輸入。
- 進行基本輸入驗證。
- 發送 HTTP Request。
- 接收 API Response。
- 更新畫面。
- 顯示錯誤提示。

前端不直接操作 SQLite 資料庫。

交易資料必須透過後端 API 讀取或修改。

### Backend

技術：

- Node.js。
- Express。

主要責任：

- 啟動 HTTP Server。
- 提供靜態檔案。
- 接收 API Request。
- 解析 JSON。
- 驗證資料。
- 處理 API 路由。
- 存取 SQLite。
- 回傳 JSON。
- 處理例外。

後端是資料庫與前端之間的主要介面。

### Database

技術：

- SQLite。
- node:sqlite。
- DatabaseSync。

主要責任：

- 保存分類。
- 保存交易紀錄。
- 維護資料表關聯。
- 提供查詢。
- 支援資料新增。
- 支援資料修改。
- 支援資料刪除。
- 保持資料持久化。

## 2.2 系統資料流

一般資料流程：

使用者

→ Browser

→ JavaScript

→ HTTP Request

→ Express REST API

→ SQL

→ SQLite Database

→ SQL Result

→ Express JSON Response

→ JavaScript

→ DOM Update

→ Browser 顯示結果

### 技術意義

使用者看到的網頁並不是直接連接 SQLite。

前端透過 HTTP API 與後端溝通。

後端才有權限執行資料庫操作。

這種分工讓畫面、資料驗證與資料儲存邏輯能相對獨立，便於後續修改與測試。

## 2.3 專案檔案架構

目前重要檔案：

```text
Money-Tracker/
├── data/
│   └── money-tracker.db
│
├── docs/
│   ├── DEVELOPMENT_LOG.md
│   └── TESTING.md
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js
│
├── server/
│   ├── init-db.js
│   ├── check-db.js
│   └── server.js
│
├── node_modules/
│
├── .gitignore
├── CHANGELOG.md
├── README.md
├── package.json
└── package-lock.json
```

### 檔案說明

`public/index.html`

- 定義網頁結構。
- 建立 Dashboard。
- 建立交易表單。
- 建立最近交易表格。
- 提供 JavaScript 操作所需的 DOM 元素。

`public/style.css`

- 定義深色視覺主題。
- 控制頁面版面。
- 控制 Dashboard 卡片。
- 控制交易表單。
- 控制交易清單。
- 控制按鈕及提示訊息。

`public/app.js`

- 取得 DOM 元素。
- 發送 Fetch API 請求。
- 載入分類。
- 載入交易。
- 計算 Dashboard。
- 顯示最近交易。
- 處理新增交易。
- 處理編輯交易。
- 顯示 API 執行結果。
- 進行前端資料驗證。

`server/server.js`

- 建立 Express Server。
- 設定 Port。
- 設定 Middleware。
- 提供靜態檔案。
- 建立 REST API。
- 讀寫 SQLite。
- 驗證 Request。
- 回傳 JSON。

`server/init-db.js`

- 初始化資料庫。
- 建立資料表。
- 建立預設分類。

`server/check-db.js`

- 檢查資料表結構。
- 檢查主鍵與外鍵。
- 執行 SQLite Integrity Check。
- 執行 Foreign Key Check。
- 確認預設分類。

`data/money-tracker.db`

- 儲存實際交易與分類資料。
- 不應直接提交至公開 GitHub。

`docs/DEVELOPMENT_LOG.md`

- 保存完整開發過程。

`docs/TESTING.md`

- 保存測試流程及結果。

`CHANGELOG.md`

- 保存功能更新、版本及里程碑。

`README.md`

- 提供專案介紹、安裝及使用說明。

## 2.4 REST API

| Method | Endpoint              | 功能           | 目前狀態 |
| ------ | --------------------- | -------------- | -------- |
| GET    | /api/health           | 伺服器健康檢查 | 已完成   |
| GET    | /api/categories       | 查詢分類       | 已完成   |
| GET    | /api/transactions     | 查詢交易       | 已完成   |
| POST   | /api/transactions     | 新增交易       | 已完成   |
| PUT    | /api/transactions/:id | 修改交易       | 已完成   |
| DELETE | /api/transactions/:id | 刪除交易       | 已完成   |

以上為後端 API。

前端使用者介面目前已整合 GET、POST 與 PUT 交易操作。

DELETE 後端雖已完成，但前端刪除介面尚未實作。

## 2.5 HTTP Method 的分工

### GET

用途：

讀取伺服器資源。

Money Tracker 使用 GET 查詢：

- Health。
- Categories。
- Transactions。

GET 不應因單純查詢而修改交易內容。

### POST

用途：

建立新資源。

Money Tracker 使用 POST 建立交易。

新增成功後，由資料庫產生交易 ID。

成功狀態為 HTTP 201。

### PUT

用途：

更新指定資源。

Money Tracker 使用 PUT 更新完整交易欄位。

修改原有交易，不另外新增交易。

成功狀態為 HTTP 200。

### DELETE

用途：

刪除指定資源。

Money Tracker 使用 DELETE 刪除指定交易 ID。

成功狀態為 HTTP 200。

不合法 ID 與不存在交易會使用不同錯誤狀態。

## 2.6 HTTP Status Code

目前主要使用：

| HTTP Status | 意義                  | 使用情境                 |
| ----------- | --------------------- | ------------------------ |
| 200         | OK                    | 查詢、修改、刪除成功     |
| 201         | Created               | 新增交易成功             |
| 400         | Bad Request           | 輸入不符合規格           |
| 404         | Not Found             | 指定交易不存在           |
| 500         | Internal Server Error | 後端執行時發生非預期錯誤 |

500 錯誤的程式處理機制與實際故障注入測試應分別看待。

目前尚未完成所有資料庫故障情境的測試。

## 2.7 JSON 資料交換

前端與後端透過 JSON 交換交易資料。

有效交易 Request Body 範例：

```json
{
  "category_id": 4,
  "amount": 180,
  "transaction_date": "2026-11-10",
  "note": "Milestone 10-3 edit test"
}
```

欄位說明：

- `category_id`：交易分類。
- `amount`：正整數金額。
- `transaction_date`：日期。
- `note`：備註。

分類名稱與收入支出類型可透過分類關聯查詢取得。

因此，前端不需要在每筆交易中重複提交分類名稱。

## 2.8 前端與 API 的同步方式

Milestone 10-1～10-3 使用 JavaScript 取得後端資料。

在新增或修改成功後，前端重新查詢交易清單，讓畫面顯示 SQLite 中的最新資料。

這種方式的優點：

- 不需要手動修改每張 Dashboard 卡片。
- 降低畫面與後端資料不一致的風險。
- 可以利用相同的查詢流程更新交易清單。
- 讓資料顯示邏輯更集中。

限制：

- 仍須處理重新查詢失敗。
- 必須避免將 API 失敗誤判為成功。
- 未來資料量增加時，需要評估查詢與更新效率。
- 尚未實作完整的即時多人同步。

## 2.9 開發階段的技術界線

目前 Money Tracker 主要是本機單人系統。

現階段沒有宣稱具備：

- 多使用者帳號。
- 雲端資料同步。
- 使用者身分驗證。
- 權限管理。
- 多裝置即時同步。
- 正式部署環境。
- 完整生產環境監控。

上述功能不是目前 MVP 的必要條件。

未來若擴充成公開服務，需要重新設計使用者身分、資料隔離、備份及安全機制。

---

# 三、資料庫設計

## 3.1 資料庫位置

資料庫檔案：

`data/money-tracker.db`

使用：

`node:sqlite`

主要存取介面：

`DatabaseSync`

本專案採用本機檔案型資料庫，不需要獨立執行 MySQL 或 PostgreSQL Server。

## 3.2 SQLite 技術選擇

選擇 SQLite 的原因：

1. 適合本機單人系統。
2. 安裝與維護相對簡單。
3. 不需要另外架設資料庫服務。
4. 可以練習 SQL。
5. 支援關聯式資料表。
6. 支援主鍵及外鍵。
7. 支援資料持久化。
8. 適合目前專案規模。

使用 SQLite 不代表它適用於所有未來情境。

若未來增加大量同時寫入、多使用者或跨裝置服務，應重新評估資料庫架構。

## 3.3 Categories 資料表

用途：

保存收入與支出分類。

欄位：

| 欄位 | 型別    | 限制        |
| ---- | ------- | ----------- |
| id   | INTEGER | Primary Key |
| name | TEXT    | NOT NULL    |
| type | TEXT    | NOT NULL    |

`type` 用於區分：

- income。
- expense。

此分類設計讓交易金額不需要透過正負號辨識收支類型。

## 3.4 Transactions 資料表

用途：

保存每筆交易。

欄位：

| 欄位             | 型別    | 限制                             |
| ---------------- | ------- | -------------------------------- |
| id               | INTEGER | Primary Key                      |
| category_id      | INTEGER | NOT NULL                         |
| amount           | INTEGER | NOT NULL                         |
| transaction_date | TEXT    | NOT NULL                         |
| note             | TEXT    | 可為空值，預設空字串             |
| created_at       | TEXT    | NOT NULL，預設 CURRENT_TIMESTAMP |

主要資料：

- 交易 ID。
- 分類 ID。
- 金額。
- 交易日期。
- 備註。
- 建立時間。

`transaction_date` 是使用者記錄的交易日期。

`created_at` 是資料紀錄建立時間。

兩者用途不同，不應混用。

## 3.5 Primary Key

`transactions.id`

作為交易唯一識別碼。

每筆交易使用不同 ID。

前端編輯及刪除交易時，透過該 ID 指定目標。

修改交易內容不應更換原始交易 ID。

## 3.6 Foreign Key

`transactions.category_id`

參照：

`categories.id`

外鍵設定：

- ON UPDATE：NO ACTION。
- ON DELETE：RESTRICT。

後端使用：

`PRAGMA foreign_keys = ON`

此設定用於啟用 SQLite 外鍵檢查。

`ON DELETE RESTRICT` 代表分類仍被交易使用時，不能直接刪除該分類。

此規則不會禁止刪除交易本身。

## 3.7 預設分類

| ID  | 分類名稱 | 類型    |
| --- | -------- | ------- |
| 1   | 薪資     | income  |
| 2   | 獎金     | income  |
| 3   | 其他收入 | income  |
| 4   | 餐飲     | expense |
| 5   | 交通     | expense |
| 6   | 購物     | expense |
| 7   | 娛樂     | expense |
| 8   | 其他支出 | expense |

收入分類：3 個。

支出分類：5 個。

總計：8 個。

## 3.8 金額資料設計

交易金額使用新臺幣整數。

例如：

- NT$120。
- NT$150。
- NT$180。
- NT$30,000。

API 要求：

- 必須為數字。
- 必須為整數。
- 必須大於零。
- 必須在 JavaScript 安全整數範圍內。

後端使用 `Number.isSafeInteger()` 等條件驗證。

不接受：

- 負數。
- 零。
- 小數。
- 不合法的金額型態。

收入與支出由分類的 `type` 決定。

資料庫中的正常交易金額使用正整數儲存。

前端顯示支出時，可以另外加上負號作為視覺提示。

## 3.9 日期設計

交易日期格式：

`YYYY-MM-DD`

例如：

`2026-11-09`

驗證要求：

- 必須為字串。
- 符合指定格式。
- 日期真實存在。

例如：

`2026-02-30`

屬於不存在的日期，必須拒絕。

日期資料以文字儲存。

採用固定格式有利於依年月日排序與比較。

## 3.10 備註欄位

欄位名稱：

`note`

用途：

記錄交易補充說明。

限制：

- 必須為字串。
- 最長 500 個 JavaScript 字串長度單位。
- 可以省略。
- 省略時使用空字串。

目前長度限制依 JavaScript 字串 `.length` 判斷。

此數值不必然等同於使用者在畫面上看到的 Unicode 字元數量。

## 3.11 SQL 操作

目前主要 SQL 操作：

### SELECT

讀取分類或交易。

### INSERT

新增交易。

### UPDATE

修改既有交易。

### DELETE

刪除指定交易。

### INNER JOIN

關聯交易與分類。

### ORDER BY

控制交易列表排序。

後續財務分析預計使用：

- SUM。
- GROUP BY。
- 日期區間查詢。
- 分類統計。

上述進階 SQL 分析尚未全部實作。

## 3.12 SQL 參數化

POST、PUT、DELETE 等資料庫操作採用參數化 SQL。

目的：

- 避免直接將使用者輸入拼接成 SQL。
- 降低 SQL Injection 風險。
- 讓資料值與 SQL 指令結構分離。

參數化 SQL 是必要的安全措施之一，但不代表系統已通過完整安全性驗收。

## 3.13 資料持久化

SQLite 將交易儲存在本機資料庫檔案。

重新啟動 Express 不應清除已儲存交易。

目前已完成交易新增後的伺服器重新啟動測試。

測試結果顯示原交易資料成功保留。

## 3.14 資料完整性

目前使用：

`PRAGMA integrity_check`

檢查 SQLite 資料庫完整性。

使用：

`PRAGMA foreign_key_check`

檢查外鍵違規情況。

在 Milestone 05 與 09 的既定測試中：

- integrity_check 回傳 ok。
- foreign_key_check 未發現違規。

這些結果反映當次測試狀態，不代表未來任何時點的資料庫都必然沒有問題。

## 3.15 Git 與資料庫保護

本機資料庫包含交易紀錄，不應直接提交至公開 Repository。

使用 `.gitignore` 排除：

`*.db`

曾使用：

`git check-ignore -v data/money-tracker.db`

確認資料庫受到忽略規則保護。

另外：

- 不應提交 node_modules。
- 不應提交密碼。
- 不應提交 API Key。
- 不應提交私人財務紀錄。
- 應在 Commit 前檢查實際暫存檔案。

## 3.16 資料庫設計的已知限制

目前尚未完成：

- 使用者帳號與資料隔離。
- 完整資料庫備份與還原流程。
- 資料庫故障注入測試。
- 大量交易效能測試。
- 完整並行寫入測試。
- 自訂分類 CRUD。
- 資料遷移機制。
- 資料版本升級機制。

以上不影響目前基本單人交易 CRUD 的已驗證功能，但應列入未來擴充時的技術考量。

---

# 四、完整開發歷程

本節依照實際開發順序，保留各階段的目標、功能、測試與 Git 紀錄。

## 2026-11-09｜Milestone 01：專案初始化

### 4.1 開發目標

建立獨立的 Money Tracker 專案。

確保此專案不會與既有程式作品混用資料夾、Git Repository 或開發檔案。

### 4.2 完成內容

1. 建立本機專案資料夾。
2. 使用 VS Code 開啟專案。
3. 加入既有多根目錄 Workspace。
4. 確認 Node.js。
5. 確認 npm。
6. 確認 Git。
7. 建立本機 Git Repository。
8. 設定 main 分支。
9. 建立 GitHub Repository。
10. 設定 origin。
11. 建立 README.md。
12. 建立 .gitignore。
13. 建立初始 Commit。
14. Push 至 GitHub。

### 4.3 開發位置

專案實際位置：

`C:\Projects\Money-Tracker`

選用此位置的目的，是讓程式專案儲存在明確且獨立的本機資料夾。

此位置也有助於避免把開發檔案放在可能自動同步的 OneDrive Desktop 之中。

### 4.4 VS Code Workspace 問題

開發初期曾遇到 VS Code 視窗管理問題。

Money Tracker 一度在另一個 VS Code 視窗中開啟。

處理方式：

將 Money Tracker 加入既有 Workspace，同時保持其實際專案位置獨立。

### 4.5 學習成果

- 理解 Workspace。
- 理解專案資料夾。
- 理解 Git Repository。
- 理解 Git Working Tree。
- 理解 Git Staging Area。
- 學習 git add。
- 學習 git commit。
- 學習 git push。
- 理解本機與遠端版本的差異。

### 4.6 Git 紀錄

Commit：

`1798256`

Commit Message：

`chore: initialize Money Tracker project`

狀態：

已提交 GitHub。

---

## 2026-11-09｜Milestone 02：Express 後端建置

### 4.7 開發目標

建立 Node.js HTTP Server。

讓瀏覽器可以透過 HTTP 與 Money Tracker 後端溝通。

### 4.8 完成內容

- 使用 npm 初始化專案。
- 建立 package.json。
- 安裝 Express。
- 建立 package-lock.json。
- 建立 server/server.js。
- 設定預設 Port 3000。
- 支援 PORT 環境變數。
- 使用 express.json()。
- 建立 GET /api/health。
- 設定 npm start。

### 4.9 Health API

Endpoint：

`GET /api/health`

成功回應：

```json
{
  "status": "ok",
  "message": "Money Tracker API is running"
}
```

### 4.10 啟動測試

執行：

`npm start`

預期伺服器輸出：

`Money Tracker server running at http://localhost:3000`

實際結果：

- Express 啟動成功。
- localhost:3000 可以連線。
- Health API 回應正確。
- PowerShell 可以取得 JSON。

### 4.11 技術理解

HTTP Server 是接收網路請求的程序。

Express 用於建立 API 路由與處理 Request、Response。

Port 3000 是本機 HTTP 服務使用的監聽 Port。

如果沒有程序正在監聽，瀏覽器或 PowerShell 就無法取得正常的 API 回應。

### 4.12 學習成果

- Node.js。
- npm。
- Express。
- Routing。
- HTTP Request。
- HTTP Response。
- JSON。
- Port。
- Server Process。

### 4.13 Git 紀錄

Commit：

`23e6afe`

Commit Message：

`feat: set up Express server and health API`

狀態：

已提交 GitHub。

---

## 2026-11-09｜Milestone 03：前端首頁建置

### 4.14 開發目標

建立 Money Tracker 的第一個網頁畫面。

透過 Express 提供靜態 HTML 與 CSS。

### 4.15 新增檔案

- public/index.html。
- public/style.css。

### 4.16 頁面設計

包含：

- Money Tracker 標題。
- 個人財務管理系統副標題。
- 深色網頁背景。
- 內容容器。
- 初步 Dashboard 區域。

### 4.17 靜態檔案服務

Express 提供 public 內的靜態檔案。

瀏覽器透過 localhost:3000 取得首頁。

### 4.18 測試結果

- HTML 正常顯示。
- CSS 正常載入。
- 標題正常。
- 副標題正常。
- 深色主題正常。

### 4.19 學習成果

- HTML 基本結構。
- CSS 視覺樣式。
- 前端靜態檔案。
- Express Static Middleware。
- 前後端基本整合。

### 4.20 Git 紀錄

Commit：

`fe6cd52`

Commit Message：

`feat: add styled frontend homepage`

狀態：

已提交 GitHub。

---

## 2026-11-09｜Milestone 04：Dashboard 與交易列表版面

### 4.21 開發目標

建立財務資訊展示介面。

為未來連接 SQLite 與 REST API 預留頁面結構。

### 4.22 Dashboard 設計

建立三個主要財務指標：

1. 本月總收入。
2. 本月總支出。
3. 本月收支淨額。

透過不同顏色協助使用者區分收入、支出與淨額。

### 4.23 最近交易列表

建立交易表格。

包含：

- 日期。
- 類型。
- 分類。
- 金額。
- 備註。

另外加入沒有交易時的空資料提示。

### 4.24 CSS

調整：

- 卡片版面。
- 卡片間距。
- 文字層級。
- 表格樣式。
- 區塊排列。
- 深色主題配色。

### 4.25 測試結果

- 三張財務卡片正常顯示。
- 最近交易列表正常顯示。
- 空資料提示正常。
- 桌面版面符合當時需求。

### 4.26 階段限制

此階段主要為靜態 UI。

當時尚未：

- 從 SQLite 讀取交易。
- 真正計算收入。
- 真正計算支出。
- 自動計算淨額。
- 根據 API 更新交易清單。

後續 Milestone 10-1 已處理動態資料整合。

### 4.27 學習成果

- Dashboard 資訊架構。
- 財務摘要設計。
- CSS 排版。
- 空資料狀態。
- 前端畫面與資料來源的分工。

### 4.28 Git 紀錄

Commit：

`d654756`

Commit Message：

`feat: add dashboard summary and recent transactions layout`

狀態：

已提交 GitHub。

---

## 2026-11-09｜Milestone 05：SQLite 資料庫初始化

### 4.29 開發目標

建立可持久化保存交易紀錄的資料庫。

### 4.30 技術選擇

使用：

- Node.js。
- node:sqlite。
- DatabaseSync。
- SQLite。

資料庫：

`data/money-tracker.db`

### 4.31 新增內容

- 建立 data 資料夾。
- 建立 SQLite 檔案。
- 建立 categories。
- 建立 transactions。
- 設定 Primary Key。
- 設定 Foreign Key。
- 建立八個預設分類。
- 建立 init-db.js。
- 建立 check-db.js。

### 4.32 外鍵設定

啟用：

`PRAGMA foreign_keys = ON`

Transactions 使用 category_id 關聯 Categories。

### 4.33 初始化測試

執行：

`node server/init-db.js`

實際結果：

- 資料庫初始化成功。
- Categories：8。
- Transactions：0。

### 4.34 結構檢查

執行：

`node server/check-db.js`

實際結果：

- Categories Table 正常。
- Transactions Table 正常。
- Foreign Key 正常。
- Integrity Check：ok。
- Foreign Key Check：無違規。
- 八個預設分類存在。

### 4.35 Git 忽略規則

資料庫包含交易紀錄，不應提交至公開 Repository。

使用 `.gitignore` 排除資料庫檔案。

### 4.36 學習成果

- Relational Database。
- SQLite。
- SQL Schema。
- Primary Key。
- Foreign Key。
- Referential Integrity。
- 資料持久化。
- Git 資料保護。

### 4.37 Git 紀錄

Commit：

`eacbbb8`

Commit Message：

`feat: initialize SQLite database and verify schema`

狀態：

已提交 GitHub。

---

## 2026-11-09｜Milestone 06：分類查詢 API

### 4.38 開發目標

讓 Express 可以從 SQLite 查詢交易分類。

### 4.39 Endpoint

`GET /api/categories`

### 4.40 SQL

使用 SELECT 查詢 categories。

依照分類 ID 排序。

### 4.41 JSON 回應

回傳：

- success。
- count。
- data。

### 4.42 測試結果

實際取得：

- success：true。
- count：8。
- data：八個分類。

確認：

- 收入分類三個。
- 支出分類五個。
- 分類名稱正確。
- 分類類型正確。
- Health API 仍正常。

### 4.43 後續用途

此 API 後續用於前端新增交易表單。

前端可以根據 API 回傳的分類資料建立下拉選單。

不需要將分類名稱完全固定寫入 HTML。

### 4.44 學習成果

- SQL SELECT。
- SQL ORDER BY。
- JSON Array。
- Express GET API。
- 分類資料與交易資料分離。

### 4.45 Git 紀錄

Commit：

`703b3f6`

Commit Message：

`feat: add SQLite categories API`

狀態：

已提交 GitHub。

---

## 2026-11-09｜Milestone 07：GET 與 POST 交易 API

### 4.46 開發目標

建立交易查詢與新增功能。

### 4.47 GET Transactions

Endpoint：

`GET /api/transactions`

使用 INNER JOIN：

- transactions。
- categories。

回傳：

- id。
- category_id。
- category_name。
- type。
- amount。
- transaction_date。
- note。
- created_at。

排序：

1. transaction_date DESC。
2. id DESC。

無交易資料時：

```json
{
  "success": true,
  "count": 0,
  "data": []
}
```

### 4.48 POST Transactions

Endpoint：

`POST /api/transactions`

Request Body：

```json
{
  "category_id": 4,
  "amount": 120,
  "transaction_date": "2026-11-09",
  "note": "Lunch test"
}
```

### 4.49 POST 處理流程

1. 解析 JSON。
2. 驗證 Request Body。
3. 驗證分類。
4. 驗證金額。
5. 驗證日期。
6. 驗證備註。
7. 執行 SQL INSERT。
8. 取得新交易 ID。
9. 重新查詢新交易。
10. 回傳 JSON。

### 4.50 正向測試

新增：

- 分類：餐飲。
- 金額：NT$120。
- 日期：2026-11-09。
- 備註：Lunch test。

實際結果：

- HTTP 201。
- success：true。
- 新交易 ID：1。
- GET 可查詢。
- SQLite 成功保存。

測試狀態：PASS。

### 4.51 POST 負向測試

已完成：

1. 負數金額。
2. 不存在分類。
3. 不存在日期。
4. 零元金額。
5. 小數金額。
6. 超長備註。

加上正常新增，共七個既定案例。

結果：

- 正常新增成功。
- 六項無效資料遭拒絕。
- 對應非法輸入回傳 HTTP 400。
- 原交易沒有被破壞。
- 不合法輸入沒有新增額外交易。

### 4.52 資料持久化

測試：

1. 新增交易。
2. GET 確認。
3. 停止伺服器。
4. 重新啟動。
5. 再次 GET。

實際結果：

- 重啟前 count：1。
- 重啟後 count：1。
- 原交易保留。

測試狀態：PASS。

### 4.53 API 連線問題

曾在 PowerShell 執行 API 請求時出現：

`無法連接至遠端伺服器`

排查後發現，當時沒有持續運作的 Express 伺服器供測試終端機連線。

改善：

- 使用一個終端機啟動伺服器。
- 使用另一個終端機執行 API 測試。
- 測試前先查詢 Health API。

### 4.54 開發文件

建立：

- CHANGELOG.md。
- docs/DEVELOPMENT_LOG.md。
- docs/TESTING.md。

目的：

將功能更新、技術開發與測試證據分別管理。

### 4.55 學習成果

- GET。
- POST。
- SQL INNER JOIN。
- SQL INSERT。
- HTTP 201。
- HTTP 400。
- 輸入驗證。
- 資料持久化。
- PowerShell API 測試。
- 開發文件維護。

### 4.56 Git 紀錄

Commit：

`8c5b850`

Commit Message：

`feat: add transaction APIs and development documentation`

狀態：

已提交 GitHub。

---

## 2026-11-09｜Milestone 08：PUT 修改交易 API

### 4.57 開發目標

讓 Money Tracker 可以修改 SQLite 中的既有交易。

修改交易不需要先刪除再新增。

### 4.58 Endpoint

`PUT /api/transactions/:id`

### 4.59 PUT 設計

使用完整欄位更新。

支援修改：

- category_id。
- amount。
- transaction_date。
- note。

未來若需要部分欄位更新，可以另行考慮 PATCH。

目前尚未實作 PATCH API。

### 4.60 Request Body

範例：

```json
{
  "category_id": 4,
  "amount": 150,
  "transaction_date": "2026-11-09",
  "note": "Updated lunch test"
}
```

主要欄位：

- category_id。
- amount。
- transaction_date。

note 可省略，省略時使用空字串。

### 4.61 實作流程

1. 取得 URL 中的交易 ID。
2. 驗證交易 ID。
3. 驗證 Request Body。
4. 驗證分類。
5. 驗證金額。
6. 驗證日期。
7. 驗證備註。
8. 確認交易存在。
9. 確認分類存在。
10. 執行 SQL UPDATE。
11. 重新查詢更新後資料。
12. 回傳 JSON。

### 4.62 HTTP Status

正常修改：

HTTP 200。

不存在交易：

HTTP 404。

不合法資料：

HTTP 400。

### 4.63 正向測試

原始交易：

- ID：1。
- category_id：4。
- amount：120。
- transaction_date：2026-11-09。
- note：Lunch test。

修改後：

- ID：1。
- category_id：4。
- amount：150。
- transaction_date：2026-11-09。
- note：Updated lunch test。

實際結果：

- success：true。
- Transaction updated successfully。
- amount 更新為 150。
- note 更新成功。
- ID 維持 1。
- created_at 不變。
- count 維持 1。

測試狀態：PASS。

### 4.64 負向測試

已完成：

1. 不存在交易 ID。
2. 金額為零。
3. 金額為小數。
4. 不存在分類。
5. 不存在日期。
6. 超長備註。

結果：

- 正常修改 HTTP 200。
- 不存在交易 HTTP 404。
- 五項無效資料 HTTP 400。

### 4.65 修改後資料完整性

使用 GET API 查詢。

確認：

- success：true。
- count：1。
- id：1。
- category_id：4。
- amount：150。
- note：Updated lunch test。

確認不合法 PUT 請求沒有破壞原交易。

### 4.66 PUT 路由問題

第一次測試：

`PUT /api/transactions/1`

Express 回傳：

`Cannot PUT /api/transactions/1`

當時 server.js 已存在 PUT 路由。

JavaScript 基本語法檢查通過。

因此需要確認執行中的伺服器版本。

### 4.67 Port 3000 程序檢查

使用 Get-NetTCPConnection。

當時查得：

- PID：9440。
- Process：node.exe。
- CommandLine：node server/server.js。

### 4.68 Port 3001 對照測試

設定：

`$env:PORT = "3001"`

啟動新版 Express。

實際結果：

- Health API 成功。
- PUT API 成功。
- GET API 成功。
- 資料修改正確。

這表示新版程式在 Port 3001 能正常提供 PUT 功能。

### 4.69 修復方式

1. 停止已確認的 Port 3000 舊程序。
2. 停止不需要的 Port 3001 測試伺服器。
3. 清除測試用 PORT 環境設定。
4. 重新啟動 Port 3000。
5. 再次執行 Health API。
6. 再次執行 GET。
7. 再次執行 PUT。

結果：

API 恢復正常。

### 4.70 可能原因

原本 Port 3000 的 Node.js 程序可能尚未載入新版 PUT 路由。

這是根據排查結果推定，沒有直接驗證舊程序記憶體中的路由內容。

### 4.71 PowerShell 輸出誤當指令

曾將：

`Money Tracker server running at http://localhost:3001`

直接輸入 PowerShell。

結果：

`CommandNotFoundException`

原因：

這是伺服器輸出的訊息，不是 PowerShell 指令。

### 4.72 學習成果

- REST PUT。
- SQL UPDATE。
- HTTP 400 與 404。
- 完整交易更新。
- 資料完整性。
- Port 監聽。
- Node.js 程序管理。
- 舊程序與新版程式碼的差異。
- PowerShell 測試。
- Git 版本保存。

### 4.73 Git 紀錄

Commit：

`5b3486b`

Commit Message：

`feat: implement PUT transaction API and document tests`

已完成：

- server/server.js 更新。
- CHANGELOG 更新。
- DEVELOPMENT_LOG 更新。
- TESTING 更新。
- Commit。
- Push。

狀態：

已提交 GitHub。

---

## 2026-11-09～2026-11-10｜Milestone 09：DELETE 刪除交易 API

### 4.74 開發目標

完成交易刪除功能，使後端具備基本 CRUD。

要求：

- 刪除指定交易。
- 拒絕無效 ID。
- 不存在交易回傳 404。
- 其他交易保持完整。
- 資料庫結構不受破壞。

### 4.75 Endpoint

`DELETE /api/transactions/:id`

由 URL 指定交易 ID。

不需要 Request Body。

### 4.76 主要實作

1. 取得交易 ID。
2. 驗證 ID 為有效正整數。
3. 確認交易存在。
4. 執行 SQL DELETE。
5. 確認執行結果。
6. 回傳成功 JSON。
7. 處理無效 ID。
8. 處理不存在交易。
9. 捕捉資料庫例外。

不修改既有 Schema。

不修改預設分類。

### 4.77 正常回應

HTTP 200。

```json
{
  "success": true,
  "message": "Transaction deleted successfully",
  "data": {
    "id": 2
  }
}
```

### 4.78 無效 ID

HTTP 400。

```json
{
  "success": false,
  "message": "Invalid transaction ID"
}
```

### 4.79 不存在交易

HTTP 404。

```json
{
  "success": false,
  "message": "Transaction not found"
}
```

### 4.80 資料庫故障

後端設有基本例外處理。

但尚未進行完整的資料庫故障注入測試。

不能僅因程式包含 catch，就宣稱所有資料庫故障均已驗證。

### 4.81 第一次測試問題

初次執行：

`DELETE /api/transactions/abc`

回傳：

`Cannot DELETE /api/transactions/abc`

HTTP Status：

404。

Content-Type：

text/html。

此回應代表 Express 沒有匹配到預期 DELETE 路由。

不是 API 自行回傳的：

`Invalid transaction ID`

### 4.82 原始碼檢查

當時使用 PowerShell 搜尋 app.delete。

確認：

- app.delete 位於第 405 行。
- app.listen 位於第 456 行。
- DELETE 路由在 app.listen 之前。

執行：

`node --check server/server.js`

沒有基本語法錯誤。

以上行數是當時程式版本的紀錄，不代表後續更新後仍位於相同行數。

### 4.83 Port 監聽檢查

使用 Get-NetTCPConnection。

當時結果：

| Port | PID   | 程序     |
| ---- | ----- | -------- |
| 3000 | 13460 | node.exe |
| 3001 | 14724 | node.exe |

CommandLine：

`node server/server.js`

當時記錄的程序啟動時間：

- Port 3000：2026-11-09 23:23:55。
- Port 3001：2026-11-09 23:14:11。

上述為歷史排錯資訊，不應作為未來停止程序的固定 PID。

### 4.84 停止舊程序

確認程序身分後，執行：

`Stop-Process -Id 13460,14724`

重新檢查 Port。

結果：

Port 3000、3001 沒有對應監聽程序。

### 4.85 停止後無法連線

停止伺服器後立即測試 API。

出現：

`curl: (7) Failed to connect`

這是合理結果。

因為當時沒有 HTTP Server 在指定 Port 提供服務。

### 4.86 重新啟動

回到：

`C:\Projects\Money-Tracker`

清除測試用 PORT：

`Remove-Item Env:PORT -ErrorAction SilentlyContinue`

執行：

`npm start`

輸出：

`Money Tracker server running at http://localhost:3000`

### 4.87 修復後驗證

重新測試 DELETE。

結果：

- DELETE 路由成功識別。
- 不合法 ID 回傳 HTTP 400。
- Response 為 JSON。

### 4.88 可能原因

推定舊版 Node.js 程序仍在運作，使請求連到尚未載入 DELETE 路由的舊伺服器。

此結論由程序狀態與重新啟動結果支持，但未直接檢驗舊程序記憶體中的路由內容。

### 4.89 DELETE-01｜無效 ID

請求：

`DELETE /api/transactions/abc`

結果：

- HTTP 400。
- success false。
- Invalid transaction ID。

狀態：PASS。

### 4.90 專用測試交易

為避免刪除原本 ID 1，先使用 POST 建立測試交易。

Request Body：

```json
{
  "category_id": 4,
  "amount": 123,
  "transaction_date": "2026-11-10",
  "note": "DELETE API temporary test"
}
```

新增結果：

- ID：2。
- 分類：餐飲。
- 類型：expense。
- 金額：NT$123。
- 日期：2026-11-10。
- 備註：DELETE API temporary test。
- created_at：2026-11-09 16:29:38。

### 4.91 刪除前資料

| ID  | 分類 | 金額 | 備註                      |
| --- | ---- | ---: | ------------------------- |
| 2   | 餐飲 |  123 | DELETE API temporary test |
| 1   | 餐飲 |  150 | Updated lunch test        |

count：2。

### 4.92 DELETE-02｜正常刪除

執行：

`DELETE /api/transactions/2`

結果：

- HTTP 200。
- success true。
- Transaction deleted successfully。
- data.id：2。

狀態：PASS。

### 4.93 DELETE-03｜刪除後驗證

再次 GET。

結果：

- count：1。
- ID 2 不存在。
- ID 1 存在。
- ID 1 金額 NT$150。
- ID 1 備註不變。
- ID 1 created_at 不變。

PowerShell：

`PASS: DELETE API data integrity verified`

狀態：PASS。

### 4.94 DELETE-04｜重複刪除

再次 DELETE ID 2。

結果：

- HTTP 404。
- success false。
- Transaction not found。

狀態：PASS。

### 4.95 DELETE-05｜SQLite 完整性

執行：

`node server/check-db.js`

檢查：

- Categories。
- Transactions。
- Primary Key。
- Foreign Key。
- Integrity Check。
- Foreign Key Check。
- Default Categories。

結果：

- Integrity Check：ok。
- Foreign Key Check：No foreign key violations。
- 八個分類仍存在。

狀態：PASS。

### 4.96 測試總結

| 測試          | 狀態 |
| ------------- | ---- |
| 無效 ID       | PASS |
| 正常刪除      | PASS |
| 刪除後查詢    | PASS |
| 不存在交易    | PASS |
| SQLite 完整性 | PASS |

主要案例：

- 執行：5。
- 通過：5。
- 失敗：0。

這代表五項既定案例符合預期，不代表所有邊界與故障情境均已驗證。

### 4.97 已知限制

當時尚未完成：

- ID 0。
- 負數 ID。
- 小數 ID。
- 超大整數 ID。
- 特殊 URL。
- 資料庫故障。
- 完整 CRUD 回歸測試。
- 自動化測試。
- 前端刪除操作。
- 整體系統驗收。

### 4.98 學習成果

- REST DELETE。
- SQL DELETE。
- CRUD。
- Path Parameter。
- HTTP 200、400、404。
- Express Routing。
- Express 預設 404。
- 自訂 JSON 錯誤。
- Node.js Process。
- PID 與 Port。
- 專用測試資料。
- SQLite 完整性。
- Foreign Key Check。
- 排錯紀錄。

### 4.99 Git 紀錄

Commit：

`5900b30`

Commit Message：

`feat: implement DELETE transaction API and document tests`

GitHub 提交包含：

- CHANGELOG.md。
- docs/DEVELOPMENT_LOG.md。
- docs/TESTING.md。
- server/server.js。

狀態：

已提交 GitHub。

### 4.100 Milestone 09 結論

後端已具備基本 GET、POST、PUT、DELETE 交易操作能力。

主要 API 功能驗證通過。

下一階段開始將後端能力整合至前端介面。

---

## 2026-11-10｜Milestone 10-1：Dashboard 動態整合

### 4.101 開發目標

將原本靜態 Dashboard 轉換成可以顯示 SQLite 真實交易資料的動態前端。

### 4.102 對應 Commit

SHA：

`fd2967f`

Commit Message：

`feat: integrate dashboard with transactions API`

GitHub 實際變更檔案：

- public/app.js。
- public/index.html。

### 4.103 核心需求

1. 前端讀取交易 API。
2. 取得交易列表。
3. 計算本月收入。
4. 計算本月支出。
5. 計算本月淨額。
6. 顯示最近交易。
7. 處理空資料。
8. 處理 API 載入失敗。

### 4.104 前端 JavaScript

建立並使用：

`public/app.js`

主要負責：

- 取得 DOM 元素。
- 發送 Fetch API。
- 解析 JSON。
- 計算財務摘要。
- 渲染最近交易。
- 顯示載入狀態。
- 顯示錯誤狀態。

### 4.105 Fetch API

前端透過 GET 取得：

`/api/transactions`

使用瀏覽器的 Fetch API。

成功取得 JSON 後，再進行 Dashboard 計算。

### 4.106 JSON 格式驗證

前端檢查：

- HTTP Response 是否成功。
- success 是否為 true。
- data 是否為陣列。

若回應不符合預期，應進入錯誤處理流程。

### 4.107 本月判定

前端使用瀏覽器本地日期取得目前月份。

例如：

`2026-11`

只累計交易日期屬於當月的紀錄。

Milestone 10-2 的已提交程式使用本地年月作為月份基準。

### 4.108 收入統計

針對：

`type === "income"`

的當月交易，累加 amount。

### 4.109 支出統計

針對：

`type === "expense"`

的當月交易，累加 amount。

### 4.110 收支淨額

公式：

`Net Balance = Total Income - Total Expense`

例如：

收入 NT$0。

支出 NT$150。

淨額：

-NT$150。

### 4.111 金額格式

前端以新臺幣形式顯示金額。

例如：

- NT$150。
- -NT$150。

使用者介面依收入支出性質加入適當的正負號與視覺樣式。

SQLite 中的 amount 本身仍以正整數儲存。

### 4.112 最近交易

前端讀取 GET API 的交易陣列。

顯示最近交易。

Milestone 10-2 已提交程式設定最多顯示 10 筆。

表格欄位：

- 日期。
- 類型。
- 分類。
- 金額。
- 備註。

### 4.113 安全文字呈現

在 Milestone 10-2 已提交程式中，交易表格使用 `textContent` 放入欄位文字。

這可以避免把使用者輸入的備註直接當成 HTML 執行。

這是合理的前端文字顯示方式。

但仍不能因此宣稱已完成所有前端安全性測試。

### 4.114 空資料狀態

當 API 回傳空交易陣列時，前端可以顯示空資料提示。

使用者不應看到無意義的表格內容。

### 4.115 API 載入失敗

如果 GET API 失敗，前端應顯示資料無法載入的訊息。

不應直接將無法取得資料解讀為零收入或零支出。

### 4.116 正常測試

當時資料：

- ID 1。
- 分類：餐飲。
- 類型：expense。
- 金額：NT$150。
- 日期：2026-11-09。

預期：

- 收入 NT$0。
- 支出 NT$150。
- 淨額 -NT$150。

實際結果符合預期。

### 4.117 測試結論

- GET API 整合成功。
- Dashboard 顯示正確。
- 最近交易載入成功。
- 交易資料與當時 SQLite 內容一致。

主要測試：PASS。

### 4.118 技術成果

此階段完成：

靜態頁面

→ API 資料讀取

→ JavaScript 計算

→ 動態畫面更新。

### 4.119 已知限制

尚未全面測試：

- 大量交易資料。
- 跨月份資料組合。
- 多筆收入與支出的完整組合。
- 所有日期邊界。
- 所有時區情境。
- 自動化 UI 測試。

### 4.120 Git 紀錄

Commit：

`fd2967f`

Commit Message：

`feat: integrate dashboard with transactions API`

狀態：

已提交並推送至 GitHub。

---

## 2026-11-10｜Milestone 10-2：前端新增交易

### 4.121 開發目標

讓使用者可以直接在 Money Tracker 網頁新增交易。

不需要透過 PowerShell 手動發送 POST Request。

### 4.122 Commit

SHA：

`bb18c64`

Commit Message：

`feat: implement frontend transaction creation form`

GitHub 實際變更：

- public/app.js。
- public/index.html。
- public/style.css。

### 4.123 新增交易表單

欄位：

- 收支類型。
- 分類。
- 金額。
- 日期。
- 備註。

操作：

- 新增交易。

### 4.124 收支類型

使用者選擇：

- 收入。
- 支出。

此選擇決定分類選單應顯示哪些分類。

### 4.125 分類資料載入

前端呼叫：

`GET /api/categories`

取得八個預設分類。

取得後保存在前端陣列中，供表單使用。

### 4.126 動態分類篩選

當選擇收入：

- 薪資。
- 獎金。
- 其他收入。

當選擇支出：

- 餐飲。
- 交通。
- 購物。
- 娛樂。
- 其他支出。

### 4.127 分類驗證

前端檢查：

選取的分類是否屬於目前指定的收支類型。

後端仍須檢查分類是否存在。

不能僅依賴前端分類選單保護資料。

### 4.128 金額輸入

使用數字輸入欄位。

要求：

- 必須大於零。
- 必須為整數。

前端 JavaScript 另檢查金額是否為安全整數。

### 4.129 日期輸入

使用日期欄位。

預設日期為使用者本地當日。

提交前確認日期格式及實際存在性。

### 4.130 備註輸入

備註為文字欄位。

長度限制為 500 個 JavaScript 字串長度單位。

允許空字串。

### 4.131 Form Submit

前端監聽表單 submit 事件。

避免瀏覽器直接以傳統方式重新載入整頁。

先進行驗證，再使用 Fetch API 發送 POST。

### 4.132 POST Request

端點：

`POST /api/transactions`

Request Body 包含：

- category_id。
- amount。
- transaction_date。
- note。

Content-Type：

application/json。

### 4.133 儲存成功流程

1. 使用者點擊新增。
2. 前端驗證資料。
3. 發送 POST Request。
4. 後端驗證。
5. SQLite INSERT。
6. 取得新交易 ID。
7. 回傳成功 JSON。
8. 前端重設表單。
9. 重新取得交易。
10. 更新 Dashboard。
11. 更新最近交易列表。
12. 顯示成功訊息。

### 4.134 API 失敗流程

若 POST 失敗：

- 顯示錯誤。
- 避免錯誤地宣稱新增成功。
- 若發生連線中斷，提醒使用者確認交易列表。
- 避免因不確定是否已寫入而重複新增。

### 4.135 正常新增測試

原有資料：

- ID 1。
- 金額 NT$150。
- 分類餐飲。
- 類型 expense。

新增：

- ID 3。
- 分類餐飲。
- 類型 expense。
- 金額 NT$120。
- 日期 2026-11-10。
- 備註 Milestone 10-2 frontend test。

實際結果：

- 新增成功。
- 交易 ID 為 3。
- 總筆數由 1 增加為 2。

### 4.136 Dashboard 更新

新增前：

- 收入 NT$0。
- 支出 NT$150。
- 淨額 -NT$150。

新增後：

- 收入 NT$0。
- 支出 NT$270。
- 淨額 -NT$270。

計算：

150 + 120 = 270。

實際結果符合預期。

### 4.137 資料重新整理

新增後重新整理瀏覽器。

結果：

- ID 3 仍存在。
- NT$120 仍存在。
- 備註保持不變。
- ID 1 仍存在。
- Dashboard 保持 NT$270。
- 交易數量保持 2。

測試：PASS。

### 4.138 Ctrl + F5 操作問題

測試時曾嘗試使用 Ctrl + F5 重新整理。

但因筆記型電腦快捷鍵設定，實際觸發螢幕亮度調整。

因此改用：

- 瀏覽器重新整理按鈕。
- Ctrl + R。

目的：

確保實際執行的是網頁重新整理。

### 4.139 零元測試

輸入：

`0`

結果：

- 瀏覽器阻擋送出。
- 提示金額至少為 1。
- 未新增交易。
- Dashboard 保持不變。

測試：PASS。

### 4.140 小數測試

輸入：

`120.5`

結果：

- 瀏覽器顯示不合法數值提示。
- 表單未成功提交。
- 交易總數維持 2。

測試：PASS。

### 4.141 收入分類切換

將收支類型改為收入。

觀察分類：

- 薪資。
- 獎金。
- 其他收入。

結果：

分類切換正確。

測試：PASS。

此測試確認分類下拉選單的操作，不代表所有收入新增情境均已完成測試。

### 4.142 本階段已知限制

- 尚未完成前端編輯功能。
- 尚未完成前端刪除功能。
- 尚未完成完整輸入邊界測試。
- 尚未建立自動化表單測試。
- 尚未完成大量資料測試。

其中編輯功能已於 Milestone 10-3 後續實作。

### 4.143 Git 檢查

提交前執行：

- git status。
- git diff --check。
- node --check public/app.js。

檢查三個前端檔案的變更。

### 4.144 Git 紀錄

Commit：

`bb18c64`

Commit Message：

`feat: implement frontend transaction creation form`

結果：

- Commit 成功。
- Push 成功。
- main 與 origin/main 同步。
- 工作目錄於提交後乾淨。

狀態：

已提交 GitHub。

### 4.145 學習成果

- HTML Form。
- Input Validation。
- Event Listener。
- Fetch API POST。
- JSON Request Body。
- 動態分類。
- 表單狀態。
- API 成功與失敗處理。
- 資料新增後重新查詢。
- Dashboard 同步。
- Git 里程碑管理。

---

## 2026-11-11｜Milestone 10-3：前端編輯交易

### 4.146 開發目標

讓使用者可以從 Money Tracker 網頁直接編輯原有交易。

此階段延續 Milestone 10-2 的前端表單架構，整合後端已存在的 PUT API。

### 4.147 開發原則

- 保留新增交易功能。
- 不破壞 Dashboard。
- 不更改後端資料庫 Schema。
- 不重做原本的 POST API。
- 盡可能沿用既有表單。
- 讓新增與編輯模式能清楚區分。
- 修改失敗時不得誤報成功。
- 取消編輯不得修改資料庫。

### 4.148 使用的檔案

本階段修改：

- public/index.html。
- public/app.js。
- public/style.css。

後端使用既有：

- server/server.js。

資料庫使用既有：

- data/money-tracker.db。

### 4.149 功能需求

1. 每筆可操作交易顯示編輯按鈕。
2. 點擊後取得原始交易資料。
3. 顯示交易 ID。
4. 預填收支類型。
5. 預填交易分類。
6. 預填金額。
7. 預填日期。
8. 預填備註。
9. 支援修改資料。
10. 提供儲存修改。
11. 提供取消編輯。
12. 使用 PUT API。
13. 修改成功後重新查詢。
14. Dashboard 自動更新。
15. 交易列表自動更新。
16. 無效輸入遭拒絕。
17. API 失敗時顯示提示。

### 4.150 編輯按鈕

在最近交易列表加入操作欄位。

使用者可以對指定交易點擊編輯。

本階段既定測試使用 ID 3。

### 4.151 編輯模式

點擊編輯後：

- 表單標題改為 Edit Transaction。
- 顯示目前編輯的 ID。
- 載入原始資料。
- 提交操作改為儲存修改。
- 顯示取消編輯。

### 4.152 原始資料預填

測試 ID 3 時，表單成功載入：

- 類型：支出。
- 分類：餐飲。
- 金額：120。
- 日期：2026-11-10。
- 備註：Milestone 10-2 frontend test。

結果符合預期。

### 4.153 資料更新

使用：

`PUT /api/transactions/:id`

Request Body 仍包含：

- category_id。
- amount。
- transaction_date。
- note。

### 4.154 前端提交前驗證

編輯模式須保留原有交易輸入規則：

- 分類有效。
- 金額為正整數。
- 日期有效。
- 備註長度符合限制。

前端驗證用於提升使用體驗。

後端仍負責正式驗證。

### 4.155 成功更新流程

1. 使用者進入編輯模式。
2. 修改資料。
3. 點擊儲存修改。
4. 前端驗證輸入。
5. 發送 PUT Request。
6. 後端查詢交易。
7. SQLite 更新資料。
8. 回傳更新結果。
9. 前端顯示成功。
10. 重新取得交易清單。
11. 更新 Dashboard。
12. 更新最近交易。
13. 返回新增模式。

### 4.156 取消編輯

使用者可以取消編輯。

取消編輯應：

- 結束編輯狀態。
- 不發送正常更新請求。
- 不修改資料庫。
- 返回新增交易模式。
- 保持既有交易完整。

### 4.157 錯誤處理

編輯失敗時：

- 顯示錯誤。
- 不顯示修改成功。
- 不應以失敗輸入直接覆蓋已載入的交易清單。
- 讓使用者可以重新確認資料。

若連線中斷，應提醒使用者查詢最新資料後再決定是否重試。

---

## Milestone 10-3｜詳細測試紀錄

### 4.158 測試一：編輯按鈕

開啟 Money Tracker。

找到 ID 3。

點擊編輯。

實際結果：

- 編輯按鈕正常。
- 表單切換模式。
- 顯示 ID 3。
- 原始資料成功載入。

測試：PASS。

### 4.159 測試二：原始資料預填

檢查：

- 類型。
- 分類。
- 金額。
- 日期。
- 備註。

實際：

- 支出。
- 餐飲。
- 120。
- 2026-11-10。
- Milestone 10-2 frontend test。

測試：PASS。

### 4.160 測試三：正常修改

原始資料：

- ID：3。
- 金額：120。
- 備註：Milestone 10-2 frontend test。

修改資料：

- ID：3。
- 金額：180。
- 備註：Milestone 10-3 edit test。

日期與分類保持不變。

### 4.161 正常修改結果

實際結果：

- 顯示交易修改成功。
- 金額更新為 NT$180。
- 備註更新成功。
- 原始 ID 保持 3。
- 交易總數保持 2。

測試：PASS。

### 4.162 Dashboard 更新

修改前：

- 收入 NT$0。
- 支出 NT$270。
- 淨額 -NT$270。

修改後：

- 收入 NT$0。
- 支出 NT$330。
- 淨額 -NT$330。

計算：

180 + 150 = 330。

測試：PASS。

### 4.163 修改後重新整理

使用瀏覽器重新整理。

實際結果：

- ID 3 仍為 NT$180。
- 備註仍為 Milestone 10-3 edit test。
- ID 1 仍為 NT$150。
- 交易總數仍為 2。
- Dashboard 仍為 NT$330。

測試：PASS。

### 4.164 資料持久化結論

本次重新整理後，前端再次顯示修改後的交易資料。

可確認已觀察到修改後資料被持續提供，而非僅為當次表單畫面的暫時變更。

測試：PASS。

### 4.165 取消編輯測試

操作：

1. 點擊 ID 3 編輯。
2. 暫時將金額改成 999。
3. 不點擊儲存修改。
4. 點擊取消編輯。

實際結果：

- 返回新增交易模式。
- 原始交易沒有變更。
- ID 3 保持 NT$180。
- Dashboard 保持 NT$330。
- 交易總數仍為 2。

測試：PASS。

### 4.166 零元金額測試

操作：

1. 進入 ID 3 編輯。
2. 將金額改為 0。
3. 點擊儲存修改。

實際結果：

- 瀏覽器顯示最小值限制。
- 提示數值必須大於或等於 1。
- 原交易未修改。
- Dashboard 保持原值。

測試：PASS。

### 4.167 零元測試範圍

這項測試主要驗證瀏覽器表單阻擋機制。

後端 PUT API 的零元負向測試已於 Milestone 08 另外執行。

兩者不能視為完全相同的測試。

### 4.168 小數金額測試

輸入：

`180.5`

實際結果：

- 瀏覽器提示不合法數值。
- 顯示相鄰的有效整數 180、181。
- 交易沒有被正常修改。
- ID 3 保持 NT$180。

測試：PASS。

### 4.169 小數測試範圍

本階段驗證的是前端表單阻擋。

後端 PUT API 對小數金額的 HTTP 400 測試已於 Milestone 08 完成。

### 4.170 後端不存在交易測試

測試端點：

`PUT /api/transactions/9999`

Request Body：

```json
{
  "category_id": 4,
  "amount": 180,
  "transaction_date": "2026-11-10",
  "note": "API error handling test"
}
```

預期：

HTTP 404。

Response：

Transaction not found。

### 4.171 第一次 API 測試異常

PowerShell 曾顯示：

`HTTP Status: 0`

以及空白 Response。

此時沒有取得真正的 HTTP 回應。

不能將它當成合法 HTTP 狀態碼。

### 4.172 Health API 排查

執行：

`GET /api/health`

當時結果：

無法連接至遠端伺服器。

表示當時測試環境沒有成功連接 Express。

### 4.173 正確的測試終端機分工

使用：

PowerShell 1：

執行 `npm start`。

PowerShell 2：

執行 API 測試。

伺服器終端機保持執行。

測試終端機負責發送請求。

### 4.174 JSON 格式問題

第一次重新執行 PUT 測試時，使用 curl.exe 傳送 JSON。

Express 出現：

`SyntaxError: Expected property name or '}' in JSON at position 1`

原因與 PowerShell 傳送 JSON 時的引號處理有關。

該次測試沒有成功進入預期的交易驗證流程。

### 4.175 修正 JSON 測試方式

改用 PowerShell Hashtable 建立資料。

再使用：

`ConvertTo-Json`

產生 JSON。

最後使用：

`Invoke-RestMethod`

發送 PUT Request。

### 4.176 正式 HTTP 404 結果

實際回傳：

HTTP Status：

404。

Response：

```json
{
  "success": false,
  "message": "Transaction not found"
}
```

測試：PASS。

### 4.177 HTTP 404 後資料確認

執行：

`GET /api/transactions`

實際結果：

- ID 3 為 NT$180。
- ID 1 為 NT$150。
- 交易總數為 2。
- 原始備註保留。

測試：PASS。

### 4.178 前端 API 失敗測試目的

確認：

當 Express 停止提供服務時，使用者在已載入的網頁上操作編輯功能，前端應顯示失敗，而不是錯誤地顯示修改成功。

### 4.179 第一次停止伺服器測試

曾在 PowerShell 按 Ctrl + C。

之後發現 Money Tracker 網頁仍可以修改交易。

當時金額由 NT$180 改成 NT$181。

Dashboard 更新為 NT$331。

### 4.180 第一次測試不能直接判定失敗

因為後續發現 Port 3000 仍有程序監聽。

因此，當時不具備真正的「伺服器已完全停止」測試條件。

不能將該次正常修改視為前端錯誤處理失敗。

### 4.181 Port 3000 檢查

使用：

`Get-NetTCPConnection -LocalPort 3000 -State Listen`

當時發現 Port 3000 仍有監聽程序。

PID：

4512。

### 4.182 程序身分確認

使用 Get-CimInstance 查詢 PID 4512。

結果：

- ProcessId：4512。
- Name：node.exe。
- CommandLine：node server/server.js。

確認該程序與 Money Tracker 伺服器有關。

### 4.183 停止已確認程序

執行：

`Stop-Process -Id 4512`

再次檢查 Port 3000。

結果：

沒有監聽程序輸出。

### 4.184 PID 注意事項

PID 4512 為當次排錯的歷史程序編號。

未來重新啟動 Node.js 後可能使用不同 PID。

不可把 4512 視為固定的 Money Tracker 程序 ID。

### 4.185 正式測試準備

當時交易資料暫時修改至：

- ID 3：NT$182。
- ID 1：NT$150。

Dashboard：

- 收入 NT$0。
- 支出 NT$332。
- 淨額 -NT$332。

### 4.186 正式連線失敗操作

確認 Port 3000 沒有監聽程序後：

1. 保留已開啟的 Money Tracker 網頁。
2. 不重新啟動伺服器。
3. 進入 ID 3 編輯模式。
4. 將金額從 182 改為 183。
5. 點擊儲存修改。
6. 觀察畫面。

### 4.187 正式測試結果

前端顯示：

`Failed to fetch`

另外顯示交易編輯失敗提示。

沒有錯誤地顯示交易修改成功。

### 4.188 失敗時的編輯狀態

實際畫面：

- 編輯表單仍保留 NT$183。
- 最近交易列表仍顯示 NT$182。
- Dashboard 仍顯示 NT$332。
- 交易數量仍為 2。

測試：PASS。

### 4.189 測試結論

已證實：

在當次 Express 服務無法連線時，前端可以顯示失敗訊息，沒有把此次編輯操作誤報為成功。

尚未證實：

所有可能的網路中斷、逾時、伺服器在資料庫寫入後中斷等情況都能得到相同行為。

### 4.190 恢復伺服器

重新執行：

`npm start`

結果：

`Money Tracker server running at http://localhost:3000`

Health 與前端服務恢復正常。

### 4.191 恢復測試資料

將 ID 3 金額改回：

NT$180。

備註維持：

Milestone 10-3 edit test。

### 4.192 恢復後資料確認

| ID  | 日期       | 分類 | 金額 | 備註                     |
| --- | ---------- | ---- | ---- | ------------------------ |
| 3   | 2026-11-10 | 餐飲 | 180  | Milestone 10-3 edit test |
| 1   | 2026-11-09 | 餐飲 | 150  | Updated lunch test       |

Dashboard：

- 本月總收入：NT$0。
- 本月總支出：NT$330。
- 本月收支淨額：-NT$330。

交易總數：

2。

### 4.193 測試資料快照說明

上述結果是 2026-11-11 測試完成時的狀態。

未來正式使用 Money Tracker 後，資料與金額自然會改變。

不能把測試快照當成永久的預期資料。

### 4.194 Git 檢查

完成主要測試後，執行：

`git status`

`git diff --check`

`git diff --stat`

`node --check public/app.js`

`node --check server/server.js`

### 4.195 Git 檢查結果

當次確認三個前端檔案有修改：

- public/app.js。
- public/index.html。
- public/style.css。

未觀察到基本 JavaScript 語法錯誤。

未觀察到 git diff --check 的空白格式錯誤。

### 4.196 變更量

當次 Git Diff Stat：

- 3 files changed。
- 284 insertions。
- 442 deletions。

此統計是文字差異，不代表有 442 個功能被刪除。

但提交前仍應檢查是否意外移除既有程式邏輯。

### 4.197 LF / CRLF 警告

Git 曾出現：

`LF will be replaced by CRLF`

這與 Windows 工作目錄的換行格式轉換有關。

當時沒有發現因此造成 JavaScript 語法或執行錯誤。

目前不需要為這項警告重做整個專案。

### 4.198 本階段完成內容

- 編輯按鈕。
- 原資料預填。
- PUT API 整合。
- 修改成功提示。
- 取消編輯。
- Dashboard 更新。
- 最近交易更新。
- 零元輸入阻擋。
- 小數輸入阻擋。
- 不存在交易 HTTP 404。
- API 連線失敗提示。
- 測試資料恢復。

### 4.199 尚未完成

- 三份開發文件最終核對。
- 最終 Git Diff。
- Git Commit。
- GitHub Push。
- 實際 Commit SHA 紀錄。
- 完整自動化回歸測試。
- 前端刪除交易介面。
- 完整系統驗收。

### 4.200 Milestone 10-3 狀態

| 項目                | 狀態     |
| ------------------- | -------- |
| 編輯功能            | 已實作   |
| 正常修改            | PASS     |
| 原資料預填          | PASS     |
| Dashboard 同步      | PASS     |
| 重新整理後保留      | PASS     |
| 取消編輯            | PASS     |
| 零元阻擋            | PASS     |
| 小數阻擋            | PASS     |
| 後端 HTTP 404       | PASS     |
| 連線失敗提示        | PASS     |
| 測試資料恢復        | PASS     |
| JavaScript 語法檢查 | PASS     |
| Git 差異格式檢查    | PASS     |
| 完整自動化測試      | 尚未完成 |
| Git Commit          | 待執行   |
| GitHub Push         | 待執行   |
| 正式 Release        | 尚未發布 |

### 4.201 本階段學習成果

- 編輯狀態管理。
- 表單資料預填。
- PUT Fetch API。
- DOM 更新。
- 取消操作設計。
- 前端與後端分層驗證。
- HTTP 404。
- PowerShell JSON 處理。
- 連線失敗診斷。
- Node.js 程序管理。
- Port 監聽檢查。
- 資料持久化驗證。
- Git Diff 檢查。
- 開發日誌維護。

---

# 五、目前系統完成狀態

更新日期：2026-11-11

## 5.1 功能狀態總表

| 功能                     | 目前狀態       |
| ------------------------ | -------------- |
| 本機專案初始化           | 已完成         |
| Git Repository           | 已完成         |
| GitHub Repository        | 已完成         |
| Express Server           | 已完成         |
| Health API               | PASS           |
| HTML 首頁                | 已完成         |
| CSS 深色主題             | 已完成         |
| Dashboard 靜態版面       | 已完成         |
| Dashboard 動態資料       | 已完成基本功能 |
| 最近交易動態顯示         | 已完成         |
| SQLite 資料庫            | 已完成         |
| Categories 資料表        | 已完成         |
| Transactions 資料表      | 已完成         |
| 八個預設分類             | 已完成         |
| GET Categories           | PASS           |
| GET Transactions         | PASS           |
| POST Transactions        | 既定測試通過   |
| PUT Transactions         | 既定測試通過   |
| DELETE Transactions      | 既定測試通過   |
| SQLite Integrity Check   | 已通過既定測試 |
| SQLite Foreign Key Check | 已通過既定測試 |
| 前端新增交易             | 已完成         |
| 前端編輯交易             | 已完成本機實作 |
| 前端取消編輯             | PASS           |
| 前端刪除交易             | 尚未開始       |
| 表單基本驗證             | 已完成         |
| 前端 API 錯誤提示        | 已完成主要情境 |
| 前端資料同步             | 已完成主要情境 |
| 分類篩選交易             | 尚未開始       |
| 日期區間篩選             | 尚未開始       |
| 財務圖表分析             | 尚未開始       |
| CSV 匯出                 | 尚未開始       |
| 完整自動化測試           | 尚未完成       |
| 完整系統驗收             | 尚未完成       |
| GitHub 正式 Release      | 尚未發布       |

## 5.2 已具備的實際操作能力

目前使用者可以：

- 開啟 Money Tracker。
- 查看本月收入。
- 查看本月支出。
- 查看本月淨額。
- 查看最近交易。
- 選擇收入或支出分類。
- 新增交易。
- 編輯交易。
- 取消編輯。
- 查看操作成功或失敗訊息。

目前尚不能透過前端直接完成已正式驗證的刪除交易操作。

## 5.3 後端完成程度

後端已具備基本交易 CRUD。

但仍需要：

- 更完整的邊界測試。
- 自動化回歸測試。
- 資料庫故障測試。
- 更完整的安全性驗證。
- 效能測試。

因此，「CRUD API 已實作」與「後端已完成完整驗收」是不同概念。

## 5.4 前端完成程度

前端已完成：

- 動態讀取交易。
- 顯示 Dashboard。
- 新增交易。
- 編輯交易。

尚未完成：

- 刪除交易。
- 完整 CRUD 回歸測試。
- 進階查詢。
- 財務圖表。
- CSV 匯出。

## 5.5 測試完成程度

已完成的重要測試：

- 主要 GET API。
- POST 正向與負向測試。
- PUT 正向與負向測試。
- DELETE 主要測試。
- SQLite Integrity Check。
- SQLite Foreign Key Check。
- Dashboard 動態整合。
- 前端新增交易。
- 前端編輯交易。
- 取消編輯。
- 前端無效金額。
- 前端 API 連線失敗。

尚未完成全系統驗收。

---

# 六、主要開發問題與排除紀錄

## 6.1 VS Code Workspace 管理

### 問題

Money Tracker 曾在不同的 VS Code 視窗開啟。

### 處理

將專案加入既有多根目錄 Workspace。

### 結果

可以同時管理不同專案。

### 學習

Workspace 與實際檔案路徑不同。

同一個 Workspace 可以包含多個獨立專案。

不同專案仍可以擁有不同 Git Repository。

## 6.2 API 無法連線

### 問題

PowerShell 顯示無法連接遠端伺服器。

### 可能情況

- Express 尚未啟動。
- Express 已停止。
- Port 指定錯誤。
- 測試連線到不正確的 Port。

### 處理方式

- 確認 npm start。
- 檢查 Health API。
- 確認 Port 3000。
- 將伺服器與測試分開執行。

### 學習

API 測試之前必須先確認服務可用。

## 6.3 PUT API 路由不匹配

### 問題

`Cannot PUT /api/transactions/1`

### 排查

- 確認 app.put。
- 檢查 JavaScript。
- 檢查 Port 3000。
- 使用 Port 3001。
- 停止舊程序。
- 重新啟動。

### 結果

PUT API 正常。

## 6.4 DELETE API 路由不匹配

### 問題

`Cannot DELETE /api/transactions/abc`

### 排查

- 確認 app.delete。
- 確認 app.listen 位置。
- 檢查 JavaScript。
- 檢查 Port 3000、3001。
- 檢查 PID。
- 停止已確認程序。
- 重新啟動。

### 結果

DELETE API 正常。

## 6.5 HTTP 404 與連線失敗

HTTP 404：

伺服器成功回應請求，但指定資源或路由不存在，或 API 主動回傳找不到資源。

Connection Failed：

客戶端無法與目標服務建立連線。

因此：

`Cannot DELETE`

與：

`curl: (7) Failed to connect`

不是相同的錯誤。

## 6.6 PowerShell 輸出誤當指令

### 問題

將伺服器輸出：

`Money Tracker server running at http://localhost:3001`

當成 PowerShell 指令輸入。

### 結果

CommandNotFoundException。

### 學習

執行指令與程式輸出必須區分。

## 6.7 Ctrl + F5 快捷鍵問題

### 問題

筆記型電腦將 Ctrl + F5 解讀成螢幕亮度相關操作。

### 處理

改用：

- Ctrl + R。
- 瀏覽器重新整理按鈕。

### 學習

應確認測試動作真的發生，而不是只依照鍵盤操作推測結果。

## 6.8 PowerShell JSON 格式錯誤

### 問題

透過 curl.exe 傳送 JSON 時，Express 出現 SyntaxError。

### 原因

PowerShell 的引號及外部命令參數處理，使送出的 JSON 不符合預期。

### 改善

使用：

- Hashtable。
- ConvertTo-Json。
- Invoke-RestMethod。

### 結果

成功取得 HTTP 404 與正確 JSON。

## 6.9 HTTP Status 0 問題

### 問題

PowerShell 顯示 HTTP Status 0。

### 分析

當時未取得真正的 HTTP Response。

不能視為合法的 HTTP 狀態碼。

### 處理

先確認 Health API。

重新啟動伺服器後再測試。

### 學習

必須先判斷是連線問題，還是 API 業務邏輯問題。

## 6.10 停止伺服器後仍能修改

### 問題

按下 Ctrl + C 後，Money Tracker 仍可修改交易。

### 排查

檢查 Port 3000。

發現 PID 4512。

確認程序為：

`node server/server.js`

### 處理

停止已確認程序。

再次檢查 Port。

結果：

沒有監聽程序。

### 學習

停止某一個終端機，不代表同一 Port 的其他服務程序已停止。

## 6.11 前端 Failed to fetch

### 測試目的

確認 API 無法連線時，前端可以反映失敗。

### 操作

停止 Express。

在已載入的網頁上修改交易。

### 結果

前端顯示 Failed to fetch。

沒有誤報成功。

### 學習

網頁仍顯示，不代表 API 仍正常。

瀏覽器可以保留已載入的 HTML、CSS、JavaScript 與先前資料。

必須區分畫面可見與伺服器可連線。

## 6.12 LF / CRLF 換行警告

### 問題

Git 出現：

`LF will be replaced by CRLF`

### 分析

LF 與 CRLF 是不同的文字換行格式。

Windows 工作目錄可能與 Git 儲存的換行方式不同。

### 結果

當時沒有發現因此造成語法錯誤。

### 注意

該警告本身不代表功能故障。

若未來需要統一換行格式，可另行規劃，但不應為此任意改動已驗證的程式邏輯。

## 6.13 問題排除原則

遇到 API 問題時，建議依序確認：

1. 錯誤訊息。
2. HTTP 是否成功連線。
3. Health API。
4. Port。
5. Node.js 程序。
6. 原始程式碼。
7. JavaScript 語法。
8. Request Method。
9. Request URL。
10. Request Body。
11. Content-Type。
12. API 回應。
13. 資料庫查詢結果。

不要在未確認原因前直接大量修改程式碼。

---

# 七、版本控制與 GitHub

## 7.1 已確認的重要 Commit

| Milestone | Commit   | 主要內容              |
| --------- | -------- | --------------------- |
| 01        | 1798256  | 專案初始化            |
| 02        | 23e6afe  | Express 與 Health API |
| 03        | fe6cd52  | 前端首頁              |
| 04        | d654756  | Dashboard 靜態版面    |
| 05        | eacbbb8  | SQLite 初始化         |
| 06        | 703b3f6  | Categories API        |
| 07        | 8c5b850  | GET、POST 與開發文件  |
| 08        | 5b3486b  | PUT API               |
| 09        | 5900b30  | DELETE API            |
| 10-1      | fd2967f  | Dashboard 動態整合    |
| 10-2      | bb18c64  | 前端新增交易          |
| 10-3      | 尚未取得 | 前端編輯交易          |

## 7.2 已核對的近期 Commit

### Milestone 09

SHA：

`5900b30`

Message：

`feat: implement DELETE transaction API and document tests`

涉及：

- CHANGELOG.md。
- DEVELOPMENT_LOG.md。
- TESTING.md。
- server/server.js。

### Milestone 10-1

SHA：

`fd2967f`

Message：

`feat: integrate dashboard with transactions API`

涉及：

- public/app.js。
- public/index.html。

### Milestone 10-2

SHA：

`bb18c64`

Message：

`feat: implement frontend transaction creation form`

涉及：

- public/app.js。
- public/index.html。
- public/style.css。

## 7.3 Milestone 10-3 Git 狀態

當前已知：

- 前端編輯功能完成本機實作。
- 既定主要測試通過。
- 三個前端檔案存在修改。
- 尚未完成 Git Commit。
- 尚未完成 GitHub Push。
- 尚未取得 Commit SHA。

不得提前宣稱 Milestone 10-3 已上傳 GitHub。

## 7.4 標準 Git 流程

每次完成重要功能：

1. 修改程式碼。
2. 儲存檔案。
3. 執行語法檢查。
4. 執行正向測試。
5. 執行負向測試。
6. 確認資料完整性。
7. 更新文件。
8. 執行 git status。
9. 執行 git diff --check。
10. 執行 git diff --stat。
11. 檢查變更。
12. 指定檔案加入暫存。
13. 建立 Commit。
14. Push。
15. 確認 GitHub。
16. 記錄 SHA。
17. 確認工作目錄狀態。

## 7.5 Commit Message

目前主要使用：

- feat。
- fix。
- docs。
- test。
- refactor。
- chore。

範例：

`feat: implement PUT transaction API and document tests`

Commit Message 必須反映實際修改內容。

## 7.6 文件分工

| 文件               | 用途               |
| ------------------ | ------------------ |
| README.md          | 專案介紹與使用說明 |
| CHANGELOG.md       | 功能新增與版本歷史 |
| DEVELOPMENT_LOG.md | 開發歷程與技術決策 |
| TESTING.md         | 測試案例與實際結果 |

## 7.7 本機與 GitHub 的差異

在 VS Code 儲存檔案：

只代表本機工作目錄已更新。

執行 git add：

代表修改進入 Staging Area。

執行 git commit：

代表本機 Repository 建立新的版本紀錄。

執行 git push：

才會將提交推送至遠端 Repository。

因此：

儲存檔案不等於 Commit。

Commit 不等於 Push。

Push 不等於 Release。

## 7.8 Git 資料保護

不應提交：

- data/money-tracker.db。
- node_modules。
- API Key。
- 密碼。
- 私人資料。
- 不必要的暫存檔案。

每次提交前應確認實際檔案清單。

---

# 八、後續開發規劃

## Milestone 10-3｜文件與 Git 收尾

目前狀態：

功能與既定主要測試完成。

尚待：

1. 更新 CHANGELOG。
2. 更新 DEVELOPMENT_LOG。
3. 更新 TESTING。
4. 確認三份文件一致。
5. 確認既有歷史沒有重要遺漏。
6. 檢查前端程式。
7. 執行 Git Status。
8. 執行 Git Diff。
9. 執行語法檢查。
10. 確認待提交檔案。
11. 建立 Commit。
12. Push 至 GitHub。
13. 確認 main 同步。
14. 記錄 Commit SHA。

## Milestone 10-4｜前端刪除交易

狀態：

尚未開始。

### 目標

讓使用者可以在網頁直接刪除指定交易。

### 預計功能

- 新增刪除按鈕。
- 確認目標交易 ID。
- 刪除前確認。
- 可取消刪除。
- 發送 DELETE Request。
- 顯示成功訊息。
- 顯示失敗訊息。
- 刪除後更新 Dashboard。
- 刪除後更新交易列表。
- 處理不存在交易。
- 處理 API 連線失敗。

### 預計測試

- 正常刪除。
- 取消刪除。
- 不存在交易。
- 重複刪除。
- 連線失敗。
- Dashboard 更新。
- 交易清單更新。
- 重新整理後資料保留。
- SQLite 完整性。
- 其他交易不受影響。

### 資料安全

刪除屬於破壞性操作。

測試時應先建立專用交易，再刪除該筆資料。

不得直接使用原本的重要交易作為不必要的破壞性測試目標。

## Milestone 10-5｜前端 CRUD 整合驗收

狀態：

尚未開始。

規劃：

- 新增交易。
- 查詢交易。
- 修改交易。
- 刪除交易。
- 取消修改。
- 取消刪除。
- 無效資料阻擋。
- API 錯誤提示。
- Dashboard 同步。
- 資料持久化。

完成後才能將前端 CRUD 整合標示為完成既定驗收。

## Milestone 11｜財務統計與分析

基本 Dashboard 已於 Milestone 10-1 完成。

後續重點放在進階分析。

規劃：

- 月度收支。
- 年度收支。
- 分類統計。
- SQL SUM。
- SQL GROUP BY。
- 支出分類占比。
- 財務趨勢圖。
- 空資料處理。
- 統計結果驗證。

## Milestone 12｜篩選與 CSV 匯出

規劃：

- 日期範圍。
- 分類篩選。
- 收支類型篩選。
- 複合條件查詢。
- 查詢排序。
- CSV 匯出。
- 中文資料編碼。
- 特殊字元處理。
- 匯出欄位驗證。
- 匯出筆數驗證。

## Milestone 13｜完整測試與發布

規劃：

- 完整 CRUD 回歸測試。
- API 自動化測試。
- 前端操作測試。
- SQLite 完整性檢查。
- 資料庫故障測試。
- 輸入邊界測試。
- 錯誤處理測試。
- 基本安全性檢查。
- 大量資料測試。
- 行動裝置版面測試。
- README 整理。
- CHANGELOG 整理。
- DEVELOPMENT_LOG 整理。
- TESTING 整理。
- Release Notes。
- Git Tag。
- GitHub Release。

目前尚未宣布正式穩定版本。

---

# 九、開發與文件維護原則

## 9.1 持續累積

本文件持續記錄重要開發歷史。

未來新增功能時：

- 保留既有 Milestone。
- 新增當次開發紀錄。
- 更新最新狀態。
- 更新 Git 紀錄。
- 更新已知限制。
- 更新後續規劃。

## 9.2 歷史紀錄與最新狀態

歷史紀錄中的「目前」代表當時的狀態。

例如：

Milestone 09 撰寫時，前端動態 CRUD 尚未開始。

後續 Milestone 10-1～10-3 已完成部分前端功能。

因此，應保留原始階段背景，同時更新文件最前面的最新專案狀態。

不應讓過去的規劃與現在的進度互相矛盾。

## 9.3 測試真實性

僅將實際通過的測試標示 PASS。

尚未執行標示 NOT RUN。

因環境限制無法執行的測試，應另外說明。

測試失敗應留下問題與修復紀錄。

不能將預期結果當成實際結果。

## 9.4 功能完成與驗收

功能程式已撰寫：

不等於已執行測試。

測試通過：

不等於完成完整系統驗收。

Git Commit：

不等於程式已經正式發布。

Git Push：

不等於完成 Release。

## 9.5 資料安全

- 不公開提交 SQLite 財務資料。
- 保留 .gitignore。
- 避免測試誤刪資料。
- 使用專用刪除測試紀錄。
- 正式使用資料應建立備份方式。
- 不提交機密資訊。

## 9.6 文件一致性

主要文件：

1. README。
2. CHANGELOG。
3. DEVELOPMENT_LOG。
4. TESTING。

應確認：

- 功能狀態一致。
- 測試結果一致。
- Commit SHA 一致。
- GitHub 同步狀態一致。
- 尚未完成的功能一致。
- 未發布的版本狀態一致。

## 9.7 排錯紀錄

重要問題應記錄：

- 發生日期。
- 錯誤現象。
- 執行命令。
- 實際錯誤訊息。
- 排查步驟。
- 可能原因。
- 已確認原因。
- 處理方式。
- 修復後結果。
- 是否重新測試。

推定原因不得寫成已確定原因。

## 9.8 測試資料紀錄

測試資料應包含：

- 交易 ID。
- 分類。
- 金額。
- 日期。
- 備註。
- 測試目的。
- 操作前狀態。
- 操作後狀態。

測試資料快照不代表正式使用資料。

## 9.9 Commit 紀錄

每次取得新的 Commit SHA 時：

- 記錄 SHA。
- 記錄 Commit Message。
- 記錄對應 Milestone。
- 記錄主要變更檔案。
- 確認 GitHub Push。
- 確認 Working Tree 狀態。

## 9.10 防止文件膨脹失去可讀性

本文件雖然保留完整歷史，但應避免：

- 重複敘述相同結論而沒有新增資訊。
- 將尚未執行的步驟寫成已完成。
- 為了增加篇幅編造細節。
- 將推論寫成事實。
- 使用沒有實際意義的技術術語。
- 把每一項操作都誇大為重大成果。

未來若文件持續成長，可保留主日誌作為歷史索引，將極長的測試輸出與操作證據交由 TESTING 或附錄保存。

---

# 十、目前開發總結

## 10.1 已完成的重要工作

截至 2026-11-11：

1. 建立 Money Tracker 專案。
2. 建立 Git Repository。
3. 建立 GitHub Repository。
4. 建立 Node.js 開發環境。
5. 建立 Express Server。
6. 建立 Health API。
7. 建立 HTML 首頁。
8. 建立 CSS 深色主題。
9. 建立 Dashboard 版面。
10. 建立最近交易表格。
11. 建立 SQLite 資料庫。
12. 建立 Categories。
13. 建立 Transactions。
14. 建立八個預設分類。
15. 建立 GET Categories API。
16. 建立 GET Transactions API。
17. 建立 POST Transactions API。
18. 建立 PUT Transactions API。
19. 建立 DELETE Transactions API。
20. 完成基本資料驗證。
21. 完成 POST 主要測試。
22. 完成 PUT 主要測試。
23. 完成 DELETE 主要測試。
24. 完成資料持久化測試。
25. 完成 SQLite 完整性檢查。
26. 完成外鍵檢查。
27. 建立前端 JavaScript。
28. 完成 Dashboard 動態整合。
29. 完成最近交易動態載入。
30. 完成前端新增交易。
31. 完成前端分類切換。
32. 完成前端編輯交易。
33. 完成取消編輯。
34. 完成前端基本無效金額阻擋。
35. 完成前端資料同步。
36. 完成後端 HTTP 404 複驗。
37. 完成前端 API 連線失敗測試。
38. 完成測試資料恢復。
39. 保存主要歷史 Commit。
40. 建立開發與測試文件架構。

## 10.2 Milestone 10-3 最終測試資料

最後確認：

| ID  | 金額   | 備註                     |
| --- | ------ | ------------------------ |
| 3   | NT$180 | Milestone 10-3 edit test |
| 1   | NT$150 | Updated lunch test       |

本月總收入：

NT$0。

本月總支出：

NT$330。

本月收支淨額：

-NT$330。

交易總筆數：

2。

此為當次測試快照。

## 10.3 尚未完成

- Milestone 10-3 Git Commit。
- Milestone 10-3 GitHub Push。
- 前端刪除交易。
- 完整前端 CRUD 驗收。
- 進階交易篩選。
- 月度與年度進階統計。
- 財務圖表。
- CSV 匯出。
- 完整自動化回歸測試。
- 全系統驗收。
- 正式穩定版本發布。

## 10.4 目前最重要的技術成果

本專案已經能將：

使用者表單操作

→ JavaScript 驗證

→ HTTP Request

→ Express API

→ SQLite

→ JSON Response

→ Dashboard 與交易列表更新

串接成可操作的基本全端流程。

新增與修改交易已經能從前端實際操作，不再只能依靠 PowerShell 呼叫 API。

同時，開發過程也建立了基礎的測試、排錯與 Git 版本管理方式。

## 10.5 下一個開發目標

先完成 Milestone 10-3 的文件與版本提交。

確認 GitHub 同步後，再進入：

Milestone 10-4｜Frontend Delete Transaction。

該階段將完成前端刪除交易操作，並建立刪除前確認與相關錯誤處理。

---

# 十一、文件修訂與維護紀錄

## 2026-11-11｜開發日誌完整更新

本次修訂以 GitHub 上既有的 DEVELOPMENT_LOG 為基礎，補充後續開發進度。

### 保留的歷史紀錄

- Milestone 01 專案初始化。
- Milestone 02 Express 建置。
- Milestone 03 前端首頁。
- Milestone 04 Dashboard 靜態版面。
- Milestone 05 SQLite 初始化。
- Milestone 06 Categories API。
- Milestone 07 GET、POST API。
- Milestone 08 PUT API。
- Milestone 09 DELETE API。
- 原始資料表設計。
- 原始預設分類。
- 原始開發環境。
- 主要 API 驗證結果。
- Port 3000、3001 排錯。
- 重要 Node.js 程序資訊。
- 歷史 Git Commit。
- 資料庫完整性檢查。
- 資料持久化驗證。
- 文件維護原則。

### 新增與更新的內容

- 更新目前開發階段。
- 更新 GitHub 提交狀態。
- 補充 Milestone 09 Commit。
- 新增 Milestone 10-1。
- 新增 Milestone 10-2。
- 新增 Milestone 10-3。
- 更新前端技術架構。
- 補充 public/app.js 的用途。
- 補充 Fetch API 資料流程。
- 補充 Dashboard 動態計算。
- 補充前端分類選單。
- 補充前端表單驗證。
- 補充新增交易流程。
- 補充編輯交易流程。
- 補充取消編輯。
- 補充資料重新整理。
- 補充瀏覽器快捷鍵問題。
- 補充 HTTP Status 0 排查。
- 補充 PowerShell JSON 問題。
- 補充 HTTP 404 複驗。
- 補充 Node.js PID 4512 排查。
- 補充前端 Failed to fetch。
- 補充測試資料恢復。
- 補充 Git 差異檢查。
- 更新後續開發規劃。
- 區分已完成與尚未完成測試。
- 區分 Git Commit、Push 與 Release。
- 補充目前系統完成狀態。

### 本次修訂限制

此次文件整理以現有 GitHub 程式碼、既有開發文件以及實際測試紀錄為依據。

Milestone 10-3 尚未執行 Git Commit。

因此，本次文件更新不宣稱最新前端編輯功能已正式同步至 GitHub。

若未來實際 Git 提交內容或功能有所調整，應依最後提交版本更新紀錄。

---

# 十二、Maintenance Statement｜開發日誌維護聲明

本文件將持續記錄 Money Tracker 的真實開發進度。

每次達成新里程碑時，應更新功能狀態、技術內容、測試結果、已知限制及版本控制紀錄。

已完成的歷史開發階段應保留，避免後續更新造成重要資訊遺失。

測試結果必須以實際觀察為依據。

未執行的測試不得宣稱通過。

未提交至 GitHub 的功能不得標示為已同步。

尚未正式驗收的系統不得宣稱已全面完成。

本日誌與 CHANGELOG.md、TESTING.md 應保持資訊一致，同時維持各自的文件用途。

Money Tracker 將持續以逐步開發、實際驗證、技術理解及 Git 版本控制的方式完成後續功能。

---

# 十三、Milestone 10-4｜Frontend Delete Transaction 開發紀錄

**開發日期：** 2026-11-11
**功能狀態：** 本機實作完成
**主要測試狀態：** PASS
**文件狀態：** 更新中
**Git Commit：** 尚未建立
**GitHub Push：** 尚未執行
**正式 Release：** 尚未發布

## 13.1 開發背景

在 Milestone 10-3 完成後，Money Tracker 已經具有以下前端能力：

- 從後端取得交易資料。
- 動態呈現 Dashboard。
- 透過 POST API 新增交易。
- 透過 PUT API 修改既有交易。
- 取消編輯並恢復新增模式。
- 進行基本金額與日期驗證。
- 在 API 失敗時顯示錯誤訊息。

然而，使用者仍然無法直接從網頁刪除既有交易。

雖然 Milestone 09 已完成後端 `DELETE /api/transactions/:id`，當時的刪除功能仍需使用 PowerShell 或其他 HTTP 工具呼叫。

本階段因此將既有 DELETE API 整合至前端，補齊使用者直接操作交易資料的主要 CRUD 流程。

## 13.2 開發目標

本階段預定完成：

1. 每筆交易新增刪除按鈕。
2. 刪除前顯示確認視窗。
3. 確認視窗呈現交易詳細資料。
4. 取消刪除不修改資料。
5. 確認刪除後呼叫 DELETE API。
6. 避免重複提交交易操作。
7. 正常處理後端成功回應。
8. 正常處理 HTTP 錯誤。
9. 正常處理網路連線失敗。
10. 刪除成功後重新載入交易資料。
11. 即時更新 Dashboard。
12. 確保其他交易不受影響。
13. 完成實際測試及文件整理。
14. 維持既有新增與編輯功能。

## 13.3 開發範圍

### 本階段修改檔案

| 檔案                | 修改目的                   |
| ------------------- | -------------------------- |
| `public/index.html` | 新增刪除訊息顯示區         |
| `public/app.js`     | 實作刪除流程與 API 整合    |
| `public/style.css`  | 新增刪除按鈕及提示訊息樣式 |

### 未修改檔案

本階段沒有修改：

- `server/server.js`
- `server/init-db.js`
- `server/check-db.js`
- SQLite Schema

後端 DELETE API 原本已存在，因此不需要重複開發。

## 13.4 開發前 Git 基準

上一個已完成里程碑：

Milestone 10-3｜Frontend Edit Transaction。

Commit SHA：

`6a10ae1`

Commit Message：

`feat: implement frontend transaction editing and document tests`

已確認該 Commit 成功 Push 至 GitHub `main`。

進入 Milestone 10-4 時，以此版本作為主要開發基準。

## 13.5 測試資料準備

為避免直接刪除原本的 ID 1 或 ID 3，本階段採用專用測試交易。

### 初始資料

| ID  | 金額 | 日期       | 備註                     |
| --- | ---: | ---------- | ------------------------ |
| 3   |  180 | 2026-11-10 | Milestone 10-3 edit test |
| 1   |  150 | 2026-11-09 | Updated lunch test       |

當時 Dashboard：

- 收入：NT$0。
- 支出：NT$330。
- 淨額：-NT$330。
- 交易數量：2。

### 建立刪除測試資料

透過前端新增：

- 類型：支出。
- 分類：餐飲。
- 金額：NT$123。
- 日期：2026-11-11。
- 備註：Milestone 10-4 DELETE temporary test。

SQLite 產生交易 ID：

`4`

新增後：

- 交易數量：3。
- 本月支出：NT$453。
- 淨額：-NT$453。

重新整理網頁後，ID 4 仍然存在。

測試資料準備成功。

## 13.6 HTML 修改

### 修改位置

檔案：

`public/index.html`

區塊：

最近交易紀錄（Recent Transactions）。

### 原有元素

`transactions-status`

該元素負責顯示交易資料載入狀態及交易筆數。

### 新增元素

`delete-status`

使用：

- `id="delete-status"`
- `class="delete-feedback"`
- `role="status"`
- `aria-live="polite"`

### 設計目的

新增專用區域呈現刪除操作結果，避免與新增或編輯交易的表單訊息混淆。

### 實際結果

HTML 修改完成後：

- 原交易列表正常顯示。
- 原交易筆數正常顯示。
- 新訊息區沒有破壞原本排版。

## 13.7 JavaScript 修改

檔案：

`public/app.js`

### 13.7.1 新增 DOM 參照

新增刪除狀態元素的參照：

`deleteStatus`

用於更新刪除操作訊息。

### 13.7.2 新增訊息函式

新增：

`setDeleteStatus(message, status)`

主要用途：

- 顯示一般提示。
- 顯示刪除成功訊息。
- 顯示刪除失敗訊息。
- 更新對應 CSS Class。

成功時使用 success 類別。

失敗時使用 error 類別。

### 13.7.3 新增刪除函式

新增：

`deleteTransaction(transactionId)`

此函式負責整個前端刪除流程。

基本流程：

1. 檢查目前是否有其他交易操作正在進行。
2. 從已載入的交易資料查找指定 ID。
3. 確認交易存在。
4. 組合交易摘要。
5. 顯示確認視窗。
6. 判斷使用者是否確認刪除。
7. 確認後鎖定交易操作。
8. 發送 DELETE Request。
9. 解析後端 JSON。
10. 檢查 HTTP Status 及 API 成功狀態。
11. 核對 API 回傳的交易 ID。
12. 重新載入交易。
13. 更新 Dashboard。
14. 顯示成功或失敗訊息。
15. 解除操作鎖定。

### 13.7.4 刪除確認視窗

使用：

`window.confirm()`

確認視窗呈現：

- 交易 ID。
- 日期。
- 分類。
- 金額。
- 備註。
- 無法直接復原的提醒。

目的在於降低使用者誤刪交易的風險。

此次沒有建立自訂 HTML Modal。

### 13.7.5 取消刪除

當使用者選擇取消時：

- 不發送 DELETE Request。
- 不進入刪除流程。
- 顯示取消訊息。
- 保留原交易資料。

此設計可以避免使用者只是查看確認視窗就意外刪除交易。

### 13.7.6 DELETE API 整合

呼叫端點：

`DELETE /api/transactions/:id`

前端透過 Fetch API 發送 HTTP DELETE。

預期後端成功回應包含：

- `success: true`
- 成功訊息。
- 被刪除交易的 ID。

前端確認成功回應後，才進行下一步畫面更新。

### 13.7.7 回傳 ID 驗證

當 DELETE API 回傳成功時，前端額外檢查回傳的交易 ID 是否與預期相符。

若不一致：

- 不直接宣稱操作已完整成功。
- 顯示資料需要重新確認的訊息。

此檢查不能取代後端資料庫驗證，但能降低前端處理錯誤回應的風險。

### 13.7.8 Dashboard 同步

刪除成功後重新呼叫：

`GET /api/transactions`

取得最新交易資料。

之後透過既有 Dashboard 計算與交易列表渲染流程更新畫面。

不直接依靠前端暫存資料刪除指定列，也不只是在 DOM 中隱藏交易。

此設計讓畫面依據重新取得的資料顯示。

### 13.7.9 API 錯誤處理

當後端回傳非成功 HTTP Status 時：

- 解析可取得的錯誤訊息。
- 顯示操作失敗。
- 不直接更新交易列表為刪除成功狀態。

當 Fetch API 無法連線時：

- 捕捉錯誤。
- 顯示 Failed to fetch。
- 提醒使用者重新核對資料再重試。

### 13.7.10 DELETE 成功但 GET 失敗

程式已設計對應處理：

如果 DELETE 已回傳成功，但交易清單重新載入失敗，前端應提示使用者重新整理確認資料。

原因是：

DELETE 成功不代表後續資料載入一定成功。

目前此特殊情境尚未進行獨立故障注入測試。

### 13.7.11 操作狀態管理

本階段延續並整合共用狀態：

`isSubmitting`

在交易操作期間：

- 避免再次執行刪除。
- 暫時停用相關操作。
- 操作結束後恢復按鈕狀態。

此機制降低重複點擊造成的問題，但尚未完成大量並發或快速連點壓力測試。

### 13.7.12 既有編輯流程

程式碼包含刪除目前正在編輯的交易時，返回新增模式的處理。

不過這個特殊流程尚未執行獨立測試，因此不能列為已驗證。

## 13.8 CSS 修改

檔案：

`public/style.css`

新增或調整：

- `.transaction-actions`
- `.delete-action`
- `.delete-action:hover`
- `.delete-action:focus-visible`
- `.delete-action:disabled`
- `.delete-feedback`
- `.delete-feedback.success`
- `.delete-feedback.error`

### 視覺設計

刪除按鈕採紅色外框。

原本編輯按鈕維持藍色外框。

兩個操作按鈕排列在同一列。

### 實際結果

瀏覽器畫面顯示：

- 編輯與刪除按鈕正常排列。
- 三筆交易各有對應刪除按鈕。
- 紅色刪除按鈕樣式正常。
- 原 Dashboard 排版未出現明顯異常。

完整跨裝置版面測試尚未完成。

## 13.9 正常刪除流程驗證

操作對象：

ID 4。

刪除前：

- ID 4：NT$123。
- ID 3：NT$180。
- ID 1：NT$150。
- 總支出：NT$453。
- 交易數量：3。

確認視窗顯示正確交易資訊。

取消刪除時，三筆資料保留。

正式確認刪除後：

- ID 4 從交易清單消失。
- ID 3 保留。
- ID 1 保留。
- 交易數量變成 2。
- Dashboard 總支出變成 NT$330。
- 淨額變成 -NT$330。
- 出現刪除成功訊息。

重新整理網頁後，ID 4 仍然不存在。

測試結果：PASS。

## 13.10 HTTP 404 驗證

針對已刪除的 ID 4 再次發送：

`DELETE /api/transactions/4`

使用：

`curl.exe -i -X DELETE`

實際 HTTP Status：

`404 Not Found`

實際 JSON：

`{"success":false,"message":"Transaction not found"}`

測試結果：PASS。

此測試直接驗證後端 DELETE API。

不代表已測試前端刪除操作收到 HTTP 404 時的完整 UI 呈現。

## 13.11 SQLite 完整性驗證

完成 ID 4 刪除後，執行：

`node server/check-db.js`

檢查結果：

- Categories Schema 正常。
- Transactions Schema 正常。
- Foreign Key 正常。
- Integrity Check：ok。
- Foreign Key Check：No foreign key violations。
- 八個預設分類存在。

另以 GET API 確認：

- ID 3：NT$180。
- ID 1：NT$150。
- ID 4 不存在。

測試結果：PASS。

## 13.12 網路中斷測試資料

為測試刪除失敗處理，另建立交易：

- ID：5。
- 類型：支出。
- 分類：餐飲。
- 金額：NT$77。
- 日期：2026-11-11。
- 備註：Milestone 10-4 network failure test。

新增後：

- 交易總數：3。
- 總支出：NT$407。
- 淨額：-NT$407。

本次使用專用交易 ID 5，避免對既有交易造成風險。

## 13.13 伺服器停止問題

### 問題背景

先前 Milestone 10-3 曾發生 Ctrl + C 後，Node.js 仍持續監聽 Port 3000 的情況。

因此本階段沒有直接假設 Ctrl + C 等於伺服器完全停止。

### 程序檢查

執行：

`Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue`

當次取得 PID：

`19192`

再透過 Win32_Process 查詢。

實際結果：

- ProcessId：19192。
- Name：node.exe。
- CommandLine：node server/server.js。

### 停止程序

確認程序身分後執行：

`Stop-Process -Id 19192`

再次檢查 Port 3000。

未取得監聽程序結果。

此時才進行連線失敗測試。

### 技術意義

不能只根據終端機是否返回提示字元判斷伺服器狀態。

必須區分：

- PowerShell 終端機。
- Node.js 程序。
- TCP Port。
- 監聽程序。
- HTTP API 可用性。

## 13.14 DELETE 連線失敗測試

### 前置條件

- Port 3000 沒有監聽程序。
- 原本 Money Tracker 頁面仍已載入。
- 沒有重新整理頁面。
- ID 5 仍顯示於交易清單。

### 測試操作

1. 點擊 ID 5 的刪除按鈕。
2. 確認視窗顯示 ID 5 與 NT$77。
3. 選擇確定。
4. 觀察前端錯誤處理。

### 實際結果

前端顯示：

`Failed to fetch`

並顯示刪除交易 ID 5 失敗的紅色提示。

當時畫面：

- ID 5 仍顯示 NT$77。
- ID 3 仍顯示 NT$180。
- ID 1 仍顯示 NT$150。
- 交易總數維持 3。
- Dashboard 支出維持 NT$407。
- 沒有顯示刪除成功。

測試結果：PASS。

### 重要區分

前端未更新畫面，是第一層檢查。

SQLite 是否真正沒有刪除資料，仍需待伺服器恢復後進一步驗證。

## 13.15 伺服器恢復後驗證

重新執行：

`npm start`

再使用：

`GET /api/transactions`

實際查詢結果：

| ID  | 金額 | 備註                                |
| --- | ---: | ----------------------------------- |
| 5   |   77 | Milestone 10-4 network failure test |
| 3   |  180 | Milestone 10-3 edit test            |
| 1   |  150 | Updated lunch test                  |

三筆資料完整存在。

因此此次連線失敗沒有造成 ID 5 遺失。

測試結果：PASS。

## 13.16 測試資料清理

完成網路中斷測試後，使用前端刪除 ID 5。

實際畫面顯示：

`交易 ID 5 刪除成功！Dashboard 與交易清單已更新。`

清理後：

- ID 5 從清單消失。
- ID 3 保留 NT$180。
- ID 1 保留 NT$150。
- 交易數量恢復 2。
- 總支出恢復 NT$330。
- 淨額恢復 -NT$330。

測試資料清理成功。

此處記錄的是刪除後即時畫面；ID 5 清理完成後的額外重新整理驗證尚未另行記錄。

## 13.17 程式碼與 Git 基本檢查

完成主要功能測試後，於 VS Code PowerShell 執行：

- `git status --short`
- `node --check public/app.js`
- `node --check server/server.js`
- `git diff --check`
- `git diff --stat`

結果：

- 前端 JavaScript 基本語法檢查通過。
- 後端 JavaScript 基本語法檢查通過。
- Git Diff 空白格式檢查通過。
- 三份前端程式檔案均有修改。

當次 Git 統計：

- 3 files changed。
- 611 insertions。
- 106 deletions。

這代表當次工作目錄相對於已提交版本的文字差異。

不代表新增 611 項功能，也不能以此判斷程式碼品質。

## 13.18 LF／CRLF 警告

Git 顯示部分前端檔案可能由 LF 轉為 CRLF。

這屬於換行格式提示。

目前：

- 沒有因此出現 JavaScript 語法錯誤。
- 沒有因此阻止 Git 差異檢查。
- 沒有觀察到直接由換行格式造成的功能失敗。

不需在本階段另行重寫整份前端程式碼。

## 13.19 技術決策

### 保留既有後端 API

因為 Milestone 09 已完成 DELETE API，沒有必要為前端整合重新實作後端。

### 使用原生 JavaScript

沿用原本 HTML、CSS、JavaScript 架構，不增加前端框架。

### 使用 window.confirm

本階段優先完成清楚、可測試的刪除確認流程。

暫不導入額外 Modal Library。

### 刪除後重新 GET

以後端重新回傳的資料更新 Dashboard 和交易清單。

降低前端畫面與伺服器資料不一致的風險。

### 使用專用測試資料

正常刪除使用 ID 4。

網路失敗測試使用 ID 5。

保留 ID 1、ID 3，避免不必要的破壞性測試。

### 維持測試範圍的可追溯性

後端 HTTP 404、前端 Failed to fetch、SQLite 完整性及畫面同步分別記錄。

不將不同層級的測試混為單一結果。

## 13.20 已完成成果

本階段已完成：

- 刪除按鈕。
- CSS 樣式。
- 刪除確認視窗。
- 取消刪除。
- DELETE API 整合。
- 刪除成功提示。
- 刪除失敗提示。
- Dashboard 同步。
- 交易列表同步。
- 刪除後重新整理驗證。
- 後端 HTTP 404 測試。
- SQLite 完整性檢查。
- 網路連線失敗測試。
- 伺服器恢復後資料查詢。
- 專用測試交易清理。
- JavaScript 基本語法檢查。
- Git Diff 基本格式檢查。

## 13.21 尚未完成或尚未全面驗證

- 前端 HTTP 404 獨立 UI 測試。
- 刪除正在編輯中的交易之特殊情境。
- 快速連點與大量並發測試。
- DELETE 成功但後續 GET 失敗之獨立測試。
- 非法 ID 的所有邊界情境。
- 完整自動化 CRUD 回歸測試。
- 大量資料效能測試。
- 完整系統驗收。
- Milestone 10-4 Git Commit。
- Milestone 10-4 GitHub Push。
- 正式 Release。

## 13.22 本階段結論

Milestone 10-4 已成功將原有的 DELETE REST API 整合至 Money Tracker 前端。

目前使用者可以透過網頁進行交易資料的新增、查詢、編輯與刪除，主要 CRUD 操作已具備可操作的前端流程。

其中刪除操作已完成正常流程、取消操作、API 404、網路失敗、資料完整性及 Dashboard 同步的既定測試。

本階段尚待文件最終核對與版本提交。

因此，目前可以將前端刪除功能記錄為「本機實作完成、既定主要測試通過」，但不宣稱完整系統驗收已完成。

## 13.23 下一階段

完成本階段文件與 GitHub 提交後，後續將進行：

- 財務統計與分析。
- 日期及分類篩選。
- CSV 匯出。
- 進階 SQL 查詢。
- 系統整合測試。
- README 與文件一致性整理。
- 正式版本發布準備。

後續工作以實際需求和測試結果調整，不將規劃內容視為已完成事項。

---

**Milestone 10-4 開發紀錄狀態：已完成撰寫，待正式版本提交。**
