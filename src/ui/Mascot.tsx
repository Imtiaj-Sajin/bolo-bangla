// Doel — the oriental magpie-robin, national bird of Bangladesh — is the course mascot.
// It wears a little green-and-red scarf (the Bangladesh flag colours).

export type Mood = 'happy' | 'cheer' | 'sad' | 'think' | 'wave';

export function Mascot({ mood = 'happy', size = 120, className }: { mood?: Mood; size?: number; className?: string }) {
  const wingUp = mood === 'cheer' || mood === 'wave';
  return (
    <svg
      className={className}
      width={size}
      height={(size * 130) / 120}
      viewBox="0 0 120 130"
      role="img"
      aria-label="Doel the bird"
    >
      {/* tail */}
      <path d="M86 84c10-8 18-22 20-40 2 2 3 6 3 10-1 16-9 30-20 38z" fill="#1f2c35" />
      <path d="M104 46c2 2 3 6 3 10-1 9-4 17-8 24 2-10 4-21 5-34z" fill="#ffffff" opacity=".9" />
      {/* feet */}
      <path d="M48 112v10M42 122h12M72 112v10M66 122h12" stroke="#5b6b75" strokeWidth="4" strokeLinecap="round" />
      {/* body */}
      <ellipse cx="60" cy="72" rx="40" ry="44" fill="#26353f" />
      <ellipse cx="60" cy="72" rx="40" ry="44" fill="none" stroke="#3b4d59" strokeWidth="2" />
      <ellipse cx="60" cy="88" rx="25" ry="27" fill="#ffffff" />
      {/* wings */}
      {wingUp ? (
        <>
          <path d="M22 70C8 60 6 42 12 34c6 10 14 16 22 20z" fill="#1f2c35" />
          <path d="M14 40c5 7 11 12 18 15" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M98 70c14-10 16-28 10-36-6 10-14 16-22 20z" fill="#1f2c35" />
        </>
      ) : (
        <>
          <path d="M22 66c-6 14-4 30 6 40 4-10 8-22 8-36z" fill="#1f2c35" />
          <path d="M25 78c0 8 2 15 5 21" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M98 66c6 14 4 30-6 40-4-10-8-22-8-36z" fill="#1f2c35" />
        </>
      )}
      {/* scarf */}
      <path d="M33 58c16 9 38 9 54 0l2 9c-18 10-40 10-58 0z" fill="#006a4e" />
      <circle cx="74" cy="65" r="4" fill="#f42a41" />
      <path d="M40 64l-6 16 9-3 2-11z" fill="#006a4e" />
      {/* eyes */}
      {mood === 'sad' ? (
        <>
          <ellipse cx="46" cy="40" rx="11" ry="11" fill="#fff" />
          <ellipse cx="74" cy="40" rx="11" ry="11" fill="#fff" />
          <circle cx="47" cy="43" r="5.5" fill="#141c22" />
          <circle cx="73" cy="43" r="5.5" fill="#141c22" />
          <path d="M35 33l20 4M85 33l-20 4" stroke="#26353f" strokeWidth="5" strokeLinecap="round" />
        </>
      ) : mood === 'cheer' ? (
        <>
          <path d="M37 42q9-10 18 0" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M65 42q9-10 18 0" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <ellipse cx="46" cy="39" rx="11" ry="12" fill="#fff" />
          <ellipse cx="74" cy="39" rx="11" ry="12" fill="#fff" />
          <circle cx={mood === 'think' ? 50 : 48} cy={mood === 'think' ? 35 : 40} r="5.8" fill="#141c22" />
          <circle cx={mood === 'think' ? 78 : 72} cy={mood === 'think' ? 35 : 40} r="5.8" fill="#141c22" />
          <circle cx={mood === 'think' ? 52 : 50} cy={mood === 'think' ? 33 : 38} r="1.8" fill="#fff" />
          <circle cx={mood === 'think' ? 80 : 74} cy={mood === 'think' ? 33 : 38} r="1.8" fill="#fff" />
        </>
      )}
      {/* beak */}
      {mood === 'cheer' || mood === 'happy' || mood === 'wave' ? (
        <>
          <path d="M52 50h16l-8 7z" fill="#ffb02e" />
          <path d="M54 52.5h12l-6 6z" fill="#d9534f" />
        </>
      ) : (
        <path d="M53 50h14l-7 8z" fill="#ffb02e" />
      )}
      {/* cheeks */}
      <circle cx="36" cy="52" r="4" fill="#ff86d0" opacity=".35" />
      <circle cx="84" cy="52" r="4" fill="#ff86d0" opacity=".35" />
    </svg>
  );
}
