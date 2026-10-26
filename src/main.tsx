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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
