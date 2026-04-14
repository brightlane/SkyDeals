// one-line-title-booster.js

/**
 * Simple title booster for flight‑deals pages.
 * Keeps your affiliate link intact; only enhances readability and intent.
 */

function boostTitle() {
  const origin      = document.querySelector("[data-origin]")?.getAttribute("data-origin") || "anywhere";
  const destination = document.querySelector("[data-destination]")?.getAttribute("data-destination") || "anywhere";
  const bodyClass   = document.body.className;

  // --- 1. Cheap flights route page (e.g., NYC → MIA) ---
  if (bodyClass.includes("route-page")) {
    if (origin !== "anywhere" && destination !== "anywhere") {
      document.title = `Cheap Flights from ${origin} to ${destination} • Lowest Fares Today`;
    }
  }

  // --- 2. Best time to book / guide ---
  else if (bodyClass.includes("guide-page")) {
    document.title = `Best Time to Book Flights • Cheap Flight Deals & Tips`;
  }

  // --- 3. Cheap international flights ---
  else if (bodyClass.includes("international-page")) {
    document.title = `Cheap International Flights • Best Deals Worldwide`;
  }

  // --- 4. FAQ / trust page ---
  else if (bodyClass.includes("faq-page")) {
    document.title = `Cheap Flights FAQ • Flight Deals Help & Tips`;
  }

  // --- 5. Default index / generic page ---
  else {
    document.title = `Cheap Flights & Flight Deals • SkyDeals`;
  }
}

// Run on page load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boostTitle);
} else {
  boostTitle();
}
