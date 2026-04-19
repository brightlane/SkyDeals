export function generateSEO(lang, keyword) {
  const titles = {
    en: `Best ${keyword} – Exclusive Offers`,
    es: `Mejores ofertas de ${keyword}`,
    fr: `Meilleures offres ${keyword}`,
    de: `Beste ${keyword} Angebote`,
  };

  return {
    title: titles[lang] || titles.en,
    description: `Find the best ${keyword} with exclusive discounts and affiliate deals.`,
  };
}
