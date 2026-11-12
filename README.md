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

## 七、目前開發進度

### 已完成

- Milestone 01～09：環境、資料庫及 REST API 基礎。
- Milestone 10-1：前端 Dashboard 與交易資料整合。
- Milestone 10-2：前端新增交易。
- Milestone 10-3：前端編輯交易。
- Milestone 10-4：前端刪除交易。
- Milestone 11-1：每月財務統計與分類分析。
- Milestone 11-2：環形圖與收入支出比較圖。
- Milestone 11-3：最近六個月收支趨勢。

上述功能已完成主要本機實作及既定手動測試。

### 進行中

**Milestone 11-4：文件整理與版本管理**

包含：

- 更新 CHANGELOG。
- 更新 DEVELOPMENT_LOG。
- 更新 TESTING。
- 更新 README。
- 核對文件與實際功能。
- 執行最終檢查。
- 建立 Git Commit。
- Push 至 GitHub。

### 尚未完成

- 交易日期、分類及金額的進階篩選。
- CSV 資料匯出。
- 完整使用者自訂分類管理。
- 更完整的自動化測試。
- 大量資料效能測試。
- 完整的異常與安全性測試。
- 多瀏覽器及多裝置相容性驗收。
- 正式版本發布及部署。

## 八、版本管理與專案文件

本專案使用 Git 與 GitHub 追蹤開發過程。

GitHub Repository：

https://github.com/Chiou-Jiakang/Money-Tracker

Milestone 10-4 已提交並推送至 GitHub。

已確認的前一個提交基準：

`d4148f1`

Commit Message：

`feat: implement frontend transaction deletion and document tests`

Milestone 11 的功能開發與主要測試已完成，目前仍在進行文件整理及正式版本提交。

本專案 `package.json` 雖然設定了版本號 `1.0.0`，但不代表目前已發布正式 GitHub Release。

### 文件用途

[CHANGELOG.md](CHANGELOG.md)

記錄功能變更及版本更新。

[DEVELOPMENT_LOG.md](docs/DEVELOPMENT_LOG.md)

記錄實作細節、架構設計、開發歷程與技術決策。

[TESTING.md](docs/TESTING.md)

記錄測試條件、執行方式、預期結果、實際結果及測試狀態。

本專案保留歷史紀錄，並區分已完成、進行中及尚未執行的項目，以維持開發過程的可追溯性。

## 九、後續開發方向

接下來的開發重點包括：

1. 完成 Milestone 11-4 的文件及版本提交。
2. 建立交易進階查詢與篩選功能。
3. 新增 CSV 資料匯出。
4. 改善使用者介面與操作體驗。
5. 補強錯誤處理、資料驗證及自動化測試。
6. 進行更完整的系統驗收。
7. 規劃正式版本發布。

## 十、目前專案狀態總結

Money Tracker 已完成基本全端架構、SQLite 交易資料儲存、完整交易 CRUD、財務 Dashboard、每月分類分析與最近六個月收支趨勢。

目前系統可在本機執行，並已通過既定主要功能測試。

但進階查詢、CSV 匯出及完整系統驗收仍未完成，因此目前仍屬於持續開發中的個人全端專案。

後續將持續以功能實作、測試驗證、文件記錄及 Git 版本管理的方式推進開發。
