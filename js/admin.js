/* =========================================================
   Dynamic Logistics — Admin logic
   File: js/admin.js
   Used by: admin-login.html and admin.html
   Needs js/firebase-config.js loaded first
   (and js/admin-charts.js on admin.html).

   Part A: login page     Part B: dashboard
   Part C: pop-up messages and confirm box
   ========================================================= */

/* global bootstrap, updateCharts */

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("loginForm")) {
    setupLoginPage();
  }
  if (document.getElementById("enquiryList")) {
    setupDashboard();
  }
});

// Explains why Firebase can't be used right now
function firebaseProblem() {
  var fb = window.DLS_FIREBASE;
  if (!fb) {
    return "js/firebase-config.js is missing or has a typo. Paste only the six values between the quotes, then save and refresh.";
  }
  if (!fb.ready || !fb.auth) {
    return fb.reason || "Firebase is not available.";
  }
  return "";
}

/* =========================================================
   PART A — LOGIN PAGE (admin-login.html)
   ========================================================= */
function setupLoginPage() {
  var form = document.getElementById("loginForm");
  var loginBtn = document.getElementById("loginBtn");

  // Firebase missing or not set up: explain and stop
  var problem = firebaseProblem();
  if (problem) {
    var warning = document.getElementById("setupWarning");
    warning.textContent = problem;
    warning.classList.remove("d-none");
    loginBtn.disabled = true;
    return;
  }

  var auth = window.DLS_FIREBASE.auth;

  // Already logged in? Go straight to the dashboard
  auth.onAuthStateChanged(function (user) {
    if (user) {
      window.location.replace("admin.html");
    }
  });

  // Show / hide password
  document.getElementById("togglePassword").addEventListener("click", function () {
    var input = document.getElementById("loginPassword");
    var icon = this.querySelector("i");
    var show = input.type === "password";
    input.type = show ? "text" : "password";
    icon.className = show ? "bi bi-eye-slash" : "bi bi-eye";
    this.setAttribute("aria-label", show ? "Hide password" : "Show password");
    this.setAttribute("aria-pressed", show ? "true" : "false");
  });

  // Log in
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var email = document.getElementById("loginEmail").value.trim();
    var password = document.getElementById("loginPassword").value;

    if (email === "" || password === "") {
      showLoginMessage("Please enter both email and password.", "danger");
      return;
    }

    loginBtn.disabled = true;
    loginBtn.innerHTML = '<span class="spinner-border" role="status" aria-hidden="true"></span> Logging in...';

    auth.signInWithEmailAndPassword(email, password)
      .then(function () {
        window.location.replace("admin.html");
      })
      .catch(function (error) {
        showLoginMessage(friendlyAuthError(error), "danger");
        loginBtn.disabled = false;
        loginBtn.innerHTML = '<i class="bi bi-box-arrow-in-right" aria-hidden="true"></i> Log In';
      });
  });

  // Forgot password: Firebase emails a reset link
  document.getElementById("forgotPassword").addEventListener("click", function () {
    var email = document.getElementById("loginEmail").value.trim();
    if (email === "") {
      showLoginMessage("Type your admin email above first, then tap \"Forgot password?\" again.", "warning");
      return;
    }
    auth.sendPasswordResetEmail(email)
      .then(function () {
        showLoginMessage("If this is the admin email, a password reset link has been sent to it. Check the spam folder too.", "success");
      })
      .catch(function (error) {
        showLoginMessage(friendlyAuthError(error), "danger");
      });
  });
}

function showLoginMessage(text, type) {
  var box = document.getElementById("loginMessage");
  box.className = "alert alert-" + type;
  box.textContent = text;
}

// Turns Firebase error codes into plain English
function friendlyAuthError(error) {
  var code = error && error.code ? error.code : "";
  var messages = {
    "auth/invalid-email": "That email address is not valid.",
    "auth/invalid-credential": "Wrong email or password.",
    "auth/invalid-login-credentials": "Wrong email or password.",
    "auth/wrong-password": "Wrong email or password.",
    "auth/user-not-found": "Wrong email or password.",
    "auth/missing-password": "Please enter the password.",
    "auth/user-disabled": "This account has been disabled.",
    "auth/too-many-requests": "Too many attempts. Please wait a few minutes and try again.",
    "auth/network-request-failed": "No internet connection. Please check and try again.",
    "auth/operation-not-allowed": "Email/Password login is not turned on in Firebase Authentication.",
    "auth/operation-not-supported-in-this-environment": "Login doesn't work when the page is opened as a file. Use Acode's ▶ preview or the published website.",
    "auth/unauthorized-domain": "This web address is not allowed. Add it in Firebase > Authentication > Settings > Authorized domains.",
    "auth/api-key-not-valid": "The apiKey in js/firebase-config.js is wrong. Copy it again from Firebase."
  };
  if (messages[code]) {
    return messages[code];
  }
  if (code.indexOf("api-key-not-valid") !== -1) {
    return messages["auth/api-key-not-valid"];
  }
  return "Login failed: " + (error && error.message ? error.message : "unknown error");
}

/* =========================================================
   PART B — DASHBOARD (admin.html)
   ========================================================= */

var allEnquiries = [];      // every enquiry loaded from Firestore
var currentFilter = "all";  // which filter button is on
var currentSearch = "";     // text in the search box
var stopListening = null;   // stops the live updates (used on logout)
var firstRenderDone = false;

var STATUS_LABELS = {
  "new": "New",
  "in-progress": "In progress",
  "closed": "Closed"
};

// Must match the dropdown in contact.html and the list in firestore.rules
var SERVICE_NAMES = {
  "customs-clearance": "Customs Clearance",
  "transportation": "Transportation Services",
  "sea-shipping": "Sea Shipping",
  "container-cargo": "Container Cargo",
  "logistics-planning": "Logistics Planning",
  "cargo-handling": "Cargo Handling",
  "other": "Other / not sure"
};

function setupDashboard() {
  var problem = firebaseProblem();
  if (problem) {
    document.getElementById("authLoading").classList.add("d-none");
    document.body.classList.remove("checking-login");
    showDashboardError(problem);
    document.getElementById("enquiryList").innerHTML = "";
    document.getElementById("logoutBtn").classList.add("d-none");
    return;
  }

  var fb = window.DLS_FIREBASE;

  // Only a logged-in user may stay on this page
  fb.auth.onAuthStateChanged(function (user) {
    if (!user) {
      window.location.replace("admin-login.html");
      return;
    }
    document.getElementById("authLoading").classList.add("d-none");
    document.body.classList.remove("checking-login");
    document.getElementById("adminEmail").textContent = user.email;
    startLiveEnquiries();
  });

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", function () {
    if (stopListening) {
      stopListening();
      stopListening = null;
    }
    fb.auth.signOut().then(function () {
      window.location.replace("admin-login.html");
    });
  });

  // Filter buttons
  document.querySelectorAll(".filter-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      document.querySelectorAll(".filter-btn").forEach(function (b) {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");
      currentFilter = button.getAttribute("data-filter");
      renderEnquiries();
    });
  });

  // Search box (filters as you type)
  document.getElementById("searchBox").addEventListener("input", function () {
    currentSearch = this.value.trim().toLowerCase();
    renderEnquiries();
  });

  document.getElementById("exportBtn").addEventListener("click", exportCsv);
}

// Listens to the "enquiries" collection; runs again on every change
function startLiveEnquiries() {
  // Never run two listeners at once
  if (stopListening) {
    stopListening();
  }

  stopListening = window.DLS_FIREBASE.db.collection("enquiries")
    .orderBy("createdAt", "desc")
    .onSnapshot(function (snapshot) {
      allEnquiries = [];
      snapshot.forEach(function (doc) {
        var data = doc.data();
        allEnquiries.push({
          id: doc.id,
          name: String(data.name || ""),
          email: String(data.email || ""),
          phone: String(data.phone || ""),
          service: String(data.service || ""),
          subject: String(data.subject || ""),
          message: String(data.message || ""),
          status: STATUS_LABELS[data.status] ? data.status : "new",
          // createdAt can be empty for a split second while saving
          createdAt: data.createdAt && data.createdAt.toDate ? data.createdAt.toDate() : null
        });
      });
      hideDashboardError();
      updateCounts();
      renderEnquiries();
      if (typeof updateCharts === "function") {
        updateCharts(allEnquiries); // js/admin-charts.js
      }
    }, function (error) {
      console.error(error);
      document.getElementById("enquiryList").innerHTML = "";
      if (error.code === "permission-denied") {
        showDashboardError("This account is not allowed to view enquiries. Check that the admin email in the Firestore Rules matches the account you logged in with, then publish the rules again.");
      } else if (error.code === "failed-precondition") {
        showDashboardError("Firestore is not ready. Make sure you created the Firestore database (guide: Part 5, step B).");
      } else {
        showDashboardError("Could not load enquiries: " + error.message);
      }
    });
}

// Updates the four number cards at the top
function updateCounts() {
  var counts = { "new": 0, "in-progress": 0, "closed": 0 };
  allEnquiries.forEach(function (e) {
    counts[e.status]++;
  });
  document.getElementById("countTotal").textContent = allEnquiries.length;
  document.getElementById("countNew").textContent = counts["new"];
  document.getElementById("countProgress").textContent = counts["in-progress"];
  document.getElementById("countClosed").textContent = counts["closed"];
}

// The enquiries that match the current filter and search
function getVisibleEnquiries() {
  return allEnquiries.filter(function (e) {
    var matchesFilter = currentFilter === "all" || e.status === currentFilter;
    var text = [e.name, e.email, e.phone, e.subject, e.message, SERVICE_NAMES[e.service] || ""]
      .join(" ").toLowerCase();
    var matchesSearch = currentSearch === "" || text.indexOf(currentSearch) !== -1;
    return matchesFilter && matchesSearch;
  });
}

// Draws the list of enquiry cards
function renderEnquiries() {
  var list = document.getElementById("enquiryList");
  var visible = getVisibleEnquiries();
  list.innerHTML = "";

  // Cards slide in only on the first load, not on every live update
  list.classList.toggle("no-animate", firstRenderDone);
  firstRenderDone = true;

  document.getElementById("resultInfo").textContent =
    "Showing " + visible.length + " of " + allEnquiries.length + " enquiries";

  if (visible.length === 0) {
    var empty = makeEl("div", "empty-state");
    var icon = makeEl("i", "bi bi-inbox");
    icon.setAttribute("aria-hidden", "true");
    empty.appendChild(icon);
    empty.appendChild(makeEl("p", "mb-0",
      allEnquiries.length === 0
        ? "No enquiries yet. They will appear here as soon as a visitor submits the contact form."
        : "No enquiries match this filter or search."));
    list.appendChild(empty);
    return;
  }

  visible.forEach(function (e) {
    list.appendChild(buildEnquiryCard(e));
  });
}

// Builds one card. Visitor text is always added with textContent,
// never as HTML, so nobody can inject code through the contact form.
function buildEnquiryCard(e) {
  var card = makeEl("article", "enquiry-card status-" + e.status);

  // Top row: name + date, status badge
  var top = makeEl("div", "d-flex justify-content-between align-items-start gap-2");
  var nameBlock = makeEl("div");
  nameBlock.appendChild(makeEl("h3", "enquiry-name", e.name));
  nameBlock.appendChild(makeEl("span", "enquiry-date", formatDate(e.createdAt)));
  top.appendChild(nameBlock);
  top.appendChild(makeEl("span", "status-badge badge-" + e.status, STATUS_LABELS[e.status]));
  card.appendChild(top);

  // Service chip (only if the visitor chose one)
  if (e.service) {
    var chip = makeEl("span", "service-chip");
    var chipIcon = makeEl("i", "bi bi-tag-fill me-1");
    chipIcon.setAttribute("aria-hidden", "true");
    chip.appendChild(chipIcon);
    chip.appendChild(document.createTextNode(SERVICE_NAMES[e.service] || e.service));
    card.appendChild(chip);
  }

  // Subject + message
  card.appendChild(makeEl("p", "enquiry-subject", e.subject));
  card.appendChild(makeEl("div", "enquiry-message", e.message));

  // Contact links
  var contact = makeEl("div", "enquiry-contact d-flex flex-wrap gap-3 mb-3");

  var phoneLink = makeEl("a");
  phoneLink.href = "tel:" + e.phone.replace(/[^0-9+]/g, "");
  phoneLink.appendChild(iconEl("bi-telephone-fill"));
  phoneLink.appendChild(document.createTextNode(e.phone));
  contact.appendChild(phoneLink);

  var mailLink = makeEl("a");
  // Keep only normal email characters so the link can't be tampered with
  mailLink.href = "mailto:" + e.email.replace(/[^\w.@+\-]/g, "") +
    "?subject=" + encodeURIComponent("Re: " + e.subject);
  mailLink.appendChild(iconEl("bi-reply-fill"));
  mailLink.appendChild(document.createTextNode(e.email));
  contact.appendChild(mailLink);
  card.appendChild(contact);

  // Actions: status dropdown + delete
  var actions = makeEl("div", "enquiry-actions d-flex flex-wrap gap-2 align-items-center");
  var select = makeEl("select", "form-select form-select-sm");
  select.setAttribute("aria-label", "Status of enquiry from " + e.name);
  Object.keys(STATUS_LABELS).forEach(function (value) {
    var option = makeEl("option", "", STATUS_LABELS[value]);
    option.value = value;
    option.selected = value === e.status;
    select.appendChild(option);
  });
  select.addEventListener("change", function () {
    changeStatus(e.id, select.value, select);
  });
  actions.appendChild(select);

  var deleteBtn = makeEl("button", "btn btn-outline-danger btn-sm");
  deleteBtn.type = "button";
  deleteBtn.appendChild(iconEl("bi-trash"));
  deleteBtn.appendChild(document.createTextNode("Delete"));
  deleteBtn.addEventListener("click", function () {
    deleteEnquiry(e);
  });
  actions.appendChild(deleteBtn);
  card.appendChild(actions);

  return card;
}

// Saves a new status (the live listener then redraws everything)
function changeStatus(id, newStatus, select) {
  select.disabled = true;
  window.DLS_FIREBASE.db.collection("enquiries").doc(id)
    .update({ status: newStatus })
    .then(function () {
      showToast("Status changed to \"" + STATUS_LABELS[newStatus] + "\".", "success");
    })
    .catch(function (error) {
      showToast("Could not update the status: " + error.message, "danger");
      renderEnquiries(); // put the dropdown back to the saved value
    })
    .then(function () {
      select.disabled = false;
    });
}

// Deletes an enquiry after the admin confirms
function deleteEnquiry(e) {
  askConfirm("Delete the enquiry from " + e.name + "? This cannot be undone.", function () {
    window.DLS_FIREBASE.db.collection("enquiries").doc(e.id)
      .delete()
      .then(function () {
        showToast("Enquiry deleted.", "success");
      })
      .catch(function (error) {
        showToast("Could not delete: " + error.message, "danger");
      });
  });
}

// Downloads the enquiries currently shown as a CSV file (opens in Excel / Google Sheets)
function exportCsv() {
  var rows = getVisibleEnquiries();
  if (rows.length === 0) {
    showToast("There are no enquiries to export.", "warning");
    return;
  }
  var header = ["Date", "Name", "Email", "Phone", "Service", "Subject", "Message", "Status"];
  var lines = [header.map(csvCell).join(",")];
  rows.forEach(function (e) {
    lines.push([
      isoDate(e.createdAt), e.name, e.email, e.phone, SERVICE_NAMES[e.service] || "",
      e.subject, e.message, STATUS_LABELS[e.status]
    ].map(csvCell).join(","));
  });

  // "﻿" helps Excel read Indian names and symbols correctly
  var blob = new Blob(["﻿" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" });
  var link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "dynamic-enquiries-" + isoDate(new Date()).slice(0, 10) + ".csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(function () {
    URL.revokeObjectURL(link.href);
  }, 1000);
  showToast("Exported " + rows.length + " enquiries.", "success");
}

/* ---------- Small helpers ---------- */

// Creates an element with a class and optional text
function makeEl(tag, className, text) {
  var el = document.createElement(tag);
  if (className) {
    el.className = className;
  }
  if (text !== undefined && text !== "") {
    el.textContent = text;
  }
  return el;
}

// A Bootstrap icon followed by a small gap
function iconEl(name) {
  var icon = makeEl("i", "bi " + name + " me-1");
  icon.setAttribute("aria-hidden", "true");
  return icon;
}

// Quotes a value for CSV. Text that a spreadsheet could run as a formula
// (starting with = @ tab, or + / - not followed by a number) gets a ' in front.
// Phone numbers like +91 98765 43210 stay as they are.
function csvCell(value) {
  var text = String(value === null || value === undefined ? "" : value);
  if (/^(=|@|\t|\r|[+\-](?![\d\s]))/.test(text)) {
    text = "'" + text;
  }
  return '"' + text.replace(/"/g, '""') + '"';
}

// 2026-10-14 15:30 (sorts correctly in spreadsheets)
function isoDate(date) {
  if (!date) {
    return "";
  }
  function two(n) { return (n < 10 ? "0" : "") + n; }
  return date.getFullYear() + "-" + two(date.getMonth() + 1) + "-" + two(date.getDate()) +
    " " + two(date.getHours()) + ":" + two(date.getMinutes());
}

// 14 Oct 2026, 3:30 pm (for the cards)
function formatDate(date) {
  if (!date) {
    return "Just now";
  }
  return date.toLocaleString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
    hour: "numeric", minute: "2-digit"
  });
}

function showDashboardError(text) {
  var box = document.getElementById("dashboardError");
  box.textContent = text;
  box.classList.remove("d-none");
}

function hideDashboardError() {
  document.getElementById("dashboardError").classList.add("d-none");
}

/* =========================================================
   PART C — POP-UP MESSAGES AND CONFIRM BOX
   (Bootstrap components, because some in-app phone browsers
   silently block the browser's alert() and confirm())
   ========================================================= */

// Small message at the bottom of the screen that disappears by itself
function showToast(text, type) {
  var area = document.getElementById("toastArea");
  if (!area || !window.bootstrap) {
    console.log(text);
    return;
  }
  var colours = { success: "text-bg-success", danger: "text-bg-danger", warning: "text-bg-warning" };
  var toast = makeEl("div", "toast align-items-center border-0 " + (colours[type] || "text-bg-dark"));
  toast.setAttribute("role", type === "danger" ? "alert" : "status");
  var row = makeEl("div", "d-flex");
  row.appendChild(makeEl("div", "toast-body", text));
  var close = makeEl("button", "btn-close me-2 m-auto" + (type === "warning" ? "" : " btn-close-white"));
  close.type = "button";
  close.setAttribute("data-bs-dismiss", "toast");
  close.setAttribute("aria-label", "Close");
  row.appendChild(close);
  toast.appendChild(row);
  area.appendChild(toast);
  toast.addEventListener("hidden.bs.toast", function () {
    toast.remove();
  });
  new bootstrap.Toast(toast, { delay: type === "danger" ? 7000 : 3500 }).show();
}

// Shows the "Delete enquiry?" box and runs onYes if the admin agrees
function askConfirm(text, onYes) {
  var modalEl = document.getElementById("confirmModal");
  if (!modalEl || !window.bootstrap) {
    if (window.confirm(text)) {
      onYes();
    }
    return;
  }
  document.getElementById("confirmText").textContent = text;
  var modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  var yesBtn = document.getElementById("confirmYes");

  // Replace the button so an old click handler can't run twice
  var freshYes = yesBtn.cloneNode(true);
  yesBtn.parentNode.replaceChild(freshYes, yesBtn);
  freshYes.addEventListener("click", function () {
    modal.hide();
    onYes();
  });
  modal.show();
}
