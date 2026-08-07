import { getProducts } from '@/lib/api';
import { Product } from '@/lib/types';
import ProductCard from './ProductCard';

// Har category ka title aur description
const INFO: Record<string, { eyebrow: string; title: string; desc: string }> = {
  mens:   { eyebrow: "The Gentlemen's Collection", title: "Men's Watches",   desc: "Bold, refined and engineered for the modern man — from boardroom classics to weekend sport." },
  womens: { eyebrow: "Grace In Every Second",      title: "Women's Watches", desc: "Elegant timepieces designed to complement every look — subtle, radiant and unmistakably you." },
  luxury: { eyebrow: "The Prestige Line",          title: "Luxury Watches",  desc: "Limited editions, Swiss movements and sapphire crystal — for those who collect moments, not minutes." },
  smart:  { eyebrow: "Technology On Your Wrist",   title: "Smart Watches",   desc: "AMOLED displays, health tracking and long battery life — classic style meets modern intelligence." },
};

export default async function CollectionPage({ cat }: { cat: string }) {
  let products: Product[] = [];
  try {
    const all = await getProducts();
    products = all.filter((p) => p.cat === cat);
  } catch {
    // backend band ho to khaali dikhega
  }

  const info = INFO[cat];

  return (
    <section className="section" style={{ paddingTop: '140px' }}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow center">{info?.eyebrow}</span>
          <h2>{info?.title}</h2>
          <p>{info?.desc}</p>
        </div>
        <div className="grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}