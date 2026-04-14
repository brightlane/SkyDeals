// generateDailyArticle.js

const fs = require("fs");
const path = require("path");

// THE MASTER AFFILIATE LINK — YOU SAID: DO NOT FORGET IT
const SKYDEALS_AFFILIATE_URL = "https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885";

// --- 1. Build article HTML around flights + destinations + airlines ---
function generateDailyArticle({ title, intro, body, metadata }) {
  const origin = metadata.origin || "anywhere";
  const destination = metadata.destination || "anywhere";
  const airline = metadata.airline || "multiple airlines";
  const days = metadata.days || "7–14 days";
  const month = metadata.month || "late summer";

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <meta name="description" content="Explore the best ${origin} to ${destination} flight deals and when to book for the lowest fares." />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 900px;
      margin: 0 auto;
      padding: 1rem 1.2rem;
    }
    h1, h2, h3 {
      margin-top: 1.8rem;
      margin-bottom: 0.6rem;
    }
    .hero {
      text-align: center;
      padding: 1rem 0;
      border-bottom: 1px solid #eee;
      margin-bottom: 2rem;
    }
    .hero p {
      font-size: 1.1rem;
      color: #555;
    }
    .skydeal-cta {
      margin: 1.5rem 0;
      padding: 1rem;
      background: #f8f9ff;
      border: 1px solid #e0e0ff;
      border-radius: 8px;
      text-align: center;
      font-weight: 600;
    }
    .skydeal-cta a {
      display: inline-block;
      padding: 0.8rem 1.4rem;
      text-decoration: none;
      color: #fff;
      background: #ff5a5f;
      border-radius: 6px;
      font-weight: 600;
      transition: background 0.2s ease;
    }
    .skydeal-cta a:hover {
      background: #e04044;
    }
  </style>
</head>
<body>

  <div class="hero">
    <h1>${title}</h1>
    <p>${intro}</p>
  </div>

  <!-- Main Skyscanner‑style CTA (top of article) -->
  <div class="skydeal-cta">
    <a href="#" data-skydeal data-origin="${origin}" data-destination="${destination}">
      Find the cheapest flights from ${origin} to ${destination}
    </a>
  </div>

  <div class="article-body">
    ${body}
  </div>

  <!-- Footer‑style CTA -->
  <div class="skydeal-cta">
    <a href="#" data-skydeal data-origin="${origin}" data-destination="${destination}">
      Ready to book? Click here for the best deals
    </a>
  </div>

  <!-- Footer -->
  <footer style="margin-top: 3rem; padding: 1rem 0; border-top: 1px solid #eee; text-align: center; font-size: 0.9rem; color: #777;">
    © 2026 SkyDeals • Flight deals powered by 
    <a href="#" data-skydeal data-origin="anywhere" data-destination="anywhere">
      special flight‑deals offers
    </a>.
  </footer>

  <!-- JS that converts data-skydeal links into your real affiliate URL -->
  <script>
    const SKYDEALS_AFFILIATE_URL = "${SKYDEALS_AFFILIATE_URL}";

    function injectAffiliateLinks() {
      document.querySelectorAll("a[data-skydeal]").forEach((link) => {
        link.href = SKYDEALS_AFFILIATE_URL;
        link.target = "_blank";
        link.rel = "noopener sponsored";
      });
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", injectAffiliateLinks);
    } else {
      injectAffiliateLinks();
    }
  </script>
</body>
</html>`;

  return html;
}

// --- 2. Expose to Node.js / GitHub Actions ---
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    generateDailyArticle,
  };
}
