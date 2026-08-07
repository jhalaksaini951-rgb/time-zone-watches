import { getProducts, API_URL } from '@/lib/api';
import { Product } from '@/lib/types';
import Hero from '@/components/Hero';
import FeatureStrip from '@/components/FeatureStrip';
import ProductSection from '@/components/ProductSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';

export default async function HomePage() {
  let products: Product[] = [];
  let apiError = false;

  try {
    products = await getProducts();
  } catch {
    apiError = true;
  }

  const byCat = (cat: string) => products.filter((p) => p.cat === cat);

  return (
    <>
      <Hero />
      <FeatureStrip />

      {apiError && (
        <div className="container">
          <div className="api-note">
            <b>Backend se connection nahi ho paya.</b><br />
            Dusre terminal me <code>cd backend</code> aur <code>npm run start:dev</code> chalao,
            phir page refresh karo. API address: <code>{API_URL}</code>
          </div>
        </div>
      )}

      <ProductSection
        id="mens"
        eyebrow="The Gentlemen's Collection"
        title="Men's Watches"
        desc="Bold, refined and engineered for the modern man — from boardroom classics to weekend sport."
        products={byCat('mens')}
      />
      <ProductSection
        id="womens"
        alt
        eyebrow="Grace In Every Second"
        title="Women's Watches"
        desc="Elegant timepieces designed to complement every look — subtle, radiant and unmistakably you."
        products={byCat('womens')}
      />
      <ProductSection
        id="luxury"
        eyebrow="The Prestige Line"
        title="Luxury Watches"
        desc="Limited editions, Swiss movements and sapphire crystal — for those who collect moments, not minutes."
        products={byCat('luxury')}
      />
      <ProductSection
        id="smart"
        alt
        eyebrow="Technology On Your Wrist"
        title="Smart Watches"
        desc="AMOLED displays, health tracking and long battery life — classic style meets modern intelligence."
        products={byCat('smart')}
      />

      <AboutSection />
      <ContactSection />
    </>
  );
}