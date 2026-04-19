import { AFFILIATE_URL } from "./affiliate.js";

export function guardAffiliateClicks() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[data-affiliate]");
    if (!link) return;

    // Force correct URL at click time
    link.href = AFFILIATE_URL;
  }, true); // capture phase = runs before other scripts
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  guardAffiliateClicks();
});
