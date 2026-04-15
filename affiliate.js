<script>
(function () {
    const affiliateBase = "https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885";
    const currentHost = window.location.hostname;

    const allowedDomains = [];
    // Example: ["amazon.com", "ebay.com"]

    let scanTimer = null;

    function shouldConvert(url) {
        if (!url) return false;

        if (
            url.startsWith("#") ||
            url.startsWith("mailto:") ||
            url.startsWith("tel:") ||
            url.startsWith("javascript:")
        ) return false;

        try {
            const parsed = new URL(url, window.location.origin);

            if (parsed.hostname === currentHost) return false;
            if (parsed.href.includes("convert.ctypy.com")) return false;

            if (allowedDomains.length > 0) {
                return allowedDomains.some(domain => parsed.hostname.includes(domain));
            }

            return true;
        } catch {
            return false;
        }
    }

    function convertLink(link) {
        if (link.dataset.affDone === "1") return;

        const href = link.getAttribute("href");
        if (!shouldConvert(href)) return;

        try {
            const absoluteUrl = new URL(href, window.location.origin).href;
            const newUrl = affiliateBase + "&url=" + encodeURIComponent(absoluteUrl);

            link.setAttribute("href", newUrl);
            link.setAttribute("rel", "nofollow sponsored noopener");
            link.setAttribute("target", "_blank");
            link.dataset.affDone = "1";

        } catch {}
    }

    function scanLinks() {
        document.querySelectorAll("a").forEach(convertLink);
    }

    function scheduleScan() {
        clearTimeout(scanTimer);
        scanTimer = setTimeout(scanLinks, 150);
    }

    function observeDOM() {
        const observer = new MutationObserver(() => {
            scheduleScan();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    function trackClicks() {
        document.addEventListener("click", function (e) {
            const link = e.target.closest("a");
            if (!link) return;

            if (link.href.includes("convert.ctypy.com")) {
                console.log("[AFFILIATE CLICK]", {
                    url: link.href,
                    page: window.location.href,
                    time: new Date().toISOString()
                });
            }
        });
    }

    function preconnect() {
        if (document.querySelector('link[href="https://convert.ctypy.com"]')) return;

        const link = document.createElement("link");
        link.rel = "preconnect";
        link.href = "https://convert.ctypy.com";
        document.head.appendChild(link);
    }

    function addStructuredData() {
        if (document.querySelector('script[data-aff-schema="1"]')) return;

        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.dataset.affSchema = "1";

        script.text = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": document.title || "Website",
            "url": window.location.origin
        });

        document.head.appendChild(script);
    }

    document.addEventListener("DOMContentLoaded", function () {
        preconnect();
        scanLinks();
        observeDOM();
        trackClicks();
        addStructuredData();
    });

})();
</script>
