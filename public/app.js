"use strict";

// ============================================================
// Money Tracker | Milestone 10-3
// Dashboard + 新增交易 POST + 編輯交易 PUT
// 基準版本：Milestone 10-2 (Git Commit bb18c64)
// ============================================================

// 1. Dashboard 與交易列表
const incomeElement = document.getElementById("total-income");
const expenseElement = document.getElementById("total-expense");
const balanceElement = document.getElementById("net-balance");
const transactionsBody = document.getElementById("recent-transactions");
const transactionsStatus = document.getElementById("transactions-status");

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

// 3. 共用狀態。null 代表新增模式；數字代表正在編輯的交易 ID。
let allCategories = [];
let allTransactions = [];
let editingTransactionId = null;
let isSubmitting = false;
let categoriesReady = false;

// 4. 格式化新臺幣金額
function formatMoney(amount) {
  const number = Number(amount);
  const formatted = Math.abs(number).toLocaleString("zh-TW");
  return number < 0 ? `-NT$${formatted}` : `NT$${formatted}`;
}

// 5. 使用本地日期（避免 UTC 與臺灣時區差異）
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

// 6. 驗證日期是否為真實存在的 YYYY-MM-DD
function isValidDate(dateString) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return false;

  const parsedDate = new Date(`${dateString}T00:00:00.000Z`);
  return (
    !Number.isNaN(parsedDate.getTime()) &&
    parsedDate.toISOString().slice(0, 10) === dateString
  );
}

// 7. 顯示表單狀態
function setFormStatus(message, status = "normal") {
  formStatus.textContent = message;
  formStatus.className = "form-feedback";
  if (status === "success" || status === "error") {
    formStatus.classList.add(status);
  }
}

// 8. 依實際狀態決定按鈕是否可用
function updateFormControls() {
  const canSubmit = categoriesReady && !categoryElement.disabled && !isSubmitting;
  saveButton.disabled = !canSubmit;
  cancelEditButton.disabled = isSubmitting;
}

// 9. 計算本月財務統計。保留 10-2 的加總方式。
function updateDashboard(transactions) {
  const currentMonth = getCurrentMonth();
  let totalIncome = 0;
  let totalExpense = 0;

  for (const transaction of transactions) {
    if (transaction.transaction_date.slice(0, 7) !== currentMonth) continue;

    const amount = Number(transaction.amount);
    if (transaction.type === "income") totalIncome += amount;
    else if (transaction.type === "expense") totalExpense += amount;
  }

  incomeElement.textContent = formatMoney(totalIncome);
  expenseElement.textContent = formatMoney(totalExpense);
  balanceElement.textContent = formatMoney(totalIncome - totalExpense);
}

// 10. 空狀態。交易表格新增「操作」欄，因此 colspan 改成 6。
function createEmptyRow(message) {
  const row = document.createElement("tr");
  const cell = document.createElement("td");
  cell.colSpan = 6;
  cell.className = "empty-state";
  cell.textContent = message;
  row.appendChild(cell);
  return row;
}

// 11. 顯示最近 10 筆交易，增加編輯按鈕（暫不提供刪除按鈕）
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
    if (transaction.id === editingTransactionId) row.classList.add("editing-row");

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
      // 避免備註中的文字被當成 HTML 執行。
      cell.textContent = String(value);
      if (index === 3) {
        cell.style.color = transaction.type === "income" ? "#4ade80" : "#fb7185";
      }
      row.appendChild(cell);
    });

    const actionCell = document.createElement("td");
    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "edit-action";
    editButton.textContent = "編輯";
    editButton.setAttribute("aria-label", `編輯交易 ID ${transaction.id}`);
    editButton.disabled = isSubmitting || !categoriesReady;
    editButton.addEventListener("click", () => startEditing(transaction.id));
    actionCell.appendChild(editButton);
    row.appendChild(actionCell);

    transactionsBody.appendChild(row);
  }

  transactionsStatus.textContent =
    `目前共有 ${transactions.length} 筆交易，` +
    `顯示最近 ${recentTransactions.length} 筆。`;
}

// 12. 每次完成 POST / PUT 後重新取得資料，Dashboard 與表格保持一致。
async function loadTransactions() {
  try {
    transactionsStatus.textContent = "正在載入交易資料...";
    const response = await fetch("/api/transactions", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const result = await response.json();
    if (result.success !== true || !Array.isArray(result.data)) {
      throw new Error("API 回傳格式不正確");
    }

    allTransactions = result.data;
    updateDashboard(allTransactions);
    renderTransactions(allTransactions);
    console.log("Money Tracker transactions loaded:", allTransactions.length);
    return true;
  } catch (error) {
    console.error("Failed to load transactions:", error);
    allTransactions = [];
    incomeElement.textContent = "—";
    expenseElement.textContent = "—";
    balanceElement.textContent = "—";
    transactionsBody.replaceChildren(createEmptyRow("交易資料載入失敗，請重新整理。"));
    transactionsStatus.textContent = `資料讀取失敗：${error.message}`;
    return false;
  }
}

// 13. 依照類型載入對應的分類，編輯模式可指定原分類作為預選值。
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

// 14. 從 API 取得分類清單
async function loadCategories() {
  categoriesReady = false;
  categoryElement.disabled = true;
  updateFormControls();

  try {
    const response = await fetch("/api/categories", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const result = await response.json();
    if (result.success !== true || !Array.isArray(result.data)) {
      throw new Error("分類 API 回傳格式不正確");
    }

    allCategories = result.data;
    categoriesReady = true;
    renderCategoryOptions();
    renderTransactions(allTransactions);

    setFormStatus(
      categoryElement.disabled ? "目前沒有此收支類型的分類。" : "分類載入完成，可以新增交易。",
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

// 15. 進入編輯模式：使用 GET 取得的資料預填原本欄位
function startEditing(transactionId) {
  if (!categoriesReady || isSubmitting) return;

  const transaction = allTransactions.find((item) => item.id === transactionId);
  if (!transaction) {
    setFormStatus("找不到這筆交易，請重新整理頁面。", "error");
    return;
  }

  const category = allCategories.find((item) => item.id === transaction.category_id);
  if (!category || category.type !== transaction.type) {
    setFormStatus("這筆交易的分類資料異常，無法編輯，請重新整理頁面。", "error");
    return;
  }

  editingTransactionId = transaction.id;
  typeElement.value = transaction.type;
  renderCategoryOptions(transaction.category_id);
  amountElement.value = String(transaction.amount);
  dateElement.value = transaction.transaction_date;
  noteElement.value = transaction.note || "";

  formHeading.textContent = `編輯交易 Edit Transaction（ID：${transaction.id}）`;
  formDescription.textContent = "修改既有交易並儲存至 SQLite；不會新增另一筆紀錄。";
  saveButton.textContent = "儲存修改";
  cancelEditButton.hidden = false;
  editorSection.classList.add("editing");
  updateFormControls();
  setFormStatus(`正在編輯交易 ID ${transaction.id}；可修改資料或按「取消編輯」。`);

  renderTransactions(allTransactions);
  editorSection.scrollIntoView({ behavior: "smooth", block: "start" });
  amountElement.focus({ preventScroll: true });
}

// 16. 回到新增模式，原始資料不受影響。
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

cancelEditButton.addEventListener("click", () => {
  if (isSubmitting) return;
  resetToCreateMode();
  setFormStatus("已取消編輯，原始交易沒有變更。", "normal");
});

// 17. 改變收支類型時重新列出該類型可用的分類
//     若正在編輯，新的分類也會在 PUT 時一併更新。
typeElement.addEventListener("change", () => {
  renderCategoryOptions();
  setFormStatus(
    categoryElement.disabled ? "目前沒有可用分類。" : "請確認所選的交易分類。",
    categoryElement.disabled ? "error" : "normal",
  );
});

// 18. 共用驗證後，依模式發送 POST 或 PUT
transactionForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (isSubmitting || !categoriesReady || categoryElement.disabled) return;

  const editingId = editingTransactionId;
  const type = typeElement.value;
  const categoryId = Number(categoryElement.value);
  const amountText = amountElement.value.trim();
  const amount = Number(amountText);
  const transactionDate = dateElement.value;
  const note = noteElement.value;

  const validCategory = allCategories.some(
    (category) => category.id === categoryId && category.type === type,
  );
  if (!validCategory) {
    setFormStatus("請選擇有效的交易分類。", "error");
    return;
  }
  if (!/^[1-9]\d*$/.test(amountText) || !Number.isSafeInteger(amount)) {
    setFormStatus("金額必須是大於零的安全整數。", "error");
    return;
  }
  if (!isValidDate(transactionDate)) {
    setFormStatus("請輸入有效的交易日期。", "error");
    return;
  }
  if (note.length > 500) {
    setFormStatus("備註不得超過 500 個字串長度單位。", "error");
    return;
  }

  // PUT 不需要傳入類型：後端會依 category_id 決定 income/expense。
  const transactionData = {
    category_id: categoryId,
    amount,
    transaction_date: transactionDate,
    note,
  };

  isSubmitting = true;
  updateFormControls();
  renderTransactions(allTransactions);
  setFormStatus(editingId === null ? "正在新增交易..." : `正在儲存交易 ID ${editingId} 的修改...`);

  try {
    const endpoint =
      editingId === null ? "/api/transactions" : `/api/transactions/${editingId}`;
    const response = await fetch(endpoint, {
      method: editingId === null ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transactionData),
    });

    // 後端預期 JSON；若遇到非 JSON 回應，也顯示可理解的錯誤。
    const result = await response.json().catch(() => null);
    if (!response.ok || !result || result.success !== true) {
      throw new Error(result?.message || `HTTP ${response.status}`);
    }

    // 先確認同步成功，再重置表單。避免成功儲存但誤以為全部失敗。
    const refreshed = await loadTransactions();
    if (refreshed) {
      resetToCreateMode();
      setFormStatus(
        editingId === null
          ? `交易新增成功！交易 ID：${result.data.id}。Dashboard 與交易清單已更新。`
          : `交易 ID ${editingId} 修改成功！Dashboard 與交易清單已更新。`,
        "success",
      );
    } else {
      // 資料已寫入 SQLite，但 GET 重新載入失敗；保留內容供核對。
      setFormStatus(
        editingId === null
          ? "交易已新增，但清單重新整理失敗。請重新整理頁面確認，避免重複新增。"
          : "交易修改已儲存，但清單重新整理失敗。請重新整理頁面確認。",
        "error",
      );
    }
  } catch (error) {
    console.error("Failed to save transaction:", error);
    setFormStatus(
      (editingId === null ? "新增交易失敗：" : `編輯交易 ID ${editingId} 失敗：`) +
        `${error.message}。若曾發生連線中斷，請先重新整理核對資料再重試。`,
      "error",
    );
  } finally {
    isSubmitting = false;
    updateFormControls();
    renderTransactions(allTransactions);
  }
});

// 19. 初始化頁面
function initializeApp() {
  dateElement.value = getLocalDate();
  loadTransactions();
  loadCategories();
}

initializeApp();
