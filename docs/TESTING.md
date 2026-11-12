# Money Tracker｜完整測試報告（TESTING REPORT）

本文件記錄 Money Tracker 個人財務管理系統從專案初始化至目前開發階段的實際測試歷程，包括開發環境、REST API、SQLite 資料庫、輸入驗證、資料持久化、前端操作、Dashboard 計算、錯誤處理、問題排除及版本驗證。

本報告採持續累積方式維護。測試紀錄應包含可識別的測試案例、前置條件、輸入資料、預期結果、實際結果與測試判定。

已完成的歷史測試應予保留。尚未執行的測試不得標示為 PASS；已實作的錯誤處理程式，也不得直接視為所有錯誤情境均已通過測試。

## 最新測試狀態｜2026-11-12

- **專案名稱：** Money Tracker
- **目前開發階段：** Milestone 11-4｜Documentation & Version Control
- **最新測試範圍：** Milestone 11-1～11-3
- **主要功能測試：** PASS
- **REST API 最終資料查詢：** PASS
- **SQLite Integrity Check：** PASS
- **SQLite Foreign Key Check：** PASS
- **完整自動化回歸測試：** 尚未完成
- **完整系統驗收：** 尚未完成
- **最終文件與 Git Diff 檢查：** 尚待完成
- **前一已提交版本：** `d4148f1`（Milestone 10-4）
- **Milestone 11 Git Commit：** 尚未建立
- **Milestone 11 GitHub Push：** 尚未執行
- **正式 Release：** 尚未發布

### Milestone 11 主要測試成果

1. 每月收入、支出及淨額計算。
2. 收支分類切換與分類占比。
3. 單分類及多分類環形圖。
4. 收入與支出比較圖。
5. 最近六個月收支趨勢。
6. 跨年度月份排列。
7. 無交易月份的零值處理。
8. 新增交易後統計更新。
9. 修改金額及交易日期後統計更新。
10. 刪除交易後統計恢復。
11. 專用測試交易清理。
12. REST API 與 SQLite 最終資料核對。

### 測試紀錄說明

完整 Milestone 11 測試案例記載於本文件第二十九章。

已實際執行並符合預期的項目記錄為 PASS。
尚未執行的異常、效能、相容性及自動化測試記錄為 NOT RUN。

主要功能測試通過不代表完整系統驗收完成。

以下原有文件資訊及版本對應屬於 Milestone 10-3 時點的歷史快照，並非本專案目前的最新狀態。

---

## 歷史文件資訊｜2026-11-11（Milestone 10-3 時點）

- 專案名稱：Money Tracker
- 中文名稱：個人財務管理系統
- 開發起始日期：2026-11-09
- 最後整理日期：2026-11-11
- 目前測試階段：Milestone 10-3｜Frontend Edit Transaction
- 目前整體狀態：基本後端 CRUD 與前端查詢、新增、編輯的既定主要測試已完成
- 完整自動化回歸測試：尚未完成
- 完整系統驗收：尚未完成
- GitHub 正式 Release：尚未發布

## 當時版本與測試對應｜Milestone 10-3

| 開發階段       | Commit    | 測試狀態                    |
| -------------- | --------- | --------------------------- |
| Milestone 01   | `1798256` | 基本環境驗證完成            |
| Milestone 02   | `23e6afe` | Express、Health API 通過    |
| Milestone 03   | `fe6cd52` | 前端首頁通過                |
| Milestone 04   | `d654756` | Dashboard 靜態版面通過      |
| Milestone 05   | `eacbbb8` | SQLite 初始化與結構驗證通過 |
| Milestone 06   | `703b3f6` | Categories API 通過         |
| Milestone 07   | `8c5b850` | GET、POST 主要測試通過      |
| Milestone 08   | `5b3486b` | PUT 主要測試通過            |
| Milestone 09   | `5900b30` | DELETE 主要測試通過         |
| Milestone 10-1 | `fd2967f` | Dashboard 動態整合通過      |
| Milestone 10-2 | `bb18c64` | 前端新增交易既定測試通過    |
| Milestone 10-3 | 尚未取得  | 本機功能與既定測試完成      |

Milestone 10-3 尚待執行 Git Commit 與 GitHub Push。

本報告不宣稱目前尚未提交的本機前端修改已同步至 GitHub。

---

# 一、測試基本資訊

## 1.1 測試環境

| 項目              | 內容                        |
| ----------------- | --------------------------- |
| 專案名稱          | Money Tracker               |
| 專案性質          | 本機單人全端網頁應用        |
| 作業系統          | Windows                     |
| 開發工具          | Visual Studio Code          |
| Node.js           | v24.15.0（首次環境檢查）    |
| 後端框架          | Express                     |
| 前端技術          | HTML、CSS、JavaScript       |
| 資料庫            | SQLite                      |
| SQLite 模組       | node:sqlite                 |
| 資料庫介面        | DatabaseSync                |
| API 風格          | REST API                    |
| 資料交換格式      | JSON                        |
| API 測試工具      | PowerShell、curl.exe        |
| 前端測試瀏覽器    | Microsoft Edge              |
| API Base URL      | http://localhost:3000       |
| 本機專案路徑      | C:\Projects\Money-Tracker   |
| GitHub Repository | Chiou-Jiakang/Money-Tracker |

首次環境檢查版本：

- Node.js：v24.15.0。
- npm：11.12.1。
- Git：2.54.0.windows.1。

以上是初始開發時的環境快照，不代表後續軟體版本不會改變。

## 1.2 測試目標

驗證系統是否能：

1. 正常啟動 Express。
2. 正常提供靜態網頁。
3. 正常回傳 Health API。
4. 正確查詢交易分類。
5. 正確查詢交易紀錄。
6. 正常新增交易。
7. 正常修改交易。
8. 正常刪除交易。
9. 拒絕不合法交易資料。
10. 正確處理不存在的交易。
11. 保留有效資料。
12. 維持 SQLite 完整性。
13. 維持外鍵參照完整性。
14. 在伺服器重啟後保存交易。
15. 避免新功能破壞既有功能。
16. 從前端讀取真實交易。
17. 正確計算 Dashboard。
18. 從前端新增交易。
19. 從前端編輯交易。
20. 取消編輯時不修改資料。
21. 阻擋不合法金額。
22. 正確處理 API 失敗。
23. 避免連線失敗時誤報修改成功。
24. 確認交易異動後畫面與資料庫一致。
25. 確認 Git 提交前的基本程式品質。

## 1.3 測試範圍

已完成主要驗證的範圍：

- Express Server。
- Health API。
- 前端靜態檔案。
- SQLite 初始化。
- SQLite Schema。
- SQLite Foreign Key。
- SQLite Integrity Check。
- SQLite Foreign Key Check。
- Git 資料庫忽略規則。
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
- Dashboard 靜態版面。
- Dashboard 動態資料載入。
- Dashboard 本月收支計算。
- 最近交易動態列表。
- 前端新增交易。
- 前端編輯交易。
- 前端取消編輯。
- 前端零元輸入阻擋。
- 前端小數輸入阻擋。
- API 連線失敗提示。
- 測試資料恢復。
- JavaScript 基本語法檢查。
- Git 差異格式檢查。

尚未全面完成：

- 完整自動化回歸測試。
- 全部輸入邊界值。
- 全部資料庫故障情境。
- 前端刪除交易。
- 完整前端 CRUD 驗收。
- 跨月份財務統計驗證。
- 大量交易效能測試。
- 財務分析圖表測試。
- 日期及分類篩選測試。
- CSV 匯出測試。
- 完整安全性測試。
- 行動裝置完整測試。
- 正式系統驗收。

## 1.4 測試結果定義

| 狀態    | 定義                       |
| ------- | -------------------------- |
| PASS    | 已執行，實際結果符合預期   |
| FAIL    | 已執行，實際結果不符合預期 |
| NOT RUN | 尚未執行                   |
| BLOCKED | 因環境或依賴問題無法完成   |
| PARTIAL | 僅完成部分驗證             |

測試狀態應以實際執行結果為準。

若測試最初失敗、修復後成功，應保留原始錯誤及修復紀錄，並清楚標示最終結果。

## 1.5 測試紀錄欄位

每個主要測試盡可能包含：

- Test ID。
- Milestone。
- 測試目的。
- 測試日期。
- 測試環境。
- 前置條件。
- HTTP Method。
- API Endpoint。
- Request Body。
- 操作步驟。
- 預期 HTTP Status。
- 預期 Response。
- 實際 HTTP Status。
- 實際 Response。
- 畫面變化。
- 資料庫變化。
- 測試判定。
- 已知限制。

沒有實際取得的資料，不應自行填入假定數值。

## 1.6 測試分層

本專案主要區分以下測試層次。

### Backend API Test

直接使用 PowerShell 或 curl.exe 呼叫 Express。

主要檢查：

- HTTP Status。
- JSON Response。
- 輸入驗證。
- 交易 CRUD。
- 錯誤處理。

### Database Verification

透過 GET API、SQLite 查詢或 `check-db.js` 確認：

- 資料存在。
- 資料更新。
- 資料刪除。
- 其他資料完整。
- 外鍵沒有違規。
- 資料庫完整性正常。

### Frontend UI Test

直接使用瀏覽器操作：

- 表單。
- 按鈕。
- 下拉選單。
- 編輯模式。
- 取消操作。
- 輸入驗證提示。

### Frontend–Backend Integration Test

透過網頁操作，讓 JavaScript 呼叫後端 API。

主要檢查：

- 請求成功。
- 資料保存。
- Dashboard 更新。
- 最近交易更新。
- 操作失敗提示。

### Persistence Test

重新啟動伺服器或重新載入網頁，確認原本已保存的交易仍然存在。

### Error Recovery Test

模擬伺服器不可用等情境，確認前端不會誤判操作成功。

不同測試層次不能互相取代。

例如，瀏覽器阻擋零元金額，不代表該次請求已經測試到後端 HTTP 400；後端 HTTP 400 須另外直接測試。

## 1.7 測試資料管理

本專案目前使用本機 SQLite 交易資料進行測試。

歷史測試資料：

- ID 1：原始新增交易。
- ID 2：DELETE API 專用暫時交易。
- ID 3：前端新增與編輯交易測試。

其中 ID 2 已於 Milestone 09 刪除。

ID 3 於 Milestone 10-2 建立，並在 Milestone 10-3 修改。

交易 ID 由資料庫產生，不應假設未來所有環境都一定使用相同 ID。

## 1.8 測試資料保護原則

- 刪除測試使用專用交易。
- 測試前確認交易 ID。
- 避免直接刪除既有重要資料。
- 修改後使用 GET 驗證。
- 刪除後使用 GET 驗證。
- 不合法輸入不應改動資料。
- 測試後確認原始資料完整。
- 不將私人 SQLite 資料庫公開提交。
- 正式使用前應規劃資料備份方式。

---

# 二、基礎環境與 Health API

## 2.1 ENV-01｜Express 啟動

### 測試目的

確認 Node.js 可以啟動 Money Tracker 的 Express Server。

### 測試指令

```powershell
cd C:\Projects\Money-Tracker
npm start
```

### 預期結果

Express 啟動。

監聽 Port 3000。

### 實際結果

伺服器輸出：

`Money Tracker server running at http://localhost:3000`

### 判定

PASS。

## 2.2 ENV-02｜Health API

### Endpoint

`GET /api/health`

### 測試指令

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/health"
```

### 預期結果

- HTTP 200。
- status 為 ok。
- message 正確。

### 實際 Response

```json
{
  "status": "ok",
  "message": "Money Tracker API is running"
}
```

### 判定

PASS。

## 2.3 ENV-03｜HTTP 連線測試

### 測試目的

確認瀏覽器及 PowerShell 能與本機 Express 通訊。

### 實際結果

- Microsoft Edge 可以連接 localhost:3000。
- PowerShell 可以呼叫 API。
- Express 可以回傳 JSON。
- 伺服器停止時，HTTP 請求無法正常連線。

### 判定

PASS。

## 2.4 ENV-04｜前端靜態檔案測試

### 測試網址

`http://localhost:3000`

### 預期

- HTML 正常載入。
- CSS 正常載入。
- 網頁標題正確。
- 深色主題顯示正常。

### 實際

- Money Tracker 標題正常。
- 個人財務管理系統副標題正常。
- 深色背景正常。
- Dashboard 區塊正常。

### 判定

PASS。

## 2.5 ENV-05｜伺服器與測試終端機分工

### 測試目的

確認可以使用不同 PowerShell 終端機進行開發與測試。

### 測試方式

PowerShell 1：

執行 npm start。

PowerShell 2：

執行 API 測試。

### 實際結果

伺服器保持運作時，測試終端機可以成功發送 Request。

### 判定

PASS。

## 2.6 ENV-06｜Port 監聽確認

### 測試指令

```powershell
Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue |
    Select-Object LocalAddress, LocalPort, OwningProcess
```

### 用途

確認指定 Port 是否仍有程序監聽。

### 實際應用

已在 PUT、DELETE 路由排錯及前端連線失敗測試中使用。

### 判定

PASS。

注意：此測試反映檢查當下的 Port 狀態，不代表永久監聽狀態。

---

# 三、SQLite 資料庫測試

## 3.1 DB-01｜資料庫初始化

### 測試指令

```powershell
node server/init-db.js
```

### 首次實際結果

- Database initialized successfully。
- Categories：8。
- Transactions：0。

### 判定

PASS。

上述零筆交易為首次初始化快照，不代表目前資料庫沒有交易。

## 3.2 DB-02｜Categories Table

### 測試項目

`PRAGMA table_info(categories)`

### 實際 Schema

| 欄位 | 型態    | NOT NULL | PK  |
| ---- | ------- | -------- | --- |
| id   | INTEGER | 0        | 1   |
| name | TEXT    | 1        | 0   |
| type | TEXT    | 1        | 0   |

### 判定

PASS。

## 3.3 DB-03｜Transactions Table

### 測試項目

`PRAGMA table_info(transactions)`

### 實際 Schema

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

### 判定

PASS。

## 3.4 DB-04｜Foreign Key

### 測試指令

`PRAGMA foreign_key_list(transactions)`

### 實際結果

- 參照資料表：categories。
- 來源欄位：category_id。
- 參照欄位：id。
- ON UPDATE：NO ACTION。
- ON DELETE：RESTRICT。

### 判定

PASS。

## 3.5 DB-05｜SQLite Integrity Check

### 測試指令

```powershell
node server/check-db.js
```

### 實際結果

`ok`

### 判定

PASS。

## 3.6 DB-06｜SQLite Foreign Key Check

### 測試項目

`PRAGMA foreign_key_check`

### 實際結果

`No foreign key violations`

### 判定

PASS。

## 3.7 DB-07｜預設分類

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

### 實際筆數

8。

### 判定

PASS。

## 3.8 DB-08｜Git 忽略規則

### 指令

```powershell
git check-ignore -v data/money-tracker.db
```

### 實際結果

`.gitignore` 的 `*.db` 規則成功匹配資料庫檔案。

### 判定

PASS。

此結果代表 Git 忽略規則有效，不等於已完成所有資料安全測試。

## 3.9 DB-09｜刪除後資料庫完整性

### 前置條件

Milestone 09 已成功刪除專用測試交易 ID 2。

### 檢查

執行 `node server/check-db.js`。

### 實際結果

- Integrity Check：ok。
- Foreign Key Check：沒有違規。
- 八個預設分類存在。

### 判定

PASS。

## 3.10 DB-10｜完整性檢查範圍

目前已驗證：

- 資料表結構。
- 主鍵。
- 外鍵。
- 預設分類。
- SQLite Integrity Check。
- SQLite Foreign Key Check。

尚未全面驗證：

- 資料庫損壞恢復。
- 唯讀資料庫。
- 權限不足。
- 磁碟空間不足。
- 備份還原。
- 大量資料效能。
- 並行寫入。

以上項目維持 NOT RUN。

---

# 四、GET Categories API

## 4.1 測試目標

確認後端可以從 SQLite 取得交易分類。

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
- 回傳八個分類。
- 收入分類正確。
- 支出分類正確。

## 4.4 實際結果

- success：true。
- count：8。
- income：三個分類。
- expense：五個分類。
- 分類名稱及類型正確。

判定：PASS。

## 4.5 GET-CAT-02｜後續功能相容性

Milestone 10-2 使用 Categories API 建立前端分類選單。

實際結果：

- 可以讀取分類。
- 可以依收支類型顯示對應分類。
- 分類切換符合預期。

判定：PASS。

本測試不代表已完成自訂分類新增、修改或刪除功能。

---

# 五、GET Transactions API

## 5.1 測試目標

確認 API 能查詢 SQLite 交易紀錄。

Endpoint：

`GET /api/transactions`

## 5.2 測試指令

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/transactions" |
    ConvertTo-Json -Depth 5
```

## 5.3 GET-01｜空資料查詢

### 前置條件

首次初始化後尚無交易資料。

### 預期結果

- success：true。
- count：0。
- data：空陣列。

### 實際結果

```json
{
  "success": true,
  "count": 0,
  "data": []
}
```

判定：PASS。

## 5.4 GET-02｜新增後查詢

### 前置條件

POST API 已新增 ID 1。

### 實際結果

- count：1。
- ID 1 存在。
- category_id：4。
- amount：120。
- note：Lunch test。

判定：PASS。

## 5.5 GET-03｜修改後查詢

### 前置條件

PUT API 已修改 ID 1。

### 實際結果

- count：1。
- ID 1 仍存在。
- amount：150。
- note：Updated lunch test。

判定：PASS。

## 5.6 GET-04｜刪除前查詢

### 前置條件

已建立 ID 2 的 DELETE 專用測試交易。

### 實際結果

- count：2。
- ID 1 存在。
- ID 2 存在。

判定：PASS。

## 5.7 GET-05｜刪除後查詢

### 前置條件

DELETE API 已刪除 ID 2。

### 實際結果

- count：1。
- ID 2 消失。
- ID 1 保留。

判定：PASS。

## 5.8 GET-06｜前端新增後查詢

### 前置條件

Milestone 10-2 已從網頁新增交易 ID 3。

### 實際結果

- ID 3 存在。
- 金額 NT$120。
- ID 1 仍存在。
- count：2。

判定：PASS。

## 5.9 GET-07｜前端修改後查詢

### 前置條件

Milestone 10-3 已修改 ID 3。

### 實際結果

- ID 3 金額 NT$180。
- 備註為 Milestone 10-3 edit test。
- ID 1 金額 NT$150。
- 交易數量仍為 2。

判定：PASS。

## 5.10 GET API 回傳格式

API 回傳：

- success。
- count。
- data。

每筆交易包括：

- id。
- category_id。
- category_name。
- type。
- amount。
- transaction_date。
- note。
- created_at。

使用 SQL INNER JOIN 取得分類資訊。

交易依照日期及 ID 降序排序。

既定主要測試：PASS。

---

# 六、POST Transactions API

## 6.1 測試目的

驗證新增交易及非法資料處理。

Endpoint：

`POST /api/transactions`

## 6.2 POST 測試總表

| Test ID | 測試項目   | 預期     | 狀態 |
| ------- | ---------- | -------- | ---- |
| POST-01 | 正常新增   | HTTP 201 | PASS |
| POST-02 | 負數金額   | HTTP 400 | PASS |
| POST-03 | 不存在分類 | HTTP 400 | PASS |
| POST-04 | 不存在日期 | HTTP 400 | PASS |
| POST-05 | 零元金額   | HTTP 400 | PASS |
| POST-06 | 小數金額   | HTTP 400 | PASS |
| POST-07 | 過長備註   | HTTP 400 | PASS |

## 6.3 POST-01｜正常新增

### Request Body

```json
{
  "category_id": 4,
  "amount": 120,
  "transaction_date": "2026-11-09",
  "note": "Lunch test"
}
```

### 預期

- HTTP 201。
- success true。
- 建立新交易。
- 回傳交易 ID。

### 實際

- success：true。
- id：1。
- category_id：4。
- category_name：餐飲。
- type：expense。
- amount：120。
- transaction_date：2026-11-09。
- note：Lunch test。

判定：PASS。

## 6.4 POST-02｜負數金額

輸入：

`-120`

預期：

HTTP 400。

實際：

HTTP 400。

錯誤訊息：

`Amount must be a positive integer`

判定：PASS。

## 6.5 POST-03｜不存在分類

輸入：

`category_id = 9999`

預期：

HTTP 400。

實際：

HTTP 400。

錯誤訊息：

`Category does not exist`

判定：PASS。

## 6.6 POST-04｜不存在日期

輸入：

`2026-02-30`

預期：

HTTP 400。

實際：

HTTP 400。

錯誤訊息：

`Invalid transaction date`

判定：PASS。

## 6.7 POST-05｜零元金額

輸入：

`0`

預期：

HTTP 400。

實際：

HTTP 400。

錯誤訊息：

`Amount must be a positive integer`

判定：PASS。

## 6.8 POST-06｜小數金額

輸入小數金額。

預期：

HTTP 400。

實際：

HTTP 400。

錯誤訊息：

`Amount must be a positive integer`

判定：PASS。

## 6.9 POST-07｜過長備註

輸入超過 500 個 JavaScript 字串長度單位的備註。

預期：

HTTP 400。

實際：

HTTP 400。

錯誤訊息：

`Note must be a string of at most 500 characters`

判定：PASS。

## 6.10 POST 正向與負向測試結論

已執行：

- 正向案例：1。
- 負向案例：6。

總計：

7。

結果：

- PASS：7。
- FAIL：0。

六項不合法輸入均遭拒絕。

不合法請求未新增額外交易。

## 6.11 POST 資料完整性

完成負向測試後執行：

`GET /api/transactions`

實際交易數量：

1。

確認只有原本有效新增的交易。

判定：PASS。

## 6.12 POST 測試限制

尚未全面測試：

- 所有欄位缺漏組合。
- null Request Body。
- 陣列 Request Body。
- 不合法 JSON。
- 特殊資料型態。
- 超大安全整數邊界。
- 多次連續新增。
- 重複提交。
- 資料庫寫入失敗。

以上不得計入既有七項 PASS。

---

# 七、資料持久化測試

## 7.1 PERSIST-01｜POST 資料持久化

### 目的

確認交易保存於 SQLite，而非僅存在 Express 記憶體。

### 步驟

1. 新增有效交易。
2. GET 確認存在。
3. 停止 Express。
4. 重新啟動 Express。
5. 再次 GET。
6. 比對交易資料。

### 實際結果

重啟前：

- count：1。
- ID 1 存在。

重啟後：

- count：1。
- ID 1 存在。
- 原始交易沒有遺失。

判定：PASS。

## 7.2 PERSIST-02｜前端新增後重新整理

### 階段

Milestone 10-2。

### 操作

使用網頁新增 ID 3。

重新整理瀏覽器。

### 實際結果

- ID 3 仍存在。
- 金額 NT$120。
- 原 ID 1 仍存在。
- 總支出 NT$270。
- 交易總數 2。

判定：PASS。

## 7.3 PERSIST-03｜前端修改後重新整理

### 階段

Milestone 10-3。

### 操作

將 ID 3 從 NT$120 改成 NT$180。

重新整理網頁。

### 實際結果

- ID 3 仍為 NT$180。
- 備註保持更新值。
- ID 1 保留。
- 總支出 NT$330。
- 交易總數 2。

判定：PASS。

## 7.4 持久化驗證結論

已確認：

- 後端新增資料可在伺服器重啟後保留。
- 前端新增資料可在重新整理後重新顯示。
- 前端修改結果可在重新整理後重新顯示。

尚未完成：

- 所有資料庫故障與復原情境。
- 長期大量資料保存測試。
- 備份還原測試。

---

# 八、PUT Transactions API

## 8.1 測試目標

驗證修改既有交易。

Endpoint：

`PUT /api/transactions/:id`

## 8.2 PUT 測試總表

| Test ID | 測試項目   | 預期     | 狀態 |
| ------- | ---------- | -------- | ---- |
| PUT-01  | 正常修改   | HTTP 200 | PASS |
| PUT-02  | 不存在交易 | HTTP 404 | PASS |
| PUT-03  | 零元金額   | HTTP 400 | PASS |
| PUT-04  | 小數金額   | HTTP 400 | PASS |
| PUT-05  | 不存在分類 | HTTP 400 | PASS |
| PUT-06  | 不存在日期 | HTTP 400 | PASS |
| PUT-07  | 過長備註   | HTTP 400 | PASS |

## 8.3 PUT-01｜正常修改

### 修改前

```json
{
  "id": 1,
  "category_id": 4,
  "amount": 120,
  "transaction_date": "2026-11-09",
  "note": "Lunch test"
}
```

### 修改 Request Body

```json
{
  "category_id": 4,
  "amount": 150,
  "transaction_date": "2026-11-09",
  "note": "Updated lunch test"
}
```

### 預期

- HTTP 200。
- success true。
- 原交易被更新。
- ID 不變。
- created_at 不變。

### 實際

- HTTP 200。
- success true。
- Transaction updated successfully。
- amount：150。
- note：Updated lunch test。
- id：1。
- created_at 不變。
- count：1。

判定：PASS。

## 8.4 PUT 正常測試指令

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

注意：

此為歷史測試範例。

重新執行會操作目前資料庫的 ID 1，執行前必須確認它仍然是預定測試交易。

## 8.5 PUT-02｜不存在交易

請求：

`PUT /api/transactions/9999`

預期：

HTTP 404。

實際：

HTTP 404。

錯誤訊息：

`Transaction not found`

判定：PASS。

## 8.6 PUT-03｜零元金額

輸入：

`0`

實際：

HTTP 400。

錯誤訊息：

`Amount must be a positive integer`

判定：PASS。

## 8.7 PUT-04｜小數金額

輸入小數金額。

實際：

HTTP 400。

錯誤訊息：

`Amount must be a positive integer`

判定：PASS。

## 8.8 PUT-05｜不存在分類

輸入：

`category_id = 9999`

實際：

HTTP 400。

錯誤訊息：

`Category does not exist`

判定：PASS。

## 8.9 PUT-06｜不存在日期

輸入：

`2026-02-30`

實際：

HTTP 400。

錯誤訊息：

`Invalid transaction date`

判定：PASS。

## 8.10 PUT-07｜過長備註

輸入超過 500 個 JavaScript 字串長度單位的備註。

實際：

HTTP 400。

錯誤訊息：

`Note must be a string of at most 500 characters`

判定：PASS。

## 8.11 PUT 測試結論

- 正常修改成功。
- 不存在 ID 回傳 404。
- 五項不合法交易資料回傳 400。
- 修改交易沒有新增額外紀錄。
- 原有 ID 保持不變。

既定七項測試：

7 PASS。

---

# 九、PUT 資料完整性驗證

## 9.1 測試目標

確認非法 PUT Request 不會破壞原交易。

## 9.2 測試流程

1. 完成正常修改。
2. 確認更新成功。
3. 執行不存在 ID 測試。
4. 執行五項非法資料測試。
5. 再次 GET。
6. 比對原交易。

## 9.3 實際結果

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

## 9.4 驗證表

| 項目       | 預期               | 實際 | 狀態 |
| ---------- | ------------------ | ---- | ---- |
| 交易數量   | 1                  | 1    | PASS |
| 交易 ID    | 1                  | 1    | PASS |
| 分類 ID    | 4                  | 4    | PASS |
| 金額       | 150                | 150  | PASS |
| 備註       | Updated lunch test | 相同 | PASS |
| created_at | 不變               | 不變 | PASS |

## 9.5 結論

- 不存在交易遭拒絕。
- 無效交易資料遭拒絕。
- ID 1 仍存在。
- 金額及備註保持正確。
- 沒有新增額外交易。

判定：PASS。

---

# 十、PUT 路由問題排除與回歸測試

## 10.1 初次問題

執行：

`PUT /api/transactions/1`

Express 回傳：

`Cannot PUT /api/transactions/1`

## 10.2 原始碼檢查

使用 Select-String 搜尋 `app.put()`。

確認原始碼有 PUT 路由。

執行：

`node --check server/server.js`

沒有基本 JavaScript 語法錯誤。

## 10.3 Port 3000 檢查

使用 Get-NetTCPConnection。

發現 Port 3000 有 Node.js 程序。

當時 PID：

9440。

CommandLine：

`node server/server.js`

## 10.4 Port 3001 對照測試

設定：

`$env:PORT = "3001"`

啟動 Express。

實際結果：

- Health API 成功。
- PUT API 成功。
- GET API 成功。

## 10.5 恢復 Port 3000

停止已確認的舊程序。

停止 Port 3001 測試伺服器。

重新啟動 Port 3000。

結果：

- GET 成功。
- PUT 成功。
- 資料更新正確。
- 交易數量仍為 1。

## 10.6 回歸測試總表

| Test ID | 測試項目            | 狀態 |
| ------- | ------------------- | ---- |
| REG-01  | PUT 路由存在        | PASS |
| REG-02  | JavaScript 語法檢查 | PASS |
| REG-03  | Port 3001 Health    | PASS |
| REG-04  | Port 3001 PUT       | PASS |
| REG-05  | Port 3001 GET       | PASS |
| REG-06  | Port 3000 GET       | PASS |
| REG-07  | Port 3000 PUT       | PASS |

## 10.7 原因分析

最可能的原因是舊 Node.js 程序未載入新版 PUT 路由。

此原因依程序檢查與重新啟動結果推定，未直接驗證舊程序記憶體內容。

---

# 十一、Dashboard 靜態前端測試

本章保留 Milestone 03～04 的歷史測試。

當時尚未實作動態 API 整合。

## 11.1 靜態測試案例

| Test ID | 測試項目           | 當時狀態     |
| ------- | ------------------ | ------------ |
| UI-01   | 首頁顯示           | PASS         |
| UI-02   | CSS 載入           | PASS         |
| UI-03   | 深色主題           | PASS         |
| UI-04   | 收入卡片           | PASS         |
| UI-05   | 支出卡片           | PASS         |
| UI-06   | 淨額卡片           | PASS         |
| UI-07   | 最近交易表格       | PASS         |
| UI-08   | 空資料提示         | PASS         |
| UI-09   | Dashboard 動態更新 | 當時 NOT RUN |
| UI-10   | 前端新增交易       | 當時 NOT RUN |
| UI-11   | 前端修改交易       | 當時 NOT RUN |
| UI-12   | 前端刪除交易       | 當時 NOT RUN |

## 11.2 當時已完成

- HTML 首頁。
- CSS 深色主題。
- 財務卡片。
- 最近交易列表。
- 空資料提示。

## 11.3 後續進度更新

原本尚未實作的功能：

- UI-09 已於 Milestone 10-1 實作並驗證主要情境。
- UI-10 已於 Milestone 10-2 實作並驗證主要情境。
- UI-11 已於 Milestone 10-3 實作並驗證主要情境。
- UI-12 前端刪除交易仍未完成。

歷史測試狀態保留，不應用目前結果改寫過去的執行時間點。

---

# 十二、Milestone 09｜DELETE API 測試

測試期間：

2026-11-09 至 2026-11-10。

Endpoint：

`DELETE /api/transactions/:id`

對應 Commit：

`5900b30`

## 12.1 測試目標

確認 API 能：

1. 拒絕不合法交易 ID。
2. 正常刪除指定交易。
3. 正確處理不存在交易。
4. 回傳 JSON。
5. 保留其他交易。
6. 維持 SQLite 完整性。

## 12.2 測試案例

| Test ID   | 測試項目      | 預期結果             | 狀態 |
| --------- | ------------- | -------------------- | ---- |
| DELETE-01 | 不合法 ID     | HTTP 400             | PASS |
| DELETE-02 | 正常刪除      | HTTP 200             | PASS |
| DELETE-03 | 刪除後驗證    | ID 2 消失，ID 1 保留 | PASS |
| DELETE-04 | 重複刪除      | HTTP 404             | PASS |
| DELETE-05 | SQLite 完整性 | 無違規               | PASS |

## 12.3 DELETE-ROUTE｜路由載入問題

第一次執行：

```powershell
curl.exe -i -X DELETE "http://localhost:3000/api/transactions/abc"
```

實際結果：

HTTP 404。

Body：

`Cannot DELETE /api/transactions/abc`

Content-Type：

text/html。

這不是預期的 API 驗證回應。

排查：

1. 確認 app.delete。
2. 確認路由位置。
3. 執行 node --check。
4. 檢查 Port 3000。
5. 檢查 Port 3001。
6. 確認 Node.js 程序。
7. 停止已確認舊程序。
8. 重新啟動 Express。
9. 再次發送 Request。

最終成功取得 HTTP 400 JSON。

路由修復後驗證：PASS。

## 12.4 DELETE-01｜不合法交易 ID

### Request

`DELETE /api/transactions/abc`

### 預期

- HTTP 400。
- success false。
- Invalid transaction ID。

### 實際

HTTP 400 Bad Request。

```json
{
  "success": false,
  "message": "Invalid transaction ID"
}
```

判定：PASS。

## 12.5 DELETE 測試資料準備

為避免誤刪 ID 1，先透過 POST 建立專用資料。

### Request Body

```json
{
  "category_id": 4,
  "amount": 123,
  "transaction_date": "2026-11-10",
  "note": "DELETE API temporary test"
}
```

### 實際 POST 結果

- success：true。
- Transaction created successfully。
- id：2。
- 分類：餐飲。
- 類型：expense。
- amount：123。
- transaction_date：2026-11-10。
- note：DELETE API temporary test。
- created_at：2026-11-09 16:29:38。

測試資料準備成功。

## 12.6 刪除前查詢

執行：

`GET /api/transactions`

### 實際結果

- success：true。
- count：2。

| ID  | 分類 | 金額 | 日期       | 備註                      |
| --- | ---- | ---: | ---------- | ------------------------- |
| 2   | 餐飲 |  123 | 2026-11-10 | DELETE API temporary test |
| 1   | 餐飲 |  150 | 2026-11-09 | Updated lunch test        |

判定：PASS。

## 12.7 DELETE-02｜正常刪除

### Request

`DELETE /api/transactions/2`

### 指令

```powershell
curl.exe -i -X DELETE "http://localhost:3000/api/transactions/2"
```

### 預期

- HTTP 200。
- success true。
- Transaction deleted successfully。
- data.id：2。

### 實際

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

判定：PASS。

## 12.8 DELETE-03｜刪除後資料驗證

### 目的

確認 ID 2 已刪除，ID 1 保留。

### 查詢指令

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/transactions" |
    ConvertTo-Json -Depth 5
```

### 實際結果

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

### 驗證

- count 由 2 變成 1。
- ID 2 不存在。
- ID 1 保留。
- ID 1 分類不變。
- ID 1 金額 NT$150。
- ID 1 日期不變。
- ID 1 備註不變。
- ID 1 建立時間不變。

PowerShell 自動驗證：

`PASS: DELETE API data integrity verified`

判定：PASS。

## 12.9 DELETE-04｜重複刪除

### Request

`DELETE /api/transactions/2`

### 預期

HTTP 404。

### 實際

HTTP 404 Not Found。

```json
{
  "success": false,
  "message": "Transaction not found"
}
```

判定：PASS。

## 12.10 DELETE-05｜SQLite 完整性

### 指令

```powershell
node server/check-db.js
```

### 檢查項目

- Categories Table。
- Transactions Table。
- Primary Key。
- Foreign Key。
- Integrity Check。
- Foreign Key Check。
- Default Categories。

### 實際結果

Integrity Check：

`ok`

Foreign Key Check：

`No foreign key violations`

其他：

- Categories Schema 正常。
- Transactions Schema 正常。
- Foreign Key 正常。
- 八個預設分類存在。

判定：PASS。

## 12.11 刪除前後比較

| 項目              | 刪除前             | 刪除後 | 狀態 |
| ----------------- | ------------------ | ------ | ---- |
| 交易總數          | 2                  | 1      | PASS |
| ID 2              | 存在               | 不存在 | PASS |
| ID 1              | 存在               | 存在   | PASS |
| ID 1 金額         | 150                | 150    | PASS |
| ID 1 備註         | Updated lunch test | 相同   | PASS |
| Integrity Check   | 正常               | 正常   | PASS |
| Foreign Key Check | 無違規             | 無違規 | PASS |

## 12.12 DELETE 主要測試總結

執行：

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

## 12.13 DELETE 尚未完成的測試

| Test ID   | 測試項目           | 狀態    |
| --------- | ------------------ | ------- |
| DELETE-06 | ID 為 0            | NOT RUN |
| DELETE-07 | ID 為負數          | NOT RUN |
| DELETE-08 | ID 為小數          | NOT RUN |
| DELETE-09 | ID 超過安全整數    | NOT RUN |
| DELETE-10 | 特殊 URL 輸入      | NOT RUN |
| DELETE-11 | 資料庫故障         | NOT RUN |
| DELETE-12 | 完整 CRUD 自動回歸 | NOT RUN |
| DELETE-13 | 前端刪除介面       | NOT RUN |
| DELETE-14 | 大量資料效能       | NOT RUN |

這些項目不計入已通過的五個主要案例。

---

# 十三、DELETE API 問題排除紀錄

## 13.1 初次 Cannot DELETE

初次 Request：

`DELETE /api/transactions/abc`

Express 回傳：

HTTP 404。

Body：

`Cannot DELETE /api/transactions/abc`

此回應不是 API 預期的 ID 驗證訊息。

## 13.2 原始碼驗證

指令：

```powershell
Select-String -Path .\server\server.js -Pattern 'app\.delete\(', 'app\.listen\('
```

當時本機結果：

- app.delete：第 405 行。
- app.listen：第 456 行。

DELETE 路由位於 app.listen 之前。

上述行數僅適用當時檔案版本。

## 13.3 JavaScript 語法檢查

指令：

```powershell
node --check server/server.js
```

未發現基本語法錯誤。

此結果不代表路由已被執行中的伺服器載入。

## 13.4 Port 監聽檢查

當時結果：

| Port | PID   | 程序     |
| ---- | ----- | -------- |
| 3000 | 13460 | node.exe |
| 3001 | 14724 | node.exe |

CommandLine：

`node server/server.js`

這些 PID 僅代表當次排錯程序。

## 13.5 停止已確認程序

當時執行：

`Stop-Process -Id 13460,14724`

再次確認：

Port 3000、3001 沒有原本的監聽程序。

## 13.6 停止後連線失敗

立即執行 curl。

結果：

`curl: (7) Failed to connect`

原因：

當時沒有伺服器在目標 Port 監聽。

這與 HTTP 404 是不同情況。

## 13.7 恢復 Express

重新執行：

`npm start`

結果：

Express 成功於 Port 3000 啟動。

## 13.8 修復後測試

再次執行：

`DELETE /api/transactions/abc`

結果：

HTTP 400。

```json
{
  "success": false,
  "message": "Invalid transaction ID"
}
```

DELETE 路由載入成功。

## 13.9 原因分析

可能原因：

舊 Node.js 程序仍在執行，未載入新版 DELETE 路由。

此推論依程序狀態及重啟後測試結果提出，未直接檢驗舊程序記憶體。

## 13.10 學習成果

- Express 預設 404。
- API 自訂錯誤回應。
- HTTP 404 與 TCP 連線失敗。
- Port。
- PID。
- Node.js Process。
- 程式更新與程序載入。
- PowerShell 排錯。
- 專用測試資料。
- 資料完整性驗證。

---

# 十四、Milestone 10-1｜Dashboard 動態整合測試

對應 Commit：

`fd2967f`

Commit Message：

`feat: integrate dashboard with transactions API`

## 14.1 測試目標

確認前端可以從 GET API 讀取 SQLite 交易資料。

並正確顯示：

- 本月總收入。
- 本月總支出。
- 本月淨額。
- 最近交易。
- 交易總筆數。

## 14.2 前置條件

- Express 正常運作。
- GET /api/transactions 正常。
- SQLite 已存在測試交易。
- 前端 JavaScript 正常載入。

## 14.3 DYN-01｜交易資料載入

### 操作

開啟 Money Tracker。

### 預期

前端透過 Fetch API 取得交易資料。

### 實際

成功載入 ID 1 的交易。

判定：PASS。

## 14.4 DYN-02｜本月收入

### 測試資料

當月沒有收入交易。

### 預期

NT$0。

### 實際

NT$0。

判定：PASS。

## 14.5 DYN-03｜本月支出

### 測試資料

ID 1：

- 類型：expense。
- 分類：餐飲。
- 金額：NT$150。

### 預期

NT$150。

### 實際

NT$150。

判定：PASS。

## 14.6 DYN-04｜收支淨額

### 計算

收入 0。

支出 150。

淨額：

0 - 150 = -150。

### 預期

-NT$150。

### 實際

-NT$150。

判定：PASS。

## 14.7 DYN-05｜最近交易列表

### 預期

顯示 ID 1。

### 實際

最近交易表格成功顯示：

- 日期。
- 類型。
- 分類。
- 金額。
- 備註。

判定：PASS。

## 14.8 DYN-06｜交易數量

### 預期

當時交易總數為 1。

### 實際

顯示一筆交易。

判定：PASS。

## 14.9 DYN-07｜資料重新載入

### 目的

確認前端不是只有固定寫死的資料。

### 實際依據

Dashboard 成功從已存在的交易 API 顯示 ID 1 及對應金額。

判定：PASS。

## 14.10 Milestone 10-1 測試總表

| Test ID | 測試項目         | 狀態 |
| ------- | ---------------- | ---- |
| DYN-01  | GET API 資料載入 | PASS |
| DYN-02  | 當月收入顯示     | PASS |
| DYN-03  | 當月支出顯示     | PASS |
| DYN-04  | 收支淨額顯示     | PASS |
| DYN-05  | 最近交易列表     | PASS |
| DYN-06  | 交易數量         | PASS |
| DYN-07  | 動態資料整合     | PASS |

## 14.11 尚未全面驗證

| Test ID | 測試項目     | 狀態    |
| ------- | ------------ | ------- |
| DYN-08  | 跨月份組合   | NOT RUN |
| DYN-09  | 大量收入交易 | NOT RUN |
| DYN-10  | 大量支出交易 | NOT RUN |
| DYN-11  | 日期時區邊界 | NOT RUN |
| DYN-12  | 大量交易效能 | NOT RUN |

以上案例未列入已通過的主要測試。

---

# 十五、Milestone 10-2｜前端新增交易測試

對應 Commit：

`bb18c64`

Commit Message：

`feat: implement frontend transaction creation form`

## 15.1 測試目標

驗證使用者可以透過 Money Tracker 網頁新增交易。

不需要手動執行 POST API。

## 15.2 測試前置條件

- Express 運作正常。
- Categories API 正常。
- Transactions API 正常。
- 前端表單已載入。
- 原始交易 ID 1 存在。
- 原始總支出 NT$150。
- 原始交易總數 1。

## 15.3 FRONT-POST-01｜表單顯示

### 操作

開啟 Money Tracker。

### 預期

顯示新增交易表單。

包含：

- 收支類型。
- 分類。
- 金額。
- 日期。
- 備註。
- 新增按鈕。

### 實際

表單正常顯示。

判定：PASS。

## 15.4 FRONT-POST-02｜分類資料載入

### 預期

分類選單由 Categories API 載入資料。

### 實際

分類選單可正常使用。

判定：PASS。

## 15.5 FRONT-POST-03｜正常新增

### 輸入

- 類型：支出。
- 分類：餐飲。
- 金額：120。
- 日期：2026-11-10。
- 備註：Milestone 10-2 frontend test。

### 預期

- 新增成功。
- SQLite 建立交易。
- 前端顯示成功訊息。
- 交易清單增加一筆。
- Dashboard 同步更新。

### 實際

- 新交易 ID：3。
- 新增成功。
- 交易總數由 1 增加至 2。
- 最近交易顯示 NT$120。
- 原 ID 1 保留。

判定：PASS。

## 15.6 FRONT-POST-04｜Dashboard 同步

### 新增前

- 收入：NT$0。
- 支出：NT$150。
- 淨額：-NT$150。

### 新增後

- 收入：NT$0。
- 支出：NT$270。
- 淨額：-NT$270。

### 驗證計算

150 + 120 = 270。

### 實際結果

與預期一致。

判定：PASS。

## 15.7 FRONT-POST-05｜重新整理後資料保留

### 操作

新增成功後重新整理網頁。

### 預期

- ID 3 保留。
- ID 1 保留。
- 交易總數 2。
- 支出 NT$270。

### 實際

符合預期。

判定：PASS。

## 15.8 瀏覽器快捷鍵問題

當時原本使用：

Ctrl + F5。

實際發生筆記型電腦螢幕亮度改變。

無法直接確認是否成功重新整理網頁。

後續改用：

- Ctrl + R。
- 瀏覽器重新整理按鈕。

之後成功完成重新載入驗證。

## 15.9 FRONT-POST-06｜零元金額

### 輸入

`0`

### 預期

阻擋表單送出。

### 實際

瀏覽器顯示最小值限制提示。

原交易數量沒有改變。

判定：PASS。

## 15.10 FRONT-POST-07｜小數金額

### 輸入

`120.5`

### 預期

阻擋不合法金額。

### 實際

瀏覽器顯示數值驗證提示。

交易沒有增加。

判定：PASS。

## 15.11 FRONT-POST-08｜收入分類切換

### 操作

將收支類型切換為收入。

### 預期

顯示收入分類。

### 實際

顯示：

- 薪資。
- 獎金。
- 其他收入。

判定：PASS。

## 15.12 收入分類測試範圍

這個測試驗證的是分類切換。

不代表已完成以下所有情境：

- 實際新增薪資收入。
- 實際新增獎金收入。
- 收入與支出混合後的完整統計。
- 收入新增失敗情況。
- 跨月份收入統計。

以上應列入未來補充測試。

## 15.13 Milestone 10-2 測試總表

| Test ID       | 測試項目       | 狀態 |
| ------------- | -------------- | ---- |
| FRONT-POST-01 | 表單顯示       | PASS |
| FRONT-POST-02 | 分類資料載入   | PASS |
| FRONT-POST-03 | 正常新增       | PASS |
| FRONT-POST-04 | Dashboard 更新 | PASS |
| FRONT-POST-05 | 重新整理後保留 | PASS |
| FRONT-POST-06 | 零元阻擋       | PASS |
| FRONT-POST-07 | 小數阻擋       | PASS |
| FRONT-POST-08 | 收入分類切換   | PASS |

## 15.14 Milestone 10-2 結論

- 前端新增交易已可使用。
- POST API 整合成功。
- Dashboard 同步成功。
- 交易列表同步成功。
- 主要表單驗證通過。
- 重新整理後資料保留。
- Commit 已完成。
- GitHub Push 已完成。

Commit：

`bb18c64`

---

# 十六、Milestone 10-3｜前端編輯交易測試

本章為 2026-11-11 新增的主要測試內容。

功能實作：本機完成。

Git Commit：尚未執行。

GitHub Push：尚未執行。

## 16.1 測試目標

確認使用者可以在網頁：

1. 選擇既有交易。
2. 進入編輯模式。
3. 載入原始資料。
4. 修改交易內容。
5. 儲存修改。
6. 取消編輯。
7. 阻擋無效金額。
8. 查看修改結果。
9. 重新整理後確認資料。
10. 在 API 失敗時取得正確提示。

## 16.2 測試環境

- Windows。
- VS Code。
- Microsoft Edge。
- Node.js。
- Express。
- SQLite。
- PowerShell。

測試網站：

`http://localhost:3000`

## 16.3 測試前置條件

- Express 已啟動。
- Health API 正常。
- GET Transactions 正常。
- PUT Transactions 正常。
- ID 3 已存在。
- ID 1 已存在。
- 最近交易清單顯示兩筆交易。

### 原始資料

| ID  | 金額 | 備註                         |
| --- | ---: | ---------------------------- |
| 3   |  120 | Milestone 10-2 frontend test |
| 1   |  150 | Updated lunch test           |

當時 Dashboard：

- 收入 NT$0。
- 支出 NT$270。
- 淨額 -NT$270。

## 16.4 FRONT-PUT-01｜編輯按鈕

### 測試目的

確認使用者可以進入指定交易的編輯模式。

### 操作

1. 開啟 Money Tracker。
2. 找到 ID 3。
3. 點擊編輯。

### 預期結果

- 進入編輯模式。
- 顯示交易 ID 3。
- 表單載入原始資料。
- 顯示儲存修改。
- 顯示取消編輯。

### 實際結果

符合預期。

判定：PASS。

## 16.5 FRONT-PUT-02｜原始資料預填

### 測試目的

確認進入編輯模式後，表單不是空白或載入錯誤交易資料。

### 預期

- ID：3。
- 類型：expense。
- 分類：餐飲。
- 金額：120。
- 日期：2026-11-10。
- 備註：Milestone 10-2 frontend test。

### 實際

原始資料正確顯示。

判定：PASS。

## 16.6 FRONT-PUT-03｜正常修改

### 測試目的

確認前端可以透過 PUT API 修改 SQLite 既有交易。

### 修改前

- ID：3。
- 金額：120。
- 備註：Milestone 10-2 frontend test。

### 修改後

- ID：3。
- 金額：180。
- 備註：Milestone 10-3 edit test。

其他欄位保持不變。

### 操作

1. 進入 ID 3 編輯模式。
2. 修改金額。
3. 修改備註。
4. 點擊儲存修改。

### 預期結果

- 修改成功。
- ID 保持 3。
- 不新增交易。
- 清單顯示新金額。
- Dashboard 更新。

### 實際結果

- 顯示修改成功。
- ID 3 金額更新為 NT$180。
- 備註更新成功。
- 交易數量維持 2。

判定：PASS。

## 16.7 FRONT-PUT-04｜Dashboard 同步

### 修改前

- 收入 NT$0。
- 支出 NT$270。
- 淨額 -NT$270。

### 修改後

- 收入 NT$0。
- 支出 NT$330。
- 淨額 -NT$330。

### 計算驗證

180 + 150 = 330。

0 - 330 = -330。

### 實際結果

符合預期。

判定：PASS。

## 16.8 FRONT-PUT-05｜最近交易同步

### 預期

最近交易 ID 3 顯示：

- 金額 NT$180。
- 備註 Milestone 10-3 edit test。

ID 1 保持 NT$150。

### 實際

符合預期。

判定：PASS。

## 16.9 FRONT-PUT-06｜重新整理後資料保留

### 操作

重新整理瀏覽器。

### 預期

- ID 3 仍為 NT$180。
- 新備註保留。
- ID 1 保留。
- 總支出 NT$330。
- 交易數量 2。

### 實際

符合預期。

判定：PASS。

## 16.10 FRONT-PUT-07｜取消編輯

### 測試目的

確認使用者放棄編輯時，不會意外修改交易資料。

### 操作

1. 編輯 ID 3。
2. 暫時將金額改成 999。
3. 不點擊儲存修改。
4. 點擊取消編輯。

### 預期

- 返回新增交易模式。
- 不更新 SQLite。
- ID 3 保持 NT$180。
- Dashboard 保持 NT$330。

### 實際

- 顯示取消編輯。
- 原始交易沒有改變。
- 表單恢復新增模式。
- 交易總數不變。

判定：PASS。

## 16.11 FRONT-PUT-08｜零元金額

### 測試目的

確認瀏覽器表單能阻擋零元交易修改。

### 操作

1. 編輯 ID 3。
2. 將金額改為 0。
3. 點擊儲存修改。

### 預期

- 表單阻擋。
- 顯示驗證提示。
- 原金額保持 NT$180。

### 實際

瀏覽器顯示：

`值必須大於或等於 1`

交易資料沒有因該操作改變。

判定：PASS。

### 測試範圍說明

此案例為前端 HTML 表單驗證。

後端 PUT API 的零元 HTTP 400 測試已於 Milestone 08 另外完成。

兩項測試不能混為同一個測試結果。

## 16.12 FRONT-PUT-09｜小數金額

### 測試目的

確認瀏覽器表單能阻擋小數交易金額。

### 操作

1. 編輯 ID 3。
2. 金額輸入 180.5。
3. 點擊儲存修改。

### 預期

- 阻擋小數。
- 不修改交易。
- 原金額仍為 NT$180。

### 實際

瀏覽器提示輸入數值不合法。

提示鄰近有效值：

- 180。
- 181。

交易清單仍顯示 NT$180。

判定：PASS。

## 16.13 FRONT-PUT-10｜不存在交易 ID

### 測試目的

確認後端能處理合法但不存在的交易 ID。

### 測試方式

透過 PowerShell 直接發送 PUT。

### Endpoint

`PUT /api/transactions/9999`

### Request Body

```json
{
  "category_id": 4,
  "amount": 180,
  "transaction_date": "2026-11-10",
  "note": "API error handling test"
}
```

### 預期

HTTP 404。

Response：

Transaction not found。

### 最終實際結果

HTTP Status：

404。

Response：

```json
{
  "success": false,
  "message": "Transaction not found"
}
```

判定：PASS。

### 重要限制

此測試直接驗證後端 API。

不代表已透過前端操作介面完成不存在 ID 的 UI 整合測試。

## 16.14 HTTP Status 0 的初次問題

### 現象

第一次執行 PowerShell 測試，顯示：

`HTTP Status: 0`

`Response:`

### 分析

這不是合法 HTTP Status。

當時沒有取得正常 HTTP Response。

### 後續檢查

Health API 顯示：

無法連接至遠端伺服器。

### 結論

該次測試沒有成功連線，不能判定 PUT API 的 HTTP 404 功能失敗。

## 16.15 測試環境恢復

使用另一個 PowerShell 終端機執行：

```powershell
cd C:\Projects\Money-Tracker
npm start
```

確認 Express 啟動。

使用 Health API 再次確認連線。

結果：

連線恢復正常。

## 16.16 JSON 格式錯誤

### 現象

使用 curl.exe 傳送 JSON 時，Express 顯示：

`SyntaxError: Expected property name or '}' in JSON at position 1`

### 分析

傳送的 JSON 格式不正確。

問題與 PowerShell 外部命令的引號處理有關。

### 修正方式

改用 PowerShell Hashtable 與 ConvertTo-Json。

## 16.17 正式 PUT 404 測試指令

```powershell
$testBody = @{
    category_id = 4
    amount = 180
    transaction_date = "2026-11-10"
    note = "API error handling test"
} | ConvertTo-Json

try {
    $result = Invoke-RestMethod `
        -Uri "http://localhost:3000/api/transactions/9999" `
        -Method Put `
        -ContentType "application/json; charset=utf-8" `
        -Body $testBody `
        -ErrorAction Stop

    Write-Host "FAIL: Unexpected success"
    $result | ConvertTo-Json -Depth 5
}
catch {
    if ($null -ne $_.Exception.Response) {
        Write-Host "HTTP Status:" ([int]$_.Exception.Response.StatusCode)
    } else {
        Write-Host "No HTTP response received"
    }

    Write-Host "Response:" $_.ErrorDetails.Message
}
```

### 實際結果

HTTP Status：404。

Response：

Transaction not found。

判定：PASS。

## 16.18 FRONT-PUT-11｜404 後資料完整性

### 目的

確認不存在 ID 的修改請求不影響其他交易。

### 驗證指令

```powershell
$response = Invoke-RestMethod -Uri "http://localhost:3000/api/transactions"

$response.data |
    Format-Table id, category_name, amount, transaction_date, note
```

### 實際資料

| ID  | 分類 | 金額 | 備註                     |
| --- | ---- | ---: | ------------------------ |
| 3   | 餐飲 |  180 | Milestone 10-3 edit test |
| 1   | 餐飲 |  150 | Updated lunch test       |

### 確認

- ID 3 保留。
- ID 1 保留。
- 交易總數 2。
- 無其他交易遭修改。

判定：PASS。

---

# 十七、Milestone 10-3｜前端連線失敗測試

## 17.1 測試目的

確認 Express Server 停止時，前端可以正確反映 API 連線失敗。

尤其要避免：

- 錯誤顯示修改成功。
- 將尚未成功保存的輸入當成既有交易。
- 錯誤更新 Dashboard。
- 使用者在不知情下誤判資料已儲存。

## 17.2 測試方法

採用控制伺服器停止的方式。

這是本機開發階段的故障情境測試，不是完整網路故障注入測試。

## 17.3 初次測試狀況

原本嘗試透過 Ctrl + C 停止伺服器。

然而網頁仍然可以修改交易。

曾成功將 ID 3：

NT$180 → NT$181。

Dashboard：

NT$330 → NT$331。

## 17.4 初次測試的判定

不能直接判定前端連線失敗處理不正常。

因為當時尚未確認 Express 已完全停止。

後續發現 Port 3000 仍有程序監聽。

因此該次操作不符合預定的測試前置條件。

## 17.5 NET-01｜Port 3000 檢查

### 指令

```powershell
Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue |
    Select-Object LocalAddress, LocalPort, OwningProcess
```

### 實際結果

發現 Port 3000 仍有監聽程序。

PID：

4512。

### 判定

已確認伺服器尚未完全停止。

## 17.6 NET-02｜程序身分確認

### 指令

```powershell
Get-CimInstance Win32_Process -Filter "ProcessId = 4512" |
    Select-Object ProcessId, Name, CommandLine
```

### 實際結果

- ProcessId：4512。
- Name：node.exe。
- CommandLine：node server/server.js。

### 判定

確認程序身分。

## 17.7 NET-03｜停止測試伺服器

### 指令

當次確認程序身分後使用：

`Stop-Process -Id 4512`

### 後續檢查

再次執行 Get-NetTCPConnection。

### 實際結果

Port 3000 沒有監聽程序輸出。

判定：PASS。

注意：

PID 4512 是當次的歷史程序識別碼。

未來不應直接使用此 PID 假設能停止相同伺服器。

## 17.8 NET-04｜正式連線失敗測試

### 前置條件

- Port 3000 沒有監聽程序。
- Express 未重新啟動。
- 原本 Money Tracker 網頁仍已載入。
- 網頁可以操作既有編輯表單。

### 測試前資料

- ID 3：NT$182。
- ID 1：NT$150。
- 總支出：NT$332。
- 淨額：-NT$332。
- 交易總數：2。

### 操作

1. 開啟已載入的 Money Tracker 頁面。
2. 找到 ID 3。
3. 點擊編輯。
4. 將金額從 182 改成 183。
5. 點擊儲存修改。
6. 不重新啟動伺服器。
7. 觀察前端畫面。

### 預期

- 顯示 API 連線失敗。
- 不顯示修改成功。
- 不將 NT$183 當成已保存交易。
- 原交易資料保持不變。

### 實際結果

前端顯示：

`Failed to fetch`

並顯示編輯交易失敗提示。

### 畫面結果

- 編輯表單保留 NT$183。
- 交易列表仍顯示 NT$182。
- Dashboard 仍顯示 NT$332。
- 交易總數仍為 2。

### 判定

PASS。

## 17.9 NET-05｜錯誤訊息確認

### 預期

前端應清楚顯示操作失敗。

### 實際

顯示紅色錯誤提示。

訊息包含 Failed to fetch。

沒有顯示修改成功。

判定：PASS。

## 17.10 NET-06｜編輯資料保留

### 預期

API 失敗後，使用者輸入不應在沒有必要的情況下直接消失。

### 實際

編輯欄位仍保留 NT$183。

判定：PASS。

## 17.11 NET-07｜畫面資料未誤更新

### 預期

失敗操作不應直接將交易列表改成 NT$183。

### 實際

列表仍為 NT$182。

Dashboard 仍為 NT$332。

判定：PASS。

## 17.12 此測試的限制

此次測試證明：

當 Port 3000 沒有提供服務時，前端能夠偵測連線失敗，並且沒有在畫面上誤報修改成功。

尚不能單獨證明：

- 所有網路逾時情境正確。
- 伺服器寫入後、回應前中斷時的處理正確。
- 重複重試不會造成其他問題。
- 資料庫故障一定能正確顯示。
- 所有 HTTP 500 情境均已通過。

這些仍需要另外測試。

---

# 十八、Milestone 10-3｜伺服器恢復與資料還原

## 18.1 RECOVERY-01｜重新啟動 Express

### 指令

```powershell
cd C:\Projects\Money-Tracker
npm start
```

### 預期

Express 成功啟動於 Port 3000。

### 實際

`Money Tracker server running at http://localhost:3000`

判定：PASS。

## 18.2 RECOVERY-02｜恢復測試資料

### 背景

之前為連線失敗測試，暫時將 ID 3 改成 NT$182。

### 操作

伺服器恢復後，重新編輯 ID 3。

金額改回：

180。

備註保持：

Milestone 10-3 edit test。

### 實際

顯示交易 ID 3 修改成功。

判定：PASS。

## 18.3 RECOVERY-03｜交易列表確認

### 預期

| ID  | 金額 | 備註                     |
| --- | ---: | ------------------------ |
| 3   |  180 | Milestone 10-3 edit test |
| 1   |  150 | Updated lunch test       |

### 實際

符合預期。

判定：PASS。

## 18.4 RECOVERY-04｜Dashboard 確認

### 預期

- 本月總收入 NT$0。
- 本月總支出 NT$330。
- 本月淨額 -NT$330。
- 交易總數 2。

### 實際

符合預期。

判定：PASS。

## 18.5 恢復測試結論

- Express 正常恢復。
- 交易可再次修改。
- ID 3 恢復為 NT$180。
- ID 1 完整保留。
- Dashboard 計算正確。
- 交易總數不變。

本階段測試資料恢復成功。

## 18.6 最終資料快照

截至 2026-11-11：

| ID  | 日期       | 類型    | 分類 | 金額 | 備註                     |
| --- | ---------- | ------- | ---- | ---: | ------------------------ |
| 3   | 2026-11-10 | expense | 餐飲 |  180 | Milestone 10-3 edit test |
| 1   | 2026-11-09 | expense | 餐飲 |  150 | Updated lunch test       |

Dashboard：

- 收入 NT$0。
- 支出 NT$330。
- 淨額 -NT$330。

此資料為開發測試快照。

未來實際使用時，金額與交易總數可以不同。

---

# 十九、Milestone 10-3｜Git 與語法檢查

## 19.1 測試目的

在提交程式碼之前，確認：

- Git 偵測到預期變更。
- JavaScript 沒有基本語法錯誤。
- Git Diff 沒有明顯空白格式錯誤。
- 沒有意外執行 Commit。
- 沒有將尚未完成的功能宣稱已 Push。

## 19.2 CODE-01｜Git Status

### 指令

`git status`

### 實際結果

當次顯示：

- public/app.js：modified。
- public/index.html：modified。
- public/style.css：modified。

分支：

main。

當時本機與 origin/main 尚未因本階段建立新的 Commit。

判定：PASS。

## 19.3 CODE-02｜Git Diff Check

### 指令

`git diff --check`

### 實際結果

未顯示空白格式錯誤。

判定：PASS。

## 19.4 CODE-03｜Git Diff Stat

### 指令

`git diff --stat`

### 實際統計

- 3 files changed。
- 284 insertions。
- 442 deletions。

此數字反映當次文字差異。

不代表刪除行數等同於刪除功能數。

## 19.5 CODE-04｜前端 JavaScript 語法

### 指令

`node --check public/app.js`

### 實際結果

未顯示基本語法錯誤。

判定：PASS。

## 19.6 CODE-05｜後端 JavaScript 語法

### 指令

`node --check server/server.js`

### 實際結果

未顯示基本語法錯誤。

判定：PASS。

## 19.7 CODE-06｜LF／CRLF 警告

### 現象

Git 曾顯示：

`LF will be replaced by CRLF`

### 分析

屬於換行格式相關警告。

### 實際狀態

沒有觀察到因此造成 JavaScript 語法錯誤。

目前無須為此重新修改已驗證的功能。

## 19.8 Git 檢查限制

語法檢查不等於程式邏輯正確。

Git Diff Check 不等於完整 Code Review。

目前仍需：

- 更新三份文件。
- 檢查最終差異。
- 檢查實際暫存檔案。
- Commit。
- Push。
- 記錄 SHA。

---

# 二十、Milestone 10-3｜測試案例總結

## 20.1 主要測試總表

| Test ID      | 測試項目         | 狀態   |
| ------------ | ---------------- | ------ |
| FRONT-PUT-01 | 編輯按鈕         | PASS   |
| FRONT-PUT-02 | 原資料預填       | PASS   |
| FRONT-PUT-03 | 正常修改         | PASS   |
| FRONT-PUT-04 | Dashboard 同步   | PASS   |
| FRONT-PUT-05 | 交易清單同步     | PASS   |
| FRONT-PUT-06 | 重新整理後保留   | PASS   |
| FRONT-PUT-07 | 取消編輯         | PASS   |
| FRONT-PUT-08 | 零元輸入阻擋     | PASS   |
| FRONT-PUT-09 | 小數輸入阻擋     | PASS   |
| FRONT-PUT-10 | 後端不存在 ID    | PASS   |
| FRONT-PUT-11 | 404 後資料完整性 | PASS   |
| NET-01       | Port 檢查        | PASS   |
| NET-02       | 程序身分確認     | PASS   |
| NET-03       | 停止伺服器       | PASS   |
| NET-04       | 連線失敗處理     | PASS   |
| NET-05       | 錯誤提示         | PASS   |
| NET-06       | 編輯輸入保留     | PASS   |
| NET-07       | 畫面沒有誤更新   | PASS   |
| RECOVERY-01  | 恢復伺服器       | PASS   |
| RECOVERY-02  | 恢復交易資料     | PASS   |
| RECOVERY-03  | 交易列表確認     | PASS   |
| RECOVERY-04  | Dashboard 確認   | PASS   |
| CODE-01      | Git Status       | PASS   |
| CODE-02      | Git Diff Check   | PASS   |
| CODE-03      | Git Diff Stat    | 已記錄 |
| CODE-04      | 前端語法檢查     | PASS   |
| CODE-05      | 後端語法檢查     | PASS   |

注意：這些包含功能測試、環境診斷、資料恢復及程式碼檢查，不能直接全部視為相互獨立的功能驗收案例。

## 20.2 Milestone 10-3 結論

已完成：

- 編輯交易。
- 原資料載入。
- 正常修改。
- Dashboard 同步。
- 交易清單同步。
- 修改後資料保留。
- 取消編輯。
- 零元阻擋。
- 小數阻擋。
- 後端 HTTP 404。
- 404 後資料完整性。
- 前端連線失敗。
- 錯誤提示。
- 測試資料恢復。
- 基本語法及 Git 差異檢查。

尚未完成：

- 全面自動化回歸測試。
- 完整前端 CRUD 驗收。
- Git Commit。
- GitHub Push。
- 正式 Release。

---

# 二十一、目前主要測試統計

## 21.1 基礎功能

| 測試範圍                 | 結果 |
| ------------------------ | ---- |
| Express Server           | PASS |
| Health API               | PASS |
| 前端靜態檔案             | PASS |
| SQLite Schema            | PASS |
| SQLite Integrity Check   | PASS |
| SQLite Foreign Key Check | PASS |
| 八個預設分類             | PASS |
| Categories GET           | PASS |
| Transactions GET         | PASS |
| Transactions POST        | PASS |
| Transactions PUT         | PASS |
| Transactions DELETE      | PASS |
| POST 資料持久化          | PASS |
| PUT 資料完整性           | PASS |
| DELETE 資料完整性        | PASS |
| Dashboard 動態整合       | PASS |
| 前端新增交易             | PASS |
| 前端編輯交易             | PASS |
| 前端取消編輯             | PASS |
| API 連線失敗提示         | PASS |

上述均為既定主要案例的測試結果，不代表完整系統驗收。

## 21.2 POST API

既定案例：

7。

PASS：

7。

FAIL：

0。

## 21.3 PUT API

既定案例：

7。

PASS：

7。

FAIL：

0。

## 21.4 DELETE API

既定主要案例：

5。

PASS：

5。

FAIL：

0。

## 21.5 後端主要交易 API 測試合計

| API    | 已執行案例 | PASS | FAIL |
| ------ | ---------: | ---: | ---: |
| POST   |          7 |    7 |    0 |
| PUT    |          7 |    7 |    0 |
| DELETE |          5 |    5 |    0 |
| 合計   |         19 |   19 |    0 |

此統計延續原始測試報告的分類。

後續 Milestone 10-1～10-3 的前端測試另外記錄，不直接加到上述 19 項之中，以避免不同測試範圍互相混淆。

---

# 二十二、尚未完成的測試

## 22.1 API 輸入邊界

尚未全面完成：

- 缺少必要欄位。
- Request Body 為 null。
- Request Body 為陣列。
- category_id 為 0。
- category_id 為負數。
- category_id 為字串。
- amount 為字串。
- amount 為超大整數。
- amount 為特殊數值。
- 日期格式錯誤。
- 日期為 null。
- 備註型態錯誤。
- 特殊 Unicode。
- 非法 JSON。
- 錯誤 Content-Type。
- 特殊 URL。
- ID 0。
- 負數 ID。
- 小數 ID。
- 超大 ID。

以上均維持 NOT RUN 或尚未全面驗證。

## 22.2 CRUD 完整回歸

尚待建立可重複執行的完整測試：

1. 建立測試交易。
2. GET 查詢。
3. PUT 修改。
4. GET 確認。
5. DELETE 刪除。
6. GET 確認不存在。
7. GET 確認其他交易完整。
8. SQLite Integrity Check。
9. Foreign Key Check。

目前已分階段完成主要測試，但尚未建立完整自動化回歸套件。

## 22.3 資料庫故障

尚未完成：

- 資料庫檔案不存在。
- 資料庫無法開啟。
- 資料庫唯讀。
- SQL 執行失敗。
- 權限不足。
- 磁碟空間不足。
- 備份及還原。

## 22.4 前端 CRUD

尚未完成：

- 前端刪除交易。
- 刪除前確認。
- 取消刪除。
- 刪除成功訊息。
- 刪除失敗訊息。
- 刪除後 Dashboard 更新。
- 刪除後交易清單更新。
- 刪除後資料持久化。
- 全部前端 CRUD 的完整回歸測試。

## 22.5 Dashboard

尚待：

- 多筆收入。
- 多筆支出。
- 跨月份資料。
- 不同分類組合。
- 當月沒有交易。
- API 失敗。
- 日期時區邊界。
- 大量交易。
- 刪除交易後重算。

## 22.6 財務分析

尚未開始：

- 日期區間統計。
- 分類篩選。
- 月度統計。
- 年度統計。
- SQL GROUP BY。
- SQL SUM 聚合驗證。
- 支出占比。
- 收支趨勢。

## 22.7 CSV 匯出

尚未開始：

- 正常匯出。
- 欄位順序。
- 中文編碼。
- 金額格式。
- 日期格式。
- 空資料匯出。
- 特殊字元。
- 匯出資料一致性。

## 22.8 安全與效能

尚未完成：

- 完整 SQL Injection 測試。
- XSS 測試。
- 大量資料效能。
- 多次連續請求。
- 並發操作。
- 網路逾時。
- 資料庫故障。
- 自動化測試。
- CI 流程。

## 22.9 行動裝置

尚未全面驗證：

- 手機版面。
- 平板版面。
- 表單寬度。
- 表格捲動。
- 按鈕觸控。
- 長文字顯示。

## 22.10 完整系統驗收

正式驗收仍需確認：

- 核心需求已完成。
- 主要使用流程正常。
- 完整 CRUD 可從前端執行。
- 資料庫保存正確。
- 重大錯誤已處理。
- 測試紀錄完整。
- GitHub 版本一致。
- README 正確。
- CHANGELOG 正確。
- DEVELOPMENT_LOG 正確。
- TESTING 正確。

目前尚未完成此項驗收。

---

# 二十三、Milestone 10-4｜前端刪除交易測試規劃

目前狀態：

NOT RUN。

後端 DELETE API 已完成。

前端刪除操作尚未實作。

## 23.1 預計測試項目

| Test ID         | 測試項目               | 狀態    |
| --------------- | ---------------------- | ------- |
| FRONT-DELETE-01 | 刪除按鈕顯示           | NOT RUN |
| FRONT-DELETE-02 | 刪除確認               | NOT RUN |
| FRONT-DELETE-03 | 取消刪除               | NOT RUN |
| FRONT-DELETE-04 | 正常刪除               | NOT RUN |
| FRONT-DELETE-05 | 刪除後列表更新         | NOT RUN |
| FRONT-DELETE-06 | 刪除後 Dashboard 更新  | NOT RUN |
| FRONT-DELETE-07 | 不存在交易處理         | NOT RUN |
| FRONT-DELETE-08 | API 連線失敗           | NOT RUN |
| FRONT-DELETE-09 | 重新整理後確認         | NOT RUN |
| FRONT-DELETE-10 | 其他交易完整性         | NOT RUN |
| FRONT-DELETE-11 | SQLite Integrity Check | NOT RUN |
| FRONT-DELETE-12 | Foreign Key Check      | NOT RUN |

## 23.2 測試資料原則

刪除測試使用專用交易。

不應直接刪除目前 ID 1、ID 3 作為不必要的破壞性測試。

應先新增測試交易，再使用該交易 ID 執行刪除。

## 23.3 驗收條件

- 使用者可以刪除指定交易。
- 使用者可以取消刪除。
- 刪除成功後資料庫正確更新。
- 其他交易不受影響。
- Dashboard 重新計算。
- 交易清單更新。
- API 失敗時顯示錯誤。
- 重新整理後資料一致。
- 完成相關文件與 Git 提交。

所有條件尚待未來實際測試，不標示 PASS。

---

# 二十四、測試結果與 Git 狀態

## 24.1 Milestone 08

功能：

PUT Transaction API。

完成：

- 正向測試。
- 六項負向測試。
- 資料完整性。
- Port 排錯。
- 文件更新。
- Commit。
- Push。

Commit：

`5b3486b`

狀態：

已提交 GitHub。

## 24.2 Milestone 09

功能：

DELETE Transaction API。

完成：

- HTTP 200。
- HTTP 400。
- HTTP 404。
- 專用測試資料。
- 正常刪除。
- 刪除後完整性。
- SQLite 檢查。
- 文件更新。
- Commit。
- Push。

Commit：

`5900b30`

Commit Message：

`feat: implement DELETE transaction API and document tests`

狀態：

已提交 GitHub。

## 24.3 Milestone 10-1

功能：

Dashboard 動態整合。

完成：

- API 資料載入。
- Dashboard 計算。
- 最近交易列表。
- 主要功能測試。
- Commit。
- Push。

Commit：

`fd2967f`

狀態：

已提交 GitHub。

## 24.4 Milestone 10-2

功能：

前端新增交易。

完成：

- 新增表單。
- POST 整合。
- 分類切換。
- 金額驗證。
- Dashboard 同步。
- 持久化測試。
- Commit。
- Push。

Commit：

`bb18c64`

狀態：

已提交 GitHub。

## 24.5 Milestone 10-3

功能：

前端編輯交易。

完成：

- 編輯按鈕。
- 原始資料預填。
- PUT 整合。
- 正常修改。
- Dashboard 同步。
- 取消編輯。
- 零元阻擋。
- 小數阻擋。
- HTTP 404 複驗。
- 連線失敗測試。
- 測試資料恢復。
- 基本 Git 與語法檢查。

尚待：

- 文件最終一致性檢查。
- Git Commit。
- GitHub Push。
- 記錄 Commit SHA。

目前不宣稱已提交 GitHub。

---

# 二十五、測試文件維護規範

## 25.1 新功能測試流程

1. 記錄 Milestone。
2. 記錄測試目的。
3. 設定 Test ID。
4. 記錄前置條件。
5. 記錄測試資料。
6. 記錄 Request。
7. 記錄預期結果。
8. 執行測試。
9. 記錄實際結果。
10. 記錄 HTTP Status。
11. 記錄 API Response。
12. 確認資料庫變化。
13. 確認 Dashboard。
14. 確認其他資料未受影響。
15. 標示 PASS、FAIL、NOT RUN 或 BLOCKED。
16. 記錄已知限制。
17. 更新文件。
18. 檢查 Git 差異。
19. Commit。
20. Push。
21. 記錄 SHA。

## 25.2 測試真實性

- 不將未執行案例標示 PASS。
- 不將預期結果視為實際結果。
- 不編造 HTTP Status。
- 不編造 API Response。
- 不編造 Commit SHA。
- 不將基本測試等同全面驗收。
- 不將語法檢查等同功能測試。
- 不將前端驗證等同後端驗證。

## 25.3 錯誤紀錄

若測試失敗，應記錄：

- 錯誤訊息。
- 發生時間。
- 相關 Port。
- 程序狀態。
- 測試指令。
- 初步推論。
- 排查方式。
- 修復方式。
- 最終測試結果。

推定原因不得直接寫成已確認原因。

## 25.4 資料庫保護

- 不公開提交 money-tracker.db。
- 不使用真實敏感財務資料測試。
- 刪除測試應使用專用紀錄。
- 測試前確認交易 ID。
- 測試後確認資料完整。
- 正式使用前應規劃備份。

## 25.5 文件一致性

以下文件應互相對應：

- README.md。
- CHANGELOG.md。
- docs/DEVELOPMENT_LOG.md。
- docs/TESTING.md。

尤其應確認：

- Milestone 狀態一致。
- Git Commit 一致。
- 測試數據一致。
- 已知限制一致。
- 未完成事項一致。
- Release 狀態一致。

---

# 二十六、最終測試總結

截至 2026-11-11：

Money Tracker 已完成本機全端系統的基本後端 CRUD API，以及前端查詢、新增與編輯交易功能。

已確認：

1. Express 正常啟動。
2. Health API 正常。
3. 前端靜態檔案正常。
4. SQLite 資料表正常。
5. Foreign Key 設定正常。
6. Categories API 正常。
7. Transactions GET 正常。
8. Transactions POST 正常。
9. Transactions PUT 正常。
10. Transactions DELETE 正常。
11. 既定無效輸入遭拒絕。
12. 不存在交易有對應錯誤。
13. POST 資料可持久化。
14. PUT 負向測試未破壞原資料。
15. DELETE 成功移除指定交易。
16. DELETE 未破壞其他交易。
17. SQLite Integrity Check 通過。
18. SQLite Foreign Key Check 通過。
19. 八個預設分類完整。
20. Dashboard 成功讀取交易。
21. Dashboard 當月收支計算正確。
22. 最近交易列表成功顯示。
23. 前端新增交易成功。
24. 前端新增後資料同步。
25. 前端新增後資料保留。
26. 前端編輯交易成功。
27. 前端編輯後 Dashboard 同步。
28. 前端編輯後資料保留。
29. 取消編輯正常。
30. 零元與小數輸入可被表單阻擋。
31. 後端 HTTP 404 複驗通過。
32. 前端 API 連線失敗提示正常。
33. 測試資料已恢復。
34. 主要 JavaScript 語法檢查通過。
35. Git Diff 基本格式檢查通過。

最後測試資料：

- ID 3：NT$180。
- ID 1：NT$150。
- 本月總收入：NT$0。
- 本月總支出：NT$330。
- 本月收支淨額：-NT$330。
- 交易總數：2。

尚未完成：

- 前端刪除交易。
- 完整前端 CRUD 回歸驗收。
- 完整自動化測試。
- 所有 API 邊界情境。
- 資料庫故障注入。
- 進階財務分析。
- CSV 匯出。
- 完整系統驗收。
- 正式 Release。

Milestone 10-3 尚未執行 Git Commit 與 GitHub Push。

因此，**目前可以確認既定主要功能與錯誤情境測試通過，但不能宣稱 Money Tracker 已完成全部系統驗收。**

---

# 二十七、文件修訂紀錄

## 2026-11-11｜測試報告更新

本次更新以 GitHub 上既有的 TESTING.md 為基礎，保留重要歷史測試，並補齊後續前端開發紀錄。

### 保留的內容

- Express 啟動測試。
- Health API。
- SQLite 初始化。
- Categories Schema。
- Transactions Schema。
- Foreign Key。
- Integrity Check。
- Foreign Key Check。
- 八個預設分類。
- Git Ignore 規則。
- Categories GET。
- Transactions GET。
- POST 七項測試。
- PUT 七項測試。
- DELETE 五項主要測試。
- POST 持久化。
- PUT 資料完整性。
- DELETE 資料完整性。
- PUT 路由排錯。
- DELETE 路由排錯。
- Port 3000、3001 程序紀錄。
- 既有測試統計。
- 未執行測試清單。
- 測試文件維護規範。

### 新增的內容

- Milestone 09 GitHub 提交紀錄。
- Milestone 10-1 Dashboard 動態測試。
- Milestone 10-2 前端新增交易測試。
- Milestone 10-3 前端編輯交易測試。
- 前端與後端驗證區分。
- 編輯取消測試。
- 小數與零元表單驗證。
- PowerShell HTTP Status 0 問題。
- JSON 引號問題。
- PUT 不存在 ID 複驗。
- HTTP 404 後資料驗證。
- Port 3000 中斷測試。
- PID 4512 程序紀錄。
- Failed to fetch 測試。
- 伺服器恢復測試。
- 測試資料恢復。
- Git Diff 與語法檢查。
- Milestone 10-4 測試規劃。
- 最新系統狀態。
- 最新資料快照。
- 新版測試維護原則。

### 本次文件更新限制

本次文字整理不代表已經執行 Git Commit 或 Push。

尚未完成的測試維持 NOT RUN。

若後續實際程式、資料庫或 Git 紀錄發生變化，須依最新結果更新本報告。

---

# Maintenance Statement｜測試文件維護聲明

本文件將持續記錄 Money Tracker 的實際測試歷史。

每次完成新功能、發現錯誤、修正程式或完成版本里程碑時，應補充對應測試紀錄。

重要的歷史測試應保留，避免因後續文件更新而遺失可追溯資訊。

已完成的測試應有實際證據。

尚未執行的測試不得標示為 PASS。

已知限制應如實記錄。

Git Commit、GitHub Push 與正式 Release 應分別確認，不可混為同一個狀態。

Money Tracker 將持續採用功能實作、正向驗證、負向驗證、資料完整性檢查、問題紀錄及 Git 版本控制的方式完成後續開發。

---

# 二十八、Milestone 10-4｜Frontend Delete Transaction 實際測試報告

**測試日期：** 2026-11-11
**測試對象：** Money Tracker 前端刪除交易功能
**後端 API：** DELETE /api/transactions/:id
**基準 Commit：** 6a10ae1
**本階段 Commit：** 尚未建立
**測試方式：** 手動 UI、PowerShell、REST API、SQLite 檢查
**整體判定：** 既定主要測試通過，完整系統驗收尚未完成

## 28.1 測試目標

驗證前端刪除功能是否可以：

1. 正確顯示刪除按鈕。
2. 正確識別指定交易。
3. 顯示刪除確認視窗。
4. 取消刪除而不修改資料。
5. 正常呼叫 DELETE API。
6. 顯示刪除成功訊息。
7. 同步更新 Dashboard。
8. 同步更新最近交易列表。
9. 重新整理後保留刪除結果。
10. 正確回應不存在的交易。
11. 維持其他交易完整性。
12. 維持 SQLite Integrity Check。
13. 維持 Foreign Key Check。
14. 在網路連線失敗時顯示錯誤。
15. 避免將失敗操作誤判為成功。
16. 在伺服器恢復後確認資料沒有遺失。

## 28.2 測試環境

| 項目         | 測試環境                  |
| ------------ | ------------------------- |
| 作業系統     | Windows                   |
| 開發工具     | Visual Studio Code        |
| Shell        | PowerShell                |
| 前端         | HTML、CSS、JavaScript     |
| 後端         | Node.js、Express          |
| 資料庫       | SQLite                    |
| 瀏覽器       | Microsoft Edge            |
| API Base URL | http://localhost:3000     |
| 專案目錄     | C:\Projects\Money-Tracker |

測試使用本機開發環境，不代表已完成正式部署環境的驗證。

## 28.3 測試狀態定義

- PASS：已執行，符合預期。
- FAIL：已執行，不符合預期。
- NOT RUN：尚未執行。
- PARTIAL：部分情境已驗證，但尚未涵蓋完整預定範圍。
- BLOCKED：因環境或依賴問題無法執行。

測試結論須根據實際執行結果。

## 28.4 測試資料

### 原始資料

| ID  | 分類 | 金額 | 日期       | 備註                     |
| --- | ---- | ---: | ---------- | ------------------------ |
| 3   | 餐飲 |  180 | 2026-11-10 | Milestone 10-3 edit test |
| 1   | 餐飲 |  150 | 2026-11-09 | Updated lunch test       |

原始交易數量：

2。

原始 Dashboard：

- Income：NT$0。
- Expenses：NT$330。
- Net Balance：-NT$330。

### 正常刪除測試資料

| 項目 | 內容                                 |
| ---- | ------------------------------------ |
| ID   | 4                                    |
| 類型 | expense                              |
| 分類 | 餐飲                                 |
| 金額 | 123                                  |
| 日期 | 2026-11-11                           |
| 備註 | Milestone 10-4 DELETE temporary test |

新增後：

- 交易數量：3。
- 本月支出：NT$453。
- 本月淨額：-NT$453。

### 連線失敗測試資料

| 項目 | 內容                                |
| ---- | ----------------------------------- |
| ID   | 5                                   |
| 類型 | expense                             |
| 分類 | 餐飲                                |
| 金額 | 77                                  |
| 日期 | 2026-11-11                          |
| 備註 | Milestone 10-4 network failure test |

新增後：

- 交易數量：3。
- 本月支出：NT$407。
- 本月淨額：-NT$407。

ID 4、ID 5 均為本次實際取得的 SQLite 交易 ID，不是硬編碼測試規則。

## 28.5 測試總表

| Test ID         | 測試項目                 | 結果    |
| --------------- | ------------------------ | ------- |
| FRONT-DELETE-01 | 刪除按鈕顯示             | PASS    |
| FRONT-DELETE-02 | 刪除確認視窗             | PASS    |
| FRONT-DELETE-03 | 取消刪除                 | PASS    |
| FRONT-DELETE-04 | 正常刪除交易             | PASS    |
| FRONT-DELETE-05 | 刪除後交易列表更新       | PASS    |
| FRONT-DELETE-06 | 刪除後 Dashboard 更新    | PASS    |
| FRONT-DELETE-07 | 不存在交易處理           | PARTIAL |
| FRONT-DELETE-08 | 前端連線失敗             | PASS    |
| FRONT-DELETE-09 | 刪除後重新整理           | PASS    |
| FRONT-DELETE-10 | 其他交易完整性           | PASS    |
| FRONT-DELETE-11 | SQLite Integrity Check   | PASS    |
| FRONT-DELETE-12 | SQLite Foreign Key Check | PASS    |
| FRONT-DELETE-13 | 失敗後恢復伺服器         | PASS    |
| FRONT-DELETE-14 | 失敗後資料仍存在         | PASS    |
| FRONT-DELETE-15 | 專用測試資料清理         | PASS    |
| FRONT-DELETE-16 | JavaScript 語法檢查      | PASS    |
| FRONT-DELETE-17 | Git Diff 格式檢查        | PASS    |
| FRONT-DELETE-18 | DELETE 成功但 GET 失敗   | NOT RUN |
| FRONT-DELETE-19 | 正在編輯的交易遭刪除     | NOT RUN |
| FRONT-DELETE-20 | 連續快速點擊刪除         | NOT RUN |

FRONT-DELETE-07 標示 PARTIAL，是因為已驗證後端 HTTP 404，但尚未獨立驗證前端刪除流程接收到 HTTP 404 時的 UI 呈現。

## 28.6 FRONT-DELETE-01｜刪除按鈕顯示

### 前置條件

- Express 正常。
- GET Transactions API 正常。
- 三筆測試交易已載入。
- 前端 JavaScript 已更新。

### 操作

開啟 Money Tracker，檢查最近交易列表。

### 預期結果

- 每筆交易有編輯按鈕。
- 每筆交易有刪除按鈕。
- 刪除按鈕使用紅色樣式。
- 按鈕對應正確交易。

### 實際結果

- 三筆交易皆有刪除按鈕。
- 編輯按鈕保留。
- 刪除按鈕紅色外框正常。
- 操作欄排列正常。

### 判定

PASS。

## 28.7 FRONT-DELETE-02｜刪除確認視窗

### 測試交易

ID 4。

### 操作

點擊 ID 4 的刪除按鈕。

### 預期結果

確認視窗顯示：

- ID 4。
- 2026-11-11。
- 餐飲。
- NT$123。
- Milestone 10-4 DELETE temporary test。
- 永久刪除提醒。

### 實際結果

確認視窗正確顯示上述資料。

瀏覽器提供確定與取消選項。

### 判定

PASS。

## 28.8 FRONT-DELETE-03｜取消刪除

### 前置條件

ID 4 存在。

### 操作

1. 開啟 ID 4 刪除確認視窗。
2. 點擊取消。
3. 檢查交易列表與 Dashboard。

### 預期結果

- 不刪除 ID 4。
- 原資料完整。
- 交易總數 3。
- 總支出 NT$453。

### 實際結果

- 確認視窗關閉。
- ID 4 仍顯示 NT$123。
- ID 3 仍顯示 NT$180。
- ID 1 仍顯示 NT$150。
- 交易總數 3。
- Dashboard NT$453。

### 判定

PASS。

### 驗證限制

此案例由 UI 操作及資料顯示確認取消結果；沒有另外記錄 Network 面板的逐筆 HTTP Request。

## 28.9 FRONT-DELETE-04｜正常刪除

### 前置條件

ID 4 存在。

### 操作

1. 點擊 ID 4 的刪除按鈕。
2. 確認視窗資料正確。
3. 點擊確定。
4. 等待刪除結果。

### 預期結果

- DELETE API 成功。
- 前端顯示成功。
- ID 4 消失。
- 其他交易保留。
- Dashboard 同步。

### 實際結果

前端出現：

`交易 ID 4 刪除成功！Dashboard 與交易清單已更新。`

交易列表移除 ID 4。

交易數量由 3 變成 2。

### 判定

PASS。

## 28.10 FRONT-DELETE-05｜列表更新

### 刪除前

- ID 4。
- ID 3。
- ID 1。

### 刪除後

- ID 3。
- ID 1。

### 實際結果

ID 4 已消失。

ID 3、ID 1 保留。

交易總數顯示 2。

### 判定

PASS。

## 28.11 FRONT-DELETE-06｜Dashboard 更新

### 刪除前

- Income：0。
- Expenses：453。
- Balance：-453。

### 刪除金額

123。

### 預期結果

453 - 123 = 330。

0 - 330 = -330。

### 實際結果

- Income：NT$0。
- Expenses：NT$330。
- Balance：-NT$330。

### 判定

PASS。

## 28.12 FRONT-DELETE-07｜不存在交易

### 測試層次

Backend API。

### Endpoint

`DELETE /api/transactions/4`

### 前置條件

ID 4 已經成功刪除。

### 測試指令

`curl.exe -i -X DELETE "http://localhost:3000/api/transactions/4"`

### 預期 HTTP Status

404 Not Found。

### 實際 HTTP Status

404 Not Found。

### 實際 Content-Type

application/json; charset=utf-8。

### 實際 Response

`{"success":false,"message":"Transaction not found"}`

### 判定

後端 API 測試：PASS。

前端 HTTP 404 專項測試：NOT RUN。

本測試案例整體狀態：PARTIAL。

## 28.13 FRONT-DELETE-09｜刪除結果持久化

### 前置條件

ID 4 已刪除。

### 操作

重新整理 Money Tracker 網頁。

### 預期結果

- ID 4 不再顯示。
- ID 3、ID 1 保留。
- 交易數量 2。
- 總支出 NT$330。

### 實際結果

重新整理後：

- ID 4 不存在。
- ID 3：NT$180。
- ID 1：NT$150。
- 交易總數：2。
- 本月總支出：NT$330。
- 本月淨額：-NT$330。

### 判定

PASS。

## 28.14 FRONT-DELETE-10｜其他交易完整性

### 測試目的

確認刪除 ID 4 不會影響其他交易。

### 驗證方法

呼叫：

`GET /api/transactions`

### 實際資料

| ID  | 分類 | 金額 | 日期       | 備註                     |
| --- | ---- | ---: | ---------- | ------------------------ |
| 3   | 餐飲 |  180 | 2026-11-10 | Milestone 10-3 edit test |
| 1   | 餐飲 |  150 | 2026-11-09 | Updated lunch test       |

確認 ID 4 不存在。

### 判定

PASS。

## 28.15 FRONT-DELETE-11｜SQLite Integrity Check

### 指令

`node server/check-db.js`

### 實際結果

`Integrity Check`

回傳：

`ok`

### 判定

PASS。

## 28.16 FRONT-DELETE-12｜Foreign Key Check

### 指令

`node server/check-db.js`

### 實際結果

`Foreign Key Check`

回傳：

`No foreign key violations`

同時確認：

- Transactions 正確參照 categories。
- category_id 參照 categories.id。
- ON DELETE：RESTRICT。
- 八個預設分類存在。

### 判定

PASS。

## 28.17 FRONT-DELETE-08｜前端連線失敗

### 測試目的

確認 Express 不可用時，前端不會誤報刪除成功。

### 專用測試資料

ID 5：

- 金額 NT$77。
- 日期 2026-11-11。
- 備註 Milestone 10-4 network failure test。

### 測試前狀態

- 交易總數：3。
- 總支出：NT$407。
- 淨額：-NT$407。

### 前置條件

- 已載入 Money Tracker。
- Express 已停止。
- Port 3000 沒有監聽程序。
- 網頁未重新整理。

### 程序檢查

執行 Get-NetTCPConnection。

發現 PID：

19192。

再透過 Win32_Process 確認：

- PID：19192。
- Name：node.exe。
- CommandLine：node server/server.js。

確認程序身分後停止。

重新檢查 Port 3000，沒有取得監聽程序。

### 測試操作

1. 回到已載入的網頁。
2. 選擇 ID 5。
3. 點擊刪除。
4. 確認交易資訊。
5. 點擊確定。
6. 觀察網頁結果。

### 預期結果

- DELETE Request 無法連線。
- 前端顯示錯誤。
- 不顯示刪除成功。
- ID 5 仍顯示。
- Dashboard 不誤更新。

### 實際結果

顯示錯誤：

`Failed to fetch`

顯示紅色刪除失敗訊息。

- ID 5：NT$77。
- ID 3：NT$180。
- ID 1：NT$150。
- 交易數量：3。
- 總支出：NT$407。
- 淨額：-NT$407。

### 判定

PASS。

### 限制

本次測試的是伺服器沒有監聽程序的情況。

尚未測試：

- 長時間 Request Timeout。
- 伺服器收到請求後突然中斷。
- 資料庫刪除成功但 HTTP Response 遺失。
- DELETE 成功但後續 GET 失敗。

## 28.18 FRONT-DELETE-13｜伺服器恢復

### 操作

重新執行：

`npm start`

接著透過 GET API 查詢交易。

### 實際結果

API 成功回傳交易資料。

### 判定

PASS。

## 28.19 FRONT-DELETE-14｜連線失敗後資料保留

### 前置條件

已完成前端 Failed to fetch 測試。

Express 已重新啟動。

### 查詢

`GET /api/transactions`

### 實際結果

| ID  | 金額 | 備註                                |
| --- | ---: | ----------------------------------- |
| 5   |   77 | Milestone 10-4 network failure test |
| 3   |  180 | Milestone 10-3 edit test            |
| 1   |  150 | Updated lunch test                  |

### 判定

PASS。

這是確認連線失敗沒有造成 ID 5 遺失的主要證據。

## 28.20 FRONT-DELETE-15｜測試資料清理

### 操作

使用前端刪除 ID 5。

### 預期結果

- 刪除成功。
- ID 5 不再顯示。
- ID 3、ID 1 保留。
- 交易數量恢復 2。
- 總支出恢復 NT$330。

### 實際結果

出現綠色成功提示：

`交易 ID 5 刪除成功！Dashboard 與交易清單已更新。`

畫面顯示：

- ID 3：NT$180。
- ID 1：NT$150。
- 交易總數：2。
- 支出：NT$330。
- 淨額：-NT$330。

### 判定

PASS。

### 補充

ID 5 的這次清理已完成即時畫面驗證。

清理完成後額外重新整理的獨立驗證尚未記錄，不將其標示為另一項 PASS。

## 28.21 FRONT-DELETE-16｜JavaScript 語法檢查

### 測試指令

`node --check public/app.js`

`node --check server/server.js`

### 實際結果

未顯示基本語法錯誤。

### 判定

PASS。

### 限制

語法檢查不能保證全部程式邏輯與執行階段行為正確。

## 28.22 FRONT-DELETE-17｜Git Diff 格式檢查

### 測試指令

`git diff --check`

### 實際結果

未顯示空白格式錯誤。

### 判定

PASS。

### Git 差異

當次執行：

`git diff --stat`

顯示：

- public/app.js：421 行變更。
- public/index.html：31 行變更。
- public/style.css：265 行變更。
- 3 files changed。
- 611 insertions。
- 106 deletions。

此為當次尚未加入文件修改前的前端差異統計。

## 28.23 錯誤與問題排除紀錄

### 問題一：Ctrl + C 不代表伺服器已停止

曾出現 Node.js 程序繼續監聽 Port 3000。

處理方法：

1. 檢查 Port。
2. 找出 PID。
3. 確認程序身分。
4. 停止指定程序。
5. 再次檢查 Port。

本階段 PID 為 19192。

### 問題二：伺服器停止後不應刷新頁面

本次測試需要使用先前已載入的 HTML 與 JavaScript。

若在 Express 停止後重新整理，頁面可能無法正常載入，因此會破壞測試前置條件。

### 問題三：網路失敗與 HTTP 404 不同

HTTP 404：

- 伺服器正常回應。
- 代表請求已抵達 HTTP 服務。
- API 回傳指定錯誤。

Failed to fetch：

- 前端未成功取得 HTTP Response。
- 不可直接視為 HTTP 404。
- 需另行驗證後端資料狀態。

### 問題四：不能只看畫面是否保留交易

網路中斷時，前端畫面可能繼續保留舊資料。

因此必須恢復伺服器後使用 GET 再次查詢，才能確認交易沒有遺失。

此項已完成。

## 28.24 尚未執行的補充測試

| Test ID         | 測試情境                   | 狀態    |
| --------------- | -------------------------- | ------- |
| FRONT-DELETE-18 | DELETE 成功、後續 GET 失敗 | NOT RUN |
| FRONT-DELETE-19 | 正在編輯的交易被刪除       | NOT RUN |
| FRONT-DELETE-20 | 高速連續點擊刪除           | NOT RUN |
| FRONT-DELETE-21 | 前端接收到 HTTP 404        | NOT RUN |
| FRONT-DELETE-22 | 前端接收到 HTTP 500        | NOT RUN |
| FRONT-DELETE-23 | 刪除回應與交易 ID 不一致   | NOT RUN |
| FRONT-DELETE-24 | DELETE Request Timeout     | NOT RUN |
| FRONT-DELETE-25 | 大量交易資料               | NOT RUN |
| FRONT-DELETE-26 | 完整自動化 CRUD 回歸       | NOT RUN |
| FRONT-DELETE-27 | 跨裝置顯示與操作           | NOT RUN |

上述項目不能因為目前主要測試成功而自動判定通過。

## 28.25 測試結論

Milestone 10-4 已完成前端刪除交易的主要功能測試。

已實際確認：

- 刪除按鈕正常。
- 確認視窗正常。
- 取消刪除正常。
- 正常刪除成功。
- 刪除後列表更新。
- Dashboard 計算正確。
- 刪除結果重新載入後仍然成立。
- 後端 HTTP 404 正確。
- 其他交易完整。
- SQLite Integrity Check 正常。
- Foreign Key Check 無違規。
- 前端連線失敗顯示正確。
- 連線失敗時沒有誤報刪除成功。
- 恢復伺服器後，ID 5 仍存在。
- 專用測試資料清理成功。
- JavaScript 基本語法檢查通過。
- Git Diff 格式檢查通過。

目前的開發測試資料：

- ID 3：NT$180。
- ID 1：NT$150。
- 本月總收入：NT$0。
- 本月總支出：NT$330。
- 本月收支淨額：-NT$330。
- 交易數量：2。

以上為最後一次已提供的畫面快照，並非未來資料庫的固定內容。

本階段仍有未執行的進階錯誤及自動化測試，也尚未完成 GitHub 提交與正式系統驗收。

**Milestone 10-4 主要功能測試：PASS。**

**Money Tracker 完整系統驗收：尚未完成。**

---

# 二十九、Milestone 11｜Financial Analytics & Visualization 實際測試報告

## 29.1 測試階段基本資訊

| 項目                     | 內容                                |
| ------------------------ | ----------------------------------- |
| 專案                     | Money Tracker                       |
| 測試階段                 | Milestone 11-1～11-3                |
| 文件整理階段             | Milestone 11-4                      |
| 測試日期                 | 2026-11-11～2026-11-12              |
| 測試環境                 | Windows、Microsoft Edge、VS Code    |
| 前端                     | HTML、CSS、JavaScript               |
| 後端                     | Node.js、Express                    |
| 資料庫                   | SQLite                              |
| API Base URL             | `http://localhost:3000`             |
| 資料查詢 API             | `GET /api/transactions`             |
| 測試工具                 | Microsoft Edge、PowerShell、Node.js |
| 前一已提交基準           | `d4148f1`                           |
| Milestone 11 Git Commit  | 尚未建立                            |
| Milestone 11 GitHub Push | 尚未執行                            |
| 正式 Release             | 尚未發布                            |

本章記錄 Milestone 11 財務統計與圖表的實際驗證過程。

測試紀錄依照本機瀏覽器畫面、PowerShell 輸出、SQLite 檢查結果及已執行的操作建立。

本章不取代原有 Milestone 01～10-4 的歷史測試報告。

### 測試狀態定義

| 狀態    | 定義                         |
| ------- | ---------------------------- |
| PASS    | 已實際執行，觀察結果符合預期 |
| FAIL    | 已實際執行，但結果不符合預期 |
| NOT RUN | 尚未執行，沒有足夠實際證據   |
| BLOCKED | 因前置條件或其他問題無法執行 |

若僅從程式碼推論功能應該正常，不得直接標記 PASS。

## 29.2 測試範圍

Milestone 11 分成三個主要功能階段。

### 11-1：每月財務分析

驗證：

- 統計月份切換。
- 當月收入計算。
- 當月支出計算。
- 當月淨額計算。
- 分類金額加總。
- 分類筆數。
- 分類占比。
- 空月份處理。
- 收入分類及支出分類切換。
- 交易 CRUD 後的統計更新。

### 11-2：財務分析圖表

驗證：

- 分類占比環形圖。
- 單分類占比。
- 多分類占比。
- 環形圖中央金額。
- 分類圖例。
- 收入與支出比較長條。
- 收支為零時的處理。
- 交易新增及刪除後的同步。

### 11-3：最近六個月收支趨勢

驗證：

- 六個月份的範圍。
- 月份排列。
- 跨年月份。
- 各月收入。
- 各月支出。
- 各月淨額。
- 零交易月份。
- 長條高度比例。
- 新增交易同步。
- 修改金額同步。
- 修改日期後的跨月份同步。
- 刪除交易同步。
- 最終 API 資料核對。
- SQLite 資料完整性。

### 本階段不包含

本階段未將以下功能列為已完成的 Milestone 11 測試：

- 進階交易篩選。
- CSV 匯出。
- 大量交易效能測試。
- 全自動化端對端測試。
- 多使用者並發測試。
- 正式部署驗收。

## 29.3 測試前置條件及原始資料

### 測試前置條件

執行主要瀏覽器測試前：

1. Money Tracker 專案能正常啟動。
2. Express 服務可透過 `localhost:3000` 存取。
3. SQLite 資料庫可正常查詢。
4. 前端可載入交易及分類。
5. `public/analytics.js` 已加入網頁。
6. 財務分析區塊正常顯示。
7. 已有原始測試交易可用於基準核對。

### 原始測試資料

| ID  | 日期       | 類型 | 分類 |   金額 | 備註                     |
| --- | ---------- | ---- | ---- | -----: | ------------------------ |
| 1   | 2026-11-09 | 支出 | 餐飲 | NT$150 | Updated lunch test       |
| 3   | 2026-11-10 | 支出 | 餐飲 | NT$180 | Milestone 10-3 edit test |

原始統計：

- 交易數量：2。
- 2026 年 11 月收入：NT$0。
- 2026 年 11 月支出：NT$330。
- 2026 年 11 月淨額：-NT$330。
- 支出分類：餐飲。
- 餐飲金額：NT$330。
- 餐飲占比：100%。

以下各項測試若無特別說明，均以此資料狀態或實際測試過程中的專用交易為基礎。

## 29.4 Milestone 11-1｜每月統計測試

### ANALYTICS-11-01｜2026 年 11 月基準統計

**測試目的：** 確認每月統計能正確加總既有交易。

**前置條件：** 資料庫只有 ID 1、ID 3 兩筆基準交易。

**測試步驟：**

1. 開啟 Money Tracker。
2. 在 Analytics 選擇 2026 年 11 月。
3. 選擇支出分類。
4. 觀察當月收入、支出、淨額及分類結果。

**預期結果：**

- 收入 NT$0。
- 支出 NT$330。
- 淨額 -NT$330。
- 餐飲 2 筆。
- 餐飲占比 100%。

**實際結果：** 瀏覽器顯示上述金額、筆數及比例，與原始交易資料一致。

**判定：PASS。**

### ANALYTICS-11-02｜空月份統計

**測試目的：** 確認無交易月份不產生錯誤金額。

**前置條件：** 選取月份沒有交易紀錄。

**測試步驟：**

1. 將統計月份切換為 2026 年 10 月。
2. 觀察當月收入、支出及淨額。
3. 觀察分類摘要。

**預期結果：**

- 收入 NT$0。
- 支出 NT$0。
- 淨額 NT$0。
- 分類數量為零。
- 顯示無支出記錄的提示。

**實際結果：** 在該月份尚無測試交易時，畫面正常顯示零值及空資料提示。

**判定：PASS。**

### ANALYTICS-11-03｜不同月份資料隔離

**測試目的：** 確認不同月份的交易不會混入同一個單月統計。

**前置條件：** 存在不同日期的交易資料。

**測試步驟：**

1. 建立 2026 年 10 月的專用測試交易。
2. 檢查 10 月統計。
3. 對照 11 月既有交易統計。

**預期結果：** 10 月交易僅影響 10 月統計；11 月原有支出不被清除。

**實際結果：** 10 月測試交易可被獨立統計，11 月既有資料仍可正確顯示。

**判定：PASS。**

### ANALYTICS-11-04｜修改交易金額後重新統計

**測試目的：** 確認修改交易後，統計使用新金額。

**前置條件：** 已建立專用測試交易。

**測試步驟：**

1. 將測試交易金額由 NT$70 修改為 NT$100。
2. 檢查交易列表。
3. 檢查對應月份的財務統計。

**預期結果：** 統計加總應反映 NT$100，而不是繼續使用 NT$70。

**實際結果：** 交易修改成功後，對應月份的統計更新，原有其他交易未被改變。

**判定：PASS。**

### ANALYTICS-11-05｜多支出分類占比

**測試目的：** 確認支出分類金額及比例計算正確。

**前置條件：** 11 月有餐飲支出 NT$330，並加入交通支出 NT$100。

**測試步驟：**

1. 將交通測試交易歸入 2026 年 11 月。
2. 查看當月支出。
3. 查看餐飲及交通分類占比。

**預期結果：**

| 分類 |   金額 |     占比 |
| ---- | -----: | -------: |
| 餐飲 | NT$330 | 約 76.7% |
| 交通 | NT$100 | 約 23.3% |
| 合計 | NT$430 |     100% |

**實際結果：** 畫面顯示支出 NT$430，餐飲約 76.7%、交通約 23.3%。

**判定：PASS。**

### ANALYTICS-11-06｜新增收入後的統計

**測試目的：** 確認收入交易可以正確加入月份統計。

**前置條件：** 2026 年 11 月支出為 NT$400。

**測試步驟：**

1. 新增收入交易。
2. 分類設定為薪資。
3. 金額設定 NT$200。
4. 日期設定為 2026-11-12。
5. 儲存交易後觀察 Dashboard 與 Analytics。

**預期結果：**

- 收入 NT$200。
- 支出 NT$400。
- 淨額 -NT$200。

**實際結果：** 畫面顯示收入 NT$200、支出 NT$400、淨額 -NT$200。

**判定：PASS。**

### ANALYTICS-11-07｜收入分類切換

**測試目的：** 確認切換分類統計類型不會改變整個月份的財務總額。

**前置條件：** 11 月存在收入及支出交易。

**測試步驟：**

1. 選擇收入分類。
2. 觀察分類統計。
3. 同時核對月份收入、支出及淨額。

**預期結果：**

- 下方分類統計改為收入分類。
- 收入總額不變。
- 支出總額不變。
- 淨額不變。

**實際結果：** 畫面顯示薪資收入分類，且月份收入 NT$200、支出 NT$400、淨額 -NT$200 保持不變。

**判定：PASS。**

### ANALYTICS-11-08｜收入測試交易清理

**測試目的：** 確認刪除專用收入資料後，原有支出正確保留。

**前置條件：** 存在專用收入交易。

**測試步驟：**

1. 刪除專用收入測試交易。
2. 返回月份統計。
3. 核對收入及支出。
4. 核對交易列表。

**預期結果：**

- 測試收入不再計入。
- 原有支出不變。
- 原有交易不遺失。

**實際結果：** 專用收入交易刪除後，當月收入恢復 NT$0；原有支出資料保留。

**判定：PASS。**

## 29.5 Milestone 11-2｜環形圖與比較圖測試

### ANALYTICS-11-09｜單一分類環形圖

**測試目的：** 確認只有一種支出分類時的環形圖正確。

**前置條件：** 原始兩筆餐飲支出合計 NT$330。

**測試步驟：**

1. 選擇 2026 年 11 月。
2. 選擇支出分類。
3. 查看環形圖及圖例。

**預期結果：**

- 環形圖只有餐飲分類。
- 圖表中央顯示 NT$330。
- 圖例顯示 100%。

**實際結果：** 環形圖、中央金額與圖例均正確顯示餐飲 NT$330、100%。

**判定：PASS。**

### ANALYTICS-11-10｜多分類環形圖

**測試目的：** 確認不同分類會依正確占比分配環形圖區域。

**前置條件：** 已建立專用交易 ID 8。

**測試資料：**

- ID：8。
- 類型：支出。
- 分類：交通。
- 金額：NT$70。
- 備註：Milestone 11-2 donut chart test。

**測試步驟：**

1. 新增 ID 8。
2. 查看 2026 年 11 月的分類統計。
3. 查看環形圖及圖例。

**預期結果：**

- 餐飲：NT$330，82.5%。
- 交通：NT$70，17.5%。
- 合計：NT$400。
- 環形圖顯示兩個分類區域。

**實際結果：** 瀏覽器顯示兩個分類、正確金額及占比，環形圖中央合計 NT$400。

**判定：PASS。**

### ANALYTICS-11-11｜收入與支出比較圖

**測試目的：** 確認比較長條使用正確的相對基準。

**前置條件：** 2026 年 11 月存在支出 NT$330、收入 NT$0。

**測試步驟：**

1. 查看收入與支出比較圖。
2. 核對顯示金額。
3. 核對長條填色比例。

**預期結果：**

- 收入 NT$0，填色長度為零。
- 支出 NT$330，填色長度為最大值。
- 不出現除以零錯誤。

**實際結果：** 畫面顯示收入 NT$0、支出 NT$330；支出長條填滿，收入長條沒有填色。

**判定：PASS。**

### ANALYTICS-11-12｜無資料月份的圖表處理

**測試目的：** 確認沒有交易時，不產生無效圖表。

**前置條件：** 選取沒有交易的月份。

**測試步驟：**

1. 選擇空月份。
2. 查看環形圖區塊。
3. 查看收入與支出比較區塊。

**預期結果：**

- 環形圖顯示空資料提示。
- 收入、支出均為 NT$0。
- 兩條比較長條均沒有填色。
- 不出現 `NaN` 或 `Infinity`。

**實際結果：** 畫面顯示空資料提示與零值長條，沒有觀察到無效數值。

**判定：PASS。**

### ANALYTICS-11-13｜刪除環形圖測試資料

**測試目的：** 確認刪除專用交易後，圖表恢復原始分類分布。

**前置條件：** ID 8 已加入，支出合計 NT$400。

**測試步驟：**

1. 刪除 ID 8。
2. 查看分類統計。
3. 查看環形圖。
4. 查看交易列表。

**預期結果：**

- 交通測試交易消失。
- 支出恢復 NT$330。
- 餐飲占比恢復 100%。
- ID 1、ID 3 保留。

**實際結果：** 刪除後統計恢復為餐飲 NT$330、100%，交易列表只剩原有兩筆。

**判定：PASS。**

## 29.6 Milestone 11-3｜六個月趨勢測試

### ANALYTICS-11-14｜六個月範圍計算

**測試目的：** 確認趨勢圖包含所選月份及前五個月。

**前置條件：** 目前存在 2026 年 11 月的基準交易。

**測試步驟：**

1. 選擇 2026 年 11 月。
2. 檢查趨勢圖月份排列。

**預期結果：**

2026/06、2026/07、2026/08、2026/09、2026/10、2026/11。

**實際結果：** 畫面顯示正確的六個月份，且順序由舊至新。

**判定：PASS。**

### ANALYTICS-11-15｜空月份零值保留

**測試目的：** 確認沒有交易的月份仍出現在趨勢圖。

**前置條件：** 2026 年 6～10 月沒有交易。

**測試步驟：**

1. 選擇 2026 年 11 月。
2. 查看前五個月份的收入、支出與淨額。

**預期結果：**

- 五個月份均顯示。
- 每個月份收入為 NT$0。
- 每個月份支出為 NT$0。
- 每個月份淨額為 NT$0。

**實際結果：** 五個月份均正常顯示且數值為零。

**判定：PASS。**

### ANALYTICS-11-16｜六個月淨額計算

**測試目的：** 確認月份收入減支出的結果正確。

**前置條件：** 2026 年 11 月收入 NT$0、支出 NT$330。

**測試步驟：**

1. 查看 2026 年 11 月趨勢。
2. 核對收入、支出及淨額。

**預期結果：**

0 − 330 = -330。

**實際結果：** 2026 年 11 月淨額顯示 -NT$330。

**判定：PASS。**

### ANALYTICS-11-17｜跨年月份排序

**測試目的：** 確認月份跨越 12 月與次年 1 月時，順序仍正確。

**前置條件：** 財務分析月份選擇器正常。

**測試步驟：**

1. 將統計月份設定為 2027 年 2 月。
2. 檢查六個月趨勢範圍。

**預期結果：**

2026/09 → 2026/10 → 2026/11 → 2026/12 → 2027/01 → 2027/02。

**實際結果：** 六個月份及跨年順序均正確。

**判定：PASS。**

### ANALYTICS-11-18｜所選月份統計與趨勢資料區分

**測試目的：** 確認所選月份為空月份時，六個月趨勢仍保留其他月份的交易。

**前置條件：** 2026 年 11 月有支出 NT$330；2027 年 2 月沒有交易。

**測試步驟：**

1. 選擇 2027 年 2 月。
2. 檢查上方單月統計。
3. 檢查下方六個月趨勢。

**預期結果：**

- 2027 年 2 月收入、支出、淨額均為 NT$0。
- 六個月趨勢中的 2026 年 11 月支出維持 NT$330。

**實際結果：** 單月統計為零，趨勢圖中的 11 月交易仍正確顯示。

**判定：PASS。**

### ANALYTICS-11-19｜新增交易後趨勢更新

**測試目的：** 確認新增交易會即時更新六個月趨勢。

**前置條件：** 原有 2026 年 11 月支出 NT$330。

**測試資料：**

- 專用交易 ID：9。
- 類型：支出。
- 新增金額：NT$50。
- 初始月份：2026 年 11 月。

**測試步驟：**

1. 新增專用交易。
2. 保持所選統計月份為 2027 年 2 月。
3. 查看六個月趨勢。

**預期結果：**

11 月支出 = 330 + 50 = NT$380。

**實際結果：** 趨勢圖中的 11 月支出更新為 NT$380。

**判定：PASS。**

### ANALYTICS-11-20｜修改交易金額後趨勢更新

**測試目的：** 確認修改交易金額時，不會重複累加原始金額。

**前置條件：** ID 9 金額為 NT$50，11 月支出 NT$380。

**測試步驟：**

1. 編輯 ID 9。
2. 將金額改為 NT$80。
3. 儲存。
4. 查看六個月趨勢。

**預期結果：**

11 月支出 = 330 + 80 = NT$410。

**實際結果：** 趨勢圖更新為 11 月支出 NT$410，並顯示修改成功訊息。

**判定：PASS。**

### ANALYTICS-11-21｜跨月份修改交易日期

**測試目的：** 確認修改日期後，交易會從原月份移至新月份。

**前置條件：** ID 9 金額 NT$80，原屬 2026 年 11 月。

**測試步驟：**

1. 編輯 ID 9。
2. 保持金額 NT$80。
3. 將日期改為 `2026-10-12`。
4. 儲存修改。
5. 觀察六個月趨勢。

**預期結果：**

| 月份    | 收入 |   支出 |    淨額 |
| ------- | ---: | -----: | ------: |
| 2026/10 | NT$0 |  NT$80 |  -NT$80 |
| 2026/11 | NT$0 | NT$330 | -NT$330 |

**實際結果：** 趨勢圖正確顯示 10 月 NT$80、11 月 NT$330；兩個月份的長條高度亦符合金額比例。

**判定：PASS。**

### ANALYTICS-11-22｜刪除交易後趨勢更新

**測試目的：** 確認專用交易刪除後，月份統計恢復。

**前置條件：** ID 9 已修改為 2026-10-12、支出 NT$80。

**測試步驟：**

1. 刪除 ID 9。
2. 確認刪除操作。
3. 檢查 10 月與 11 月趨勢。
4. 檢查最近交易紀錄。

**預期結果：**

- 10 月支出恢復 NT$0。
- 11 月支出仍為 NT$330。
- ID 9 從交易列表消失。
- ID 1、ID 3 保留。

**實際結果：** 畫面顯示刪除成功；10 月恢復零值，11 月保持 NT$330，原有兩筆交易未消失。

**判定：PASS。**

### ANALYTICS-11-23｜趨勢長條高度比例

**測試目的：** 確認不同月份的長條使用相同的高度基準。

**前置條件：** 2026 年 10 月支出 NT$80，11 月支出 NT$330。

**測試步驟：**

1. 選擇 2027 年 2 月。
2. 比較 10 月與 11 月的支出長條。
3. 核對實際金額標示。

**預期結果：**

- 11 月 NT$330 為較高長條。
- 10 月 NT$80 長條較短。
- 長條高度與金額大小一致。
- 金額標示仍為真實數字。

**實際結果：** 畫面中 11 月支出長條明顯高於 10 月，兩者金額標示正確。

**判定：PASS。**

## 29.7 Milestone 11｜REST API 最終驗證

### ANALYTICS-11-24｜交易資料最終查詢

**測試目的：** 確認專用測試交易已從後端資料中清理。

**前置條件：** 已刪除 ID 8、ID 9 等專用測試交易，Express 伺服器正常運作。

**測試指令：**

```powershell
$response = Invoke-RestMethod -Uri "http://localhost:3000/api/transactions"
$response.data | Format-Table id, category_name, amount, transaction_date, note
```

**預期結果：** API 僅回傳原始兩筆交易。

**實際結果：**

| ID  | 分類 |   金額 | 日期       | 備註                     |
| --- | ---- | -----: | ---------- | ------------------------ |
| 3   | 餐飲 | NT$180 | 2026-11-10 | Milestone 10-3 edit test |
| 1   | 餐飲 | NT$150 | 2026-11-09 | Updated lunch test       |

**判定：PASS。**

### ANALYTICS-11-25｜測試資料清理確認

**測試目的：** 確認最後交易列表不包含本次專用測試交易。

**前置條件：** 已完成 11-1～11-3 的專用交易清理。

**測試步驟：**

1. 查詢 `GET /api/transactions`。
2. 檢查交易 ID。
3. 核對交易金額及數量。

**預期結果：**

- ID 1 存在。
- ID 3 存在。
- ID 8 不存在。
- ID 9 不存在。
- 交易總數為 2。

**實際結果：** API 最終回傳 ID 3、ID 1，未包含 ID 8、ID 9。

**判定：PASS。**

## 29.8 Milestone 11｜SQLite 資料庫檢查

### ANALYTICS-11-26｜SQLite Integrity Check

**測試目的：** 檢查 SQLite 資料庫完整性。

**測試指令：**

```powershell
node server/check-db.js
```

**預期結果：** `Integrity Check` 顯示 `ok`。

**實際結果：**

```text
=== Integrity Check ===
ok
```

**判定：PASS。**

### ANALYTICS-11-27｜SQLite Foreign Key Check

**測試目的：** 確認交易資料沒有外鍵違規。

**測試指令：**

```powershell
node server/check-db.js
```

**預期結果：** 沒有外鍵違規。

**實際結果：**

```text
=== Foreign Key Check ===
No foreign key violations
```

**判定：PASS。**

### ANALYTICS-11-28｜原有資料表結構保留

**測試目的：** 確認 Milestone 11 沒有破壞原始交易資料表結構。

**測試步驟：**

1. 執行 `node server/check-db.js`。
2. 檢查 Categories Table。
3. 檢查 Transactions Table。
4. 檢查 Foreign Keys。

**預期結果：**

`categories` 保留：

- `id`
- `name`
- `type`

`transactions` 保留：

- `id`
- `category_id`
- `amount`
- `transaction_date`
- `note`
- `created_at`

交易分類外鍵仍指向 `categories.id`。

**實際結果：** 資料表欄位及外鍵關聯與既有架構一致。

**判定：PASS。**

## 29.9 Milestone 11｜程式品質檢查

### ANALYTICS-11-29｜JavaScript 基本語法

**測試目的：** 確認主要 JavaScript 檔案沒有基本語法錯誤。

**已執行指令：**

```powershell
node --check public/analytics.js
node --check public/app.js
node --check server/server.js
```

**預期結果：** 指令不輸出 JavaScript 語法錯誤。

**實際結果：** 先前提供的 PowerShell 輸出沒有顯示語法錯誤。

**判定：PASS。**

**限制：** `node --check` 僅驗證語法，不代表所有執行邏輯均正確。

### ANALYTICS-11-30｜文件最終 Git Diff 格式檢查

**測試目的：** 確認本階段所有新增程式與文件沒有 Git 偵測到的空白格式問題。

**測試指令：**

```powershell
git --no-pager diff --check
```

**預期結果：** 不出現 `trailing whitespace` 等格式錯誤。

**目前實際情況：**

- 早期前端程式修改後曾執行 Git Diff 檢查。
- Milestone 11-4 新增 CHANGELOG 區段後，曾出現行尾空白警告。
- 尚未完成四份文件修改後的最終統一格式檢查。

**判定：NOT RUN（最終整合檢查尚未完成）。**

**備註：** 已知的 CHANGELOG 行尾空白警告仍須如實保留，不得將最終格式檢查記為 PASS。

## 29.10 Milestone 11｜主要測試總表

| Test ID         | 測試項目                 | 狀態    |
| --------------- | ------------------------ | ------- |
| ANALYTICS-11-01 | 11 月基準統計            | PASS    |
| ANALYTICS-11-02 | 空月份統計               | PASS    |
| ANALYTICS-11-03 | 不同月份隔離             | PASS    |
| ANALYTICS-11-04 | 修改金額統計             | PASS    |
| ANALYTICS-11-05 | 多支出分類占比           | PASS    |
| ANALYTICS-11-06 | 新增收入統計             | PASS    |
| ANALYTICS-11-07 | 收入分類切換             | PASS    |
| ANALYTICS-11-08 | 收入測試資料清理         | PASS    |
| ANALYTICS-11-09 | 單分類環形圖             | PASS    |
| ANALYTICS-11-10 | 多分類環形圖             | PASS    |
| ANALYTICS-11-11 | 收入支出比較圖           | PASS    |
| ANALYTICS-11-12 | 空月份圖表處理           | PASS    |
| ANALYTICS-11-13 | 環形圖測試資料清理       | PASS    |
| ANALYTICS-11-14 | 六個月範圍               | PASS    |
| ANALYTICS-11-15 | 趨勢空月份零值           | PASS    |
| ANALYTICS-11-16 | 六個月淨額               | PASS    |
| ANALYTICS-11-17 | 跨年月份排序             | PASS    |
| ANALYTICS-11-18 | 單月及六個月資料區分     | PASS    |
| ANALYTICS-11-19 | 新增交易趨勢同步         | PASS    |
| ANALYTICS-11-20 | 修改金額趨勢同步         | PASS    |
| ANALYTICS-11-21 | 跨月份日期修改           | PASS    |
| ANALYTICS-11-22 | 刪除交易趨勢同步         | PASS    |
| ANALYTICS-11-23 | 趨勢長條高度比例         | PASS    |
| ANALYTICS-11-24 | API 最終交易查詢         | PASS    |
| ANALYTICS-11-25 | 專用測試交易清理         | PASS    |
| ANALYTICS-11-26 | SQLite Integrity Check   | PASS    |
| ANALYTICS-11-27 | SQLite Foreign Key Check | PASS    |
| ANALYTICS-11-28 | 原有資料表結構保留       | PASS    |
| ANALYTICS-11-29 | JavaScript 基本語法      | PASS    |
| ANALYTICS-11-30 | 最終 Git Diff 格式檢查   | NOT RUN |

**以上 30 個測試項目中，29 項有已執行並符合預期的測試證據，1 項最終檢查尚待完成。**

此統計僅針對本章列出的主要測試，不代表完整自動化測試覆蓋率。

## 29.11 尚未執行的進階測試

以下項目目前不得標記 PASS。

| Test ID         | 測試項目                           | 狀態    |
| --------------- | ---------------------------------- | ------- |
| ANALYTICS-11-31 | 大量交易統計效能                   | NOT RUN |
| ANALYTICS-11-32 | 極大金額加總邊界                   | NOT RUN |
| ANALYTICS-11-33 | 異常日期資料處理                   | NOT RUN |
| ANALYTICS-11-34 | 異常 API 回應格式                  | NOT RUN |
| ANALYTICS-11-35 | 分析頁面載入時網路中斷             | NOT RUN |
| ANALYTICS-11-36 | 交易更新與讀取請求競態             | NOT RUN |
| ANALYTICS-11-37 | 長時間離線恢復                     | NOT RUN |
| ANALYTICS-11-38 | 全部月份為零的更多邊界情境         | NOT RUN |
| ANALYTICS-11-39 | 各種手機尺寸完整響應式驗收         | NOT RUN |
| ANALYTICS-11-40 | 多瀏覽器相容性                     | NOT RUN |
| ANALYTICS-11-41 | 圖表完整鍵盤及螢幕閱讀器驗收       | NOT RUN |
| ANALYTICS-11-42 | 完整自動化分析模組單元測試         | NOT RUN |
| ANALYTICS-11-43 | 完整 CRUD 與分析端對端回歸測試     | NOT RUN |
| ANALYTICS-11-44 | 伺服器重新啟動前後的獨立持久化測試 | NOT RUN |
| ANALYTICS-11-45 | 全系統正式驗收                     | NOT RUN |

這些測試可以在後續系統品質改善與正式發布準備階段執行。

本階段已完成的 API 查詢與 SQLite 完整性檢查，不等同於已完成獨立的伺服器重新啟動持久化測試。

## 29.12 測試過程中的重要觀察

### 觀察一：單月統計與六個月趨勢必須分開驗證

選取 2027 年 2 月時：

- 單月統計可以全部為零。
- 六個月趨勢仍應包含 2026 年 11 月的交易。

本階段已透過跨年測試確認此行為正常。

### 觀察二：分類切換不代表刪除其他類型

切換收入分類時，當月支出仍必須保持原本金額。

本階段已透過收入及支出同時存在的測試確認。

### 觀察三：交易日期變更比金額變更更需要檢查

修改金額只影響一個月份的數值。

修改日期則可能同時影響兩個月份。

因此特別執行 ID 9 從 2026 年 11 月移至 10 月的測試，並確認兩個月份均重新計算。

### 觀察四：視覺圖表不能取代數值驗證

相同最高值基準下，最大支出月份的長條可能始終填滿。

即使金額從 NT$330 變成 NT$380 或 NT$410，長條仍可能保持滿格。

因此需要同時檢查文字金額。

### 觀察五：前端畫面不能取代資料庫檢查

前端顯示刪除成功後，另以 API 查詢及 SQLite 檢查確認資料狀態。

此方式有助於避免僅因畫面更新就誤認為資料庫一定正確。

## 29.13 最終資料狀態

截至本次最終 API 與 SQLite 查詢：

| ID  | 日期       | 類型 | 分類 |   金額 |
| --- | ---------- | ---- | ---- | -----: |
| 3   | 2026-11-10 | 支出 | 餐飲 | NT$180 |
| 1   | 2026-11-09 | 支出 | 餐飲 | NT$150 |

合計：

- 交易數量：2。
- 2026 年 11 月收入：NT$0。
- 2026 年 11 月支出：NT$330。
- 2026 年 11 月淨額：-NT$330。

測試交易 ID 8、ID 9 均已清理。

本表為測試完成時的資料快照，不代表未來正式使用時只能有這兩筆交易。

## 29.14 測試證據與可追溯性

本章測試證據主要來自：

1. Microsoft Edge 實際操作畫面。
2. 財務分析統計畫面。
3. 分類占比及環形圖畫面。
4. 六個月趨勢圖畫面。
5. 編輯及刪除後的操作提示。
6. PowerShell REST API 查詢。
7. `server/check-db.js` 輸出。
8. JavaScript 語法檢查。
9. Git 差異與檔案狀態檢查。

相關畫面已在開發期間提供並逐項核對，但未在本章宣稱已將所有截圖正式存入 Git Repository。

如果未來需要提交正式測試證據，可另外規劃截圖歸檔及證據檔名制度。

## 29.15 Git 版本及文件狀態

前一個正式提交基準：

`d4148f1`

提交說明：

`feat: implement frontend transaction deletion and document tests`

本次 Milestone 11 的程式碼及文件尚未建立正式 Git Commit。

目前正在進行 Milestone 11-4 文件整理。

需要同步整理：

- `CHANGELOG.md`
- `docs/DEVELOPMENT_LOG.md`
- `docs/TESTING.md`
- `README.md`

文件完成後，應重新檢查：

- 程式碼語法。
- Git 檔案清單。
- Git Diff。
- 文件狀態一致性。
- 測試編號。
- 尚未執行的測試。
- Git Commit 與 Push 狀態。

不得將文件撰寫完成視為已經推送到 GitHub。

## 29.16 Milestone 11 測試結論

Milestone 11-1 的每月財務統計及分類統計已完成既定主要測試。

Milestone 11-2 的分類占比環形圖及收入支出比較圖已完成既定主要測試。

Milestone 11-3 的最近六個月收支趨勢已完成既定主要測試，包括：

- 六個月份範圍。
- 跨年月份排列。
- 空月份處理。
- 收支與淨額計算。
- 新增交易後的趨勢更新。
- 修改交易金額後的趨勢更新。
- 修改交易日期後的跨月份更新。
- 刪除交易後的趨勢更新。
- 測試交易清理。
- 最終 API 查詢。
- SQLite 完整性及外鍵檢查。

上述主要功能測試可記錄為 PASS。

但本章列出的進階異常、效能、相容性及自動化測試仍有 NOT RUN 項目。

Milestone 11-4 文件整理尚未全部完成。

整個 Milestone 11 尚待最終文件一致性核對、Git Commit 與 GitHub Push。

**Milestone 11-1～11-3 主要功能測試：PASS。**

**Milestone 11-4 文件與版本管理：進行中。**

**Money Tracker 完整系統驗收：尚未完成。**

**正式 GitHub Release：尚未發布。**

---
