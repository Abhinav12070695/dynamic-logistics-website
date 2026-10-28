/* =========================================================
   Dynamic Logistics — Dashboard charts
   File: js/admin-charts.js
   Used by: admin.html (loaded BEFORE js/admin.js)

   Chart 1: "Enquiries received" — columns per week (last 8 weeks)
            or per month (last 6 months), drawn with Chart.js.
   Chart 2: "Status breakdown" — one bar split into New /
            In progress / Closed, drawn with plain HTML + CSS.

   admin.js calls updateCharts(allEnquiries) every time the
   enquiries change, so the charts update live.
   ========================================================= */

/* global Chart */
/* exported updateCharts */

// Colours (match css/admin.css)
var CHART_COLORS = {
  bar: "#1e3a5f",        // secondary blue: the one data colour of chart 1
  barHover: "#10243a",   // navy when a column is touched/hovered
  grid: "#e9edf1",       // light hairline gridlines
  axis: "#d5dbe2",
  text: "#64748b",       // muted text for axis labels
  label: "#172536",      // dark text for the value label
  status: {
    "new": "#e8a317",
    "in-progress": "#3b6ea5",
    "closed": "#2e9e5b"
  }
};

var STATUS_ORDER = ["new", "in-progress", "closed"];
var STATUS_NAMES = { "new": "New", "in-progress": "In progress", "closed": "Closed" };

var trendChart = null;        // the Chart.js object (created once, then updated)
var trendMode = "weeks";      // "weeks" or "months"
var latestEnquiries = [];     // last data received from admin.js

/* ---------- Called by admin.js ---------- */
function updateCharts(enquiries) {
  latestEnquiries = enquiries;
  drawTrendChart();
  drawStatusBreakdown();
}

/* ---------- Set up the 8 weeks / 6 months buttons ---------- */
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".range-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      document.querySelectorAll(".range-btn").forEach(function (b) {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");
      trendMode = button.getAttribute("data-range");
      drawTrendChart();
    });
  });
});

/* =========================================================
   CHART 1 — Enquiries per week / month
   ========================================================= */

// Builds the list of time periods and counts enquiries in each one
function countByPeriod(enquiries, mode) {
  var periods = [];
  var now = new Date();
  var i;

  if (mode === "weeks") {
    // Weeks start on Monday
    var monday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var dayIndex = (monday.getDay() + 6) % 7; // Monday = 0 ... Sunday = 6
    monday.setDate(monday.getDate() - dayIndex);

    for (i = 7; i >= 0; i--) {
      var start = new Date(monday);
      start.setDate(monday.getDate() - i * 7);
      var end = new Date(start);
      end.setDate(start.getDate() + 7);
      var lastDay = new Date(end);
      lastDay.setDate(end.getDate() - 1);
      periods.push({
        start: start,
        end: end,
        label: start.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
        fullLabel: "Week of " + start.toLocaleDateString("en-IN", { day: "numeric", month: "short" }) +
                   " – " + lastDay.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
        count: 0
      });
    }
  } else {
    for (i = 5; i >= 0; i--) {
      var mStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      var mEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      periods.push({
        start: mStart,
        end: mEnd,
        label: mStart.toLocaleDateString("en-IN", { month: "short" }),
        fullLabel: mStart.toLocaleDateString("en-IN", { month: "long", year: "numeric" }),
        count: 0
      });
    }
  }

  // Put each enquiry into its period
  enquiries.forEach(function (e) {
    var date = e.createdAt || new Date(); // just-submitted enquiry = now
    periods.forEach(function (p) {
      if (date >= p.start && date < p.end) {
        p.count++;
      }
    });
  });

  return periods;
}

function drawTrendChart() {
  var periods = countByPeriod(latestEnquiries, trendMode);
  var labels = periods.map(function (p) { return p.label; });
  var counts = periods.map(function (p) { return p.count; });

  // Headline numbers above the chart
  var current = counts[counts.length - 1];
  var previous = counts[counts.length - 2];
  var unit = trendMode === "weeks" ? "week" : "month";
  document.getElementById("trendHeadline").textContent = current;
  document.getElementById("trendHeadlineLabel").textContent =
    "this " + unit + " · " + previous + " last " + unit;
  document.getElementById("trendSubtitle").textContent =
    trendMode === "weeks" ? "Per week, last 8 weeks" : "Per month, last 6 months";

  fillTrendTable(periods);

  // Chart.js needs internet. Without it, the table above still shows the numbers.
  var message = document.getElementById("chartMessage");
  if (typeof Chart === "undefined") {
    message.textContent = "Chart could not load (no internet). Tap \"View as table\" to see the numbers.";
    message.classList.remove("d-none");
    return;
  }
  message.classList.add("d-none");

  if (trendChart) {
    // Chart already exists: just swap in the new numbers
    trendChart.data.labels = labels;
    trendChart.data.datasets[0].data = counts;
    trendChart.$periods = periods;
    trendChart.update();
    return;
  }

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  trendChart = new Chart(document.getElementById("trendChart"), {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Enquiries",
        data: counts,
        backgroundColor: CHART_COLORS.bar,
        hoverBackgroundColor: CHART_COLORS.barHover,
        maxBarThickness: 24,     // thin columns, never filling the whole slot
        borderRadius: 4,         // rounded top...
        borderSkipped: "start"   // ...square at the baseline
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: reduceMotion ? 0 : 500 },
      // Touching anywhere in a column's slot shows its tooltip (easier on phones)
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: false }, // one series: the title says what it is
        tooltip: {
          displayColors: false,
          backgroundColor: CHART_COLORS.barHover,
          padding: 10,
          callbacks: {
            title: function (items) {
              return items[0].chart.$periods[items[0].dataIndex].fullLabel;
            },
            label: function (item) {
              return item.raw + (item.raw === 1 ? " enquiry" : " enquiries");
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          border: { color: CHART_COLORS.axis },
          ticks: { color: CHART_COLORS.text, maxRotation: 0, autoSkip: true }
        },
        y: {
          beginAtZero: true,
          grace: "15%",           // room above the tallest column for its label
          border: { display: false },
          grid: { color: CHART_COLORS.grid },
          ticks: { color: CHART_COLORS.text, precision: 0, maxTicksLimit: 5 }
        }
      }
    },
    plugins: [latestValueLabel]
  });
  trendChart.$periods = periods;
}

// Small Chart.js plugin: writes the number on top of the LATEST column only
var latestValueLabel = {
  id: "latestValueLabel",
  afterDatasetsDraw: function (chart) {
    var meta = chart.getDatasetMeta(0);
    if (!meta.data.length) {
      return;
    }
    var lastIndex = meta.data.length - 1;
    var bar = meta.data[lastIndex];
    var value = chart.data.datasets[0].data[lastIndex];
    var ctx = chart.ctx;
    ctx.save();
    ctx.fillStyle = CHART_COLORS.label;
    ctx.font = "600 12px system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillText(String(value), bar.x, bar.y - 4);
    ctx.restore();
  }
};

// The same numbers as a table (for accessibility and when offline)
function fillTrendTable(periods) {
  var body = document.getElementById("trendTableBody");
  document.getElementById("trendTableHead").textContent =
    trendMode === "weeks" ? "Week starting" : "Month";
  body.innerHTML = "";
  periods.slice().reverse().forEach(function (p) {
    var row = document.createElement("tr");
    var c1 = document.createElement("td");
    var c2 = document.createElement("td");
    c1.textContent = trendMode === "weeks"
      ? p.start.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
      : p.fullLabel;
    c2.textContent = p.count;
    c2.className = "text-end";
    row.appendChild(c1);
    row.appendChild(c2);
    body.appendChild(row);
  });
}

/* =========================================================
   CHART 2 — Status breakdown (plain HTML/CSS bar)
   ========================================================= */
function drawStatusBreakdown() {
  var bar = document.getElementById("statusBar");
  var legend = document.getElementById("statusLegend");
  var total = latestEnquiries.length;
  var counts = { "new": 0, "in-progress": 0, "closed": 0 };

  latestEnquiries.forEach(function (e) {
    if (counts[e.status] !== undefined) {
      counts[e.status]++;
    }
  });

  bar.innerHTML = "";
  legend.innerHTML = "";
  bar.classList.toggle("is-empty", total === 0);

  STATUS_ORDER.forEach(function (status) {
    var count = counts[status];
    var percent = total === 0 ? 0 : Math.round((count / total) * 100);

    // Bar segment (skipped when zero, so no empty slivers)
    if (count > 0) {
      var segment = document.createElement("div");
      segment.className = "status-segment";
      segment.style.flexGrow = count;
      segment.style.backgroundColor = CHART_COLORS.status[status];
      segment.title = STATUS_NAMES[status] + ": " + count + " (" + percent + "%)";
      bar.appendChild(segment);
    }

    // Legend row: colour dot + name + number (always shown, even if 0)
    var item = document.createElement("li");
    var dot = document.createElement("span");
    dot.className = "legend-dot";
    dot.style.backgroundColor = CHART_COLORS.status[status];
    var name = document.createElement("span");
    name.className = "legend-name";
    name.textContent = STATUS_NAMES[status];
    var value = document.createElement("span");
    value.className = "legend-value";
    value.textContent = count + " · " + percent + "%";
    item.appendChild(dot);
    item.appendChild(name);
    item.appendChild(value);
    legend.appendChild(item);
  });

  bar.setAttribute("aria-label", total === 0
    ? "No enquiries yet"
    : STATUS_ORDER.map(function (s) {
        return STATUS_NAMES[s] + " " + counts[s];
      }).join(", "));

  // One-line summary under the bar
  var open = counts["new"] + counts["in-progress"];
  document.getElementById("statusSummary").textContent = total === 0
    ? "No enquiries yet."
    : open + " of " + total + " still open (new or in progress).";
}
