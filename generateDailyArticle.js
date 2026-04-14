// 1. Define affiliate config at the top
const SkyscannerConfig = {
  baseUrl: "https://partners.skyscanner.net/...",
  aid: "YOUR-SKYSCANNER-AID", // replace with your ID
  utmSource: "skydeals",
  utmMedium: "web",
  utmCampaign: "daily-article",
};

// 2. Build Skyscanner URL with your params
function buildSkyscannerUrl({ origin, destination, outboundDate, returnDate }) {
  const params = new URLSearchParams({
    aid: SkyscannerConfig.aid,
    origin,
    destination,
    outboundDate: outboundDate || "",
    returnDate: returnDate || "",
    utm_source: SkyscannerConfig.utmSource,
    utm_medium: SkyscannerConfig.utmMedium,
    utm_campaign: SkyscannerConfig.utmCampaign,
  });
  return `${SkyscannerConfig.baseUrl}?${params.toString()}`;
}

// 3. Inject Skyscanner link into a target element
function injectSkyscannerLink({ selector = "a[data-skydeal]", origin, destination, outboundDate, returnDate }) {
  const links = document.querySelectorAll(selector);
  links.forEach((link) => {
    const url = buildSkyscannerUrl({ origin, destination, outboundDate, returnDate });
    link.href = url;
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener sponsored");
  });
}

// 4. Hook into your existing generateDailyArticle flow
//   (example; adapt to your current function names)
function generateDailyArticle(rawContent, metadata) {
  // ... your existing generate logic ...

  // AFTER your DOM/content is built, inject Skyscanner
  injectSkyscannerLink({
    selector: "a[data-skydeal]",
    origin: metadata.origin || "anywhere",
    destination: metadata.destination || "anywhere",
    outboundDate: metadata.outboundDate,
    returnDate: metadata.returnDate,
  });

  return finalHtml;
}

// 5. Export / entry point (Node.js context, if run in Actions)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    generateDailyArticle,
    buildSkyscannerUrl,
    injectSkyscannerLink,
  };
}
