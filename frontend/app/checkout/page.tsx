'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { money } from '@/lib/format';
import { API_URL } from '@/lib/api';

export default function CheckoutPage() {
  const { lines, total, clear } = useCart();
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [paidTotal, setPaidTotal] = useState(0);

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim() || !form.email.trim() || !form.address.trim()) {
      setError('Name, email aur address bharna zaroori hai.');
      return;
    }

    setBusy(true);
    try {
      const res = await fetch(API_URL + '/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: form,
          items: lines.map((l) => ({
            productId: l.product.id,
            colorIndex: l.colorIndex,
            qty: l.qty,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Order place nahi ho paya');

      setPaidTotal(total);
      setOrderId(data.id);
      clear();
    } catch (err: any) {
      setError(err.message || 'Kuch galat ho gaya. Backend chal raha hai?');
    } finally {
      setBusy(false);
    }
  };

  if (orderId) {
    return (
      <section className="checkout-section">
        <div className="container">
          <div className="order-success">
            <div className="tick">✓</div>
            <h2>Order Placed!</h2>
            <p>Thank you for shopping with Time Zone Watches.</p>
            <p>Order number: <b>#{orderId}</b></p>
            <p>Order total: <b>{money(paidTotal)}</b></p>
            <a href="/#mens" className="btn btn-gold">Continue Shopping</a>
          </div>
        </div>
      </section>
    );
  }

  if (lines.length === 0) {
    return (
      <section className="checkout-section">
        <div className="container">
          <div className="order-success">
            <h2>Your cart is empty</h2>
            <p>Pehle koi timepiece cart me add karo.</p>
            <a href="/#mens" className="btn btn-gold">Browse Watches</a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow center">Almost Yours</span>
          <h2>Checkout</h2>
          <p>Apni delivery details bharo — order database me save ho jayega.</p>
        </div>

        <div className="checkout-grid">
          <form className="checkout-form" onSubmit={placeOrder} noValidate>
            <div className="field">
              <label htmlFor="co-name">Full Name</label>
              <input id="co-name" type="text" placeholder="e.g. Aarav Sharma"
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="field">
              <label htmlFor="co-email">Email Address</label>
              <input id="co-email" type="email" placeholder="you@example.com"
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="field">
              <label htmlFor="co-phone">Phone (optional)</label>
              <input id="co-phone" type="tel" placeholder="+91 98765 43210"
                value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="field">
              <label htmlFor="co-address">Delivery Address</label>
              <textarea id="co-address" placeholder="House / street / city / pincode"
                value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </div>

            <button type="submit" className="btn btn-gold w-full" disabled={busy}>
              {busy ? 'Placing Order…' : `Place Order · ${money(total)}`}
            </button>
            <p className="form-error">{error}</p>
          </form>

          <aside className="summary">
            <h3>Order Summary</h3>
            {lines.map((l) => (
              <div className="sum-item" key={`${l.product.id}-${l.colorIndex}`}>
                <span>{l.product.name} · {l.product.colors[l.colorIndex].n} × {l.qty}</span>
                <b>{money(l.product.price * l.qty)}</b>
              </div>
            ))}
            <div className="sum-total"><span>Total</span><b>{money(total)}</b></div>
          </aside>
        </div>
      </div>
    </section>
  );
}