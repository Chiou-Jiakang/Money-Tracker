"use strict";

// ==================================================
// Money Tracker
// Milestone 10-2：新增交易表單與 POST API 整合
// ==================================================

// 1. 取得 Dashboard 元素
const incomeElement = document.getElementById("total-income");
const expenseElement = document.getElementById("total-expense");
const balanceElement = document.getElementById("net-balance");

const transactionsBody = document.getElementById("recent-transactions");

const transactionsStatus = document.getElementById("transactions-status");

// 2. 取得新增交易表單元素
const transactionForm = document.getElementById("transaction-form");

const typeElement = document.getElementById("transaction-type");

const categoryElement = document.getElementById("transaction-category");

const amountElement = document.getElementById("transaction-amount");

const dateElement = document.getElementById("transaction-date");

const noteElement = document.getElementById("transaction-note");

const saveButton = document.getElementById("save-transaction");

const formStatus = document.getElementById("form-status");

// 3. 儲存從 API 取得的分類
let allCategories = [];

// 4. 格式化新臺幣金額
function formatMoney(amount) {
  const number = Number(amount);
  const formatted = Math.abs(number).toLocaleString("zh-TW");

  if (number < 0) {
    return `-NT$${formatted}`;
  }

  return `NT$${formatted}`;
}

// 5. 取得本地日期 YYYY-MM-DD
function getLocalDate() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// 6. 取得目前月份
function getCurrentMonth() {
  return getLocalDate().slice(0, 7);
}

// 7. 檢查日期是否真實存在
function isValidDate(dateString) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return false;
  }

  const parsedDate = new Date(`${dateString}T00:00:00.000Z`);

  if (Number.isNaN(parsedDate.getTime())) {
    return false;
  }

  return parsedDate.toISOString().slice(0, 10) === dateString;
}

// 8. 設定表單訊息
function setFormStatus(message, status = "normal") {
  formStatus.textContent = message;

  formStatus.className = "form-feedback";

  if (status === "success") {
    formStatus.classList.add("success");
  } else if (status === "error") {
    formStatus.classList.add("error");
  }
}

// 9. 計算本月財務統計
function updateDashboard(transactions) {
  const currentMonth = getCurrentMonth();

  let totalIncome = 0;
  let totalExpense = 0;

  for (const transaction of transactions) {
    const transactionMonth = transaction.transaction_date.slice(0, 7);

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

  incomeElement.textContent = formatMoney(totalIncome);
  expenseElement.textContent = formatMoney(totalExpense);
  balanceElement.textContent = formatMoney(netBalance);
}

// 10. 建立表格空狀態
function createEmptyRow(message) {
  const row = document.createElement("tr");
  const cell = document.createElement("td");

  cell.colSpan = 5;
  cell.className = "empty-state";
  cell.textContent = message;

  row.appendChild(cell);

  return row;
}

// 11. 顯示最近交易
function renderTransactions(transactions) {
  transactionsBody.replaceChildren();

  if (transactions.length === 0) {
    transactionsBody.appendChild(createEmptyRow("目前尚無交易紀錄"));

    transactionsStatus.textContent = "目前共有 0 筆交易。";

    return;
  }

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

      // 使用 textContent，避免將使用者備註解析為 HTML
      cell.textContent = String(value);

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

// 12. 從 API 重新取得交易清單
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

    if (result.success !== true || !Array.isArray(result.data)) {
      throw new Error("API 回傳格式不正確");
    }

    const transactions = result.data;

    updateDashboard(transactions);
    renderTransactions(transactions);

    console.log("Money Tracker transactions loaded:", transactions.length);

    return true;
  } catch (error) {
    console.error("Failed to load transactions:", error);

    incomeElement.textContent = "—";
    expenseElement.textContent = "—";
    balanceElement.textContent = "—";

    transactionsBody.replaceChildren(
      createEmptyRow("交易資料載入失敗，請重新整理。"),
    );

    transactionsStatus.textContent = `資料讀取失敗：${error.message}`;

    return false;
  }
}

// 13. 根據收支類型更新分類選單
function renderCategoryOptions() {
  const selectedType = typeElement.value;

  const filteredCategories = allCategories.filter(
    (category) => category.type === selectedType,
  );

  categoryElement.replaceChildren();

  if (filteredCategories.length === 0) {
    const option = document.createElement("option");

    option.value = "";
    option.textContent = "沒有可用分類";

    categoryElement.appendChild(option);
    categoryElement.disabled = true;
    saveButton.disabled = true;

    return;
  }

  for (const category of filteredCategories) {
    const option = document.createElement("option");

    option.value = String(category.id);
    option.textContent = category.name;

    categoryElement.appendChild(option);
  }

  categoryElement.disabled = false;
  saveButton.disabled = false;
}

// 14. 從後端 API 載入分類
async function loadCategories() {
  categoryElement.disabled = true;
  saveButton.disabled = true;

  try {
    const response = await fetch("/api/categories", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();

    if (result.success !== true || !Array.isArray(result.data)) {
      throw new Error("分類 API 回傳格式不正確");
    }

    allCategories = result.data;

    renderCategoryOptions();

    if (categoryElement.disabled) {
      setFormStatus("目前沒有此收支類型的分類。", "error");
    } else {
      setFormStatus("分類載入完成，可以新增交易。");
    }

    console.log("Money Tracker categories loaded:", allCategories.length);
  } catch (error) {
    console.error("Failed to load categories:", error);

    allCategories = [];

    renderCategoryOptions();

    setFormStatus(`分類載入失敗：${error.message}。請重新整理頁面。`, "error");
  }
}

// 15. 切換收入 / 支出時重新篩選分類
typeElement.addEventListener("change", () => {
  renderCategoryOptions();

  if (categoryElement.disabled) {
    setFormStatus("目前沒有可用分類。", "error");
  } else {
    setFormStatus("請填寫交易資料。");
  }
});

// 16. 驗證並新增交易
transactionForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (saveButton.disabled) {
    return;
  }

  const type = typeElement.value;
  const categoryId = Number(categoryElement.value);

  const amountText = amountElement.value.trim();
  const amount = Number(amountText);

  const transactionDate = dateElement.value;
  const note = noteElement.value;

  // 驗證分類是否屬於所選的收支類型
  const validCategory = allCategories.some(
    (category) => category.id === categoryId && category.type === type,
  );

  if (!validCategory) {
    setFormStatus("請選擇有效的交易分類。", "error");
    return;
  }

  // 金額必須為正整數
  if (!/^[1-9]\d*$/.test(amountText) || !Number.isSafeInteger(amount)) {
    setFormStatus("金額必須是大於零的安全整數。", "error");
    return;
  }

  // 日期必須為真實存在的日期
  if (!isValidDate(transactionDate)) {
    setFormStatus("請輸入有效的交易日期。", "error");
    return;
  }

  // 備註限制
  if (note.length > 500) {
    setFormStatus("備註不得超過 500 個字串長度單位。", "error");
    return;
  }

  const transactionData = {
    category_id: categoryId,
    amount: amount,
    transaction_date: transactionDate,
    note: note,
  };

  saveButton.disabled = true;
  setFormStatus("正在儲存交易...");

  try {
    // 發送 POST 請求，將交易寫入 SQLite
    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactionData),
    });

    const result = await response.json();

    if (!response.ok || result.success !== true) {
      throw new Error(result.message || `HTTP ${response.status}`);
    }

    // 成功後清空表單
    transactionForm.reset();
    dateElement.value = getLocalDate();
    renderCategoryOptions();

    // 重新讀取 SQLite 中的最新資料
    const refreshed = await loadTransactions();

    if (refreshed) {
      setFormStatus(
        `交易新增成功！交易 ID：${result.data.id}。` +
          " Dashboard 與交易清單已更新。",
        "success",
      );
    } else {
      setFormStatus(
        "交易已新增，但交易清單重新整理失敗，" + "請重新整理網頁確認。",
        "error",
      );
    }
  } catch (error) {
    console.error("Failed to create transaction:", error);

    setFormStatus(
      `新增交易失敗：${error.message}。` +
        " 若剛才發生連線中斷，請先確認交易清單，" +
        "避免重複新增。",
      "error",
    );
  } finally {
    saveButton.disabled = categoryElement.disabled;
  }
});

// 17. 初始化網頁
function initializeApp() {
  // 預設交易日期為今天
  dateElement.value = getLocalDate();

  // 載入交易與分類
  loadTransactions();
  loadCategories();
}

initializeApp();
