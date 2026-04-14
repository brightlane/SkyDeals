<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Cheap Flights & Flight Deals • SkyDeals</title>
  <meta name="description" content="Find the cheapest flights worldwide with Skyscanner‑powered deals. Expert guides, best times to book, and city‑to‑city routes." />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 900px;
      margin: 0 auto;
      padding: 1rem 1.2rem;
    }
    h1, h2, h3 {
      margin-top: 1.8rem;
      margin-bottom: 0.6rem;
    }
    .hero {
      text-align: center;
      padding: 1.5rem 0;
      border-bottom: 1px solid #eee;
      margin-bottom: 2rem;
    }
    .hero h1 {
      font-size: 2rem;
      margin-bottom: 0.4rem;
    }
    .hero p {
      font-size: 1.1rem;
      color: #555;
    }
    .skydeal-cta {
      margin: 1.5rem 0;
      padding: 1rem;
      background: #f8f9ff;
      border: 1px solid #e0e0ff;
      border-radius: 8px;
      text-align: center;
      font-weight: 600;
    }
    .skydeal-cta a {
      display: inline-block;
      padding: 0.8rem 1.4rem;
      text-decoration: none;
      color: #fff;
      background: #ff5a5f;
      border-radius: 6px;
      font-weight: 600;
      transition: background 0.2s ease;
    }
    .skydeal-cta a:hover {
      background: #e04044;
    }
    .article-preview {
      margin: 1.5rem 0;
      padding: 1rem 1.2rem;
      background: #f9f9f9;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
    }
    footer {
      margin-top: 3rem;
      padding: 1rem 0;
      border-top: 1px solid #eee;
      text-align: center;
      font-size: 0.9rem;
      color: #777;
    }
  </style>
</head>
<body>

  <div class="hero">
    <h1>Cheap Flights & Flight Deals</h1>
    <p>
      Find the cheapest flights from anywhere to the world’s most popular destinations.  
      Every route leads to savings via our special flight‑deals link.
    </p>
  </div>

  <!-- Main Skyscanner‑style CTA (top of page, high‑click zone) -->
  <div class="skydeal-cta">
    <a href="#" data-skydeal data-origin="anywhere" data-destination="anywhere">
      Find the cheapest flights worldwide
    </a>
  </div>

  <h2>Popular flight routes</h2>

  <div class="article-preview">
    <h3>New York → Miami</h3>
    <p>
      Ready to book cheap flights from New York to Miami?  
      <a href="#" data-skydeal data-origin="NYC" data-destination="MIA">
        See the best deals now
      </a>.
    </p>
  </div>

  <div class="article-preview">
    <h3>Philadelphia → Orlando</h3>
    <p>
      Affordable flights from Philadelphia to Orlando are easier than you think.  
      <a href="#" data-skydeal data-origin="PHL" data-destination="MCO">
        Find low‑fare options
      </a>.
    </p>
  </div>

  <div class="article-preview">
    <h3>Cheap international flights</h3>
    <p>
      Whether you’re flying to Europe, Asia, or the Caribbean,  
      <a href="#" data-skydeal data-origin="anywhere" data-destination="anywhere">
        check live prices
      </a> and see how low you can go.
    </p>
  </div>

  <!-- Footer link (soft CTA, keeps your URL present) -->
  <footer>
    <p>
      © 2026 SkyDeals • Flight deals powered by 
      <a href="#" data-skydeal data-origin="anywhere" data-destination="anywhere">
        special flight‑deals offers
      </a>.
    </p>
  </footer>

  <!-- JS that converts data-skydeal links into your real affiliate URL -->
  <script>
    // THE MASTER AFFILIATE LINK — YOU SAID: DO NOT FORGET IT
    const SKYDEALS_AFFILIATE_URL = "https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885";

    function injectAffiliateLinks() {
      document.querySelectorAll("a[data-skydeal]").forEach((link) => {
        link.href = SKYDEALS_AFFILIATE_URL;
        link.target = "_blank";
        link.rel = "noopener sponsored";
      });
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", injectAffiliateLinks);
    } else {
      injectAffiliateLinks();
    }
  </script>
</body>
</html>
