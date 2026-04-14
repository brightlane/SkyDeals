// scripts/generateDailyArticle.js

const fs = require("fs");
const path = require("path");

// 1. Output directory (where static pages are served)
const OUTPUT_DIR = path.join(__dirname, "../docs");

// 2. Simple route list (you can grow this later)
const ROUTES = [
  ["nyc-mia", "NYC", "MIA"],
  ["phl-mco", "PHL", "MCO"],
  ["phl-mia", "PHL", "MIA"],
  ["nyc-mco", "NYC", "MCO"],
  ["anywhere-to-miami", "anywhere", "MIA"],
  ["anywhere-to-orlando", "anywhere", "MCO"],
];

// 3. Build one page
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
</body>
</html>
`.trim();

  const file = path.join(OUTPUT_DIR, `${routeId}.html`);

  // Ensure docs/ directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  fs.writeFileSync(file, html);
  console.log(`✓ Generated ${file}`);
}

// 4. Run only when executed directly (node ./scripts/generateDailyArticle.js)
if (require.main === module) {
  ROUTES.forEach(([routeId, origin, destination]) => {
    buildPage(routeId, origin, destination);
  });
  console.log("✅ All pages generated.");
}
