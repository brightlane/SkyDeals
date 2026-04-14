// scripts/cross-linker.js

const fs = require("fs").promises;
const path = require("path");

// --- 1. Define your main pages and their keywords ---
const PAGES = [
  {
    file: "index.html",
    title: "Cheap Flights & Flight Deals",
    slug: "home",
    keywords: ["flights", "cheap flights", "flight deals", "find the cheapest flights"],
  },
  {
    file: "best-time-to-book-flights.html",
    title: "Best Time to Book Flights • Cheap Flight Hacks",
    slug: "best-time-to-book",
    keywords: ["best time to book flights", "when to book a flight", "booking time", "flight timing"],
  },
  {
    file: "cheap-flights-new-york-miami.html",
    title: "Cheap Flights from New York to Miami",
    slug: "new-york-miami",
    keywords: ["nyc to miami", "new york to miami", "nyc → miami", "miami flights from new york"],
  },
  {
    file: "cheap-flights-philadelphia-to-orlando.html",
    title: "Cheap Flights from Philadelphia to Orlando",
    slug: "philadelphia-orlando",
    keywords: ["phl to orlando", "philadelphia to orlando", "phl → mco", "orlando from philadelphia"],
  },
  {
    file: "cheap-international-flights.htmls",
    title: "Cheap International Flights Worldwide",
    slug: "international-flights",
    keywords: [
      "cheap international flights",
      "international flights",
      "worldwide flights",
      "cheap flights worldwide",
    ],
  },
  {
    file: "cheap-flights-faq.html",
    title: "Cheap Flights FAQ • Flight Deals Help",
    slug: "faq",
    keywords: [
      "faq",
      "frequently asked questions",
      "cheap flights faq",
      "flight deals help",
    ],
  },
  {
    file: "blog.html",
    title: "Flight Deals Blog • SkyDeals",
    slug: "blog",
    keywords: ["blog", "articles", "flight deals blog"],
  },
];

// --- 2. Function to escape regex special chars ---
function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// --- 3. Inject cross‑links into a given HTML text ---
function injectCrossLinks(html) {
  let newHtml = html;

  PAGES.forEach((targetPage) => {
    // Build a link to this page
    const link = `<a href="${targetPage.file}">${targetPage.title}</a>`;

    // For each keyword, try to wrap it once with this link
    targetPage.keywords.forEach((keyword) => {
      const escaped = escapeRegex(keyword);
      const regex = new RegExp(`\\b${escaped}\\b`, "gi"); // only whole words

      // Only replace the first match to avoid spamming
      if (newHtml.match(regex)) {
        newHtml = newHtml.replace(regex, (match) => {
          return `<a href="${targetPage.file}">${match}</a>`;
        });
      }
    });
  });

  return newHtml;
}

// --- 4. Process one file ---
async function processFile(filePath) {
  const content = await fs.readFile(filePath, "utf8");

  // Only touch HTML files
  if (!content.includes("<html")) return;

  const newContent = injectCrossLinks(content);

  if (newContent !== content) {
    console.log(`✅ Cross‑linked: ${filePath}`);
    await fs.writeFile(filePath, newContent, "utf8");
  }
}

// --- 5. Run on all HTML files in the root ---
async function runCrossLinker(rootDir = ".") {
  const files = await fs.readdir(rootDir);
  for (const file of files) {
    if (file.endsWith(".html")) {
      await processFile(path.join(rootDir, file));
    }
  }
  console.log("✅ Cross‑linking complete.");
}

// --- 6. Run when node scripts/cross-linker.js is called ---
if (require.main === module) {
  (async () => {
    try {
      await runCrossLinker(".");
    } catch (err) {
      console.error("Cross‑linker error:", err);
    }
  })();
}

module.exports = { injectCrossLinks, runCrossLinker };
