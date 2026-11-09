# Money Tracker｜開發日誌（DEVELOPMENT LOG）

本文件詳細記錄 Money Tracker 個人財務管理系統的開發過程、技術決策、功能實作、測試驗證、問題排除與學習成果。

## 一、專案基本資訊

- 專案名稱：Money Tracker
- 專案類型：個人財務管理網頁系統
- 開發模式：本機單人全端開發
- 作業系統：Windows
- 開發工具：Visual Studio Code
- 前端技術：HTML、CSS、JavaScript
- 後端技術：Node.js、Express
- 資料庫：SQLite
- API 架構：REST API
- 版本控制：Git、GitHub
- 本機專案路徑：C:\Projects\Money-Tracker
- GitHub Repository：https://github.com/Chiou-Jiakang/Money-Tracker
- 開始日期：2026-11-09

## 二、專案開發目標

建立一套可在本機執行的個人財務管理系統，讓使用者記錄、管理、查詢及分析個人收入與支出。

本專案不僅重視功能實作，也強調理解各項技術的實際運作原理。

### 核心學習目標

1. 理解前端、後端與資料庫的分工。
2. 學習使用 Express 建立 REST API。
3. 學習 SQL CRUD 與關聯式資料庫設計。
4. 理解資料驗證、錯誤處理與 HTTP Status Code。
5. 學習前後端 API 串接。
6. 學習資料統計、篩選與匯出。
7. 建立 Git 與 GitHub 版本控制習慣。
8. 練習軟體測試與 Debugging。
9. 建立完整、可追溯的技術文件。

---

# 三、開發歷程

## 2026-11-09｜階段一：開發環境初始化

### 1. 開發目標

建立獨立且易於管理的 Money Tracker 專案，確保後續程式開發不影響其他既有專案。

### 2. 完成內容

- 建立 C:\Projects\Money-Tracker 資料夾。
- 使用 VS Code 開啟專案。
- 將 Money Tracker 加入既有的多根目錄工作區。
- 確認 Node.js、npm 與 Git 可正常使用。
- 建立 Git Repository。
- 設定 main 分支。
- 建立 GitHub 遠端 Repository。
- 設定 origin。
- 建立 README.md 與 .gitignore。
- 完成第一次 Commit 與 Push。

### 3. 環境檢查結果

- Node.js：v24.15.0
- npm：11.12.1
- Git：2.54.0.windows.1

上述版本為首次環境檢查時的結果。

### 4. Git 設定

使用 git init 初始化本機版本控制。

設定遠端 Repository：

https://github.com/Chiou-Jiakang/Money-Tracker.git

完成初始檔案提交後，使用 git push 將程式碼推送至 GitHub。

### 5. 遇到的問題

原本習慣使用 HeapGuard-Workspace 管理多個專案，但新建的 Money Tracker 曾獨立出現在另一個 VS Code 視窗。

### 6. 處理方式

將 C:\Projects\Money-Tracker 加入既有 VS Code 工作區，並保持程式實際儲存位置獨立。

### 7. 學習成果

- 理解 VS Code Workspace 與資料夾的差異。
- 理解本機 Repository 與遠端 Repository。
- 熟悉 git init、add、commit、push、status。
- 理解 Git Working Tree 與 Staging Area。
- 學習使用 Git 保留重要開發成果。

### 8. Git 紀錄

Commit：1798256

訊息：
chore: initialize Money Tracker project

---

## 2026-11-09｜階段二：Express 後端建置

### 1. 開發目標

建立可以接收 HTTP Request 並回傳 JSON Response 的 Node.js 後端伺服器。

### 2. 完成內容

- 使用 npm 初始化專案。
- 建立 package.json。
- 安裝 Express。
- 建立 package-lock.json。
- 建立 server/server.js。
- 設定 Port 3000。
- 支援透過 PORT 環境變數指定連接埠。
- 加入 express.json() Middleware。
- 建立 GET /api/health。
- 設定 npm start 啟動方式。

### 3. Health API

Endpoint：

GET /api/health

預期回應：

{
"status": "ok",
"message": "Money Tracker API is running"
}

### 4. 測試方式

啟動伺服器：

npm start

在瀏覽器或 PowerShell 開啟：

http://localhost:3000/api/health

### 5. 測試結果

- Express 伺服器成功啟動。
- HTTP 服務正常。
- Health API 正常回應。
- JSON 格式正確。
- 狀態為 ok。

### 6. 學習成果

- 理解 Node.js 的執行方式。
- 理解 Express 的路由機制。
- 理解 Request 與 Response。
- 理解 API Endpoint 的概念。
- 學習以 JSON 傳遞資料。

### 7. Git 紀錄

Commit：23e6afe

訊息：
feat: set up Express server and health API

---

## 2026-11-09｜階段三：前端首頁建置

### 1. 開發目標

建立 Money Tracker 的基本使用者介面，並讓 Express 提供前端靜態檔案。

### 2. 完成內容

- 建立 public/index.html。
- 建立 public/style.css。
- 使用 HTML 建立語意化網頁結構。
- 使用 CSS 建立深色主題。
- 設計 Money Tracker 頁面標題。
- 建立財務總覽區塊。
- 透過 Express 提供靜態網頁。
- 完成基本前後端整合。

### 3. 頁面設計

主要採用深色背景，搭配較淺的內容卡片，強調財務資訊的可讀性。

### 4. 測試結果

- localhost:3000 成功顯示網頁。
- CSS 正常載入。
- 主要文字及版面顯示正常。
- 桌面版瀏覽器可以正常使用。

### 5. 學習成果

- 理解 HTML 與 CSS 的分工。
- 理解靜態檔案與伺服器的關係。
- 學習 Express Static Middleware。
- 理解網頁開發的基本結構。

### 6. Git 紀錄

Commit：fe6cd52

訊息：
feat: add styled frontend homepage

---

## 2026-11-09｜階段四：Dashboard 版面設計

### 1. 開發目標

建立可以呈現收入、支出、淨額及最近交易紀錄的基本 Dashboard 介面。

### 2. 完成內容

建立三張財務摘要卡片：

- 本月總收入
- 本月總支出
- 本月收支淨額

新增最近交易表格：

- 日期
- 類型
- 分類
- 金額
- 備註

其他內容：

- 建立空資料狀態。
- 調整卡片排列。
- 改善 Dashboard 的視覺層次。
- 保留日後串接動態資料的位置。

### 3. 測試結果

- 三張摘要卡片正常顯示。
- 最近交易表格正常顯示。
- 空資料提示正常顯示。
- 深色版面與 CSS 正常運作。

### 4. 階段限制

目前 Dashboard 仍屬於靜態版面。

尚未從 SQLite 動態計算：

- 本月收入
- 本月支出
- 本月收支淨額
- 最近交易資料

### 5. 學習成果

- 學習 Dashboard 資訊架構。
- 理解財務摘要資訊的呈現方式。
- 學習規劃前端資料顯示區域。
- 為後續 API 串接建立基本介面。

### 6. Git 紀錄

Commit：d654756

訊息：
feat: add dashboard summary and recent transactions layout

---

## 2026-11-09｜階段五：SQLite 資料庫建置

### 1. 開發目標

建立能永久保存分類與交易紀錄的關聯式資料庫。

### 2. 技術選擇

使用 Node.js 內建 node:sqlite 模組及 DatabaseSync。

資料庫位置：

data/money-tracker.db

### 3. Categories 資料表

主要欄位：

- id：INTEGER，Primary Key
- name：TEXT，NOT NULL
- type：TEXT，NOT NULL

用途：

保存交易分類及其收入或支出類型。

### 4. Transactions 資料表

主要欄位：

- id：INTEGER，Primary Key
- category_id：INTEGER，Foreign Key
- amount：INTEGER，NOT NULL
- transaction_date：TEXT，NOT NULL
- note：TEXT
- created_at：TEXT，預設 CURRENT_TIMESTAMP

用途：

保存每筆收入或支出交易。

### 5. 關聯式資料庫設計

transactions.category_id 參照 categories.id。

使用 Foreign Key 保護資料表之間的關聯。

目前外鍵結構的刪除行為為 RESTRICT。

### 6. 預設交易分類

收入類型：

1. 薪資
2. 獎金
3. 其他收入

支出類型：

4. 餐飲
5. 交通
6. 購物
7. 娛樂
8. 其他支出

共八個預設分類。

### 7. 建立資料庫管理程式

server/init-db.js：

- 初始化資料庫。
- 建立資料表。
- 建立預設分類。
- 顯示初始化結果。

server/check-db.js：

- 檢查資料表結構。
- 檢查 Foreign Key。
- 執行 Integrity Check。
- 查詢預設分類。

### 8. 資料庫測試結果

- 初始化成功。
- 八個分類成功建立。
- 初始交易筆數為 0。
- PRAGMA integrity_check：ok。
- PRAGMA foreign_key_check：無違規。
- 資料表結構符合預期。
- .db 檔案受到 .gitignore 排除。

### 9. 學習成果

- 理解 SQL 資料型態。
- 理解 Primary Key 與 Foreign Key。
- 理解關聯式資料庫。
- 理解資料完整性。
- 學習透過 SQL 檢查資料庫結構。
- 學習將使用者資料排除於 Git 之外。

### 10. Git 紀錄

Commit：eacbbb8

訊息：
feat: initialize SQLite database and verify schema

---

## 2026-11-09｜階段六：分類查詢 API

### 1. 開發目標

讓 Express 可以從 SQLite 取得交易分類。

### 2. 完成內容

Endpoint：

GET /api/categories

使用 SQL SELECT 查詢 categories 資料表。

回傳：

- success
- count
- data

### 3. 測試結果

- API 成功回應。
- success 為 true。
- count 為 8。
- 八個分類資料完整。
- 分類名稱與收支類型正確。

### 4. 學習成果

- 理解 SQL SELECT。
- 理解資料庫查詢與 API 回應。
- 學習將 SQL 查詢結果轉換為 JSON。

### 5. Git 紀錄

Commit：703b3f6

訊息：
feat: add SQLite categories API

---

## 2026-11-09｜階段七：GET 與 POST 交易 API

### 1. 開發目標

建立交易資料的查詢與新增功能，並加入完整的基本輸入驗證。

### 2. GET 交易查詢 API

Endpoint：

GET /api/transactions

功能：

- 查詢所有交易。
- 使用 SQL INNER JOIN 連結分類資料。
- 回傳分類名稱與收支類型。
- 依日期及交易 ID 排序。
- 回傳交易筆數與資料陣列。

### 3. POST 新增交易 API

Endpoint：

POST /api/transactions

Request Body 包含：

- category_id
- amount
- transaction_date
- note

功能：

- 驗證輸入資料。
- 確認分類存在。
- 使用 SQL INSERT 新增交易。
- 回傳新建立的交易資料。
- 正常新增回傳 HTTP 201。

### 4. 輸入驗證

金額：

- 必須是正整數。
- 不接受負數、零或小數。

分類：

- 必須是有效的正整數 ID。
- 分類必須存在。

日期：

- 格式為 YYYY-MM-DD。
- 日期必須真實存在。

備註：

- 必須是字串。
- 長度不得超過 500。

### 5. 正向測試

新增測試交易：

- 分類：餐飲
- 金額：NT$120
- 日期：2026-11-09
- 備註：Lunch test

實際結果：

- 新增成功。
- 交易 ID 為 1。
- GET API 查詢成功。
- 資料寫入 SQLite。

### 6. 負向測試

已完成：

- 負數金額。
- 零元金額。
- 小數金額。
- 不存在的分類。
- 不存在的日期。
- 超過 500 字元的備註。

結果：

- 非法輸入均回傳 HTTP 400。
- 錯誤訊息符合預期。
- 非法輸入沒有新增資料。

### 7. 資料持久化測試

測試方式：

1. 新增交易。
2. 查詢交易。
3. 停止伺服器。
4. 重新啟動伺服器。
5. 再次查詢交易。

結果：

交易筆數仍為 1，資料沒有遺失。

### 8. 遇到的問題

第一次使用 PowerShell 執行 POST 測試時，曾出現無法連接至遠端伺服器的錯誤。

### 9. 原因與處理方式

測試當時 Express 沒有持續提供服務。

改為：

- 一個終端機持續執行 npm start。
- 另一個終端機負責 API 測試。

完成調整後，POST API 成功運作。

### 10. 新增開發文件

- CHANGELOG.md
- docs/DEVELOPMENT_LOG.md
- docs/TESTING.md

開始建立可追溯的開發與測試紀錄。

### 11. 學習成果

- 理解 GET 與 POST 的差異。
- 理解 SQL INSERT。
- 理解 SQL JOIN。
- 理解 HTTP 201 與 HTTP 400。
- 理解資料持久化。
- 學習使用 PowerShell 測試 API。
- 學習撰寫測試及開發文件。

### 12. Git 紀錄

Commit：8c5b850

訊息：
feat: add transaction APIs and development documentation

---

## 2026-11-09｜階段八：PUT 修改交易 API

### 1. 開發目標

讓使用者可以修改 SQLite 中既有的交易資料，而不需要刪除後重新建立。

### 2. API 設計

HTTP Method：

PUT

Endpoint：

/api/transactions/:id

其中 :id 代表指定的交易 ID。

### 3. 完成內容

- 新增 PUT API 路由。
- 驗證交易 ID。
- 確認交易存在。
- 驗證分類 ID。
- 確認分類存在。
- 驗證金額。
- 驗證交易日期。
- 驗證交易備註。
- 使用 SQL UPDATE 修改資料。
- 修改成功後重新查詢資料。
- 回傳更新後的交易資訊。

### 4. 資料更新策略

目前 PUT API 採用完整欄位更新。

請求中須提供：

- category_id
- amount
- transaction_date

note 可以省略，但省略時會更新為空字串。

未來若需要只修改部分欄位，可另外設計 PATCH API。

### 5. SQL 操作

透過 UPDATE transactions 修改：

- category_id
- amount
- transaction_date
- note

使用 WHERE id = ? 指定交易。

使用參數化 SQL 避免直接拼接使用者輸入。

### 6. 正向測試

修改前：

- ID：1
- category_id：4
- amount：120
- transaction_date：2026-11-09
- note：Lunch test

修改後：

- ID：1
- category_id：4
- amount：150
- transaction_date：2026-11-09
- note：Updated lunch test

實際結果：

- PUT 成功。
- success 為 true。
- 回傳 Transaction updated successfully。
- amount 更新為 150。
- note 更新成功。
- 原始交易 ID 不變。
- created_at 不變。
- 交易筆數維持 1。

### 7. 不存在交易 ID 測試

測試端點：

PUT /api/transactions/9999

實際結果：

HTTP 404

Response Message：

Transaction not found

測試通過。

### 8. 非法輸入測試

測試項目：

1. 金額為零。
2. 金額為小數。
3. 不存在的分類。
4. 不存在的日期。
5. 備註超過 500 字元。

實際結果：

上述五項均回傳 HTTP 400。

錯誤訊息均符合預期。

### 9. 資料完整性確認

完成所有負向測試後，重新執行：

GET /api/transactions

確認：

- count：1
- id：1
- category_id：4
- amount：150
- note：Updated lunch test

測試結果證明上述非法 PUT 請求沒有修改原始資料。

### 10. 遇到的問題

初次執行 PUT API 時，Express 回傳：

Cannot PUT /api/transactions/1

即使 server.js 已經加入 PUT 路由，仍然無法成功執行。

### 11. 排查步驟

首先檢查程式碼：

使用 Select-String 搜尋 app.put。

確認 PUT 路由確實存在於 server.js。

接著執行：

node --check server/server.js

JavaScript 基本語法檢查成功。

然而，PUT 請求依然回傳 Cannot PUT。

### 12. Port 3000 程序檢查

使用 PowerShell：

Get-NetTCPConnection -LocalPort 3000 -State Listen

檢查發現：

- Port：3000
- PID：9440
- Process Name：node.exe
- CommandLine：node server/server.js

PID 9440 為排錯當時的程序 ID，
並非固定或永久的設定值。

### 13. 使用 Port 3001 隔離測試

暫時設定：

$env:PORT = "3001"

重新執行：

npm start

結果：

Money Tracker server running at http://localhost:3001

接著使用 Port 3001 測試：

- Health API 成功。
- PUT API 成功。
- GET API 成功。
- 修改後資料可正常查詢。

### 14. 排除舊程序

重新確認 PID 9440 正在占用 Port 3000。

使用 Stop-Process 停止該程序。

再次檢查 Port 3000，確認已無原本的監聽程序。

停止 Port 3001 測試伺服器後，重新使用 Port 3000 啟動 Express。

### 15. 最終驗證結果

Port 3000：

- GET API 正常。
- PUT API 正常。
- 更新後交易金額為 150。
- 交易筆數維持 1。
- 所有已執行的 PUT 負向測試符合預期。

### 16. 問題原因分析

根據排查過程，最可能的原因是：

Port 3000 原有的 Node.js 程序仍在執行舊版程式碼，尚未重新載入新加入的 PUT 路由。

此原因為根據程序占用與 Port 3001 對照測試推定，並未直接檢查舊程序的記憶體內容。

### 17. 額外學習

在 PowerShell 中輸入：

Money Tracker server running at http://localhost:3001

曾導致 CommandNotFoundException。

原因是該文字為 Node.js 的輸出訊息，而不是可執行的 PowerShell 指令。

之後應明確區分：

- 使用者需要輸入的命令。
- 程式自動顯示的執行結果。

### 18. 學習成果

- 理解 HTTP PUT。
- 理解 SQL UPDATE。
- 理解完整更新與新增資料的差異。
- 理解 HTTP 400、404 的使用情境。
- 學習檢查 Port 占用。
- 學習查詢 Node.js Process。
- 學習隔離不同 Port 進行測試。
- 理解修改程式碼不代表既有程序會自動重新載入。
- 學習透過正向及負向測試驗證資料完整性。

### 19. 階段狀態

PUT API 基本功能已完成。

七項預定測試已通過。

尚待：

- 補充其他邊界測試。
- 更新相關技術文件。
- 完成第八次 Git Commit。
- 推送更新至 GitHub。

---

# 四、目前完成狀態

| 功能                    | 狀態         |
| ----------------------- | ------------ |
| 專案環境建置            | 完成         |
| GitHub Repository       | 完成         |
| Express 伺服器          | 完成         |
| Health API              | 完成         |
| 靜態前端首頁            | 完成         |
| Dashboard 靜態版面      | 完成         |
| SQLite 資料庫           | 完成         |
| 預設交易分類            | 完成         |
| GET Categories API      | 完成         |
| GET Transactions API    | 完成         |
| POST Transactions API   | 基本測試通過 |
| PUT Transactions API    | 基本測試通過 |
| DELETE Transactions API | 尚未開始     |
| 前端記帳表單            | 尚未開始     |
| 前端 API 整合           | 尚未開始     |
| 財務統計分析            | 尚未開始     |
| CSV 資料匯出            | 尚未開始     |
| 完整整合測試            | 尚未完成     |

---

# 五、下一階段開發規劃

## 階段九：DELETE API

預定內容：

- 建立 DELETE /api/transactions/:id。
- 驗證交易 ID。
- 驗證交易是否存在。
- 使用 SQL DELETE 刪除交易。
- 刪除後重新查詢資料。
- 驗證交易筆數變化。
- 測試不存在交易的錯誤處理。
- 確保不會誤刪其他交易。

## 階段十：前端 CRUD 整合

預定內容：

- 新增交易表單。
- 修改交易表單。
- 刪除交易按鈕。
- 動態交易清單。
- 前端輸入驗證。
- API 錯誤提示。
- 交易操作後重新整理畫面。

## 階段十一：Dashboard 動態整合

預定內容：

- 計算本月總收入。
- 計算本月總支出。
- 計算本月收支淨額。
- 查詢最近交易。
- 將 SQLite 資料顯示於 Dashboard。
- 處理空資料及載入失敗狀態。

## 階段十二：財務分析與資料匯出

預定內容：

- 日期區間查詢。
- 分類篩選。
- 月度收支分析。
- SQL GROUP BY 聚合查詢。
- 財務趨勢圖表。
- 分類支出占比。
- CSV 匯出。

## 階段十三：測試與正式發布

預定內容：

- CRUD 完整測試。
- API 邊界測試。
- 資料庫完整性測試。
- 前後端整合測試。
- UI 與操作流程檢查。
- README 文件整理。
- CHANGELOG 更新。
- 建立正式版本標籤。
- 發布 GitHub Release。

---

# 六、開發與文件維護規範

每次完成一個開發階段，依序執行：

1. 完成功能實作。
2. 檢查程式基本語法。
3. 啟動並測試功能。
4. 執行必要的負向測試。
5. 確認既有功能沒有受到破壞。
6. 更新 CHANGELOG.md。
7. 更新 DEVELOPMENT_LOG.md。
8. 更新 TESTING.md。
9. 使用 git status 確認修改範圍。
10. 使用 git add 暫存指定檔案。
11. 使用 git commit 建立版本紀錄。
12. 使用 git push 同步 GitHub。
13. 確認 Working Tree Clean。
14. 確認 GitHub 顯示最新 Commit。

## 重要開發原則

- 不直接將未驗證功能標示為完成。
- 不將個人財務資料庫上傳公開 GitHub。
- 不因新功能開發而任意修改既有正常功能。
- 重要修改應保留可追溯的 Commit。
- 錯誤排除應記錄現象、原因、處理及驗證結果。
- 開發紀錄應持續累積，不隨意刪除歷史內容。

---

# 七、文件關聯

- README.md：專案介紹與使用方式。
- CHANGELOG.md：版本更新及主要功能變更。
- DEVELOPMENT_LOG.md：詳細開發過程與技術學習。
- TESTING.md：測試案例與驗收結果。

本文件隨 Money Tracker 專案進度持續更新。
後續開發應保留歷史紀錄並追加新階段內容。
