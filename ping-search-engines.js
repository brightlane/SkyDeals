// ping-search-engines.js

const { URL } = require("url");

// The pages you want to ping (your main index + any key landing page / sitemap)
const PAGES_TO_PING = [
  "https://brightlane.github.io/SkyDeals/",                          // index
  "https://brightlane.github.io/SkyDeals/sitemap.xml",               // sitemap
  // Add other key pages if you want
];

// --- 1. Ping Google (Indexing API / ping variant) ---
async function pingGoogle(pageUrl) {
  const feedUrl = encodeURIComponent(pageUrl);
  const pingUrl = `https://www.google.com/webmasters/tools/ping?sitemap=${feedUrl}`;

  try {
    const res = await fetch(pingUrl);
    console.log(`Google ping (${pageUrl}) -> Status:`, res.status);
  } catch (err) {
    console.error("Google ping error:", err.message);
  }
}

// --- 2. Ping Bing (Webmaster Tools style) ---
async function pingBing(pageUrl) {
  const feedUrl = encodeURIComponent(pageUrl);
  const pingUrl = `https://www.bing.com/webmaster/ping.aspx?siteMap=${feedUrl}`;

  try {
    const res = await fetch(pingUrl);
    console.log(`Bing ping (${pageUrl}) -> Status:`, res.status);
  } catch (err) {
    console.error("Bing ping error:", err.message);
  }
}

// --- 3. Optional: ping via sitemap (if you want to ping only sitemap) ---
async function pingSearchEngines(pages = PAGES_TO_PING) {
  for (const pageUrl of pages) {
    await pingGoogle(pageUrl);
    await pingBing(pageUrl);
    await new Promise((r) => setTimeout(r, 1000)); // 1s delay between pages
  }
  console.log("✅ All pings sent.");
}

// --- 4. Run when node ping-search-engines.js is called ---
if (require.main === module) {
  (async () => {
    await pingSearchEngines();
  })();
}

// Export so you could call this from another file if needed
module.exports = { pingSearchEngines };
