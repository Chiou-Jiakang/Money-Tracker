# Money Tracker｜測試報告（TESTING REPORT）

本文件記錄 Money Tracker 個人財務管理系統的功能測試、REST API 驗證、SQLite 資料庫完整性檢查、輸入驗證、負向測試、資料持久化測試、錯誤排除與回歸測試結果。

本報告採持續累積方式維護，保留已執行的歷史測試，並在後續功能完成時新增測試案例。

最後整理日期：2026-11-10

目前測試階段：Milestone 09｜DELETE Transaction API

目前整體狀態：基本後端 CRUD 主要測試通過，完整整合測試尚未完成。

---

# 一、測試基本資訊

## 1.1 專案資料

| 項目         | 內容                                 |
| ------------ | ------------------------------------ |
| 專案名稱     | Money Tracker                        |
| 中文名稱     | 個人財務管理系統                     |
| 測試環境     | 本機開發環境                         |
| 作業系統     | Windows                              |
| 開發工具     | Visual Studio Code                   |
| Node.js      | v24.15.0（首次環境檢查）             |
| 後端框架     | Express                              |
| 資料庫       | SQLite                               |
| SQLite 模組  | node:sqlite                          |
| API 架構     | REST API                             |
| 資料格式     | JSON                                 |
| 測試工具     | PowerShell、curl.exe、Microsoft Edge |
| API Base URL | http://localhost:3000                |
| 本機路徑     | C:\Projects\Money-Tracker            |
| GitHub       | Chiou-Jiakang/Money-Tracker          |

## 1.2 測試目的

驗證系統是否能：

1. 正常啟動 Express。
2. 正常提供靜態網頁。
3. 正常回傳 Health API。
4. 正確查詢交易分類。
5. 正確查詢交易紀錄。
6. 正常新增交易。
7. 正常修改交易。
8. 正常刪除交易。
9. 拒絕不合法資料。
10. 正確處理不存在的交易。
11. 保留有效資料。
12. 維持 SQLite 完整性。
13. 維持資料表外鍵關聯。
14. 在伺服器重啟後保存資料。
15. 避免新功能破壞既有功能。

## 1.3 測試範圍

目前已執行：

- Express 伺服器基本測試。
- Health API。
- Categories GET API。
- Transactions GET API。
- Transactions POST API。
- Transactions PUT API。
- Transactions DELETE API。
- 交易金額驗證。
- 交易分類驗證。
- 交易日期驗證。
- 交易備註驗證。
- 不存在交易的錯誤處理。
- POST 資料持久化。
- PUT 修改後資料完整性。
- DELETE 刪除後資料完整性。
- SQLite Schema 檢查。
- SQLite Integrity Check。
- SQLite Foreign Key Check。
- Dashboard 靜態版面。
- Port 與伺服器程序排錯。

尚未完成：

- 全面自動化回歸測試。
- 全部邊界值測試。
- 資料庫故障注入測試。
- 前端 CRUD 整合測試。
- Dashboard 動態統計測試。
- 財務分析測試。
- CSV 匯出測試。
- 整體系統驗收。

## 1.4 測試結果定義

| 狀態    | 定義                         |
| ------- | ---------------------------- |
| PASS    | 已執行且符合預期             |
| FAIL    | 已執行但不符合預期           |
| NOT RUN | 尚未執行                     |
| BLOCKED | 因環境或其他問題暫時無法執行 |

本文件不得將預期結果直接當成實際結果。

若某項測試先失敗、排除問題後成功，應保留錯誤歷程及最終驗證結果。

## 1.5 測試紀錄原則

每個主要案例盡可能記錄：

- Test ID。
- 測試目的。
- Endpoint。
- HTTP Method。
- Request。
- 預期結果。
- 實際結果。
- HTTP Status。
- 資料庫變化。
- PASS、FAIL 或 NOT RUN。
- 測試期間。
- 已知限制。

---

# 二、基礎環境與 Health API

## 2.1 Express 啟動

測試編號：ENV-01

啟動指令：

```powershell
cd C:\Projects\Money-Tracker
npm start
```

預期：

Express 正常啟動並監聽 Port 3000。

實際輸出：

`Money Tracker server running at http://localhost:3000`

結果：PASS。

## 2.2 Health API

測試編號：ENV-02

Endpoint：

`GET /api/health`

測試指令：

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/health"
```

預期：

- HTTP 200。
- status：ok。
- message：Money Tracker API is running。

實際回應：

```json
{
  "status": "ok",
  "message": "Money Tracker API is running"
}
```

結果：PASS。

## 2.3 HTTP 連線測試

測試編號：ENV-03

已確認：

- Microsoft Edge 可連接 localhost:3000。
- PowerShell 可呼叫 API。
- Express 可回傳 JSON。
- 伺服器停止時，HTTP 請求無法正常連線。

結果：PASS。

## 2.4 前端靜態檔案測試

測試編號：ENV-04

測試網址：

`http://localhost:3000`

已確認：

- HTML 正常顯示。
- CSS 正常載入。
- Money Tracker 標題正常顯示。
- 個人財務管理系統副標題正常顯示。
- 深色主題正常運作。

結果：PASS。

---

# 三、SQLite 資料庫測試

## 3.1 資料庫初始化

測試編號：DB-01

執行：

```powershell
node server/init-db.js
```

首次初始化結果：

- Database initialized successfully。
- Categories：8。
- Transactions：0。

結果：PASS。

上述交易筆數為首次初始化時的結果，不代表目前資料庫仍有零筆交易。

## 3.2 Categories Table

測試編號：DB-02

檢查：

`PRAGMA table_info(categories)`

實際欄位：

| 欄位 | 型態    | NOT NULL | PK  |
| ---- | ------- | -------- | --- |
| id   | INTEGER | 0        | 1   |
| name | TEXT    | 1        | 0   |
| type | TEXT    | 1        | 0   |

結果：PASS。

## 3.3 Transactions Table

測試編號：DB-03

檢查：

`PRAGMA table_info(transactions)`

實際欄位：

| 欄位             | 型態    | NOT NULL | PK  |
| ---------------- | ------- | -------- | --- |
| id               | INTEGER | 0        | 1   |
| category_id      | INTEGER | 1        | 0   |
| amount           | INTEGER | 1        | 0   |
| transaction_date | TEXT    | 1        | 0   |
| note             | TEXT    | 0        | 0   |
| created_at       | TEXT    | 1        | 0   |

補充：

- note 預設空字串。
- created_at 預設 CURRENT_TIMESTAMP。

結果：PASS。

## 3.4 Foreign Key

測試編號：DB-04

檢查：

`PRAGMA foreign_key_list(transactions)`

實際：

- Table：categories。
- From：category_id。
- To：id。
- ON UPDATE：NO ACTION。
- ON DELETE：RESTRICT。

結果：PASS。

## 3.5 SQLite Integrity Check

測試編號：DB-05

執行：

```powershell
node server/check-db.js
```

實際輸出：

`ok`

結果：PASS。

## 3.6 SQLite Foreign Key Check

測試編號：DB-06

檢查：

`PRAGMA foreign_key_check`

實際輸出：

`No foreign key violations`

結果：PASS。

## 3.7 預設分類

測試編號：DB-07

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

實際分類筆數：

8。

結果：PASS。

## 3.8 Git 忽略規則

測試編號：DB-08

指令：

```powershell
git check-ignore -v data/money-tracker.db
```

實際：

`.gitignore` 中的 `*.db` 規則成功匹配資料庫檔案。

結果：PASS。

此測試確認 Git 忽略規則有效，但不等於已驗證所有可能的資料外洩途徑。

---

# 四、GET Categories API

## 4.1 測試目標

驗證後端能從 SQLite 正確查詢交易分類。

Endpoint：

`GET /api/categories`

## 4.2 測試指令

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/categories" |
    ConvertTo-Json -Depth 5
```

## 4.3 預期結果

- success：true。
- count：8。
- 包含八個分類。
- 分類名稱正確。
- 分類類型正確。

## 4.4 實際結果

- success：true。
- count：8。
- 三個 income 分類。
- 五個 expense 分類。
- 預設分類完整。

測試結果：PASS。

---

# 五、GET Transactions API

## 5.1 測試目標

確認 API 能查詢 SQLite 交易資料。

Endpoint：

`GET /api/transactions`

## 5.2 測試指令

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/transactions" |
    ConvertTo-Json -Depth 5
```

## 5.3 GET-01：空資料查詢

首次測試時：

- 資料庫沒有交易。
- API 正常回傳空陣列。

實際：

```json
{
  "success": true,
  "count": 0,
  "data": []
}
```

結果：PASS。

## 5.4 GET-02：新增後查詢

POST 新增 ID 1 後：

- count：1。
- ID 1 存在。
- category_id：4。
- amount：120。
- note：Lunch test。

結果：PASS。

## 5.5 GET-03：修改後查詢

PUT 修改 ID 1 後：

- count：1。
- ID 1 仍存在。
- amount：150。
- note：Updated lunch test。

結果：PASS。

## 5.6 GET-04：刪除前查詢

新增 DELETE 專用測試交易 ID 2 後：

- count：2。
- ID 1 存在。
- ID 2 存在。

結果：PASS。

## 5.7 GET-05：刪除後查詢

DELETE ID 2 成功後：

- count：1。
- ID 2 消失。
- ID 1 保留。

結果：PASS。

## 5.8 GET API 查詢格式

回傳欄位：

- success。
- count。
- data。

交易欄位：

- id。
- category_id。
- category_name。
- type。
- amount。
- transaction_date。
- note。
- created_at。

SQL 使用 INNER JOIN 取得分類資訊。

依照交易日期及 ID 降序排序。

既定主要測試結果：PASS。

---

# 六、POST Transactions API

## 6.1 測試目的

驗證新增收入與支出交易，以及非法輸入的錯誤處理。

Endpoint：

`POST /api/transactions`

## 6.2 測試案例總表

| Test ID | 測試項目   | 預期     | 狀態 |
| ------- | ---------- | -------- | ---- |
| POST-01 | 正常新增   | HTTP 201 | PASS |
| POST-02 | 負數金額   | HTTP 400 | PASS |
| POST-03 | 不存在分類 | HTTP 400 | PASS |
| POST-04 | 不存在日期 | HTTP 400 | PASS |
| POST-05 | 零元金額   | HTTP 400 | PASS |
| POST-06 | 小數金額   | HTTP 400 | PASS |
| POST-07 | 過長備註   | HTTP 400 | PASS |

## 6.3 POST-01：正常新增

Request Body：

```json
{
  "category_id": 4,
  "amount": 120,
  "transaction_date": "2026-11-09",
  "note": "Lunch test"
}
```

預期：

- HTTP 201。
- success：true。
- 新增交易成功。
- 回傳新交易 ID。

實際：

- success：true。
- id：1。
- category_id：4。
- category_name：餐飲。
- type：expense。
- amount：120。
- transaction_date：2026-11-09。
- note：Lunch test。

結果：PASS。

## 6.4 POST-02：負數金額

測試金額：

`-120`

預期：

HTTP 400。

實際：

HTTP 400。

錯誤訊息：

`Amount must be a positive integer`

結果：PASS。

## 6.5 POST-03：不存在分類

測試分類：

`category_id = 9999`

預期：

HTTP 400。

實際：

HTTP 400。

錯誤訊息：

`Category does not exist`

結果：PASS。

## 6.6 POST-04：不存在日期

測試日期：

`2026-02-30`

預期：

HTTP 400。

實際：

HTTP 400。

錯誤訊息：

`Invalid transaction date`

結果：PASS。

## 6.7 POST-05：零元金額

測試金額：

`0`

預期：

HTTP 400。

實際：

HTTP 400。

錯誤訊息：

`Amount must be a positive integer`

結果：PASS。

## 6.8 POST-06：小數金額

輸入小數金額。

預期：

HTTP 400。

實際：

HTTP 400。

錯誤訊息：

`Amount must be a positive integer`

結果：PASS。

## 6.9 POST-07：過長備註

輸入超過 500 個 JavaScript 字串長度單位的備註。

預期：

HTTP 400。

實際：

HTTP 400。

錯誤訊息：

`Note must be a string of at most 500 characters`

結果：PASS。

## 6.10 POST 負向測試結論

已執行六項不合法輸入測試。

實際：

- 六項均遭拒絕。
- HTTP Status 符合預期。
- 錯誤訊息符合預期。

包括正向案例，共七項既定測試通過。

## 6.11 POST 資料完整性驗證

完成負向測試後，查詢：

`GET /api/transactions`

實際交易筆數仍為：

`1`

確認不合法 POST 請求沒有新增額外交易。

結果：PASS。

---

# 七、資料持久化測試

## 7.1 測試目標

驗證資料寫入 SQLite 後，停止及重新啟動 Express 不會造成交易紀錄遺失。

## 7.2 測試程序

1. 新增有效交易。
2. 使用 GET 查詢。
3. 確認交易存在。
4. 停止 Express。
5. 重新啟動 Express。
6. 再次使用 GET 查詢。
7. 比對交易內容。

## 7.3 實際結果

重啟前：

- count：1。
- ID 1 存在。

重啟後：

- count：1。
- ID 1 仍存在。
- 原始資料沒有遺失。

## 7.4 測試結論

SQLite 資料持久化測試通過。

結果：PASS。

---

# 八、PUT Transactions API

## 8.1 測試目標

驗證既有交易資料的修改功能。

Endpoint：

`PUT /api/transactions/:id`

## 8.2 測試案例總表

| Test ID | 測試項目   | 預期     | 狀態 |
| ------- | ---------- | -------- | ---- |
| PUT-01  | 正常修改   | HTTP 200 | PASS |
| PUT-02  | 不存在交易 | HTTP 404 | PASS |
| PUT-03  | 零元金額   | HTTP 400 | PASS |
| PUT-04  | 小數金額   | HTTP 400 | PASS |
| PUT-05  | 不存在分類 | HTTP 400 | PASS |
| PUT-06  | 不存在日期 | HTTP 400 | PASS |
| PUT-07  | 過長備註   | HTTP 400 | PASS |

## 8.3 PUT-01：正常修改

原始交易：

```json
{
  "id": 1,
  "category_id": 4,
  "amount": 120,
  "transaction_date": "2026-11-09",
  "note": "Lunch test"
}
```

修改內容：

```json
{
  "category_id": 4,
  "amount": 150,
  "transaction_date": "2026-11-09",
  "note": "Updated lunch test"
}
```

預期：

- HTTP 200。
- success：true。
- 原有交易被更新。
- 交易 ID 不變。
- 建立時間不變。

實際：

- HTTP 200。
- success：true。
- Transaction updated successfully。
- amount：150。
- note：Updated lunch test。
- ID 維持 1。
- created_at 保持不變。
- count 維持 1。

結果：PASS。

## 8.4 PUT 測試指令

有效交易修改範例：

```powershell
$updateBody = @{
    category_id = 4
    amount = 150
    transaction_date = "2026-11-09"
    note = "Updated lunch test"
} | ConvertTo-Json

Invoke-RestMethod `
    -Uri "http://localhost:3000/api/transactions/1" `
    -Method Put `
    -ContentType "application/json; charset=utf-8" `
    -Body $updateBody
```

此範例為可重現的 PUT 測試指令。

重新執行會再次修改 ID 1，操作前應確認該交易仍是預定測試資料。

## 8.5 PUT-02：不存在交易 ID

測試：

`PUT /api/transactions/9999`

實際：

HTTP 404。

錯誤訊息：

`Transaction not found`

結果：PASS。

## 8.6 PUT-03：零元金額

測試金額：

`0`

實際：

HTTP 400。

錯誤訊息：

`Amount must be a positive integer`

結果：PASS。

## 8.7 PUT-04：小數金額

輸入小數金額。

實際：

HTTP 400。

錯誤訊息：

`Amount must be a positive integer`

結果：PASS。

## 8.8 PUT-05：不存在分類

測試：

`category_id = 9999`

實際：

HTTP 400。

錯誤訊息：

`Category does not exist`

結果：PASS。

## 8.9 PUT-06：不存在日期

測試日期：

`2026-02-30`

實際：

HTTP 400。

錯誤訊息：

`Invalid transaction date`

結果：PASS。

## 8.10 PUT-07：備註超過限制

輸入超過 500 個 JavaScript 字串長度單位的備註。

實際：

HTTP 400。

錯誤訊息：

`Note must be a string of at most 500 characters`

結果：PASS。

---

# 九、PUT 資料完整性驗證

## 9.1 測試目標

驗證非法 PUT 請求不會破壞原始交易資料。

## 9.2 測試程序

1. 完成正常 PUT 更新。
2. 確認資料正確。
3. 執行不存在 ID 測試。
4. 執行五項非法資料測試。
5. 再次執行 GET。
6. 比對資料庫內容。

## 9.3 實際查詢結果

```json
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
```

## 9.4 驗證項目

| 項目     | 預期               | 實際 | 狀態 |
| -------- | ------------------ | ---- | ---- |
| 交易數量 | 1                  | 1    | PASS |
| 交易 ID  | 1                  | 1    | PASS |
| 分類 ID  | 4                  | 4    | PASS |
| 金額     | 150                | 150  | PASS |
| 備註     | Updated lunch test | 相同 | PASS |
| 建立時間 | 不變               | 不變 | PASS |

## 9.5 測試結論

- 不存在交易遭拒絕。
- 不合法資料遭拒絕。
- 原始交易仍存在。
- 金額保持正確。
- 備註保持正確。
- 沒有新增額外紀錄。

結果：PASS。

---

# 十、PUT 路由問題排除與回歸測試

## 10.1 初次問題

執行：

`PUT /api/transactions/1`

Express 回傳：

`Cannot PUT /api/transactions/1`

## 10.2 原始碼檢查

使用 Select-String 搜尋 app.put。

確認 PUT 路由存在。

執行：

`node --check server/server.js`

沒有基本語法錯誤。

## 10.3 Port 3000 檢查

查詢：

`Get-NetTCPConnection`

發現當時 Port 3000 正由 Node.js 程序監聽。

歷史 PID：

9440。

CommandLine：

`node server/server.js`

## 10.4 Port 3001 對照測試

設定：

`$env:PORT = "3001"`

重新啟動 Express。

已成功測試：

- Health API。
- PUT API。
- GET API。

## 10.5 恢復 Port 3000

停止已確認的舊程序。

停止 Port 3001 測試伺服器。

重新啟動 Port 3000。

測試：

- GET 成功。
- PUT 成功。
- 資料修改正確。
- 交易數量維持 1。

## 10.6 測試總結

| Test ID | 項目                | 狀態 |
| ------- | ------------------- | ---- |
| REG-01  | PUT 路由存在        | PASS |
| REG-02  | JavaScript 語法檢查 | PASS |
| REG-03  | Port 3001 Health    | PASS |
| REG-04  | Port 3001 PUT       | PASS |
| REG-05  | Port 3001 GET       | PASS |
| REG-06  | Port 3000 GET       | PASS |
| REG-07  | Port 3000 PUT       | PASS |

最終結果：

PUT API 恢復正常。

可能原因為舊 Node.js 程序未載入新版路由，但未直接檢驗舊程序的內部記憶體狀態。

---

# 十一、Dashboard 靜態前端測試

## 11.1 測試案例

| Test ID | 測試項目           | 狀態    |
| ------- | ------------------ | ------- |
| UI-01   | 首頁顯示           | PASS    |
| UI-02   | CSS 載入           | PASS    |
| UI-03   | 深色主題           | PASS    |
| UI-04   | 收入卡片           | PASS    |
| UI-05   | 支出卡片           | PASS    |
| UI-06   | 淨額卡片           | PASS    |
| UI-07   | 最近交易表格       | PASS    |
| UI-08   | 空資料提示         | PASS    |
| UI-09   | Dashboard 動態更新 | NOT RUN |
| UI-10   | 前端新增交易       | NOT RUN |
| UI-11   | 前端修改交易       | NOT RUN |
| UI-12   | 前端刪除交易       | NOT RUN |

## 11.2 已完成內容

- HTML 首頁。
- CSS 深色主題。
- 三張財務摘要卡片。
- 最近交易表格。
- 空資料狀態。

## 11.3 尚未完成

- 使用 Fetch API 讀取資料。
- 動態顯示交易清單。
- 前端新增交易。
- 前端編輯交易。
- 前端刪除交易。
- Dashboard 自動重新計算。

目前不能將靜態版面顯示成功視為完整前端 CRUD 測試通過。

---

# 十二、Milestone 09｜DELETE API 測試

測試期間：

2026-11-09 至 2026-11-10。

Endpoint：

`DELETE /api/transactions/:id`

## 12.1 測試目標

驗證 DELETE API 能：

1. 拒絕不合法交易 ID。
2. 刪除指定交易。
3. 處理不存在的交易。
4. 正確回傳 JSON。
5. 保留未指定刪除的交易。
6. 維持 SQLite 完整性。

## 12.2 測試案例總表

| Test ID   | 測試項目       | 預期                 | 狀態 |
| --------- | -------------- | -------------------- | ---- |
| DELETE-01 | 不合法 ID      | HTTP 400             | PASS |
| DELETE-02 | 正常刪除       | HTTP 200             | PASS |
| DELETE-03 | 刪除後資料驗證 | ID 2 消失，ID 1 保留 | PASS |
| DELETE-04 | 不存在交易     | HTTP 404             | PASS |
| DELETE-05 | SQLite 完整性  | 無完整性或外鍵違規   | PASS |

## 12.3 DELETE-ROUTE：路由載入問題

第一次測試：

```powershell
curl.exe -i -X DELETE "http://localhost:3000/api/transactions/abc"
```

實際回應：

HTTP 404。

Body：

`Cannot DELETE /api/transactions/abc`

Content-Type：

`text/html`

這個結果不是預期的 API 驗證回應。

排查流程：

1. 檢查原始碼中是否存在 app.delete。
2. 確認路由位於 app.listen 之前。
3. 執行 node --check。
4. 檢查 Port 3000。
5. 檢查 Port 3001。
6. 確認 Node.js 監聽程序。
7. 停止已確認的舊程序。
8. 重新啟動 Express。
9. 再次發送測試請求。

最後成功回傳 HTTP 400 及 JSON。

最終路由載入驗證：PASS。

初次錯誤紀錄保留於此，不將問題發生歷程刪除。

## 12.4 DELETE-01：不合法交易 ID

測試目的：

確認 API 不接受非數字交易 ID。

請求：

`DELETE /api/transactions/abc`

指令：

```powershell
curl.exe -i -X DELETE "http://localhost:3000/api/transactions/abc"
```

預期：

- HTTP 400。
- success：false。
- Invalid transaction ID。

實際：

HTTP 400 Bad Request。

```json
{
  "success": false,
  "message": "Invalid transaction ID"
}
```

結果：PASS。

## 12.5 DELETE 測試資料準備

為避免誤刪既有交易，先使用 POST API 建立專用測試紀錄。

Request Body：

```json
{
  "category_id": 4,
  "amount": 123,
  "transaction_date": "2026-11-10",
  "note": "DELETE API temporary test"
}
```

POST 成功結果：

- success：true。
- Transaction created successfully。
- ID：2。
- 分類 ID：4。
- 分類名稱：餐飲。
- 類型：expense。
- 金額：123。
- 日期：2026-11-10。
- 備註：DELETE API temporary test。
- 建立時間：2026-11-09 16:29:38。

測試資料成功建立。

## 12.6 刪除前查詢

使用：

`GET /api/transactions`

實際：

- success：true。
- count：2。

交易資料：

| ID  | 分類 | 金額 | 日期       | 備註                      |
| --- | ---- | ---- | ---------- | ------------------------- |
| 2   | 餐飲 | 123  | 2026-11-10 | DELETE API temporary test |
| 1   | 餐飲 | 150  | 2026-11-09 | Updated lunch test        |

確認兩筆交易皆存在。

結果：PASS。

## 12.7 DELETE-02：正常刪除

測試目的：

確認 API 能夠成功刪除指定交易。

請求：

`DELETE /api/transactions/2`

指令：

```powershell
curl.exe -i -X DELETE "http://localhost:3000/api/transactions/2"
```

預期：

- HTTP 200。
- success：true。
- Transaction deleted successfully。
- data.id：2。

實際：

HTTP 200 OK。

```json
{
  "success": true,
  "message": "Transaction deleted successfully",
  "data": {
    "id": 2
  }
}
```

結果：PASS。

## 12.8 DELETE-03：刪除後資料驗證

測試目的：

確認被刪除交易已消失，原有交易完整保留。

再次執行：

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/transactions" |
    ConvertTo-Json -Depth 5
```

實際結果：

```json
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
```

已確認：

1. 原本兩筆交易變為一筆。
2. ID 2 不再出現。
3. ID 1 仍存在。
4. ID 1 分類維持餐飲。
5. ID 1 金額維持 NT$150。
6. ID 1 日期保持不變。
7. ID 1 備註保持不變。
8. ID 1 建立時間保持不變。

PowerShell 自動驗證：

`PASS: DELETE API data integrity verified`

結果：PASS。

## 12.9 DELETE-04：重複刪除

測試目的：

確認已刪除交易再次被刪除時，會回傳不存在的錯誤。

請求：

`DELETE /api/transactions/2`

執行：

```powershell
curl.exe -i -X DELETE "http://localhost:3000/api/transactions/2"
```

預期：

HTTP 404。

實際：

HTTP 404 Not Found。

```json
{
  "success": false,
  "message": "Transaction not found"
}
```

結果：PASS。

## 12.10 DELETE-05：SQLite 完整性檢查

測試目的：

確認交易刪除後，資料庫結構與外鍵關聯保持正常。

執行：

```powershell
node server/check-db.js
```

檢查內容：

- Categories Table。
- Transactions Table。
- Primary Key。
- Foreign Key。
- Integrity Check。
- Foreign Key Check。
- Default Categories。

實際：

Integrity Check：

`ok`

Foreign Key Check：

`No foreign key violations`

其他結果：

- Categories 結構正常。
- Transactions 結構正常。
- Foreign Key 保持不變。
- 八個預設分類存在。

結果：PASS。

## 12.11 DELETE 測試前後比較

| 項目              | 刪除前             | 刪除後 | 結果 |
| ----------------- | ------------------ | ------ | ---- |
| 交易總數          | 2                  | 1      | PASS |
| ID 2              | 存在               | 不存在 | PASS |
| ID 1              | 存在               | 存在   | PASS |
| ID 1 金額         | 150                | 150    | PASS |
| ID 1 備註         | Updated lunch test | 相同   | PASS |
| Integrity Check   | 正常               | 正常   | PASS |
| Foreign Key Check | 無違規             | 無違規 | PASS |

## 12.12 DELETE 主要測試結果

已執行：

5。

PASS：

5。

FAIL：

0。

主要驗證：

- HTTP 200。
- HTTP 400。
- HTTP 404。
- 刪除後資料一致性。
- SQLite 完整性。

本階段主要驗證通過。

## 12.13 DELETE 尚未執行的測試

| Test ID   | 測試項目        | 狀態    |
| --------- | --------------- | ------- |
| DELETE-06 | ID 為 0         | NOT RUN |
| DELETE-07 | ID 為負數       | NOT RUN |
| DELETE-08 | ID 為小數       | NOT RUN |
| DELETE-09 | ID 超過安全整數 | NOT RUN |
| DELETE-10 | 特殊 URL 輸入   | NOT RUN |
| DELETE-11 | 資料庫操作失敗  | NOT RUN |
| DELETE-12 | 完整 CRUD 回歸  | NOT RUN |
| DELETE-13 | 前端刪除操作    | NOT RUN |
| DELETE-14 | 大量資料效能    | NOT RUN |

這些項目保留為後續測試，不計入本階段 PASS 數量。

---

# 十三、DELETE API 問題排除紀錄

## 13.1 問題一：Cannot DELETE

首次執行 DELETE API：

HTTP 404。

Body：

`Cannot DELETE /api/transactions/abc`

確認原始碼中存在 DELETE 路由，但執行中的伺服器未正常匹配。

## 13.2 原始碼驗證

執行：

```powershell
Select-String -Path .\server\server.js -Pattern 'app\.delete\(', 'app\.listen\('
```

當時本機結果：

- app.delete：第 405 行。
- app.listen：第 456 行。

確認 DELETE 路由位於 app.listen 之前。

## 13.3 JavaScript 語法檢查

執行：

```powershell
node --check server/server.js
```

沒有出現基本語法錯誤。

此結果不能單獨證明 API 運作正常。

## 13.4 Port 監聽檢查

當時：

| Port | PID   | 程序     |
| ---- | ----- | -------- |
| 3000 | 13460 | node.exe |
| 3001 | 14724 | node.exe |

CommandLine：

`node server/server.js`

這些 PID 只代表歷史排錯當時的程序。

## 13.5 停止舊程序

確認程序後，當時使用：

`Stop-Process -Id 13460,14724`

再次檢查 Port。

沒有發現 Port 3000 或 3001 仍被上述程序監聽。

## 13.6 問題二：無法連線

停止伺服器後執行 curl。

實際：

`curl: (7) Failed to connect`

原因：

目標 Port 沒有運作中的 HTTP Server。

這與 Express 回傳 404 的情況不同。

## 13.7 恢復 Express

回到專案路徑。

清除測試環境變數。

重新執行：

`npm start`

伺服器正常啟動。

## 13.8 修復後測試

再次執行：

`DELETE /api/transactions/abc`

實際：

HTTP 400。

Body：

```json
{
  "success": false,
  "message": "Invalid transaction ID"
}
```

確認 DELETE 路由已正常載入。

## 13.9 原因分析

最可能的原因：

舊版 Node.js 程序仍在執行，造成請求未使用已加入 DELETE 路由的新版程式。

此原因是依程序檢查、重新啟動及回歸測試推定，未直接檢查舊程序記憶體。

## 13.10 學習成果

- Express 預設 404。
- 自訂 API 錯誤回應。
- HTTP 404 與連線失敗。
- Port 監聽。
- PID。
- Node.js Process。
- 重新載入後端程式。
- PowerShell 問題排查。
- 使用專用測試資料。
- 保留排錯歷程。

---

# 十四、目前主要測試總表

## 14.1 基礎功能

| 功能                   | 狀態 |
| ---------------------- | ---- |
| Express Server         | PASS |
| Health API             | PASS |
| 前端靜態檔案           | PASS |
| Categories GET         | PASS |
| Transactions GET       | PASS |
| Transactions POST      | PASS |
| Transactions PUT       | PASS |
| Transactions DELETE    | PASS |
| SQLite Schema          | PASS |
| SQLite Integrity Check | PASS |
| Foreign Key Check      | PASS |
| 預設分類               | PASS |
| POST 持久化            | PASS |
| PUT 資料驗證           | PASS |
| DELETE 資料驗證        | PASS |
| Dashboard 靜態版面     | PASS |

上述 PASS 僅針對本文件已執行的對應案例。

## 14.2 POST 測試統計

既定測試：

7。

通過：

7。

失敗：

0。

## 14.3 PUT 測試統計

既定測試：

7。

通過：

7。

失敗：

0。

## 14.4 DELETE 測試統計

主要測試：

5。

通過：

5。

失敗：

0。

## 14.5 主要交易 API 測試合計

| API    | 已執行案例 | PASS | FAIL |
| ------ | ---------: | ---: | ---: |
| POST   |          7 |    7 |    0 |
| PUT    |          7 |    7 |    0 |
| DELETE |          5 |    5 |    0 |
| 合計   |         19 |   19 |    0 |

統計範圍：

POST、PUT、DELETE 三組既定主要測試。

不包含其他 GET、Health、資料庫及環境測試。

不代表所有可能的測試案例已執行。

---

# 十五、尚未完成的測試

## 15.1 API 輸入邊界測試

尚待：

- 缺少必要欄位。
- Request Body 為 null。
- Request Body 為陣列。
- 不正確資料型態。
- category_id 為 0。
- category_id 為負數。
- category_id 為字串。
- amount 為字串。
- amount 為超大整數。
- 日期格式錯誤。
- 日期為 null。
- 備註型態錯誤。
- 特殊 Unicode 字元。
- 非法 JSON。
- 不合法 HTTP Content-Type。

上述尚未全面執行，不標示 PASS。

## 15.2 CRUD 完整回歸測試

尚待建立可重複執行的完整測試流程：

1. 建立交易。
2. 查詢交易。
3. 修改交易。
4. 再次查詢。
5. 刪除交易。
6. 確認交易不存在。
7. 確認其他交易存在。
8. 檢查資料庫完整性。

雖然前面已分階段完成主要功能測試，但尚未建立完整自動化回歸測試套件。

## 15.3 資料庫故障測試

尚待：

- 資料庫檔案不存在。
- 資料庫無法開啟。
- 資料庫唯讀。
- SQL 執行失敗。
- 其他磁碟或權限錯誤。
- 資料庫備份及恢復。

## 15.4 前端 CRUD 測試

尚待：

- 新增交易表單。
- 修改交易介面。
- 刪除交易介面。
- 刪除確認。
- 表單驗證。
- API 錯誤提示。
- 成功訊息顯示。
- 動態更新交易清單。

## 15.5 Dashboard 動態測試

尚待：

- 本月總收入。
- 本月總支出。
- 本月收支淨額。
- 最近交易。
- 新增後重新計算。
- 修改後重新計算。
- 刪除後重新計算。
- 無交易資料。
- API 請求失敗。
- 不同月份切換。

## 15.6 財務分析測試

尚待：

- 日期區間。
- 分類篩選。
- 月度統計。
- 年度統計。
- SQL GROUP BY。
- SQL SUM。
- 支出占比。
- 財務趨勢圖表。
- 大量交易統計。

## 15.7 CSV 匯出測試

尚待：

- 正常匯出。
- 正確欄位順序。
- 中文編碼。
- 金額格式。
- 日期格式。
- 空資料匯出。
- 特殊字元處理。
- 匯出後資料一致性。

## 15.8 其他進階測試

尚待：

- 自動化 API 測試。
- 高資料量效能測試。
- 多次連續請求。
- 並發交易操作。
- SQL Injection 防護驗證。
- 錯誤訊息一致性。
- 前後端完整整合。
- 行動裝置版面。
- 使用者操作流程。
- 完整系統驗收。

---

# 十六、測試結果與 Git 狀態

## 16.1 Milestone 08

功能：

PUT Transaction API。

已完成：

- 正向測試。
- 六項負向測試。
- 資料完整性驗證。
- Port 問題排除。
- 文件更新。
- Git Commit。
- GitHub Push。

Commit：

`5b3486b`

Commit Message：

`feat: implement PUT transaction API and document tests`

狀態：已提交 GitHub。

## 16.2 Milestone 09

功能：

DELETE Transaction API。

已完成：

- DELETE 路由。
- HTTP 200。
- HTTP 400。
- HTTP 404。
- 測試交易建立。
- 正常刪除。
- 刪除後資料查詢。
- 原有交易保留確認。
- SQLite Integrity Check。
- SQLite Foreign Key Check。
- 預設分類確認。
- 主要排錯過程記錄。

尚待：

- 三份文件最終檢查。
- Git Diff。
- Git Commit。
- GitHub Push。
- 遠端 Repository 確認。
- Working Tree Clean 確認。

截至此文件整理時，Milestone 09 尚未取得新的 Commit SHA。

不得在提交成功前標示為已同步 GitHub。

---

# 十七、測試總結

截至 2026-11-10，Money Tracker 已完成基本後端 CRUD 功能。

目前已確認：

- GET 可查詢交易。
- POST 可新增交易。
- PUT 可修改交易。
- DELETE 可刪除交易。
- 不合法輸入會被拒絕。
- 不存在交易有對應錯誤回應。
- POST 新增資料可持久化保存。
- PUT 負向測試沒有破壞原有交易。
- DELETE 正常刪除指定交易。
- DELETE 沒有影響本次保留的原有交易。
- SQLite Integrity Check 通過。
- SQLite Foreign Key Check 通過。
- 八個預設分類保持完整。

目前 POST、PUT、DELETE 三組既定主要測試合計十九項均符合預期。

但仍有未執行的邊界值、資料庫故障及整合測試。

因此：

**目前可確認基本後端 CRUD 的主要功能驗證成功，但不能宣稱整套 Money Tracker 已完成全面驗收。**

---

# 十八、測試文件維護規範

每次開發新功能後，依序：

1. 記錄功能名稱。
2. 記錄 Endpoint。
3. 記錄測試日期。
4. 建立 Test ID。
5. 記錄 Request。
6. 記錄預期 HTTP Status。
7. 執行正向測試。
8. 執行負向測試。
9. 記錄實際 Response。
10. 驗證資料完整性。
11. 標示 PASS、FAIL 或 NOT RUN。
12. 更新測試統計。
13. 保留排錯歷程。
14. 更新 CHANGELOG.md。
15. 更新 DEVELOPMENT_LOG.md。
16. 更新 TESTING.md。
17. 執行 Git 差異檢查。
18. 完成 Git Commit。
19. 完成 GitHub Push。
20. 記錄實際 Commit SHA。

維護原則：

- 不刪除重要歷史測試。
- 不將未執行案例標示為 PASS。
- 不將預期結果視為實際結果。
- 不將基本測試等同於完整驗收。
- 不編造 HTTP Status。
- 不編造 Commit SHA。
- 不在提交前宣稱 GitHub 已更新。
- 不將本機資料庫提交至公開 Repository。
- 後續重新測試失敗時，應另外記錄新的 FAIL 與修復歷程。
- 保留可重現的測試指令。
- 文件應與當前程式功能一致。

本文件將隨 Money Tracker 專案開發進度持續增加測試紀錄。

後續 Milestone 10 將開始前端 CRUD 整合，並新增對應 UI 與 API 整合測試。
