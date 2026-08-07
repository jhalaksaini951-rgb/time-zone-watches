import { ProductLook } from '@/lib/types';

function TickMarks({ cx, cy, r, color }: { cx: number; cy: number; r: number; color: string }) {
  const marks = [];
  for (let i = 0; i < 12; i++) {
    const a = (i * 30 * Math.PI) / 180;
    const x1 = cx + Math.sin(a) * (r - 3);
    const y1 = cy - Math.cos(a) * (r - 3);
    const x2 = cx + Math.sin(a) * (r - 11);
    const y2 = cy - Math.cos(a) * (r - 11);
    marks.push(
      <line key={i} x1={x1.toFixed(1)} y1={y1.toFixed(1)} x2={x2.toFixed(1)} y2={y2.toFixed(1)}
        stroke={color} strokeWidth={i % 3 === 0 ? 2.6 : 1.2} strokeLinecap="round" />
    );
  }
  return <>{marks}</>;
}

export default function WatchSVG({ id, name, type, look, strap }: {
  id: string; name: string; type: string; look: ProductLook; strap: string;
}) {
  const u = id;
  const k = look;

  const defs = (
    <defs>
      <linearGradient id={`sh-${u}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" stopOpacity=".32" />
        <stop offset=".45" stopColor="#ffffff" stopOpacity="0" />
        <stop offset="1" stopColor="#000000" stopOpacity=".42" />
      </linearGradient>
      <radialGradient id={`vg-${u}`} cx=".5" cy=".42" r=".62">
        <stop offset="0" stopColor="#ffffff" stopOpacity=".07" />
        <stop offset=".55" stopColor="#000000" stopOpacity="0" />
        <stop offset="1" stopColor="#000000" stopOpacity=".5" />
      </radialGradient>
      <radialGradient id={`gl-${u}`} cx=".5" cy=".5" r=".5">
        <stop offset="0" stopColor={k.accent} stopOpacity=".28" />
        <stop offset="1" stopColor={k.accent} stopOpacity="0" />
      </radialGradient>
    </defs>
  );

  const straps = (
    <>
      <rect x="84" y="6" width="52" height="66" rx="12" fill={strap} />
      <rect x="84" y="6" width="52" height="66" rx="12" fill={`url(#sh-${u})`} opacity=".55" />
      <line x1="92" y1="14" x2="92" y2="64" stroke="#ffffff" strokeOpacity=".14" strokeDasharray="3 4" />
      <line x1="128" y1="14" x2="128" y2="64" stroke="#ffffff" strokeOpacity=".14" strokeDasharray="3 4" />
      <rect x="84" y="228" width="52" height="66" rx="12" fill={strap} />
      <rect x="84" y="228" width="52" height="66" rx="12" fill={`url(#sh-${u})`} opacity=".55" />
      <line x1="92" y1="236" x2="92" y2="286" stroke="#ffffff" strokeOpacity=".14" strokeDasharray="3 4" />
      <line x1="128" y1="236" x2="128" y2="286" stroke="#ffffff" strokeOpacity=".14" strokeDasharray="3 4" />
      <rect x="88" y="246" width="44" height="7" rx="3.5" fill="#000000" opacity=".28" />
    </>
  );

  if (type === 'smart') {
    return (
      <svg viewBox="0 0 220 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={name}>
        {defs}
        <ellipse cx="110" cy="150" rx="102" ry="118" fill={`url(#gl-${u})`} />
        {straps}
        <rect x="180" y="118" width="9" height="28" rx="4.5" fill={k.case} />
        <rect x="180" y="154" width="9" height="18" rx="4.5" fill={k.case} />
        <rect x="42" y="62" width="136" height="176" rx="36" fill={k.case} />
        <rect x="42" y="62" width="136" height="176" rx="36" fill={`url(#sh-${u})`} />
        <rect x="55" y="76" width="110" height="148" rx="26" fill={k.dial} stroke="#ffffff" strokeOpacity=".07" />
        <text x="110" y="112" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" letterSpacing="2" fill={k.accent}>FRI 24</text>
        <text x="110" y="152" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="bold" fill="#f5f5f7">10:08</text>
        <g transform="rotate(-90 110 188)">
          <circle cx="110" cy="188" r="15" fill="none" stroke="#ffffff" strokeOpacity=".12" strokeWidth="4" />
          <circle cx="110" cy="188" r="15" fill="none" stroke={k.accent} strokeWidth="4" strokeLinecap="round" strokeDasharray="66 100" />
        </g>
        <text x="110" y="216" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" letterSpacing="1" fill="#8b8f98">8,540 STEPS</text>
        <path d="M62 82 L96 82 L74 118 L58 112 Z" fill="#ffffff" opacity=".045" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 220 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={name}>
      {defs}
      <ellipse cx="110" cy="150" rx="102" ry="112" fill={`url(#gl-${u})`} />
      {straps}
      <rect x="192" y="140" width="13" height="18" rx="4" fill={k.case} />
      <rect x="192" y="140" width="13" height="18" rx="4" fill={`url(#sh-${u})`} />
      <circle cx="110" cy="150" r="82" fill={k.case} />
      <circle cx="110" cy="150" r="82" fill={`url(#sh-${u})`} />
      <circle cx="110" cy="150" r="72" fill={k.bezel} />
      <circle cx="110" cy="150" r="72" fill={`url(#sh-${u})`} opacity=".6" />
      <circle cx="110" cy="150" r="64" fill={k.dial} />
      <circle cx="110" cy="150" r="64" fill={`url(#vg-${u})`} />
      <TickMarks cx={110} cy={150} r={64} color={k.accent} />
      <text x="110" y="127" textAnchor="middle" fontFamily="Georgia, serif" fontSize="8.5" letterSpacing="2.5" fill={k.accent} opacity=".92">TIME ZONE</text>
      <text x="110" y="188" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="5.5" letterSpacing="2" fill={k.accent} opacity=".55">AUTOMATIC</text>
      <g strokeLinecap="round">
        <g transform="rotate(-55 110 150)"><line x1="110" y1="150" x2="110" y2="116" stroke={k.accent} strokeWidth="5" /></g>
        <g transform="rotate(55 110 150)"><line x1="110" y1="150" x2="110" y2="100" stroke={k.accent} strokeWidth="3.4" /></g>
        <g transform="rotate(160 110 150)"><line x1="110" y1="158" x2="110" y2="94" stroke={k.accent} strokeWidth="1.3" opacity=".85" /></g>
      </g>
      <circle cx="110" cy="150" r="5" fill={k.accent} />
      <circle cx="110" cy="150" r="2" fill={k.dial} />
      <ellipse cx="88" cy="116" rx="34" ry="16" fill="#ffffff" opacity=".05" transform="rotate(-24 88 116)" />
    </svg>
  );
}