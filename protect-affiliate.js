import { AFFILIATE_URL } from "./affiliate.js";

// Apply correct link to all marked elements
export function enforceAffiliateLinks() {
  const links = document.querySelectorAll("a[data-affiliate]");

  links.forEach(link => {
    link.setAttribute("href", AFFILIATE_URL);
    link.setAttribute("rel", "noopener noreferrer sponsored");
    link.setAttribute("target", "_blank");
  });
}

// Watch for any script trying to change links after load
export function protectAgainstHijack() {
  const observer = new MutationObserver(() => {
    enforceAffiliateLinks();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["href"]
  });
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  enforceAffiliateLinks();
  protectAgainstHijack();
});
