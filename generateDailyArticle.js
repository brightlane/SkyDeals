// generateDailyArticle.js

const fs = require("fs");
const path = require("path");

// --- 1. Skyscanner affiliate config ---
const SkyscannerConfig = {
  baseUrl: "https://partners.skyscanner.net/...", // replace with your real Skyscanner partner URL
  aid: "YOUR-SKYSCANNER-AID",                    // your personal affiliate ID
  utmSource: "skydeals",
  utmMedium: "web",
  utmCampaign: "daily-article",
};

// --- 2. Build Skyscanner URL from article metadata ---
function buildSkyscannerUrl({ origin, destination, airline, outboundDate, returnDate }) {
  const params = new URLSearchParams();

  if (origin)      params.append("origin", origin);
  if (destination) params.append("destination", destination);
  if (airline)     params.append("airline", airline);
  if (outboundDate) params.append("outboundDate", outboundDate);
  if (returnDate)  params.append("returnDate", returnDate);

  params.append("aid", SkyscannerConfig.aid);
  params.append("utm_source", SkyscannerConfig.utmSource);
  params.append("utm_medium", SkyscannerConfig.utmMedium);
  params.append("utm_campaign", SkyscannerConfig.utmcampaign);

  return `${SkyscannerConfig.baseUrl}?${params.toString()}`;
}

// --- 3. Inject Skyscanner hook into generated HTML ---
function injectSkyscannerHook(html, metadata) {
  const origin    = metadata.origin || "anywhere";
  const destination = metadata.destination || "anywhere";
  const airline   = metadata.airline || "any";

  const skydealAnchor = `<a href="#" data-skydeal data-origin="${origin}" data-destination="${destination}" data-airline="${airline}">`;

  // Replace a placeholder in your template
  const withHook = html
    .replace(/<!-- SKYDEAL_HOOK -->/g, skydealAnchor + "Find the cheapest flights on Skyscanner</a>")
    .replace(/<!-- SKYDEAL_HOOK_BUTTON -->/g, skydealAnchor + "Check live prices on Skyscanner</a>");

  return withHook;
}

// --- 4. Example generateDailyArticle that includes your article + Skyscanner link ---
function generateDailyArticle({ title, content, metadata }) {
  // Example HTML template (you can adapt this to your real template)
  const articleHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <meta name="description" content="${title}" />
</head>
<body>
  <h1>${title}</h1>
  <div class="article-body">
    ${content}
  </div>
  <div class="skydeal-cta">
    <!-- SKYDEAL_HOOK_BUTTON -->
  </div>
</body>
</html>`;

  // Inject Skyscanner hook into HTML
  const finalHtml = injectSkyscannerHook(articleHtml, metadata);

  return finalHtml;
}

// --- 5. Expose to Node.js / GitHub Actions ---
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    generateDailyArticle,
    buildSkyscannerUrl,
    injectSkyscannerHook,
  };
}
