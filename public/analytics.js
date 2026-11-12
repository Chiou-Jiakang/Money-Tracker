"use strict";

// Milestone 11-1～11-3：月份、分類與六個月趨勢分析（不修改資料庫）
(() => {
  const monthInput = document.getElementById("analytics-month");
  const typeInput = document.getElementById("analytics-type");
  const incomeOutput = document.getElementById("analytics-income");
  const expenseOutput = document.getElementById("analytics-expense");
  const balanceOutput = document.getElementById("analytics-balance");
  const statusOutput = document.getElementById("analytics-status");
  const categoryList = document.getElementById("analytics-categories");
  const donutOutput = document.getElementById("analytics-donut");
  const comparisonOutput = document.getElementById("analytics-comparison");
  const trendOutput = document.getElementById("analytics-trend");

  const chartColors = [
    "#38bdf8",
    "#a78bfa",
    "#34d399",
    "#fbbf24",
    "#fb7185",
    "#60a5fa",
    "#f472b6",
    "#fb923c",
  ];

  let transactions = [];
  let loadState = "loading";

  function currentLocalMonth() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  }

  function formatAmount(value) {
    return `NT$${value.toLocaleString("zh-TW")}`;
  }

  function createMessage(message) {
    const paragraph = document.createElement("p");
    paragraph.className = "analytics-empty";
    paragraph.textContent = message;
    return paragraph;
  }

  function showEmpty(message) {
    categoryList.replaceChildren(createMessage(message));
  }

  function renderDonut(entries, total, typeName) {
    if (!entries.length || total <= 0) {
      donutOutput.replaceChildren(
        createMessage(`這個月份沒有${typeName}分類可繪製。`),
      );
      return;
    }

    let start = 0;
    const stops = entries.map((entry, index) => {
      const end =
        index === entries.length - 1
          ? 360
          : start + (entry.total / total) * 360;
      const stop = `${chartColors[index % chartColors.length]} ${start}deg ${end}deg`;
      start = end;
      return stop;
    });

    const ring = document.createElement("div");
    ring.className = "analytics-donut-ring";
    ring.style.background = `conic-gradient(${stops.join(", ")})`;
    ring.setAttribute("role", "img");
    ring.setAttribute(
      "aria-label",
      `${typeName}分類占比：` +
        entries
          .map((entry) => {
            const percentage = (entry.total / total) * 100;
            return `${entry.name} ${percentage.toFixed(1)}%`;
          })
          .join("；"),
    );

    const center = document.createElement("div");
    center.className = "analytics-donut-center";
    const totalLabel = document.createElement("span");
    totalLabel.textContent = `${typeName}合計`;
    const totalAmount = document.createElement("strong");
    totalAmount.textContent = formatAmount(total);
    center.append(totalLabel, totalAmount);
    ring.appendChild(center);

    const legend = document.createElement("ul");
    legend.className = "analytics-chart-legend";
    for (const [index, entry] of entries.entries()) {
      const item = document.createElement("li");
      item.className = "analytics-legend-item";
      const swatch = document.createElement("span");
      swatch.className = "analytics-legend-swatch";
      swatch.style.backgroundColor = chartColors[index % chartColors.length];
      swatch.setAttribute("aria-hidden", "true");
      const description = document.createElement("span");
      description.textContent =
        `${entry.name} · ${formatAmount(entry.total)} · ` +
        `${((entry.total / total) * 100).toFixed(1)}%`;
      item.append(swatch, description);
      legend.appendChild(item);
    }

    donutOutput.replaceChildren(ring, legend);
  }

  function renderComparison(income, expense) {
    const maximum = Math.max(income, expense);
    const chart = document.createElement("div");
    chart.className = "analytics-compare-chart";
    chart.setAttribute("role", "img");
    chart.setAttribute(
      "aria-label",
      `當月收入 ${formatAmount(income)}，當月支出 ${formatAmount(expense)}`,
    );

    for (const item of [
      { label: "收入", value: income, colorClass: "is-income" },
      { label: "支出", value: expense, colorClass: "is-expense" },
    ]) {
      const row = document.createElement("div");
      row.className = "analytics-compare-row";
      const header = document.createElement("div");
      header.className = "analytics-compare-header";
      const label = document.createElement("span");
      label.textContent = item.label;
      const amount = document.createElement("strong");
      amount.textContent = formatAmount(item.value);
      header.append(label, amount);

      const track = document.createElement("div");
      track.className = "analytics-compare-track";
      const fill = document.createElement("div");
      fill.className = `analytics-compare-fill ${item.colorClass}`;
      fill.style.width = `${maximum === 0 ? 0 : (item.value / maximum) * 100}%`;
      track.appendChild(fill);
      row.append(header, track);
      chart.appendChild(row);
    }

    const note = document.createElement("p");
    note.className = "analytics-compare-note";
    note.textContent =
      maximum === 0
        ? "本月沒有收入或支出，圖表顯示零值。"
        : "長條長度以本月收入與支出中較高者為 100% 基準。";
    comparisonOutput.replaceChildren(chart, note);
  }

  // 以所選月份為終點，產生連續六個月份；用月份序號避免時區與跨年問題。
  function getSixMonthKeys(selectedMonth) {
    const match = /^(\d{4})-(0[1-9]|1[0-2])$/.exec(selectedMonth);
    if (!match) return [];

    const finalIndex = Number(match[1]) * 12 + Number(match[2]) - 1;
    return Array.from({ length: 6 }, (_, index) => {
      const monthIndex = finalIndex - 5 + index;
      const year = Math.floor(monthIndex / 12);
      const month = monthIndex - year * 12 + 1;
      return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}`;
    });
  }

  function formatSignedAmount(amount) {
    return amount < 0
      ? `-${formatAmount(Math.abs(amount))}`
      : formatAmount(amount);
  }

  // Milestone 11-3：共用已載入的 transactions，不重新呼叫後端 API。
  function renderTrend(selectedMonth) {
    if (!trendOutput) return;

    const keys = getSixMonthKeys(selectedMonth);
    if (keys.length !== 6) {
      trendOutput.replaceChildren(createMessage("請選擇有效的統計月份。"));
      return;
    }

    const monthly = new Map(
      keys.map((key) => [key, { key, income: 0, expense: 0 }]),
    );

    for (const item of transactions) {
      if (typeof item.transaction_date !== "string") continue;
      const month = item.transaction_date.slice(0, 7);
      const entry = monthly.get(month);
      if (!entry) continue;

      const amount = Number(item.amount);
      if (!Number.isSafeInteger(amount) || amount <= 0) continue;

      if (item.type === "income") entry.income += amount;
      if (item.type === "expense") entry.expense += amount;
    }

    const months = [...monthly.values()];
    const maximum = Math.max(
      0,
      ...months.map((item) => Math.max(item.income, item.expense)),
    );

    const grid = document.createElement("div");
    grid.className = "analytics-trend-grid";

    for (const item of months) {
      const balance = item.income - item.expense;
      const column = document.createElement("div");
      column.className = "analytics-trend-month";
      column.setAttribute(
        "aria-label",
        `${item.key}：收入 ${formatAmount(item.income)}，` +
          `支出 ${formatAmount(item.expense)}，` +
          `淨額 ${formatSignedAmount(balance)}`,
      );

      const bars = document.createElement("div");
      bars.className = "analytics-trend-bars";

      for (const series of [
        { label: "收入", value: item.income, css: "is-income" },
        { label: "支出", value: item.expense, css: "is-expense" },
      ]) {
        const track = document.createElement("div");
        track.className = "analytics-trend-bar-track";
        const bar = document.createElement("div");
        bar.className = `analytics-trend-bar ${series.css}`;
        bar.style.height = `${maximum === 0 ? 0 : (series.value / maximum) * 100}%`;
        bar.title = `${item.key} ${series.label}：${formatAmount(series.value)}`;
        track.appendChild(bar);
        bars.appendChild(track);
      }

      const monthLabel = document.createElement("strong");
      monthLabel.className = "analytics-trend-month-label";
      monthLabel.textContent = item.key.replace("-", "/");

      const incomeText = document.createElement("span");
      incomeText.className = "analytics-trend-data";
      incomeText.textContent = `收 ${formatAmount(item.income)}`;

      const expenseText = document.createElement("span");
      expenseText.className = "analytics-trend-data";
      expenseText.textContent = `支 ${formatAmount(item.expense)}`;

      const netText = document.createElement("span");
      netText.className = "analytics-trend-net";
      if (balance < 0) netText.classList.add("is-negative");
      if (balance > 0) netText.classList.add("is-positive");
      netText.textContent = `淨 ${formatSignedAmount(balance)}`;

      column.append(bars, monthLabel, incomeText, expenseText, netText);
      grid.appendChild(column);
    }

    trendOutput.replaceChildren(grid);
  }

  function clearCharts(message) {
    donutOutput.replaceChildren(createMessage(message));
    comparisonOutput.replaceChildren(createMessage(message));
    if (trendOutput) trendOutput.replaceChildren(createMessage(message));
  }

  function render() {
    if (loadState !== "ready") {
      incomeOutput.textContent = "—";
      expenseOutput.textContent = "—";
      balanceOutput.textContent = "—";
      statusOutput.textContent =
        loadState === "error"
          ? "交易資料載入失敗，無法計算分析，請重新整理頁面。"
          : "正在等待交易資料...";
      showEmpty("目前無法顯示分類統計。");
      clearCharts("目前無法顯示圖表。");
      return;
    }

    const selectedMonth = monthInput.value;
    const monthlyTransactions = transactions.filter(
      (item) =>
        typeof item.transaction_date === "string" &&
        item.transaction_date.slice(0, 7) === selectedMonth,
    );

    let income = 0;
    let expense = 0;
    const grouped = new Map();

    for (const item of monthlyTransactions) {
      const amount = Number(item.amount);
      if (!Number.isSafeInteger(amount) || amount <= 0) continue;

      if (item.type === "income") income += amount;
      if (item.type === "expense") expense += amount;
      if (item.type !== typeInput.value) continue;

      const key = `${item.type}:${item.category_id}`;
      const existing = grouped.get(key) || {
        name: String(item.category_name || "未命名分類"),
        total: 0,
        count: 0,
      };
      existing.total += amount;
      existing.count += 1;
      grouped.set(key, existing);
    }

    incomeOutput.textContent = formatAmount(income);
    expenseOutput.textContent = formatAmount(expense);
    const balance = income - expense;
    balanceOutput.textContent =
      balance < 0
        ? `-${formatAmount(Math.abs(balance))}`
        : formatAmount(balance);

    const chosenTypeName = typeInput.value === "expense" ? "支出" : "收入";
    const chosenTotal = typeInput.value === "expense" ? expense : income;
    const entries = [...grouped.values()].sort(
      (a, b) => b.total - a.total || a.name.localeCompare(b.name, "zh-TW"),
    );

    statusOutput.textContent =
      `${selectedMonth}｜共 ${monthlyTransactions.length} 筆交易；` +
      `${chosenTypeName}合計 ${formatAmount(chosenTotal)}，` +
      `${entries.length} 個分類。`;

    categoryList.replaceChildren();
    if (entries.length === 0) {
      showEmpty(`這個月份沒有${chosenTypeName}紀錄。`);
    } else {
      for (const entry of entries) {
        const percentage =
          chosenTotal > 0 ? (entry.total / chosenTotal) * 100 : 0;
        const item = document.createElement("div");
        item.className = "analytics-category";
        const header = document.createElement("div");
        header.className = "analytics-category-header";
        const name = document.createElement("strong");
        name.textContent = `${entry.name}（${entry.count} 筆）`;
        const value = document.createElement("span");
        value.textContent = `${formatAmount(entry.total)} · ${percentage.toFixed(1)}%`;
        const track = document.createElement("div");
        track.className = "analytics-bar-track";
        track.setAttribute("role", "progressbar");
        track.setAttribute(
          "aria-label",
          `${entry.name}占${chosenTypeName}比例`,
        );
        track.setAttribute("aria-valuemin", "0");
        track.setAttribute("aria-valuemax", "100");
        track.setAttribute("aria-valuenow", percentage.toFixed(1));
        const fill = document.createElement("div");
        fill.className = "analytics-bar-fill";
        fill.style.width = `${Math.max(0, Math.min(100, percentage))}%`;
        header.append(name, value);
        track.appendChild(fill);
        item.append(header, track);
        categoryList.appendChild(item);
      }
    }

    // 使用與原有文字統計相同的 entries / totals，避免圖表另外計算一套。
    renderDonut(entries, chosenTotal, chosenTypeName);
    renderComparison(income, expense);
    renderTrend(selectedMonth);
  }

  monthInput.value = currentLocalMonth();
  monthInput.addEventListener("change", render);
  typeInput.addEventListener("change", render);

  document.addEventListener("moneytracker:transactions-loaded", (event) => {
    if (!Array.isArray(event.detail?.transactions)) return;
    transactions = event.detail.transactions;
    loadState = "ready";
    render();
  });

  document.addEventListener("moneytracker:transactions-error", () => {
    transactions = [];
    loadState = "error";
    render();
  });

  render();
})();
