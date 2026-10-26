// One filled icon family, drawn on a 24px grid.
import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement> & { size?: number };

const svg = (size: number | undefined, rest: SVGProps<SVGSVGElement>) => ({
  width: size ?? 24,
  height: size ?? 24,
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  'aria-hidden': true,
  ...rest,
});

export const Star = ({ size, ...p }: P) => (
  <svg {...svg(size, p)}>
    <path
      d="M12 2.8l2.75 5.6 6.15.9-4.45 4.33 1.05 6.12L12 16.87l-5.5 2.88 1.05-6.12L3.1 9.3l6.15-.9z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

export const Dumbbell = ({ size, ...p }: P) => (
  <svg {...svg(size, p)}>
    <rect x="2" y="9" width="3" height="6" rx="1.2" />
    <rect x="5" y="6.5" width="3.4" height="11" rx="1.4" />
    <rect x="15.6" y="6.5" width="3.4" height="11" rx="1.4" />
    <rect x="19" y="9" width="3" height="6" rx="1.2" />
    <rect x="8" y="10.6" width="8" height="2.8" rx="1" />
  </svg>
);

export const Headphones = ({ size, ...p }: P) => (
  <svg {...svg(size, p)}>
    <path d="M12 3.5a8.5 8.5 0 0 0-8.5 8.5v3h2.6v-3a5.9 5.9 0 0 1 11.8 0v3h2.6v-3A8.5 8.5 0 0 0 12 3.5z" />
    <rect x="3" y="13" width="5" height="7.5" rx="2.2" />
    <rect x="16" y="13" width="5" height="7.5" rx="2.2" />
  </svg>
);

export const Book = ({ size, ...p }: P) => (
  <svg {...svg(size, p)}>
    <path d="M11 5.6C9.2 4.4 6.4 4 3.5 4.3c-.6.1-1 .6-1 1.2v12c0 .7.6 1.2 1.3 1.1 2.6-.3 5.1.1 7.2 1.3z" />
    <path d="M13 5.6c1.8-1.2 4.6-1.6 7.5-1.3.6.1 1 .6 1 1.2v12c0 .7-.6 1.2-1.3 1.1-2.6-.3-5.1.1-7.2 1.3z" />
  </svg>
);

export const Chat = ({ size, ...p }: P) => (
  <svg {...svg(size, p)}>
    <path d="M4 4h16a2 2 0 0 1 2 2v9.5a2 2 0 0 1-2 2h-7.6L7 21.4v-3.9H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
  </svg>
);

export const Chest = ({ size, ...p }: P) => (
  <svg {...svg(size, p)}>
    <path d="M4.5 4h15A2.5 2.5 0 0 1 22 6.5V10H2V6.5A2.5 2.5 0 0 1 4.5 4z" />
    <path d="M2 11.5h20V19a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 19z" />
    <rect x="10" y="8.5" width="4" height="5" rx="1.2" fill="var(--bg, #fff)" opacity=".85" />
  </svg>
);

export const Trophy = ({ size, ...p }: P) => (
  <svg {...svg(size, p)}>
    <path d="M7 3h10v2h3.2c.5 0 .8.4.8.8 0 3.3-2 5.6-5 6A5 5 0 0 1 13 14.6V17h3v3.5H8V17h3v-2.4a5 5 0 0 1-3-2.8c-3-.4-5-2.7-5-6 0-.4.3-.8.8-.8H7zm0 3.8H4.9c.3 1.7 1.2 2.8 2.4 3.2-.2-.6-.3-1.3-.3-2zm10 0V8c0 .7-.1 1.4-.3 2 1.2-.4 2.1-1.5 2.4-3.2z" />
  </svg>
);

export const Crown = ({ size, ...p }: P) => (
  <svg {...svg(size, p)}>
    <path d="M3 7.5l4.6 3.6L12 4l4.4 7.1L21 7.5 19.2 18H4.8z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <rect x="4.8" y="19.2" width="14.4" height="2" rx="1" />
  </svg>
);

export const Lock = ({ size, ...p }: P) => (
  <svg {...svg(size, p)}>
    <path d="M7 10V7.5a5 5 0 0 1 10 0V10h-2.6V7.5a2.4 2.4 0 0 0-4.8 0V10z" />
    <rect x="4.5" y="10" width="15" height="11" rx="2.6" />
  </svg>
);

export const Fire = ({ size, ...p }: P) => (
  <svg {...svg(size, p)}>
    <path d="M12.6 2.2c.4 2.8-.9 4.4-2.4 6-1.6 1.7-3.4 3.5-3.4 6.6a5.2 5.2 0 0 0 10.4.1c0-1.9-.8-3.3-1.7-4.4-.2 1.2-.9 2.1-1.9 2.4.7-2.6.2-5.5-1-10.7z" />
    <path d="M12 22c-3.6 0-6.5-2.6-6.5-6.4 0-2.1.8-3.9 2-5.4-.1 2.6 1 4.3 2.3 4.3-.3-3.1 1.2-5.5 2.6-7.2.5 2.8 2.6 3.9 3.8 6.1.6 1 .9 2 .9 3.1C17.1 19.7 15 22 12 22z" opacity=".55" />
  </svg>
);

export const Gem = ({ size, ...p }: P) => (
  <svg {...svg(size, p)}>
    <path d="M12 2.5l8 4.6v9.8l-8 4.6-8-4.6V7.1z" />
    <path d="M12 2.5v19l-8-4.6V7.1z" opacity=".25" fill="#000" />
    <path d="M8.2 7.6L12 5.4l3.8 2.2" stroke="#fff" strokeOpacity=".7" strokeWidth="1.3" fill="none" strokeLinecap="round" />
  </svg>
);

export const Bolt = ({ size, ...p }: P) => (
  <svg {...svg(size, p)}>
    <path d="M13.5 2L4.8 13.4h6L9.6 22l9.6-12.2h-6.1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);

export const Heart = ({ size, ...p }: P) => (
  <svg {...svg(size, p)}>
    <path d="M12 21s-8.5-5.2-8.5-11.3A4.7 4.7 0 0 1 12 6.6a4.7 4.7 0 0 1 8.5 3.1C20.5 15.8 12 21 12 21z" />
  </svg>
);

export const Close = ({ size, ...p }: P) => (
  <svg {...svg(size, p)} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
    <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />
  </svg>
);

export const Speaker = ({ size, ...p }: P) => (
  <svg {...svg(size, p)}>
    <path d="M3 9.2h3.6L11.4 5c.7-.6 1.6-.1 1.6.8v12.4c0 .9-.9 1.4-1.6.8l-4.8-4.2H3a1 1 0 0 1-1-1V10.2a1 1 0 0 1 1-1z" />
    <path d="M15.6 8.6a5 5 0 0 1 0 6.8M18.2 6a8.6 8.6 0 0 1 0 12" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" />
  </svg>
);

export const Turtle = ({ size, ...p }: P) => (
  <svg {...svg(size, p)}>
    <path d="M3.5 15.5c0-4.2 3.3-7.5 7.5-7.5s7.5 3.3 7.5 7.5z" />
    <circle cx="20" cy="13.4" r="2.2" />
    <rect x="5" y="15.5" width="3" height="3.2" rx="1.2" />
    <rect x="13.8" y="15.5" width="3" height="3.2" rx="1.2" />
    <path d="M7.4 10.4l3.6 2.4 3.6-2.4" stroke="var(--bg, #fff)" strokeOpacity=".5" strokeWidth="1.2" fill="none" />
  </svg>
);

export const Mic = ({ size, ...p }: P) => (
  <svg {...svg(size, p)}>
    <rect x="8.5" y="2.5" width="7" height="12" rx="3.5" />
    <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" />
  </svg>
);

export const Check = ({ size, ...p }: P) => (
  <svg {...svg(size, p)} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 12.5l5 5 10-11" />
  </svg>
);

export const Home = ({ size, ...p }: P) => (
  <svg {...svg(size, p)}>
    <path d="M10.6 3.1a2.2 2.2 0 0 1 2.8 0l7.2 6c.5.4.8 1 .8 1.7v8.7a2 2 0 0 1-2 2h-4.2v-6.2H8.8v6.2H4.6a2 2 0 0 1-2-2v-8.7c0-.7.3-1.3.8-1.7z" />
  </svg>
);

export const Cards = ({ size, ...p }: P) => (
  <svg {...svg(size, p)}>
    <rect x="6" y="2.5" width="14" height="17" rx="2.6" opacity=".55" />
    <rect x="3" y="5" width="14" height="17" rx="2.6" />
  </svg>
);

export const Target = ({ size, ...p }: P) => (
  <svg {...svg(size, p)}>
    <circle cx="12" cy="12" r="9.5" opacity=".35" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2.4" fill="var(--bg, #fff)" />
  </svg>
);

export const Person = ({ size, ...p }: P) => (
  <svg {...svg(size, p)}>
    <circle cx="12" cy="7.5" r="4.5" />
    <path d="M3.5 21c.4-4.6 4-7.5 8.5-7.5s8.1 2.9 8.5 7.5z" />
  </svg>
);

export const Guide = ({ size, ...p }: P) => (
  <svg {...svg(size, p)}>
    <rect x="4" y="2.5" width="16" height="19" rx="2.6" />
    <path d="M8 8h8M8 12h8M8 16h5" stroke="var(--c, #000)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ArrowDown = ({ size, ...p }: P) => (
  <svg {...svg(size, p)} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4v15M5.5 12.5L12 19l6.5-6.5" />
  </svg>
);

export const ArrowLeft = ({ size, ...p }: P) => (
  <svg {...svg(size, p)} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 5l-7 7 7 7" />
  </svg>
);

export const Gear = ({ size, ...p }: P) => (
  <svg {...svg(size, p)}>
    <path d="M10.3 2h3.4l.5 2.6 1.9.8 2.2-1.5 2.4 2.4-1.5 2.2.8 1.9 2.6.5v3.4l-2.6.5-.8 1.9 1.5 2.2-2.4 2.4-2.2-1.5-1.9.8-.5 2.6h-3.4l-.5-2.6-1.9-.8-2.2 1.5-2.4-2.4 1.5-2.2-.8-1.9L2 13.7v-3.4l2.6-.5.8-1.9-1.5-2.2 2.4-2.4 2.2 1.5 1.9-.8zM12 8.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8z" />
  </svg>
);

export const Share = ({ size, ...p }: P) => (
  <svg {...svg(size, p)}>
    <circle cx="18" cy="5.5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="18.5" r="3" />
    <path d="M8.6 10.6l6.8-3.7M8.6 13.4l6.8 3.7" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const Play = ({ size, ...p }: P) => (
  <svg {...svg(size, p)}>
    <path d="M7 4.6v14.8c0 .8.9 1.3 1.6.9l11.8-7.4c.6-.4.6-1.4 0-1.8L8.6 3.7C7.9 3.3 7 3.8 7 4.6z" />
  </svg>
);

export const Stop = ({ size, ...p }: P) => (
  <svg {...svg(size, p)}>
    <rect x="5" y="5" width="14" height="14" rx="3" />
  </svg>
);

export const Download = ({ size, ...p }: P) => (
  <svg {...svg(size, p)} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3.5v11M7 10l5 5 5-5M4.5 19.5h15" />
  </svg>
);

export const Snow = ({ size, ...p }: P) => (
  <svg {...svg(size, p)} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <path d="M12 2.5v19M3.8 7.2l16.4 9.6M3.8 16.8l16.4-9.6M9.5 4l2.5 2.5L14.5 4M9.5 20l2.5-2.5 2.5 2.5" />
  </svg>
);

/** Bangladesh flag. */
export const FlagBD = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={(size * 3) / 4} viewBox="0 0 20 15" aria-hidden="true" style={{ borderRadius: 4 }}>
    <rect width="20" height="15" rx="2" fill="var(--bd-green)" />
    <circle cx="9" cy="7.5" r="4.2" fill="var(--bd-red)" />
  </svg>
);
