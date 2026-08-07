'use client';

import { useState } from 'react';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', msg: '' });
  const [note, setNote] = useState('');
  const [error, setError] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.msg.trim()) {
      setError(true);
      setNote('Please fill in all the fields.');
      return;
    }

    setError(false);
    setNote('Sending your message…');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key:  '63ccac0d-3af3-4a39-910e-c1f32494548b',
          name: form.name,
          email: form.email,
          message: form.msg,
          subject: 'New message from Time Zone Watches website',
        }),
      });

      const data = await res.json();

      if (data.success) {
        setNote(`Thank you, ${form.name}! Your message has been sent — we will get back to you within 24 hours.`);
        setForm({ name: '', email: '', msg: '' });
      } else {
        setError(true);
        setNote('Something went wrong. Please try again.');
      }
    } catch {
      setError(true);
      setNote('Could not send. Check your internet and try again.');
    }
  };

  return (
    <section className="section alt" id="contact">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow center">We&apos;re Here To Help</span>
          <h2>Contact Us</h2>
          <p>A question about an order, a collection, or servicing your watch — send us a message.</p>
        </div>

        <div className="contact-grid">
          <form className="reveal" onSubmit={submit} noValidate>
            <div className="field">
              <label htmlFor="cf-name">Your Name</label>
              <input id="cf-name" type="text" placeholder="e.g. Aarav Sharma"
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="field">
              <label htmlFor="cf-email">Email Address</label>
              <input id="cf-email" type="email" placeholder="you@example.com"
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="field">
              <label htmlFor="cf-msg">Message</label>
              <textarea id="cf-msg" placeholder="Write your message here…"
                value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })} />
            </div>
            <button type="submit" className="btn btn-gold w-full">Send Message</button>
            <p className="form-note" role="status" style={error ? { color: '#e0a13c' } : undefined}>{note}</p>
          </form>

          <div className="contact-info reveal">
            <div className="info-item">
              <span className="info-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-6.5-5.6-6.5-10.2A6.5 6.5 0 0 1 12 4.5a6.5 6.5 0 0 1 6.5 6.3C18.5 15.4 12 21 12 21z" /><circle cx="12" cy="10.8" r="2.2" /></svg></span>
              <div><h4>Visit Our Store</h4><p>21, MG Road, Fort, Mumbai — 400001, India</p></div>
            </div>
            <div className="info-item">
              <span className="info-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 4.5c0 8.3 6.7 15 15 15l2-4-4.2-2-2 2c-3.2-1.2-5.6-3.6-6.8-6.8l2-2-2-4.2-4 2z" /></svg></span>
              <div><h4>Call Us</h4><p>+91 98765 43210 &nbsp;·&nbsp; Mon–Sat</p></div>
            </div>
            <div className="info-item">
              <span className="info-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3.5 6.5 12 13l8.5-6.5" /></svg></span>
              <div><h4>Email Us</h4><p>support@timezonewatches.com</p></div>
            </div>
            <div className="info-item">
              <span className="info-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3.5 2" /></svg></span>
              <div><h4>Store Hours</h4><p>Mon – Sat: 10:00 AM – 8:00 PM</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}