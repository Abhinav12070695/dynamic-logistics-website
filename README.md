# Dynamic Logistics — Complete Project Guide
### IWP project · Static HTML, CSS and JavaScript · Firebase — built and run on an Android phone

This is the **final, combined version** of Phase 1 (website) and Phase 2 (animations, Firebase contact form, admin dashboard, charts, map), with bug fixes and enhancements. The public pages are framework-free; Bootstrap remains in use on the admin pages.

---

## Part 1 — What the project does

| Area | Features |
|---|---|
| **Website (4 pages)** | Home, About Us, Services, Contact Us · editorial ivory, graphite and orange design · responsive navigation · freight photography · two core services · footer with business contact details |
| **Interactions** | Keyboard-operable mobile navigation, restrained scroll reveals and hover transitions, all respecting reduced-motion preferences |
| **Contact form** | Name, email, phone, *service needed (optional)*, subject, message · JavaScript validation · character counter · spam trap · saved to **Firebase Firestore** · honest success / error / "not connected yet" messages |
| **Services → Contact** | Each service card has *"Enquire about …"*, which opens the form with that service already selected |
| **Office map** | Google Map of NBC Complex, CBD Belapur on the Contact page |
| **Admin login** | Email + password (Firebase Authentication), show/hide password, "Forgot password" email |
| **Admin dashboard** | Live enquiry list · number cards · *Enquiries received* chart (8 weeks / 6 months) · *Status breakdown* bar · search · filters · change status · call / reply by email · delete with confirmation · Export CSV |
| **Security** | Firestore Rules: visitors can only *create* checked enquiries; only the admin email can read, change or delete them |
| **Extras** | "Add to Home screen" app icon · 404 page for GitHub Pages · Google business details (only facts from the visiting card) · accessibility fixes |

**Two ways it runs:**
1. **Without Firebase** (straight after unzipping): the whole website works; the form checks details and tells visitors that online enquiries aren't connected yet.
2. **With Firebase** (after Part 5, about 15 minutes, free): enquiries are saved and appear on the admin dashboard.

---

## Part 2 — Apps you need on your Android phone (all free)

| App | Why |
|---|---|
| **Acode – code editor** (Play Store) | Open, edit and save the files; ▶ preview the website |
| **Chrome** | View the website; Firebase console |
| **ZArchiver** (optional) | Unzip if your Files app can't |

> Keep mobile data or Wi-Fi **on** while previewing — web fonts, freight photos, Firebase, admin charts and the map use external services. Local photo fallbacks remain available.

---

## Part 3 — Folder structure

```
dynamic-logistics/
├── index.html              Home page
├── about.html              About Us
├── services.html           Services (with "Enquire about…" links)
├── contact.html            Contact Us: details, enquiry form, map
├── admin-login.html        Admin login
├── admin.html              Admin dashboard
├── 404.html                "Page not found" (used by GitHub Pages)
├── manifest.json           App name + icon for "Add to Home screen"
├── firestore.rules         Security rules (paste into Firebase; not used by the browser)
├── README.md               This guide
├── FILES.txt               List of every file (check nothing is missing)
├── css/
│   ├── style.css           All website styles + animations
│   └── admin.css           Extra styles for the admin pages
├── js/
│   ├── firebase-config.js  ← the ONLY file you must edit (Part 5F)
│   ├── script.js           Website: menu, animations, image fallback, contact form
│   ├── admin.js            Admin: login, dashboard, export, pop-ups
│   └── admin-charts.js     Admin: the two charts
└── images/
    ├── logo.svg                Ship logo
    ├── app-icon.svg            Square app icon (source)
    ├── icon-192.png, icon-512.png   App icons for "Add to Home screen"
    ├── fallback-ship.svg       ┐ Local illustrations shown when an
    ├── fallback-containers.svg ├ online photo can't load
    └── fallback-warehouse.svg  ┘
```

Names are **case-sensitive** — all lowercase, no spaces.

---

## Part 4 — Put the project on your phone and run it

1. Download **`dynamic-logistics-final.zip`** → open it in Files/ZArchiver → **Extract** into `Documents`.
2. Open **Acode** → **☰ → Open folder** → `Documents/dynamic-logistics`.
3. Open `index.html` → tap **▶** (Run/Preview).
4. After editing any file: **Save** (💾), then refresh the preview.

> **Already set up Firebase with an earlier version?** Your old `js/firebase-config.js` has your values — copy it into the new folder (replacing the new one, which still says `PASTE_...`). Then **re-paste `firestore.rules`** in Firebase (it changed: the new optional *service* field), put your admin email back in, and **Publish**.

> **Owner and services update (October 2026):** the contact person is now **Issac Briding, Owner** (phone **9082721955**), and two services were added: **Customs Clearance** and **Transportation Services**. If Firebase is already set up, **re-paste `firestore.rules` and Publish again** — the list of allowed services changed, and without this, enquiries that choose one of the new services will be rejected. Changed files: `index.html`, `about.html`, `services.html`, `contact.html`, `404.html`, `css/style.css`, `js/admin.js`, `firestore.rules` (Part 6 below has the updated code).

> **Editorial redesign (October 2026):** public pages now use an editorial industrial design with warm ivory, graphite, safety orange and restrained blue; bold Manrope and readable DM Sans typography; a sticky responsive menu; freight photography; and bespoke layouts across Home, About, Services and Contact. The quote form retains its Firestore integration and validation. The admin pages and Firebase setup are unchanged.

### Run locally on Windows

From PowerShell in the project folder, run `py -m http.server 8000`, then open `http://localhost:8000` in a browser. Use `Ctrl+C` in PowerShell to stop the local server. Serving the files over HTTP allows the Firebase scripts and URL-based service selection to behave as expected.

**Typing it in by hand instead (for learning/viva):** in Acode long-press the folder → *New folder* / *New file*, create every folder and file from Part 3 exactly, paste each file's code from Part 6, and save. The PNG icons can't be typed — copy them from the ZIP, or delete the two `icon-…png` lines from `manifest.json` and the `apple-touch-icon` line from each page.

---

## Part 5 — Turn on Firebase (one time, ~15 minutes, free Spark plan)

Use Chrome. If a screen looks cramped, tap **⋮ → Desktop site**.

**A. Create the project** — open **console.firebase.google.com** → **Create a project** → name `dynamic-logistics` → you can switch Gemini / Google Analytics **off** → **Create project**.

**B. Create the database** — menu ☰ → **Build → Firestore Database** → **Create database** → (edition: **Standard** if asked) → location **asia-south1 (Mumbai)** (can't be changed later) → **Start in production mode** → **Create**.

**C. Turn on admin login** — **Build → Authentication → Get started** → **Sign-in method → Email/Password** → turn on the **first** switch only → **Save** → **Users → Add user** → admin email + password (6+ characters). Use an email the admin can open, and write it down exactly.

**D. Paste the Security Rules** — **Firestore Database → Rules** → delete everything → paste all of `firestore.rules` → replace `ADMIN_EMAIL_HERE` with the admin email from C (lowercase, keep the quotes) → **Publish**.

**E. Register the website** — ⚙ next to *Project Overview* → **Project settings** → **Your apps** → web icon **`</>`** → nickname `Dynamic website` (leave Hosting unticked) → **Register app**. Firebase shows `const firebaseConfig = { apiKey: "...", ... }`.

**F. Paste the six values** into `js/firebase-config.js` — replace each `PASTE_...` value, keeping the quotes and commas. **Only the values** — do not paste Firebase's `import` or `const` lines (that breaks the file; the site will tell you "firebase-config.js has a typo"). Example (yours will differ):
```javascript
var firebaseConfig = {
  apiKey: "AIzaSyB-example-only-1234567890",
  authDomain: "dynamic-logistics-ab12c.firebaseapp.com",
  projectId: "dynamic-logistics-ab12c",
  storageBucket: "dynamic-logistics-ab12c.firebasestorage.app",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456"
};
```
Save.

**G. Verify the setup safely** — do not submit a valid enquiry through a live site connected to the company's Firebase project: that creates a real company enquiry record. To verify an end-to-end save, use a separate Firebase test project and test contact details. On the live company site, do not submit test enquiries. The form does not send email; it writes to Firestore when configured.

---

## Part 6 — Historical code snapshots (not current)

The code blocks in this section are retained from an earlier project version and do not match the redesigned public pages. Do not copy or deploy them. The files in the project folders above are the current source of truth. The two PNG icons (`images/icon-192.png`, `images/icon-512.png`) are pictures, so they come only in the ZIP.

### 6.1  `dynamic-logistics/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dynamic Logistics | Customs Clearance &amp; Transportation, Navi Mumbai</title>
  <meta name="description" content="Dynamic Logistics, CBD Belapur, Navi Mumbai: customs clearance and transportation services. Contact the owner, Issac Briding, on 9082721955.">

  <!-- Phone browser bar colour + app details for "Add to Home screen" -->
  <meta name="theme-color" content="#10243a">
  <link rel="manifest" href="manifest.json">
  <link rel="icon" href="images/logo.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="images/icon-192.png">

  <!-- Preview text when the link is shared on WhatsApp, etc. -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Dynamic Logistics">
  <meta property="og:title" content="Dynamic Logistics | Customs Clearance &amp; Transportation, Navi Mumbai">
  <meta property="og:description" content="Dynamic Logistics, CBD Belapur, Navi Mumbai: customs clearance and transportation services. Contact the owner, Issac Briding, on 9082721955.">

  <!-- Tells style.css that JavaScript is on, so scroll animations can be used -->
  <script>document.documentElement.classList.add("js");</script>

  <!-- Inter font (needs internet; falls back to the phone's normal font) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet">

  <!-- Bootstrap 5 + Bootstrap Icons (need internet) -->
  <link rel="preconnect" href="https://cdn.jsdelivr.net">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
  <!-- Our own styles (must come AFTER Bootstrap) -->
  <link href="css/style.css" rel="stylesheet">

  <!-- Business details for Google (only verified facts: company, owner's phone, visiting-card address and email) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Dynamic Logistics",
    "telephone": "9082721955",
    "email": "dynamiclogisticsshipping@gmail.com",
    "makesOffer": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Customs Clearance" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Transportation Services" } }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Office No. 407, NBC Complex, Sector 11, Plot No. 43, CBD Belapur",
      "addressLocality": "Navi Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "400614",
      "addressCountry": "IN"
    }
  }
  </script>
</head>
<body>

  <!-- Keyboard users can jump straight past the menu -->
  <a class="skip-link" href="#main-content">Skip to main content</a>

  <!-- ================= HEADER + NAVIGATION ================= -->
  <nav class="navbar navbar-expand-lg navbar-dark navbar-custom sticky-top" aria-label="Main">
    <div class="container">
      <a class="navbar-brand" href="index.html" aria-label="Dynamic Logistics – home">
        <img src="images/logo.svg" alt="" width="42" height="42">
        <span class="brand-text">
          <span class="brand-name">DYNAMIC</span>
          <span class="brand-tagline">Logistics</span>
        </span>
      </a>

      <!-- Call button stays visible on phones (icon only) next to the menu button -->
      <div class="d-flex align-items-center gap-2 ms-auto ms-lg-3 order-lg-last">
        <a href="tel:9082721955" class="btn btn-amber btn-call" aria-label="Call Us: 9082721955">
          <i class="bi bi-telephone-fill" aria-hidden="true"></i><span class="d-none d-sm-inline">Call&nbsp;Us</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainMenu"
          aria-controls="mainMenu" aria-expanded="false" aria-label="Open menu">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>

      <div class="collapse navbar-collapse" id="mainMenu">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link active" aria-current="page" href="index.html">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="about.html">About Us</a></li>
          <li class="nav-item"><a class="nav-link" href="services.html">Services</a></li>
          <li class="nav-item"><a class="nav-link" href="contact.html">Contact Us</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <main id="main-content" tabindex="-1">

    <!-- ================= HERO ================= -->
    <section class="hero" aria-labelledby="heroTitle">
      <img class="hero-media" src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=70&amp;w=1600" srcset="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=70&amp;w=640 640w, https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=70&amp;w=1000 1000w, https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=70&amp;w=1600 1600w" sizes="100vw" data-fallback="images/fallback-ship.svg" alt="" width="1600" height="1067" fetchpriority="high" decoding="async">
      <div class="container">
        <div class="row">
          <div class="col-lg-9 col-xl-8">
            <p class="hero-eyebrow">Customs Clearance &middot; Transportation</p>
            <h1 id="heroTitle">Your Logistics Partner for Seamless Cargo Movement</h1>
            <p class="lead">
              Professional logistics support for customs clearance and transportation requirements,
              helping businesses coordinate the movement of their goods.
            </p>
            <div class="d-flex flex-column flex-sm-row gap-3">
              <a href="services.html" class="btn btn-amber btn-lg">Explore Our Services <i class="bi bi-arrow-right" aria-hidden="true"></i></a>
              <a href="contact.html" class="btn btn-outline-light btn-lg">Contact Us</a>
            </div>
            <p class="hero-contact">
              Speak to the owner, Issac Briding: <a href="tel:9082721955">9082721955</a>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= COMPANY INTRODUCTION ================= -->
    <section class="section" aria-labelledby="introTitle">
      <div class="container">
        <div class="row align-items-center g-4 g-lg-5">
          <div class="col-lg-6 order-lg-2 reveal">
            <span class="eyebrow">About Dynamic Logistics</span>
            <h2 class="section-title" id="introTitle">Customs clearance and transportation support from Navi Mumbai</h2>
            <p>
              Dynamic Logistics is a logistics business based at NBC Complex, CBD Belapur, Navi Mumbai.
              We help businesses with two connected parts of moving goods: the customs clearance
              procedures and documentation their shipments need, and the transportation that moves
              those goods from one location to another.
            </p>
            <ul class="check-list my-4">
              <li><i class="bi bi-check-circle-fill" aria-hidden="true"></i>Customs clearance procedures and documentation</li>
              <li><i class="bi bi-check-circle-fill" aria-hidden="true"></i>Coordination of goods transportation</li>
              <li><i class="bi bi-check-circle-fill" aria-hidden="true"></i>Direct contact with the owner, Issac Briding</li>
            </ul>
            <a href="about.html" class="btn btn-outline-navy">More About Us</a>
          </div>
          <div class="col-lg-6 order-lg-1 reveal delay-1">
            <div class="media-frame">
              <img src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=70&amp;w=1000" srcset="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=70&amp;w=640 640w, https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=70&amp;w=1000 1000w, https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=70&amp;w=1600 1600w" sizes="(min-width: 992px) 50vw, 100vw" data-fallback="images/fallback-containers.svg" alt="Aerial view of a container terminal with stacked shipping containers" width="1200" height="900" loading="lazy" decoding="async">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= SERVICES OVERVIEW ================= -->
    <section class="section bg-light-grey" aria-labelledby="servicesTitle">
      <div class="container">
        <div class="section-head text-center reveal">
          <span class="eyebrow">What we do</span>
          <h2 class="section-title" id="servicesTitle">Our Services</h2>
          <p class="section-subtitle">Two core services, coordinated for you through one direct point of contact.</p>
        </div>

        <!-- Same service keys as the contact form dropdown -->
        <div class="row g-4 justify-content-center">
          <div class="col-md-6 col-xl-5 reveal">
            <article class="card service-card service-card-main">
              <div class="card-body">
                <div class="service-icon"><i class="bi bi-file-earmark-check" aria-hidden="true"></i></div>
                <h3>Customs Clearance</h3>
                <p>We assist with customs clearance procedures and the documentation required for the movement of goods through customs, helping customers coordinate the clearance process.</p>
                <div class="card-actions">
                  <a href="contact.html?service=customs-clearance#enquiry" class="btn btn-navy">Enquire Now</a>
                  <a href="services.html#customs-clearance" class="card-link-enquire">Service details <i class="bi bi-arrow-right" aria-hidden="true"></i></a>
                </div>
              </div>
            </article>
          </div>
          <div class="col-md-6 col-xl-5 reveal delay-1">
            <article class="card service-card service-card-main">
              <div class="card-body">
                <div class="service-icon"><i class="bi bi-truck" aria-hidden="true"></i></div>
                <h3>Transportation Services</h3>
                <p>We support the coordination of goods transportation from one location to another, helping businesses manage their shipment movement and logistics requirements.</p>
                <div class="card-actions">
                  <a href="contact.html?service=transportation#enquiry" class="btn btn-navy">Enquire Now</a>
                  <a href="services.html#transportation" class="card-link-enquire">Service details <i class="bi bi-arrow-right" aria-hidden="true"></i></a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= SERVICE PROCESS ================= -->
    <section class="section " aria-labelledby="processTitle">
      <div class="container">
        <div class="section-head text-center reveal">
          <span class="eyebrow">How it works</span>
          <h2 class="section-title" id="processTitle">Our Service Process</h2>
          <p class="section-subtitle">A simple outline of how we work with you, from your first enquiry onwards.</p>
        </div>
        <ol class="process">
          <li class="process-step reveal">
            <span class="process-num" aria-hidden="true">1</span>
            <h3>Enquiry</h3>
            <p>You share your logistics requirements by phone, email or the enquiry form.</p>
          </li>
          <li class="process-step reveal delay-1">
            <span class="process-num" aria-hidden="true">2</span>
            <h3>Documentation &amp; Clearance</h3>
            <p>The documents and customs procedures your goods need are coordinated.</p>
          </li>
          <li class="process-step reveal delay-2">
            <span class="process-num" aria-hidden="true">3</span>
            <h3>Transportation</h3>
            <p>Transportation arrangements for moving your goods are coordinated.</p>
          </li>
          <li class="process-step reveal delay-3">
            <span class="process-num" aria-hidden="true">4</span>
            <h3>Completion</h3>
            <p>The agreed service process is completed.</p>
          </li>
        </ol>
        <p class="process-note text-center mb-0">This is a general outline. The exact steps depend on each shipment and the services you need.</p>
      </div>
    </section>

    <!-- ================= CONTACT PANEL ================= -->
    <section class="section pt-0" aria-labelledby="contactPanelTitle">
      <div class="container">
        <div class="contact-panel reveal">
          <div class="row align-items-center g-4">
            <div class="col-lg-7">
              <h2 id="contactPanelTitle">Need Help With Your Logistics Requirements?</h2>
              <p>Speak with the owner about customs clearance or transportation for your goods.</p>
              <p class="panel-contact">
                Issac Briding, Owner &middot; <a href="tel:9082721955">9082721955</a>
              </p>
            </div>
            <div class="col-lg-5 d-flex flex-column flex-sm-row justify-content-lg-end gap-2">
              <a href="tel:9082721955" class="btn btn-amber btn-lg"><i class="bi bi-telephone-fill" aria-hidden="true"></i>Call&nbsp;Now</a>
              <a href="contact.html#enquiry" class="btn btn-outline-light btn-lg"><i class="bi bi-send" aria-hidden="true"></i>Send an Enquiry</a>
            </div>
          </div>
        </div>
      </div>
    </section>

  </main>

  <!-- ================= FOOTER ================= -->
  <footer class="site-footer">
    <div class="container">
      <div class="row g-4 g-lg-5">
        <div class="col-lg-4">
          <p class="footer-brand"><img src="images/logo.svg" alt="" width="36" height="36">Dynamic Logistics</p>
          <p class="footer-about">Customs clearance and transportation services from our office in CBD Belapur, Navi Mumbai.</p>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
          <h2 class="footer-title">Company</h2>
          <ul class="footer-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="contact.html">Contact Us</a></li>
          </ul>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
          <h2 class="footer-title">Services</h2>
          <ul class="footer-links">
            <li><a href="services.html#customs-clearance">Customs Clearance</a></li>
            <li><a href="services.html#transportation">Transportation Services</a></li>
            <li><a href="contact.html#enquiry">Send an Enquiry</a></li>
          </ul>
        </div>
        <div class="col-md-4 col-lg-4">
          <h2 class="footer-title">Contact</h2>
          <ul class="footer-links">
            <li><i class="bi bi-person" aria-hidden="true"></i>Issac Briding, Owner</li>
            <li><a href="tel:9082721955"><i class="bi bi-telephone" aria-hidden="true"></i>9082721955</a></li>
            <li><a href="mailto:dynamiclogisticsshipping@gmail.com"><i class="bi bi-envelope" aria-hidden="true"></i>dynamiclogisticsshipping@gmail.com</a></li>
            <li><i class="bi bi-geo-alt" aria-hidden="true"></i>NBC Complex, CBD Belapur, Navi Mumbai – 400614</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; <span id="year">2026</span> Dynamic Logistics. All rights reserved.</span>
        <a href="admin-login.html" class="footer-admin-link">Admin</a>
      </div>
    </div>
  </footer>

  <button type="button" id="backToTop" aria-label="Back to top"><i class="bi bi-arrow-up" aria-hidden="true"></i></button>

  <!-- Bootstrap 5 JavaScript (opens and closes the phone menu) -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <!-- Our own JavaScript -->
  <script src="js/script.js"></script>
</body>
</html>
```

### 6.2  `dynamic-logistics/about.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About Us | Dynamic Logistics</title>
  <meta name="description" content="About Dynamic Logistics, CBD Belapur, Navi Mumbai — owned by Issac Briding, offering customs clearance and transportation services.">

  <!-- Phone browser bar colour + app details for "Add to Home screen" -->
  <meta name="theme-color" content="#10243a">
  <link rel="manifest" href="manifest.json">
  <link rel="icon" href="images/logo.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="images/icon-192.png">

  <!-- Preview text when the link is shared on WhatsApp, etc. -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Dynamic Logistics">
  <meta property="og:title" content="About Us | Dynamic Logistics">
  <meta property="og:description" content="About Dynamic Logistics, CBD Belapur, Navi Mumbai — owned by Issac Briding, offering customs clearance and transportation services.">

  <!-- Tells style.css that JavaScript is on, so scroll animations can be used -->
  <script>document.documentElement.classList.add("js");</script>

  <!-- Inter font (needs internet; falls back to the phone's normal font) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet">

  <!-- Bootstrap 5 + Bootstrap Icons (need internet) -->
  <link rel="preconnect" href="https://cdn.jsdelivr.net">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
  <!-- Our own styles (must come AFTER Bootstrap) -->
  <link href="css/style.css" rel="stylesheet">
</head>
<body>

  <!-- Keyboard users can jump straight past the menu -->
  <a class="skip-link" href="#main-content">Skip to main content</a>

  <!-- ================= HEADER + NAVIGATION ================= -->
  <nav class="navbar navbar-expand-lg navbar-dark navbar-custom sticky-top" aria-label="Main">
    <div class="container">
      <a class="navbar-brand" href="index.html" aria-label="Dynamic Logistics – home">
        <img src="images/logo.svg" alt="" width="42" height="42">
        <span class="brand-text">
          <span class="brand-name">DYNAMIC</span>
          <span class="brand-tagline">Logistics</span>
        </span>
      </a>

      <!-- Call button stays visible on phones (icon only) next to the menu button -->
      <div class="d-flex align-items-center gap-2 ms-auto ms-lg-3 order-lg-last">
        <a href="tel:9082721955" class="btn btn-amber btn-call" aria-label="Call Us: 9082721955">
          <i class="bi bi-telephone-fill" aria-hidden="true"></i><span class="d-none d-sm-inline">Call&nbsp;Us</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainMenu"
          aria-controls="mainMenu" aria-expanded="false" aria-label="Open menu">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>

      <div class="collapse navbar-collapse" id="mainMenu">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
          <li class="nav-item"><a class="nav-link active" aria-current="page" href="about.html">About Us</a></li>
          <li class="nav-item"><a class="nav-link" href="services.html">Services</a></li>
          <li class="nav-item"><a class="nav-link" href="contact.html">Contact Us</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- ================= PAGE BANNER ================= -->
  <header class="page-banner">
    <div class="container">
      <h1>About Us</h1>
      <p class="banner-text">A Navi Mumbai logistics business supporting customs clearance and transportation requirements.</p>
      <nav aria-label="Breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="index.html">Home</a></li>
          <li class="breadcrumb-item active" aria-current="page">About Us</li>
        </ol>
      </nav>
    </div>
  </header>

  <main id="main-content" tabindex="-1">

    <!-- ================= WHO WE ARE ================= -->
    <!-- NOTE: Only confirmed facts are used here (company, owner, services, visiting-card address).
         Ask the company for any history before adding it. -->
    <section class="section" aria-labelledby="whoTitle">
      <div class="container">
        <div class="row align-items-center g-4 g-lg-5">
          <div class="col-lg-6 reveal">
            <span class="eyebrow">Who we are</span>
            <h2 class="section-title" id="whoTitle">Dynamic Logistics</h2>
            <p>
              Dynamic Logistics is a logistics business based in CBD Belapur, Navi Mumbai, Maharashtra,
              owned by <strong>Issac Briding</strong>.
            </p>
            <p>
              We support businesses with <a href="services.html#customs-clearance">customs clearance</a> —
              assisting with clearance procedures and the documentation goods need to move through
              customs — and with <a href="services.html#transportation">transportation services</a> that
              help coordinate the movement of goods from one location to another.
            </p>
            <p class="mb-0">
              Our office is at Office No. 407, NBC Complex, Sector 11, Plot No. 43, CBD, Belapur,
              Navi Mumbai – 400614, where customers are welcome to discuss their requirements in person.
            </p>
          </div>
          <div class="col-lg-6 reveal delay-1">
            <div class="media-frame">
              <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=70&amp;w=1000" srcset="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=70&amp;w=640 640w, https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=70&amp;w=1000 1000w, https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=70&amp;w=1600 1600w" sizes="(min-width: 992px) 50vw, 100vw" data-fallback="images/fallback-containers.svg" alt="Stacked shipping containers at a port" width="1200" height="900" loading="lazy" decoding="async">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= OUR APPROACH ================= -->
    <section class="section bg-light-grey" aria-labelledby="approachTitle">
      <div class="container">
        <div class="section-head text-center reveal">
          <span class="eyebrow">How we work</span>
          <h2 class="section-title" id="approachTitle">Our Approach to Logistics Coordination</h2>
          <p class="section-subtitle">Clear communication and organised paperwork, so your goods can keep moving.</p>
        </div>
        <div class="row g-4">
          <div class="col-md-4 reveal">
            <div class="card service-card feature-card">
              <div class="card-body">
                <div class="service-icon"><i class="bi bi-person-check" aria-hidden="true"></i></div>
                <h3>Direct Communication</h3>
                <p>You speak with the owner directly, rather than through a call centre.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4 reveal delay-1">
            <div class="card service-card feature-card">
              <div class="card-body">
                <div class="service-icon"><i class="bi bi-folder-check" aria-hidden="true"></i></div>
                <h3>Organised Documentation</h3>
                <p>We help you understand and organise the documents your shipment needs for customs clearance.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4 reveal delay-2">
            <div class="card service-card feature-card">
              <div class="card-body">
                <div class="service-icon"><i class="bi bi-arrow-left-right" aria-hidden="true"></i></div>
                <h3>Coordinated Movement</h3>
                <p>When you need both services, clearance and transportation are coordinated together.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= OUR SERVICES + OWNER ================= -->
    <section class="section" aria-labelledby="aboutServicesTitle">
      <div class="container">
        <div class="row g-4 g-lg-5 align-items-stretch">
          <div class="col-lg-7 reveal">
            <span class="eyebrow">Services</span>
            <h2 class="section-title" id="aboutServicesTitle">What We Offer</h2>
            <div class="row g-3">
              <div class="col-sm-6">
                <div class="card service-card">
                  <div class="card-body p-4">
                    <div class="service-icon"><i class="bi bi-file-earmark-check" aria-hidden="true"></i></div>
                    <h3>Customs Clearance</h3>
                    <p>Help with customs clearance procedures and documentation.</p>
                    <div class="card-actions"><a href="services.html#customs-clearance" class="card-link-enquire">Learn more <i class="bi bi-arrow-right" aria-hidden="true"></i></a></div>
                  </div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="card service-card">
                  <div class="card-body p-4">
                    <div class="service-icon"><i class="bi bi-truck" aria-hidden="true"></i></div>
                    <h3>Transportation Services</h3>
                    <p>Coordination of goods movement from one location to another.</p>
                    <div class="card-actions"><a href="services.html#transportation" class="card-link-enquire">Learn more <i class="bi bi-arrow-right" aria-hidden="true"></i></a></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-5 reveal delay-1">
            <div class="owner-card">
              <span class="eyebrow">Business contact</span>
              <h2 class="owner-name" id="ownerName">Issac Briding</h2>
              <p class="owner-role">Owner, Dynamic Logistics</p>
              <ul class="info-list">
                <li><i class="bi bi-telephone" aria-hidden="true"></i><a href="tel:9082721955">9082721955</a></li>
                <li><i class="bi bi-envelope" aria-hidden="true"></i><a href="mailto:dynamiclogisticsshipping@gmail.com">dynamiclogisticsshipping@gmail.com</a></li>
                <li><i class="bi bi-geo-alt" aria-hidden="true"></i><span>NBC Complex, Sector 11, CBD Belapur, Navi Mumbai</span></li>
              </ul>
              <div class="d-flex flex-column flex-sm-row gap-2">
                <a href="tel:9082721955" class="btn btn-navy"><i class="bi bi-telephone-fill" aria-hidden="true"></i>Call</a>
                <a href="contact.html#enquiry" class="btn btn-outline-navy"><i class="bi bi-send" aria-hidden="true"></i>Send an Enquiry</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= CONTACT PANEL ================= -->
    <section class="section pt-0" aria-labelledby="contactPanelTitle">
      <div class="container">
        <div class="contact-panel reveal">
          <div class="row align-items-center g-4">
            <div class="col-lg-7">
              <h2 id="contactPanelTitle">Need Help With Your Logistics Requirements?</h2>
              <p>Speak with the owner about customs clearance or transportation for your goods.</p>
              <p class="panel-contact">
                Issac Briding, Owner &middot; <a href="tel:9082721955">9082721955</a>
              </p>
            </div>
            <div class="col-lg-5 d-flex flex-column flex-sm-row justify-content-lg-end gap-2">
              <a href="tel:9082721955" class="btn btn-amber btn-lg"><i class="bi bi-telephone-fill" aria-hidden="true"></i>Call&nbsp;Now</a>
              <a href="contact.html#enquiry" class="btn btn-outline-light btn-lg"><i class="bi bi-send" aria-hidden="true"></i>Send an Enquiry</a>
            </div>
          </div>
        </div>
      </div>
    </section>

  </main>

  <!-- ================= FOOTER ================= -->
  <footer class="site-footer">
    <div class="container">
      <div class="row g-4 g-lg-5">
        <div class="col-lg-4">
          <p class="footer-brand"><img src="images/logo.svg" alt="" width="36" height="36">Dynamic Logistics</p>
          <p class="footer-about">Customs clearance and transportation services from our office in CBD Belapur, Navi Mumbai.</p>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
          <h2 class="footer-title">Company</h2>
          <ul class="footer-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="contact.html">Contact Us</a></li>
          </ul>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
          <h2 class="footer-title">Services</h2>
          <ul class="footer-links">
            <li><a href="services.html#customs-clearance">Customs Clearance</a></li>
            <li><a href="services.html#transportation">Transportation Services</a></li>
            <li><a href="contact.html#enquiry">Send an Enquiry</a></li>
          </ul>
        </div>
        <div class="col-md-4 col-lg-4">
          <h2 class="footer-title">Contact</h2>
          <ul class="footer-links">
            <li><i class="bi bi-person" aria-hidden="true"></i>Issac Briding, Owner</li>
            <li><a href="tel:9082721955"><i class="bi bi-telephone" aria-hidden="true"></i>9082721955</a></li>
            <li><a href="mailto:dynamiclogisticsshipping@gmail.com"><i class="bi bi-envelope" aria-hidden="true"></i>dynamiclogisticsshipping@gmail.com</a></li>
            <li><i class="bi bi-geo-alt" aria-hidden="true"></i>NBC Complex, CBD Belapur, Navi Mumbai – 400614</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; <span id="year">2026</span> Dynamic Logistics. All rights reserved.</span>
        <a href="admin-login.html" class="footer-admin-link">Admin</a>
      </div>
    </div>
  </footer>

  <button type="button" id="backToTop" aria-label="Back to top"><i class="bi bi-arrow-up" aria-hidden="true"></i></button>

  <!-- Bootstrap 5 JavaScript (opens and closes the phone menu) -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <!-- Our own JavaScript -->
  <script src="js/script.js"></script>
</body>
</html>
```

### 6.3  `dynamic-logistics/services.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Services | Customs Clearance &amp; Transportation | Dynamic Logistics</title>
  <meta name="description" content="Customs clearance and transportation services from Dynamic Logistics, CBD Belapur, Navi Mumbai. Call Issac Briding, Owner, on 9082721955.">

  <!-- Phone browser bar colour + app details for "Add to Home screen" -->
  <meta name="theme-color" content="#10243a">
  <link rel="manifest" href="manifest.json">
  <link rel="icon" href="images/logo.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="images/icon-192.png">

  <!-- Preview text when the link is shared on WhatsApp, etc. -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Dynamic Logistics">
  <meta property="og:title" content="Services | Customs Clearance &amp; Transportation | Dynamic Logistics">
  <meta property="og:description" content="Customs clearance and transportation services from Dynamic Logistics, CBD Belapur, Navi Mumbai. Call Issac Briding, Owner, on 9082721955.">

  <!-- Tells style.css that JavaScript is on, so scroll animations can be used -->
  <script>document.documentElement.classList.add("js");</script>

  <!-- Inter font (needs internet; falls back to the phone's normal font) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet">

  <!-- Bootstrap 5 + Bootstrap Icons (need internet) -->
  <link rel="preconnect" href="https://cdn.jsdelivr.net">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
  <!-- Our own styles (must come AFTER Bootstrap) -->
  <link href="css/style.css" rel="stylesheet">
</head>
<body>

  <!-- Keyboard users can jump straight past the menu -->
  <a class="skip-link" href="#main-content">Skip to main content</a>

  <!-- ================= HEADER + NAVIGATION ================= -->
  <nav class="navbar navbar-expand-lg navbar-dark navbar-custom sticky-top" aria-label="Main">
    <div class="container">
      <a class="navbar-brand" href="index.html" aria-label="Dynamic Logistics – home">
        <img src="images/logo.svg" alt="" width="42" height="42">
        <span class="brand-text">
          <span class="brand-name">DYNAMIC</span>
          <span class="brand-tagline">Logistics</span>
        </span>
      </a>

      <!-- Call button stays visible on phones (icon only) next to the menu button -->
      <div class="d-flex align-items-center gap-2 ms-auto ms-lg-3 order-lg-last">
        <a href="tel:9082721955" class="btn btn-amber btn-call" aria-label="Call Us: 9082721955">
          <i class="bi bi-telephone-fill" aria-hidden="true"></i><span class="d-none d-sm-inline">Call&nbsp;Us</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainMenu"
          aria-controls="mainMenu" aria-expanded="false" aria-label="Open menu">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>

      <div class="collapse navbar-collapse" id="mainMenu">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="about.html">About Us</a></li>
          <li class="nav-item"><a class="nav-link active" aria-current="page" href="services.html">Services</a></li>
          <li class="nav-item"><a class="nav-link" href="contact.html">Contact Us</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- ================= PAGE BANNER ================= -->
  <header class="page-banner">
    <div class="container">
      <h1>Our Services</h1>
      <p class="banner-text">Customs clearance and transportation support, with a clear path from enquiry to contact.</p>
      <nav aria-label="Breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="index.html">Home</a></li>
          <li class="breadcrumb-item active" aria-current="page">Our Services</li>
        </ol>
      </nav>
    </div>
  </header>

  <main id="main-content" tabindex="-1">

    <!-- ================= MAIN SERVICES (confirmed by the owner) ================= -->
    <!-- If you rename a service, also update the dropdown in contact.html,
         SERVICE_NAMES in js/admin.js and the list in firestore.rules. -->
    <section class="section" aria-label="Main services">
      <div class="container">
        <article class="row align-items-center g-4 g-lg-5 service-detail" id="customs-clearance" aria-labelledby="customs-clearance-title">
          <div class="col-lg-6 reveal">
            <div class="service-icon"><i class="bi bi-file-earmark-check" aria-hidden="true"></i></div>
            <h2 id="customs-clearance-title">Customs Clearance</h2>
            <p class="detail-lead">We assist with customs clearance procedures and the documentation required for the movement of goods through customs, helping customers coordinate the clearance process.</p>
            <h3 class="detail-label">How we can help</h3>
            <ul class="check-list mb-4">
              <li><i class="bi bi-check-circle-fill" aria-hidden="true"></i>Guidance on the documents your goods need for clearance</li>
              <li><i class="bi bi-check-circle-fill" aria-hidden="true"></i>Help preparing and organising clearance documentation</li>
              <li><i class="bi bi-check-circle-fill" aria-hidden="true"></i>Coordination through the customs clearance procedure</li>
              <li><i class="bi bi-check-circle-fill" aria-hidden="true"></i>One direct point of contact: the owner, Issac Briding</li>
            </ul>
            <div class="d-flex flex-column flex-sm-row gap-2">
              <a href="contact.html?service=customs-clearance#enquiry" class="btn btn-amber">Enquire Now<span class="visually-hidden"> about customs clearance</span> <i class="bi bi-arrow-right" aria-hidden="true"></i></a>
              <a href="tel:9082721955" class="btn btn-outline-navy"><i class="bi bi-telephone" aria-hidden="true"></i>Call&nbsp;9082721955</a>
            </div>
          </div>
          <div class="col-lg-6 reveal delay-1">
            <div class="media-frame">
              <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=70&amp;w=1000" srcset="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=70&amp;w=640 640w, https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=70&amp;w=1000 1000w, https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=70&amp;w=1600 1600w" sizes="(min-width: 992px) 50vw, 100vw" data-fallback="images/fallback-containers.svg" alt="Stacked shipping containers waiting at a port" width="1200" height="900" loading="lazy" decoding="async">
            </div>
          </div>
        </article>

        <article class="row align-items-center g-4 g-lg-5 service-detail" id="transportation" aria-labelledby="transportation-title">
          <div class="col-lg-6 order-lg-2 reveal">
            <div class="service-icon"><i class="bi bi-truck" aria-hidden="true"></i></div>
            <h2 id="transportation-title">Transportation Services</h2>
            <p class="detail-lead">We support the coordination of goods transportation from one location to another, helping businesses manage their shipment movement and logistics requirements.</p>
            <h3 class="detail-label">How we can help</h3>
            <ul class="check-list mb-4">
              <li><i class="bi bi-check-circle-fill" aria-hidden="true"></i>Coordinating the movement of goods between locations</li>
              <li><i class="bi bi-check-circle-fill" aria-hidden="true"></i>Arrangements planned around your pickup and delivery requirements</li>
              <li><i class="bi bi-check-circle-fill" aria-hidden="true"></i>Support alongside customs clearance when you need both</li>
              <li><i class="bi bi-check-circle-fill" aria-hidden="true"></i>Direct communication with the owner</li>
            </ul>
            <div class="d-flex flex-column flex-sm-row gap-2">
              <a href="contact.html?service=transportation#enquiry" class="btn btn-amber">Enquire Now<span class="visually-hidden"> about transportation services</span> <i class="bi bi-arrow-right" aria-hidden="true"></i></a>
              <a href="tel:9082721955" class="btn btn-outline-navy"><i class="bi bi-telephone" aria-hidden="true"></i>Call&nbsp;9082721955</a>
            </div>
          </div>
          <div class="col-lg-6 order-lg-1 reveal delay-1">
            <div class="media-frame">
              <img src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=70&amp;w=1000" srcset="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=70&amp;w=640 640w, https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=70&amp;w=1000 1000w, https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=70&amp;w=1600 1600w" sizes="(min-width: 992px) 50vw, 100vw" data-fallback="images/fallback-containers.svg" alt="Aerial view of a busy container terminal" width="1200" height="900" loading="lazy" decoding="async">
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- ================= OTHER SHIPPING ENQUIRIES ================= -->
    <!-- NOTE: These service areas come from the earlier version of the site and have NOT been
         confirmed by the owner. Confirm them with Mr. Issac Briding and edit or remove as needed. -->
    <section class="section bg-light-grey" aria-labelledby="otherTitle">
      <div class="container">
        <div class="section-head text-center reveal">
          <span class="eyebrow">Other enquiries</span>
          <h2 class="section-title" id="otherTitle">Other Shipping Enquiries</h2>
          <p class="section-subtitle">You can also contact us to discuss these shipping requirements.</p>
        </div>
        <div class="row g-4">
          <div class="col-sm-6 col-lg-3 reveal">
            <div class="card service-card">
              <div class="card-body p-4">
                <div class="service-icon"><i class="bi bi-water" aria-hidden="true"></i></div>
                <h3>Sea Shipping</h3>
                <p>Enquiries about sending cargo by sea.</p>
                <div class="card-actions">
                  <a href="contact.html?service=sea-shipping#enquiry" class="card-link-enquire">Enquire <i class="bi bi-arrow-right" aria-hidden="true"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-3 reveal delay-1">
            <div class="card service-card">
              <div class="card-body p-4">
                <div class="service-icon"><i class="bi bi-boxes" aria-hidden="true"></i></div>
                <h3>Container Cargo</h3>
                <p>Enquiries about shipments that move in containers.</p>
                <div class="card-actions">
                  <a href="contact.html?service=container-cargo#enquiry" class="card-link-enquire">Enquire <i class="bi bi-arrow-right" aria-hidden="true"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-3 reveal delay-2">
            <div class="card service-card">
              <div class="card-body p-4">
                <div class="service-icon"><i class="bi bi-signpost-split" aria-hidden="true"></i></div>
                <h3>Logistics Planning</h3>
                <p>Planning the route and steps for moving your goods.</p>
                <div class="card-actions">
                  <a href="contact.html?service=logistics-planning#enquiry" class="card-link-enquire">Enquire <i class="bi bi-arrow-right" aria-hidden="true"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-3 reveal delay-3">
            <div class="card service-card">
              <div class="card-body p-4">
                <div class="service-icon"><i class="bi bi-box-seam" aria-hidden="true"></i></div>
                <h3>Cargo Handling</h3>
                <p>Coordination for packed goods before and after shipping.</p>
                <div class="card-actions">
                  <a href="contact.html?service=cargo-handling#enquiry" class="card-link-enquire">Enquire <i class="bi bi-arrow-right" aria-hidden="true"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= SERVICE PROCESS ================= -->
    <section class="section " aria-labelledby="processTitle">
      <div class="container">
        <div class="section-head text-center reveal">
          <span class="eyebrow">How it works</span>
          <h2 class="section-title" id="processTitle">Our Service Process</h2>
          <p class="section-subtitle">A simple outline of how we work with you, from your first enquiry onwards.</p>
        </div>
        <ol class="process">
          <li class="process-step reveal">
            <span class="process-num" aria-hidden="true">1</span>
            <h3>Enquiry</h3>
            <p>You share your logistics requirements by phone, email or the enquiry form.</p>
          </li>
          <li class="process-step reveal delay-1">
            <span class="process-num" aria-hidden="true">2</span>
            <h3>Documentation &amp; Clearance</h3>
            <p>The documents and customs procedures your goods need are coordinated.</p>
          </li>
          <li class="process-step reveal delay-2">
            <span class="process-num" aria-hidden="true">3</span>
            <h3>Transportation</h3>
            <p>Transportation arrangements for moving your goods are coordinated.</p>
          </li>
          <li class="process-step reveal delay-3">
            <span class="process-num" aria-hidden="true">4</span>
            <h3>Completion</h3>
            <p>The agreed service process is completed.</p>
          </li>
        </ol>
        <p class="process-note text-center mb-0">This is a general outline. The exact steps depend on each shipment and the services you need.</p>
      </div>
    </section>

    <!-- ================= CONTACT PANEL ================= -->
    <section class="section pt-0" aria-labelledby="contactPanelTitle">
      <div class="container">
        <div class="contact-panel reveal">
          <div class="row align-items-center g-4">
            <div class="col-lg-7">
              <h2 id="contactPanelTitle">Have a Shipment to Discuss?</h2>
              <p>Tell us what you are moving and where, and discuss customs clearance and transportation directly with the owner.</p>
              <p class="panel-contact">
                Issac Briding, Owner &middot; <a href="tel:9082721955">9082721955</a>
              </p>
            </div>
            <div class="col-lg-5 d-flex flex-column flex-sm-row justify-content-lg-end gap-2">
              <a href="tel:9082721955" class="btn btn-amber btn-lg"><i class="bi bi-telephone-fill" aria-hidden="true"></i>Call&nbsp;Now</a>
              <a href="contact.html#enquiry" class="btn btn-outline-light btn-lg"><i class="bi bi-send" aria-hidden="true"></i>Send an Enquiry</a>
            </div>
          </div>
        </div>
      </div>
    </section>

  </main>

  <!-- ================= FOOTER ================= -->
  <footer class="site-footer">
    <div class="container">
      <div class="row g-4 g-lg-5">
        <div class="col-lg-4">
          <p class="footer-brand"><img src="images/logo.svg" alt="" width="36" height="36">Dynamic Logistics</p>
          <p class="footer-about">Customs clearance and transportation services from our office in CBD Belapur, Navi Mumbai.</p>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
          <h2 class="footer-title">Company</h2>
          <ul class="footer-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="contact.html">Contact Us</a></li>
          </ul>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
          <h2 class="footer-title">Services</h2>
          <ul class="footer-links">
            <li><a href="services.html#customs-clearance">Customs Clearance</a></li>
            <li><a href="services.html#transportation">Transportation Services</a></li>
            <li><a href="contact.html#enquiry">Send an Enquiry</a></li>
          </ul>
        </div>
        <div class="col-md-4 col-lg-4">
          <h2 class="footer-title">Contact</h2>
          <ul class="footer-links">
            <li><i class="bi bi-person" aria-hidden="true"></i>Issac Briding, Owner</li>
            <li><a href="tel:9082721955"><i class="bi bi-telephone" aria-hidden="true"></i>9082721955</a></li>
            <li><a href="mailto:dynamiclogisticsshipping@gmail.com"><i class="bi bi-envelope" aria-hidden="true"></i>dynamiclogisticsshipping@gmail.com</a></li>
            <li><i class="bi bi-geo-alt" aria-hidden="true"></i>NBC Complex, CBD Belapur, Navi Mumbai – 400614</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; <span id="year">2026</span> Dynamic Logistics. All rights reserved.</span>
        <a href="admin-login.html" class="footer-admin-link">Admin</a>
      </div>
    </div>
  </footer>

  <button type="button" id="backToTop" aria-label="Back to top"><i class="bi bi-arrow-up" aria-hidden="true"></i></button>

  <!-- Bootstrap 5 JavaScript (opens and closes the phone menu) -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <!-- Our own JavaScript -->
  <script src="js/script.js"></script>
</body>
</html>
```

### 6.4  `dynamic-logistics/contact.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Us | Dynamic Logistics</title>
  <meta name="description" content="Contact Dynamic Logistics, CBD Belapur, Navi Mumbai. Owner: Issac Briding, phone 9082721955.">

  <!-- Phone browser bar colour + app details for "Add to Home screen" -->
  <meta name="theme-color" content="#10243a">
  <link rel="manifest" href="manifest.json">
  <link rel="icon" href="images/logo.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="images/icon-192.png">

  <!-- Preview text when the link is shared on WhatsApp, etc. -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Dynamic Logistics">
  <meta property="og:title" content="Contact Us | Dynamic Logistics">
  <meta property="og:description" content="Contact Dynamic Logistics, CBD Belapur, Navi Mumbai. Owner: Issac Briding, phone 9082721955.">

  <!-- Tells style.css that JavaScript is on, so scroll animations can be used -->
  <script>document.documentElement.classList.add("js");</script>

  <!-- Inter font (needs internet; falls back to the phone's normal font) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet">

  <!-- Bootstrap 5 + Bootstrap Icons (need internet) -->
  <link rel="preconnect" href="https://cdn.jsdelivr.net">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
  <!-- Our own styles (must come AFTER Bootstrap) -->
  <link href="css/style.css" rel="stylesheet">
</head>
<body>

  <!-- Keyboard users can jump straight past the menu -->
  <a class="skip-link" href="#main-content">Skip to main content</a>

  <!-- ================= HEADER + NAVIGATION ================= -->
  <nav class="navbar navbar-expand-lg navbar-dark navbar-custom sticky-top" aria-label="Main">
    <div class="container">
      <a class="navbar-brand" href="index.html" aria-label="Dynamic Logistics – home">
        <img src="images/logo.svg" alt="" width="42" height="42">
        <span class="brand-text">
          <span class="brand-name">DYNAMIC</span>
          <span class="brand-tagline">Logistics</span>
        </span>
      </a>

      <!-- Call button stays visible on phones (icon only) next to the menu button -->
      <div class="d-flex align-items-center gap-2 ms-auto ms-lg-3 order-lg-last">
        <a href="tel:9082721955" class="btn btn-amber btn-call" aria-label="Call Us: 9082721955">
          <i class="bi bi-telephone-fill" aria-hidden="true"></i><span class="d-none d-sm-inline">Call&nbsp;Us</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainMenu"
          aria-controls="mainMenu" aria-expanded="false" aria-label="Open menu">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>

      <div class="collapse navbar-collapse" id="mainMenu">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="about.html">About Us</a></li>
          <li class="nav-item"><a class="nav-link" href="services.html">Services</a></li>
          <li class="nav-item"><a class="nav-link active" aria-current="page" href="contact.html">Contact Us</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- ================= PAGE BANNER ================= -->
  <header class="page-banner">
    <div class="container">
      <h1>Contact Us</h1>
      <p class="banner-text">Call the owner directly or send an enquiry about customs clearance, transportation or any other shipment.</p>
      <nav aria-label="Breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="index.html">Home</a></li>
          <li class="breadcrumb-item active" aria-current="page">Contact Us</li>
        </ol>
      </nav>
    </div>
  </header>

  <main id="main-content" tabindex="-1">

    <!-- ================= CONTACT DETAILS + FORM ================= -->
    <section class="section bg-light-grey">
      <div class="container">
        <div class="row g-4">

          <!-- Left: business contact details -->
          <div class="col-lg-5 reveal">
            <div class="contact-info-card">
              <h2 class="mb-2">Get in Touch</h2>
              <p class="contact-intro mb-4">
                Call the owner directly about customs clearance, transportation or any other shipment enquiry.
              </p>

              <div class="contact-item">
                <i class="bi bi-person-badge" aria-hidden="true"></i>
                <div>
                  <small>Owner</small>
                  Issac Briding
                </div>
              </div>

              <div class="contact-item">
                <i class="bi bi-telephone-fill" aria-hidden="true"></i>
                <div>
                  <small>Phone</small>
                  <a href="tel:9082721955">9082721955</a>
                </div>
              </div>

              <div class="contact-item">
                <i class="bi bi-envelope-fill" aria-hidden="true"></i>
                <div>
                  <small>Email</small>
                  <a href="mailto:dynamiclogisticsshipping@gmail.com">dynamiclogisticsshipping@gmail.com</a>
                </div>
              </div>

              <div class="contact-item">
                <i class="bi bi-geo-alt-fill" aria-hidden="true"></i>
                <div>
                  <small>Office Address</small>
                  Office No. 407, NBC Complex, Sector 11, Plot No. 43, CBD, Belapur, Navi Mumbai, Maharashtra – 400614.
                </div>
              </div>

              <div class="d-grid gap-2 mt-4">
                <a href="tel:9082721955" class="btn btn-amber"><i class="bi bi-telephone-fill" aria-hidden="true"></i>Call&nbsp;Now</a>
                <a href="mailto:dynamiclogisticsshipping@gmail.com" class="btn btn-outline-light"><i class="bi bi-envelope" aria-hidden="true"></i>Send Email</a>
                <a href="https://www.google.com/maps/search/?api=1&amp;query=NBC+Complex+Sector+11+CBD+Belapur+Navi+Mumbai+400614"
                  target="_blank" rel="noopener" class="btn btn-outline-light">
                  <i class="bi bi-map" aria-hidden="true"></i>Open in Google Maps
                </a>
              </div>
            </div>
          </div>

          <!-- Right: enquiry form (saved to Firebase when it is set up) -->
          <div class="col-lg-7 reveal delay-1">
            <div class="form-card" id="enquiry">
              <h2 class="section-title">Send an Enquiry</h2>
              <p class="text-muted mb-4">Fields marked <span class="required-mark">*</span> are required.</p>

              <!-- 1. Shown when the enquiry was saved -->
              <div id="formSuccess" class="alert alert-success d-none" role="status" tabindex="-1">
                <h3 class="h6 alert-heading mb-1"><i class="bi bi-check-circle-fill" aria-hidden="true"></i> Thank you, <span class="success-name"></span>!</h3>
                <p class="mb-0">
                  Your enquiry has been received. We will contact you by phone or email.
                  For urgent shipments, please call <a href="tel:9082721955">9082721955</a>.
                </p>
              </div>

              <!-- 2. Shown only while Firebase is NOT set up (nothing is saved) -->
              <div id="formDemo" class="alert alert-info d-none" role="status" tabindex="-1">
                <h3 class="h6 alert-heading mb-1"><i class="bi bi-info-circle-fill" aria-hidden="true"></i> Thank you, <span class="success-name"></span>!</h3>
                <p class="mb-0">
                  Your details are complete, but online enquiries are not connected yet, so this
                  message was <strong>not</strong> sent. Please call
                  <a href="tel:9082721955">9082721955</a> or email
                  <a href="mailto:dynamiclogisticsshipping@gmail.com">dynamiclogisticsshipping@gmail.com</a>.
                </p>
              </div>

              <!-- 3. Shown if sending failed (e.g. no internet) -->
              <div id="formError" class="alert alert-danger d-none" role="alert" tabindex="-1">
                <h3 class="h6 alert-heading mb-1"><i class="bi bi-exclamation-triangle-fill" aria-hidden="true"></i> Sorry, your enquiry could not be sent.</h3>
                <p class="mb-1" id="formErrorReason">Please check your internet connection and try again.</p>
                <p class="mb-0">
                  You can also call <a href="tel:9082721955">9082721955</a> or email
                  <a href="mailto:dynamiclogisticsshipping@gmail.com">dynamiclogisticsshipping@gmail.com</a>. Your typed details are still in the form.
                </p>
              </div>

              <!-- novalidate = we use our own JavaScript checks instead of the browser's.
                   maxlength values match the limits in firestore.rules. -->
              <form id="contactForm" novalidate>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label for="name" class="form-label">Full Name <span class="required-mark" aria-hidden="true">*</span></label>
                    <input type="text" class="form-control" id="name" name="name" maxlength="100" required
                      placeholder="Your name" autocomplete="name" aria-describedby="nameError">
                    <div class="invalid-feedback" id="nameError">Please enter your full name.</div>
                  </div>

                  <div class="col-md-6">
                    <label for="email" class="form-label">Email Address <span class="required-mark" aria-hidden="true">*</span></label>
                    <input type="email" class="form-control" id="email" name="email" maxlength="150" required
                      placeholder="name@example.com" autocomplete="email" inputmode="email" aria-describedby="emailError">
                    <div class="invalid-feedback" id="emailError">Please enter a valid email address.</div>
                  </div>

                  <div class="col-md-6">
                    <label for="phone" class="form-label">Phone Number <span class="required-mark" aria-hidden="true">*</span></label>
                    <input type="tel" class="form-control" id="phone" name="phone" maxlength="20" required
                      placeholder="+91 98765 43210" autocomplete="tel" inputmode="tel" aria-describedby="phoneError">
                    <div class="invalid-feedback" id="phoneError">Please enter a valid phone number.</div>
                  </div>

                  <div class="col-md-6">
                    <label for="service" class="form-label">Service Needed <span class="text-muted fw-normal">(optional)</span></label>
                    <!-- If you change these, also update SERVICE_NAMES in js/admin.js and firestore.rules -->
                    <select class="form-select" id="service" name="service">
                      <option value="">Choose a service</option>
                      <option value="customs-clearance">Customs Clearance</option>
                      <option value="transportation">Transportation Services</option>
                      <option value="sea-shipping">Sea Shipping</option>
                      <option value="container-cargo">Container Cargo</option>
                      <option value="logistics-planning">Logistics Planning</option>
                      <option value="cargo-handling">Cargo Handling</option>
                      <option value="other">Other / not sure</option>
                    </select>
                  </div>

                  <div class="col-12">
                    <label for="subject" class="form-label">Subject <span class="required-mark" aria-hidden="true">*</span></label>
                    <input type="text" class="form-control" id="subject" name="subject" maxlength="150" required
                      placeholder="e.g. Customs clearance enquiry" aria-describedby="subjectError">
                    <div class="invalid-feedback" id="subjectError">Please enter a subject.</div>
                  </div>

                  <div class="col-12">
                    <label for="message" class="form-label">Message <span class="required-mark" aria-hidden="true">*</span></label>
                    <textarea class="form-control" id="message" name="message" rows="5" maxlength="2000" required
                      placeholder="Tell us about your goods, origin and destination"
                      aria-describedby="messageError messageCount"></textarea>
                    <!-- The error must come straight after the box, or Bootstrap won't show it -->
                    <div class="invalid-feedback" id="messageError">Please enter your message.</div>
                    <div class="char-count text-end mt-1" id="messageCount">0 / 2000</div>
                  </div>

                  <!-- Spam trap: people never see this box; simple spam bots fill it in -->
                  <div class="hp-field" aria-hidden="true">
                    <label for="dlsTrap">Leave this field empty</label>
                    <input type="text" id="dlsTrap" name="dls_trap" tabindex="-1" autocomplete="off">
                  </div>

                  <div class="col-12">
                    <button type="submit" class="btn btn-navy btn-lg w-100" id="submitBtn">
                      <i class="bi bi-send-fill" aria-hidden="true"></i> Submit Enquiry
                    </button>
                    <p class="form-note mt-2 mb-0">
                      Your details are used only to reply to your enquiry.
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ================= OFFICE MAP ================= -->
    <!-- Google Maps embed (no API key needed, needs internet).
         If the pin is not exactly on the office, change the words after "q=". -->
    <section class="section" aria-labelledby="mapTitle">
      <div class="container">
        <div class="section-head text-center reveal">
          <span class="eyebrow">Visit us</span>
          <h2 class="section-title" id="mapTitle">Find Our Office</h2>
          <p class="section-subtitle">NBC Complex, Sector 11, CBD Belapur, Navi Mumbai – 400614</p>
        </div>
        <div class="map-card reveal">
          <iframe
            src="https://www.google.com/maps?q=NBC+Complex,+Sector+11,+CBD+Belapur,+Navi+Mumbai,+Maharashtra+400614&amp;output=embed"
            title="Map showing the Dynamic Logistics office at NBC Complex, CBD Belapur, Navi Mumbai"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen></iframe>
        </div>
        <p class="text-center small text-muted mt-3 mb-0">
          Map not showing?
          <a href="https://www.google.com/maps/search/?api=1&amp;query=NBC+Complex+Sector+11+CBD+Belapur+Navi+Mumbai+400614"
            target="_blank" rel="noopener">Open it in Google Maps</a>.
        </p>
      </div>
    </section>

  </main>

  <!-- ================= FOOTER ================= -->
  <footer class="site-footer">
    <div class="container">
      <div class="row g-4 g-lg-5">
        <div class="col-lg-4">
          <p class="footer-brand"><img src="images/logo.svg" alt="" width="36" height="36">Dynamic Logistics</p>
          <p class="footer-about">Customs clearance and transportation services from our office in CBD Belapur, Navi Mumbai.</p>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
          <h2 class="footer-title">Company</h2>
          <ul class="footer-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="contact.html">Contact Us</a></li>
          </ul>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
          <h2 class="footer-title">Services</h2>
          <ul class="footer-links">
            <li><a href="services.html#customs-clearance">Customs Clearance</a></li>
            <li><a href="services.html#transportation">Transportation Services</a></li>
            <li><a href="contact.html#enquiry">Send an Enquiry</a></li>
          </ul>
        </div>
        <div class="col-md-4 col-lg-4">
          <h2 class="footer-title">Contact</h2>
          <ul class="footer-links">
            <li><i class="bi bi-person" aria-hidden="true"></i>Issac Briding, Owner</li>
            <li><a href="tel:9082721955"><i class="bi bi-telephone" aria-hidden="true"></i>9082721955</a></li>
            <li><a href="mailto:dynamiclogisticsshipping@gmail.com"><i class="bi bi-envelope" aria-hidden="true"></i>dynamiclogisticsshipping@gmail.com</a></li>
            <li><i class="bi bi-geo-alt" aria-hidden="true"></i>NBC Complex, CBD Belapur, Navi Mumbai – 400614</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; <span id="year">2026</span> Dynamic Logistics. All rights reserved.</span>
        <a href="admin-login.html" class="footer-admin-link">Admin</a>
      </div>
    </div>
  </footer>

  <button type="button" id="backToTop" aria-label="Back to top"><i class="bi bi-arrow-up" aria-hidden="true"></i></button>

  <!-- Bootstrap 5 JavaScript (opens and closes the phone menu) -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <!-- Firebase: app + Firestore database ("compat" version works with normal script tags) -->
  <script src="https://www.gstatic.com/firebasejs/12.19.0/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore-compat.js"></script>
  <!-- Our Firebase settings (must come before script.js) -->
  <script src="js/firebase-config.js"></script>
  <!-- Our own JavaScript -->
  <script src="js/script.js"></script>
</body>
</html>
```

### 6.5  `dynamic-logistics/admin-login.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- Keep admin pages out of Google search results -->
  <meta name="robots" content="noindex, nofollow">
  <meta name="theme-color" content="#10243a">
  <title>Admin Login | Dynamic Logistics</title>

  <!-- Inter font (needs internet) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet">
  <!-- Bootstrap 5 + icons (need internet) -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
  <!-- Our styles: main site first, then admin extras -->
  <link href="css/style.css" rel="stylesheet">
  <link href="css/admin.css" rel="stylesheet">
  <link rel="icon" href="images/logo.svg" type="image/svg+xml">
</head>
<body>

  <main class="login-page">
    <div class="login-card">
      <img src="images/logo.svg" alt="" class="login-logo" width="72" height="72">
      <h1 class="h4 text-center mb-1">Admin Login</h1>
      <p class="text-center text-muted small mb-4">Dynamic Logistics</p>

      <!-- Shown when Firebase is not set up or did not load -->
      <div id="setupWarning" class="alert alert-warning d-none" role="alert"></div>

      <!-- Login error / info messages -->
      <div id="loginMessage" class="alert d-none" role="alert"></div>

      <form id="loginForm" novalidate>
        <div class="mb-3">
          <label for="loginEmail" class="form-label">Email</label>
          <input type="email" class="form-control" id="loginEmail" autocomplete="username" inputmode="email" placeholder="admin@example.com">
        </div>

        <div class="mb-2">
          <label for="loginPassword" class="form-label">Password</label>
          <div class="input-group">
            <input type="password" class="form-control" id="loginPassword" autocomplete="current-password" placeholder="Your password">
            <button class="btn password-toggle" type="button" id="togglePassword" aria-label="Show password" aria-pressed="false">
              <i class="bi bi-eye" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        <div class="text-end mb-3">
          <button type="button" class="btn btn-link p-0 small" id="forgotPassword">Forgot password?</button>
        </div>

        <button type="submit" class="btn btn-navy w-100" id="loginBtn">
          <i class="bi bi-box-arrow-in-right" aria-hidden="true"></i> Log In
        </button>
      </form>

      <p class="text-center mt-4 mb-0">
        <a href="index.html" class="small"><i class="bi bi-arrow-left" aria-hidden="true"></i> Back to website</a>
      </p>
    </div>
  </main>

  <!-- Bootstrap JS -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <!-- Firebase ("compat" version works with normal script tags) -->
  <script src="https://www.gstatic.com/firebasejs/12.19.0/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/12.19.0/firebase-auth-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore-compat.js"></script>
  <!-- Our Firebase settings, then the admin logic -->
  <script src="js/firebase-config.js"></script>
  <script src="js/admin.js"></script>
</body>
</html>
```

### 6.6  `dynamic-logistics/admin.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- Keep admin pages out of Google search results -->
  <meta name="robots" content="noindex, nofollow">
  <meta name="theme-color" content="#10243a">
  <title>Admin Dashboard | Dynamic Logistics</title>

  <!-- Inter font (needs internet) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet">
  <!-- Bootstrap 5 + icons (need internet) -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
  <!-- Our styles: main site first, then admin extras -->
  <link href="css/style.css" rel="stylesheet">
  <link href="css/admin.css" rel="stylesheet">
  <link rel="icon" href="images/logo.svg" type="image/svg+xml">
</head>
<!-- "checking-login" hides the dashboard until admin.js confirms the login -->
<body class="admin-body checking-login">

  <!-- ================= TOP BAR ================= -->
  <nav class="navbar navbar-dark navbar-custom sticky-top" aria-label="Admin">
    <div class="container">
      <a class="navbar-brand" href="admin.html">
        <img src="images/logo.svg" alt="Dynamic ship logo" width="44" height="44">
        <span class="brand-text">
          <span class="brand-name">DYNAMIC</span>
          <span class="brand-tagline">Admin Dashboard</span>
        </span>
      </a>
      <div class="d-flex align-items-center gap-2">
        <span class="admin-user d-none d-md-inline" id="adminEmail"></span>
        <button class="btn btn-outline-light btn-sm" id="logoutBtn" type="button">
          <i class="bi bi-box-arrow-right" aria-hidden="true"></i> Logout
        </button>
      </div>
    </div>
  </nav>

  <!-- Shown while checking the login -->
  <div class="container py-5 text-center" id="authLoading">
    <div class="spinner-border text-info" role="status"><span class="visually-hidden">Loading</span></div>
    <p class="mt-3 text-muted">Checking login...</p>
  </div>

  <main class="admin-main" id="main-content">
    <div class="container">

      <!-- Problems (setup, permission, connection) are shown here -->
      <div id="dashboardError" class="alert alert-danger d-none" role="alert"></div>

      <!-- ================= HEADER ================= -->
      <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <div>
          <h1 class="h4 mb-0">Customer Enquiries</h1>
          <p class="text-muted small mb-0">Updates live — new enquiries appear automatically.</p>
        </div>
        <a href="index.html" class="btn btn-sm btn-outline-dark" target="_blank" rel="noopener">
          <i class="bi bi-box-arrow-up-right" aria-hidden="true"></i> View website
        </a>
      </div>

      <!-- ================= NUMBER CARDS ================= -->
      <div class="row g-3 mb-3">
        <div class="col-6 col-md-3">
          <div class="stat-card stat-total">
            <div class="stat-number" id="countTotal">0</div>
            <div class="stat-label">Total</div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="stat-card stat-new">
            <div class="stat-number" id="countNew">0</div>
            <div class="stat-label">New</div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="stat-card stat-progress">
            <div class="stat-number" id="countProgress">0</div>
            <div class="stat-label">In progress</div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="stat-card stat-closed">
            <div class="stat-number" id="countClosed">0</div>
            <div class="stat-label">Closed</div>
          </div>
        </div>
      </div>

      <!-- ================= CHARTS (js/admin-charts.js) ================= -->
      <div class="row g-3 mb-3">

        <!-- Chart 1: enquiries per week / month -->
        <div class="col-lg-8">
          <section class="chart-card" aria-labelledby="trendTitle">
            <div class="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-2">
              <div>
                <h2 class="chart-title" id="trendTitle">Enquiries received</h2>
                <p class="chart-subtitle" id="trendSubtitle">Per week, last 8 weeks</p>
              </div>
              <div class="btn-group btn-group-sm" role="group" aria-label="Time range">
                <button type="button" class="btn btn-outline-secondary range-btn active" data-range="weeks" aria-pressed="true">8 weeks</button>
                <button type="button" class="btn btn-outline-secondary range-btn" data-range="months" aria-pressed="false">6 months</button>
              </div>
            </div>

            <p class="chart-headline mb-2">
              <span id="trendHeadline">0</span>
              <span class="chart-headline-label" id="trendHeadlineLabel">this week</span>
            </p>

            <div id="chartMessage" class="alert alert-warning small py-2 d-none" role="status"></div>

            <div class="chart-box">
              <canvas id="trendChart" role="img" aria-label="Column chart of enquiries received per period. The same numbers are in the table below."></canvas>
            </div>

            <details class="chart-table mt-2">
              <summary>View as table</summary>
              <table class="table table-sm mb-0 mt-2">
                <thead>
                  <tr><th id="trendTableHead" scope="col">Week starting</th><th class="text-end" scope="col">Enquiries</th></tr>
                </thead>
                <tbody id="trendTableBody"></tbody>
              </table>
            </details>
          </section>
        </div>

        <!-- Chart 2: status breakdown -->
        <div class="col-lg-4">
          <section class="chart-card" aria-labelledby="statusTitle">
            <h2 class="chart-title" id="statusTitle">Status breakdown</h2>
            <p class="chart-subtitle mb-3">Share of all enquiries</p>
            <div class="status-bar is-empty" id="statusBar" role="img" aria-label="No enquiries yet"></div>
            <ul class="chart-legend" id="statusLegend"></ul>
            <p class="chart-subtitle mb-0" id="statusSummary"></p>
          </section>
        </div>
      </div>

      <!-- ================= SEARCH + FILTERS ================= -->
      <div class="admin-toolbar mb-3">
        <div class="input-group mb-3">
          <span class="input-group-text"><i class="bi bi-search" aria-hidden="true"></i></span>
          <input type="search" class="form-control" id="searchBox" placeholder="Search name, email, phone, subject..." aria-label="Search enquiries">
        </div>
        <div class="d-flex flex-wrap gap-2 align-items-center">
          <button type="button" class="btn btn-outline-secondary filter-btn active" data-filter="all" aria-pressed="true">All</button>
          <button type="button" class="btn btn-outline-secondary filter-btn" data-filter="new" aria-pressed="false">New</button>
          <button type="button" class="btn btn-outline-secondary filter-btn" data-filter="in-progress" aria-pressed="false">In progress</button>
          <button type="button" class="btn btn-outline-secondary filter-btn" data-filter="closed" aria-pressed="false">Closed</button>
          <button type="button" class="btn btn-turquoise btn-sm ms-auto" id="exportBtn">
            <i class="bi bi-download" aria-hidden="true"></i> Export CSV
          </button>
        </div>
      </div>

      <!-- ================= ENQUIRY LIST ================= -->
      <p class="small text-muted mb-2" id="resultInfo" aria-live="polite"></p>
      <div id="enquiryList">
        <div class="empty-state">
          <div class="spinner-border text-info" role="status"><span class="visually-hidden">Loading</span></div>
          <p class="mt-3">Loading enquiries...</p>
        </div>
      </div>

    </div>
  </main>

  <!-- ================= DELETE CONFIRMATION BOX ================= -->
  <!-- Used instead of the browser's confirm(), which some in-app phone browsers block -->
  <div class="modal fade" id="confirmModal" tabindex="-1" role="dialog" aria-modal="true" aria-labelledby="confirmTitle">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title h5" id="confirmTitle">Delete enquiry?</h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p class="mb-0" id="confirmText"></p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-danger" id="confirmYes">
            <i class="bi bi-trash" aria-hidden="true"></i> Delete
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- ================= POP-UP MESSAGES (toasts) ================= -->
  <div class="toast-container position-fixed bottom-0 start-50 translate-middle-x p-3" id="toastArea" aria-live="polite"></div>

  <!-- Bootstrap JS -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <!-- Firebase ("compat" version works with normal script tags) -->
  <script src="https://www.gstatic.com/firebasejs/12.19.0/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/12.19.0/firebase-auth-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore-compat.js"></script>
  <!-- Chart.js for the dashboard chart (needs internet) -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.5.1/dist/chart.umd.min.js"></script>
  <!-- Our Firebase settings, the charts, then the admin logic -->
  <script src="js/firebase-config.js"></script>
  <script src="js/admin-charts.js"></script>
  <script src="js/admin.js"></script>
</body>
</html>
```

### 6.7  `dynamic-logistics/404.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex">
  <meta name="theme-color" content="#10243a">
  <title>Page Not Found | Dynamic Logistics</title>
  <!-- This page is shown by GitHub Pages for a wrong web address.
       Its styles are written here (not in css/style.css) because a wrong
       address can be in a different folder, where css/style.css can't be found. -->
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px 16px;
      box-sizing: border-box;
      font-family: "Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: linear-gradient(120deg, #0a1728 0%, #10243a 55%, #1e3a5f 100%);
      color: #ffffff;
      text-align: center;
    }
    main { max-width: 420px; }
    .code { font-size: 4.5rem; font-weight: 800; line-height: 1; margin: 0; color: #f5a623; }
    h1 { font-size: 1.5rem; margin: 12px 0 8px; }
    p { color: rgba(255, 255, 255, 0.88); line-height: 1.6; }
    a.btn {
      display: inline-block;
      margin: 8px 4px 0;
      padding: 12px 22px;
      border-radius: 8px;
      font-weight: 700;
      text-decoration: none;
      background: #f5a623;
      color: #10243a;
    }
    a.btn.outline { background: transparent; color: #ffffff; border: 2px solid rgba(255, 255, 255, 0.7); }
    a.btn:hover { background: #d98a0b; }
    a.btn.outline:hover { background: #ffffff; color: #10243a; }
    a.btn:focus-visible { outline: 3px solid #f5a623; outline-offset: 3px; }
  </style>
</head>
<body>
  <main>
    <p class="code" aria-hidden="true">404</p>
    <h1>Page not found</h1>
    <p>Sorry, this page doesn't exist. It may have been moved, or the address was typed wrongly.</p>
    <a class="btn" id="homeLink" href="index.html">Go to Home Page</a>
    <a class="btn outline" href="tel:9082721955">Call&nbsp;Us:&nbsp;9082721955</a>
  </main>
  <script>
    // On GitHub Pages project sites (yourname.github.io/repo-name/...),
    // send "Home" to the repo folder, wherever the wrong address was.
    (function () {
      var parts = window.location.pathname.split("/");
      if (window.location.hostname.indexOf("github.io") !== -1 && parts.length > 2 && parts[1]) {
        document.getElementById("homeLink").href = "/" + parts[1] + "/index.html";
      }
    })();
  </script>
</body>
</html>
```

### 6.8  `dynamic-logistics/manifest.json`

```json
{
  "name": "Dynamic Logistics",
  "short_name": "Dynamic",
  "description": "Customs clearance and transportation services — CBD Belapur, Navi Mumbai.",
  "start_url": "index.html",
  "scope": "./",
  "display": "standalone",
  "background_color": "#10243a",
  "theme_color": "#10243a",
  "icons": [
    {
      "src": "images/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "images/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

### 6.9  `dynamic-logistics/css/style.css`

```css
/* =========================================================
   Dynamic Logistics — Main stylesheet
   File: css/style.css
   Used by every page. Loaded AFTER Bootstrap 5 so our
   styles win. Admin pages also load css/admin.css.

   Design: premium corporate logistics — navy, white, amber.

   Sections
    1. Design tokens (colours, type, spacing)   11. Process steps
    2. Base styles + typography                 12. Contact panel (call-to-action)
    3. Accessibility helpers                    13. Contact page + form
    4. Header + navigation                      14. Office map
    5. Buttons                                  15. Footer
    6. Home hero                                16. Back-to-top button
    7. Inner-page banner                        17. Scroll animations
    8. Sections + headings                      18. Responsive adjustments
    9. Cards                                    19. Reduce-motion setting
   10. Media (images) + lists
   ========================================================= */

/* ---------- 1. Design tokens (change colours here only) ---------- */
:root {
  /* Brand colours */
  --navy: #10243a;          /* primary navy: header, headings, main buttons */
  --navy-deep: #0a1728;     /* footer, darkest panels */
  --blue: #1e3a5f;          /* secondary blue: links, hovers, gradients */
  --amber: #f5a623;         /* accent: key actions, icons, highlights (use sparingly) */
  --amber-hover: #d98a0b;   /* amber hover/pressed */
  --amber-soft: #fff4e0;    /* pale amber behind icons */
  --amber-text: #9a5b00;    /* darker amber for text/icons on light backgrounds (5.4:1 on white) */
  --white: #ffffff;
  --light-grey: #f5f7fa;    /* section backgrounds */
  --text: #172536;          /* body text */
  --muted: #64748b;         /* secondary text (4.8:1 on white) */
  --muted-on-grey: #586579; /* same role on the light-grey background, where #64748b would be 4.4:1 (below AA) */
  --line: #dce3eb;          /* borders */

  /* Semantic colours (accessible on white) */
  --success: #1e7a46;
  --warning: #8a5a00;
  --danger: #b42318;

  /* Older names still used by admin.css and admin pages — mapped to the new palette */
  --navy-light: var(--blue);
  --turquoise: var(--amber);
  --turquoise-soft: var(--amber-hover);
  --teal: var(--blue);

  /* Type, shape, depth */
  --font: "Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --radius: 10px;           /* cards, inputs, panels */
  --radius-sm: 8px;         /* buttons */
  --shadow-sm: 0 1px 2px rgba(16, 36, 58, 0.06), 0 2px 8px rgba(16, 36, 58, 0.05);
  --shadow-md: 0 6px 20px rgba(16, 36, 58, 0.10);
  --header-h: 76px;
}

/* ---------- 2. Base styles + typography ---------- */
html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font);
  color: var(--text);
  background-color: var(--white);
  line-height: 1.65;
  font-size: 1rem;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6 {
  color: var(--navy);
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.01em;
}

h3, .h5 {
  font-weight: 650;
}

p {
  max-width: 70ch; /* comfortable reading line length */
}

.text-center p {
  margin-left: auto;
  margin-right: auto;
}

a {
  color: var(--blue);
  text-underline-offset: 3px;
}

a:hover {
  color: var(--navy);
}

img {
  max-width: 100%;
  height: auto;
}

.text-muted {
  color: var(--muted) !important;
}

/* Small amber-tinted label text (kept name for older markup) */
.text-turquoise {
  color: var(--amber-text) !important;
}

/* Jumping to #enquiry etc. should not hide the heading under the sticky header */
[id] {
  scroll-margin-top: calc(var(--header-h) + 16px);
}

/* ---------- 3. Accessibility helpers ---------- */
.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  z-index: 2000;
  background-color: var(--amber);
  color: var(--navy);
  padding: 0.6rem 1rem;
  border-radius: 0 0 var(--radius-sm) 0;
  font-weight: 600;
}

.skip-link:focus {
  left: 0;
}

main:focus {
  outline: none;
}

/* Visible keyboard focus: navy ring on light areas... */
a:focus-visible,
button:focus-visible,
.btn:focus-visible,
.nav-link:focus-visible,
summary:focus-visible {
  outline: 3px solid var(--blue);
  outline-offset: 3px;
  box-shadow: none;
}

/* ...and an amber ring on dark areas */
.navbar-custom a:focus-visible,
.navbar-custom button:focus-visible,
.hero a:focus-visible,
.page-banner a:focus-visible,
.contact-panel a:focus-visible,
.contact-info-card a:focus-visible,
.site-footer a:focus-visible,
#backToTop:focus-visible {
  outline-color: var(--amber);
}

/* ---------- 4. Header + navigation ---------- */
.navbar-custom {
  background-color: var(--navy);
  min-height: var(--header-h);
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  transition: box-shadow 0.25s ease, padding 0.25s ease;
}

/* script.js adds "scrolled" after the page moves */
.navbar-custom.scrolled {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  box-shadow: 0 6px 18px rgba(10, 23, 40, 0.25);
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-right: 1rem;
}

.navbar-brand img {
  width: 42px;
  height: 42px;
  flex-shrink: 0;
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.05;
}

.brand-name {
  color: var(--white);
  font-weight: 800;
  font-size: 1.2rem;
  letter-spacing: 0.14em;
}

.brand-tagline {
  color: var(--amber);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  margin-top: 0.2rem;
}

.navbar-custom .nav-link {
  position: relative;
  color: rgba(255, 255, 255, 0.86);
  font-weight: 500;
  font-size: 0.95rem;
  padding: 0.6rem 0.9rem;
  border-radius: var(--radius-sm);
}

.navbar-custom .nav-link:hover,
.navbar-custom .nav-link:focus {
  color: var(--white);
}

/* The page you are on: white text + amber underline */
.navbar-custom .nav-link.active {
  color: var(--white);
  font-weight: 600;
}

.navbar-custom .nav-link.active::after {
  content: "";
  position: absolute;
  left: 0.9rem;
  right: 0.9rem;
  bottom: 0.2rem;
  height: 2px;
  border-radius: 2px;
  background-color: var(--amber);
}

/* Header "Call Us" button */
.btn-call {
  white-space: nowrap;
}

.navbar-custom .navbar-toggler {
  border: 1px solid rgba(255, 255, 255, 0.35);
  padding: 0.5rem 0.65rem;
  border-radius: var(--radius-sm);
}

.navbar-custom .navbar-toggler:focus {
  box-shadow: 0 0 0 3px rgba(245, 166, 35, 0.55);
}

/* ---------- 5. Buttons ----------
   Primary (amber): the main action in a section — navy text for contrast.
   Navy: strong action on light backgrounds.
   Outline navy: secondary action on light backgrounds.
   Outline light: secondary action on dark backgrounds. */
.btn {
  --bs-btn-padding-x: 1.35rem;
  --bs-btn-padding-y: 0.7rem;
  --bs-btn-font-weight: 600;
  --bs-btn-border-radius: var(--radius-sm);
  --bs-btn-disabled-opacity: 0.55;
  min-height: 44px; /* comfortable touch target */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}

.btn-sm {
  --bs-btn-padding-x: 0.85rem;
  --bs-btn-padding-y: 0.4rem;
  min-height: 36px;
}

.btn-lg {
  --bs-btn-padding-x: 1.6rem;
  --bs-btn-padding-y: 0.8rem;
  --bs-btn-font-size: 1.02rem;
}

.btn-amber,
.btn-turquoise {
  --bs-btn-color: var(--navy);
  --bs-btn-bg: var(--amber);
  --bs-btn-border-color: var(--amber);
  --bs-btn-hover-color: var(--navy);
  --bs-btn-hover-bg: var(--amber-hover);
  --bs-btn-hover-border-color: var(--amber-hover);
  --bs-btn-active-color: var(--navy);
  --bs-btn-active-bg: #c27a08;
  --bs-btn-active-border-color: #c27a08;
  --bs-btn-disabled-color: var(--navy);
  --bs-btn-disabled-bg: var(--amber);
  --bs-btn-disabled-border-color: var(--amber);
  font-weight: 700;
}

.btn-navy {
  --bs-btn-color: var(--white);
  --bs-btn-bg: var(--navy);
  --bs-btn-border-color: var(--navy);
  --bs-btn-hover-color: var(--white);
  --bs-btn-hover-bg: var(--blue);
  --bs-btn-hover-border-color: var(--blue);
  --bs-btn-active-color: var(--white);
  --bs-btn-active-bg: var(--navy-deep);
  --bs-btn-active-border-color: var(--navy-deep);
  --bs-btn-disabled-color: var(--white);
  --bs-btn-disabled-bg: var(--navy);
  --bs-btn-disabled-border-color: var(--navy);
}

.btn-outline-navy {
  --bs-btn-color: var(--navy);
  --bs-btn-bg: transparent;
  --bs-btn-border-color: var(--navy);
  --bs-btn-hover-color: var(--white);
  --bs-btn-hover-bg: var(--navy);
  --bs-btn-hover-border-color: var(--navy);
  --bs-btn-active-color: var(--white);
  --bs-btn-active-bg: var(--navy-deep);
  --bs-btn-active-border-color: var(--navy-deep);
  --bs-btn-disabled-color: var(--navy);
  --bs-btn-disabled-border-color: var(--navy);
}

.btn-outline-light {
  --bs-btn-color: var(--white);
  --bs-btn-border-color: rgba(255, 255, 255, 0.7);
  --bs-btn-hover-color: var(--navy);
  --bs-btn-hover-bg: var(--white);
  --bs-btn-hover-border-color: var(--white);
  --bs-btn-active-color: var(--navy);
  --bs-btn-active-bg: #e8edf3;
  --bs-btn-active-border-color: #e8edf3;
}

/* Text link with an arrow, used inside cards */
.card-link-enquire {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 600;
  color: var(--navy);
  text-decoration: none;
  min-height: 44px;
}

.card-link-enquire .bi {
  color: var(--amber-text);
  transition: transform 0.2s ease;
}

.card-link-enquire:hover {
  color: var(--blue);
  text-decoration: underline;
}

.card-link-enquire:hover .bi {
  transform: translateX(3px);
}

/* Kept so older markup with this class does not break (the pulse was removed) */
.btn-pulse {
  animation: none;
}

/* ---------- 6. Home hero ----------
   A real photo (an <img>, so it can fall back to a local illustration)
   under a navy overlay that keeps the white text readable. */
.hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background-color: var(--navy);
  color: var(--white);
  padding: 4.5rem 0 4rem;
}

.hero-media {
  position: absolute;
  inset: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(90deg, rgba(10, 23, 40, 0.94) 0%, rgba(16, 36, 58, 0.86) 45%, rgba(16, 36, 58, 0.55) 100%);
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--amber);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.hero-eyebrow::before {
  content: "";
  width: 28px;
  height: 2px;
  background-color: var(--amber);
}

.hero h1 {
  color: var(--white);
  font-size: clamp(2rem, 5.2vw, 3.3rem);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.02em;
  max-width: 17ch;
  margin-bottom: 1.1rem;
}

.hero .lead {
  color: rgba(255, 255, 255, 0.88);
  font-size: clamp(1.02rem, 1.6vw, 1.18rem);
  max-width: 54ch;
  margin-bottom: 2rem;
}

.hero-contact {
  margin-top: 1.75rem;
  margin-bottom: 0;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.78);
}

.hero-contact a {
  color: var(--white);
  font-weight: 600;
}

.hero-contact a:hover {
  color: var(--amber);
}

/* ---------- 7. Inner-page banner ---------- */
.page-banner {
  background-color: var(--navy);
  background-image: linear-gradient(120deg, var(--navy-deep) 0%, var(--navy) 55%, var(--blue) 100%);
  color: var(--white);
  padding: 3.25rem 0 3rem;
  border-bottom: 3px solid var(--amber);
}

.page-banner h1 {
  color: var(--white);
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.page-banner .banner-text {
  color: rgba(255, 255, 255, 0.82);
  max-width: 60ch;
  margin-bottom: 1rem;
}

.page-banner .breadcrumb {
  margin-bottom: 0;
  font-size: 0.9rem;
  --bs-breadcrumb-divider-color: rgba(255, 255, 255, 0.6);
}

.page-banner .breadcrumb a {
  color: var(--amber);
  text-decoration: none;
}

.page-banner .breadcrumb a:hover {
  text-decoration: underline;
}

.page-banner .breadcrumb-item.active,
.page-banner .breadcrumb-item + .breadcrumb-item::before {
  color: rgba(255, 255, 255, 0.8);
}

/* ---------- 8. Sections + headings ---------- */
.section {
  padding: 5rem 0;
  overflow-x: clip; /* stops slide-in animations from causing sideways scroll */
}

.section-sm {
  padding: 3.5rem 0;
}

.bg-light-grey {
  background-color: var(--light-grey);
}

/* Small uppercase label above a heading */
.eyebrow {
  display: block;
  color: var(--amber-text);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin-bottom: 0.6rem;
}

.section-title {
  font-size: clamp(1.6rem, 3vw, 2.15rem);
  font-weight: 800;
  margin-bottom: 1rem;
}

.section-subtitle {
  color: var(--muted);
  font-size: 1.05rem;
  max-width: 640px;
}

.text-center .section-subtitle {
  margin-left: auto;
  margin-right: auto;
}

/* Secondary text placed directly on the light-grey background stays readable (WCAG AA) */
.bg-light-grey .section-subtitle,
.bg-light-grey .process-note {
  color: var(--muted-on-grey) !important;
}

.section-head {
  margin-bottom: 3rem;
}

/* ---------- 9. Cards ---------- */
.service-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: var(--white);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  height: 100%;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.service-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: #c9d3de;
}

.service-card .card-body {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.service-card .card-img-top {
  aspect-ratio: 16 / 9;
  height: auto;
  object-fit: cover;
  background-color: var(--navy); /* shows while the image is loading */
}

.service-icon {
  width: 52px;
  height: 52px;
  border-radius: var(--radius);
  background-color: var(--amber-soft);
  color: var(--amber-text);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1.1rem;
  flex-shrink: 0;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.service-card:hover .service-icon {
  background-color: var(--amber);
  color: var(--navy);
}

.service-card h3 {
  font-size: 1.15rem;
  margin-bottom: 0.6rem;
}

.service-card p {
  color: var(--muted);
  margin-bottom: 0;
}

/* Pushes the card's action to the bottom so actions line up across a row */
.card-actions {
  margin-top: auto;
  padding-top: 1.1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1.25rem;
}

/* Main service cards: a little larger, amber top edge */
.service-card.service-card-main {
  border-top: 3px solid var(--amber);
}

.service-card-main .card-body {
  padding: 2rem;
}

.service-card-main h3 {
  font-size: 1.3rem;
}

/* Simple feature card (About page "Our approach") */
.feature-card .card-body {
  padding: 1.75rem;
}

/* ---------- 10. Media (images) + lists ---------- */
.media-frame {
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
  background-color: var(--navy); /* shows while the image is loading */
  box-shadow: var(--shadow-md);
  aspect-ratio: 4 / 3;
}

.media-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Older class still used in a few places */
.about-img {
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
  width: 100%;
  aspect-ratio: 4 / 3;
  height: auto;
  object-fit: cover;
  background-color: var(--navy);
}

.check-list {
  list-style: none;
  padding-left: 0;
  margin-bottom: 0;
}

.check-list li {
  position: relative;
  padding-left: 2rem;
  margin-bottom: 0.75rem;
}

.check-list li:last-child {
  margin-bottom: 0;
}

.check-list li .bi {
  position: absolute;
  left: 0;
  top: 0.05rem;
  color: var(--amber-text);
  font-size: 1.15rem;
}

/* Service detail blocks (services.html) */
.service-detail + .service-detail {
  margin-top: 4.5rem;
}

.service-detail h2 {
  font-size: clamp(1.5rem, 2.6vw, 1.9rem);
  font-weight: 800;
}

.service-detail .detail-lead {
  color: var(--muted);
  font-size: 1.05rem;
}

.detail-label {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--navy);
  margin: 1.5rem 0 0.9rem;
}

/* Owner card (about.html) */
.owner-card {
  background-color: var(--white);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  padding: 2rem;
  height: 100%;
}

.owner-card .owner-role {
  color: var(--muted);
  font-weight: 500;
  margin-bottom: 1.25rem;
}

.owner-card .owner-name {
  font-size: 1.35rem;
  margin-bottom: 0.15rem;
}

.info-list {
  list-style: none;
  padding-left: 0;
  margin-bottom: 1.5rem;
}

.info-list li {
  display: flex;
  gap: 0.75rem;
  padding: 0.7rem 0;
  border-top: 1px solid var(--line);
}

.info-list li:first-child {
  border-top: 0;
}

.info-list .bi {
  color: var(--amber-text);
  font-size: 1.1rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.info-list a {
  color: var(--navy);
  font-weight: 600;
  text-decoration: none;
  word-break: break-word;
}

.info-list a:hover {
  text-decoration: underline;
}

/* ---------- 11. Process steps ----------
   Vertical list on phones, four columns on large screens. */
.process {
  list-style: none;
  padding-left: 0;
  margin: 0;
  display: grid;
  gap: 1.25rem;
  counter-reset: step;
}

.process-step {
  position: relative;
  background-color: var(--white);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 1.5rem 1.5rem 1.5rem 4.75rem;
  box-shadow: var(--shadow-sm);
}

.process-num {
  position: absolute;
  left: 1.25rem;
  top: 1.4rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: var(--navy);
  color: var(--amber);
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.process-step h3 {
  font-size: 1.05rem;
  margin-bottom: 0.35rem;
}

.process-step p {
  color: var(--muted);
  margin-bottom: 0;
  font-size: 0.95rem;
}

.process-note {
  color: var(--muted);
  font-size: 0.9rem;
  margin: 1.5rem auto 0;
}

@media (min-width: 992px) {
  .process {
    grid-template-columns: repeat(4, 1fr);
  }

  .process-step {
    padding: 1.75rem 1.5rem;
  }

  .process-num {
    position: static;
    margin-bottom: 1rem;
  }

  /* thin line linking the steps */
  .process-step:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 2.95rem;
    right: -1.25rem;
    width: 1.25rem;
    height: 2px;
    background-color: var(--line);
  }
}

/* ---------- 12. Contact panel (call-to-action) ---------- */
.contact-panel {
  background-color: var(--navy);
  background-image: linear-gradient(120deg, var(--navy-deep) 0%, var(--navy) 60%, var(--blue) 100%);
  color: var(--white);
  border-radius: var(--radius);
  padding: 2.5rem 2rem;
  box-shadow: var(--shadow-md);
}

.contact-panel h2 {
  color: var(--white);
  font-size: clamp(1.4rem, 2.6vw, 1.85rem);
  font-weight: 800;
  margin-bottom: 0.6rem;
}

.contact-panel p {
  color: rgba(255, 255, 255, 0.84);
  margin-bottom: 0;
}

.contact-panel .panel-contact {
  margin-top: 1rem;
  color: var(--white);
  font-weight: 500;
}

.contact-panel .panel-contact a {
  color: var(--white);
  font-weight: 700;
}

.contact-panel .panel-contact a:hover {
  color: var(--amber);
}

/* Older call-to-action strip (kept for compatibility) */
.cta-strip {
  background-color: var(--navy);
  color: var(--white);
  padding: 3rem 0;
}

.cta-strip h2 {
  color: var(--white);
}

/* ---------- 13. Contact page + form ---------- */
.contact-info-card {
  background-color: var(--navy);
  background-image: linear-gradient(160deg, var(--navy) 0%, var(--navy-deep) 100%);
  color: var(--white);
  border-radius: var(--radius);
  padding: 2rem;
  height: 100%;
}

.contact-info-card h2 {
  color: var(--white);
  font-size: 1.4rem;
}

.contact-intro {
  color: rgba(255, 255, 255, 0.82);
}

.contact-item {
  display: flex;
  gap: 1rem;
  padding: 0.95rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.contact-item .bi {
  font-size: 1.25rem;
  color: var(--amber);
  flex-shrink: 0;
  margin-top: 0.15rem;
}

.contact-item a {
  color: var(--white);
  font-weight: 600;
  text-decoration: none;
  word-break: break-word; /* long email address wraps on small phones */
}

.contact-item a:hover {
  color: var(--amber);
  text-decoration: underline;
}

.contact-item small {
  display: block;
  color: rgba(255, 255, 255, 0.66);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.7rem;
  font-weight: 600;
  margin-bottom: 0.15rem;
}

.form-card {
  background-color: var(--white);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 2rem;
  box-shadow: var(--shadow-sm);
}

.form-card .section-title {
  font-size: 1.4rem;
  margin-bottom: 0.4rem;
}

.form-label {
  font-weight: 600;
  font-size: 0.92rem;
  color: var(--navy);
  margin-bottom: 0.4rem;
}

.required-mark {
  color: var(--danger);
}

/* Same height for every box; 16px text stops iPhone zooming in */
.form-control,
.form-select {
  min-height: 48px;
  padding: 0.65rem 0.9rem;
  font-size: 1rem;
  color: var(--text);
  border: 1px solid #c5d0dc;
  border-radius: var(--radius-sm);
}

.form-control::placeholder {
  color: #8a97a8;
}

.form-control:focus,
.form-select:focus {
  border-color: var(--blue);
  box-shadow: 0 0 0 3px rgba(30, 58, 95, 0.18);
}

/* Error state: red border + message text (not colour alone — the message explains) */
.form-control.is-invalid,
.form-select.is-invalid {
  border-color: var(--danger);
}

.form-control.is-invalid:focus {
  box-shadow: 0 0 0 3px rgba(180, 35, 24, 0.18);
}

.invalid-feedback {
  color: var(--danger);
  font-size: 0.86rem;
  font-weight: 500;
}

.form-note,
.char-count {
  font-size: 0.85rem;
  color: var(--muted);
}

.char-count.near-limit {
  color: var(--warning);
  font-weight: 600;
}

/* Spam trap: hidden from people, but simple bots fill it in */
.hp-field {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

/* Small spinner inside a button while sending */
.btn .spinner-border {
  width: 1rem;
  height: 1rem;
  border-width: 0.15em;
}

/* Form result messages */
.form-card .alert {
  border-radius: var(--radius-sm);
}

/* ---------- 14. Office map (contact.html) ---------- */
.map-card {
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--line);
  box-shadow: var(--shadow-sm);
  background-color: var(--navy); /* shows while the map loads */
  height: 320px;
}

.map-card iframe {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}

/* ---------- 15. Footer ---------- */
.site-footer {
  background-color: var(--navy-deep);
  color: rgba(255, 255, 255, 0.78);
  padding: 4rem 0 1.5rem;
  font-size: 0.95rem;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1rem;
  color: var(--white);
  font-size: 1.15rem;
  font-weight: 800;
}

.footer-about {
  max-width: 34ch;
}

.footer-title {
  color: var(--white);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 1.1rem;
  display: flex;
  align-items: center;
}

.footer-title::before {
  content: "";
  width: 14px;
  height: 2px;
  background-color: var(--amber);
  margin-right: 0.55rem;
}

.site-footer a {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  word-break: break-word;
}

.site-footer a:hover {
  color: var(--amber);
  text-decoration: underline;
}

.footer-links {
  list-style: none;
  padding-left: 0;
  margin-bottom: 0;
}

.footer-links li {
  margin-bottom: 0.6rem;
}

.footer-links .bi {
  color: var(--amber);
  margin-right: 0.35rem;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 2.5rem;
  padding-top: 1.25rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.65);
}

.site-footer .footer-admin-link {
  color: rgba(255, 255, 255, 0.65);
  text-decoration: underline;
}

/* ---------- 16. Back-to-top button ---------- */
#backToTop {
  position: fixed;
  right: 16px;
  bottom: 16px;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: var(--navy);
  color: var(--amber);
  font-size: 1.2rem;
  box-shadow: var(--shadow-md);
  display: none; /* script.js shows it after scrolling */
  z-index: 1000;
}

#backToTop:hover {
  background-color: var(--blue);
}

#backToTop.show {
  display: block;
}

/* ---------- 17. Scroll animations ----------
   Elements with class="reveal" start slightly lower and invisible; script.js
   adds "visible" when they scroll onto the screen. The "js" class is added in
   <head>, so if JavaScript is off nothing stays hidden. */
.js .reveal {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.js .reveal.visible {
  opacity: 1;
  transform: none;
}

.js .reveal.delay-1 { transition-delay: 0.08s; }
.js .reveal.delay-2 { transition-delay: 0.16s; }
.js .reveal.delay-3 { transition-delay: 0.24s; }

/* When the page opens at #enquiry etc., show that block in its final place straight away,
   so the slide-in can't move it up under the sticky header */
.js .reveal:has(:target),
.js .reveal:target {
  opacity: 1;
  transform: none;
  transition: none;
}

/* Kept for older markup: same gentle rise as everything else */
.js .reveal.from-left,
.js .reveal.from-right {
  transform: translateY(16px);
}

.js .reveal.from-left.visible,
.js .reveal.from-right.visible {
  transform: none;
}

/* ---------- 18. Responsive adjustments ---------- */
@media (min-width: 768px) {
  .hero {
    padding: 6.5rem 0 6rem;
    min-height: 560px;
    display: flex;
    align-items: center;
  }

  .contact-panel {
    padding: 3rem;
  }
}

@media (min-width: 992px) {
  .map-card {
    height: 400px;
  }

  .navbar-custom .navbar-nav {
    gap: 0.25rem;
  }
}

/* Phone/tablet menu */
@media (max-width: 991.98px) {
  /* Images stack full width below desktop: use a wider crop so they don't dominate the page */
  .media-frame {
    aspect-ratio: 16 / 9;
  }

  .navbar-custom .navbar-collapse {
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    margin-top: 0.75rem;
    padding-top: 0.5rem;
  }

  .navbar-custom .nav-link {
    padding: 0.8rem 0.75rem; /* 44px+ tall touch targets */
  }

  .navbar-custom .nav-link.active {
    background-color: rgba(255, 255, 255, 0.06);
  }

  .navbar-custom .nav-link.active::after {
    left: 0;
    right: auto;
    top: 0.65rem;
    bottom: 0.65rem;
    width: 3px;
    height: auto;
  }
}

@media (max-width: 767.98px) {
  .section {
    padding: 3.75rem 0;
  }

  .section-head {
    margin-bottom: 2.25rem;
  }

  .service-detail + .service-detail {
    margin-top: 3.5rem;
  }
}

/* Small phones */
@media (max-width: 575.98px) {
  :root {
    --header-h: 66px;
  }

  .hero {
    padding: 3.5rem 0 3.25rem;
  }

  .hero .btn {
    width: 100%; /* full-width buttons are easier to tap */
  }

  .hero-eyebrow {
    font-size: 0.7rem;
    letter-spacing: 0.08em; /* keeps "Customs Clearance · Transportation" on one line */
  }

  .hero-eyebrow::before {
    display: none;
  }

  .contact-info-card,
  .form-card,
  .owner-card,
  .service-card-main .card-body {
    padding: 1.5rem;
  }

  .contact-panel {
    padding: 2rem 1.25rem;
  }

  .brand-name {
    font-size: 1.05rem;
  }

  .navbar-brand img {
    width: 38px;
    height: 38px;
  }

  .footer-bottom {
    justify-content: center;
    text-align: center;
  }
}

/* Very narrow phones (320px) */
@media (max-width: 359.98px) {
  .navbar-brand {
    gap: 0.45rem;
    margin-right: 0.5rem;
  }

  .brand-tagline {
    letter-spacing: 0.14em;
  }
}

/* ---------- 19. Respect the phone's "reduce motion" setting ---------- */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }

  .js .reveal {
    opacity: 1;
    transform: none;
  }
}

/* Valid field after checking: green border (the absence of an error message also tells the user) */
.form-control.is-valid,
.form-select.is-valid {
  border-color: var(--success);
}

/* Used by admin.css (new enquiry cards fade in) */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: none; }
}
```

### 6.10  `dynamic-logistics/css/admin.css`

```css
/* =========================================================
   Dynamic Logistics — Admin pages
   File: css/admin.css
   Loaded AFTER style.css on admin-login.html and admin.html
   ========================================================= */

/* ---------- Login page ---------- */
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 1rem;
  background-color: var(--navy);
  background-image: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 55%, var(--teal) 100%);
}

.login-card {
  width: 100%;
  max-width: 420px;
  background-color: var(--white);
  border-radius: 16px;
  padding: 2rem 1.5rem;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

.login-card .login-logo {
  width: 72px;
  height: 72px;
  display: block;
  margin: 0 auto 0.75rem;
}

.password-toggle {
  border-color: #ced4da;
  background-color: var(--white);
  color: var(--muted);
}

/* ---------- Dashboard layout ---------- */
.admin-body {
  --muted: var(--muted-on-grey); /* admin pages sit on light grey: keep secondary text at AA contrast */
  background-color: var(--light-grey);
  min-height: 100vh;
}

/* Hide the dashboard until we know the admin is logged in */
.admin-body.checking-login .admin-main {
  display: none;
}

.admin-user {
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.85rem;
  word-break: break-all;
}

.admin-main {
  padding: 1.5rem 0 3rem;
}

/* ---------- Stat cards ---------- */
.stat-card {
  background-color: var(--white);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 10px rgba(16, 36, 58, 0.06);
  border-left: 4px solid var(--turquoise);
  height: 100%;
}

.stat-card .stat-number {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--navy);
  line-height: 1.1;
}

.stat-card .stat-label {
  color: var(--muted);
  font-size: 0.85rem;
}

.stat-card.stat-new      { border-left-color: #e8a317; }
.stat-card.stat-progress { border-left-color: #3b6ea5; }
.stat-card.stat-closed   { border-left-color: #2e9e5b; }
.stat-card.stat-total    { border-left-color: var(--navy); }

/* ---------- Toolbar (search + filters) ---------- */
.admin-toolbar {
  background-color: var(--white);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 10px rgba(16, 36, 58, 0.06);
}

.filter-btn {
  padding: 0.4rem 0.9rem;
  font-size: 0.9rem;
  border-radius: 50px;
}

.filter-btn.active {
  background-color: var(--navy);
  border-color: var(--navy);
  color: var(--white);
}

/* ---------- Enquiry cards ---------- */
.enquiry-card {
  background-color: var(--white);
  border-radius: 12px;
  padding: 1.1rem 1.1rem 1rem;
  box-shadow: 0 2px 10px rgba(16, 36, 58, 0.06);
  margin-bottom: 1rem;
  border-left: 4px solid #e8a317;
  animation: fadeUp 0.35s ease both;
}

.enquiry-card.status-in-progress { border-left-color: #3b6ea5; }
.enquiry-card.status-closed      { border-left-color: #2e9e5b; }

/* Cards slide in only on first load, not on every live update */
.no-animate .enquiry-card {
  animation: none;
}

/* Small tag showing the service the visitor chose */
.service-chip {
  display: inline-flex;
  align-items: center;
  margin-top: 0.5rem;
  padding: 0.2rem 0.6rem;
  border-radius: 50px;
  background-color: #eef3f9;
  color: var(--teal);
  font-size: 0.8rem;
  font-weight: 600;
}

.enquiry-name {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--navy);
  margin: 0;
  word-break: break-word;
}

.enquiry-date {
  font-size: 0.8rem;
  color: var(--muted);
}

.enquiry-subject {
  font-weight: 600;
  margin: 0.6rem 0 0.3rem;
  word-break: break-word;
}

.enquiry-message {
  white-space: pre-wrap;   /* keep the visitor's line breaks */
  word-break: break-word;
  color: var(--text);
  background-color: var(--light-grey);
  border-radius: 8px;
  padding: 0.7rem 0.8rem;
  margin-bottom: 0.8rem;
  font-size: 0.95rem;
}

.enquiry-contact a {
  text-decoration: none;
  word-break: break-all;
  font-size: 0.9rem;
}

.status-badge {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0.35em 0.7em;
  border-radius: 50px;
  white-space: nowrap;
}

.status-badge.badge-new         { background-color: #fff3d6; color: #8a5a00; }
.status-badge.badge-in-progress { background-color: #e3ecf6; color: #1e3a5f; }
.status-badge.badge-closed      { background-color: #dff3e6; color: #1e6b3d; }

.enquiry-actions .form-select {
  max-width: 170px;
  font-size: 0.9rem;
}

.enquiry-actions .btn {
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
}

/* ---------- Charts (js/admin-charts.js) ---------- */
.chart-card {
  background-color: var(--white);
  border-radius: 12px;
  padding: 1rem 1rem 0.9rem;
  box-shadow: 0 2px 10px rgba(16, 36, 58, 0.06);
  height: 100%;
}

.chart-title {
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
}

.chart-subtitle {
  color: var(--muted);
  font-size: 0.82rem;
  margin: 0;
}

/* Big number above the column chart */
.chart-headline {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.chart-headline #trendHeadline {
  font-size: 2rem;
  font-weight: 700;
  color: var(--navy);
  line-height: 1;
}

.chart-headline-label {
  color: var(--muted);
  font-size: 0.85rem;
}

/* Fixed height so Chart.js knows how tall to draw */
.chart-box {
  position: relative;
  height: 220px;
}

.range-btn.active {
  background-color: var(--navy);
  border-color: var(--navy);
  color: var(--white);
}

.chart-table summary {
  color: var(--teal);
  font-size: 0.85rem;
  cursor: pointer;
}

/* Status bar: one row split into coloured parts with 2px white gaps */
.status-bar {
  display: flex;
  gap: 2px;
  height: 24px;
  border-radius: 4px;
  overflow: hidden;
  background-color: var(--white);
}

.status-bar.is-empty {
  background-color: #e9edf1;
}

.status-segment {
  flex-basis: 0;
  min-width: 6px;
}

.chart-legend {
  list-style: none;
  padding: 0;
  margin: 0.9rem 0 0.6rem;
}

.chart-legend li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0;
  font-size: 0.9rem;
  border-bottom: 1px solid #eef1f4;
}

.chart-legend li:last-child {
  border-bottom: none;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.legend-name {
  color: var(--text);
}

.legend-value {
  margin-left: auto;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}

/* ---------- Empty / loading states ---------- */
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--muted);
}

.empty-state .bi {
  font-size: 2.5rem;
  color: var(--turquoise);
  display: block;
  margin-bottom: 0.5rem;
}

@media (max-width: 575.98px) {
  .stat-card .stat-number {
    font-size: 1.5rem;
  }

  .enquiry-actions .form-select {
    max-width: none;
    flex: 1;
  }
}

/* Charts never wider than their box (stopped sideways scrolling on 320px phones) */
.admin-body canvas {
  max-width: 100% !important;
}
```

### 6.11  `dynamic-logistics/js/firebase-config.js`

```javascript
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
```

### 6.12  `dynamic-logistics/js/script.js`

```javascript
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

/* global firebase, bootstrap */

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

  /* ---------- 3. Close the phone menu after tapping a link ---------- */
  var menu = document.getElementById("mainMenu");
  document.querySelectorAll(".navbar-collapse .nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      if (menu && menu.classList.contains("show") && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  /* ---------- 4. Back-to-top button + slimmer navbar ---------- */
  var backToTop = document.getElementById("backToTop");
  var navbar = document.querySelector(".navbar-custom");

  function onScroll() {
    var scrolled = window.scrollY || window.pageYOffset;
    if (backToTop) {
      backToTop.classList.toggle("show", scrolled > 300);
    }
    if (navbar) {
      navbar.classList.toggle("scrolled", scrolled > 40);
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

    // Spam trap filled in = almost certainly a bot.
    // Pretend it worked, but save nothing.
    if (document.getElementById("dlsTrap").value !== "") {
      showFormMessage("formSuccess", enquiry.name);
      resetForm();
      return;
    }

    setSending(true);

    saveEnquiry(enquiry)
      .then(function (result) {
        // "saved" = stored in Firebase; "demo" = Firebase not set up yet
        showFormMessage(result === "saved" ? "formSuccess" : "formDemo", enquiry.name);
        resetForm();
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
  if (sending) {
    button.innerHTML = '<span class="spinner-border" role="status" aria-hidden="true"></span> Sending...';
  } else {
    button.innerHTML = '<i class="bi bi-send-fill" aria-hidden="true"></i> Submit Enquiry';
  }
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
```

### 6.13  `dynamic-logistics/js/admin-charts.js`

```javascript
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
```

### 6.14  `dynamic-logistics/js/admin.js`

```javascript
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
```

### 6.15  `dynamic-logistics/firestore.rules`

```javascript
rules_version = '2';

// =========================================================
// Dynamic Logistics — Firestore Security Rules
// Copy ALL of this into: Firebase console > Firestore Database > Rules
// Replace ADMIN_EMAIL_HERE with the admin email you created in
// Firebase Authentication (lowercase, keep the quotes), then tap Publish.
//
// What these rules allow:
//  - Anyone visiting the website can CREATE an enquiry, but only
//    with the expected fields and sensible lengths.
//  - Only the admin (logged in) can READ, UPDATE or DELETE enquiries.
//  - Everything else in the database is blocked.
// The limits here match the checks in js/script.js and the
// maxlength values in contact.html.
// =========================================================

service cloud.firestore {
  match /databases/{database}/documents {

    // True only for the logged-in admin account
    function isAdmin() {
      return request.auth != null
        && request.auth.token.email == "ADMIN_EMAIL_HERE";
    }

    // A text field must be a string with a length in range
    function validText(field, minLen, maxLen) {
      return request.resource.data[field] is string
        && request.resource.data[field].size() >= minLen
        && request.resource.data[field].size() <= maxLen;
    }

    // "service" is optional; if present it must be one of the dropdown values
    function validService() {
      return !('service' in request.resource.data)
        || request.resource.data.service in
           ['customs-clearance', 'transportation', 'sea-shipping', 'container-cargo',
            'logistics-planning', 'cargo-handling', 'other'];
    }

    match /enquiries/{enquiryId} {

      // Public visitors: create only, with checked data
      allow create: if request.resource.data.keys().hasOnly(
                         ['name', 'email', 'phone', 'service', 'subject', 'message', 'status', 'createdAt'])
                    && validText('name', 2, 100)
                    && validText('email', 5, 150)
                    && validText('phone', 10, 25)
                    && validText('subject', 3, 150)
                    && validText('message', 10, 2000)
                    && validService()
                    && request.resource.data.status == 'new'
                    && request.resource.data.createdAt == request.time;

      // Admin: view and delete
      allow read, delete: if isAdmin();

      // Admin: may change only the status field
      allow update: if isAdmin()
                    && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['status'])
                    && request.resource.data.status in ['new', 'in-progress', 'closed'];
    }

    // Block everything else
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### 6.16  `dynamic-logistics/images/logo.svg`

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <!-- Simple ship logo for Dynamic Logistics (navy + amber) -->
  <circle cx="60" cy="60" r="58" fill="#10243a"/>
  <!-- Containers on deck -->
  <rect x="38" y="44" width="14" height="12" rx="1.5" fill="#f5a623"/>
  <rect x="54" y="44" width="14" height="12" rx="1.5" fill="#ffffff"/>
  <rect x="70" y="44" width="14" height="12" rx="1.5" fill="#f5a623"/>
  <rect x="46" y="32" width="14" height="12" rx="1.5" fill="#ffffff"/>
  <rect x="62" y="32" width="14" height="12" rx="1.5" fill="#f5a623"/>
  <!-- Bridge / cabin -->
  <rect x="26" y="38" width="10" height="18" rx="1.5" fill="#ffffff"/>
  <rect x="28" y="41" width="6" height="3" fill="#10243a"/>
  <!-- Hull -->
  <path d="M18 58 H100 L90 76 H28 Z" fill="#f5a623"/>
  <!-- Waves -->
  <path d="M16 84 q8 -6 16 0 t16 0 t16 0 t16 0 t16 0 t16 0" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
  <path d="M24 94 q8 -6 16 0 t16 0 t16 0 t16 0 t16 0" fill="none" stroke="#f5a623" stroke-width="3" stroke-linecap="round"/>
</svg>
```

### 6.17  `dynamic-logistics/images/app-icon.svg`

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <!-- App icon for "Add to Home screen" (full square so phones can crop it to any shape) -->
  <rect width="512" height="512" fill="#10243a"/>
  <g transform="translate(76 76) scale(3)">
    <rect x="38" y="44" width="14" height="12" rx="1.5" fill="#f5a623"/>
    <rect x="54" y="44" width="14" height="12" rx="1.5" fill="#ffffff"/>
    <rect x="70" y="44" width="14" height="12" rx="1.5" fill="#f5a623"/>
    <rect x="46" y="32" width="14" height="12" rx="1.5" fill="#ffffff"/>
    <rect x="62" y="32" width="14" height="12" rx="1.5" fill="#f5a623"/>
    <rect x="26" y="38" width="10" height="18" rx="1.5" fill="#ffffff"/>
    <rect x="28" y="41" width="6" height="3" fill="#10243a"/>
    <path d="M18 58 H100 L90 76 H28 Z" fill="#f5a623"/>
    <path d="M16 84 q8 -6 16 0 t16 0 t16 0 t16 0 t16 0 t16 0" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
    <path d="M24 94 q8 -6 16 0 t16 0 t16 0 t16 0 t16 0" fill="none" stroke="#f5a623" stroke-width="3" stroke-linecap="round"/>
  </g>
</svg>
```

### 6.18  `dynamic-logistics/images/fallback-ship.svg`

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400" preserveAspectRatio="xMidYMid slice">
  <!-- Local fallback illustration: container ship at sea.
       Shown automatically when an online photo cannot load. -->
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#10243a"/>
      <stop offset="1" stop-color="#1e3a5f"/>
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(#sky)"/>
  <circle cx="480" cy="90" r="34" fill="#f5a623" opacity="0.35"/>
  <!-- Ship: containers -->
  <g>
    <rect x="200" y="196" width="46" height="30" rx="2" fill="#f5a623"/>
    <rect x="250" y="196" width="46" height="30" rx="2" fill="#ffffff"/>
    <rect x="300" y="196" width="46" height="30" rx="2" fill="#d98a0b"/>
    <rect x="350" y="196" width="46" height="30" rx="2" fill="#ffffff"/>
    <rect x="400" y="196" width="46" height="30" rx="2" fill="#f5a623"/>
    <rect x="225" y="162" width="46" height="30" rx="2" fill="#ffffff"/>
    <rect x="275" y="162" width="46" height="30" rx="2" fill="#f5a623"/>
    <rect x="325" y="162" width="46" height="30" rx="2" fill="#ffffff"/>
    <rect x="375" y="162" width="46" height="30" rx="2" fill="#d98a0b"/>
    <!-- Bridge -->
    <rect x="150" y="150" width="40" height="76" rx="3" fill="#ffffff"/>
    <rect x="156" y="160" width="28" height="8" fill="#10243a"/>
    <rect x="164" y="132" width="8" height="18" fill="#ffffff"/>
    <!-- Hull -->
    <path d="M120 228 H480 L452 282 H150 Z" fill="#f5a623"/>
    <rect x="150" y="270" width="302" height="6" fill="#10243a" opacity="0.35"/>
  </g>
  <!-- Sea -->
  <path d="M0 280 Q37.5 266 75 280 T150 280 T225 280 T300 280 T375 280 T450 280 T525 280 T600 280 V400 H0 Z" fill="#d98a0b"/>
  <path d="M0 312 Q37.5 298 75 312 T150 312 T225 312 T300 312 T375 312 T450 312 T525 312 T600 312 V400 H0 Z" fill="#f5a623" opacity="0.6"/>
  <path d="M0 348 Q37.5 334 75 348 T150 348 T225 348 T300 348 T375 348 T450 348 T525 348 T600 348 V400 H0 Z" fill="#ffffff" opacity="0.18"/>
</svg>
```

### 6.19  `dynamic-logistics/images/fallback-containers.svg`

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400" preserveAspectRatio="xMidYMid slice">
  <!-- Local fallback illustration: stacked containers and a port crane.
       Shown automatically when an online photo cannot load. -->
  <rect width="600" height="400" fill="#10243a"/>
  <!-- Crane -->
  <g fill="none" stroke="#f5a623" stroke-width="8" stroke-linejoin="round">
    <path d="M90 360 V70 M150 360 V70 M90 70 H520 M90 140 L150 70 M90 220 L150 140 M90 300 L150 220"/>
  </g>
  <line x1="420" y1="70" x2="420" y2="150" stroke="#ffffff" stroke-width="3"/>
  <rect x="396" y="150" width="48" height="12" fill="#ffffff"/>
  <!-- Container stack (each container: body + ribs) -->
  <g>
    <rect x="200" y="290" width="120" height="60" rx="3" fill="#f5a623"/>
    <rect x="330" y="290" width="120" height="60" rx="3" fill="#ffffff"/>
    <rect x="460" y="290" width="120" height="60" rx="3" fill="#d98a0b"/>
    <rect x="265" y="224" width="120" height="60" rx="3" fill="#ffffff"/>
    <rect x="395" y="224" width="120" height="60" rx="3" fill="#f5a623"/>
    <rect x="330" y="158" width="120" height="60" rx="3" fill="#d98a0b"/>
  </g>
  <g stroke="#10243a" stroke-width="3" opacity="0.25">
    <path d="M220 296 V344 M240 296 V344 M260 296 V344 M280 296 V344 M300 296 V344"/>
    <path d="M350 296 V344 M370 296 V344 M390 296 V344 M410 296 V344 M430 296 V344"/>
    <path d="M480 296 V344 M500 296 V344 M520 296 V344 M540 296 V344 M560 296 V344"/>
    <path d="M285 230 V278 M305 230 V278 M325 230 V278 M345 230 V278 M365 230 V278"/>
    <path d="M415 230 V278 M435 230 V278 M455 230 V278 M475 230 V278 M495 230 V278"/>
    <path d="M350 164 V212 M370 164 V212 M390 164 V212 M410 164 V212 M430 164 V212"/>
  </g>
  <rect y="350" width="600" height="50" fill="#1e3a5f"/>
</svg>
```

### 6.20  `dynamic-logistics/images/fallback-warehouse.svg`

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400" preserveAspectRatio="xMidYMid slice">
  <!-- Local fallback illustration: warehouse with packed goods.
       Shown automatically when an online photo cannot load. -->
  <rect width="600" height="400" fill="#10243a"/>
  <!-- Building -->
  <path d="M60 170 L300 70 L540 170 V360 H60 Z" fill="#1e3a5f"/>
  <path d="M60 170 L300 70 L540 170" fill="none" stroke="#f5a623" stroke-width="10" stroke-linejoin="round"/>
  <!-- Door opening -->
  <rect x="150" y="190" width="300" height="170" fill="#10243a"/>
  <g stroke="#f5a623" stroke-width="3" opacity="0.4">
    <path d="M150 210 H450 M150 230 H450"/>
  </g>
  <!-- Shelf -->
  <g fill="#d98a0b">
    <rect x="165" y="290" width="270" height="6"/>
    <rect x="165" y="350" width="270" height="6"/>
  </g>
  <!-- Boxes -->
  <g>
    <rect x="175" y="250" width="50" height="40" rx="3" fill="#ffffff"/>
    <rect x="232" y="258" width="40" height="32" rx="3" fill="#f5a623"/>
    <rect x="280" y="244" width="56" height="46" rx="3" fill="#ffffff"/>
    <rect x="344" y="256" width="44" height="34" rx="3" fill="#f5a623"/>
    <rect x="394" y="262" width="34" height="28" rx="3" fill="#ffffff"/>
    <rect x="180" y="314" width="60" height="36" rx="3" fill="#f5a623"/>
    <rect x="248" y="306" width="48" height="44" rx="3" fill="#ffffff"/>
    <rect x="304" y="318" width="54" height="32" rx="3" fill="#f5a623"/>
    <rect x="366" y="310" width="60" height="40" rx="3" fill="#ffffff"/>
  </g>
  <g stroke="#10243a" stroke-width="3" opacity="0.3">
    <path d="M200 250 V290 M308 244 V290 M410 262 V290 M272 306 V350 M396 310 V350"/>
  </g>
  <rect y="360" width="600" height="40" fill="#1e3a5f"/>
</svg>
```

---

## Part 7 — How the files are linked (order matters)

| Page | In `<head>` | At the end of `<body>`, in this order |
|---|---|---|
| index, about, services | `css/style.css` | `js/script.js` |
| contact | `css/style.css` | Firebase **app** → **firestore** → `js/firebase-config.js` → `js/script.js` |
| admin-login | + `css/admin.css` | Bootstrap JS → Firebase **app** → **auth** → **firestore** → `js/firebase-config.js` → `js/admin.js` |
| admin | + `css/admin.css` | Bootstrap JS → Firebase app → auth → firestore → **Chart.js** → `js/firebase-config.js` → `js/admin-charts.js` → `js/admin.js` |

- Public pages do not depend on Bootstrap. Admin pages continue to load Bootstrap before `css/style.css` and `css/admin.css`.
- `firebase-config.js` comes after the Firebase library and before the file that uses it.
- Public pages have `<script>document.documentElement.classList.add("js");</script>` in `<head>`: animations hide content only when JavaScript works, so nothing stays invisible if it fails.

---

## Part 8 — Testing checklist

**Pages & navigation**
- [ ] All four menu links work on every page; current page highlighted
- [ ] Mobile menu opens/closes, closes on Escape and after tapping a link
- [ ] Logo goes Home; footer links and breadcrumbs work
- [ ] No sideways scrolling at 360px, 390px, 768px, 1024px or 1440px
- [ ] Every page shows **Issac Briding, Owner**; no old manager name anywhere
- [ ] Phone and email links show the existing business contact details
- [ ] Back-to-top ↑ appears after scrolling
- [ ] Photos show online; with internet off, local illustrations replace unavailable images
- [ ] Company details match the visiting card on every page

**Animations**
- [ ] Sections reveal while scrolling; header changes on scroll
- [ ] Phone menu opens and links remain keyboard operable
- [ ] System *Reduce motion* preference disables animations

**Contact form**
- [ ] Check required fields and limits without submitting valid data
- [ ] Counter under the message turns orange near 2000 characters
- [ ] Customs Clearance and Transportation enquiry links preselect the matching service
- [ ] Do not submit test data to the live company Firebase project; a valid submit creates a real Firestore record
- [ ] End-to-end submission tests, if needed, must use a separate test Firebase project and non-company test data
- [ ] Map shows NBC Complex; "Open it in Google Maps" works

**Admin**
- [ ] Wrong password → "Wrong email or password." · eye button shows/hides password
- [ ] Opening `admin.html` logged out → sent to login
- [ ] Counts, both charts and the status bar are correct; *View as table* matches the chart
- [ ] New enquiry from another phone appears without refreshing
- [ ] Change status → pop-up message, counts and charts update
- [ ] Filters, search (also by service name), Export CSV (opens in Sheets/Excel)
- [ ] Delete → confirmation box → *Cancel* keeps it, *Delete* removes it
- [ ] A non-admin Firebase user sees "This account is not allowed to view enquiries"
- [ ] Logout → login page

---

## Part 9 — Troubleshooting

| Problem | Cause | Fix |
|---|---|---|
| Plain page, no colours/layout | Wrong CSS path | File must be `css/style.css` |
| Mobile menu doesn't open | `js/script.js` did not load | Check the script path and browser console |
| Freight illustrations instead of photos | Offline, or the online photo did not load | Normal local fallback. To use your own photos, put them in `images/` and change the `src` |
| Blue "not connected yet" message | `firebase-config.js` still has `PASTE_...` or wasn't saved | Part 5F, save, refresh |
| "firebase-config.js is missing or has a typo" | Pasted Firebase's `import`/`const` lines, or a quote/comma missing | Keep only the six values in quotes; compare with the example in 5F |
| Red error: "security settings rejected this enquiry" | Rules not published, or old rules without the *service* field | Re-paste `firestore.rules`, add admin email, **Publish** |
| Red "offline" error with good internet | Firestore database not created (5B) | Create it |
| "Email/Password login is not turned on" | 5C skipped | Enable Email/Password |
| "Wrong email or password" with the right details | User not created / typo | Authentication → Users |
| "This account is not allowed to view enquiries" | Email in Rules ≠ login email | Fix it in Rules (lowercase) → Publish |
| Login says page "opened as a file" | Opened from the Files app (`file://`) | Use Acode ▶ preview or the published site |
| "This web address is not allowed" | Your published domain isn't authorised | Authentication → Settings → Authorized domains → add it |
| Chart area shows "Chart could not load" | Chart.js needs internet | Internet on; *View as table* still works |
| Map stays dark | Offline, or the browser blocked it | Use the "Open it in Google Maps" link |
| Export CSV does nothing in the preview | Some in-app previews block downloads | Open the dashboard in Chrome |
| Changes don't appear | Not saved, or old copy cached | Save in Acode, refresh |
| Links break although names look right | Hidden `.txt` ending or a capital letter | Rename in Acode (long-press → Rename) |

---

## Part 10 — Publish it online (GitHub Pages, free)

1. On github.com create a **public** repository, e.g. `dynamic-logistics`.
2. **Add file → Upload files** → upload everything *inside* the `dynamic-logistics` folder (keep the `css`, `js`, `images` folders) → **Commit**.
3. **Settings → Pages** → *Deploy from a branch* → `main` / `(root)` → **Save**. After a minute: `https://yourname.github.io/dynamic-logistics/`.
4. Firebase → **Authentication → Settings → Authorized domains → Add domain** → `yourname.github.io`.
5. On the phone, open the site in Chrome → ⋮ → **Add to Home screen** — it gets the Dynamic app icon.

**Check with the company before publishing their details publicly.**

---

## Part 11 — How it works (for your report and viva)

```
Visitor's phone                       Firebase (Google cloud)                 Admin's phone
contact.html                                                                  admin-login.html
 1. JavaScript validation                                                        │ login
 2. db.collection("enquiries").add() ──► Firestore "enquiries" ◄── Authentication┘
                                          Security Rules check:
                                          fields, lengths, service, status="new"
 3. success / error message ◄──────────────┤
                                           ├── 4. onSnapshot() live updates ──► admin.html
                                           ◄── 5. update status / delete ──────  (admin email only)
```

- **Client-side validation** (JavaScript) for a good experience **+ server-side validation** (Security Rules) for safety. The form's `maxlength` values and the Rules use the same limits.
- **Firestore** — cloud NoSQL database; each enquiry is a *document* in the `enquiries` *collection*.
- **Firebase Authentication** — admin password never appears in the code.
- **Security Rules** — run on Google's servers, so data stays safe even though the config values are public.
- **Real-time listener (`onSnapshot`)** — dashboard and charts update by themselves.
- **XSS protection** — visitor text is shown with `textContent`, never as HTML. **CSV injection protection** — cells that start like a formula get a `'` in front.
- **Spam trap (honeypot)** — a hidden field people never see; bots fill it, and their message is not saved.
- **Data visualisation** — `countByPeriod()` in `admin-charts.js` groups enquiries by week/month for Chart.js; the status bar is plain HTML/CSS (flexbox).
- **Accessibility** — skip link, landmarks, readable colour contrast (checked with the axe tool), labelled form fields, table view for the chart, reduced-motion support.
- **Progressive enhancement** — the site works without Firebase, without JavaScript animations, and without online photos.

---

## Part 12 — What changed in this final version

**Editorial redesign (October 2026)**
- Public design tokens use warm ivory, graphite, safety orange and muted industrial blue; Manrope and DM Sans have system fallbacks.
- The four public pages have a shared typographic wordmark, active-page navigation, responsive keyboard-accessible mobile menu, quote CTA, editorial content grids and a consistent business footer.
- Home uses a split freight-photo hero, service rows, operations image banner, factual reasons to choose the company and a quote CTA. About covers the actual business focus and owner, Issac Briding. Services presents Customs Clearance and Transportation Services. Contact keeps the existing enquiry form, field limits, validation, spam trap, service preselection, Firestore submission and office map.
- Contact service values previously available in the form remain accepted for compatibility; the Services page promotes only the two core services.
- Form success is shown only when Firestore confirms a save. When Firebase is not configured, the visitor is told that nothing was sent and the form values are retained.
- Local SVG fallback illustrations remain in place for unavailable remote freight photos; public pages no longer require Bootstrap or icon libraries.

**Owner and services update (October 2026)**
- Contact person changed from the manager to the owner, **Issac Briding** (9082721955), in the header buttons, home page, About Us (owner card), Services, Contact Us, footer, 404 page and the Google business details. Every call button uses `tel:9082721955`.
- New services **Customs Clearance** and **Transportation Services**: cards on the Services page and the home page, mentioned on About Us and the Contact page, added to the *Service needed* dropdown, the admin dashboard names (`SERVICE_NAMES`) and `firestore.rules`.
- Home page phone number in the blue strip is now tappable.

**Bugs fixed**
1. White text on turquoise buttons and the active menu item was too faint to read → navy text on turquoise; darker teal for links and the active item.
2. Grey text failed contrast on grey backgrounds; closed enquiries were faded → darker text, no fading.
3. Phone numbers with extra spaces passed the form but were rejected by the Firestore Rules → spaces tidied, length limits matched, `maxlength` added to every field.
4. A broken `firebase-config.js` (e.g. Firebase's `import` lines pasted in) made the form show a fake "not connected" message → now shows a clear error, and admin pages explain the typo.
5. Offline submits waited 15 seconds → fails immediately with an "offline" message; the timer is now cleared after saving.
6. Double tapping *Submit* could start two sends → blocked.
7. Slide-in animations could make phones scroll sideways → side slides only on wide screens.
8. Dashboard cards re-animated on every live update → only on first load.
9. A second login event could start a second live listener → only one ever runs.
10. Delete/alerts used the browser's `confirm()`/`alert()`, which some in-app phone browsers block → Bootstrap confirmation box and pop-up messages.
11. Footer headings broke heading order; pages had no `<main>`; two unnamed `<nav>`s; buttons without `type` → fixed.
12. Jumping to the form hid its heading under the sticky menu → scroll offset added.
13. CSV dates didn't sort and a few formula characters weren't blocked → `2026-10-14 15:30` dates, wider protection.
14. More login error messages explained in plain English (wrong API key, file:// pages, etc.).

**Enhancements**
- *Service needed* dropdown, saved and shown on the dashboard, searchable and in the CSV; *Enquire about …* links on every service card.
- Spam trap, message character counter, offline detection.
- Local ship / container / warehouse illustrations as photo fallbacks (also behind the hero photo).
- Smaller hero photo on phones (faster loading); lazy-loaded images.
- "Add to Home screen" app icon (`manifest.json`), browser bar colour, share-preview text, Google business details, 404 page.
- Skip-to-content link and visible keyboard focus.

**Redesign verification:** local HTTP server returned the public pages; JavaScript syntax check passed; local asset references exist; browser checks found no JavaScript page errors and no horizontal overflow at 360, 390, 768, 1024 or 1440 pixels; mobile menu open/Escape close and service preselection were verified. No valid enquiry was submitted. Firebase is still unconfigured here, so live Firestore delivery and admin workflows were not tested.

**Still to come (later phase):** shipment tracking.

---

## Part 13 — Before you submit
- Customs Clearance and Transportation Services are confirmed by the owner. Ask Mr. Issac Briding whether the other service cards (Sea Shipping, Container Cargo, Logistics Planning, Cargo Handling) are services they really offer, and edit or remove them in `services.html`. If you rename a service, also change the dropdown in `contact.html`, `SERVICE_NAMES` in `js/admin.js`, and the list in `firestore.rules`.
- If they give you their real logo, save it in `images/` and change `logo.svg` in the pages.
- Ask them to confirm the map pin.
- No history, clients, years of experience or certifications have been invented — add them only if the company provides them.
- Automatic email alerts for new enquiries are not included (they need Firebase's paid plan or a third-party email service); the admin checks the dashboard instead.
