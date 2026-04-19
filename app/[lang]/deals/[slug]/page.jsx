import { countries, keywordSets } from "@/lib/data";
import { generateSEO } from "@/lib/seo";

export async function generateStaticParams() {
  const params = [];

  Object.keys(countries).forEach(lang => {
    keywordSets.forEach(k => {
      params.push({
        lang,
        slug: k.slug,
      });
    });
  });

  return params;
}

export async function generateMetadata({ params }) {
  const { lang, slug } = params;

  const keyword = keywordSets.find(k => k.slug === slug);

  return generateSEO(lang, keyword.baseKeyword);
}

export default function Page({ params }) {
  const { lang, slug } = params;

  const country = countries[lang];
  const keyword = keywordSets.find(k => k.slug === slug);

  const affiliateUrl =
    "https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885";

  return (
    <div>
      <h1>{keyword.baseKeyword} ({country.country})</h1>

      <p>
        Discover the best {keyword.baseKeyword} offers in {country.country}.
      </p>

      {/* Affiliate CTA */}
      <a
        href={affiliateUrl}
        target="_blank"
        rel="sponsored noopener noreferrer"
      >
        View Exclusive Deal
      </a>
    </div>
  );
}
