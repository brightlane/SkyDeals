// scripts/console-to-utm.js

/**
 * Builds a UTM‑augmented version of your affiliate link.
 * Preserves offer_id and aff_id; only adds utm_* params.
 */

// 1. Your base affiliate URL (no changes here)
const SKYDEALS_AFFILIATE_BASE_URL =
  "https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885";

// 2. Default UTM values (you can override per page / route)
const DEFAULT_UTM_PARAMS = {
  utm_source: "skydeals",
  utm_medium: "web",
  utm_campaign: "daily-article",
};

// 3. Build UTM‑augmented URL from base + extra params
function getUtmAffiliateUrl(extraUtmParams = {}) {
  const combinedUtm = { ...DEFAULT_UTM_PARAMS, ...extraUtmParams };
  const url = new URL(SKYDEALS_AFFILIATE_BASE_URL);

  Object.keys(combinedUtm).forEach((key) => {
    if (combinedUtm[key]) {
      url.searchParams.set(key, combinedUtm[key]);
    }
  });

  return url.toString();
}

// 4. Example use: per‑page override (e.g., route pages)
function getRouteUtmUrl(route) {
  switch (route) {
    case "nyc-mia":
      return getUtmAffiliateUrl({
        utm_campaign: "nyc-to-miami-deal",
        utm_content: "nyc_mia_banner",
      });
    case "phl-mco":
      return getUtmAffiliateUrl({
        utm_campaign: "phl-to-orlando-deal",
        utm_content: "phl_mco_banner",
      });
    case "international":
      return getUtmAffiliateUrl({
        utm_campaign: "international-flights-deals",
        utm_content: "intl_banner",
      });
    default:
      return getUtmAffiliateUrl({});
  }
}

module.exports = { getUtmAffiliateUrl, getRouteUtmUrl };
