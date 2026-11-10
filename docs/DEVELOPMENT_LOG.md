# Money Tracker｜開發日誌（DEVELOPMENT LOG）

本文件記錄 Money Tracker 個人財務管理系統從專案初始化至各階段功能開發的完整歷程，包括開發目標、技術選擇、系統設計、程式實作、實際測試、錯誤排除、版本控制、學習成果與後續規劃。

最後整理日期：2026-11-10

目前開發階段：Milestone 09｜DELETE Transaction API

專案狀態：基本後端 CRUD 已實作並通過主要既定測試，尚未完成前端動態整合與整體系統驗收。

Milestone 09 Git 狀態：本機已完成實作及主要測試，尚待本階段 Commit 與 Push。

---

# 一、專案基本資訊

## 1.1 專案資訊

| 項目         | 內容                                 |
| ------------ | ------------------------------------ |
| 專案名稱     | Money Tracker                        |
| 中文名稱     | 個人財務管理系統                     |
| 專案類型     | 個人全端網頁開發專案                 |
| 開發模式     | 本機單人開發                         |
| 作業系統     | Windows                              |
| 開發工具     | Visual Studio Code                   |
| 前端語言     | HTML、CSS、JavaScript                |
| 後端環境     | Node.js                              |
| 後端框架     | Express                              |
| 資料庫       | SQLite                               |
| SQLite 存取  | Node.js 內建 node:sqlite             |
| 資料庫介面   | DatabaseSync                         |
| API 架構     | REST API                             |
| 資料交換格式 | JSON                                 |
| 版本控制     | Git                                  |
| 遠端版本管理 | GitHub                               |
| API 測試工具 | PowerShell、curl.exe、Microsoft Edge |
| 本機開發路徑 | C:\Projects\Money-Tracker            |
| 開發起始日期 | 2026-11-09                           |

GitHub Repository：

https://github.com/Chiou-Jiakang/Money-Tracker

## 1.2 初始開發環境

首次環境檢查記錄：

- Node.js：v24.15.0
- npm：11.12.1
- Git：2.54.0.windows.1

上述版本僅代表當次檢查結果，不代表未來環境永遠維持相同版本。

## 1.3 專案目標

建立一套可在本機執行的個人財務管理網頁系統，提供收入與支出的記錄、管理、查詢及分析。

主要功能規劃：

1. 建立收入交易。
2. 建立支出交易。
3. 查詢交易紀錄。
4. 修改既有交易。
5. 刪除指定交易。
6. 管理交易分類。
7. 計算本月總收入。
8. 計算本月總支出。
9. 計算收支淨額。
10. 提供財務 Dashboard。
11. 篩選指定期間及分類。
12. 顯示財務統計與圖表。
13. 匯出 CSV。
14. 保存歷史交易資料。

本專案同時具有實作及學習目的，不僅要求程式能執行，也要求理解前端、後端、資料庫及 HTTP API 的實際運作原理。

## 1.4 核心學習目標

1. 理解前端、後端與資料庫的職責。
2. 學習建立 Node.js 專案。
3. 學習使用 Express 建立 HTTP Server。
4. 理解 HTTP Request 與 Response。
5. 理解 REST API 與 CRUD。
6. 練習 SQL SELECT、INSERT、UPDATE、DELETE。
7. 理解 Primary Key 與 Foreign Key。
8. 理解 SQLite 資料持久化。
9. 學習資料驗證與錯誤處理。
10. 理解 HTTP Status Code。
11. 使用 PowerShell 測試 API。
12. 學習分析伺服器程序與 Port。
13. 建立 Git 與 GitHub 版本控制流程。
14. 撰寫技術文件與測試報告。
15. 最終完成可操作的全端應用程式。

---

# 二、系統技術架構

## 2.1 系統組成

系統分成三個主要層次。

### Frontend

技術：

- HTML5
- CSS3
- JavaScript

負責：

- 顯示 Money Tracker 網頁。
- 呈現財務 Dashboard。
- 顯示最近交易紀錄。
- 未來提供交易新增、修改及刪除介面。
- 未來透過 Fetch API 呼叫後端。

### Backend

技術：

- Node.js
- Express

負責：

- 啟動 HTTP Server。
- 提供靜態前端檔案。
- 接收 REST API Request。
- 驗證使用者輸入。
- 執行 SQL。
- 回傳 JSON Response。
- 處理基本錯誤。

### Database

技術：

- SQLite
- node:sqlite
- DatabaseSync

負責：

- 保存交易分類。
- 保存收入與支出紀錄。
- 維護資料表關聯。
- 支援交易 CRUD。
- 提供持久化儲存。

## 2.2 資料傳遞流程

使用者透過瀏覽器操作前端。

前端向 Express API 發出 HTTP Request。

Express 驗證 Request，並視需要執行 SQLite 查詢或資料修改。

SQLite 回傳執行結果。

Express 將結果轉換為 JSON。

前端收到 JSON 後，更新使用者介面。

目前進度：

- 靜態前端：已建立。
- Express：已建立。
- SQLite：已建立。
- GET、POST、PUT、DELETE 後端 API：已實作。
- 前端動態 CRUD 串接：尚未完成。

## 2.3 專案檔案架構

目前重要檔案：

```text
Money-Tracker/
├── data/
│   └── money-tracker.db
├── docs/
│   ├── DEVELOPMENT_LOG.md
│   └── TESTING.md
├── public/
│   ├── index.html
│   └── style.css
├── server/
│   ├── init-db.js
│   ├── check-db.js
│   └── server.js
├── node_modules/
├── .gitignore
├── CHANGELOG.md
├── README.md
├── package.json
└── package-lock.json
```

補充：

- `data/money-tracker.db` 為本機資料庫。
- `.db` 檔案受到 Git 忽略規則保護。
- `node_modules` 不應提交至 GitHub。
- `public` 保存前端網頁。
- `server` 保存後端程式。
- `docs` 保存開發與測試紀錄。

## 2.4 REST API 一覽

| Method | Endpoint              | 功能     | 狀態 |
| ------ | --------------------- | -------- | ---- |
| GET    | /api/health           | 健康檢查 | PASS |
| GET    | /api/categories       | 取得分類 | PASS |
| GET    | /api/transactions     | 查詢交易 | PASS |
| POST   | /api/transactions     | 新增交易 | PASS |
| PUT    | /api/transactions/:id | 修改交易 | PASS |
| DELETE | /api/transactions/:id | 刪除交易 | PASS |

PASS 代表本專案已執行的主要案例符合預期，不代表所有邊界條件、效能及安全性測試都已完成。

---

# 三、資料庫設計

## 3.1 資料庫位置

資料庫：

`data/money-tracker.db`

使用 Node.js 內建模組：

`node:sqlite`

主要存取介面：

`DatabaseSync`

## 3.2 Categories 資料表

用途：

儲存收入與支出分類。

欄位：

| 欄位 | 資料型態 | 條件        |
| ---- | -------- | ----------- |
| id   | INTEGER  | Primary Key |
| name | TEXT     | NOT NULL    |
| type | TEXT     | NOT NULL    |

## 3.3 Transactions 資料表

用途：

儲存每筆收入與支出紀錄。

欄位：

| 欄位             | 資料型態 | 條件                             |
| ---------------- | -------- | -------------------------------- |
| id               | INTEGER  | Primary Key                      |
| category_id      | INTEGER  | NOT NULL                         |
| amount           | INTEGER  | NOT NULL                         |
| transaction_date | TEXT     | NOT NULL                         |
| note             | TEXT     | 可為空值，預設空字串             |
| created_at       | TEXT     | NOT NULL，預設 CURRENT_TIMESTAMP |

## 3.4 主鍵與外鍵

交易 ID：

`transactions.id`

為交易資料的 Primary Key。

分類 ID：

`transactions.category_id`

參照：

`categories.id`

外鍵設定：

- ON UPDATE：NO ACTION。
- ON DELETE：RESTRICT。

`ON DELETE RESTRICT` 用於限制刪除仍被交易參照的分類，不會禁止刪除交易資料本身。

伺服器啟用：

`PRAGMA foreign_keys = ON`

## 3.5 預設分類

| ID  | 名稱     | 類型    |
| --- | -------- | ------- |
| 1   | 薪資     | income  |
| 2   | 獎金     | income  |
| 3   | 其他收入 | income  |
| 4   | 餐飲     | expense |
| 5   | 交通     | expense |
| 6   | 購物     | expense |
| 7   | 娛樂     | expense |
| 8   | 其他支出 | expense |

共八個預設分類。

## 3.6 金額設計

金額採用新臺幣整數。

例如：

- 收入 NT$30,000。
- 支出 NT$150。

API 不接受負數、零元或小數金額。

收入與支出透過所屬分類的 `type` 區分，不使用負金額代表支出。

## 3.7 日期設計

交易日期使用：

`YYYY-MM-DD`

例如：

`2026-11-09`

API 會檢查：

- 是否為字串。
- 是否符合固定格式。
- 日期是否真實存在。

例如：

`2026-02-30`

應被拒絕。

## 3.8 備註設計

交易備註：

`note`

限制：

- 必須為字串。
- 最長 500 個 JavaScript 字串長度單位。
- 省略時預設空字串。

目前長度限制以 JavaScript `.length` 計算，並非依照所有語言的使用者可見字元數計算。

## 3.9 資料庫安全與版本控制

資料庫包含使用者交易紀錄，因此不應公開提交至 GitHub。

已使用 `.gitignore` 排除：

`*.db`

曾執行：

`git check-ignore -v data/money-tracker.db`

確認資料庫檔案被忽略。

---

# 四、完整開發歷程

## 2026-11-09｜Milestone 01：專案初始化

### 4.1 開發目標

建立與其他既有程式專案互相獨立的 Money Tracker 專案。

### 4.2 完成內容

1. 建立本機資料夾。
2. 使用 VS Code 開啟專案。
3. 加入既有多根目錄 Workspace。
4. 確認 Node.js 可使用。
5. 確認 npm 可使用。
6. 確認 Git 可使用。
7. 建立本機 Git Repository。
8. 設定 main 分支。
9. 建立 GitHub Repository。
10. 設定 origin。
11. 建立 README.md。
12. 建立 .gitignore。
13. 完成首次 Commit。
14. 完成首次 Push。

### 4.3 開發環境問題

開發時曾遇到 VS Code 視窗及工作區管理問題。

Money Tracker 曾獨立出現在另一個 VS Code 視窗中。

處理方式：

將 Money Tracker 加入既有 Workspace，同時保持專案實際儲存位置獨立。

### 4.4 學習成果

- 理解 VS Code Workspace。
- 理解專案目錄管理。
- 理解本機與遠端 Repository。
- 理解 Git Working Tree。
- 理解 Git Staging Area。
- 學習 git add、commit、push。

### 4.5 Git 紀錄

Commit：

`1798256`

Commit Message：

`chore: initialize Money Tracker project`

狀態：已提交 GitHub。

---

## 2026-11-09｜Milestone 02：Express 後端建置

### 4.6 開發目標

建立 Node.js HTTP Server，並透過 Express 提供 REST API。

### 4.7 完成內容

- 使用 npm 初始化專案。
- 建立 package.json。
- 安裝 Express。
- 建立 package-lock.json。
- 建立 server/server.js。
- 設定 Port 3000。
- 支援 PORT 環境變數。
- 加入 express.json()。
- 建立 GET /api/health。
- 設定 npm start。

### 4.8 Health API

Endpoint：

`GET /api/health`

回應：

```json
{
  "status": "ok",
  "message": "Money Tracker API is running"
}
```

### 4.9 測試

執行：

`npm start`

伺服器正常輸出：

`Money Tracker server running at http://localhost:3000`

瀏覽器及 PowerShell 成功取得 Health API 回應。

### 4.10 學習成果

- Node.js 執行環境。
- Express Routing。
- HTTP Request。
- HTTP Response。
- JSON 格式。
- Port 與 HTTP Server。

### 4.11 Git 紀錄

Commit：

`23e6afe`

Commit Message：

`feat: set up Express server and health API`

狀態：已提交 GitHub。

---

## 2026-11-09｜Milestone 03：前端首頁建置

### 4.12 開發目標

建立 Money Tracker 的第一個網頁畫面，並透過 Express 提供靜態檔案。

### 4.13 完成內容

新增：

- public/index.html。
- public/style.css。

設計：

- Money Tracker 標題。
- 個人財務管理系統副標題。
- 深色網頁背景。
- 內容卡片。
- 基本 Dashboard 區域。

使用 Express Static Middleware 提供前端檔案。

### 4.14 測試

成功開啟：

`http://localhost:3000`

確認：

- HTML 正常載入。
- CSS 正常載入。
- 標題與副標題正常顯示。
- 深色主題正常呈現。

### 4.15 學習成果

- HTML 網頁結構。
- CSS 樣式設計。
- 靜態檔案服務。
- 前端與後端基本連結。

### 4.16 Git 紀錄

Commit：

`fe6cd52`

Commit Message：

`feat: add styled frontend homepage`

狀態：已提交 GitHub。

---

## 2026-11-09｜Milestone 04：Dashboard 與交易列表版面

### 4.17 開發目標

完成財務資訊展示區，為未來資料庫串接做好準備。

### 4.18 完成內容

建立三張摘要卡片：

1. 本月總收入。
2. 本月總支出。
3. 本月收支淨額。

使用不同顏色區分財務資訊。

建立最近交易紀錄表格，包含：

- 日期。
- 類型。
- 分類。
- 金額。
- 備註。

加入沒有資料時的空狀態提示。

調整 CSS 排版及卡片間距。

### 4.19 測試

已確認：

- 三張卡片正常顯示。
- 最近交易表格正常顯示。
- 深色主題正常運作。
- 桌面瀏覽器排版正常。
- 空資料提示正常顯示。

### 4.20 階段限制

目前屬於靜態版面。

尚未：

- 從 SQLite 動態取得交易。
- 計算每月收入。
- 計算每月支出。
- 計算收支淨額。
- 自動更新交易列表。

### 4.21 學習成果

- Dashboard 資訊架構。
- CSS Grid 與版面設計。
- 財務摘要呈現。
- 空資料狀態設計。
- 為未來 API 串接預留結構。

### 4.22 Git 紀錄

Commit：

`d654756`

Commit Message：

`feat: add dashboard summary and recent transactions layout`

狀態：已提交 GitHub。

---

## 2026-11-09｜Milestone 05：SQLite 資料庫初始化

### 4.23 開發目標

建立可持久化保存收入、支出及分類的資料庫。

### 4.24 技術選擇

使用：

- Node.js。
- node:sqlite。
- DatabaseSync。
- SQLite。

資料庫位置：

`data/money-tracker.db`

### 4.25 完成內容

建立：

- categories 資料表。
- transactions 資料表。
- Primary Key。
- Foreign Key。
- 八個預設分類。
- init-db.js。
- check-db.js。

設定：

`PRAGMA foreign_keys = ON`

並使用 Git 忽略規則排除資料庫檔案。

### 4.26 初始化測試

執行：

`node server/init-db.js`

實際結果：

- 資料庫初始化成功。
- Categories：8。
- Transactions：0。

### 4.27 結構檢查

執行：

`node server/check-db.js`

確認：

- Categories Table 正確。
- Transactions Table 正確。
- Foreign Key 正確。
- Integrity Check：ok。
- Foreign Key Check：無違規。
- 八個預設分類存在。

### 4.28 學習成果

- SQLite。
- Relational Database。
- SQL Schema。
- Primary Key。
- Foreign Key。
- Referential Integrity。
- 資料持久化。
- Git 忽略規則。

### 4.29 Git 紀錄

Commit：

`eacbbb8`

Commit Message：

`feat: initialize SQLite database and verify schema`

狀態：已提交 GitHub。

---

## 2026-11-09｜Milestone 06：分類查詢 API

### 4.30 開發目標

讓 Express 從 SQLite 取得交易分類資料。

### 4.31 功能實作

Endpoint：

`GET /api/categories`

使用 SQL SELECT：

- 查詢 categories。
- 依 id 排序。
- 回傳分類 ID、名稱及收支類型。

JSON 回應包含：

- success。
- count。
- data。

### 4.32 測試結果

實際回傳：

- success：true。
- count：8。
- data：八個分類。

已確認：

- 收入分類三個。
- 支出分類五個。
- 分類名稱正確。
- 分類類型正確。
- Health API 仍正常運作。

### 4.33 學習成果

- SQL SELECT。
- SQL ORDER BY。
- JSON 陣列。
- Express GET API。
- 資料庫查詢結果轉換。

### 4.34 Git 紀錄

Commit：

`703b3f6`

Commit Message：

`feat: add SQLite categories API`

狀態：已提交 GitHub。

---

## 2026-11-09｜Milestone 07：GET 與 POST 交易 API

### 4.35 開發目標

建立交易的查詢與新增功能。

### 4.36 GET 交易查詢

Endpoint：

`GET /api/transactions`

使用 SQL INNER JOIN：

- transactions。
- categories。

查詢欄位：

- id。
- category_id。
- category_name。
- type。
- amount。
- transaction_date。
- note。
- created_at。

排序方式：

1. transaction_date DESC。
2. id DESC。

回應包含：

- success。
- count。
- data。

無資料時可以正常回傳：

```json
{
  "success": true,
  "count": 0,
  "data": []
}
```

### 4.37 POST 新增交易

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

功能：

- 驗證 Request Body。
- 驗證分類。
- 驗證金額。
- 驗證日期。
- 驗證備註。
- 使用 SQL INSERT。
- 取得新交易 ID。
- 查詢新增的交易。
- 回傳完整交易資料。

### 4.38 正向測試

新增資料：

- 分類：餐飲。
- 金額：NT$120。
- 日期：2026-11-09。
- 備註：Lunch test。

結果：

- HTTP 201。
- success：true。
- 新交易 ID：1。
- GET 可查詢到交易。
- SQLite 成功保存資料。

### 4.39 負向測試

已執行：

1. 負數金額。
2. 不存在的分類。
3. 不存在的日期。
4. 零元金額。
5. 小數金額。
6. 超長備註。

加上正常新增案例，共七項既定案例。

結果：

- 正常新增成功。
- 六項不合法輸入遭拒絕。
- 對應非法輸入回傳 HTTP 400。
- 沒有因此增加其他交易。

### 4.40 資料持久化

測試程序：

1. 新增交易。
2. 使用 GET 查詢。
3. 停止伺服器。
4. 重新啟動伺服器。
5. 再次執行 GET。

實際結果：

- 重啟前 count：1。
- 重啟後 count：1。
- 原始交易保留。
- SQLite 資料持久化測試通過。

### 4.41 API 測試連線問題

曾在 PowerShell 執行 POST 請求時出現：

`無法連接至遠端伺服器`

排查發現測試當時沒有持續運作的 Express 伺服器可供連線。

改善方式：

- 使用一個終端機啟動 Express。
- 使用另一個終端機執行 API 測試。
- 先透過 Health API 驗證連線。

### 4.42 開發文件建立

新增：

- CHANGELOG.md。
- docs/DEVELOPMENT_LOG.md。
- docs/TESTING.md。

建立產品功能、開發歷程及測試結果的分層紀錄方式。

### 4.43 學習成果

- GET 與 POST。
- SQL INNER JOIN。
- SQL INSERT。
- HTTP 201。
- HTTP 400。
- SQL 參數化。
- 輸入驗證。
- 資料持久化。
- PowerShell API 測試。
- 技術文件撰寫。

### 4.44 Git 紀錄

Commit：

`8c5b850`

Commit Message：

`feat: add transaction APIs and development documentation`

狀態：已提交 GitHub。

---

## 2026-11-09｜Milestone 08：PUT 修改交易 API

### 4.45 開發目標

讓 Money Tracker 可以直接修改 SQLite 既有交易，不需要先刪除再新增。

### 4.46 API 設計

HTTP Method：

`PUT`

Endpoint：

`/api/transactions/:id`

功能：

- 修改交易分類。
- 修改交易金額。
- 修改交易日期。
- 修改交易備註。

目前採用完整欄位更新。

### 4.47 Request Body

有效資料：

```json
{
  "category_id": 4,
  "amount": 150,
  "transaction_date": "2026-11-09",
  "note": "Updated lunch test"
}
```

必要欄位：

- category_id。
- amount。
- transaction_date。

note 可以省略，省略時更新為空字串。

如果未來需要部分欄位更新，可另外考慮 PATCH API。

### 4.48 功能實作

- 驗證交易 ID。
- 驗證 Request Body。
- 驗證分類。
- 驗證金額。
- 驗證日期。
- 驗證備註。
- 確認交易存在。
- 確認分類存在。
- 使用 SQL UPDATE。
- 重新查詢更新後交易。
- 回傳完整 JSON。

成功回傳：

HTTP 200。

不存在交易：

HTTP 404。

不合法資料：

HTTP 400。

### 4.49 正向測試

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
- amount 成功更新為 150。
- note 成功更新。
- ID 維持 1。
- created_at 不變。
- count 維持 1。

### 4.50 負向測試

已執行：

1. 不存在的交易 ID。
2. 金額為零。
3. 金額為小數。
4. 不存在的分類。
5. 不存在的日期。
6. 超過 500 長度單位的備註。

加上正常更新，共七項既定測試。

結果：

- 不存在交易：HTTP 404。
- 五項不合法資料：HTTP 400。
- 正常更新：HTTP 200。

### 4.51 資料完整性驗證

完成負向測試後，再次執行：

`GET /api/transactions`

確認：

- success：true。
- count：1。
- id：1。
- category_id：4。
- amount：150。
- note：Updated lunch test。

確認不合法 PUT 請求沒有修改既有測試資料。

### 4.52 PUT API 初次路由問題

初次執行：

`PUT /api/transactions/1`

Express 回傳：

`Cannot PUT /api/transactions/1`

當時 server.js 已存在 PUT 路由，且基本 JavaScript 語法檢查通過。

### 4.53 Port 3000 程序檢查

使用：

`Get-NetTCPConnection`

確認 Port 3000 有 Node.js 程序。

排錯當時的資料：

- PID：9440。
- Process：node.exe。
- CommandLine：node server/server.js。

### 4.54 Port 3001 對照測試

暫時設定：

`$env:PORT = "3001"`

再啟動 Express。

結果：

- Health API 成功。
- PUT API 成功。
- GET API 成功。
- 更新後資料正確。

此結果表示在另一個 Port 啟動的新版程式可正常提供 PUT 功能。

### 4.55 修復方式

停止占用 Port 3000 的已確認舊程序。

停止不需要的 Port 3001 測試伺服器。

重新啟動 Port 3000。

再次測試：

- Health API。
- GET Transactions。
- PUT Transactions。

結果均符合預期。

### 4.56 可能原因

原有 Port 3000 的 Node.js 程序可能仍使用尚未載入 PUT 路由的舊程式版本。

這是根據排查結果推定，未直接檢查舊程序記憶體內容。

### 4.57 其他終端機問題

曾將伺服器輸出：

`Money Tracker server running at http://localhost:3001`

直接輸入 PowerShell。

結果出現：

`CommandNotFoundException`

原因：

這是程式執行後顯示的資訊，不是 PowerShell 指令。

學習到必須區分：

- 需要輸入的指令。
- 執行後自動顯示的輸出。

### 4.58 學習成果

- HTTP PUT。
- SQL UPDATE。
- 完整更新。
- HTTP 400 與 404。
- 交易資料完整性。
- Port 監聽。
- Node.js 程序管理。
- 舊程序與新程式碼差異。
- API 負向測試。
- Git 里程碑保存。

### 4.59 Git 紀錄

Commit：

`5b3486b`

Commit Message：

`feat: implement PUT transaction API and document tests`

已完成：

- server/server.js 更新。
- CHANGELOG.md 更新。
- DEVELOPMENT_LOG.md 更新。
- TESTING.md 更新。
- Git Commit。
- Git Push。

狀態：已提交 GitHub。

---

## 2026-11-09～2026-11-10｜Milestone 09：DELETE 刪除交易 API

### 4.60 開發目標

完成交易資料的 DELETE 操作，讓後端具備基本 CRUD 能力。

要求：

- 刪除指定交易。
- 不合法 ID 應拒絕。
- 不存在交易應回傳 404。
- 刪除後其他交易保持完整。
- 資料庫結構不受破壞。

### 4.61 API 設計

HTTP Method：

`DELETE`

Endpoint：

`/api/transactions/:id`

實作檔案：

`server/server.js`

不需要 Request Body。

由 URL 指定交易 ID。

### 4.62 功能實作

新增 Express DELETE 路由。

主要處理：

1. 取得交易 ID。
2. 驗證正整數 ID。
3. 確認交易存在。
4. 使用 SQL DELETE。
5. 確認操作結果。
6. 回傳 JSON。
7. 處理不合法 ID。
8. 處理不存在交易。
9. 捕捉資料庫操作例外。

不修改既有資料表結構。

不修改八個預設分類。

### 4.63 回應規格

正常刪除：

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

不合法 ID：

HTTP 400。

```json
{
  "success": false,
  "message": "Invalid transaction ID"
}
```

不存在交易：

HTTP 404。

```json
{
  "success": false,
  "message": "Transaction not found"
}
```

資料庫故障回應雖有對應程式處理機制，但尚未進行故障注入測試。

### 4.64 初次測試問題

第一次執行：

`DELETE /api/transactions/abc`

伺服器回傳：

HTTP 404。

內容：

`Cannot DELETE /api/transactions/abc`

Content-Type：

`text/html`

這代表請求未匹配到預期的 DELETE 路由，而不是 API 自行回傳的 ID 驗證錯誤。

### 4.65 原始碼檢查

透過 PowerShell 搜尋：

`app.delete()`

確認當時的本機檔案：

- app.delete 位於第 405 行。
- app.listen 位於第 456 行。
- DELETE 路由位於 app.listen 前。

執行：

`node --check server/server.js`

沒有出現基本語法錯誤。

因此需要進一步確認執行中的伺服器程序。

### 4.66 Port 監聽檢查

使用：

`Get-NetTCPConnection`

確認 Port 3000 與 3001。

排錯當時：

| Port | PID   | 程序     |
| ---- | ----- | -------- |
| 3000 | 13460 | node.exe |
| 3001 | 14724 | node.exe |

CommandLine 均顯示：

`node server/server.js`

當時記錄的程序啟動時間：

- Port 3000：2026-11-09 23:23:55。
- Port 3001：2026-11-09 23:14:11。

上述資訊是該次排錯的歷史紀錄，不應直接用作未來停止程序的固定 PID。

### 4.67 排除舊程序

確認 PID 後，執行：

`Stop-Process -Id 13460,14724`

再次檢查 Port。

當時 Port 3000、3001 已無對應的監聽程序。

停止程序後立即發送 HTTP 請求，曾出現：

`curl: (7) Failed to connect`

這是合理的連線失敗結果，因為目標 Port 當時沒有可提供服務的 Express 程序。

### 4.68 重新啟動伺服器

回到專案：

`cd C:\Projects\Money-Tracker`

清除測試時的 PORT 變數：

`Remove-Item Env:PORT -ErrorAction SilentlyContinue`

啟動：

`npm start`

輸出：

`Money Tracker server running at http://localhost:3000`

重新執行 DELETE API 測試。

結果：

- DELETE 路由成功識別。
- 不合法 ID 正確回傳 HTTP 400。
- 回應格式為 JSON。

### 4.69 可能原因

根據程序監聽狀態與重新啟動後的測試結果，推定舊版 Node.js 程序仍在執行，造成請求未連接到已載入 DELETE 路由的新版伺服器。

這是排查推論，未直接檢驗舊程序記憶體中的路由。

### 4.70 DELETE-01：不合法 ID

請求：

`DELETE /api/transactions/abc`

實際結果：

- HTTP 400。
- success：false。
- message：Invalid transaction ID。

狀態：PASS。

### 4.71 建立專用測試交易

為避免誤刪原有 ID 1 交易，先透過 POST API 新增獨立測試資料。

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

- success：true。
- 新交易 ID：2。
- 分類：餐飲。
- 類型：expense。
- 金額：123。
- 日期：2026-11-10。
- 備註：DELETE API temporary test。
- 建立時間：2026-11-09 16:29:38。

### 4.72 刪除前查詢

使用：

`GET /api/transactions`

確認兩筆交易：

| ID  | 分類 | 金額 | 備註                      |
| --- | ---- | ---: | ------------------------- |
| 2   | 餐飲 |  123 | DELETE API temporary test |
| 1   | 餐飲 |  150 | Updated lunch test        |

當時：

`count = 2`

### 4.73 DELETE-02：正常刪除

發送：

`DELETE /api/transactions/2`

實際結果：

- HTTP 200。
- success：true。
- Transaction deleted successfully。
- data.id：2。

狀態：PASS。

### 4.74 DELETE-03：刪除後資料驗證

再次執行 GET。

實際結果：

- success：true。
- count：1。
- 剩餘 ID：1。
- category_id：4。
- category_name：餐飲。
- amount：150。
- transaction_date：2026-11-09。
- note：Updated lunch test。
- created_at：2026-11-09 13:40:14。

確認：

1. 交易數量從 2 減少為 1。
2. ID 2 不再出現。
3. ID 1 仍然存在。
4. ID 1 金額不變。
5. ID 1 備註不變。
6. ID 1 建立時間不變。

PowerShell 輸出：

`PASS: DELETE API data integrity verified`

狀態：PASS。

### 4.75 DELETE-04：重複刪除

再次執行：

`DELETE /api/transactions/2`

實際結果：

- HTTP 404。
- success：false。
- message：Transaction not found。

狀態：PASS。

### 4.76 DELETE-05：資料庫完整性

執行：

`node server/check-db.js`

檢查：

- Categories Table。
- Transactions Table。
- Primary Key。
- Foreign Key。
- Integrity Check。
- Foreign Key Check。
- Default Categories。

實際結果：

Integrity Check：

`ok`

Foreign Key Check：

`No foreign key violations`

八個預設分類保持完整。

狀態：PASS。

### 4.77 DELETE 測試總結

| Test ID   | 測試項目           | 結果 |
| --------- | ------------------ | ---- |
| DELETE-01 | 非法 ID            | PASS |
| DELETE-02 | 正常刪除           | PASS |
| DELETE-03 | 刪除後資料驗證     | PASS |
| DELETE-04 | 重複刪除不存在交易 | PASS |
| DELETE-05 | SQLite 完整性檢查  | PASS |

主要案例：

- 執行：5。
- 通過：5。
- 失敗：0。

本階段通過五項主要驗證，不代表所有可能的邊界與異常情境都已測試。

### 4.78 已知限制

尚未完成：

- ID 為 0 的測試。
- 負數 ID 測試。
- 小數 ID 測試。
- 超大整數 ID 測試。
- 特殊 URL 輸入測試。
- 資料庫故障測試。
- 完整 CRUD 回歸測試。
- 自動化測試套件。
- 前端 DELETE 操作。
- 整體系統驗收。

### 4.79 學習成果

- REST DELETE Method。
- SQL DELETE。
- CRUD 完整流程。
- URL Path Parameter。
- HTTP 200、400、404。
- Express Routing。
- Express 預設 404。
- 自訂 JSON 錯誤回應。
- Node.js Process。
- PID 與 Port。
- 伺服器版本與程序載入。
- PowerShell HTTP 測試。
- 專用測試資料設計。
- 刪除後資料完整性驗證。
- SQLite Integrity Check。
- Foreign Key Check。
- Debugging 紀錄。

### 4.80 本階段狀態

已完成：

- DELETE API 本機實作。
- 正常刪除測試。
- 無效 ID 測試。
- 不存在交易測試。
- 刪除後資料驗證。
- SQLite 完整性檢查。
- 外鍵檢查。
- 預設分類確認。

尚待：

- 三份文件最終同步。
- Git Diff 檢查。
- Git Commit。
- Git Push。
- 確認遠端 main。
- 確認 Working Tree Clean。

目前沒有本階段的 Commit SHA。

不得將未完成的 GitHub 提交視為已完成。

---

# 五、目前系統完成狀態

更新日期：2026-11-10

| 功能                     | 狀態                  |
| ------------------------ | --------------------- |
| 本機專案初始化           | 完成                  |
| Git Repository           | 完成                  |
| GitHub Repository        | 完成                  |
| Express Server           | 完成                  |
| Health API               | PASS                  |
| HTML 首頁                | 完成                  |
| CSS 深色主題             | 完成                  |
| Dashboard 靜態版面       | 完成                  |
| 最近交易表格靜態版面     | 完成                  |
| SQLite 資料庫            | 完成                  |
| Categories 資料表        | 完成                  |
| Transactions 資料表      | 完成                  |
| 八個預設分類             | 完成                  |
| GET Categories API       | PASS                  |
| GET Transactions API     | PASS                  |
| POST Transactions API    | 基本測試通過          |
| PUT Transactions API     | 基本測試通過、已 Push |
| DELETE Transactions API  | 主要測試通過、待 Push |
| SQLite Integrity Check   | PASS                  |
| SQLite Foreign Key Check | PASS                  |
| 基本後端 CRUD            | 已實作                |
| 全面 CRUD 回歸測試       | 尚未完成              |
| 前端新增表單             | 尚未完成              |
| 前端編輯功能             | 尚未完成              |
| 前端刪除功能             | 尚未完成              |
| 前端 API 串接            | 尚未完成              |
| Dashboard 動態統計       | 尚未完成              |
| 日期與分類篩選           | 尚未完成              |
| 財務圖表分析             | 尚未完成              |
| CSV 資料匯出             | 尚未完成              |
| 完整自動化測試           | 尚未完成              |
| 完整系統驗收             | 尚未完成              |
| GitHub 正式 Release      | 尚未發布              |

目前已具備交易資料的基本後端 CRUD 操作能力。

但尚未完成使用者可直接操作的完整財務管理系統。

---

# 六、主要開發問題與排除紀錄

## 6.1 VS Code Workspace 管理

問題：

Money Tracker 曾出現在與既有 Workspace 不同的 VS Code 視窗。

處理：

將專案加入既有多根目錄工作區。

學習：

Workspace 與實際檔案位置為不同概念。

## 6.2 API 無法連線

問題：

PowerShell 顯示無法連接至遠端伺服器。

可能情況：

- 伺服器沒有啟動。
- 伺服器已停止。
- 目標 Port 不正確。

處理：

- 確認 npm start。
- 確認目標 Port。
- 使用 Health API。
- 分開使用伺服器終端機與測試終端機。

## 6.3 PUT API 路由不匹配

問題：

`Cannot PUT /api/transactions/1`

處理：

- 檢查 app.put。
- 檢查 JavaScript 語法。
- 檢查 Port 3000。
- 使用 Port 3001 對照測試。
- 停止舊程序。
- 重新啟動伺服器。

結果：

PUT API 成功。

## 6.4 DELETE API 路由不匹配

問題：

`Cannot DELETE /api/transactions/abc`

處理：

- 檢查 app.delete。
- 檢查 app.listen 位置。
- 檢查 JavaScript 語法。
- 檢查 Port 3000 與 3001。
- 檢查 Node.js 程序。
- 停止已確認的舊程序。
- 重新啟動伺服器。

結果：

DELETE API 成功。

## 6.5 HTTP 404 與連線失敗

HTTP 404：

伺服器成功回應，但指定資源或路由未成功匹配，或 API 主動回傳資源不存在。

Connection Failed：

客戶端無法與目標伺服器建立連線。

因此：

`Cannot DELETE`

與：

`curl: (7) Failed to connect`

不代表同一個問題。

## 6.6 PowerShell 輸出誤當指令

問題：

把：

`Money Tracker server running at http://localhost:3001`

當成 PowerShell 指令輸入。

結果：

CommandNotFoundException。

學習：

程式輸出與使用者應輸入的指令必須區分。

---

# 七、版本控制與 GitHub

## 7.1 已確認的重要 Commit

| Milestone | Commit  | 說明                          |
| --------- | ------- | ----------------------------- |
| 01        | 1798256 | 專案初始化                    |
| 02        | 23e6afe | Express 與 Health API         |
| 03        | fe6cd52 | 前端首頁                      |
| 04        | d654756 | Dashboard 靜態版面            |
| 05        | eacbbb8 | SQLite 初始化                 |
| 06        | 703b3f6 | Categories API                |
| 07        | 8c5b850 | Transactions GET、POST 與文件 |
| 08        | 5b3486b | Transactions PUT 與測試紀錄   |

Milestone 09：

- DELETE API。
- 本機實作與主要測試完成。
- Commit：待執行。
- Push：待執行。

## 7.2 Git 開發流程

每次完成一項重要功能：

1. 修改程式碼。
2. 儲存檔案。
3. 執行語法檢查。
4. 執行正向測試。
5. 執行負向測試。
6. 檢查資料完整性。
7. 更新文件。
8. 執行 git status。
9. 執行 git diff --check。
10. 確認修改範圍。
11. 使用 git add。
12. 使用 git commit。
13. 使用 git push。
14. 再次執行 git status。
15. 確認 GitHub 顯示最新 Commit。

## 7.3 GitHub 文件管理

| 文件                    | 用途                     |
| ----------------------- | ------------------------ |
| README.md               | 專案介紹與執行說明       |
| CHANGELOG.md            | 功能新增與版本更新       |
| docs/DEVELOPMENT_LOG.md | 開發歷程與技術決策       |
| docs/TESTING.md         | 測試案例、輸入與實際結果 |

## 7.4 Commit 原則

- 每次 Commit 應具有清楚目的。
- Commit Message 應能反映實際修改。
- 不將未完成功能宣稱為完成。
- 不將未測試功能宣稱為 PASS。
- 避免上傳個人財務資料。
- 不任意覆蓋歷史紀錄。
- 重要排錯應留下追溯資料。

---

# 八、後續開發規劃

## Milestone 10｜前端 CRUD 整合

目前狀態：

尚未開始正式實作。

規劃：

- 建立新增交易表單。
- 建立修改交易介面。
- 建立刪除交易按鈕。
- 增加刪除確認機制。
- 使用 Fetch API。
- 串接 GET。
- 串接 POST。
- 串接 PUT。
- 串接 DELETE。
- 動態更新交易清單。
- 增加載入提示。
- 增加操作成功提示。
- 增加操作失敗提示。
- 前端基本輸入驗證。
- 驗證交易清單與 SQLite 一致性。

## Milestone 11｜Dashboard 動態整合

規劃：

- 從後端讀取交易。
- 計算本月收入。
- 計算本月支出。
- 計算收支淨額。
- 顯示最近交易。
- 使用新交易更新摘要。
- 修改交易後重新計算。
- 刪除交易後重新計算。
- 處理沒有資料的情況。
- 處理 API 載入失敗。
- 驗證前端數字與資料庫一致。

## Milestone 12｜財務分析與資料匯出

規劃：

- 日期區間篩選。
- 分類篩選。
- 收入及支出條件查詢。
- 月度統計。
- 年度統計。
- SQL GROUP BY。
- SQL SUM。
- 支出分類占比。
- 財務趨勢圖表。
- CSV 匯出。
- CSV 中文編碼測試。
- 匯出資料正確性檢查。

## Milestone 13｜完整測試與發布

規劃：

- CRUD 完整回歸測試。
- API 邊界測試。
- 異常 Request Body 測試。
- 資料庫故障處理測試。
- 前後端整合測試。
- Dashboard 統計驗證。
- 行動裝置版面檢查。
- 使用者操作流程驗證。
- README 整理。
- CHANGELOG 整理。
- DEVELOPMENT_LOG 整理。
- TESTING 整理。
- 建立 Git Tag。
- 發布正式 GitHub Release。

所有規劃事項都必須在完成及實際驗證後才能更改狀態。

---

# 九、開發與文件維護原則

## 9.1 持續累積

本日誌採取持續累積方式。

未來每次新增功能時：

- 保留已完成的歷史里程碑。
- 新增後續開發階段。
- 更新目前系統狀態。
- 更新 Git 紀錄。
- 更新已知限制。
- 更新下一階段規劃。

## 9.2 測試真實性

只將實際通過的測試標示為 PASS。

尚未執行的測試應標示 NOT RUN。

測試失敗應保留問題與修復紀錄。

不能把預期結果當成實際結果。

不能將基本功能測試等同於完整系統驗收。

## 9.3 資料安全

- 不公開提交 money-tracker.db。
- 避免上傳真實個人財務資料。
- 保留 .gitignore。
- 避免測試誤刪既有資料。
- 刪除測試應使用專用測試紀錄。
- 重要資料應規劃備份機制。

## 9.4 文件一致性

以下四份文件應保持一致：

1. README.md。
2. CHANGELOG.md。
3. DEVELOPMENT_LOG.md。
4. TESTING.md。

當功能狀態變更時，需要檢查：

- 功能是否已實作。
- 測試是否已執行。
- 是否已提交 Git。
- 是否已推送 GitHub。
- 是否已正式發布。

這五種狀態不應混為一談。

## 9.5 開發紀錄完整性

重要開發階段應記錄：

- 開發日期。
- 功能名稱。
- 開發目標。
- API Endpoint。
- 主要程式檔案。
- 實作方式。
- 測試案例。
- 實際結果。
- 發現的問題。
- 排錯方式。
- 已知限制。
- Commit SHA。
- GitHub 同步狀態。
- 後續工作。

尚未取得的資訊，不應自行編造。

---

# 十、目前總結

截至 2026-11-10，Money Tracker 已完成：

1. 本機開發環境。
2. Git 與 GitHub Repository。
3. Node.js 與 Express 後端。
4. 靜態前端首頁。
5. Dashboard 基本版面。
6. SQLite 資料庫。
7. Categories 資料表。
8. Transactions 資料表。
9. 八個預設分類。
10. Health API。
11. GET Categories API。
12. GET Transactions API。
13. POST Transactions API。
14. PUT Transactions API。
15. DELETE Transactions API。
16. 基本交易資料驗證。
17. POST 資料持久化驗證。
18. PUT 修改後資料完整性驗證。
19. DELETE 刪除後資料完整性驗證。
20. SQLite 完整性與外鍵檢查。
21. 開發日誌及測試文件架構。

目前尚未完成：

- 完整前端 CRUD。
- Dashboard 動態資料。
- 財務統計。
- 篩選。
- CSV 匯出。
- 完整自動化測試。
- 整體系統驗收。

Milestone 08：

已提交 GitHub，Commit 為 `5b3486b`。

Milestone 09：

後端功能與五項主要測試已完成，尚待完成本階段文件檢查、Git Commit 與 GitHub Push。

本文件後續將隨 Money Tracker 的實際開發進度持續更新，不刪除已完成的重要歷史紀錄。
