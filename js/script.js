/* =========================================================
   Dynamic Logistics — Public website JavaScript
   File: js/script.js
   Used by: index.html, about.html, services.html, contact.html
   Each part checks that its element exists first, so the same
   file works on every page.

   1. Footer year             5. Scroll animations
   2. Image fallback          6. Contact form (contact.html)
   3. Phone menu auto-close   7. Form helper functions
   4. Back-to-top + navbar
   ========================================================= */

/* global firebase */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- 1. Show the current year in the footer ---------- */
  var yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* ---------- 2. Image fallback ----------
     If an online photo does not load (no internet, or the link
     stopped working), show the local illustration instead. */
  document.querySelectorAll("img[data-fallback]").forEach(function (img) {
    function useFallback() {
      var fallback = img.getAttribute("data-fallback");
      // Only swap once, so a missing fallback can't cause an endless loop
      if (fallback && img.getAttribute("src") !== fallback) {
        // Remove the size options too, otherwise the browser keeps trying the online photo
        img.removeAttribute("srcset");
        img.removeAttribute("sizes");
        img.setAttribute("src", fallback);
      }
    }
    img.addEventListener("error", useFallback);
    // The image may have failed before this script ran
    if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) {
      useFallback();
    }
  });

  /* ---------- 3. Accessible mobile navigation ---------- */
  var menu = document.getElementById("mainMenu");
  var menuToggle = document.querySelector(".menu-toggle");

  function closeMenu() {
    if (!menu || !menuToggle) {
      return;
    }
    menu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  }

  if (menu && menuToggle) {
    menuToggle.addEventListener("click", function () {
      var isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menu.classList.toggle("is-open", !isOpen);
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
        menuToggle.focus();
      }
    });
  }

  document.querySelectorAll(".site-nav a").forEach(function (link) {
    link.addEventListener("click", function () {
      closeMenu();
    });
  });

  /* ---------- 4. Back-to-top button + compact header ---------- */
  var backToTop = document.getElementById("backToTop");
  var navbar = document.querySelector(".site-header");
  var enquiryPanel = document.querySelector(".form-panel");

  function onScroll() {
    var scrolled = window.scrollY || window.pageYOffset;
    if (backToTop) {
      backToTop.classList.toggle("show", scrolled > 300);
      if (enquiryPanel) {
        var panel = enquiryPanel.getBoundingClientRect();
        backToTop.classList.toggle("over-form", panel.top < window.innerHeight && panel.bottom > 0);
      }
    }
    if (navbar) {
      navbar.classList.toggle("is-scrolled", scrolled > 40);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // in case the page opens already scrolled

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- 5. Scroll animations ----------
     Elements with class="reveal" fade in when they scroll onto the
     screen. Older browsers simply show everything at once. */
  var revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // animate only once
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("visible");
    });
  }

  /* ---------- 6. Contact form (contact.html only) ---------- */
  var form = document.getElementById("contactForm");
  if (form) {
    setupContactForm(form);
  }
});

/* =========================================================
   7. Contact form
   ========================================================= */

var isSending = false; // stops double submits

function setupContactForm(form) {
  var message = document.getElementById("message");

  // Pre-select a service when arriving from services.html (?service=sea-shipping)
  preselectService();

  // Live "120 / 2000" counter under the message box
  message.addEventListener("input", updateCharCount);
  updateCharCount();

  // Remove a field's red error as soon as the user starts fixing it
  form.querySelectorAll(".form-control").forEach(function (input) {
    input.addEventListener("input", function () {
      input.classList.remove("is-invalid");
      input.removeAttribute("aria-invalid");
    });
  });

  form.addEventListener("submit", function (event) {
    // Stop the browser's own submit: we send the data ourselves
    event.preventDefault();
    if (isSending) {
      return;
    }
    hideFormMessages();

    if (!validateContactForm()) {
      var firstError = form.querySelector(".is-invalid");
      if (firstError) {
        firstError.focus();
      }
      return;
    }

    var enquiry = collectFormData();

    // Silently ignore likely bots; never report an unsaved enquiry as successful.
    if (document.getElementById("dlsTrap").value !== "") {
      return;
    }

    setSending(true);

    saveEnquiry(enquiry)
      .then(function (result) {
        if (result === "saved") {
          showFormMessage("formSuccess", enquiry.name);
          resetForm();
        } else {
          showFormMessage("formDemo");
        }
      })
      .catch(function (error) {
        console.error("Could not save enquiry:", error);
        document.getElementById("formErrorReason").textContent = friendlySaveError(error);
        showFormMessage("formError");
      })
      .then(function () {
        setSending(false); // runs after success or error
      });
  });
}

// Reads the form. Extra spaces are tidied so the saved data is clean.
function collectFormData() {
  var data = {
    name: tidy(document.getElementById("name").value),
    email: document.getElementById("email").value.trim(),
    phone: tidy(document.getElementById("phone").value),
    subject: tidy(document.getElementById("subject").value),
    message: document.getElementById("message").value.trim()
  };
  var service = document.getElementById("service").value;
  if (service !== "") {
    data.service = service; // only saved when the visitor chose one
  }
  return data;
}

// Trims and turns runs of spaces into one space
function tidy(text) {
  return text.replace(/\s+/g, " ").trim();
}

// Saves one enquiry. Returns a Promise that:
//   resolves "saved" -> stored in Firebase Firestore
//   resolves "demo"  -> config not pasted yet, so nothing was stored
//   rejects          -> could not be stored (offline, rules, broken config...)
function saveEnquiry(enquiry) {
  var fb = window.DLS_FIREBASE;

  // firebase-config.js missing or has a typo (the whole file failed to run)
  if (!fb) {
    return Promise.reject(new Error("config-broken"));
  }

  // Config not pasted yet: website works, but enquiries are not connected
  if (fb.notConfigured) {
    return Promise.resolve("demo");
  }

  // Phone is offline: fail straight away instead of waiting
  if (navigator.onLine === false) {
    return Promise.reject(new Error("offline"));
  }

  // Config pasted, but Firebase could not start (usually no internet)
  if (!fb.ready) {
    return Promise.reject(new Error(fb.reason || "firebase-not-ready"));
  }

  var record = {
    name: enquiry.name,
    email: enquiry.email,
    phone: enquiry.phone,
    subject: enquiry.subject,
    message: enquiry.message,
    status: "new", // the admin changes this later
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
  if (enquiry.service) {
    record.service = enquiry.service;
  }

  return new Promise(function (resolve, reject) {
    // A weak connection can make saving wait for ever,
    // so give up after 15 seconds and show an error instead.
    var timer = setTimeout(function () {
      reject(new Error("timeout"));
    }, 15000);

    fb.db.collection("enquiries").add(record)
      .then(function () {
        clearTimeout(timer);
        resolve("saved");
      })
      .catch(function (error) {
        clearTimeout(timer);
        reject(error);
      });
  });
}

// Turns technical errors into a sentence for the visitor
function friendlySaveError(error) {
  var text = (error && (error.code || error.message)) || "";
  if (text === "offline" || text === "timeout" || text.indexOf("internet") !== -1 || text === "unavailable") {
    return "Your phone seems to be offline or the connection is too slow. Please check your internet and try again.";
  }
  if (text === "permission-denied") {
    return "The website's security settings rejected this enquiry. (Website owner: publish the latest firestore.rules.)";
  }
  if (text === "config-broken") {
    return "The website's settings file has a mistake. (Website owner: check js/firebase-config.js.)";
  }
  return "Something went wrong while sending. Please try again in a minute.";
}

// Pre-selects the service dropdown from the web address, e.g. contact.html?service=sea-shipping
function preselectService() {
  var select = document.getElementById("service");
  if (!select || !window.URLSearchParams) {
    return;
  }
  var wanted = new URLSearchParams(window.location.search).get("service");
  if (!wanted) {
    return;
  }
  for (var i = 0; i < select.options.length; i++) {
    if (select.options[i].value === wanted) {
      select.value = wanted;
      break;
    }
  }
}

function updateCharCount() {
  var message = document.getElementById("message");
  var counter = document.getElementById("messageCount");
  if (!message || !counter) {
    return;
  }
  var max = message.getAttribute("maxlength") || 2000;
  var length = message.value.length;
  counter.textContent = length + " / " + max;
  counter.classList.toggle("near-limit", length > max * 0.9);
}

// Shows/hides the spinner and disables the button while sending
function setSending(sending) {
  isSending = sending;
  var button = document.getElementById("submitBtn");
  if (!button) {
    return;
  }
  button.disabled = sending;
  button.setAttribute("aria-busy", String(sending));
  button.textContent = sending ? "Sending..." : "Submit Enquiry";
}

// Shows one of the three message boxes and moves the screen to it
function showFormMessage(id, name) {
  var box = document.getElementById(id);
  if (!box) {
    return;
  }
  var nameSpan = box.querySelector(".success-name");
  if (nameSpan) {
    nameSpan.textContent = name || "";
  }
  box.classList.remove("d-none");
  box.scrollIntoView({ behavior: "smooth", block: "center" });
  box.focus({ preventScroll: true }); // screen readers announce it
}

function hideFormMessages() {
  ["formSuccess", "formDemo", "formError"].forEach(function (id) {
    var box = document.getElementById(id);
    if (box) {
      box.classList.add("d-none");
    }
  });
}

// Empties the form and removes green/red borders
function resetForm() {
  var form = document.getElementById("contactForm");
  form.reset();
  form.querySelectorAll(".form-control, .form-select").forEach(function (field) {
    field.classList.remove("is-valid", "is-invalid");
  });
  updateCharCount();
}

// Checks every field and returns true only if all are correct.
// The limits match firestore.rules.
function validateContactForm() {
  var allOk = true;

  var name = document.getElementById("name");
  var email = document.getElementById("email");
  var phone = document.getElementById("phone");
  var subject = document.getElementById("subject");
  var message = document.getElementById("message");

  // Name: 2 to 100 characters
  var nameLength = tidy(name.value).length;
  if (nameLength < 2 || nameLength > 100) {
    showError(name, "Please enter your full name (at least 2 letters).");
    allOk = false;
  } else {
    showValid(name);
  }

  // Email: required and must look like name@example.com
  var emailValue = email.value.trim();
  if (emailValue === "") {
    showError(email, "Please enter your email address.");
    allOk = false;
  } else if (!isValidEmail(emailValue)) {
    showError(email, "Please enter a valid email address, e.g. name@example.com");
    allOk = false;
  } else {
    showValid(email);
  }

  // Phone: 10 to 13 digits; spaces, +, - and brackets are allowed
  var phoneValue = tidy(phone.value);
  var digits = phoneValue.replace(/[\s+\-()]/g, "");
  if (phoneValue === "") {
    showError(phone, "Please enter your phone number.");
    allOk = false;
  } else if (!/^[0-9]{10,13}$/.test(digits) || phoneValue.length > 20) {
    showError(phone, "Please enter a valid phone number (10 to 13 digits).");
    allOk = false;
  } else {
    showValid(phone);
  }

  // Subject: 3 to 150 characters
  var subjectLength = tidy(subject.value).length;
  if (subjectLength < 3 || subjectLength > 150) {
    showError(subject, "Please enter a subject (at least 3 characters).");
    allOk = false;
  } else {
    showValid(subject);
  }

  // Message: 10 to 2000 characters
  var messageLength = message.value.trim().length;
  if (messageLength < 10 || messageLength > 2000) {
    showError(message, "Please enter a message (at least 10 characters).");
    allOk = false;
  } else {
    showValid(message);
  }

  return allOk;
}

// Simple email pattern: something@something.something
function isValidEmail(value) {
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return pattern.test(value) && value.length <= 150;
}

// Marks a field red and shows the error text below it
function showError(field, text) {
  field.classList.remove("is-valid");
  field.classList.add("is-invalid");
  field.setAttribute("aria-invalid", "true");
  var feedback = document.getElementById(field.id + "Error");
  if (feedback) {
    feedback.textContent = text;
  }
}

// Marks a field green
function showValid(field) {
  field.classList.remove("is-invalid");
  field.classList.add("is-valid");
  field.removeAttribute("aria-invalid");
}
