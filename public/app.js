"use strict";

// ============================================================
// Money Tracker | Milestone 10-4
// Dashboard + POST 新增 + PUT 編輯 + DELETE 刪除
// 基準版本：Milestone 10-3 (Git Commit 6a10ae1)
// ============================================================

// 1. Dashboard 與交易列表
const incomeElement = document.getElementById("total-income");
const expenseElement = document.getElementById("total-expense");
const balanceElement = document.getElementById("net-balance");
const transactionsBody = document.getElementById("recent-transactions");
const transactionsStatus = document.getElementById("transactions-status");

// 新增：刪除操作專用訊息區
const deleteStatus = document.getElementById("delete-status");

// 2. 新增與編輯共用表單
const editorSection = document.getElementById("transaction-editor");
const formHeading = document.getElementById("form-heading");
const formDescription = document.getElementById("form-description");
const transactionForm = document.getElementById("transaction-form");
const typeElement = document.getElementById("transaction-type");
const categoryElement = document.getElementById("transaction-category");
const amountElement = document.getElementById("transaction-amount");
const dateElement = document.getElementById("transaction-date");
const noteElement = document.getElementById("transaction-note");
const saveButton = document.getElementById("save-transaction");
const cancelEditButton = document.getElementById("cancel-edit");
const formStatus = document.getElementById("form-status");

// 3. 共用狀態
let allCategories = [];
let allTransactions = [];

// null：新增模式
// 數字：目前正在編輯的交易 ID
let editingTransactionId = null;

// 新增、修改、刪除共用操作鎖
let isSubmitting = false;

let categoriesReady = false;
let transactionsLoadFailed = false;

// 4. 格式化金額
function formatMoney(amount) {
  const number = Number(amount);
  const formatted = Math.abs(number).toLocaleString("zh-TW");

  return number < 0 ? `-NT$${formatted}` : `NT$${formatted}`;
}

// 5. 使用本地日期
function getLocalDate() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getCurrentMonth() {
  return getLocalDate().slice(0, 7);
}

// 6. 日期驗證
function isValidDate(dateString) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return false;
  }

  const parsedDate = new Date(`${dateString}T00:00:00.000Z`);

  return (
    !Number.isNaN(parsedDate.getTime()) &&
    parsedDate.toISOString().slice(0, 10) === dateString
  );
}

// 7. 表單訊息
function setFormStatus(message, status = "normal") {
  formStatus.textContent = message;
  formStatus.className = "form-feedback";

  if (status === "success" || status === "error") {
    formStatus.classList.add(status);
  }
}

// 8. 刪除交易訊息
function setDeleteStatus(message, status = "normal") {
  deleteStatus.textContent = message;
  deleteStatus.className = "delete-feedback";

  if (status === "success" || status === "error") {
    deleteStatus.classList.add(status);
  }
}

// 9. 更新表單按鈕狀態
function updateFormControls() {
  const canSubmit =
    categoriesReady && !categoryElement.disabled && !isSubmitting;

  saveButton.disabled = !canSubmit;
  cancelEditButton.disabled = isSubmitting;
}

// 10. Dashboard
function updateDashboard(transactions) {
  const currentMonth = getCurrentMonth();

  let totalIncome = 0;
  let totalExpense = 0;

  for (const transaction of transactions) {
    if (transaction.transaction_date.slice(0, 7) !== currentMonth) {
      continue;
    }

    const amount = Number(transaction.amount);

    if (transaction.type === "income") {
      totalIncome += amount;
    } else if (transaction.type === "expense") {
      totalExpense += amount;
    }
  }

  incomeElement.textContent = formatMoney(totalIncome);
  expenseElement.textContent = formatMoney(totalExpense);
  balanceElement.textContent = formatMoney(totalIncome - totalExpense);
}

// 11. 空資料列
function createEmptyRow(message) {
  const row = document.createElement("tr");
  const cell = document.createElement("td");

  cell.colSpan = 6;
  cell.className = "empty-state";
  cell.textContent = message;

  row.appendChild(cell);

  return row;
}

// 12. 交易清單
function renderTransactions(transactions) {
  transactionsBody.replaceChildren();

  // 避免 API 失敗時被錯誤顯示成 0 筆交易
  if (transactionsLoadFailed) {
    transactionsBody.appendChild(
      createEmptyRow("交易資料載入失敗，請重新整理頁面。"),
    );
    return;
  }

  if (transactions.length === 0) {
    transactionsBody.appendChild(createEmptyRow("目前尚無交易紀錄"));

    transactionsStatus.textContent = "目前共有 0 筆交易。";

    return;
  }

  const recentTransactions = transactions.slice(0, 10);

  for (const transaction of recentTransactions) {
    const row = document.createElement("tr");

    if (transaction.id === editingTransactionId) {
      row.classList.add("editing-row");
    }

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

      // 使用 textContent，避免備註被當成 HTML
      cell.textContent = String(value);

      if (index === 3) {
        cell.style.color =
          transaction.type === "income" ? "#4ade80" : "#fb7185";
      }

      row.appendChild(cell);
    });

    // 操作欄
    const actionCell = document.createElement("td");
    actionCell.className = "transaction-actions";

    // 編輯按鈕
    const editButton = document.createElement("button");

    editButton.type = "button";
    editButton.className = "edit-action";
    editButton.textContent = "編輯";

    editButton.setAttribute("aria-label", `編輯交易 ID ${transaction.id}`);

    editButton.disabled = isSubmitting || !categoriesReady;

    editButton.addEventListener("click", () => {
      startEditing(transaction.id);
    });

    actionCell.appendChild(editButton);

    // 新增：刪除按鈕
    const deleteButton = document.createElement("button");

    deleteButton.type = "button";
    deleteButton.className = "delete-action";
    deleteButton.textContent = "刪除";

    deleteButton.setAttribute("aria-label", `刪除交易 ID ${transaction.id}`);

    // 進行其他交易操作時，禁止重複刪除
    deleteButton.disabled = isSubmitting;

    deleteButton.addEventListener("click", () => {
      deleteTransaction(transaction.id);
    });

    actionCell.appendChild(deleteButton);

    row.appendChild(actionCell);
    transactionsBody.appendChild(row);
  }

  transactionsStatus.textContent =
    `目前共有 ${transactions.length} 筆交易，` +
    `顯示最近 ${recentTransactions.length} 筆。`;
}

// 13. 載入交易
async function loadTransactions() {
  try {
    transactionsStatus.textContent = "正在載入交易資料...";

    const response = await fetch("/api/transactions", { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();

    if (result.success !== true || !Array.isArray(result.data)) {
      throw new Error("API 回傳格式不正確");
    }

    allTransactions = result.data;
    transactionsLoadFailed = false;

    updateDashboard(allTransactions);
    renderTransactions(allTransactions);

    // Milestone 11-1：通知財務分析更新
    document.dispatchEvent(
      new CustomEvent("moneytracker:transactions-loaded", {
        detail: { transactions: allTransactions },
      }),
    );

    console.log("Money Tracker transactions loaded:", allTransactions.length);

    return true;
  } catch (error) {
    console.error("Failed to load transactions:", error);

    transactionsLoadFailed = true;
    allTransactions = [];

    incomeElement.textContent = "—";
    expenseElement.textContent = "—";
    balanceElement.textContent = "—";

    transactionsBody.replaceChildren(
      createEmptyRow("交易資料載入失敗，請重新整理頁面。"),
    );

    transactionsStatus.textContent = `資料讀取失敗：${error.message}`;
    document.dispatchEvent(new Event("moneytracker:transactions-error"));

    return false;
  }
}

// 14. 動態分類
function renderCategoryOptions(preferredCategoryId = null) {
  const filteredCategories = allCategories.filter(
    (category) => category.type === typeElement.value,
  );

  categoryElement.replaceChildren();

  if (filteredCategories.length === 0) {
    const option = document.createElement("option");

    option.value = "";
    option.textContent = "沒有可用分類";

    categoryElement.appendChild(option);
    categoryElement.disabled = true;

    updateFormControls();
    return;
  }

  for (const category of filteredCategories) {
    const option = document.createElement("option");

    option.value = String(category.id);
    option.textContent = category.name;

    categoryElement.appendChild(option);
  }

  categoryElement.disabled = false;

  if (
    preferredCategoryId !== null &&
    filteredCategories.some((category) => category.id === preferredCategoryId)
  ) {
    categoryElement.value = String(preferredCategoryId);
  }

  updateFormControls();
}

// 15. 載入分類
async function loadCategories() {
  categoriesReady = false;
  categoryElement.disabled = true;

  updateFormControls();

  try {
    const response = await fetch("/api/categories", { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();

    if (result.success !== true || !Array.isArray(result.data)) {
      throw new Error("分類 API 回傳格式不正確");
    }

    allCategories = result.data;
    categoriesReady = true;

    renderCategoryOptions();
    renderTransactions(allTransactions);

    setFormStatus(
      categoryElement.disabled
        ? "目前沒有此收支類型的分類。"
        : "分類載入完成，可以新增交易。",
      categoryElement.disabled ? "error" : "normal",
    );
  } catch (error) {
    console.error("Failed to load categories:", error);

    allCategories = [];
    categoriesReady = false;

    renderCategoryOptions();
    renderTransactions(allTransactions);

    setFormStatus(`分類載入失敗：${error.message}。請重新整理頁面。`, "error");
  }
}

// 16. 進入編輯模式
function startEditing(transactionId) {
  if (!categoriesReady || isSubmitting) {
    return;
  }

  const transaction = allTransactions.find((item) => item.id === transactionId);

  if (!transaction) {
    setFormStatus("找不到這筆交易，請重新整理頁面。", "error");
    return;
  }

  const category = allCategories.find(
    (item) => item.id === transaction.category_id,
  );

  if (!category || category.type !== transaction.type) {
    setFormStatus(
      "這筆交易的分類資料異常，無法編輯，請重新整理頁面。",
      "error",
    );
    return;
  }

  editingTransactionId = transaction.id;

  typeElement.value = transaction.type;

  renderCategoryOptions(transaction.category_id);

  amountElement.value = String(transaction.amount);

  dateElement.value = transaction.transaction_date;

  noteElement.value = transaction.note || "";

  formHeading.textContent = `編輯交易 Edit Transaction（ID：${transaction.id}）`;

  formDescription.textContent =
    "修改既有交易並儲存至 SQLite；不會新增另一筆紀錄。";

  saveButton.textContent = "儲存修改";
  cancelEditButton.hidden = false;

  editorSection.classList.add("editing");

  updateFormControls();

  setFormStatus(
    `正在編輯交易 ID ${transaction.id}；` + "可修改資料或按「取消編輯」。",
  );

  renderTransactions(allTransactions);

  editorSection.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  amountElement.focus({
    preventScroll: true,
  });
}

// 17. 返回新增模式
function resetToCreateMode() {
  editingTransactionId = null;

  transactionForm.reset();
  dateElement.value = getLocalDate();

  formHeading.textContent = "新增交易 Add Transaction";

  formDescription.textContent = "記錄新的收入或支出，資料將儲存至 SQLite。";

  saveButton.textContent = "新增交易";
  cancelEditButton.hidden = true;

  editorSection.classList.remove("editing");

  renderCategoryOptions();
  updateFormControls();
  renderTransactions(allTransactions);
}

// 18. 取消編輯
cancelEditButton.addEventListener("click", () => {
  if (isSubmitting) {
    return;
  }

  resetToCreateMode();

  setFormStatus("已取消編輯，原始交易沒有變更。", "normal");
});

// 19. 變更收支類型
typeElement.addEventListener("change", () => {
  renderCategoryOptions();

  setFormStatus(
    categoryElement.disabled ? "目前沒有可用分類。" : "請確認所選的交易分類。",
    categoryElement.disabled ? "error" : "normal",
  );
});

// ============================================================
// 20. 新增：前端刪除交易
// ============================================================

async function deleteTransaction(transactionId) {
  // 防止重複操作
  if (isSubmitting) {
    return;
  }

  // 從目前已載入的清單查找交易
  const transaction = allTransactions.find((item) => item.id === transactionId);

  if (!transaction) {
    setDeleteStatus("找不到這筆交易，請重新整理頁面。", "error");
    return;
  }

  // 顯示具體交易資料，避免刪錯紀錄
  const transactionSummary =
    `交易 ID：${transaction.id}\n` +
    `日期：${transaction.transaction_date}\n` +
    `分類：${transaction.category_name}\n` +
    `金額：${formatMoney(transaction.amount)}\n` +
    `備註：${transaction.note || "無"}`;

  const confirmed = window.confirm(
    "確定要永久刪除以下交易嗎？\n\n" +
      transactionSummary +
      "\n\n此操作無法直接復原。",
  );

  // 使用者取消：不發送 DELETE Request
  if (!confirmed) {
    setDeleteStatus(`已取消刪除交易 ID ${transactionId}，原始資料沒有變更。`);
    return;
  }

  // 確認後才進入刪除流程
  isSubmitting = true;

  updateFormControls();
  renderTransactions(allTransactions);

  setDeleteStatus(`正在刪除交易 ID ${transactionId}...`);

  try {
    const response = await fetch(`/api/transactions/${transactionId}`, {
      method: "DELETE",
    });

    // 後端預期回傳 JSON
    const result = await response.json().catch(() => null);

    if (!response.ok || !result || result.success !== true) {
      throw new Error(result?.message || `HTTP ${response.status}`);
    }

    // 檢查回傳的交易 ID
    if (result.data?.id !== transactionId) {
      throw new Error("API 回傳的交易 ID 不一致，請重新整理確認資料。");
    }

    // 如果刪除的是目前正在編輯的交易，
    // 必須離開編輯模式，避免繼續編輯不存在的紀錄。
    if (editingTransactionId === transactionId) {
      resetToCreateMode();

      setFormStatus(
        `原本正在編輯的交易 ID ${transactionId} 已刪除，` +
          "表單已返回新增模式。",
      );
    }

    // 刪除成功後重新取得最新 SQLite 資料
    const refreshed = await loadTransactions();

    if (refreshed) {
      setDeleteStatus(
        `交易 ID ${transactionId} 刪除成功！` + "Dashboard 與交易清單已更新。",
        "success",
      );
    } else {
      // DELETE 成功，但 GET 重新載入失敗
      setDeleteStatus(
        `交易 ID ${transactionId} 已收到刪除成功回應，` +
          "但交易清單重新載入失敗。請重新整理頁面確認。",
        "error",
      );
    }
  } catch (error) {
    console.error("Failed to delete transaction:", error);

    setDeleteStatus(
      `刪除交易 ID ${transactionId} 失敗：` +
        `${error.message}。` +
        "若曾發生連線中斷，請先重新整理核對資料再重試。",
      "error",
    );
  } finally {
    isSubmitting = false;

    updateFormControls();
    renderTransactions(allTransactions);
  }
}

// ============================================================
// 21. 新增與編輯共用表單
// ============================================================

transactionForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (isSubmitting || !categoriesReady || categoryElement.disabled) {
    return;
  }

  const editingId = editingTransactionId;

  const type = typeElement.value;
  const categoryId = Number(categoryElement.value);

  const amountText = amountElement.value.trim();

  const amount = Number(amountText);
  const transactionDate = dateElement.value;
  const note = noteElement.value;

  // 分類驗證
  const validCategory = allCategories.some(
    (category) => category.id === categoryId && category.type === type,
  );

  if (!validCategory) {
    setFormStatus("請選擇有效的交易分類。", "error");
    return;
  }

  // 金額驗證
  if (!/^[1-9]\d*$/.test(amountText) || !Number.isSafeInteger(amount)) {
    setFormStatus("金額必須是大於零的安全整數。", "error");
    return;
  }

  // 日期驗證
  if (!isValidDate(transactionDate)) {
    setFormStatus("請輸入有效的交易日期。", "error");
    return;
  }

  // 備註驗證
  if (note.length > 500) {
    setFormStatus("備註不得超過 500 個字串長度單位。", "error");
    return;
  }

  const transactionData = {
    category_id: categoryId,
    amount,
    transaction_date: transactionDate,
    note,
  };

  isSubmitting = true;

  updateFormControls();
  renderTransactions(allTransactions);

  setFormStatus(
    editingId === null
      ? "正在新增交易..."
      : `正在儲存交易 ID ${editingId} 的修改...`,
  );

  try {
    const endpoint =
      editingId === null
        ? "/api/transactions"
        : `/api/transactions/${editingId}`;

    const response = await fetch(endpoint, {
      method: editingId === null ? "POST" : "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(transactionData),
    });

    const result = await response.json().catch(() => null);

    if (!response.ok || !result || result.success !== true) {
      throw new Error(result?.message || `HTTP ${response.status}`);
    }

    const refreshed = await loadTransactions();

    if (refreshed) {
      resetToCreateMode();

      setFormStatus(
        editingId === null
          ? `交易新增成功！交易 ID：${result.data.id}。` +
              "Dashboard 與交易清單已更新。"
          : `交易 ID ${editingId} 修改成功！` + "Dashboard 與交易清單已更新。",
        "success",
      );
    } else {
      setFormStatus(
        editingId === null
          ? "交易已新增，但清單重新整理失敗。" +
              "請重新整理頁面確認，避免重複新增。"
          : "交易修改已儲存，但清單重新整理失敗。" + "請重新整理頁面確認。",
        "error",
      );
    }
  } catch (error) {
    console.error("Failed to save transaction:", error);

    setFormStatus(
      (editingId === null
        ? "新增交易失敗："
        : `編輯交易 ID ${editingId} 失敗：`) +
        `${error.message}。` +
        "若曾發生連線中斷，請先重新整理核對資料再重試。",
      "error",
    );
  } finally {
    isSubmitting = false;

    updateFormControls();
    renderTransactions(allTransactions);
  }
});

// 22. 初始化
function initializeApp() {
  dateElement.value = getLocalDate();

  loadTransactions();
  loadCategories();
}

initializeApp();
