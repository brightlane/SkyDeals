// generateDailyArticle.js

const fs = require("fs");
const path = require("path");

// 1. Output directory (where static pages are served)
const OUTPUT_DIR = path.join(__dirname, "docs");

// 2. Core origin/destination hubs
const ORIGINS = [
  "NYC",   "PHL",   "EWR",   "LGA",   "JFK",   "BOS",   "WAS",
  "ATL",   "ORD",   "LAX",   "SFO",   "DFW",   "DEN",   "SEA",
];

const DESTINATIONS = [
  "MIA",   "MCO",   "LAS",   "LAX",   "SFO",   "SEA",   "ATL",
  "ORD",   "DFW",   "DEN",   "PDX",   "SAN",   "BOS",   "WAS",
];

// 3. Generate ~5,000 unique route slugs
function generateRoutes() {
  const routes = [];

  for (let i = 0; i < 5000; i++) {
    const origin = ORIGINS[Math.floor(Math.random() * ORIGINS.length)];
    const dest = DESTINATIONS[Math.floor(Math.random() * DESTINATIONS.length)];
    const routeId = `${origin.toLowerCase()}-${dest.toLowerCase()}-${i % 100}`;
    routes.push([routeId, origin, dest]);
  }

  const seen = new Set();
  return routes.filter(([id]) => {
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

const ROUTES = generateRoutes();

// 4. Build one page
function buildPage(routeId, origin, destination) {
  const title = `${origin} to ${destination} deals`;
  const href = `https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885&utm_source=skydeals&utm_medium=web&utm_campaign=${routeId}`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <meta name="description" content="Find Skyscanner‑style deals for flights from ${origin} to ${destination}." />
</head>
<body>
  <nav>
    <a href="/index.html">Home</a>
    <a href="/blog.html">Blog</a>
  </nav>

  <main>
    <h1>${title}</h1>
    <p>
      Get the latest Skyscanner‑style deals for flights from <strong>${origin}</strong> to <strong>${destination}</strong>.
    </p>

    <div>
      <a
        href="${href}"
        data-skydeal
        data-origin="${origin}"
        data-destination="${destination}"
        target="_blank"
        rel="noopener sponsored"
      >
        View Skyscanner‑style deals
      </a>
    </div>
  </main>

  <footer>
    <p>&copy; 2026 SkyDeals. All rights reserved.</p>
  </footer>
</body>
</html>
`.trim();

  const file = path.join(OUTPUT_DIR, `${routeId}.html`);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  fs.writeFileSync(file, html);
  console.log(`✓ Generated ${file}`);
}

// 5. Run only when executed directly
if (require.main === module) {
  ROUTES.forEach(([routeId, origin, destination]) => {
    buildPage(routeId, origin, destination);
  });
  console.log(`✅ Generated ${ROUTES.length} pages.`);
}
