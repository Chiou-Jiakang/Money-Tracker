# Money Tracker｜測試報告

## 測試環境

- Operating System：Windows
- Runtime：Node.js 24
- Backend：Express
- Database：SQLite
- API Base URL：http://localhost:3000
- Testing Tools：Microsoft Edge、PowerShell
- 測試日期：2026-11-09

---

## 1. 基礎 API 測試

| ID     | 測試項目                        | 結果 |
| ------ | ------------------------------- | ---- |
| API-01 | GET /api/health                 | PASS |
| API-02 | GET /api/categories             | PASS |
| API-03 | GET /api/transactions（空資料） | PASS |
| API-04 | Dashboard 首頁顯示              | PASS |

### 測試結果

- Health API 回傳 status: ok。
- Categories API 回傳八筆分類。
- Transactions API 在無資料時回傳空陣列。
- Dashboard 在桌面瀏覽器正常顯示。

---

## 2. POST /api/transactions

| ID      | 測試案例          | 預期     | 結果 |
| ------- | ----------------- | -------- | ---- |
| POST-01 | 有效交易          | 成功建立 | PASS |
| POST-02 | 負數金額          | HTTP 400 | PASS |
| POST-03 | 不存在的分類 ID   | HTTP 400 | PASS |
| POST-04 | 無效日期          | HTTP 400 | PASS |
| POST-05 | 金額為零          | HTTP 400 | PASS |
| POST-06 | 小數金額          | HTTP 400 | PASS |
| POST-07 | 備註超過 500 字元 | HTTP 400 | PASS |

### 有效交易測試

- category_id：4
- amount：120
- transaction_date：2026-11-09
- note：Lunch test

結果：

- POST API 回傳 success: true。
- 新增交易 ID 為 1。
- GET API 成功查詢該筆交易。

### 錯誤資料驗證

- 負數金額遭拒絕。
- 零元金額遭拒絕。
- 小數金額遭拒絕。
- 不存在的分類遭拒絕。
- 不存在的日期遭拒絕。
- 過長備註遭拒絕。

上述非法輸入測試均收到 HTTP 400。

---

## 3. 資料完整性測試

| ID    | 測試項目                 | 結果 |
| ----- | ------------------------ | ---- |
| DB-01 | SQLite 初始化            | PASS |
| DB-02 | 資料表欄位檢查           | PASS |
| DB-03 | 外鍵結構檢查             | PASS |
| DB-04 | Integrity Check          | PASS |
| DB-05 | Foreign Key Check        | PASS |
| DB-06 | Git 忽略 .db 檔案        | PASS |
| DB-07 | 非法 POST 後交易筆數不變 | PASS |
| DB-08 | 重啟伺服器後資料持續存在 | PASS |

### 資料持久化驗證

操作：

1. 成功新增一筆測試交易。
2. 確認 GET API 回傳一筆交易。
3. 停止 Express 伺服器。
4. 重新啟動 Express 伺服器。
5. 再次查詢 GET /api/transactions。

實際結果：

- 交易筆數仍為 1。
- 已新增資料沒有因伺服器重啟而消失。

---

## 4. 尚未完成的測試

- PUT 交易修改測試。
- DELETE 交易刪除測試。
- 其他 JSON 輸入型態與邊界測試。
- 資料庫約束的完整負向測試。
- 前端表單測試。
- 財務統計正確性測試。
- CSV 匯出測試。
- 行動裝置版面測試。

---

## 測試結論

目前已執行的 GET、POST、資料庫結構、
輸入驗證及資料持久化測試均符合預期。

目前尚未完成全部 CRUD 與前端整合，
因此本報告不代表完整系統驗收。
