# Money Tracker｜完整開發日誌（DEVELOPMENT LOG）

本文件記錄 Money Tracker 個人財務管理系統從專案初始化至各階段功能開發的實際歷程，涵蓋開發目標、技術選擇、系統架構、資料庫設計、REST API 實作、前端整合、測試驗證、錯誤排除、版本控制、學習成果及後續開發規劃。

本文件採取持續累積的方式維護，目的不僅是記錄專案目前具備哪些功能，也保留每個功能的開發背景、實作原因、測試證據與曾經遇到的問題，讓未來回顧、維護及擴充專案時有明確的參考依據。

本文件不將尚未完成的功能記錄為已完成，也不將單一測試通過解讀為整個系統已完成驗收。

## 最新狀態補充｜2026-11-14（Milestone 13）

- 已實作：CSV 全部與篩選交易匯出。
- 已核對：兩份實際 CSV，分別為 2 筆及 1 筆。
- 最新正式開發基準：`8aaf69a`。
- 目前工作：Milestone 13-4 文件與版本管理。
- Excel、特殊輸入及完整驗收：仍待補充。
- 下方 2026-11-12 狀態屬歷史紀錄。
- 詳細過程請見本文件第十六章。

## 最新開發狀態｜2026-11-12

- **專案名稱：** Money Tracker
- **目前開發階段：** Milestone 11-4｜Documentation & Version Control
- **前一正式提交基準：** `d4148f1`（Milestone 10-4）
- **目前功能狀態：** Milestone 11-1～11-3 主要功能已完成本機實作
- **主要測試狀態：** PASS
- **完整自動化測試：** 尚未完成
- **完整系統驗收：** 尚未完成
- **Milestone 11 Git Commit：** 尚未建立
- **Milestone 11 GitHub Push：** 尚未執行
- **正式 Release：** 尚未發布

### 本階段主要開發成果

1. 每月收入、支出與淨額統計。
2. 收入及支出分類分析。
3. 分類金額、筆數及占比計算。
4. 分類占比環形圖。
5. 收入與支出比較圖。
6. 最近六個月收支趨勢。
7. 跨年月份計算。
8. 交易新增、修改、刪除後的分析同步。
9. 最終 REST API 與 SQLite 完整性檢查。

### 文件與版本管理狀態

Milestone 11-4 已完成四份主要文件的內容更新，目前正在進行文件一致性與 Git 最終審查。

目前尚未執行本階段的正式 Commit 或 Push。

以下原有文件資訊及 Git 狀態屬於 Milestone 10-3 時點的歷史紀錄，應予保留。完整的 Milestone 11 技術開發過程記載於本文件第十四章。

---

## 歷史文件資訊｜2026-11-11（Milestone 10-3 時點）

- 專案名稱：Money Tracker
- 中文名稱：個人財務管理系統
- 開發起始日期：2026-11-09
- 最後整理日期：2026-11-11
- 目前開發階段：Milestone 10-3｜Frontend Edit Transaction
- 目前主要成果：基本後端 CRUD、動態 Dashboard、前端新增交易及編輯交易
- 目前待完成項目：Milestone 10-3 文件及 Git 提交、前端刪除交易、進階財務分析與完整系統驗收
- 正式 Release：尚未發布

## 當時 Git 狀態｜Milestone 10-3

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

# 十四、Milestone 11｜Financial Analytics & Visualization 開發紀錄

## 14.1 開發階段基本資訊

| 項目                  | 內容                                              |
| --------------------- | ------------------------------------------------- |
| 專案名稱              | Money Tracker                                     |
| 階段名稱              | Milestone 11｜Financial Analytics & Visualization |
| 開發期間              | 2026-11-11～2026-11-12                            |
| 開發環境              | Windows、Visual Studio Code、PowerShell           |
| 前端技術              | HTML5、CSS3、JavaScript                           |
| 後端技術              | Node.js、Express                                  |
| 資料庫                | SQLite                                            |
| 既有資料來源          | `GET /api/transactions`                           |
| 前一已提交版本        | `d4148f1`（Milestone 10-4）                       |
| Milestone 11-1        | 每月財務及分類統計                                |
| Milestone 11-2        | 分類占比環形圖及收支比較圖                        |
| Milestone 11-3        | 最近六個月收支趨勢                                |
| Milestone 11-4        | 文件整理及版本管理                                |
| 主要功能狀態          | 本機實作完成，既定主要測試通過                    |
| 最終 API 與資料庫檢查 | PASS                                              |
| Milestone 11 Commit   | 尚未建立                                          |
| Milestone 11 Push     | 尚未執行                                          |
| 正式 Release          | 尚未發布                                          |

本章是新增的 Milestone 11 開發紀錄，不取代先前 Milestone 01～10-4 的歷史內容。

舊章節中出現的「尚未提交」或「下一階段將開發財務分析」等說明，屬於當時開發階段的歷史紀錄，不代表最新專案狀態。

本階段尚未完成完整系統驗收，亦不宣稱所有自動化測試均已執行。

## 14.2 開發背景與目標

在 Milestone 10-4 完成後，Money Tracker 已具備基本的前後端交易管理流程。

使用者可以透過網頁：

- 查詢現有交易紀錄。
- 新增收入或支出。
- 編輯既有交易。
- 刪除指定交易。
- 檢視 Dashboard 財務摘要。
- 使用 SQLite 保存交易資料。

然而，原有 Dashboard 主要顯示當月收入、支出及淨額，無法進一步分析：

- 不同分類的支出金額。
- 各分類占總支出的比例。
- 收入與支出的相對規模。
- 指定歷史月份的財務狀況。
- 多個月份之間的財務變化。
- 跨年期間的收入與支出趨勢。

因此，Milestone 11 的開發目標是將既有交易資料轉換成具有分析價值的財務資訊。

本階段不以增加交易 CRUD 功能為目標，而是建立一個能夠重複利用既有資料、依使用者選擇進行統計的財務分析模組。

## 14.3 功能範圍與開發原則

本階段分成三個功能子階段及一個文件整理階段。

### Milestone 11-1｜Monthly Analytics

建立每月財務統計與分類彙整。

### Milestone 11-2｜Financial Visualization

將既有統計結果轉換為環形圖及比較長條圖。

### Milestone 11-3｜Six-Month Trends

以選取月份為終點，分析連續六個月的收入、支出及淨額。

### Milestone 11-4｜Documentation and Version Control

整理功能、技術決策、測試紀錄與 Git 版本歷史，完成後再正式提交。

本階段遵守下列原則：

1. 優先沿用已完成的交易 API。
2. 不為了新增圖表而修改 SQLite Schema。
3. 將財務分析邏輯與交易 CRUD 操作適度分離。
4. 避免在不同圖表中維護互相矛盾的統計結果。
5. 不將交易測試資料直接視為正式財務資料。
6. 所有具破壞性的測試使用專用交易紀錄。
7. 測試後確認原始交易完整保留。
8. 明確區分程式實作、測試通過及版本發布。
9. 將尚未驗證的項目保留為待測，不提前標記完成。
10. 保留既有日誌與 Git 歷史，避免後續開發造成紀錄遺失。

## 14.4 系統架構延續與修改範圍

### 14.4.1 原有系統架構

Money Tracker 原有資料流程為：

使用者操作網頁 → JavaScript 呼叫 REST API → Express 處理請求 → SQLite 儲存或查詢資料 → API 回傳 JSON → JavaScript 更新畫面。

Milestone 11 延續此架構，未重新建立伺服器或資料庫。

### 14.4.2 分析模組的資料流程

新增的分析流程可概括為：

1. `app.js` 透過 API 載入交易資料。
2. API 回傳包含交易日期、分類、類型及金額的資料。
3. 前端將交易資料提供給分析模組。
4. `analytics.js` 接收並保存目前的交易陣列。
5. 使用者選擇月份及分析類型。
6. 分析模組依條件篩選、分組及加總。
7. 分析結果呈現在文字統計及圖表中。
8. 交易資料更新後，分析模組重新計算。

此設計避免為了不同圖表建立多條不必要的資料查詢流程。

### 14.4.3 本階段主要涉及的檔案

**`public/index.html`**

主要用途：

- 建立財務分析區塊。
- 建立月份選擇器。
- 建立收入與支出分類切換控制。
- 建立收入、支出及淨額顯示元素。
- 建立分類統計容器。
- 建立環形圖容器。
- 建立收支比較圖容器。
- 建立六個月趨勢圖容器。
- 載入財務分析 JavaScript。

**`public/style.css`**

主要用途：

- 統一財務分析區塊外觀。
- 設計統計資訊卡片。
- 設計分類占比進度條。
- 設計環形圖及圖例。
- 設計收入、支出比較長條。
- 設計六個月份的趨勢排列。
- 設計不同收支類型的顏色。
- 處理較窄畫面中的水平捲動。

**`public/analytics.js`**

主要用途：

- 管理選取月份及分析類型。
- 接收交易資料。
- 計算每月收支。
- 按分類彙整交易。
- 計算分類金額占比。
- 產生環形圖。
- 產生收支比較圖。
- 計算最近六個月資料。
- 產生六個月趨勢圖。
- 處理空資料與載入狀態。

**`public/app.js`**

延續既有職責：

- 載入交易資料。
- 更新 Dashboard。
- 更新最近交易列表。
- 新增、編輯及刪除交易。
- 在資料重新載入後通知分析模組。

本階段沒有將交易 CRUD 主流程移入 `analytics.js`。

### 14.4.4 未修改的主要後端結構

本階段沒有因財務分析而重新設計：

- `server/server.js` 的交易 CRUD 路由。
- `categories` 資料表。
- `transactions` 資料表。
- 原有交易 ID 及分類關聯。
- SQLite 外鍵約束。

財務分析所需的資料由既有 API 提供。

## 14.5 Milestone 11-1｜每月財務分析功能

### 14.5.1 開發需求

使用者需要能夠指定月份，檢視該月收入、支出、淨額，以及各分類的金額與占比。

因此新增兩項主要控制：

- 統計月份。
- 分類統計類型。

分類統計類型分為收入分類及支出分類。

### 14.5.2 每月交易篩選

交易資料包含 `transaction_date` 欄位。

分析模組使用交易日期的年月部分，與使用者選取的年月進行比對。

例如：

選取月份：`2026-11`

交易日期：`2026-11-09`

該筆交易應被計入 2026 年 11 月。

交易日期：`2026-10-12`

該筆交易則不計入 2026 年 11 月的單月統計。

如此可以將不同月份的交易正確分開。

### 14.5.3 收入及支出加總

每筆交易包含：

- `amount`
- `type`
- `category_id`
- `category_name`
- `transaction_date`

分析時先確認金額為有效的正整數，再依 `type` 決定收入或支出。

其中：

- `income`：累加至收入。
- `expense`：累加至支出。

計算原則：

當月淨額 = 當月收入 − 當月支出。

若收入低於支出，淨額應為負值。

### 14.5.4 分類彙整方式

分析模組使用 `Map` 結構累積分類統計。

分類識別結合交易類型與 `category_id`，避免不同交易類型之間的分類資料混淆。

每個分類至少保存：

- 分類名稱。
- 分類累計金額。
- 該分類的交易筆數。

例如：

| 分類 | 交易筆數 |   金額 |
| ---- | -------: | -----: |
| 餐飲 |        2 | NT$330 |
| 交通 |        1 |  NT$70 |

支出合計：

330 + 70 = NT$400。

### 14.5.5 分類金額占比

分類占比計算方式：

分類占比 = 該分類金額 ÷ 所選收支類型合計金額 × 100%。

以上述資料為例：

餐飲占比 = 330 ÷ 400 × 100% = 82.5%。

交通占比 = 70 ÷ 400 × 100% = 17.5%。

兩者合計 100%。

畫面以百分比及長條呈現分類結果。

### 14.5.6 收入分類與支出分類的切換

分類切換只影響分類統計的內容。

例如，當使用者從「支出分類」切換至「收入分類」時：

- 當月收入總額不應被清空。
- 當月支出總額不應被清空。
- 當月淨額不應被重新解讀。
- 下方分類統計則切換為收入分類。

這是為了避免使用者將分類篩選誤認為整個月份的交易篩選。

### 14.5.7 空資料處理

如果選取月份沒有任何交易，系統應：

- 顯示收入 NT$0。
- 顯示支出 NT$0。
- 顯示淨額 NT$0。
- 顯示交易數量為零。
- 顯示無對應分類的提示。
- 不產生錯誤的百分比。

分類合計為零時，不執行以零為分母的占比計算。

### 14.5.8 Milestone 11-1 主要驗證

本階段實際測試過：

- 2026 年 10 月空月份。
- 2026 年 11 月既有交易統計。
- 交通及餐飲等不同分類。
- 跨月份交易日期變更。
- 新增收入測試交易。
- 收入及支出分類切換。
- 交易金額修改後的同步計算。
- 專用測試交易刪除後的恢復。

依已提供的畫面，既有兩筆餐飲支出合計為 NT$330。

新增其他分類及收入測試資料後，收入、支出、淨額及分類占比有對應變化。

相關專用測試交易後續已進行清理。

Milestone 11-1 既定主要瀏覽器測試通過。

## 14.6 Milestone 11-2｜分類占比環形圖

### 14.6.1 開發目的

文字及水平進度條可以顯示分類金額，但不容易快速辨識各分類在整體支出或收入中的結構。

因此新增分類占比環形圖。

### 14.6.2 技術選擇

本階段使用：

- 原生 JavaScript。
- CSS `conic-gradient()`。
- HTML 圖例元素。

沒有引入 Chart.js 或其他第三方圖表套件。

選擇原因：

1. 分類占比的資料結構相對簡單。
2. 目前只需要呈現金額比例。
3. 不必額外建立套件相依性。
4. 可以直接沿用既有分類統計結果。
5. 便於理解圖表產生過程。

### 14.6.3 環形圖計算

完整圓形為 360 度。

各分類扇形角度：

分類角度 = 分類金額 ÷ 分類合計 × 360 度。

例如：

餐飲占 82.5%。

對應角度為 297 度。

交通占 17.5%。

對應角度為 63 度。

兩者合計 360 度。

### 14.6.4 色彩與圖例

不同分類使用不同顏色區分。

圖例顯示：

- 分類名稱。
- 金額。
- 百分比。

環形圖中央顯示所選收入或支出類型的總金額。

圖例與環形圖使用相同的統計資料，降低數字不一致的可能性。

### 14.6.5 空資料處理

當所選月份或所選類型沒有資料時：

- 不建立無意義的環形圖。
- 顯示沒有可繪製分類的提示。
- 不顯示 `NaN` 或無效百分比。

此設計已在無交易月份測試中觀察到正常結果。

### 14.6.6 多分類測試

本階段使用專用交易 ID 8 進行測試。

測試資料：

- 類型：支出。
- 分類：交通。
- 金額：NT$70。
- 日期：2026-11-12。
- 備註：`Milestone 11-2 donut chart test`。

與原本的餐飲支出 NT$330 合併後：

| 分類 |   金額 |  占比 |
| ---- | -----: | ----: |
| 餐飲 | NT$330 | 82.5% |
| 交通 |  NT$70 | 17.5% |
| 合計 | NT$400 |  100% |

實際畫面正確顯示兩個分類及對應百分比。

測試後刪除 ID 8。

刪除後：

- 支出恢復 NT$330。
- 餐飲占比恢復 100%。
- 交易總數恢復為兩筆。
- 原本 ID 1、ID 3 保留。

結果：PASS。

## 14.7 Milestone 11-2｜收入與支出比較圖

### 14.7.1 開發目的

除了分類占比，使用者也需要直觀比較當月收入與支出的相對規模。

因此新增收入及支出水平長條。

### 14.7.2 比例尺設計

圖表使用當月收入及支出中較高的金額作為 100% 基準。

例如：

收入 NT$200。

支出 NT$400。

則：

- 收入長條長度為 50%。
- 支出長條長度為 100%。

這是相對長度比較，不代表支出占收入的比例。

### 14.7.3 零值處理

當收入及支出都為零時：

- 最大值為零。
- 兩個長條的填色長度均為零。
- 畫面顯示 NT$0。
- 不進行除以零的運算。

### 14.7.4 顏色設計

本階段使用：

- 收入：綠色。
- 支出：粉紅色。

不同類型有固定的視覺識別，協助辨識資料。

### 14.7.5 測試結果

已測試：

- 收入 NT$0、支出 NT$330。
- 收入與支出皆為零。
- 新增收入後的比較結果。
- 刪除測試交易後的恢復。

實際畫面與所選月份的統計數字一致。

Milestone 11-2 主要圖表測試結果：PASS。

## 14.8 Milestone 11-3｜六個月收支趨勢分析

### 14.8.1 開發目的

Milestone 11-1 及 11-2 主要分析單一月份。

然而，單月統計無法直接呈現不同月份的收入或支出變化。

因此，Milestone 11-3 新增最近六個月的趨勢分析。

### 14.8.2 主要功能需求

使用者選擇任一統計月份後，系統應：

1. 將所選月份作為最後一個月份。
2. 向前推算五個月份。
3. 顯示六個連續月份。
4. 將月份由舊至新排列。
5. 分別計算各月收入。
6. 分別計算各月支出。
7. 計算各月淨額。
8. 將收入與支出轉換為長條。
9. 保留沒有交易月份的零值。
10. 支援跨年度月份。
11. 支援交易新增、編輯及刪除後的更新。

### 14.8.3 月份計算方式

`analytics.js` 使用 `getSixMonthKeys()` 產生六個月份。

為避免直接處理日期時間所涉及的時區差異，月份計算採用年份及月份序號。

概念如下：

月份序號 = 年份 × 12 + 月份 − 1。

再從所選月份序號往前推算五個單位。

例如：

選取月份為 2026 年 11 月。

取得月份：

- 2026/06
- 2026/07
- 2026/08
- 2026/09
- 2026/10
- 2026/11

選取月份為 2027 年 2 月。

取得月份：

- 2026/09
- 2026/10
- 2026/11
- 2026/12
- 2027/01
- 2027/02

此方式可以處理 12 月與次年 1 月的銜接。

### 14.8.4 每月資料初始化

在計算交易之前，先建立六個月份的資料結構。

每個月份預設包含：

- 年月識別值。
- 收入零值。
- 支出零值。

這讓沒有交易的月份也可以出現在圖表中，而不會因為沒有對應交易而消失。

### 14.8.5 交易資料分組

對目前已載入的交易逐筆處理。

主要步驟：

1. 讀取交易日期。
2. 取得交易的年月。
3. 檢查是否落在六個月份範圍內。
4. 檢查交易金額是否為有效正整數。
5. 根據交易類型累加收入或支出。
6. 不在六個月範圍內的交易不加入圖表。

此方式可避免選取 2027 年 2 月時，只統計 2027 年 2 月而遺漏 2026 年 11 月的既有支出。

### 14.8.6 每月淨額計算

每月淨額 = 該月收入 − 該月支出。

例如：

2026 年 11 月收入 NT$0。

2026 年 11 月支出 NT$330。

因此：

2026 年 11 月淨額 = -NT$330。

若某月份收入大於支出，淨額則為正數。

### 14.8.7 長條高度比例

六個月份共用一個高度比例尺。

先取得六個月內單月收入及支出的最大值。

再依下列概念換算長條高度：

長條高度百分比 = 該月指定類型金額 ÷ 六個月中的最高單月收支金額 × 100%。

例如：

六個月中最高支出為 NT$330。

某月支出 NT$80。

則其相對高度約為 24.2%。

此設計避免不同月份各自使用 100% 基準，使長條高度失去跨月份比較意義。

### 14.8.8 趨勢圖資訊

每個月份至少呈現：

- 年月。
- 收入金額。
- 支出金額。
- 淨額。
- 收入長條。
- 支出長條。

即使長條較短，使用者仍可以透過文字確認實際金額。

### 14.8.9 版面設計

六個月份以 Grid 排列。

為降低小螢幕擠壓圖表的風險，容器允許水平捲動。

此為已實作的版面處理方式。

但目前尚未完成所有手機尺寸與瀏覽器的完整相容性驗收。

### 14.8.10 空月份處理

若某月份沒有交易：

- 收入為 NT$0。
- 支出為 NT$0。
- 淨額為 NT$0。
- 收入及支出長條不填色。
- 該月份仍然保留在圖表中。

若六個月全部沒有交易，比例計算不應除以零。

## 14.9 Milestone 11-3｜前端事件與即時同步

### 14.9.1 設計需求

圖表不能只在網頁首次載入時正確。

如果使用者新增、修改或刪除交易，統計也應更新。

否則 Dashboard、交易列表及分析圖表可能顯示不同的金額。

### 14.9.2 事件驅動方式

本階段沿用交易資料載入後的通知機制。

`analytics.js` 監聽：

`moneytracker:transactions-loaded`

取得更新後的交易陣列，並重新執行統計與圖表呈現。

分析模組也監聽：

`moneytracker:transactions-error`

用於處理交易資料載入失敗的情況。

這使分析功能不必直接控制新增、修改與刪除交易的操作。

### 14.9.3 CRUD 與分析模組的職責

交易 CRUD 仍由原有前端程式及 REST API 處理。

分析模組只負責：

- 接收資料。
- 計算結果。
- 呈現統計。
- 更新圖表。

此設計使交易操作與統計呈現的職責相對清楚。

### 14.9.4 重新載入資料的理由

在交易新增、修改或刪除成功後，沿用既有的重新取得交易資料流程。

分析模組再根據更新後的交易陣列計算。

此方式可減少前端僅依操作預期自行增減金額所造成的不一致。

但目前尚未完整測試所有非同步請求競態情境，不能視為已具備全面的並發控制。

## 14.10 Milestone 11-3｜初始六個月測試

### 14.10.1 測試前置條件

資料庫具有兩筆既有支出：

| ID  | 日期       | 分類 |   金額 |
| --- | ---------- | ---- | -----: |
| 1   | 2026-11-09 | 餐飲 | NT$150 |
| 3   | 2026-11-10 | 餐飲 | NT$180 |

11 月支出合計 NT$330。

### 14.10.2 測試輸入

統計月份：2026 年 11 月。

分類統計類型：支出分類。

### 14.10.3 預期結果

| 月份    | 收入 | 支出 | 淨額 |
| ------- | ---: | ---: | ---: |
| 2026/06 |    0 |    0 |    0 |
| 2026/07 |    0 |    0 |    0 |
| 2026/08 |    0 |    0 |    0 |
| 2026/09 |    0 |    0 |    0 |
| 2026/10 |    0 |    0 |    0 |
| 2026/11 |    0 |  330 | -330 |

### 14.10.4 實際結果

瀏覽器畫面顯示六個月份，排列順序正確。

2026 年 6～10 月均顯示零值。

2026 年 11 月顯示：

- 收入 NT$0。
- 支出 NT$330。
- 淨額 -NT$330。

只有 11 月的支出長條有填色。

結果：PASS。

## 14.11 Milestone 11-3｜跨年月份測試

### 14.11.1 測試目的

確認月份計算不會在跨年時產生排序錯誤。

### 14.11.2 測試輸入

將統計月份改為 2027 年 2 月。

### 14.11.3 預期結果

六個月份應為：

2026/09 → 2026/10 → 2026/11 → 2026/12 → 2027/01 → 2027/02。

其中 2026 年 11 月仍有原本的支出 NT$330。

2027 年 2 月沒有交易，因此單月統計應為零。

### 14.11.4 實際結果

瀏覽器正確顯示六個連續月份。

2026/12 與 2027/01 的銜接正確。

2026 年 11 月支出保持 NT$330。

2027 年 2 月：

- 收入 NT$0。
- 支出 NT$0。
- 淨額 NT$0。

單月統計與六個月趨勢的資料範圍區分正確。

結果：PASS。

## 14.12 Milestone 11-3｜新增交易同步測試

### 14.12.1 測試目的

確認交易新增後，六個月趨勢會更新。

### 14.12.2 測試資料

使用專用交易 ID 9。

第一次觀察的測試金額為 NT$50。

交易月份為 2026 年 11 月。

### 14.12.3 預期結果

原本 11 月支出 NT$330。

新增支出 NT$50 後：

330 + 50 = NT$380。

### 14.12.4 實際結果

新增成功後，趨勢圖顯示 2026 年 11 月支出 NT$380。

其餘沒有交易的月份仍顯示零值。

結果：PASS。

## 14.13 Milestone 11-3｜修改金額同步測試

### 14.13.1 測試目的

確認修改同一筆交易的金額後，趨勢圖使用新的金額，而不是重複累加舊金額。

### 14.13.2 測試操作

將專用交易 ID 9 的金額由 NT$50 改為 NT$80。

### 14.13.3 預期結果

既有支出：NT$330。

修改後專用支出：NT$80。

當月總支出：

330 + 80 = NT$410。

### 14.13.4 實際結果

瀏覽器顯示 2026 年 11 月支出 NT$410。

新增及修改成功提示均有對應畫面證據。

結果：PASS。

## 14.14 Milestone 11-3｜跨月份修改測試

### 14.14.1 測試目的

確認交易日期修改時，統計能正確將交易從原月份移至新月份。

此測試比單純修改金額更重要，因為它涉及兩個月份的重新彙整。

### 14.14.2 測試操作

將 ID 9 的日期修改為：

`2026-10-12`

金額保持 NT$80。

### 14.14.3 預期結果

2026 年 10 月支出應增加至 NT$80。

2026 年 11 月支出應由 NT$410 恢復為 NT$330。

### 14.14.4 實際結果

瀏覽器趨勢圖顯示：

| 月份    |   支出 |    淨額 |
| ------- | -----: | ------: |
| 2026/10 |  NT$80 |  -NT$80 |
| 2026/11 | NT$330 | -NT$330 |

10 月及 11 月的支出長條均正確顯示。

由於共用相同的最高金額基準，10 月 NT$80 長條明顯低於 11 月 NT$330 長條。

此結果確認跨月份重新計算符合預期。

結果：PASS。

## 14.15 Milestone 11-3｜刪除交易同步測試

### 14.15.1 測試目的

確認刪除專用交易後，相關月份的金額能恢復。

### 14.15.2 測試操作

刪除專用交易 ID 9。

刪除前資料：

- 日期：2026-10-12。
- 類型：支出。
- 分類：交通。
- 金額：NT$80。

### 14.15.3 預期結果

刪除後：

- 2026 年 10 月支出恢復 NT$0。
- 2026 年 11 月支出維持 NT$330。
- 原本 ID 1、ID 3 保留。
- 總交易數恢復兩筆。

### 14.15.4 實際結果

瀏覽器顯示 ID 9 刪除成功。

趨勢圖中：

- 10 月支出恢復 NT$0。
- 11 月支出保持 NT$330。
- 其餘月份沒有新增異常金額。

交易清單只留下 ID 1 與 ID 3。

結果：PASS。

## 14.16 最終 API 與 SQLite 資料完整性檢查

### 14.16.1 檢查目的

前端畫面顯示交易刪除成功，不能單獨證明後端資料確實已更新。

因此，在測試交易清理後，另外使用 REST API 及 SQLite 檢查程式驗證。

### 14.16.2 API 查詢方式

使用 PowerShell 執行：

`Invoke-RestMethod -Uri "http://localhost:3000/api/transactions"`

取得交易資料後，檢查：

- 交易 ID。
- 交易分類。
- 交易金額。
- 交易日期。
- 備註。

### 14.16.3 最終 API 結果

API 回傳兩筆交易：

| ID  | 分類 |   金額 | 日期       | 備註                     |
| --- | ---- | -----: | ---------- | ------------------------ |
| 3   | 餐飲 | NT$180 | 2026-11-10 | Milestone 10-3 edit test |
| 1   | 餐飲 | NT$150 | 2026-11-09 | Updated lunch test       |

專用交易 ID 9 不再存在。

因此可確認：

- 測試資料已清理。
- 原本交易資料仍然存在。
- 11 月支出合計為 NT$330。

API 最終查詢結果：PASS。

### 14.16.4 SQLite 檢查方式

執行：

`node server/check-db.js`

本工具輸出資料表結構、外鍵資訊及資料庫檢查結果。

### 14.16.5 SQLite Integrity Check

實際輸出：

`ok`

結果：PASS。

### 14.16.6 Foreign Key Check

實際輸出：

`No foreign key violations`

結果：PASS。

### 14.16.7 資料表及分類檢查

檢查輸出中可見：

`categories` 資料表包含：

- `id`
- `name`
- `type`

`transactions` 資料表包含：

- `id`
- `category_id`
- `amount`
- `transaction_date`
- `note`
- `created_at`

交易分類仍包含收入及支出分類。

外鍵關聯仍指向：

`transactions.category_id → categories.id`

未觀察到外鍵違規。

### 14.16.8 檢查結論

Milestone 11-3 最終 API 與 SQLite 資料完整性檢查：PASS。

本次結果確認 API 最終資料狀態與 SQLite 完整性正常。

不將此結果擴大解讀為所有資料庫故障、並發或備份還原測試均已通過。

## 14.17 財務分析功能的資料一致性

本階段需要確保以下資訊彼此一致：

1. REST API 交易資料。
2. Dashboard 顯示。
3. 所選月份的 Analytics 數字。
4. 分類金額占比。
5. 環形圖。
6. 收支比較圖。
7. 六個月趨勢圖。
8. 最近交易列表。

例如原始測試資料只有兩筆餐飲支出時：

- API 交易合計：NT$330。
- Dashboard 11 月支出：NT$330。
- Analytics 11 月支出：NT$330。
- 餐飲分類合計：NT$330。
- 餐飲占比：100%。
- 環形圖中央金額：NT$330。
- 11 月趨勢支出：NT$330。

上述主要結果已透過實際畫面及 API 查詢交叉確認。

此設計使使用者不需要自行判斷哪個畫面的財務數字才是正確的。

## 14.18 開發過程中的重要技術決策

### 決策一：沿用既有 REST API

沒有為財務統計新增專用資料端點。

理由是目前資料量與開發階段仍適合使用既有交易資料進行前端分析。

未來若交易量增加，可再評估是否將彙整運算移往後端。

### 決策二：新增獨立的分析模組

將分析程式集中在 `analytics.js`。

理由：

- 避免持續擴大 `app.js`。
- 保持交易操作與統計功能的職責分離。
- 後續加入新的圖表時較容易維護。

### 決策三：使用原生 JavaScript 與 CSS

目前沒有使用額外的前端圖表套件。

理由：

- 依現階段功能需求即可完成基本視覺化。
- 減少額外相依套件。
- 便於理解資料轉換為圖表的流程。

此決策不代表第三方圖表套件永遠不適合本專案。

### 決策四：使用共用資料來源

多種圖表由已載入交易資料計算。

避免每張圖表獨立維護另一份交易資料副本。

### 決策五：使用月份序號處理跨年

六個月範圍透過年月序號推算。

避免只處理月份數字而遺漏年份變化。

### 決策六：所有月份使用同一高度基準

讓六個月份的收入與支出長條可以直接比較。

### 決策七：保留空月份

沒有交易的月份仍顯示 NT$0。

避免使用者誤以為月份遺失。

### 決策八：以專用交易測試新增、修改與刪除

保留 ID 1、ID 3，降低破壞原有測試資料的風險。

### 決策九：測試完成後查詢 API 與 SQLite

前端畫面不能取代資料庫完整性驗證。

### 決策十：延後 Git Commit

將 Milestone 11-1～11-3 的功能及對應文件一起整理，再進行正式提交。

此方式有利於維持同一階段的程式碼、文件與版本歷史一致性。

## 14.19 問題排除與注意事項

### 問題一：資料分析不能只依目前選取月份計算六個月趨勢

如果將單月篩選結果直接提供給六個月趨勢，其他月份的交易將無法被計算。

因此，趨勢分析必須以完整已載入交易資料為來源，再依六個月範圍進行彙整。

本次跨年及跨月份測試已觀察到正確結果。

### 問題二：交易改變月份時，原月份不能保留舊金額

當 ID 9 從 11 月改到 10 月，系統必須同時：

- 從 11 月統計移除 NT$80。
- 將 NT$80 加入 10 月。

實際測試顯示：

11 月由 NT$410 恢復 NT$330。

10 月增加至 NT$80。

此情境已通過。

### 問題三：全零月份不能執行無效比例運算

當收入及支出均為零時，圖表不應除以零。

本階段使用零值處理及空資料提示。

空月份的主要瀏覽器測試已通過。

### 問題四：長條滿格不代表金額沒有更新

當六個月內只有一個月份有支出，該月份的支出長條會一直是最高的 100% 高度。

例如 11 月支出由 NT$330 改為 NT$380 或 NT$410 時，長條可能都維持滿格。

此情況不代表資料沒有更新。

應同時核對長條旁邊的實際金額。

### 問題五：原有提示可能保留上次成功訊息

曾觀察到新增交易表單仍顯示上一筆新增成功訊息，而交易刪除提示已顯示最新操作結果。

這屬於不同操作訊息區域的呈現方式。

目前未觀察到因此造成交易資料錯誤。

未來可評估是否統一操作訊息的清除規則。

### 問題六：Git 換行格式警告

Windows 環境可能出現：

`LF will be replaced by CRLF`

這是工作目錄換行格式提示。

本階段未觀察到由此直接造成 JavaScript 執行失敗。

不將它誤判為功能測試失敗。

### 問題七：Git 對新增文件的空白格式警告

Milestone 11-4 文件整理時，新增的 CHANGELOG 區段曾出現 `trailing whitespace` 警告。

目前採取的處理原則：

- 不因此中斷已通過的財務分析功能測試。
- 保留警告的實際狀態。
- 在最終文件品質檢查時統一處理或明確保留。
- 在警告未消失之前，不將完整的 Git Diff 空白檢查宣稱為 PASS。

## 14.20 Milestone 11 程式碼品質檢查

本階段曾執行：

- `node --check public/analytics.js`
- `node --check public/app.js`
- `node --check server/server.js`
- `git diff --check`
- `git status --short`

主要 JavaScript 語法檢查未顯示錯誤。

在部分文件修改之前，Git Diff 基本格式檢查未顯示格式錯誤。

其後新增的 CHANGELOG 內容出現行尾空白警告，尚未全部清理。

因此應區分：

**JavaScript 基本語法檢查：PASS。**

**Milestone 11 文件最終 Git Diff 格式檢查：尚待最終驗證。**

本階段沒有建立完整自動化測試套件。

語法檢查不等於功能測試或程式碼全面審查。

## 14.21 Milestone 11 已完成的主要成果

截至本次整理，已完成：

- 依月份查詢財務統計。
- 每月收入加總。
- 每月支出加總。
- 每月淨額計算。
- 收入及支出分類切換。
- 分類交易筆數。
- 分類金額加總。
- 分類金額占比。
- 分類占比進度條。
- 分類占比環形圖。
- 收支比較長條圖。
- 最近六個月收支趨勢。
- 跨年月份範圍計算。
- 六個月份的收入及支出加總。
- 六個月份的淨額顯示。
- 空月份的零值呈現。
- 新增交易後圖表更新。
- 修改交易金額後圖表更新。
- 修改交易日期後跨月份統計更新。
- 刪除交易後圖表更新。
- 專用測試交易清理。
- 最終 REST API 資料核對。
- SQLite Integrity Check。
- SQLite Foreign Key Check。
- 既有交易資料保留。
- 基本 JavaScript 語法檢查。

以上指的是本階段已實作及已取得主要測試證據的範圍，不等於完成所有可能的邊界情境。

## 14.22 尚未完成或尚未全面驗證

本階段仍未完成：

- 所有異常 API 回應的獨立畫面測試。
- 大量交易資料統計效能測試。
- 高速連續更新交易的競態測試。
- 多個非同步請求交錯完成的測試。
- 長時間離線後的恢復測試。
- 所有非法日期及異常資料格式測試。
- 極大金額與累加結果溢位的完整測試。
- 多裝置同步測試。
- 所有主流瀏覽器相容性測試。
- 完整手機與平板響應式驗收。
- 圖表無障礙操作的完整驗收。
- 完整自動化回歸測試。
- 前後端整體端對端驗收。
- 交易篩選功能。
- CSV 匯出功能。
- 正式 Release。

上述未執行項目不因主要功能通過而自動標示為 PASS。

## 14.23 Milestone 11-4｜文件維護與版本管理

### 14.23.1 文件維護目的

本階段除了程式功能，也需要保留可追溯的產品及技術歷史。

專案應能讓未來接手的人了解：

- 每個 Milestone 的開發目標。
- 為何選擇特定技術架構。
- 修改了哪些檔案。
- 如何計算統計結果。
- 哪些功能實際測試通過。
- 測試資料如何建立及清理。
- 哪些問題尚未完成驗證。
- 哪個版本正式提交至 GitHub。

### 14.23.2 四份主要文件

**`CHANGELOG.md`**

記錄產品層級的功能變更及版本狀態。

**`docs/DEVELOPMENT_LOG.md`**

記錄技術設計、實作過程、排錯經驗及開發決策。

**`docs/TESTING.md`**

記錄測試案例、前置條件、輸入資料、預期結果、實際結果及測試狀態。

**`README.md`**

向初次接觸專案的人介紹目前功能、技術架構及使用方法。

### 14.23.3 文件備份

本次文件更新前，已備份四份原始文件至專案目錄之外。

備份檔案大小為：

| 檔案               |          大小 |
| ------------------ | ------------: |
| CHANGELOG.md       |  85,775 Bytes |
| DEVELOPMENT_LOG.md | 109,624 Bytes |
| TESTING.md         |  96,619 Bytes |
| README.md          |     992 Bytes |

以上為備份時的檔案大小，不是新版文件的最終大小。

### 14.23.4 歷史紀錄保留原則

本次文件整理採用追加新章節的方式。

不因為 Milestone 11 已完成主要功能，就刪除之前 Milestone 的開發紀錄。

過去章節中的 Git 狀態應被理解為當時的歷史快照。

新章節記錄本階段的最新進度。

最後仍應檢查文件開頭的 Current Status，避免其被誤認為最新的專案狀態。

### 14.23.5 測試紀錄維護原則

已執行並核對結果的項目可記錄為 PASS。

若實際結果與預期不符，應記錄 FAIL 並附上問題描述。

尚未執行的項目記錄為 NOT RUN。

單純由程式碼推論可行的情境，不能自動當成已通過的實際測試。

### 14.23.6 本階段 Git 狀態

前一已提交版本：

`d4148f1`

對應 Milestone 10-4：

`feat: implement frontend transaction deletion and document tests`

Milestone 11 的新功能仍位於本機工作目錄，尚未建立正式 Milestone 11 Commit。

本階段開發期間可觀察到：

- `public/app.js`：已修改。
- `public/index.html`：已修改。
- `public/style.css`：已修改。
- `public/analytics.js`：新增、尚未被 Git 追蹤。

文件整理期間亦開始修改：

- `CHANGELOG.md`
- `docs/DEVELOPMENT_LOG.md`

`docs/TESTING.md` 與 `README.md` 後續仍須整理。

以上為文件撰寫時的狀態，實際提交前應再次使用 `git status` 確認。

### 14.23.7 尚未執行的版本管理工作

- 四份文件最終一致性核對。
- 文件更新後 Git Diff 檢查。
- Milestone 11 最終程式與文件審查。
- Git Staging。
- Git Commit。
- Git Push。
- 遠端 GitHub 版本確認。

目前不填入尚未產生的 Milestone 11 Commit SHA。

## 14.24 本階段學習與工程實務成果

本階段主要學習成果不只是新增圖表，而是將既有交易功能擴充成可追溯、可驗證的分析模組。

具體包括：

1. 理解交易資料如何轉換成每月財務統計。
2. 使用 `Map` 進行分類彙整。
3. 避免重複計算與資料來源不一致。
4. 理解分類占比及相對長條比例尺。
5. 使用 CSS 產生基本圖表。
6. 在圖表中處理空資料及零值。
7. 使用月份序號處理跨年計算。
8. 區分所選月份分析與六個月趨勢分析。
9. 透過前端事件使不同功能模組取得更新後資料。
10. 驗證交易日期變更時的跨月份重新彙整。
11. 區分畫面更新、API 資料及資料庫完整性。
12. 使用專用測試交易，並在測試後清理。
13. 將功能測試證據與技術決策完整記錄。
14. 理解本機功能完成與正式版本提交的差異。
15. 維持專案日誌及版本歷史的可追溯性。

以上為本階段實作及驗證過程中涉及的工程能力，不代表已完成全面效能、安全或產品品質認證。

## 14.25 Milestone 11 結論

Milestone 11-1 完成每月收入、支出、淨額及分類統計。

Milestone 11-2 完成分類占比環形圖及收入與支出比較圖。

Milestone 11-3 完成最近六個月收支趨勢、跨年月份處理及交易 CRUD 後的主要統計同步功能。

測試過程中已確認：

- 單月統計數據正確。
- 分類金額占比正確。
- 空月份處理正常。
- 六個月排列正確。
- 跨年月份正確。
- 新增交易後統計更新。
- 修改金額後統計更新。
- 修改日期後跨月份統計更新。
- 刪除交易後統計恢復。
- 最終 REST API 查詢正確。
- SQLite 完整性正常。
- 沒有外鍵違規。
- 原有交易 ID 1、ID 3 保留。

本階段的主要功能測試可以記錄為 PASS。

但完整自動化測試、進階異常情境、完整系統驗收及正式版本發布尚未完成。

Milestone 11-4 的文件整理與 Git 提交仍在進行中。

因此目前階段狀態為：

**Milestone 11-1～11-3：本機主要功能與既定測試完成。**

**Milestone 11-4：文件整理及版本管理進行中。**

**整體 Milestone 11：尚待文件一致性檢查與正式 Git 提交。**

## 14.26 下一階段工作

完成本階段文件整理後，應依序：

1. 補齊 `docs/TESTING.md` 的 Milestone 11 測試案例。
2. 更新 `README.md` 的實際技術架構與功能狀態。
3. 核對 `CHANGELOG.md` 與開發日誌內容是否一致。
4. 檢查文件最上方的最新專案狀態。
5. 確認 Milestone 11 的已知限制記錄完整。
6. 執行最終 JavaScript 語法檢查。
7. 執行 Git 差異及格式檢查。
8. 建立 Milestone 11 Git Commit。
9. Push 至 GitHub。
10. 確認本機及遠端分支同步。
11. 規劃交易篩選與 CSV 匯出。
12. 持續補強整體測試及使用說明。

本章保留既有專案歷史並新增 Milestone 11 的技術開發證據。

後續應依實際測試及 Git 提交結果更新狀態，不能將尚未發生的版本管理操作預先記錄為完成。

---

**Milestone 11｜開發紀錄狀態：主要功能與測試證據已整理；文件及版本提交尚待完成。**

# 十五、Milestone 12 | Advanced Transaction Filtering & Search 開發紀錄

**開發期間：** 2026-11-12～2026-11-13

**所屬版本：** Unreleased

**開發基準：** `f17c61c`（Milestone 11）

**階段狀態：** 主要功能已實作，唯讀自動化檢查通過，正在進行文件整理及最終驗收。

**Git 狀態：** Milestone 12 尚未 Commit、Push。

---

## 15.1 開發背景與目標

Milestone 11 完成財務分析功能後，Money Tracker 已能顯示收入、支出、淨額、分類占比及最近六個月收支趨勢。

然而，使用者仍需要在交易清單中逐筆查找特定紀錄。當交易數量增加，僅顯示最近交易的方式無法充分滿足查詢需求。

因此，Milestone 12 的主要目標是實作進階交易篩選與搜尋功能，並且維持原有的資料管理及統計邏輯。

本階段採用以下開發原則：

1. 沿用既有 Express、REST API 與 SQLite 架構。
2. 不重新建立資料庫，也不破壞既有 CRUD。
3. 後端負責查詢條件驗證及資料篩選。
4. 前端負責表單操作、查詢狀態與結果呈現。
5. 完整交易資料與篩選結果分開管理。
6. 保留 Milestone 10、11 已完成的功能。
7. 先完成測試與文件整理，再統一提交版本。

## 15.2 Milestone 12-1：後端進階篩選 API

### 15.2.1 實作範圍

修改檔案：

`server/server.js`

擴充既有的：

`GET /api/transactions`

支援以下查詢條件：

| Query Parameter | 功能 |
|---|---|
| `from` | 起始日期 |
| `to` | 結束日期 |
| `type` | 收入／支出 |
| `category_id` | 交易分類 |
| `min_amount` | 最低金額 |
| `max_amount` | 最高金額 |
| `keyword` | 備註或分類名稱關鍵字 |

後端根據使用者提供的查詢參數建立篩選條件，取得符合條件的交易紀錄。

多個條件可同時使用，例如依指定分類及金額區間查找交易。

### 15.2.2 資料庫設計決策

本階段沿用原有 `transactions` 與 `categories` 資料表。

沒有新增資料表、變更欄位結構或重新初始化 SQLite。

選擇維持既有資料模型，是因為交易搜尋屬於查詢功能，不需要藉由新的資料表儲存搜尋結果。

此設計可降低資料遷移風險，並維持既有 CRUD 的相容性。

### 15.2.3 後端參數驗證

為避免不合理查詢及模糊錯誤，後端包含以下驗證：

- 檢查日期格式及日期有效性。
- 拒絕不存在的日期。
- 檢查金額上下限。
- 拒絕最低金額大於最高金額。
- 拒絕未支援的查詢參數。
- 正確處理查無交易的情況。
- 保留既有 API 回應格式。

### 15.2.4 實際測試紀錄

開發期間曾透過 PowerShell 呼叫本機 API，檢查基本交易查詢、金額篩選、日期範圍、分類與組合條件。

已觀察到的實際結果包括：

- 完整查詢可以取得原有兩筆交易。
- `min_amount=170` 可篩選出 NT$180 的交易。
- `type=income` 在無收入資料時回傳零筆。
- 分類及金額組合條件可以取得符合條件的紀錄。
- 查無符合關鍵字的紀錄時，回傳空清單。
- 不合法日期回傳 HTTP 400。
- 最低金額高於最高金額時回傳 HTTP 400。
- 未知查詢參數回傳 HTTP 400。

上述結果支持後端主要篩選與輸入驗證功能正常。

## 15.3 Milestone 12-2：前端搜尋介面與整合

### 15.3.1 修改範圍

修改檔案：

- `public/index.html`
- `public/style.css`
- `public/app.js`

本階段在「最近交易紀錄」區域加入進階篩選介面，保留原有交易表格與編輯、刪除操作。

### 15.3.2 使用者介面

新增的篩選欄位包括：

1. 開始日期。
2. 結束日期。
3. 收支類型。
4. 交易分類。
5. 最低交易金額。
6. 最高交易金額。
7. 關鍵字。

另外提供「套用篩選」及「清除條件」操作。

當使用者尚未套用條件時，交易清單保持原有顯示方式。

使用者選擇條件後，前端將查詢參數送至交易 API，再呈現符合條件的交易。

### 15.3.3 前端狀態管理

本階段的重要設計是區分：

**完整交易資料：** 用於 Dashboard、Analytics，以及取得完整交易狀態。

**篩選結果資料：** 用於顯示符合查詢條件的交易清單。

篩選操作不應直接覆寫完整交易資料。

這樣能避免使用者搜尋單一分類時，Dashboard 或其他財務統計被錯誤縮減成搜尋結果。

前端也需要區分以下狀態：

- 尚未套用篩選。
- 已套用篩選。
- 查詢成功但沒有符合紀錄。
- 分類尚未載入完成。
- 分類載入失敗。
- 交易 API 查詢失敗。

### 15.3.4 CSS 與操作介面

新增進階篩選區塊的樣式，沿用既有深色主題。

設計包含：

- 篩選欄位網格排列。
- 輸入框與選單樣式。
- 按鈕正常及停用狀態。
- 狀態提示文字。
- 不同視窗寬度下的排列調整。

本階段並未重新設計整個 Money Tracker 頁面。

## 15.4 Milestone 12-2.5：CRUD 錯誤狀態修正

### 15.4.1 問題發現

在程式碼審查期間，發現交易 API 操作成功後，後續重新整理清單的處理可能產生誤導性的結果。

問題情境：

1. 使用者送出新增交易。
2. 伺服器成功寫入 SQLite。
3. 前端重新取得完整交易資料。
4. 後續的篩選查詢失敗。
5. 舊版程式可能將「篩選更新失敗」與「交易儲存失敗」混淆。

此情況可能使使用者誤認新增沒有成功，進而再次送出相同資料。

### 15.4.2 原因分析

原有程式使用單一布林值表達交易清單重新整理是否成功。

當程式改為回傳包含不同更新狀態的物件後，若仍保留：

`if (refreshed)`

就會產生邏輯風險。

JavaScript 中，物件即使包含 `false` 屬性，物件本身依然為 truthy。

因此，不能只用物件是否存在判斷所有資料是否成功更新。

### 15.4.3 修正方向

將完整交易資料更新與篩選結果更新分開判斷。

使用的狀態屬性包括：

- `transactionsUpdated`
- `filterUpdated`

前端在 POST、PUT 或 DELETE 已經成功時，須明確區分：

- 交易操作成功。
- 完整清單重新載入成功。
- 篩選結果重新載入成功。

這三個狀態不能直接視為同一件事。

### 15.4.4 修正過程

第一次修改時，已加入新的更新狀態判斷，但原有 `if (refreshed)` 區塊尚未完全移除。

這使同一個交易成功事件可能執行新舊兩套狀態處理，產生訊息互相覆蓋的風險。

後續重新檢查 `public/app.js`，確認需要刪除重複的舊判斷區塊。

最終使用完整修正版 `app.js` 取代舊檔，避免在大量程式碼中手動刪除時發生範圍錯誤。

修正重點包括：

1. 移除重複的舊版成功判斷。
2. 使用分離的更新狀態。
3. 改善交易已成功但重新整理失敗時的提示。
4. 避免新增成功後保留原始表單資料，降低重複送出的風險。
5. 保留原有交易 CRUD 及財務分析事件。

### 15.4.5 修正後檢查

修正版已通過 `node --check public/app.js`。

後續唯讀自動檢查也確認：

- 不再包含舊版 `if (refreshed)` 判斷。
- 程式包含新的 CRUD 更新狀態處理。
- 存在儲存成功後退出新增／編輯狀態的程式結構。

上述為實際語法及靜態結構檢查結果，不代表所有異常情境皆已經由真實瀏覽器完成驗收。

## 15.5 Milestone 12-3：自動化唯讀驗證

### 15.5.1 測試目的

因為已經進行多輪人工操作及 API 測試，為減少重複性驗證，建立一支獨立的唯讀檢查程式。

檢查程式名稱：

`Money-Tracker-M12-ReadOnly-Check.mjs`

檢查程式放在 `C:\Projects`，而不是 Money Tracker 專案資料夾內。

主要用途：

- 檢查 JavaScript 語法。
- 檢查關鍵程式結構。
- 測試 REST API。
- 驗證搜尋結果。
- 確認不合法輸入會遭到拒絕。
- 比對測試前後的交易資料。

### 15.5.2 測試環境

測試日期：2026-11-13

執行環境：

- Windows
- VS Code
- PowerShell
- Node.js
- 本機 Express Server
- SQLite
- HTTP GET API

測試伺服器：

`http://127.0.0.1:3000`

測試指令：

`node C:\Projects\Money-Tracker-M12-ReadOnly-Check.mjs`

### 15.5.3 測試過程中的問題

曾發生瀏覽器顯示：

`ERR_CONNECTION_REFUSED`

當時無法開啟 `localhost:3000`。

此錯誤表示瀏覽器未能與指定連接埠建立連線，並不能單憑此訊息推論 SQLite 或前端程式碼損壞。

重新啟動本機 Node.js 伺服器後，瀏覽器成功載入 Money Tracker。

其後再執行唯讀自動檢查程式。

### 15.5.4 實際執行結果

本機 PowerShell 顯示：

**檢查完成：20/20 PASS**

實際通過項目：

| 編號 | 測試項目 | 結果 |
|---|---|---|
| 01 | `public/app.js` 語法 | PASS |
| 02 | `public/analytics.js` 語法 | PASS |
| 03 | `server/server.js` 語法 | PASS |
| 04 | 移除舊版 `if (refreshed)` | PASS |
| 05 | CRUD 更新狀態結構 | PASS |
| 06 | 儲存成功後的表單狀態結構 | PASS |
| 07 | API 健康檢查 | PASS |
| 08 | 分類 API | PASS |
| 09 | 完整交易 GET | PASS |
| 10 | 收入篩選 | PASS |
| 11 | 支出篩選 | PASS |
| 12 | 最低金額篩選 | PASS |
| 13 | 最高金額篩選 | PASS |
| 14 | 分類篩選 | PASS |
| 15 | 指定日期篩選 | PASS |
| 16 | 不存在的關鍵字回傳空清單 | PASS |
| 17 | 拒絕無效日期 | PASS |
| 18 | 拒絕最低金額大於最高金額 | PASS |
| 19 | 拒絕未知參數 | PASS |
| 20 | 交易資料保持不變 | PASS |

全部測試通過，沒有顯示 FAIL。

### 15.5.5 資料持久化與安全性界線

本次檢查使用 GET 請求，不執行 POST、PUT 或 DELETE。

檢查程式會取得測試前的交易資料，並於結束時重新讀取，以比較兩次結果是否一致。

實際執行結果顯示交易資料未發生變化。

此結果支持唯讀測試沒有改變當次查詢可見的交易資料，但不等同於完整的資料庫完整性、安全性或交易併發測試。

### 15.5.6 網頁狀態確認

完成本機檢查後，另以 Microsoft Edge 瀏覽器確認 Money Tracker 可以正常開啟。

當時的既有資料包括兩筆餐飲支出：

- 2026-11-10：NT$180。
- 2026-11-09：NT$150。

Dashboard 顯示：

- 本月收入：NT$0。
- 本月支出：NT$330。
- 本月淨額：-NT$330。

Analytics 顯示：

- 餐飲分類合計 NT$330。
- 兩筆交易。
- 分類占比 100%。

上述數值相互一致。

但本次瀏覽器確認以畫面載入與既有資料呈現為主，未重新執行所有前端 CRUD 及搜尋操作。

## 15.6 測試限制與未完成驗證

本階段必須區分以下三種證據：

**已實際執行：** 本機 20/20 唯讀自動檢查。

**已取得畫面證據：** 本機網頁正常開啟及 Dashboard／Analytics 既有資料顯示。

**尚未完整執行：**

- 最新版搜尋表單的完整真實瀏覽器端對端操作。
- POST／PUT／DELETE 在網路異常時的完整瀏覽器驗收。
- 所有行動裝置尺寸的操作。
- 多使用者與公開部署情境。
- 正式安全性及效能測試。

不應將目前 20/20 PASS 解讀為所有測試情境均已完成。

## 15.7 本階段修改檔案

| 檔案 | 用途 | 狀態 |
|---|---|---|
| `server/server.js` | 交易搜尋 API 及驗證 | 已修改 |
| `public/index.html` | 進階搜尋表單 | 已修改 |
| `public/style.css` | 搜尋介面樣式 | 已修改 |
| `public/app.js` | 搜尋邏輯、狀態與 CRUD 同步 | 已修改 |
| `public/analytics.js` | 沿用既有分析模組 | 本階段未列為修改檔案 |

Milestone 12 不修改資料庫 Schema，也不重新實作 Milestone 11 的圖表計算。

## 15.8 Milestone 12-4：文件與版本管理

2026-11-13 開始整理：

- `CHANGELOG.md`
- `docs/DEVELOPMENT_LOG.md`
- `docs/TESTING.md`
- `README.md`

### 文件維護原則

1. 原有開發紀錄完整保留。
2. 新增 Milestone 12 的詳細技術歷程。
3. 測試紀錄以實際執行證據為依據。
4. 尚未執行的項目標示為 NOT RUN。
5. 不預先宣稱 Git Commit 或 GitHub Push 已成功。
6. 文件與程式碼檢查完成後再統一提交。

### 備份

正式修改文件前，已將四份原始文件備份至 Money Tracker 專案外的資料夾。

PowerShell 已確認四份備份檔案存在且大小大於零。

### 目前 Git 狀態

本階段以前一已提交版本：

`f17c61c`

作為開發基準。

目前程式碼及文件仍在本機進行整理，Milestone 12 尚未正式 Commit、Push。

## 15.9 已知風險與後續建議

### 15.9.1 本機服務存取範圍

系統目前定位為本機單人使用的財務管理工具。

正式發布或供其他裝置存取前，應重新確認伺服器監聽介面、網路存取範圍及驗證機制。

不應直接把目前的本機開發服務視為具備完整公開部署安全性的正式產品。

### 15.9.2 端對端驗收

唯讀檢查只能驗證其涵蓋的程式結構與 API 行為。

後續如要正式發布，仍應完成真實瀏覽器操作測試，尤其是資料寫入成功但清單重新整理失敗時的情況。

### 15.9.3 維護文件一致性

在版本正式提交前，應確認 CHANGELOG、DEVELOPMENT_LOG、TESTING 及 README 對完成進度的描述一致。

未來新增功能時，應持續使用相同的紀錄方法，避免 Git 提交紀錄與實際產品狀態脫節。

## 15.10 階段結論

Milestone 12 已完成進階交易搜尋的核心後端與前端實作，並改善交易成功後的更新狀態處理。

2026-11-13 的本機唯讀自動檢查取得 20/20 PASS，且當次檢查前後交易資料保持一致。

目前尚在文件整理及最終版本驗收階段，尚未建立 Milestone 12 的正式 Git Commit。

本章節為新增開發紀錄，延續並保留前面所有 Milestone 的歷史內容，不覆蓋舊有的技術決策、測試紀錄及問題排查過程。

# 十六、Milestone 13 | CSV Export 開發紀錄

## 16.1 開發背景與目標

Milestone 12 完成進階篩選後，Milestone 13 增加 CSV 匯出，
讓使用者可以把全部交易或已篩選的交易帶到試算表分析。

開發基準：`8aaf69a`。

本階段採用瀏覽器產生 CSV，不另外新增後端匯出 API，
避免重複實作交易查詢及篩選邏輯。

## 16.2 資料流程

1. 使用者點擊「匯出 CSV」。
2. 前端判斷目前是否有已套用的搜尋條件。
3. 透過 GET /api/transactions 重新取得交易資料。
4. 若已有篩選，將對應 Query String 傳給既有 API。
5. 檢查 HTTP 狀態、success 及 data 格式。
6. 將交易轉換成 CSV 欄位。
7. 透過 Blob、Object URL 及下載連結產生檔案。
8. 顯示匯出結果，並釋放暫存 URL。

查詢重新向 API 取得資料，不只依賴目前畫面顯示的交易列。
此操作設計為唯讀，沒有新增、修改或刪除交易的 API 呼叫。

## 16.3 CSV 格式

欄位順序：

1. 交易 ID
2. 交易日期
3. 收支類型
4. 交易分類
5. 金額（NT$）
6. 備註
7. 建立時間

使用 UTF-8 BOM 協助試算表辨識中文。
以 CRLF 分隔紀錄。
所有欄位以雙引號包住，欄位內雙引號加倍。
文字欄位包含試算表公式風險的前綴時，加入保護字元。

上述保護方式仍須補充專門的安全性測試。

## 16.4 修改檔案

| 檔案 | 修改目的 |
|---|---|
| public/app.js | 匯出邏輯、CSV 格式化及下載狀態 |
| public/index.html | 匯出按鈕與狀態訊息 |
| public/style.css | 匯出介面及響應式樣式 |

本階段沒有修改 `server/server.js`、
`public/analytics.js` 或 SQLite 資料表。

## 16.5 實際執行與排查

2026-11-14 完成主要程式碼寫入及語法檢查。

- app.js、analytics.js、server.js：Exit Code 0。
- git diff --check：Exit Code 0。
- Git 當時顯示三份檔案修改，共新增約 200 行。

本機網頁可正常顯示 Dashboard、Analytics 及交易紀錄。

已取得兩份實際 CSV：

- money-tracker-all-20261114-152034.csv
- money-tracker-filtered-20261114-152211.csv

第一份包含 2 筆交易，金額 NT$180 與 NT$150。
第二份包含最低金額 NT$170 篩選下的 1 筆 NT$180 交易。

兩份 CSV 均包含七個欄位、UTF-8 BOM 及 CRLF 換行。
中文欄名、餐飲分類及原有備註可以正常解析。

網頁曾顯示舊的「CSV 已建立：2 筆交易」訊息，
但實際篩選匯出檔案只有 1 筆，資料內容正確。
後續可在篩選條件變動時清除前次匯出提示。

## 16.6 驗證限制與後續工作

目前尚未完成：

- Excel 實際開檔相容性驗收。
- 空結果匯出。
- 逗號、雙引號與換行特殊資料測試。
- 公式注入防護的實際測試。
- 大量資料下載與效能檢查。
- 不同瀏覽器及裝置的完整驗收。
- 匯出前後 SQLite 資料庫的直接完整性比對。

以上不得記錄為 PASS。

## 16.7 文件與版本管理

四份文件已於 Milestone 13-4 開始前備份至專案外部。

本階段沿用累積式日誌管理方式，保留 Milestone 1～12 紀錄。
本章加入時尚未執行 Milestone 13 Git Commit 或 Push。

下次提交前應再次檢查程式、文件及 Git Staging 範圍。
