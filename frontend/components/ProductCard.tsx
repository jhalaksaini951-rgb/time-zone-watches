'use client';

import { useState } from 'react';
import { Product } from '@/lib/types';
import { money } from '@/lib/format';
import { useCart } from '@/context/CartContext';
import WatchSVG from './WatchSVG';

export default function ProductCard({ product: p }: { product: Product }) {
  const [ci, setCi] = useState(0);
  const [qty, setQty] = useState(1);
  const { add } = useCart();

  const outOfStock = p.stock === 0;

  return (
    <article className="card reveal" id={`card-${p.id}`}>
      <div className="card-media">
        {p.image
          ? <img src={p.image} alt={p.name} />
          : <WatchSVG id={p.id} name={p.name} type={p.type} look={p.look} strap={p.colors[ci].c} />}
      </div>

      <div className="card-body">
        <span className="badge">{p.quality}</span>
        <h3>{p.name}</h3>
        <div className="price">{money(p.price)}</div>

        <div className="colors">
          <span>Colour</span>
          {p.colors.map((c, i) => (
            <span
              key={i}
              className={i === ci ? 'dot sel' : 'dot'}
              style={{ background: c.c }}
              title={c.n}
              role="button"
              tabIndex={0}
              aria-label={`Colour ${c.n}`}
              onClick={() => setCi(i)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setCi(i); } }}
            />
          ))}
          <span className="cname">{p.colors[ci].n}</span>
        </div>

        <div className="stock">
          {outOfStock
            ? <b className="low">Out of Stock</b>
            : <>In Stock: <b className={p.stock <= 5 ? 'low' : ''}>{p.stock} available</b></>}
        </div>

        <div className="card-foot">
          <div className="qty">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
            <span>{qty}</span>
            <button onClick={() => setQty((q) => Math.min(p.stock || 99, q + 1))} aria-label="Increase quantity">+</button>
          </div>
          <button className="add" disabled={outOfStock} onClick={() => add(p, ci, qty)}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}