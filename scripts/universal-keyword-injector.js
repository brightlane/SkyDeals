// scripts/universal-keyword-injector.js

(function () {
  "use strict";

  // 1. Define your universal keyword pool (extend as you want)
  const KEYWORD_POOL = [
    "cheap flights from {LOCATION} to {DESTINATION}",
    "last minute deals {LOCATION} to {DESTINATION}",
    "Skyscanner deals {LOCATION} to {DESTINATION}",
    "Skyscanner price calendar {LOCATION} to {DESTINATION}",
    "Skyscanner alerts for {LOCATION} {DESTINATION}",
    "best time to book flights {LOCATION} to {DESTINATION}",
    "Skyscanner hack for {LOCATION} to {DESTINATION}",
    "{LOCATION} to {DESTINATION} on a budget",
    "{LOCATION} to {DESTINATION} for families",
    "{LOCATION} to {DESTINATION} senior deals",
    "{LOCATION} to {DESTINATION} next week",
    "{LOCATION} to {DESTINATION} this weekend",
    "cheap flights {LOCATION} to {DESTINATION} this month",
    "Skyscanner deals {LOCATION} to {DESTINATION} this season",
    "{LOCATION} to {DESTINATION} holiday deals",
  ];

  // 2. Pick one fresh keyword per page load
  function pickFreshKeyword() {
    return KEYWORD_POOL[Math.floor(Math.random() * KEYWORD_POOL.length)];
  }

  // 3. Match location‑style patterns (cities, countries, zipcodes, territories, continents)
  const LOCATION_PATTERN = /(?:[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*|[A-Z]{2,3}|[0-9]{3,5})(?:\s*(?:to|from|towards|to-from|for|via|between|→|–|-)\s*(?:[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*|[A-Z]{2,3}|[0-9]{3,5}))?/g;

  // 4. Match airline / flight / travel‑style phrases
  const AIRLINE_PATTERN = /(?:airlines?|airline|carrier|skyscanner|kayak|google flights|flight search|cheap flights?|last minute flights?|deals?|sale|promo|discount|booking|trip|vacation|getaway|escape|break|holiday|spring break|summer deals|winter sun|family trip|senior travel|overnight|layover|connecting flights?|one‑way|round‑trip|direct flight|non‑stop flight|flight prices?)/gi;

  // 5. Normalize placeholders with actual detected locations
  function normalizePlaceholder(text, origin, dest) {
    return text
      .replace(/\{LOCATION\}/g, origin.trim())
      .replace(/\{DESTINATION\}/g, dest.trim());
  }

  // 6. Walk all visible text nodes (skip script/style/noscript)
  function walkAndInjectKeywords() {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          if (
            node.parentElement &&
            ["SCRIPT", "STYLE", "NOSCRIPT", "CODE"].includes(
              node.parentElement.tagName
            )
          ) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        },
      }
    );

    const nodes = [];
    let node;
    while ((node = walker.nextNode())) {
      nodes.push(node);
    }

    // Find the first location‑style phrase to anchor LOCATION/DESTINATION
    let origin = "any city";
    let dest = "anywhere";

    const locationMatches = nodes
      .map((n) => n.nodeValue.match(LOCATION_PATTERN))
      .filter((x) => x)
      .flat();

    if (locationMatches.length > 0) {
      const first = locationMatches[0];
      const parts = first.split(/[–\s-→]/).filter((s) => s.trim());
      origin = parts[0] || "any city";
      dest = parts.slice(-1)[0] || "anywhere";
    }

    // Pick one fresh keyword for this page
    const rawKeyword = pickFreshKeyword();
    const keyword = normalizePlaceholder(rawKeyword, origin, dest);

    // Inject keyword into nodes that mention location or flight‑style terms
    nodes.forEach((textNode) => {
      const text = textNode.nodeValue;

      // Skip text that looks like URLs
      if (
        text.includes("http://") ||
        text.includes("https://") ||
        text.includes("aff_c") ||
        text.includes("convert.ctypy.com")
      )
        return;

      // If text contains location‑style or flight‑style phrases
      if (
        text.match(LOCATION_PATTERN) ||
        text.match(AIRLINE_PATTERN)
      ) {
        if (!text.includes(keyword)) {
          textNode.nodeValue = text + " — " + keyword;
        }
      }
    });
  }

  // 7. Run on page load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", walkAndInjectKeywords);
  } else {
    walkAndInjectKeywords();
  }
})();
