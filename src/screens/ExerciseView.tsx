import { useEffect, useMemo, useRef, useState } from 'react';
import { hasAudio, speak } from '../audio/speech';
import { sfx } from '../audio/sfx';
import { CHARACTERS } from '../content/characters';
import type { Exercise } from '../engine/exercises';
import { judgeBanglish, judgeTiles, type Verdict } from '../engine/text';
import { useT } from '../i18n/ui';
import { useProgress } from '../state/store';
import { Avatar } from '../ui/Avatar';
import { Mascot } from '../ui/Mascot';
import { HintText, SpeakButton } from '../ui/bits';
import { Mic, Play, Star, Stop } from '../ui/icons';

export interface CheckResult {
  verdict: Verdict;
  /** For typos: the accepted answer closest to what was typed. */
  best?: string;
  /** Finished, but not cleanly (e.g. a wrong tap while matching pairs). */
  imperfect?: boolean;
}

export interface ExProps {
  ex: Exercise;
  /** Set once the answer was checked; renderers show right/wrong state. */
  checked: CheckResult | null;
  setCheck: (fn: (() => CheckResult) | null) => void;
  /** For self-completing exercises (match, speak). */
  done: (r: CheckResult) => void;
}

export function ExerciseView(props: ExProps) {
  const { ex } = props;
  // Autoplay the Bangla audio when an exercise appears (the learner already tapped to start).
  useEffect(() => {
    const autoplay = ['pickImage', 'pickMeaning', 'listenBuild', 'listenPick', 'chat', 'speak', 'buildNative'];
    if (ex.bn && autoplay.includes(ex.kind)) void speak(ex.bn, ex.voice);
  }, [ex]);

  switch (ex.kind) {
    case 'pickImage':
      return <PickImage {...props} />;
    case 'pickMeaning':
      return <PickMeaning {...props} />;
    case 'pickBn':
      return <PickBn {...props} />;
    case 'buildNative':
    case 'buildBn':
    case 'listenBuild':
      return <Build {...props} />;
    case 'listenPick':
      return <ListenPick {...props} />;
    case 'match':
      return <Match {...props} />;
    case 'fill':
      return <Fill {...props} />;
    case 'chat':
      return <ChatEx {...props} />;
    case 'typeBn':
      return <TypeBn {...props} />;
    case 'speak':
      return <Speak {...props} />;
  }
}

function NewBadge() {
  const t = useT();
  return (
    <div className="new-badge">
      <Star size={16} /> {t('newWord')}
    </div>
  );
}

/** Single-choice state shared by the multiple-choice renderers. */
function useChoice(ex: Exercise, setCheck: ExProps['setCheck'], onPick?: (i: number) => void) {
  const [sel, setSel] = useState<number | null>(null);
  const pick = (i: number) => {
    sfx.tap();
    setSel(i);
    onPick?.(i);
    setCheck(() => ({ verdict: i === ex.answer ? 'right' : 'wrong' }));
  };
  return { sel, pick };
}

function choiceClass(i: number, sel: number | null, ex: Exercise, checked: CheckResult | null) {
  if (!checked) return '';
  if (i === ex.answer) return 'right';
  return i === sel ? 'wrong' : '';
}

function PickImage({ ex, checked, setCheck }: ExProps) {
  const t = useT();
  const { sel, pick } = useChoice(ex, setCheck);
  return (
    <>
      {ex.isNew && <NewBadge />}
      <h1 className="ex-title">{t('exPickImage')}</h1>
      <div className="prompt-row" style={{ alignItems: 'center' }}>
        <SpeakButton text={ex.bn!} voice={ex.voice} />
        <span style={{ fontSize: 22, fontWeight: 800 }}>{ex.isNew ? <HintText bn={ex.bn!} /> : ex.bn}</span>
      </div>
      <div className="image-grid">
        {ex.options!.map((o, i) => (
          <button
            key={i}
            type="button"
            className={`image-card ${choiceClass(i, sel, ex, checked)}`}
            aria-pressed={sel === i}
            disabled={!!checked}
            onClick={() => pick(i)}
          >
            <span className="em" aria-hidden="true">
              {o.emoji}
            </span>
            {o.text}
          </button>
        ))}
      </div>
    </>
  );
}

function Choices({ ex, sel, pick, checked, render }: { ex: Exercise; sel: number | null; pick: (i: number) => void; checked: CheckResult | null; render?: (i: number) => React.ReactNode }) {
  return (
    <div className="choices">
      {ex.options!.map((o, i) => (
        <button
          key={i}
          type="button"
          className={`choice ${choiceClass(i, sel, ex, checked)}`}
          aria-pressed={sel === i}
          disabled={!!checked}
          onClick={() => pick(i)}
        >
          <span className="num">{i + 1}</span>
          <span className="grow">{render ? render(i) : o.text}</span>
        </button>
      ))}
    </div>
  );
}

function PickMeaning({ ex, checked, setCheck }: ExProps) {
  const t = useT();
  const { sel, pick } = useChoice(ex, setCheck);
  const audioOnly = ex.prompt === 'audio';
  return (
    <>
      {ex.isNew && <NewBadge />}
      <h1 className="ex-title">{audioOnly ? t('exPickMeaningAudio') : t('exPickMeaning')}</h1>
      {audioOnly ? (
        <div className="listen-pad">
          <SpeakButton text={ex.bn!} voice={ex.voice} size="big" />
          <SpeakButton text={ex.bn!} voice={ex.voice} size="slow" slow />
        </div>
      ) : (
        <div className="prompt-row">
          <Mascot mood="happy" size={84} />
          <div className="bubble left grow">
            <div className="row">
              <SpeakButton text={ex.bn!} voice={ex.voice} size="small" />
              {ex.isNew ? <HintText bn={ex.bn!} /> : <span>{ex.bn}</span>}
            </div>
          </div>
        </div>
      )}
      <Choices ex={ex} sel={sel} pick={pick} checked={checked} />
    </>
  );
}

function PickBn({ ex, checked, setCheck }: ExProps) {
  const t = useT();
  const { sel, pick } = useChoice(ex, setCheck, (i) => {
    const o = ex.options![i];
    if (o.bn) void speak(o.bn, o.voice);
  });
  return (
    <>
      <h1 className="ex-title">{t('exPickBn')}</h1>
      <div className="bubble" style={{ fontSize: 20 }}>
        “{ex.prompt}”
      </div>
      <Choices ex={ex} sel={sel} pick={pick} checked={checked} />
    </>
  );
}

function ListenPick({ ex, checked, setCheck }: ExProps) {
  const t = useT();
  const { sel, pick } = useChoice(ex, setCheck);
  return (
    <>
      <h1 className="ex-title">{t('exListenPick')}</h1>
      <div className="listen-pad">
        <SpeakButton text={ex.bn!} voice={ex.voice} size="big" />
        <SpeakButton text={ex.bn!} voice={ex.voice} size="slow" slow />
      </div>
      <Choices ex={ex} sel={sel} pick={pick} checked={checked} />
    </>
  );
}

function Build({ ex, checked, setCheck }: ExProps) {
  const t = useT();
  const [chosen, setChosen] = useState<number[]>([]);
  const tiles = ex.tiles!;
  const bnTiles = ex.kind !== 'buildNative';

  useEffect(() => {
    if (!chosen.length) return setCheck(null);
    const built = chosen.map((i) => tiles[i]);
    setCheck(() => ({ verdict: judgeTiles(built, ex.accepted!) ? 'right' : 'wrong' }));
  }, [chosen, tiles, ex, setCheck]);

  const add = (i: number) => {
    if (checked || chosen.includes(i)) return;
    sfx.tap();
    if (bnTiles && hasAudio(tiles[i], 'f')) void speak(tiles[i], 'f');
    setChosen([...chosen, i]);
  };
  const remove = (i: number) => {
    if (checked) return;
    sfx.tap();
    setChosen(chosen.filter((x) => x !== i));
  };

  return (
    <>
      <h1 className="ex-title">
        {ex.kind === 'buildNative' ? t('exBuildNative') : ex.kind === 'buildBn' ? t('exBuildBn') : t('exListenBuild')}
      </h1>
      {ex.kind === 'buildNative' && (
        <div className="prompt-row">
          <Mascot mood="happy" size={84} />
          <div className="bubble left grow">
            <div className="row" style={{ alignItems: 'flex-start' }}>
              <SpeakButton text={ex.bn!} voice={ex.voice} size="small" />
              <HintText bn={ex.bn!} />
            </div>
          </div>
        </div>
      )}
      {ex.kind === 'buildBn' && (
        <div className="prompt-row">
          <Mascot mood="think" size={84} />
          <div className="bubble left grow">{ex.prompt}</div>
        </div>
      )}
      {ex.kind === 'listenBuild' && (
        <div className="listen-pad">
          <SpeakButton text={ex.bn!} voice={ex.voice} size="big" />
          <SpeakButton text={ex.bn!} voice={ex.voice} size="slow" slow />
        </div>
      )}
      <div className="answer-area" aria-label="Your answer">
        {chosen.map((i) => (
          <button key={i} type="button" className="tile" onClick={() => remove(i)}>
            {tiles[i]}
          </button>
        ))}
      </div>
      <div className="bank">
        {tiles.map((tile, i) =>
          chosen.includes(i) ? (
            <span key={i} className="tile ghost" aria-hidden="true">
              {tile}
            </span>
          ) : (
            <button key={i} type="button" className="tile" onClick={() => add(i)}>
              {tile}
            </button>
          ),
        )}
      </div>
    </>
  );
}

function Match({ ex, done }: ExProps) {
  const t = useT();
  const lang = useProgress().profile.lang;
  const pairs = ex.pairs!;
  const left = useMemo(() => shuffleIdx(pairs.length, ex.uid + 'l'), [pairs, ex.uid]);
  const right = useMemo(() => shuffleIdx(pairs.length, ex.uid + 'r'), [pairs, ex.uid]);
  const [selL, setSelL] = useState<number | null>(null);
  const [selR, setSelR] = useState<number | null>(null);
  const [matched, setMatched] = useState<number[]>([]);
  const [flash, setFlash] = useState<number | null>(null);
  const [miss, setMiss] = useState<[number, number] | null>(null);
  const misses = useRef(0);

  useEffect(() => {
    if (selL === null || selR === null) return;
    if (selL === selR) {
      sfx.correct();
      const m = [...matched, selL];
      setMatched(m);
      setFlash(selL);
      setTimeout(() => setFlash(null), 350);
      if (m.length === pairs.length) setTimeout(() => done({ verdict: 'right', imperfect: misses.current > 0 }), 400);
    } else {
      sfx.wrong();
      misses.current++;
      setMiss([selL, selR]);
      setTimeout(() => setMiss(null), 400);
    }
    setSelL(null);
    setSelR(null);
  }, [selL, selR]); // eslint-disable-line react-hooks/exhaustive-deps

  const cls = (i: number, side: 'l' | 'r') => {
    const isM = matched.includes(i);
    const isMiss = miss && (side === 'l' ? miss[0] === i : miss[1] === i);
    return `match-btn ${isM ? 'matched' : ''} ${isM && flash === i ? 'flash' : ''} ${isMiss ? 'miss' : ''}`;
  };

  return (
    <>
      <h1 className="ex-title">{t('exMatch')}</h1>
      <div className="match-grid" lang={lang}>
        <div className="match-col">
          {left.map((i) => (
            <button
              key={i}
              type="button"
              className={cls(i, 'l')}
              aria-pressed={selL === i}
              disabled={matched.includes(i)}
              onClick={() => {
                void speak(pairs[i].bn, pairs[i].voice);
                setSelL(i);
              }}
            >
              {pairs[i].bn}
            </button>
          ))}
        </div>
        <div className="match-col">
          {right.map((i) => (
            <button
              key={i}
              type="button"
              className={cls(i, 'r')}
              aria-pressed={selR === i}
              disabled={matched.includes(i)}
              onClick={() => {
                sfx.tap();
                setSelR(i);
              }}
            >
              {pairs[i].native}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

function shuffleIdx(n: number, seed: string): number[] {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const idx = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    h = (h * 1103515245 + 12345) >>> 0;
    const j = h % (i + 1);
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx;
}

function Fill({ ex, checked, setCheck }: ExProps) {
  const t = useT();
  const { sel, pick } = useChoice(ex, setCheck);
  return (
    <>
      <h1 className="ex-title">{t('exFill')}</h1>
      <p className="muted" style={{ fontWeight: 700 }}>
        “{ex.prompt}”
      </p>
      <div className="row" style={{ alignItems: 'flex-start' }}>
        <SpeakButton text={ex.bn!} voice={ex.voice} size="small" />
        <p className="fill-sentence">
          {ex.blank!.before && <HintText bn={ex.blank!.before} />}
          <span className="blank">{sel !== null ? ex.options![sel].text : ' '}</span>
          {ex.blank!.after && <HintText bn={ex.blank!.after} />}
        </p>
      </div>
      <div className="bank">
        {ex.options!.map((o, i) => (
          <button
            key={i}
            type="button"
            className={`tile ${checked && i === ex.answer ? 'right' : ''}`}
            aria-pressed={sel === i}
            disabled={!!checked}
            onClick={() => pick(i)}
            style={sel === i ? { borderColor: 'var(--blue)', color: 'var(--blue)', boxShadow: '0 4px 0 var(--blue)' } : undefined}
          >
            {o.text}
          </button>
        ))}
      </div>
    </>
  );
}

function ChatEx({ ex, checked, setCheck }: ExProps) {
  const t = useT();
  const lang = useProgress().profile.lang;
  const who = ex.who!;
  const [sel, setSel] = useState<number | null>(null);
  const replies = ex.replies!;
  const pick = (i: number) => {
    sfx.tap();
    setSel(i);
    void speak(replies[i].bn, 'f');
    setCheck(() => ({ verdict: replies[i].ok ? 'right' : 'wrong' }));
  };
  return (
    <>
      <h1 className="ex-title">{t('exChat', { name: CHARACTERS[who].name[lang] })}</h1>
      <div className="chat-scene">
        <div className="who">
          <Avatar who={who} size={92} />
          <div>{CHARACTERS[who].name[lang]}</div>
        </div>
        <div className="bubble left grow">
          <div className="row" style={{ alignItems: 'flex-start' }}>
            <SpeakButton text={ex.bn!} voice={ex.voice} size="small" />
            <HintText bn={ex.bn!} />
          </div>
        </div>
      </div>
      <div className="choices">
        {replies.map((r, i) => (
          <button
            key={i}
            type="button"
            className={`choice ${checked ? (r.ok ? 'right' : i === sel ? 'wrong' : '') : ''}`}
            aria-pressed={sel === i}
            disabled={!!checked}
            onClick={() => pick(i)}
          >
            <span className="num">{i + 1}</span>
            <span className="grow">{r.bn}</span>
          </button>
        ))}
      </div>
    </>
  );
}

function TypeBn({ ex, checked, setCheck }: ExProps) {
  const t = useT();
  const [val, setVal] = useState('');
  useEffect(() => {
    if (!val.trim()) return setCheck(null);
    setCheck(() => {
      const r = judgeBanglish(val, ex.accepted!);
      return { verdict: r.verdict, best: r.best };
    });
  }, [val, ex, setCheck]);
  return (
    <>
      <h1 className="ex-title">{t('exTypeBn')}</h1>
      <div className="prompt-row">
        <Mascot mood="think" size={84} />
        <div className="bubble left grow">{ex.prompt}</div>
      </div>
      <textarea
        className="type-box"
        value={val}
        placeholder={t('typeHere')}
        autoCapitalize="sentences"
        autoCorrect="off"
        autoComplete="off"
        spellCheck={false}
        readOnly={!!checked}
        onChange={(e) => setVal(e.target.value)}
        aria-label={t('typeHere')}
      />
    </>
  );
}

function Speak({ ex, done }: ExProps) {
  const t = useT();
  const [rec, setRec] = useState<MediaRecorder | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => () => void (url && URL.revokeObjectURL(url)), [url]);

  const toggle = async () => {
    if (rec) {
      rec.stop();
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      const chunks: Blob[] = [];
      mr.ondataavailable = (e) => chunks.push(e.data);
      mr.onstop = () => {
        stream.getTracks().forEach((tr) => tr.stop());
        const u = URL.createObjectURL(new Blob(chunks, { type: mr.mimeType }));
        setUrl(u);
        setRec(null);
        void new Audio(u).play();
      };
      mr.start();
      setRec(mr);
    } catch {
      setErr(true);
    }
  };

  return (
    <>
      <h1 className="ex-title">{t('exSpeak')}</h1>
      <div className="prompt-row">
        <Mascot mood="happy" size={84} />
        <div className="bubble left grow">
          <div className="row" style={{ alignItems: 'flex-start' }}>
            <SpeakButton text={ex.bn!} voice={ex.voice} size="small" />
            <div>
              <HintText bn={ex.bn!} />
              <div className="muted" style={{ fontSize: 15, marginTop: 4 }}>
                {ex.prompt}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="speak-pad">
        <SpeakButton text={ex.bn!} voice={ex.voice} size="slow" slow />
        {!err && (
          <button type="button" className={`mic-btn ${rec ? 'rec' : ''}`} onClick={() => void toggle()}>
            {rec ? <Stop size={26} /> : <Mic size={28} />} {rec ? t('recording') : t('record')}
          </button>
        )}
        {url && (
          <button type="button" className="btn outline full" onClick={() => void new Audio(url).play()}>
            <Play size={20} /> {t('playMine')}
          </button>
        )}
        <button type="button" className="btn full" disabled={!url && !err} onClick={() => done({ verdict: 'right' })}>
          {t('iSaidIt')}
        </button>
      </div>
    </>
  );
}
