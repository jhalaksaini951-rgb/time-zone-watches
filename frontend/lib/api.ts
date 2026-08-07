import { Product } from './types';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function getProducts(): Promise<Product[]> {
  // cache: 'no-store' => har refresh par fresh data (stock updates dikhengi)
  const res = await fetch(API_URL + '/products', { cache: 'no-store' });
  if (!res.ok) throw new Error('Products fetch failed');
  return res.json();
}
// ---------- ADMIN ke functions ----------

// Naya product banao
export async function createProduct(data: any) {
  const res = await fetch(API_URL + '/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Product create failed');
  return res.json();
}

// Product edit karo
export async function updateProduct(id: string, data: any) {
  const res = await fetch(API_URL + '/products/' + id, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Product update failed');
  return res.json();
}

// Product delete karo
export async function deleteProduct(id: string) {
  const res = await fetch(API_URL + '/products/' + id, { method: 'DELETE' });
  if (!res.ok) throw new Error('Product delete failed');
  return res.json();
}

// Saare orders lao
export async function getOrders() {
  const res = await fetch(API_URL + '/orders', { cache: 'no-store' });
  if (!res.ok) throw new Error('Orders fetch failed');
  return res.json();
}