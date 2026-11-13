# Money Tracker｜個人財務管理系統

Money Tracker 是一套使用 **HTML、CSS、JavaScript、Node.js、Express 與 SQLite** 開發的個人財務管理網頁應用程式。

專案以單一使用者的本機財務管理為核心，提供收入與支出紀錄、交易新增與修改、財務總覽，以及每月與跨月份的財務統計分析。

本專案採用前後端分離職責的全端架構，透過 REST API 進行資料操作，並由 SQLite 負責持久化儲存。

## 一、專案目標

建立一套能夠記錄、管理、查詢及分析個人收入與支出的全端網頁應用程式。

主要目標包括：

- 實作完整的交易資料 CRUD 操作。
- 使用 SQLite 持久化儲存個人收支紀錄。
- 建立直觀的財務總覽 Dashboard。
- 依月份統計收入、支出及收支淨額。
- 分析不同收支分類的金額及占比。
- 使用圖表呈現財務資料。
- 比較最近六個月的收支變化。
- 持續改善查詢、匯出、測試及系統品質。
- 保留完整的開發、測試與版本變更紀錄。

## 二、目前已實作功能

### 2.1 財務總覽 Dashboard

- 顯示本月總收入。
- 顯示本月總支出。
- 顯示本月收支淨額。
- 根據交易資料計算統計結果。
- 交易新增、編輯或刪除後重新更新畫面。

### 2.2 收入與支出交易管理

支援完整的交易 CRUD：

- Create：新增收入或支出交易。
- Read：查詢交易紀錄。
- Update：編輯既有交易。
- Delete：刪除指定交易。

交易資料包含：

- 交易 ID。
- 收支類型。
- 交易分類。
- 交易金額。
- 交易日期。
- 備註。
- 建立時間。

其他功能：

- 交易輸入表單。
- 收支分類選擇。
- 正整數金額驗證。
- 日期格式與有效性驗證。
- 備註長度限制。
- 編輯模式與取消編輯。
- 刪除前確認。
- 操作成功與失敗提示。
- 操作後更新 Dashboard 與交易清單。

### 2.3 交易分類

系統目前提供八種預設分類。

**收入分類：**

- 薪資
- 獎金
- 其他收入

**支出分類：**

- 餐飲
- 交通
- 購物
- 娛樂
- 其他支出

新增與編輯交易時，可以根據收支類型選擇適用的分類。

目前尚未提供使用者自行新增、重新命名或刪除分類的完整管理介面。

### 2.4 每月財務統計 Analytics

- 選擇指定統計月份。
- 計算該月收入。
- 計算該月支出。
- 計算該月淨額。
- 切換收入分類與支出分類。
- 顯示分類交易筆數。
- 顯示分類金額合計。
- 計算各分類占比。
- 顯示分類占比進度條。
- 處理沒有交易紀錄的月份。

### 2.5 財務視覺化圖表

目前使用原生 JavaScript、HTML 與 CSS 實作圖表，沒有使用 Chart.js。

已實作：

**分類占比環形圖**

- 顯示各分類的金額占比。
- 以不同顏色區分分類。
- 顯示分類圖例。
- 顯示分類金額與百分比。
- 顯示所選收支類型的合計金額。
- 支援空資料提示。

**收入與支出比較圖**

- 以水平長條比較當月收入與支出。
- 根據較高金額建立共同的比例基準。
- 顯示實際收入及支出金額。
- 正確處理收入與支出均為零的情況。

### 2.6 最近六個月收支趨勢

- 以所選統計月份作為最後一個月份。
- 顯示該月及前五個月，共六個月份。
- 顯示各月收入。
- 顯示各月支出。
- 顯示各月淨額。
- 使用不同顏色區分收入與支出。
- 使用共同高度基準比較不同月份。
- 支援跨年月份排列。
- 保留無交易月份並顯示 NT$0。
- 小螢幕可水平捲動圖表。
- 新增、修改、刪除交易後重新計算趨勢。


### 2.7 交易進階篩選與搜尋

Milestone 12 新增交易紀錄進階篩選功能，方便使用者依不同條件查找收入及支出紀錄。

支援以下篩選條件：

- 開始日期與結束日期。
- 收入或支出類型。
- 指定交易分類。
- 最低交易金額。
- 最高交易金額。
- 交易分類名稱或備註關鍵字。

主要功能：

- 支援多項篩選條件組合查詢。
- 提供「套用篩選」及「清除條件」按鈕。
- 顯示符合條件的交易紀錄。
- 沒有符合結果時，顯示空清單。
- 對不合法的查詢條件提供錯誤回應。
- 篩選結果與完整交易資料分開管理。
- 保留既有交易新增、編輯及刪除功能。

進階篩選透過既有的 GET /api/transactions API 執行。

篩選交易清單不會直接修改 SQLite 交易資料，也不應改變 Dashboard 與 Analytics 使用的完整交易資料來源。

本階段已通過核心 API 測試與唯讀自動化檢查，但最新版完整瀏覽器端對端驗收仍待補充。


## 三、技術架構

| 層級            | 使用技術                             |
| --------------- | ------------------------------------ |
| Frontend        | HTML5、CSS3、Vanilla JavaScript      |
| Backend         | Node.js、Express                     |
| Database        | SQLite（Node.js 內建 `node:sqlite`） |
| API             | REST API、JSON                       |
| Charts          | 原生 JavaScript、CSS                 |
| Development     | VS Code、PowerShell                  |
| Version Control | Git、GitHub                          |

本專案沒有使用 React、Vue 或其他前端框架。

目前圖表也沒有引入 Chart.js。

### 3.1 系統資料流程

使用者透過瀏覽器操作 Money Tracker。

前端 JavaScript 呼叫 Express REST API。

Express 執行資料驗證及 SQLite 查詢或更新。

API 將結果以 JSON 回傳前端。

前端重新載入交易資料後，更新：

- Dashboard。
- 最近交易紀錄。
- 每月財務統計。
- 分類占比圖表。
- 收入與支出比較圖。
- 六個月趨勢圖。

### 3.2 主要檔案結構

`public/`

- `index.html`：網頁主要結構。
- `style.css`：網頁樣式與圖表排版。
- `app.js`：交易管理、Dashboard 與 API 資料載入。
- `analytics.js`：每月財務統計及視覺化分析。

`server/`

- `server.js`：Express 伺服器與 REST API。
- `init-db.js`：SQLite 資料庫初始化。
- `check-db.js`：資料表、外鍵及完整性檢查。

`data/`

- `money-tracker.db`：本機 SQLite 資料庫。

`docs/`

- `DEVELOPMENT_LOG.md`：開發歷程及技術紀錄。
- `TESTING.md`：測試案例與結果。

專案根目錄：

- `package.json`：Node.js 專案設定及執行指令。
- `package-lock.json`：套件相依版本鎖定。
- `.gitignore`：Git 忽略規則。
- `CHANGELOG.md`：功能與版本更新紀錄。
- `README.md`：專案介紹及使用說明。

**注意：** 本機 SQLite 資料庫檔案會被 `.gitignore` 排除，不會直接上傳 GitHub。

## 四、REST API

目前已實作以下端點：

| HTTP Method | Endpoint                | 功能           |
| ----------- | ----------------------- | -------------- |
| GET         | `/api/health`           | 伺服器健康檢查 |
| GET         | `/api/categories`       | 查詢收支分類   |
| GET         | `/api/transactions`     | 查詢交易紀錄   |
| POST        | `/api/transactions`     | 新增交易       |
| PUT         | `/api/transactions/:id` | 修改指定交易   |
| DELETE      | `/api/transactions/:id` | 刪除指定交易   |

API 使用 JSON 傳遞資料。

交易新增及修改操作會進行資料驗證，包含交易分類、金額、日期及備註等欄位。

部分錯誤情境會回傳對應的 HTTP 狀態碼，例如 400、404 或 500。

### 4.1 交易進階篩選參數

Milestone 12 擴充 `GET /api/transactions`，支援以下 Query Parameters：

| 參數 | 說明 |
|---|---|
| `from` | 起始日期，格式 YYYY-MM-DD |
| `to` | 結束日期，格式 YYYY-MM-DD |
| `type` | `income` 或 `expense` |
| `category_id` | 指定交易分類 ID |
| `min_amount` | 最低交易金額 |
| `max_amount` | 最高交易金額 |
| `keyword` | 搜尋分類名稱或交易備註 |

可以組合多個條件，例如：

`GET /api/transactions?type=expense&min_amount=100`

在 PowerShell 中可使用：

`Invoke-RestMethod -Uri "http://127.0.0.1:3000/api/transactions?type=expense&min_amount=100"`

查無符合條件的交易時，正常回傳空資料清單。

不合法日期、金額上下限顛倒或未知查詢參數，會回傳 HTTP 400。

篩選查詢只讀取交易資料，不會直接修改 SQLite。

## 五、本機執行方式

### 5.1 執行環境

需安裝：

- Node.js（支援內建 `node:sqlite` 的版本）。
- npm。
- Git（需要版本管理時）。
- 現代網頁瀏覽器。

可使用 Windows PowerShell 或 VS Code 整合終端機執行指令。

### 5.2 安裝專案相依套件

首次取得專案後，進入專案資料夾。

執行：

`npm install`

本專案主要使用 Express 作為後端套件。

### 5.3 初始化資料庫

如果是第一次執行，而且尚未建立 `data/money-tracker.db`，請執行：

`node server/init-db.js`

此指令會建立必要的資料表及預設分類。

若已經存在正常使用中的資料庫，通常不需要重新執行初始化。

正式操作前，建議妥善備份重要財務資料。

### 5.4 啟動伺服器

執行：

`npm start`

預設伺服器網址：

`http://localhost:3000`

在瀏覽器開啟該網址，即可使用 Money Tracker。

開發時也可以使用：

`npm run dev`

此指令使用 Node.js 的 watch 模式啟動伺服器。

### 5.5 關閉伺服器

通常可在執行伺服器的終端機按下 `Ctrl + C`。

若系統仍可連線至 port 3000，請進一步確認是否有背景 Node.js 行程仍在執行。

不建議在未確認行程用途前，直接結束所有 Node.js 程序。

## 六、基本測試方式

### 6.1 JavaScript 語法檢查

執行：

`node --check public/app.js`

`node --check public/analytics.js`

`node --check server/server.js`

此檢查用於驗證 JavaScript 基本語法，不代表完整功能測試已通過。

### 6.2 資料庫檢查

執行：

`node server/check-db.js`

檢查項目包含：

- 資料表結構。
- 外鍵關聯。
- SQLite Integrity Check。
- Foreign Key Check。
- 預設分類。

### 6.3 API 查詢

啟動伺服器後，可以使用 PowerShell：

`Invoke-RestMethod -Uri "http://localhost:3000/api/transactions"`

查看 API 回傳的交易資料。

### 6.4 測試紀錄

更完整的測試案例及結果請參考：

[TESTING.md](docs/TESTING.md)

目前已有主要功能的手動測試證據，但完整的自動化測試與系統驗收仍在後續規劃中。


### 6.5 Milestone 12 唯讀檢查

2026-11-13 已於本機執行 Milestone 12 唯讀自動化檢查。

實際結果：**20/20 PASS，0 FAIL**。

檢查範圍包含：

- JavaScript 語法與關鍵程式結構。
- API 健康、分類及交易讀取。
- 日期、類型、分類、金額與關鍵字篩選。
- 不合法查詢參數的 HTTP 400 回應。
- 檢查前後的交易資料一致性。

測試程式名稱：

`Money-Tracker-M12-ReadOnly-Check.mjs`

目前該檔案儲存在本機 `C:\Projects`，不在 Git 專案內。

在 Money Tracker 專案根目錄執行：

`node C:\Projects\Money-Tracker-M12-ReadOnly-Check.mjs`

執行前須確保本機 Express 伺服器已啟動。

此程式不執行 POST、PUT 或 DELETE，但只涵蓋指定的唯讀測試情境。

**20/20 PASS 不代表已完成完整瀏覽器端對端驗收。**

最新版前端互動、網路故障時的 CRUD 操作、行動裝置及安全性驗收仍待補充。

詳細測試證據與 NOT RUN 項目請參閱 `docs/TESTING.md` 的 Milestone 12 章節。

## 七、目前開發進度

### 已完成

- Milestone 01～09：開發環境、SQLite 資料庫及 REST API。
- Milestone 10：交易 CRUD 與 Dashboard 前端整合。
- Milestone 11-1：每月財務統計與分類分析。
- Milestone 11-2：分類環形圖與收入支出比較圖。
- Milestone 11-3：最近六個月收支趨勢。
- Milestone 11-4：文件整理、Git Commit 與 GitHub Push。
- Milestone 12-1：後端進階交易篩選 API。
- Milestone 12-2：前端進階篩選搜尋與 CRUD 狀態修正。
- Milestone 12-3：本機唯讀自動化檢查，20/20 PASS。

以上代表對應的核心功能或階段工作已完成，不表示所有端對端、相容性與安全性驗收均已通過。

### 進行中

**Milestone 12-4：文件整理與版本管理**

本階段更新的文件包括：

- CHANGELOG.md
- docs/DEVELOPMENT_LOG.md
- docs/TESTING.md
- README.md

本階段的程式與文件由 Git 統一管理；實際提交與遠端同步狀態請以 GitHub main 分支的最新 Commit 為準。

### 尚未完成

- 最新版本完整的瀏覽器端對端驗收。
- CSV 資料匯出。
- 使用者自訂分類管理。
- 更完整且可重現的自動化測試。
- 大量交易資料的效能測試。
- 完整異常處理及安全性驗收。
- 多瀏覽器及多裝置相容性驗收。
- 正式版本發布與部署。

## 八、版本管理與專案文件

本專案使用 Git 與 GitHub 追蹤開發過程。

GitHub Repository：

https://github.com/Chiou-Jiakang/Money-Tracker

### 已確認的版本基準

**Milestone 10-4**

Commit：`d4148f1`

Commit Message：

`feat: implement frontend transaction deletion and document tests`

**Milestone 11**

Commit：`f17c61c`

Commit Message：

`feat: implement financial analytics and visualization with documentation`

Milestone 11 已完成 Git Commit、Push，並確認本機與 GitHub 遠端版本同步。

### Milestone 12 版本狀態

- 開發基準：`f17c61c`
- 目前狀態：Unreleased
- 核心搜尋功能：已實作
- 唯讀自動化檢查：20/20 PASS
- 完整瀏覽器端對端驗收：尚未完成
- 文件整理：已納入本階段更新
- Milestone 12 Git Commit：請參閱 Git 提交歷史
- Milestone 12 GitHub 同步：請參閱遠端 main 分支

正式提交完成前，不預先填寫 Milestone 12 的 Commit ID。

本專案 `package.json` 中的版本號 `1.0.0`，不代表已發布正式 GitHub Release。

### 文件用途

[CHANGELOG.md](CHANGELOG.md)

記錄功能變更、版本更新及階段開發成果。

[DEVELOPMENT_LOG.md](docs/DEVELOPMENT_LOG.md)

記錄架構設計、實作過程、技術決策、問題排查及修正歷程。

[TESTING.md](docs/TESTING.md)

記錄測試條件、實際結果及 PASS、FAIL、NOT RUN 狀態。

本專案持續保留重要歷史紀錄，以維持開發工作的可追溯性。

## 九、後續開發方向

完成 Milestone 12-4 的文件與版本管理後，後續重點包括：

1. 補充最新版搜尋介面的端對端驗收。
2. 新增 CSV 資料匯出。
3. 改善篩選操作與使用者介面體驗。
4. 擴充自動化測試及測試腳本版本管理。
5. 完善自訂分類管理能力。
6. 進行效能、異常及安全性測試。
7. 規劃完整產品驗收及正式版本發布。

功能規劃不代表已經實作或通過驗收。

## 十、目前專案狀態總結

Money Tracker 已完成本機全端架構、SQLite 持久化儲存、交易 CRUD、財務 Dashboard、每月分類分析、財務圖表、最近六個月收支趨勢，以及進階交易篩選搜尋的主要功能。

Milestone 12 已取得本機唯讀自動化檢查 20/20 PASS，並確認當次檢查前後交易資料保持一致。

本階段的程式與文件更新已整理，版本提交及同步結果以 GitHub 紀錄為準。完整瀏覽器端對端驗收、CSV 匯出、系統安全性及正式部署尚未完成。

因此，本專案目前仍屬於持續開發中的單人本機財務管理應用程式，而非已完成全面驗收的正式發布產品。
