import { enforceAffiliateLinks, protectAgainstHijack } from "./protect-affiliate.js";
import { guardAffiliateClicks } from "./click-guard.js";

document.addEventListener("DOMContentLoaded", () => {
  enforceAffiliateLinks();
  protectAgainstHijack();
  guardAffiliateClicks();
});
