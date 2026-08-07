'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Product } from '@/lib/types';

export interface CartLine {
  product: Product;
  colorIndex: number;
  qty: number;
}

interface CartValue {
  lines: CartLine[];
  count: number;
  total: number;
  open: boolean;
  toastMsg: string;
  add: (product: Product, colorIndex: number, qty: number) => void;
  setQty: (index: number, qty: number) => void;
  remove: (index: number) => void;
  clear: () => void;
  setOpen: (v: boolean) => void;
}

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    if (!toastMsg) return;
    const t = setTimeout(() => setToastMsg(''), 2200);
    return () => clearTimeout(t);
  }, [toastMsg]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const add = useCallback((product: Product, colorIndex: number, qty: number) => {
    setLines((prev) => {
      const i = prev.findIndex((l) => l.product.id === product.id && l.colorIndex === colorIndex);
      if (i > -1) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + qty };
        return next;
      }
      return [...prev, { product, colorIndex, qty }];
    });
    setToastMsg(`${product.name} (${product.colors[colorIndex].n}) added to cart`);
  }, []);

  const setQty = useCallback((index: number, qty: number) => {
    setLines((prev) => prev.map((l, i) => (i === index ? { ...l, qty: Math.max(1, qty) } : l)));
  }, []);

  const remove = useCallback((index: number) => {
    setLines((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const count = useMemo(() => lines.reduce((t, l) => t + l.qty, 0), [lines]);
  const total = useMemo(() => lines.reduce((t, l) => t + l.product.price * l.qty, 0), [lines]);

  const value: CartValue = { lines, count, total, open, toastMsg, add, setQty, remove, clear, setOpen };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart ko CartProvider ke andar hi use karo');
  return ctx;
}