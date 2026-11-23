import { useId } from 'react'

function BrandMonogram() {
  const id = useId().replace(/:/g, '')

  return (
    <svg className="brand-monogram" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`marble-base-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#141B2D" />
          <stop offset=".52" stopColor="#1C2640" />
          <stop offset="1" stopColor="#141B2D" />
        </linearGradient>
        <linearGradient id={`gold-edge-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF8C82" />
          <stop offset=".5" stopColor="#FF5A4E" />
          <stop offset="1" stopColor="#C83F36" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="94" height="94" fill={`url(#marble-base-${id})`} />
      <path d="M-5 27C18 20 24 41 43 34S72 12 105 18M-4 78c26-20 41 6 62-4s27-27 47-27M18 105c17-17 16-32 31-43s26-8 43-27" fill="none" stroke="#F4F1EA" strokeOpacity=".18" strokeWidth="1.2" />
      <path d="M-4 31C18 24 26 45 45 38s31-24 63-17M12 101c16-16 17-28 33-39" fill="none" stroke="#FF5A4E" strokeOpacity=".28" strokeWidth=".65" />
      <rect x="4.5" y="4.5" width="91" height="91" fill="none" stroke={`url(#gold-edge-${id})`} strokeWidth="1.5" />
      <rect x="9" y="9" width="82" height="82" fill="none" stroke="#FF5A4E" strokeOpacity=".42" strokeWidth=".55" />
      <text x="50" y="58" fill="#F4F1EA" fontFamily="Georgia, 'Times New Roman', serif" fontSize="29" letterSpacing="-2" textAnchor="middle">T&amp;T</text>
      <path d="M35 68h30" fill="none" stroke="#FF5A4E" strokeWidth=".8" />
      <text x="50" y="78" fill="#F4F1EA" fontFamily="Arial, sans-serif" fontSize="5.4" letterSpacing="2" textAnchor="middle">THEMO TILE</text>
    </svg>
  )
}

export default BrandMonogram
