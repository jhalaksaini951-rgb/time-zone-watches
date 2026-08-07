import WatchSVG from './WatchSVG';

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container hero-inner">
        <div className="hero-content reveal in">
          <span className="eyebrow">Luxury Timepieces Since 1998</span>
          <h1>Time is Precious.<br />Wear it <em>Beautifully.</em></h1>
          <p className="lead">Welcome to Time Zone Watches — a premium collection of men&apos;s, women&apos;s, luxury and smart watches. Precision-crafted movements, timeless design, and a promise that every second you wear us counts.</p>
          <div className="hero-cta">
            <a href="/#mens" className="btn btn-gold">Shop Now
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
            <a href="/#luxury" className="btn btn-ghost">Explore Luxury</a>
          </div>
          <div className="hero-stats">
            <div className="stat"><b>25+</b><span>Years of Craft</span></div>
            <div className="stat"><b>50K+</b><span>Happy Customers</span></div>
            <div className="stat"><b>300+</b><span>Watch Models</span></div>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <span className="halo"></span>
          <span className="halo h2"></span>
          <span className="halo h3"></span>
          <div className="hero-watch">
            <WatchSVG id="hero" name="Time Zone signature watch" type="classic"
              look={{ case: '#d8b46e', bezel: '#b98f45', dial: '#100f13', accent: '#e9d3a2' }}
              strap="#1a1a20" />
          </div>
        </div>
      </div>
    </section>
  );
}