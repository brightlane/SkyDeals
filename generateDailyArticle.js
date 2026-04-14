// generateDailyArticle.js

const fs = require("fs");
const path = require("path");

// --- 1. Skyscanner affiliate config (you'll fill in your real link below) ---
const SkyscannerConfig = {
  baseUrl: "https://partners.skyscanner.net/...", // ⚠️ replace with your exact Skyscanner partner URL
  aid: "YOUR-SKYSCANNER-AID",                    // ⚠️ replace with your real affiliate ID (e.g., 12345)
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

// --- 3. Inject Skyscanner hook into generated HTML (button + inline link) ---
function injectSkyscannerHook(html, metadata) {
  const origin      = metadata.origin      || "anywhere";
  const destination = metadata.destination || "anywhere";
  const airline     = metadata.airline     || "any";

  const skydealAnchor = `<a href="#" data-skydeal data-origin="${origin}" data-destination="${destination}" data-airline="${airline}" data-placement="top">`;

  // --- Top CTA button (high‑click zone) ---
  const skydealButton = `
<div class="skydeal-cta skydeal-top-cta">
  ${skydealAnchor}Find the cheapest flights from ${origin} to ${destination} on Skyscanner</a>
</div>
`;

  // --- Inline text link (natural read‑through) ---
  const skydealInlineLink = `
<a href="#" data-skydeal data-origin="${origin}" data-destination="${destination}" data-airline="${airline}" data-placement="inline">
  Skyscanner
</a>
`;

  const withHook = html
    // Top CTA button
    .replace(/<!-- SKYDEAL_BUTTON -->/g, skydealButton)
    // Inline text link
    .replace(/<!-- SKYDEAL_INLINE -->/g, skydealInlineLink);

  return withHook;
}

// --- 4. Main article generator -- use this in your GitHub Actions job ---
function generateDailyArticle({ title, content, metadata }) {
  // Example article template (you can adapt this to your real layout)
  const articleHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <meta name="description" content="Cheap flights and deals for ${title}" />
</head>
<body>
  <h1>${title}</h1>
  <div class="article-body">
    ${content}
  </div>
  <!-- SKYDEAL_BUTTON -->
  <p>
    Ready to book? Compare prices with <!-- SKYDEAL_INLINE --> now.
  </p>
</body>
</html>`;

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
