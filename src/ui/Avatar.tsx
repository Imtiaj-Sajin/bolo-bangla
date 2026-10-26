// Flat illustrated busts of the family, built from a few parts.
import type { CharId } from '../content/types';

type Hair = 'short' | 'long' | 'bun' | 'spiky' | 'pigtails' | 'none';
type Head = 'hijab' | 'sari' | 'tupi' | 'gamchha' | 'none';
type Face = 'beardGrey' | 'beardBlack' | 'stubble' | 'mustache' | 'none';

interface Look {
  skin: string;
  hair: Hair;
  hairColor?: string;
  head?: Head;
  headColor?: string;
  face?: Face;
  glasses?: boolean;
  clothes: string;
  extra?: 'flower' | 'orna' | 'stethoscope' | 'shoulderGamchha' | 'earrings' | 'ribbons';
  bg: string;
  small?: boolean;
}

const LOOKS: Record<Exclude<CharId, 'doel'>, Look> = {
  you: { skin: '#e3b088', hair: 'long', hairColor: '#2a1d17', clothes: '#00b39b', extra: 'flower', bg: '#c9f3ea' },
  rafi: { skin: '#c68b5e', hair: 'short', hairColor: '#1d1512', face: 'stubble', clothes: '#1cb0f6', bg: '#cdeefe' },
  amma: { skin: '#c98f63', hair: 'none', head: 'hijab', headColor: '#b8336a', clothes: '#b8336a', bg: '#fbd3e3' },
  abba: { skin: '#b98055', hair: 'none', head: 'tupi', face: 'beardGrey', glasses: true, clothes: '#f4f1ea', bg: '#e6efe0' },
  dadi: { skin: '#bf865a', hair: 'none', head: 'sari', headColor: '#f6f3ec', glasses: true, clothes: '#f6f3ec', bg: '#efe6d6' },
  nila: { skin: '#d29a6e', hair: 'bun', hairColor: '#20160f', clothes: '#7f5af0', extra: 'orna', bg: '#e3dcff' },
  tanim: { skin: '#c28659', hair: 'spiky', hairColor: '#1b1310', clothes: '#58cc02', bg: '#dcf7c4' },
  mitu: { skin: '#d9a073', hair: 'pigtails', hairColor: '#22170f', clothes: '#ffc800', extra: 'ribbons', bg: '#fff1bf', small: true },
  khala: { skin: '#c4895c', hair: 'none', head: 'hijab', headColor: '#7b4fd6', glasses: true, clothes: '#7b4fd6', bg: '#e6dcfb' },
  chacha: { skin: '#b57c50', hair: 'short', hairColor: '#1a1310', face: 'beardBlack', glasses: true, clothes: '#8d99a6', bg: '#e1e6ea' },
  dokandar: { skin: '#a8714a', hair: 'short', hairColor: '#1a1310', face: 'mustache', clothes: '#f2a33a', extra: 'shoulderGamchha', bg: '#ffe4bf' },
  rickshaw: { skin: '#9c6741', hair: 'none', head: 'gamchha', face: 'stubble', clothes: '#4b5d6b', bg: '#dde4ea' },
  doctor: { skin: '#cf976b', hair: 'bun', hairColor: '#20160f', clothes: '#ffffff', extra: 'stethoscope', bg: '#d6ecfb' },
};

function shade(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16);
  const c = (v: number) => Math.max(0, Math.min(255, Math.round(v + amt)));
  return `rgb(${c(n >> 16)}, ${c((n >> 8) & 255)}, ${c(n & 255)})`;
}

export function Avatar({ who, size = 64, ring = true }: { who: CharId; size?: number; ring?: boolean }) {
  if (who === 'doel') return <DoelHead size={size} />;
  const L = LOOKS[who];
  const hair = L.hairColor ?? '#1d1512';
  const s = L.small ? 0.9 : 1;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={who}>
      <defs>
        <clipPath id={`clip-${who}`}>
          <circle cx="50" cy="50" r="50" />
        </clipPath>
      </defs>
      <g clipPath={`url(#clip-${who})`}>
        {ring && <circle cx="50" cy="50" r="50" fill={L.bg} />}
        <g transform={`translate(${50 - 50 * s} ${100 - 100 * s}) scale(${s})`}>
          {/* hair behind the head */}
          {L.hair === 'long' && <path d="M27 42c0-18 10-26 23-26s23 8 23 26v40H27z" fill={hair} />}
          {L.head === 'hijab' && <path d="M22 100V62c0-26 12-44 28-44s28 18 28 44v38z" fill={L.headColor} />}
          {L.head === 'sari' && (
            <>
              <path d="M21 100V60c0-25 13-43 29-43s29 18 29 43v40z" fill={L.headColor} />
              <path d="M21 100V60c0-25 13-43 29-43s29 18 29 43" fill="none" stroke="#3a9a5b" strokeWidth="3" />
            </>
          )}
          {/* body */}
          <path d="M12 100c0-20 16-32 38-32s38 12 38 32z" fill={L.clothes} />
          {L.clothes === '#ffffff' && <path d="M12 100c0-20 16-32 38-32s38 12 38 32" fill="none" stroke="#cfd8dc" strokeWidth="2" />}
          {L.head !== 'hijab' && L.head !== 'sari' && <rect x="43" y="58" width="14" height="14" rx="5" fill={shade(L.skin, -18)} />}
          {L.extra === 'orna' && <path d="M14 96c8-16 20-24 36-24 10 0 16 3 21 7-10 2-22 8-32 21z" fill="#ff86d0" opacity=".95" />}
          {L.extra === 'shoulderGamchha' && <path d="M60 70l18 4-6 26h-10z" fill="#e34b4b" />}
          {L.extra === 'stethoscope' && (
            <path d="M38 70c0 14 6 18 12 18s12-4 12-18" fill="none" stroke="#3c4a55" strokeWidth="3" strokeLinecap="round" />
          )}
          {/* ears + face */}
          {L.head !== 'hijab' && L.head !== 'sari' && (
            <>
              <circle cx="31" cy="46" r="4.5" fill={shade(L.skin, -10)} />
              <circle cx="69" cy="46" r="4.5" fill={shade(L.skin, -10)} />
            </>
          )}
          <ellipse cx="50" cy="45" rx={L.head === 'hijab' || L.head === 'sari' ? 16.5 : 19} ry={L.head === 'hijab' || L.head === 'sari' ? 19 : 21} fill={L.skin} />
          {L.extra === 'earrings' && (
            <>
              <circle cx="31" cy="53" r="2" fill="#ffc800" />
              <circle cx="69" cy="53" r="2" fill="#ffc800" />
            </>
          )}
          {/* hair on top */}
          {(L.hair === 'short' || L.hair === 'bun' || L.hair === 'pigtails') && (
            <path d="M30 42c-1-16 9-24 20-24 12 0 21 7 20 24-4-8-11-12-20-12-8 0-16 4-20 12z" fill={hair} />
          )}
          {L.hair === 'long' && <path d="M29 44c-1-17 9-25 21-25 13 0 22 8 21 25-6-10-14-13-21-13-9 0-16 4-21 13z" fill={hair} />}
          {L.hair === 'spiky' && (
            <path d="M29 42l1-13 5 4 3-9 5 5 5-9 4 8 6-7 3 9 6-3-1 15c-5-7-12-10-20-10s-15 3-21 10z" fill={hair} />
          )}
          {L.hair === 'bun' && <circle cx="50" cy="17" r="8" fill={hair} />}
          {L.hair === 'pigtails' && (
            <>
              <circle cx="27" cy="40" r="7" fill={hair} />
              <circle cx="73" cy="40" r="7" fill={hair} />
              <circle cx="30" cy="34" r="2.6" fill="#ff4b4b" />
              <circle cx="70" cy="34" r="2.6" fill="#ff4b4b" />
            </>
          )}
          {L.head === 'tupi' && (
            <>
              <path d="M31 34c2-10 10-15 19-15s17 5 19 15z" fill="#fbfbf8" />
              <path d="M31 34h38" stroke="#d9d5c8" strokeWidth="2.2" />
            </>
          )}
          {L.head === 'gamchha' && (
            <>
              <path d="M30 37c3-12 11-17 20-17s17 5 20 17z" fill="#1d1512" />
              <rect x="29" y="30" width="42" height="8" rx="4" fill="#e34b4b" />
              <path d="M33 30v8M39 30v8M45 30v8M51 30v8M57 30v8M63 30v8" stroke="#fff" strokeOpacity=".55" strokeWidth="1.2" />
            </>
          )}
          {L.head === 'hijab' && <path d="M32 34c4-9 10-13 18-13s14 4 18 13c-5-4-11-6-18-6s-13 2-18 6z" fill={shade(L.headColor!, -14)} />}
          {L.head === 'sari' && <path d="M33 33c4-8 10-12 17-12s13 4 17 12c-5-3-11-5-17-5s-12 2-17 5z" fill="#c9c5bb" />}
          {/* facial hair */}
          {(L.face === 'beardGrey' || L.face === 'beardBlack' || L.face === 'stubble') && (
            <path
              d="M31.5 47c1 17 9 22 18.5 22s17.5-5 18.5-22c-3 9-9 13-18.5 13S34.5 56 31.5 47z"
              fill={L.face === 'beardGrey' ? '#d8d8d2' : '#1d1512'}
              opacity={L.face === 'stubble' ? 0.22 : 1}
            />
          )}
          {(L.face === 'mustache' || L.face === 'beardGrey' || L.face === 'beardBlack') && (
            <path d="M42 54.5c3-2.4 5.4-2.4 8-.8 2.6-1.6 5-1.6 8 .8-3 1-5.4 1.2-8 .2-2.6 1-5 .8-8-.2z" fill={L.face === 'beardGrey' ? '#d8d8d2' : '#1d1512'} />
          )}
          {/* eyes, brows, mouth */}
          <ellipse cx="43" cy="45" rx="2.3" ry="2.9" fill="#231a16" />
          <ellipse cx="57" cy="45" rx="2.3" ry="2.9" fill="#231a16" />
          <circle cx="43.8" cy="44" r=".8" fill="#fff" />
          <circle cx="57.8" cy="44" r=".8" fill="#fff" />
          <path d="M39.5 39.5q3.5-2 7 0M53.5 39.5q3.5-2 7 0" stroke={L.head === 'sari' || L.face === 'beardGrey' ? '#9a948a' : '#231a16'} strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <circle cx="38.5" cy="51" r="3" fill="#ff7a7a" opacity=".22" />
          <circle cx="61.5" cy="51" r="3" fill="#ff7a7a" opacity=".22" />
          {L.face !== 'beardGrey' && L.face !== 'beardBlack' && <path d="M44.5 55.5q5.5 4.5 11 0" stroke="#7a3b2e" strokeWidth="1.9" fill="none" strokeLinecap="round" />}
          {L.glasses && (
            <g fill="none" stroke="#3c3c3c" strokeWidth="1.5">
              <circle cx="43" cy="45" r="5.2" />
              <circle cx="57" cy="45" r="5.2" />
              <path d="M48.2 45h3.6" />
            </g>
          )}
          {L.extra === 'flower' && (
            <g transform="translate(66 28)">
              {[0, 72, 144, 216, 288].map((a) => (
                <circle key={a} cx={Math.cos((a * Math.PI) / 180) * 3.6} cy={Math.sin((a * Math.PI) / 180) * 3.6} r="3" fill="#ff86d0" />
              ))}
              <circle r="2" fill="#ffc800" />
            </g>
          )}
        </g>
      </g>
    </svg>
  );
}

/** Small round Doel head used where a character avatar is expected. */
function DoelHead({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="Doel">
      <circle cx="50" cy="50" r="50" fill="#d7f5c4" />
      <ellipse cx="50" cy="62" rx="30" ry="32" fill="#25343e" />
      <ellipse cx="50" cy="74" rx="19" ry="20" fill="#ffffff" />
      <circle cx="40" cy="50" r="9" fill="#fff" />
      <circle cx="60" cy="50" r="9" fill="#fff" />
      <circle cx="41.5" cy="51" r="4.6" fill="#1b252c" />
      <circle cx="58.5" cy="51" r="4.6" fill="#1b252c" />
      <path d="M45 60l5 6 5-6z" fill="#ffb02e" />
    </svg>
  );
}
