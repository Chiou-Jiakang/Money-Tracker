"use strict";

// Money Tracker
// Milestone 10-1：前端資料讀取與 Dashboard 動態整合

// 1. 取得 HTML 元素
const incomeElement = document.getElementById("total-income");
const expenseElement = document.getElementById("total-expense");
const balanceElement = document.getElementById("net-balance");

const transactionsBody = document.getElementById("recent-transactions");

const transactionsStatus = document.getElementById("transactions-status");

// 2. 將金額格式化為新臺幣
function formatMoney(amount) {
  const number = Number(amount);

  const formatted = Math.abs(number).toLocaleString("zh-TW");

  if (number < 0) {
    return `-NT$${formatted}`;
  }

  return `NT$${formatted}`;
}

// 3. 取得目前月份（使用瀏覽器本地時間）
function getCurrentMonth() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");

  return `${year}-${month}`;
}

// 4. 計算本月收入、支出及收支淨額
function updateDashboard(transactions) {
  const currentMonth = getCurrentMonth();

  let totalIncome = 0;
  let totalExpense = 0;

  for (const transaction of transactions) {
    const transactionMonth = transaction.transaction_date.slice(0, 7);

    // 只統計本月份交易
    if (transactionMonth !== currentMonth) {
      continue;
    }

    const amount = Number(transaction.amount);

    if (transaction.type === "income") {
      totalIncome += amount;
    } else if (transaction.type === "expense") {
      totalExpense += amount;
    }
  }

  const netBalance = totalIncome - totalExpense;

  // 更新 Dashboard 卡片
  incomeElement.textContent = formatMoney(totalIncome);
  expenseElement.textContent = formatMoney(totalExpense);
  balanceElement.textContent = formatMoney(netBalance);
}

// 5. 建立空資料提示列
function createEmptyRow(message) {
  const row = document.createElement("tr");
  const cell = document.createElement("td");

  cell.colSpan = 5;
  cell.className = "empty-state";
  cell.textContent = message;

  row.appendChild(cell);

  return row;
}

// 6. 將交易資料顯示在網頁表格
function renderTransactions(transactions) {
  // 清除原本的載入提示或舊資料
  transactionsBody.replaceChildren();

  // 沒有交易紀錄時顯示空狀態
  if (transactions.length === 0) {
    transactionsBody.appendChild(createEmptyRow("目前尚無交易紀錄"));

    transactionsStatus.textContent = "目前共有 0 筆交易。";
    return;
  }

  // 後端已依日期排序，首頁顯示最近 10 筆
  const recentTransactions = transactions.slice(0, 10);

  for (const transaction of recentTransactions) {
    const row = document.createElement("tr");

    const typeName = transaction.type === "income" ? "收入" : "支出";

    const amountPrefix = transaction.type === "income" ? "+" : "-";

    const values = [
      transaction.transaction_date,
      typeName,
      transaction.category_name,
      `${amountPrefix}${formatMoney(transaction.amount)}`,
      transaction.note || "—",
    ];

    values.forEach((value, index) => {
      const cell = document.createElement("td");

      // 使用 textContent，避免備註被解析為 HTML
      cell.textContent = String(value);

      // 金額依收支類型顯示不同顏色
      if (index === 3) {
        cell.style.color =
          transaction.type === "income" ? "#4ade80" : "#fb7185";
      }

      row.appendChild(cell);
    });

    transactionsBody.appendChild(row);
  }

  transactionsStatus.textContent =
    `目前共有 ${transactions.length} 筆交易，` +
    `顯示最近 ${recentTransactions.length} 筆。`;
}

// 7. 向 Express API 取得交易資料
async function loadTransactions() {
  try {
    transactionsStatus.textContent = "正在載入交易資料...";

    const response = await fetch("/api/transactions", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();

    // 檢查 API 回應格式
    if (result.success !== true || !Array.isArray(result.data)) {
      throw new Error("API 回傳格式不正確");
    }

    const transactions = result.data;

    // 更新本月財務資訊
    updateDashboard(transactions);

    // 更新最近交易紀錄
    renderTransactions(transactions);

    console.log("Money Tracker transactions loaded:", transactions.length);
  } catch (error) {
    console.error("Failed to load transactions:", error);

    // 發生錯誤時，不顯示可能誤導使用者的零元統計
    incomeElement.textContent = "—";
    expenseElement.textContent = "—";
    balanceElement.textContent = "—";

    transactionsBody.replaceChildren(
      createEmptyRow("交易資料載入失敗，請稍後重試。"),
    );

    transactionsStatus.textContent = `資料讀取失敗：${error.message}`;
  }
}

// 8. 首次載入網頁時執行
loadTransactions();
