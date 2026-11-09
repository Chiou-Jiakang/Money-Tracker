# Money Tracker｜測試報告（TESTING REPORT）

本文件記錄 Money Tracker 個人財務管理系統的功能測試、API 驗證、資料庫完整性檢查、錯誤處理測試及相關結果。

本報告採持續累積方式維護，已通過的測試案例保留，後續新增功能時應補充新案例與測試結果。

---

# 一、測試基本資訊

## 1.1 專案資訊

- 專案名稱：Money Tracker
- 專案類型：個人財務管理系統
- 測試環境：本機開發環境
- 作業系統：Windows
- 開發工具：Visual Studio Code
- Runtime：Node.js 24
- Backend Framework：Express
- Database：SQLite
- API Base URL：http://localhost:3000
- API 測試工具：PowerShell、Microsoft Edge
- 主要測試日期：2026-11-09

## 1.2 測試範圍

目前已進行：

1. Express 伺服器測試。
2. Health API 測試。
3. Categories API 測試。
4. Transactions GET API 測試。
5. Transactions POST API 測試。
6. Transactions PUT API 測試。
7. SQLite 資料庫結構檢查。
8. 資料持久化測試。
9. 部分非法輸入及錯誤處理測試。
10. Dashboard 靜態版面檢查。

目前尚未完成：

- DELETE API 測試。
- 完整前端 CRUD 整合測試。
- 財務統計正確性測試。
- CSV 資料匯出測試。
- 完整安全性、效能與邊界測試。

## 1.3 測試結果定義

PASS：

實際結果符合預期。

FAIL：

實際結果與預期不一致。

NOT RUN：

尚未執行測試。

BLOCKED：

因前置條件或系統問題而無法測試。

## 1.4 測試資料

目前本機 SQLite 使用一筆測試交易進行驗證。

初始資料：

- id：1
- category_id：4
- category_name：餐飲
- type：expense
- amount：120
- transaction_date：2026-11-09
- note：Lunch test

完成 PUT 正向測試後：

- id：1
- category_id：4
- category_name：餐飲
- type：expense
- amount：150
- transaction_date：2026-11-09
- note：Updated lunch test
- created_at：2026-11-09 13:40:14

所有測試均針對本機測試資料進行。

---

# 二、基礎環境測試

## 2.1 測試案例

| ID     | 測試項目            | 預期結果   | 狀態 |
| ------ | ------------------- | ---------- | ---- |
| ENV-01 | Node.js 執行環境    | 可正常執行 | PASS |
| ENV-02 | npm 套件管理        | 可正常執行 | PASS |
| ENV-03 | Git 版本控制        | 可正常執行 | PASS |
| ENV-04 | Express 安裝        | 安裝成功   | PASS |
| ENV-05 | npm start           | 伺服器啟動 | PASS |
| ENV-06 | Port 3000 HTTP 服務 | 正常回應   | PASS |
| ENV-07 | HTML 靜態檔案       | 正常載入   | PASS |
| ENV-08 | CSS 靜態檔案        | 正常載入   | PASS |

## 2.2 Health API

測試端點：

GET /api/health

預期結果：

- HTTP 200
- status：ok
- message：Money Tracker API is running

實際結果：

{
"status": "ok",
"message": "Money Tracker API is running"
}

測試狀態：PASS

## 2.3 PowerShell 測試指令

Invoke-RestMethod -Uri "http://localhost:3000/api/health"

結果：

伺服器成功回應，API 運作正常。

---

# 三、SQLite 資料庫結構測試

## 3.1 測試案例

| ID    | 測試項目            | 預期結果       | 狀態 |
| ----- | ------------------- | -------------- | ---- |
| DB-01 | SQLite 初始化       | 成功建立資料庫 | PASS |
| DB-02 | Categories Schema   | 欄位正確       | PASS |
| DB-03 | Transactions Schema | 欄位正確       | PASS |
| DB-04 | Foreign Key 結構    | 關聯正確       | PASS |
| DB-05 | Integrity Check     | 回傳 ok        | PASS |
| DB-06 | Foreign Key Check   | 無違規         | PASS |
| DB-07 | 預設交易分類        | 共 8 筆        | PASS |
| DB-08 | .db Git 忽略規則    | 成功排除       | PASS |

## 3.2 Categories 資料表

已檢查欄位：

- id
- name
- type

其中：

- id 為 Primary Key。
- name 不允許 NULL。
- type 不允許 NULL。

測試結果：PASS

## 3.3 Transactions 資料表

已檢查欄位：

- id
- category_id
- amount
- transaction_date
- note
- created_at

其中：

- id 為 Primary Key。
- category_id 為 Foreign Key。
- amount 不允許 NULL。
- transaction_date 不允許 NULL。
- created_at 具有預設時間值。

測試結果：PASS

## 3.4 外鍵結構

transactions.category_id 參照 categories.id。

資料庫檢查結果：

- 參照資料表：categories
- 來源欄位：category_id
- 目標欄位：id
- ON DELETE：RESTRICT

測試結果：PASS

## 3.5 資料庫完整性

執行：

PRAGMA integrity_check;

實際結果：

ok

執行：

PRAGMA foreign_key_check;

實際結果：

No foreign key violations

測試結果：PASS

以上為資料庫建置階段的檢查結果，
不代表每次資料修改後都已重新執行完整性檢查。

## 3.6 預設分類檢查

收入：

- 薪資
- 獎金
- 其他收入

支出：

- 餐飲
- 交通
- 購物
- 娛樂
- 其他支出

共八筆。

測試結果：PASS

## 3.7 Git 忽略規則

測試指令：

git check-ignore -v data/money-tracker.db

實際結果：

資料庫檔案符合 .gitignore 規則。

測試結果：PASS

---

# 四、GET /api/categories 測試

## 4.1 測試案例

| ID     | 測試項目     | 預期結果  | 狀態 |
| ------ | ------------ | --------- | ---- |
| CAT-01 | 查詢分類     | HTTP 200  | PASS |
| CAT-02 | 查詢分類筆數 | count = 8 | PASS |
| CAT-03 | 分類名稱     | 正確      | PASS |
| CAT-04 | 收支類型     | 正確      | PASS |

## 4.2 測試指令

Invoke-RestMethod -Uri "http://localhost:3000/api/categories"

## 4.3 實際結果

- success：true
- count：8
- data：包含八個分類物件

各分類具有：

- id
- name
- type

測試結論：PASS

---

# 五、GET /api/transactions 測試

## 5.1 測試案例

| ID     | 測試項目       | 預期結果   | 狀態 |
| ------ | -------------- | ---------- | ---- |
| GET-01 | 空交易資料表   | count = 0  | PASS |
| GET-02 | 新增後查詢     | count = 1  | PASS |
| GET-03 | 交易欄位       | 資料正確   | PASS |
| GET-04 | 分類關聯查詢   | 分類正確   | PASS |
| GET-05 | PUT 更新後查詢 | 新資料正確 | PASS |

## 5.2 空資料查詢

初始狀態：

{
"success": true,
"count": 0,
"data": []
}

測試結果：PASS

## 5.3 新增交易後查詢

新增一筆有效交易後：

- success：true
- count：1
- id：1
- amount：120

測試結果：PASS

## 5.4 修改交易後查詢

完成 PUT 修改後：

- success：true
- count：1
- id：1
- amount：150
- note：Updated lunch test

測試結果：PASS

## 5.5 查詢指令

Invoke-RestMethod -Uri "http://localhost:3000/api/transactions" |
ConvertTo-Json -Depth 5

---

# 六、POST /api/transactions 測試

## 6.1 測試目標

確認系統可以新增有效交易，
且不合法的輸入不會寫入 SQLite。

## 6.2 測試案例

| ID      | 測試項目     | 預期結果 | 狀態 |
| ------- | ------------ | -------- | ---- |
| POST-01 | 正常新增交易 | HTTP 201 | PASS |
| POST-02 | 負數金額     | HTTP 400 | PASS |
| POST-03 | 不存在的分類 | HTTP 400 | PASS |
| POST-04 | 不存在的日期 | HTTP 400 | PASS |
| POST-05 | 零元金額     | HTTP 400 | PASS |
| POST-06 | 小數金額     | HTTP 400 | PASS |
| POST-07 | 過長備註     | HTTP 400 | PASS |

## 6.3 POST-01｜正常新增交易

測試資料：

{
"category_id": 4,
"amount": 120,
"transaction_date": "2026-11-09",
"note": "Lunch test"
}

實際結果：

- HTTP 201。
- success：true。
- message：Transaction created successfully。
- 新交易 ID：1。
- GET API 可正常讀取新資料。

狀態：PASS

## 6.4 POST-02｜負數金額

輸入：

amount = -120

預期：

HTTP 400

實際回應：

Amount must be a positive integer

狀態：PASS

## 6.5 POST-03｜不存在的分類

輸入：

category_id = 9999

預期：

HTTP 400

實際回應：

Category does not exist

狀態：PASS

## 6.6 POST-04｜不存在的日期

輸入：

transaction_date = 2026-02-30

預期：

HTTP 400

實際回應：

Invalid transaction date

狀態：PASS

## 6.7 POST-05｜零元金額

輸入：

amount = 0

預期：

HTTP 400

實際回應：

Amount must be a positive integer

狀態：PASS

## 6.8 POST-06｜小數金額

輸入：

amount = 120.5

預期：

HTTP 400

實際回應：

Amount must be a positive integer

狀態：PASS

## 6.9 POST-07｜過長備註

輸入：

note = 501 個英文字元

預期：

HTTP 400

實際回應：

Note must be a string of at most 500 characters

狀態：PASS

## 6.10 POST 資料完整性

完成非法輸入測試後重新查詢：

GET /api/transactions

實際結果：

- count：1
- 原始交易仍存在
- 沒有因非法請求新增其他交易

測試結論：PASS

---

# 七、資料持久化測試

## 7.1 測試目標

確認資料儲存於 SQLite，
不會因 Express 重新啟動而遺失。

## 7.2 測試程序

1. 啟動 Express 伺服器。
2. 使用 POST API 新增一筆有效交易。
3. 使用 GET API 確認交易存在。
4. 停止 Express 伺服器。
5. 重新啟動 Express 伺服器。
6. 再次使用 GET API 查詢交易。

## 7.3 測試結果

重新啟動前：

count = 1

重新啟動後：

count = 1

交易資料仍可正常讀取。

## 7.4 結論

- SQLite 資料持久化正常。
- 伺服器重啟不會清空既有交易。
- 測試結果符合預期。

狀態：PASS

---

# 八、PUT /api/transactions/:id 測試

## 8.1 測試目標

確認系統可以更新既有交易紀錄，
並正確拒絕不合法的修改要求。

## 8.2 測試案例總表

| ID     | 測試項目          | 預期結果 | 實際結果 | 狀態 |
| ------ | ----------------- | -------- | -------- | ---- |
| PUT-01 | 正常修改交易      | HTTP 200 | HTTP 200 | PASS |
| PUT-02 | 不存在的交易 ID   | HTTP 404 | HTTP 404 | PASS |
| PUT-03 | 金額為零          | HTTP 400 | HTTP 400 | PASS |
| PUT-04 | 小數金額          | HTTP 400 | HTTP 400 | PASS |
| PUT-05 | 不存在的分類      | HTTP 400 | HTTP 400 | PASS |
| PUT-06 | 不存在的日期      | HTTP 400 | HTTP 400 | PASS |
| PUT-07 | 備註超過 500 字元 | HTTP 400 | HTTP 400 | PASS |

## 8.3 PUT-01｜正常修改交易

Endpoint：

PUT /api/transactions/1

修改前：

{
"id": 1,
"category_id": 4,
"amount": 120,
"transaction_date": "2026-11-09",
"note": "Lunch test"
}

修改要求：

{
"category_id": 4,
"amount": 150,
"transaction_date": "2026-11-09",
"note": "Updated lunch test"
}

實際結果：

- HTTP 200
- success：true
- message：Transaction updated successfully
- id：1
- category_id：4
- amount：150
- note：Updated lunch test
- created_at：保持原值

狀態：PASS

## 8.4 PUT-01｜測試指令

在測試用 PowerShell 執行：

$updateBody = @{
category_id = 4
amount = 150
transaction_date = "2026-11-09"
note = "Updated lunch test"
} | ConvertTo-Json

$result = Invoke-RestMethod `    -Uri "http://localhost:3000/api/transactions/1"`
-Method Put `    -ContentType "application/json; charset=utf-8"`
-Body $updateBody

$result | ConvertTo-Json -Depth 5

測試結果：

API 成功回傳更新後的交易資料。

注意：

此指令會修改本機資料庫中 ID 為 1 的交易。
重新測試前應確認測試資料符合預期。

## 8.5 PUT-02｜不存在的交易 ID

測試端點：

PUT /api/transactions/9999

預期：

HTTP 404

實際結果：

HTTP Status：404

Response：

{
"success": false,
"message": "Transaction not found"
}

狀態：PASS

## 8.6 PUT-03｜零元金額

測試內容：

amount = 0

預期：

HTTP 400

實際結果：

{
"success": false,
"message": "Amount must be a positive integer"
}

狀態：PASS

## 8.7 PUT-04｜小數金額

測試內容：

amount = 120.5

預期：

HTTP 400

實際結果：

{
"success": false,
"message": "Amount must be a positive integer"
}

狀態：PASS

## 8.8 PUT-05｜不存在的分類

測試內容：

category_id = 9999

預期：

HTTP 400

實際結果：

{
"success": false,
"message": "Category does not exist"
}

狀態：PASS

## 8.9 PUT-06｜不存在的日期

測試內容：

transaction_date = 2026-02-30

預期：

HTTP 400

實際結果：

{
"success": false,
"message": "Invalid transaction date"
}

狀態：PASS

## 8.10 PUT-07｜備註超過長度

測試內容：

note = 501 個英文字元

預期：

HTTP 400

實際結果：

{
"success": false,
"message": "Note must be a string of at most 500 characters"
}

狀態：PASS

---

# 九、PUT 資料完整性測試

## 9.1 測試目標

確認非法 PUT 請求不會修改或破壞原有交易。

## 9.2 測試方式

1. 成功將交易 ID 1 修改為 NT$150。
2. 執行不存在交易 ID 測試。
3. 執行五項非法資料測試。
4. 再次執行 GET /api/transactions。
5. 檢查交易筆數及欄位內容。

## 9.3 實際結果

{
"success": true,
"count": 1,
"data": [
{
"id": 1,
"category_id": 4,
"category_name": "餐飲",
"type": "expense",
"amount": 150,
"transaction_date": "2026-11-09",
"note": "Updated lunch test",
"created_at": "2026-11-09 13:40:14"
}
]
}

## 9.4 驗證項目

| 項目         | 預期               | 實際               | 狀態 |
| ------------ | ------------------ | ------------------ | ---- |
| 交易筆數     | 1                  | 1                  | PASS |
| 交易 ID      | 1                  | 1                  | PASS |
| 分類 ID      | 4                  | 4                  | PASS |
| 金額         | 150                | 150                | PASS |
| 備註         | Updated lunch test | Updated lunch test | PASS |
| 原始建立時間 | 不變               | 不變               | PASS |

## 9.5 測試結論

- 不存在的交易修改要求遭拒絕。
- 非法交易資料遭拒絕。
- 原始資料沒有受到影響。
- 交易筆數沒有增加。
- PUT API 的基本資料完整性測試通過。

---

# 十、Port 3000 問題排除與回歸測試

## 10.1 問題描述

初次執行：

PUT /api/transactions/1

伺服器回傳：

Cannot PUT /api/transactions/1

## 10.2 程式碼檢查

執行：

Select-String -Path .\server\server.js -Pattern 'app\.put\('

結果：

server.js 確實存在 PUT 路由。

執行：

node --check server/server.js

結果：

未發現 JavaScript 基本語法錯誤。

## 10.3 Port 檢查

執行：

Get-NetTCPConnection -LocalPort 3000 -State Listen

發現 Port 3000 存在 Node.js 監聽程序。

排錯當時的 PID：

9440

程序：

node.exe

CommandLine：

node server/server.js

## 10.4 Port 3001 對照測試

將 PORT 環境變數設定為 3001。

啟動 Express。

測試：

- GET /api/health
- PUT /api/transactions/1
- GET /api/transactions

實際結果：

三項請求均成功。

## 10.5 恢復 Port 3000

停止舊版 Node.js 程序後，
重新啟動 Port 3000。

執行：

GET /api/transactions

實際結果：

- success：true
- count：1
- amount：150

接著再次執行：

PUT /api/transactions/1

實際結果：

- success：true
- Transaction updated successfully

## 10.6 測試結論

| ID     | 測試項目             | 結果 |
| ------ | -------------------- | ---- |
| REG-01 | PUT 路由存在         | PASS |
| REG-02 | JavaScript 語法檢查  | PASS |
| REG-03 | Port 3001 Health API | PASS |
| REG-04 | Port 3001 PUT API    | PASS |
| REG-05 | Port 3001 GET API    | PASS |
| REG-06 | Port 3000 GET API    | PASS |
| REG-07 | Port 3000 PUT API    | PASS |

最終結果：

Port 3000 的 GET 與 PUT API 均恢復正常。

可能原因：

舊版 Node.js 程序仍在使用未包含 PUT 路由的舊版程式。

此原因為排查推論，而非已直接驗證的程序內部狀態。

---

# 十一、Dashboard 前端測試

## 11.1 測試案例

| ID    | 測試項目           | 預期結果 | 狀態    |
| ----- | ------------------ | -------- | ------- |
| UI-01 | 首頁載入           | 正常顯示 | PASS    |
| UI-02 | CSS 載入           | 正常     | PASS    |
| UI-03 | 深色主題           | 正常     | PASS    |
| UI-04 | 收入卡片           | 正常顯示 | PASS    |
| UI-05 | 支出卡片           | 正常顯示 | PASS    |
| UI-06 | 淨額卡片           | 正常顯示 | PASS    |
| UI-07 | 最近交易表格       | 正常顯示 | PASS    |
| UI-08 | 空交易狀態         | 正常顯示 | PASS    |
| UI-09 | Dashboard 動態資料 | 正確更新 | NOT RUN |
| UI-10 | 前端新增交易       | 成功新增 | NOT RUN |
| UI-11 | 前端修改交易       | 成功修改 | NOT RUN |
| UI-12 | 前端刪除交易       | 成功刪除 | NOT RUN |

## 11.2 測試結果

目前已完成：

- 靜態首頁顯示。
- Dashboard 卡片顯示。
- 最近交易表格顯示。
- 深色主題 CSS 載入。

尚未完成：

- Dashboard 與 SQLite 動態整合。
- 使用者交易表單操作。
- 真正的前端 CRUD 流程。

因此目前不能宣稱前端 CRUD 已經完成。

---

# 十二、尚未完成的測試

以下項目尚未執行或仍待開發。

## 12.1 PUT API 補充測試

- 交易 ID 為零。
- 交易 ID 為負數。
- 交易 ID 為字串。
- 缺少必要欄位。
- Request Body 為陣列。
- Request Body 為空值。
- category_id 型態錯誤。
- amount 型態錯誤。
- transaction_date 型態錯誤。
- note 型態錯誤。
- 超過安全整數範圍。
- 更新不同分類及收支類型。
- 重複更新相同資料。
- 伺服器重新啟動後的 PUT 資料持久化檢查。

## 12.2 DELETE API 測試

- 正常刪除交易。
- 刪除不存在交易。
- 不合法交易 ID。
- 刪除後交易筆數。
- 刪除後其他交易完整性。
- 重複刪除相同交易。

目前 DELETE API 尚未實作。

## 12.3 前端整合測試

- 新增交易表單。
- 編輯交易表單。
- 刪除確認。
- 前端欄位驗證。
- API 錯誤提示。
- 交易清單動態更新。
- Dashboard 即時更新。

## 12.4 財務統計測試

- 本月收入總額。
- 本月支出總額。
- 本月收支淨額。
- 不同日期區間。
- 不同分類彙總。
- SQL 聚合結果。
- 圖表資料一致性。

## 12.5 資料匯出測試

- CSV 匯出。
- 欄位順序。
- 日期與金額格式。
- 中文編碼。
- 空資料匯出。
- 匯出後資料正確性。

## 12.6 進階測試

- API 自動化測試。
- 更完整的錯誤處理測試。
- SQL Injection 防護驗證。
- 邊界值分析。
- 異常輸入處理。
- 多次連續請求。
- 資料庫錯誤情境。
- 行動裝置版面測試。
- 前後端完整整合測試。

---

# 十三、測試總結

## 13.1 已通過項目

- Express 基本環境測試。
- Health API。
- Categories GET API。
- Transactions GET API。
- Transactions POST API。
- Transactions PUT API。
- SQLite Schema 檢查。
- SQLite 基本完整性檢查。
- POST 輸入驗證。
- PUT 輸入驗證。
- POST 資料持久化測試。
- PUT 修改後資料完整性檢查。
- Port 3000 問題排除後的回歸測試。
- Dashboard 靜態版面測試。

## 13.2 已執行的 POST 測試

已規劃並執行七項測試。

通過：7

未通過：0

## 13.3 已執行的 PUT 測試

已規劃並執行七項測試。

通過：7

未通過：0

## 13.4 目前系統狀態

已具備：

- 查詢分類。
- 查詢交易。
- 新增交易。
- 修改交易。
- 基本資料驗證。
- SQLite 永久儲存。
- Git 與 GitHub 版本控制。

尚未具備：

- 刪除交易 API。
- 完整前端交易操作。
- 動態財務 Dashboard。
- 完整統計分析。
- CSV 匯出。
- 完整系統驗收。

## 13.5 最終結論

目前 GET、POST、PUT API 的已執行測試均符合預期。

PUT API 已成功修改既有交易，
並通過七項基本正向及負向測試。

已驗證非法 PUT 請求不會破壞原始測試交易。

不過，尚未完成完整 CRUD、前端整合、
自動化測試及所有邊界測試。

因此本報告僅代表目前已執行測試的結果，
不代表整套 Money Tracker 系統已經完成驗收。

---

# 十四、測試文件維護規範

每次新增功能時：

1. 新增測試案例 ID。
2. 記錄測試目標。
3. 記錄輸入資料。
4. 記錄預期結果。
5. 執行測試。
6. 記錄實際結果。
7. 標示 PASS、FAIL、NOT RUN 或 BLOCKED。
8. 驗證資料完整性。
9. 更新測試結論。
10. 與 CHANGELOG 和 DEVELOPMENT_LOG 同步。
11. 完成 Git Commit 與 Push。

應保留已執行的歷史測試紀錄。

若後續重新測試失敗，應增加新紀錄，
不得直接刪除先前的測試結果。

重要測試應保留對應的 Commit、
執行日期及可重現的測試方式。

本文件將隨 Money Tracker 專案持續更新。
