#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// ✅ YOUR AFFILIATE URL (kept intact)
const AFFILIATE_URL =
  "https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885";

class FlightDealGenerator {
  constructor() {
    this.outputDir = path.join(__dirname, "output");
    this.pagesDir = path.join(this.outputDir, "deals");

    this.routes = [
      { from: "JFK", to: "LON" },
      { from: "LAX", to: "PAR" },
      { from: "MIA", to: "DXB" },
      { from: "SFO", to: "TOK" },
      { from: "ORD", to: "ROM" }
    ];
  }

  run() {
    console.log("✈️ Generating flight deals...");

    fs.mkdirSync(this.pagesDir, { recursive: true });

    let count = 0;

    for (const route of this.routes) {
      const price = this.generatePrice();

      const html = this.buildPage(route, price);

      const filename = `${route.from}-${route.to}.html`;
      const filepath = path.join(this.pagesDir, filename);

      fs.writeFileSync(filepath, html);

      count++;
    }

    console.log(`✅ Generated ${count} pages in ${this.pagesDir}`);
  }

  generatePrice() {
    return Math.floor(120 + Math.random() * 400);
  }

  buildPage(route, price) {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${route.from} → ${route.to} Flight Deal</title>
</head>

<body style="font-family: Arial; padding: 40px;">

  <h1>✈️ Flight Deal: ${route.from} → ${route.to}</h1>

  <p><strong>Price:</strong> $${price}</p>

  <p>Find the best deal now:</p>

  <!-- ✅ AFFILIATE LINK USED HERE -->
  <a href="${AFFILIATE_URL}" target="_blank"
     style="background:#ff6b35;color:white;padding:15px 25px;text-decoration:none;">
     Book Flight
  </a>

</body>
</html>
`;
  }
}

new FlightDealGenerator().run();
