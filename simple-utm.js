<!-- ========== SIMPLE UTM‑ENABLED AFFILIATE LINK (add to every page) ========== -->
<script>
  // 1. Your base affiliate URL (untouched core)
  const SKYDEALS_AFFILIATE_BASE_URL =
    "https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885";

  // 2. Generic UTM config (you can override per page if you want later)
  const DEFAULT_UTM_PARAMS = {
    utm_source: "skydeals",
    utm_medium: "web",
    utm_campaign: "daily-article",
  };

  // 3. Build UTM‑augmented URL
  function getUtmAffiliateUrl(extraUtmParams = {}) {
    const combined = { ...DEFAULT_UTM_PARAMS, ...extraUtmParams };
    const url = new URL(SKYDEALS_AFFILIATE_BASE_URL);

    Object.keys(combined).forEach((key) => {
      if (combined[key]) {
        url.searchParams.set(key, combined[key]);
      }
    });

    return url.toString();
  }

  // 4. Expose generic URL for your injectAffiliateLinks()
  const SKYDEALS_AFFILIATE_URL = getUtmAffiliateUrl();
</script>
