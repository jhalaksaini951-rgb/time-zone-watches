import { Product } from '@/lib/types';
import ProductCard from './ProductCard';

export default function ProductSection({ id, eyebrow, title, desc, alt, products }: {
  id: string; eyebrow: string; title: string; desc: string; alt?: boolean; products: Product[];
}) {
  return (
    <section className={alt ? 'section alt' : 'section'} id={id}>
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow center">{eyebrow}</span>
          <h2>{title}</h2>
          <p>{desc}</p>
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