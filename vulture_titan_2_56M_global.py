import os
import random

# ==========================================
# 1. SETTINGS & CONFIGURATION
# ==========================================
TOTAL_PAGES = 2560000 
OUTPUT_DIR = "vulture_global_2_56M"
DOMAIN = "https://yourtravelsite.com" 

# Replace with your Skyscanner/Impact/Travelpayouts base URL
BASE_AFF_URL = "PASTE_YOUR_AFFILIATE_URL_HERE"

# ==========================================
# 2. MASSIVE SEO MATRICES
# ==========================================
hubs = [
    ("New York", "JFK", "USA"), ("London", "LHR", "UK"), ("Tokyo", "NRT", "Japan"),
    ("Paris", "CDG", "France"), ("Dubai", "DXB", "UAE"), ("Singapore", "SIN", "Singapore"),
    ("Los Angeles", "LAX", "USA"), ("Chicago", "ORD", "USA"), ("Toronto", "YYZ", "Canada"),
    ("Sydney", "SYD", "Australia"), ("Frankfurt", "FRA", "Germany"), ("Rome", "FCO", "Italy"),
    ("Bangkok", "BKK", "Thailand"), ("Seoul", "ICN", "South Korea"), ("Madrid", "MAD", "Spain"),
    ("Amsterdam", "AMS", "Netherlands"), ("Hong Kong", "HKG", "HK"), ("Istanbul", "IST", "Turkey"),
    ("San Francisco", "SFO", "USA"), ("Seattle", "SEA", "USA"), ("Miami", "MIA", "USA")
]

# Keyword Silos for Semantic Variety
kws = {
    "primary": ["Cheap Flights", "Last Minute Airfare", "Flight Deals", "Business Class Specials", "Direct Flights", "Round Trip Savings", "Skyscanner Deals", "Flight Aggregator"],
    "modifiers": ["2026 Price Drop", "Flash Sale", "Inventory Reset", "Exclusive Rates", "Real-time Update", "Unclaimed Seats", "Hidden Inventory", "Pre-Holiday Reset"],
    "intents": ["Book Online", "Check Rates", "Compare Prices", "Secure Booking", "View Dashboard", "Reserve Seats", "Verify Availability"]
}

airlines = ["Delta", "Emirates", "United", "Singapore Airlines", "Qatar Airways", "Lufthansa", "British Airways", "Ryanair", "JetBlue", "Turkish Airlines"]
destinations = ["London", "Tokyo", "Paris", "Dubai", "Bali", "Rome", "New York", "Singapore", "Barcelona", "Sydney", "Zurich", "Cancun"]

# ==========================================
# 3. DYNAMIC CONTENT GENERATOR
# ==========================================

def get_aff_link(code):
    """Integrates your specific affiliate tracking logic."""
    return f"{BASE_AFF_URL}?u=https://www.skyscanner.com/transport/flights-from/{code.lower()}"

def generate_page(city, code, region, i):
    # Select unique data points for this specific page
    kw = random.choice(kws["primary"])
    mod = random.choice(kws["modifiers"])
    intent = random.choice(kws["intents"])
    airline = random.choice(airlines)
    dest = random.choice(destinations)
    price = random.randint(340, 1150)
    aff_link = get_aff_link(code)
    
    # Structural Silhouette Variation (Prevents HTML footprint detection)
    layout_seed = i % 4
    
    if layout_seed == 0:
        return f"""<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>{kw} {city} to {dest} - {mod}</title>
        <style>body{{font-family:sans-serif;background:#f4f7f6;padding:40px;}} .card{{max-width:850px;margin:auto;background:#fff;padding:50px;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.1);}} .btn{{display:block;background:#00a3bf;color:#fff;text-align:center;padding:22px;text-decoration:none;border-radius:6px;font-weight:bold;font-size:22px;}}</style></head>
        <body><div class="card"><h1>{city} ({code}) {kw}</h1><p>Market Analysis: {region} travelers are seeing a <strong>{mod}</strong>. {airline} is currently showing the most competitive frequency for the {city} to {dest} corridor.</p>
        <div style="font-size:24px;margin:20px 0;">Rates from: <strong>${price}</strong></div>
        <a href="{aff_link}" class="btn">{intent.upper()}</a><p style="font-size:9px;color:#ccc;margin-top:40px;">REF: {i}-V25M-L0</p></div></body></html>"""

    elif layout_seed == 1:
        return f"""<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Direct Flights from {city} {code} | {mod}</title>
        <style>body{{line-height:1.7;color:#333;max-width:750px;margin:auto;padding:60px 20px;background:#fff;}} .tip{{background:#e8f4f8;padding:25px;border-left:8px solid #00a3bf;}} .a{{color:#00a3bf;font-weight:bold;}}</style></head>
        <body><h1>{city} {kw} Update</h1><p>Our 2026 Skyscanner tracker for {region} has detected a significant shift.</p>
        <div class="tip"><strong>Optimization:</strong> Cross-reference {code} with {airline} mid-week inventory to find the ${price-100} floor.</div>
        <p>Target Route: {city} to {dest}. <a href="{aff_link}" class="a">{intent} &rarr;</a></p>
        <p style="font-size:9px;color:#eee;margin-top:100px;">REF: {i}-V25M-L1</p></body></html>"""

    elif layout_seed == 2:
        return f"""<!DOCTYPE html><html><head><meta charset="UTF-8"><title>{mod}: {city} ({code}) Flight Hub</title>
        <style>body{{background:#1a202c;color:#cbd5e0;font-family:monospace;padding:80px;text-align:center;}} .m{{border:1px solid #4a5568;padding:40px;}} .l{{background:#4fd1c5;color:#1a202c;padding:15px 30px;text-decoration:none;font-weight:bold;}}</style></head>
        <body><div class="m"><h1>SKYSCANNER GLOBAL: {code}</h1><p>ORIGIN: {city}, {region}</p><p>STATUS: {mod}</p><p>TRENDING: {airline} to {dest}</p><br>
        <a href="{aff_link}" class="l">[ {intent.upper()} ]</a><p style="font-size:9px;margin-top:60px;">DATA STREAM: {i}-V25M-L2</p></div></body></html>"""

    else:
        return f"""<!DOCTYPE html><html><head><meta charset="UTF-8"><title>{intent} - {city} to {dest} {kw}</title>
        <style>body{{background:#f0f2f5;padding:20px;}} .w{{max-width:600px;margin:auto;background:#fff;padding:30px;border-top:10px solid #ff5a5f;}} .c{{display:block;background:#ff5a5f;color:#fff;text-align:center;padding:15px;text-decoration:none;border-radius:4px;font-weight:bold;}}</style></head>
        <body><div class="w"><h2>{city} ({code}) Alert</h2><p>Special inventory found for flights to {dest}. {mod} is active for 2026 {region} travelers.</p>
        <a href="{aff_link}" class="c">{intent.upper()} NOW</a><p style="font-size:9px;color:#ccc;margin-top:30px;">REF: {i}-V25M-L3</p></div></body></html>"""

# ==========================================
# 4. EXECUTION FLOW
# ==========================================

def run_vulture_titan_25m():
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
    
    print(f"🚀 VULTURE TITAN 2.56M: Launching Global SEO Generation...")
    
    # Use buffered sitemap writing to avoid memory issues
    sitemap_count = 1
    generated_in_current_sitemap = 0
    s_file = open(f"sitemap_2.56M_{sitemap_count}.xml", "w", encoding="utf-8")
    s_file.write('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

    for i in range(1, TOTAL_PAGES + 1):
        city, code, region = random.choice(hubs)
        file_name = f"skyscanner-{code.lower()}-{i}.html"
        
        content = generate_page(city, code, region, i)
            
        with open(os.path.join(OUTPUT_DIR, file_name), "w", encoding="utf-8") as f:
            f.write(content)
        
        s_file.write(f'<url><loc>{DOMAIN}/{file_name}</loc><changefreq>daily</changefreq></url>')
        generated_in_current_sitemap += 1

        # standard 50k URL limit per sitemap
        if generated_in_current_sitemap >= 50000:
            s_file.write('</urlset>')
            s_file.close()
            sitemap_count += 1
            generated_in_current_sitemap = 0
            s_file = open(f"sitemap_2.56M_{sitemap_count}.xml", "w", encoding="utf-8")
            s_file.write('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

        if i % 100000 == 0:
            print(f"✅ Progress: {i} / {TOTAL_PAGES} pages...")

    s_file.write('</urlset>')
    s_file.close()
    print(f"✨ SUCCESS. {TOTAL_PAGES} files and {sitemap_count} sitemaps generated.")

if __name__ == "__main__":
    run_vulture_titan_25m()
