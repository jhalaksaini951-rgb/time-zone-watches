'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (count === 0) return;
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 260);
    return () => clearTimeout(t);
  }, [count]);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/mens', label: "Men's" },
    { href: '/womens', label: "Women's" },
    { href: '/luxury', label: 'Luxury' },
    { href: '/smart', label: 'Smart' },
    { href: '/#about', label: 'About Us' },
    { href: '/#contact', label: 'Contact' },
  ];

  return (
    <header className={scrolled ? 'header scrolled' : 'header'}>
      <div className="container header-inner">
        <a href="/#home" className="logo" aria-label="Time Zone Watches — Home">
          <svg className="logo-mark" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="17" stroke="#c9a35f" strokeWidth="2" />
            <circle cx="20" cy="20" r="12.5" stroke="#c9a35f" strokeWidth="1" opacity=".4" />
            <path d="M20 20V11.5M20 20l5.5 3.5" stroke="#e9d3a2" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="20" cy="20" r="1.8" fill="#e9d3a2" />
            <rect x="36" y="17" width="3" height="6" rx="1.2" fill="#c9a35f" />
          </svg>
          <span>
            <span className="logo-name">Time <em>Zone</em></span>
            <span className="logo-tag">Watches</span>
          </span>
        </a>

        <nav className={menuOpen ? 'nav open' : 'nav'}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
        </nav>

        <div className="header-actions">
          <button className="cart-btn" onClick={() => setOpen(true)} aria-label="Open shopping cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 7h12l-1.2 13H7.2L6 7z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></svg>
            <span className={pulse ? 'cart-count pulse' : 'cart-count'}>{count}</span>
          </button>
          <button className="menu-btn" onClick={() => setMenuOpen((v) => !v)} aria-label="Open menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
        </div>
      </div>
    </header>
  );
}