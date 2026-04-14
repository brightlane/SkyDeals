// scripts/generateDailyArticle.js

const fs = require("fs");
const path = require("path");

// 1. Config
const OUTPUT_DIR = path.join(__dirname, "../docs");        // adjust to your static output
const BASE_URL = "https://skydeals.example.com";          // your domain

// 2. Routes to generate (example batch; you can grow this list)
const ROUTES = [
  { origin: "NYC", destination: "MIA", route: "nyc-mia" },
  { origin: "PHL", destination: "MCO", route: "phl-mco" },
  { origin: "PHL", destination: "MIA", route: "phl-mia" },
  { origin: "NYC", destination: "MCO", route: "nyc-mco" },
  { origin: "anywhere", destination: "MCO", route: "anywhere-to-orlando" },
  { origin: "anywhere", destination: "MIA", route: "anywhere-to-miami" },
];

// 3. Title / keyword templates (freshness engine)
const TITLE_TEMPLATES = [
  "{origin} to {destination} deals",
  "cheap flights from {origin} to {destination}",
  "{origin} {destination} last minute deals",
  "Skyscanner‑style deals {origin} to {destination}",
  "best time to book flights {origin} to {destination}",
  "Skyscanner alerts {origin} to {destination}",
  "{origin} to {destination} on a budget",
  "{origin} to {destination} for families",
  "{origin} to {destination} senior deals",
  "{origin} to {destination} next week",
];

function randomTitle(origin, dest) {
  const temp = TITLE_TEMPLATES[Math.floor(Math.random() * TITLE_TEMPLATES.length)];
  return temp
    .replace("{origin}", origin)
    .replace("{destination}", dest);
}

// 4. Build one page HTML
function buildPageHtml(routeObj) {
  const { origin, destination, route } = routeObj;

  const title = randomTitle(origin, destination);
  const filename = `${route}.html`;
  const fileUrl = `${BASE_URL}/${route}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${title} | SkyDeals</title>
  <meta name="description" content="Get the latest Skyscanner‑style deals between ${origin} and ${destination}." />
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  <nav>
    <a href="/index.html">Home</a>
    <a href="/blog.html">Blog</a>
  </nav>

  <main>
    <h1>${title}</h1>
    <p>
      SkyDeals finds the best Skyscanner‑style deals for trips from <strong>${origin}</strong> to <strong>${destination}</strong>.
      Set alerts, compare prices, and book at the right time using our Skyscanner‑style tools.
    </p>

    <div>
      <a
        href="https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885&utm_source=skydeals&utm_medium=web&utm_campaign=${route}"
        data-skydeal
        data-origin="${origin}"
        data-destination="${destination}"
        target="_blank"
        rel="noopener sponsored"
      >
        Check today’s Skyscanner‑style deals from ${origin} to ${destination}
      </a>
    </div>

    <p>
      Remember to check <strong>Skyscanner</strong> for price calendars, alerts, and last‑minute opportunities
      on your route from ${origin} to ${destination}.
    </p>
  </main>

  <footer>
    <p>&copy; 2026 SkyDeals. All rights reserved.</p>
  </footer>

  <!-- universal keyword injector (you can minify this later) -->
  <script>
    (function () {
      "use strict";
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
      ];

      function pickFreshKeyword() {
        return KEYWORD_POOL[Math.floor(Math.random() * KEYWORD_POOL.length)];
      }

      const LOCATION_PATTERN = /(?:[A-Z][a-z]+(?:\\s+[A-Z][a-z]+)*|[A-Z]{2,3}|[0-9]{3,5})(?:\\s*(?:to|from|towards|to-from|for|via|between|→|–|-)\\s*(?:[A-Z][a-z]+(?:\\s+[A-Z][a-z]+)*|[A-Z]{2,3}|[0-9]{3,5}))?/g;
      const AIRLINE_PATTERN = /(?:airlines?|airline|carrier|skyscanner|kayak|google flights|flight search|cheap flights?|last minute flights?|deals?|sale|promo|discount|booking|trip|vacation|getaway|escape|break|holiday|spring break|summer deals|winter sun|family trip|senior travel|overnight|layover|connecting flights?|one‑way|round‑trip|direct flight|non‑stop flight|flight prices?)/gi;

      function normalizePlaceholder(text, origin, dest) {
        return text
          .replace(/\{LOCATION\}/g, origin.trim())
          .replace(/\{DESTINATION\}/g, dest.trim());
      }

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
        while ((node = walker.nextNode())) nodes.push(node);

        let origin = "any city";
        let dest = "anywhere";
        const locationMatches = nodes
          .map((n) => n.nodeValue.match(LOCATION_PATTERN))
          .filter((x) => x)
          .flat();
        if (locationMatches.length > 0) {
          const first = locationMatches[0];
          const parts = first.split(/[–\\s-→]/).filter((s) => s.trim());
          origin = parts[0] || "any city";
          dest = parts.slice(-1)[0] || "anywhere";
        }

        const rawKeyword = pickFreshKeyword();
        const keyword = normalizePlaceholder(rawKeyword, origin, dest);

        nodes.forEach((textNode) => {
          const text = textNode.nodeValue;
          if (
            text.includes("http://") ||
            text.includes("https://") ||
            text.includes("aff_c") ||
            text.includes("convert.ctypy.com")
          )
            return;

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

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", walkAndInjectKeywords);
      } else {
        walkAndInjectKeywords();
      }
    })();
  </script>
</body>
</html>
`.trim();
}

// 5. Generate all pages
function generatePages() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  ROUTES.forEach((routeObj) => {
    const filename = `${routeObj.route}.html`;
    const filepath = path.join(OUTPUT_DIR, filename);
    const html = buildPageHtml(routeObj);

    fs.writeFileSync(filepath, html);
    console.log(`✓ Generated ${filepath}`);
  });

  console.log(`\n✅ All pages generated in ${OUTPUT_DIR}`);
}

// 6. Run if executed directly
if (require.main === module) {
  generatePages();
}
