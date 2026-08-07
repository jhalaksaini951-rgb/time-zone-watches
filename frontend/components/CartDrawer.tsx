'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { money } from '@/lib/format';
import WatchSVG from './WatchSVG';

export default function CartDrawer() {
  const { lines, total, open, setOpen, setQty, remove, toastMsg } = useCart();
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setOpen]);

  const goCheckout = () => {
    if (lines.length === 0) return;
    setOpen(false);
    router.push('/checkout');
  };

  return (
    <>
      <div className={open ? 'overlay show' : 'overlay'} onClick={() => setOpen(false)} />

      <aside className={open ? 'drawer open' : 'drawer'} aria-label="Shopping cart">
        <div className="drawer-head">
          <h3>Your Cart</h3>
          <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Close cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </div>

        <div className="drawer-items">
          {lines.length === 0 ? (
            <div className="empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 7h12l-1.2 13H7.2L6 7z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></svg>
              Your cart is empty.<br />Add a timepiece you love.
            </div>
          ) : (
            lines.map((l, idx) => {
              const p = l.product;
              const col = p.colors[l.colorIndex];
              return (
                <div className="c-item" key={`${p.id}-${l.colorIndex}`}>
                  <div className="c-thumb">
                    {p.image
                      ? <img src={p.image} alt={p.name} />
                      : <WatchSVG id={`cart-${p.id}-${l.colorIndex}`} name={p.name} type={p.type} look={p.look} strap={col.c} />}
                  </div>
                  <div className="c-info">
                    <h5>{p.name}</h5>
                    <div className="c-meta">{col.n} · {money(p.price)}</div>
                    <div className="c-row">
                      <div className="c-qty">
                        <button onClick={() => setQty(idx, l.qty - 1)} aria-label="Decrease">−</button>
                        <span>{l.qty}</span>
                        <button onClick={() => setQty(idx, Math.min(p.stock || 99, l.qty + 1))} aria-label="Increase">+</button>
                      </div>
                      <span className="c-price">{money(p.price * l.qty)}</span>
                    </div>
                  </div>
                  <button className="icon-btn" onClick={() => remove(idx)} aria-label="Remove item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M9 7V5h6v2M6.5 7l1 13h9l1-13M10 11v6M14 11v6" /></svg>
                  </button>
                </div>
              );
            })
          )}
        </div>

        <div className="drawer-foot">
          <div className="total-row"><span>Total</span><b>{money(total)}</b></div>
          <button className="btn btn-gold w-full" onClick={goCheckout} disabled={lines.length === 0}>
            Checkout
          </button>
        </div>
      </aside>

      <div className={toastMsg ? 'toast show' : 'toast'} role="status">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
        <span>{toastMsg || 'Added to cart'}</span>
      </div>
    </>
  );
}