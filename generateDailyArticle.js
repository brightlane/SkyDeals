import fs from 'fs';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function generateArticle() {
  try {
    const prompt = `
Write a daily travel article (150-250 words) for a travel website. 

Requirements:
1. Focus on cheap flights, affordable travel, budget airline tickets, domestic and international deals, travel tips, last-minute flights, flight comparison, airfare savings, low-cost airlines, travel hacks, best time to book flights, and holiday travel discounts.
2. Include at least 5 of the above keywords naturally.
3. Include my affiliate link in at least one sentence: https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885
4. Format the content in HTML <p> and <strong> tags for emphasis.
5. Write in a friendly, helpful, and concise tone.
6. Do NOT include a title – the website already has the section title.
7. Include at least one actionable tip the reader can immediately use.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-5-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const articleHtml = completion.choices[0].message.content;

    const dailyArticle = {
      date: new Date().toISOString().split('T')[0],
      html: articleHtml
    };

    fs.writeFileSync('daily-article.json', JSON.stringify(dailyArticle, null, 2));
    console.log('Daily SEO-optimized article generated!');
  } catch (err) {
    console.error('Error generating article:', err);
  }
}

generateArticle();
