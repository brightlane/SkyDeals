// generateSitemap.js

const fs = require("fs");
const path = require("path");

const BASE_URL = "https://skydeals.example.com";   // change to your domain
const OUTPUT_DIR = path.join(__dirname, "docs");

// 1. Core origin/destination hubs (same as in generateDailyArticle.js)
const ORIGINS = [
  "NYC",   "PHL",   "EWR",   "LGA",   "JFK",   "BOS",   "WAS",
  "ATL",   "ORD",   "LAX",   "SFO",   "DFW",   "DEN",   "SEA",
];

const DESTINATIONS = [
  "MIA",   "MCO",   "LAS",   "LAX",   "SFO",   "SEA",   "ATL",
  "ORD",   "DFW",   "DEN",   "PDX",   "SAN",   "BOS",   "WAS",
];

// 2. Generate 5,000 unique route slugs (same logic)
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

// 3. Build sitemap.xml
function buildSitemap() {
  const now = new Date().toISOString().split("T")[0];
  const urls = ROUTES.map(([routeId]) => {
    const loc = `${BASE_URL}/${routeId}`;
    return `<url><loc>${loc}</loc><lastmod>${now}</lastmod><changefreq>daily</changefreq><priority>0.8</priority></url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`.trim();

  const file = path.join(__dirname, "sitemap.xml");
  fs.writeFileSync(file, xml);
  console.log(`✓ Generated sitemap.xml`);
}

if (require.main === module) {
  buildSitemap();
}
