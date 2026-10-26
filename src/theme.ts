import type { Theme } from './state/store';

/** Reflect the theme setting in <meta name="color-scheme">; CSS maps it back to color-scheme. */
export function applyTheme(theme: Theme) {
  const meta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
  const value = theme === 'system' ? 'light dark' : theme;
  if (meta) meta.content = value;
  try {
    if (theme === 'system') localStorage.removeItem('color-scheme');
    else localStorage.setItem('color-scheme', theme);
  } catch {
    // The theme still applies for this visit.
  }
  const dark = theme === 'dark' || (theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#131f24' : '#ffffff');
}
