/* =========================================================
   Dynamic Logistics — Firebase connection
   File: js/firebase-config.js
   Used by: contact.html, admin-login.html, admin.html

   >>> THE ONLY FILE YOU MUST EDIT TO TURN ON FIREBASE <<<
   Replace the six "PASTE_..." values below with the values
   from YOUR Firebase project (guide: Part 5, step F).
   - Keep the quotes and commas exactly as they are.
   - Paste ONLY the values. Do NOT paste Firebase's "import ..."
     or "const firebaseConfig" lines into this file.

   Is it safe to put these values in a public website?
   Yes. Firebase web config is meant to be public. Your data is
   protected by the Security Rules (firestore.rules).
   ========================================================= */

/* global firebase */

var firebaseConfig = {
  apiKey: "PASTE_API_KEY_HERE",
  authDomain: "PASTE_PROJECT_ID.firebaseapp.com",
  projectId: "PASTE_PROJECT_ID",
  storageBucket: "PASTE_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "PASTE_SENDER_ID",
  appId: "PASTE_APP_ID"
};

/* ---------------------------------------------------------
   Do not change anything below this line.
   It starts Firebase and shares it with the other scripts
   through one object: window.DLS_FIREBASE
   --------------------------------------------------------- */
window.DLS_FIREBASE = {
  ready: false,         // true when Firebase started correctly
  notConfigured: false, // true while the values above still say "PASTE_..."
  reason: "",           // why it is not ready (shown on admin pages)
  db: null,             // Firestore database
  auth: null            // Authentication (admin pages only)
};

(function startFirebase() {
  var fb = window.DLS_FIREBASE;

  // 1. Have the values been pasted in?
  var apiKey = String(firebaseConfig.apiKey || "");
  var projectId = String(firebaseConfig.projectId || "");
  if (apiKey === "" || projectId === "" ||
      apiKey.indexOf("PASTE") === 0 || projectId.indexOf("PASTE") === 0) {
    fb.notConfigured = true;
    fb.reason = "Firebase is not set up yet. Paste your values into js/firebase-config.js.";
    console.warn(fb.reason);
    return;
  }

  // 2. Did the Firebase library load? (needs internet)
  if (typeof firebase === "undefined") {
    fb.reason = "The Firebase library did not load. Check your internet connection and refresh.";
    console.warn(fb.reason);
    return;
  }

  // 3. Start Firebase
  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    fb.db = firebase.firestore();
    // Authentication is loaded only on the admin pages
    if (typeof firebase.auth === "function") {
      fb.auth = firebase.auth();
    }
    fb.ready = true;
  } catch (error) {
    fb.reason = "Firebase could not start: " + error.message;
    console.error(fb.reason);
  }
})();
