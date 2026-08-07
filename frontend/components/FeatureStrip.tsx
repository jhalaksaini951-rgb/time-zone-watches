export default function FeatureStrip() {
  return (
    <div className="strip">
      <div className="container strip-inner">
        <div className="strip-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M1.5 7h13v9h-13z" /><path d="M14.5 10h4l3 3v3h-7" /><circle cx="6" cy="18.5" r="1.7" /><circle cx="17.5" cy="18.5" r="1.7" /></svg>
          <span>Free Shipping</span>
        </div>
        <div className="strip-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" /><path d="M9 12l2 2 4-4.5" /></svg>
          <span>2-Year Warranty</span>
        </div>
        <div className="strip-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1" /><path d="M3.5 4.5v5h5" /></svg>
          <span>30-Day Returns</span>
        </div>
        <div className="strip-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M7 4h10l4 5.5L12 21 3 9.5 7 4z" /><path d="M3 9.5h18M9.5 4l2.5 5.5L14.5 4M12 21l-2.5-11.5M12 21l2.5-11.5" /></svg>
          <span>100% Authentic</span>
        </div>
      </div>
    </div>
  );
}