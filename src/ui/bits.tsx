import { useEffect, useRef, useState, type ReactNode } from 'react';
import { hasAudio, speak } from '../audio/speech';
import type { Voice } from '../content/types';
import { segment } from '../engine/course';
import { first } from '../engine/text';
import { useProgress } from '../state/store';
import { Speaker, Turtle } from './icons';

export function SpeakButton({
  text,
  voice = 'f',
  size = 'normal',
  slow = false,
  label = 'Play audio',
}: {
  text: string;
  voice?: Voice;
  size?: 'normal' | 'big' | 'slow' | 'small';
  slow?: boolean;
  label?: string;
}) {
  const ok = hasAudio(text, voice);
  return (
    <button
      type="button"
      className={`speaker ${size === 'normal' ? '' : size} ${ok ? '' : 'disabled'}`}
      aria-label={label}
      onClick={() => void speak(text, voice, slow)}
    >
      {slow ? <Turtle size={size === 'slow' ? 32 : 24} /> : <Speaker size={size === 'big' ? 56 : size === 'small' ? 20 : 26} />}
    </button>
  );
}

/** Banglish text where each known word can be tapped to see its meaning. */
export function HintText({ bn, className }: { bn: string; className?: string }) {
  const lang = useProgress().profile.lang;
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (open === null) return;
    const close = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [open]);
  const segs = segment(bn);
  return (
    <span ref={ref} className={className}>
      {segs.map((s, i) => (
        <span key={i}>
          {i > 0 && ' '}
          {s.gloss ? (
            <button type="button" className="hint-word" onClick={() => setOpen(open === i ? null : i)}>
              {s.text}
              {open === i && <span className="hint-pop">{first(s.gloss[lang])}</span>}
            </button>
          ) : (
            <span className="hint-word nogloss">{s.text}</span>
          )}
        </span>
      ))}
    </span>
  );
}

/** Native <dialog> opened with showModal(): gets focus handling and Android back-gesture close for free. */
export function Modal({
  open,
  onClose,
  className = 'sheet',
  labelledBy,
  children,
}: {
  open: boolean;
  onClose: () => void;
  className?: string;
  labelledBy?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog ref={ref} className={className} aria-labelledby={labelledBy} onClose={onClose}>
      {open && children}
    </dialog>
  );
}

export function Bar({ value, className }: { value: number; className?: string }) {
  return (
    <div className={`bar ${className ?? ''}`} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(value * 100)}>
      <i style={{ width: `${Math.max(0, Math.min(1, value)) * 100}%` }} />
    </div>
  );
}

export function Toast({ text, onDone }: { text: string | null; onDone: () => void }) {
  useEffect(() => {
    if (!text) return;
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [text, onDone]);
  return text ? (
    <div className="toast" role="status">
      {text}
    </div>
  ) : null;
}
