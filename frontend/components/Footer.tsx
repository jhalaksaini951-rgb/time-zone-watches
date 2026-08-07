export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a href="/#home" className="logo" aria-label="Time Zone Watches — Home">
            <svg className="logo-mark" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="17" stroke="#c9a35f" strokeWidth="2" /><circle cx="20" cy="20" r="12.5" stroke="#c9a35f" strokeWidth="1" opacity=".4" /><path d="M20 20V11.5M20 20l5.5 3.5" stroke="#e9d3a2" strokeWidth="2.2" strokeLinecap="round" /><circle cx="20" cy="20" r="1.8" fill="#e9d3a2" /><rect x="36" y="17" width="3" height="6" rx="1.2" fill="#c9a35f" /></svg>
            <span><span className="logo-name">Time <em>Zone</em></span><span className="logo-tag">Watches</span></span>
          </a>
          <p>Premium timepieces for every wrist and every moment — curated with love, delivered with care, since 1998.</p>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <a href="/#home">Home</a>
          <a href="/#about">About Us</a>
          <a href="/#contact">Contact</a>
          <a href="/#mens">Shop Now</a>
        </div>
        <div className="footer-col">
          <h4>Collections</h4>
          <a href="/#mens">Men&apos;s Watches</a>
          <a href="/#womens">Women&apos;s Watches</a>
          <a href="/#luxury">Luxury Watches</a>
          <a href="/#smart">Smart Watches</a>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <p>21, MG Road, Fort,<br />Mumbai — 400001, India</p>
          <p>+91 98765 43210</p>
          <p>support@timezonewatches.com</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Time Zone Watches. All rights reserved.</span>
        <span>Crafted with precision in India.</span>
      </div>
    </footer>
  );
}