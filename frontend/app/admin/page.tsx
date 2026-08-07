'use client';

import { useEffect, useState } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct, getOrders } from '@/lib/api';
import { Product } from '@/lib/types';
import { money } from '@/lib/format';

const EMPTY = {
  id: '', cat: 'mens', type: 'classic', name: '', price: 0,
  quality: '', stock: 0, image: '',
};

export default function AdminPage() {
  const [tab, setTab] = useState<'products' | 'orders'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [form, setForm] = useState<any>(EMPTY);
  const [editing, setEditing] = useState(false);
  const [note, setNote] = useState('');

  const loadProducts = async () => {
    try { setProducts(await getProducts()); } catch { setNote('Products load nahi hue. Backend chalu hai?'); }
  };
  const loadOrders = async () => {
    try { setOrders(await getOrders()); } catch { setNote('Orders load nahi hue.'); }
  };

  useEffect(() => { loadProducts(); loadOrders(); }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setNote('');
    if (!form.id.trim() || !form.name.trim()) {
      setNote('ID aur Name zaroori hai.');
      return;
    }
    const data = {
      id: form.id,
      cat: form.cat,
      type: form.type,
      name: form.name,
      quality: form.quality,
      image: form.image || '',
      price: Number(form.price),
      stock: Number(form.stock),
      look: { case: '#cfa46a', bezel: '#b58c4d', dial: '#14161c', accent: '#e9d3a2' },
      colors: [{ n: 'Black', c: '#15151a' }, { n: 'Gold', c: '#c9a35f' }],
    };
    try {
      if (editing) {
        const { id, ...rest } = data;
        await updateProduct(form.id, rest);
        setNote('Product update ho gaya');
      } else {
        await createProduct(data);
        setNote('Naya product add ho gaya');
      }
      setForm(EMPTY);
      setEditing(false);
      loadProducts();
    } catch {
      setNote('Save nahi hua. Kya id unique hai? (jaise m8, m9)');
    }
  };

  const editRow = (p: Product) => {
    setForm({ id: p.id, cat: p.cat, type: p.type, name: p.name, price: p.price, quality: p.quality, stock: p.stock, image: p.image });
    setEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const del = async (id: string) => {
    if (!confirm('Pakka delete karna hai?')) return;
    try { await deleteProduct(id); loadProducts(); setNote('Delete ho gaya'); }
    catch { setNote('Delete nahi hua.'); }
  };

  return (
    <section className="section" style={{ paddingTop: '130px' }}>
      <div className="container">
        <div className="section-head" style={{ marginBottom: '30px' }}>
          <span className="eyebrow center">Admin</span>
          <h2>Dashboard</h2>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <button className={tab === 'products' ? 'btn btn-gold' : 'btn btn-ghost'} onClick={() => setTab('products')}>Products</button>
          <button className={tab === 'orders' ? 'btn btn-gold' : 'btn btn-ghost'} onClick={() => setTab('orders')}>Orders</button>
        </div>

        {note && <p style={{ color: 'var(--gold-light)', marginBottom: '16px' }}>{note}</p>}

        {tab === 'products' && (
          <>
            <form onSubmit={save} style={{ background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: '14px', padding: '20px', marginBottom: '30px' }}>
              <h3 style={{ marginBottom: '14px' }}>{editing ? 'Edit Product' : 'Add New Product'}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="field">
                  <label>ID (jaise m5)</label>
                  <input value={form.id} disabled={editing} onChange={(e) => setForm({ ...form, id: e.target.value })} />
                </div>
                <div className="field">
                  <label>Name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="field">
                  <label>Category</label>
                  <select value={form.cat} onChange={(e) => setForm({ ...form, cat: e.target.value })}
                    style={{ width: '100%', background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: '12px', padding: '14px', color: 'var(--text)' }}>
                    <option value="mens">Men&apos;s</option>
                    <option value="womens">Women&apos;s</option>
                    <option value="luxury">Luxury</option>
                    <option value="smart">Smart</option>
                  </select>
                </div>
                <div className="field">
                  <label>Type</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                    style={{ width: '100%', background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: '12px', padding: '14px', color: 'var(--text)' }}>
                    <option value="classic">Classic</option>
                    <option value="smart">Smart</option>
                  </select>
                </div>
                <div className="field">
                  <label>Price</label>
                  <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                </div>
                <div className="field">
                  <label>Stock</label>
                  <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
                </div>
                <div className="field">
                  <label>Quality (badge)</label>
                  <input value={form.quality} onChange={(e) => setForm({ ...form, quality: e.target.value })} />
                </div>
                <div className="field">
                  <label>Image URL (khaali chhod sakti ho)</label>
                  <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" className="btn btn-gold">{editing ? 'Update' : 'Add Product'}</button>
                {editing && <button type="button" className="btn btn-ghost" onClick={() => { setForm(EMPTY); setEditing(false); }}>Cancel</button>}
              </div>
            </form>

            <div style={{ display: 'grid', gap: '10px' }}>
              {products.map((p) => (
                <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: '12px', padding: '14px 18px' }}>
                  <b style={{ color: 'var(--gold)', width: '44px' }}>{p.id}</b>
                  <span style={{ flex: 1 }}>{p.name}</span>
                  <span style={{ color: 'var(--muted)' }}>{p.cat}</span>
                  <span style={{ color: 'var(--gold-light)' }}>{money(p.price)}</span>
                  <span style={{ color: 'var(--muted)' }}>Stock: {p.stock}</span>
                  <button className="btn btn-ghost" style={{ padding: '8px 16px' }} onClick={() => editRow(p)}>Edit</button>
                  <button className="btn btn-ghost" style={{ padding: '8px 16px', borderColor: '#e0706a', color: '#e0706a' }} onClick={() => del(p.id)}>Delete</button>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'orders' && (
          <div style={{ display: 'grid', gap: '14px' }}>
            {orders.length === 0 && <p style={{ color: 'var(--muted)' }}>Abhi tak koi order nahi aaya.</p>}
            {orders.map((o) => (
              <div key={o.id} style={{ background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: '12px', padding: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <b style={{ color: 'var(--gold)' }}>Order #{o.id}</b>
                  <b style={{ color: 'var(--gold-light)' }}>{money(o.total)}</b>
                </div>
                <p style={{ color: 'var(--muted)', fontSize: '.9rem' }}>{o.name} · {o.email} · {o.phone}</p>
                <p style={{ color: 'var(--muted)', fontSize: '.9rem', marginBottom: '10px' }}>{o.address}</p>
                <div style={{ borderTop: '1px solid var(--line)', paddingTop: '10px' }}>
                  {o.items?.map((it: any) => (
                    <div key={it.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.88rem', color: 'var(--muted)' }}>
                      <span>{it.name} · {it.color} × {it.qty}</span>
                      <span>{money(it.price * it.qty)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}