const fs = require('fs');

async function run() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error("Missing OPENAI_API_KEY");
    return;
  }

  // Generate article using OpenAI
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `
Write a 300-500 word SEO-optimized travel article about cheap flights or travel deals for 2026.

Requirements:
- Include an H2 title
- Include helpful travel tips
- Use keywords like cheap flights, travel deals, budget travel
- Add a CTA button using this affiliate link:
https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885

Format the CTA exactly like this:
<a class="cta" href="https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885" target="_blank" rel="nofollow sponsored">Book Cheap Flights Now</a>

Return clean HTML only (no markdown, no backticks).
`
        }
      ],
      temperature: 0.7
    })
  });

  const data = await response.json();

  const article = data.choices?.[0]?.message?.content;

  if (!article) {
    console.error("No article generated");
    return;
  }

  // Wrap article in a section
  const formattedArticle = `
<section class="ai-article">
${article}
</section>
`;

  // Read your index.html
  let html = fs.readFileSync("index.html", "utf8");

  // Insert article above placeholder
  const placeholder = "<!-- NEW AI ARTICLES GO HERE -->";

  if (!html.includes(placeholder)) {
    console.error("Placeholder not found in index.html");
    return;
  }

  html = html.replace(
    placeholder,
    formattedArticle + "\n" + placeholder
  );

  // Save updated HTML
  fs.writeFileSync("index.html", html, "utf8");

  console.log("✅ New AI article added!");
}

run();
