import { countries } from "@/lib/data";

export default function Home({ params }) {
  const lang = params.lang;
  const country = countries[lang];

  return (
    <div>
      <h1>Deals for {country.country}</h1>

      <a href={`/${lang}/deals/laptop-deals`}>Laptop Deals</a>
      <a href={`/${lang}/deals/vpn-offers`}>VPN Deals</a>
    </div>
  );
}
