import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ★ PRODUCTS YAHAN SE ADD / EDIT / DELETE KARO
const PRODUCTS = [
  // ---------- MEN'S ----------
  { id: 'm1', cat: 'mens', type: 'classic', name: 'Chrono Master Steel', price: 12999,
    quality: 'Stainless Steel · 5 ATM', stock: 14, image: '',
    look: { case: '#cdd2da', bezel: '#9aa1ad', dial: '#141821', accent: '#c9a35f' },
    colors: [{ n: 'Midnight Black', c: '#15151a' }, { n: 'Steel Blue', c: '#23405f' }, { n: 'Umber Brown', c: '#5a3f2a' }] },
  { id: 'm2', cat: 'mens', type: 'classic', name: 'Royal Heritage Leather', price: 9499,
    quality: 'Genuine Leather Strap', stock: 20, image: '',
    look: { case: '#d3ac67', bezel: '#b98f45', dial: '#f4efe4', accent: '#3a3428' },
    colors: [{ n: 'Tan', c: '#8a5a33' }, { n: 'Dark Brown', c: '#4a3221' }, { n: 'Black', c: '#17171c' }] },
  { id: 'm3', cat: 'mens', type: 'classic', name: 'Titan Edge Automatic', price: 15999,
    quality: 'Automatic Movement', stock: 8, image: '',
    look: { case: '#2c2e35', bezel: '#1d1f26', dial: '#0e1014', accent: '#dfe3ea' },
    colors: [{ n: 'Jet Black', c: '#14141a' }, { n: 'Graphite', c: '#3c4048' }, { n: 'Deep Blue', c: '#1f3a5c' }] },
  { id: 'm4', cat: 'mens', type: 'classic', name: 'Voyager Sport', price: 7999,
    quality: 'Sports · Chronograph', stock: 25, image: '',
    look: { case: '#3a3f47', bezel: '#2a2e35', dial: '#101418', accent: '#f2a33c' },
    colors: [{ n: 'Black', c: '#15161b' }, { n: 'Burnt Orange', c: '#a04d15' }, { n: 'Forest Green', c: '#2f4a3a' }] },

  // ---------- WOMEN'S ----------
  { id: 'w1', cat: 'womens', type: 'classic', name: 'Rose Petal Elegance', price: 8999,
    quality: 'Rose Gold Finish', stock: 18, image: '',
    look: { case: '#e0a884', bezel: '#c98d66', dial: '#f7ece4', accent: '#8a5a3c' },
    colors: [{ n: 'Blush', c: '#d9a08c' }, { n: 'Ivory White', c: '#e8e2d8' }, { n: 'Maroon', c: '#6e2b35' }] },
  { id: 'w2', cat: 'womens', type: 'classic', name: 'Pearl Luxe Mini', price: 10499,
    quality: 'Mother of Pearl Dial', stock: 12, image: '',
    look: { case: '#d9d9de', bezel: '#b9bac2', dial: '#f2f1f4', accent: '#7c7f8a' },
    colors: [{ n: 'Silver Mesh', c: '#b9bac2' }, { n: 'Lilac', c: '#8f7fa8' }, { n: 'Black', c: '#17171c' }] },
  { id: 'w3', cat: 'womens', type: 'classic', name: 'Aurora Slim', price: 6999,
    quality: 'Ultra Slim · 6mm', stock: 22, image: '',
    look: { case: '#cfa46a', bezel: '#b58c4d', dial: '#14161c', accent: '#e9d3a2' },
    colors: [{ n: 'Gold Mesh', c: '#c2a05f' }, { n: 'Olive', c: '#57543a' }, { n: 'Black', c: '#17171c' }] },
  { id: 'w4', cat: 'womens', type: 'classic', name: 'Crystal Bloom', price: 11999,
    quality: 'Crystal Studded Bezel', stock: 9, image: '',
    look: { case: '#d8b46e', bezel: '#bf9750', dial: '#1a1420', accent: '#e9d3a2' },
    colors: [{ n: 'Royal Purple', c: '#4a2b52' }, { n: 'Rose', c: '#b96a75' }, { n: 'Black', c: '#17171c' }] },

  // ---------- LUXURY ----------
  { id: 'l1', cat: 'luxury', type: 'classic', name: 'Imperial Gold 24K', price: 89999,
    quality: '24K Gold Plated · Swiss', stock: 5, image: '',
    look: { case: '#dcb668', bezel: '#c39a4a', dial: '#121014', accent: '#ecd8a8' },
    colors: [{ n: 'Black Croc', c: '#17151a' }, { n: 'Brown Croc', c: '#4c331f' }] },
  { id: 'l2', cat: 'luxury', type: 'classic', name: 'Sovereign Tourbillon', price: 149999,
    quality: 'Tourbillon · Sapphire Glass', stock: 3, image: '',
    look: { case: '#d3d6dd', bezel: '#aeb3bd', dial: '#0d1017', accent: '#c9a35f' },
    colors: [{ n: 'Black', c: '#15151a' }, { n: 'Navy', c: '#1d3557' }] },
  { id: 'l3', cat: 'luxury', type: 'classic', name: 'Meridian Sapphire', price: 75000,
    quality: 'Sapphire Crystal · Swiss', stock: 6, image: '',
    look: { case: '#b9bec9', bezel: '#979dab', dial: '#10233f', accent: '#dfe6f2' },
    colors: [{ n: 'Ocean Blue', c: '#1d3557' }, { n: 'Black', c: '#15151a' }, { n: 'Steel', c: '#8b93a1' }] },
  { id: 'l4', cat: 'luxury', type: 'classic', name: 'Grand Prestige Rose', price: 125000,
    quality: 'Rose Gold · Limited Edition', stock: 4, image: '',
    look: { case: '#d8a07a', bezel: '#bd8560', dial: '#14100e', accent: '#f0cdb0' },
    colors: [{ n: 'Espresso', c: '#3c2417' }, { n: 'Black', c: '#17151a' }] },

  // ---------- SMART ----------
  { id: 's1', cat: 'smart', type: 'smart', name: 'TimeZone Pulse Pro', price: 14999,
    quality: 'AMOLED · GPS · SpO₂', stock: 30, image: '',
    look: { case: '#24262c', bezel: '#24262c', dial: '#0a0c10', accent: '#4cc9f0' },
    colors: [{ n: 'Black', c: '#15161b' }, { n: 'Ocean Blue', c: '#274b6d' }, { n: 'Sunset Orange', c: '#a6521c' }] },
  { id: 's2', cat: 'smart', type: 'smart', name: 'TimeZone Fit X', price: 8999,
    quality: 'Fitness · 10-Day Battery', stock: 40, image: '',
    look: { case: '#2b2d33', bezel: '#2b2d33', dial: '#0a0c10', accent: '#63d47e' },
    colors: [{ n: 'Black', c: '#15161b' }, { n: 'Mint', c: '#3f6e57' }, { n: 'Rose Pink', c: '#a06070' }] },
  { id: 's3', cat: 'smart', type: 'smart', name: 'TimeZone Ultra AMOLED', price: 19999,
    quality: '1.9″ AMOLED · BT Calling', stock: 15, image: '',
    look: { case: '#cfa46a', bezel: '#cfa46a', dial: '#0a0c10', accent: '#e9d3a2' },
    colors: [{ n: 'Desert Tan', c: '#7a5a36' }, { n: 'Black', c: '#15161b' }, { n: 'Cloud White', c: '#ddd8cf' }] },
  { id: 's4', cat: 'smart', type: 'smart', name: 'TimeZone Active', price: 6499,
    quality: '120 Sports Modes · IP68', stock: 50, image: '',
    look: { case: '#33363d', bezel: '#33363d', dial: '#0a0c10', accent: '#f2a33c' },
    colors: [{ n: 'Black', c: '#15161b' }, { n: 'Grey', c: '#4a4e56' }, { n: 'Crimson', c: '#8c2f39' }] },
];

async function main() {
  for (const p of PRODUCTS) {
    // upsert = hai to update karo, nahi hai to naya banao
    await prisma.product.upsert({
      where: { id: p.id },
      update: p as any,
      create: p as any,
    });
  }
  console.log('Seed complete: ' + PRODUCTS.length + ' products daal diye.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());