#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// ===============================
// 🔗 YOUR AFFILIATE URL (DO NOT CHANGE)
// ===============================
const AFFILIATE_URL =
  "https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885";

// ===============================
// 🚀 START SCRIPT
// ===============================
console.log("✈️ Flight Deal Generator Starting...");

// ===============================
// 📁 OUTPUT FOLDERS
// ===============================
const outputDir = path.join(__dirname, "output");
const pagesDir = path.join(outputDir, "deals");

// Create folders if they don't exist
fs.mkdirSync(pagesDir, { recursive: true });

// ===============================
// 🌍 FLIGHT ROUTES (expand anytime)
// ===============================
const routes = [
  { from: "JFK", to: "LON" },
  { from: "LAX", to: "PAR" },
  { from: "MIA", to: "DXB" },
  { from: "SFO", to: "TOK" },
  { from: "ORD", to: "ROM" },
  { from: "DFW", to: "BER" },
  { from: "ATL", to: "MAD" },
  { from: "SEA", to: "SIN" },
  { from: "BOS", to: "FRA" },
  { from: "LAS", to: "AMS" }
];

// ===============================
// 💰 PRICE GENERATOR
// ===============================
function generatePrice() {
  return Math.floor(120 + Math.random() * 600);
}

// ===============================
// 📄 HTML PAGE BUILDER
// ===============================
function buildHTML(from, to, price) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${from} → ${to} Cheap Flights</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body style="font-family:Arial;background:#f4f4f4;padding:40px;">

  <div style="max-width:700px;margin:auto;background:white;padding:30px;border-radius:10px;">

    <h1>✈️ Flight Deal</h1>

    <h2>${from} → ${to}</h2>

    <p style="font-size:20px;">
      💰 Price: <strong>$${price}</strong>
    </p>

    <p>Book now before prices increase!</p>

    <!-- ========================= -->
    <!-- 🔥 AFFILIATE BUTTON -->
    <!-- ========================= -->
    <a href="${AFFILIATE_URL}" target="_blank"
       style="
         display:inline-block;
         background:#ff6b35;
         color:white;
         padding:15px 25px;
         text-decoration:none;
         border-radius:6px;
         font-size:18px;
         margin-top:20px;
       ">
       ✈️ Book Flight Now
    </a>

    <hr style="margin:30px 0;">

    <p style="font-size:12px;color:#777;">
      Prices are estimates and may change. Affiliate link powered by travel deals system.
    </p>

  </div>

</body>
</html>
`;
}

// ===============================
// 🔄 GENERATE ALL PAGES
// ===============================
let count = 0;

for (const route of routes) {
  const price = generatePrice();

  const html = buildHTML(route.from, route.to, price);

  const filename = `${route.from}-${route.to}.html`;

  fs.writeFileSync(
    path.join(pagesDir, filename),
    html
  );

  console.log(`✅ Created: ${filename}`);

  count++;
}

// ===============================
// 🎉 DONE
// ===============================
console.log(`\n🚀 DONE: ${count} flight deal pages generated`);
console.log(`📂 Output folder: ${pagesDir}`);
console.log(`🔗 Affiliate link active in all pages`);
