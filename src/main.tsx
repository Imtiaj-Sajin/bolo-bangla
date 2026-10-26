import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import '@fontsource-variable/nunito';
import './styles/tokens.css';
import './styles/app.css';
import { App } from './App';
import { loadManifest } from './audio/speech';

registerSW({ immediate: true });
void loadManifest();

// Dev-only: lets the automated walkthrough fast-forward through the path.
if (import.meta.env.DEV) {
  void import('./engine/course').then(({ COURSE }) => {
    (window as unknown as { __boloPath: unknown }).__boloPath = COURSE.path.map((n) => ({ id: n.id, rounds: n.rounds, kind: n.kind }));
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
