export default function AboutSection() {
  return (
    <section className="section" id="about">
      <div className="container about-grid">
        <div className="about-text reveal">
          <span className="eyebrow">Our Story</span>
          <h2>About Time Zone Watches</h2>
          <p>Founded in 1998 in Mumbai, Time Zone Watches began as a small family boutique with one belief — a watch is more than an accessory, it is a companion to every moment of your life.</p>
          <p>Today we curate over 300 models across four collections. Every timepiece is quality-checked, certified authentic, and backed by a 2-year warranty with lifetime service support.</p>
          <a href="/#contact" className="btn btn-ghost">Get In Touch</a>
        </div>
        <div className="about-card reveal">
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="40" cy="40" r="34" stroke="#c9a35f" strokeWidth="2" />
            <circle cx="40" cy="40" r="26" stroke="#c9a35f" strokeWidth="1" opacity=".35" />
            <path d="M40 40V22M40 40l12 7" stroke="#e9d3a2" strokeWidth="3" strokeLinecap="round" />
            <circle cx="40" cy="40" r="3" fill="#e9d3a2" />
            <path d="M8 62c6 6 12 9 16 10M72 62c-6 6-12 9-16 10" stroke="#c9a35f" strokeWidth="1.5" strokeLinecap="round" opacity=".6" />
          </svg>
          <p className="about-quote">&quot;Crafted with precision.<br />Worn with pride.&quot;</p>
          <p className="about-sub">— The Time Zone Promise</p>
          <div className="about-mini">
            <div><b>100%</b>Authentic</div>
            <div><b>2 Yr</b>Warranty</div>
            <div><b>4.9★</b>Rated</div>
          </div>
        </div>
      </div>
    </section>
  );
}