"""Generate Bangla audio clips for the app.

The app never contains Bengali script. Text-to-speech engines can only read Bangla
from Bengali script, so the spellings live here, in tools/audio/bn/*.json
(Banglish phrase -> Bengali script, one file per unit), and are used only as engine input.

Voices: tools/audio/voices.json maps each voice slot (narrator "f"/"m", or a character such
as "amma") to an edge-tts voice, rate and pitch. When a slot's settings change, its clips
are re-recorded automatically.

Usage:  npm run audio:make        (exports the clip list, then runs this script)
Needs:  pip install edge-tts
"""

import asyncio
import json
import re
import sys
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "public" / "audio"
TOOLS = ROOT / "tools" / "audio"
SLOW_DROP = 30  # slow versions are recorded this many percent slower
WORKERS = 3


def ending(text: str) -> str:
    """Carry the Banglish sentence ending over, so questions sound like questions."""
    t = text.rstrip()
    if t.endswith("?"):
        return "?"
    if t.endswith("!"):
        return "!"
    return "।"  # Bengali full stop (danda)


def slower(rate: str) -> str:
    n = int(re.sub(r"[^\d-]", "", rate.replace("+", "")) or 0) - SLOW_DROP
    return f"{n:+d}%"


async def synth(text: str, cfg: dict, rate: str, path: Path) -> None:
    for attempt in range(6):
        try:
            await edge_tts.Communicate(text, cfg["voice"], rate=rate, pitch=cfg.get("pitch", "+0Hz")).save(str(path))
            if path.stat().st_size > 1000:
                return
        except Exception as exc:  # network hiccups / rate limits
            print(f"  retry {attempt + 1} {path.name}: {exc}", file=sys.stderr)
        await asyncio.sleep(2 * (attempt + 1))
    raise RuntimeError(f"could not synthesize {path.name}")


async def main() -> None:
    needed = json.loads((TOOLS / "needed.json").read_text(encoding="utf-8"))
    voices = {k: v for k, v in json.loads((TOOLS / "voices.json").read_text(encoding="utf-8")).items() if not k.startswith("_")}
    mapping: dict[str, str] = {}
    for f in sorted((TOOLS / "bn").glob("*.json")):
        mapping.update(json.loads(f.read_text(encoding="utf-8")))
    OUT.mkdir(parents=True, exist_ok=True)

    # Re-record any slot whose voice settings changed since the last run.
    lock_path = TOOLS / "voices.lock.json"
    lock = json.loads(lock_path.read_text(encoding="utf-8")) if lock_path.exists() else {}
    for slot, cfg in voices.items():
        if lock.get(slot) not in (None, cfg):
            for old in OUT.glob(f"{slot}-*.mp3"):
                old.unlink()
            print(f"voice '{slot}' changed: re-recording its clips")

    jobs = []
    missing = 0
    for item in needed:
        script = mapping.get(item["id"])
        cfg = voices.get(item["voice"])
        if not script or not cfg:
            missing += 1
            continue
        text = script.rstrip("?!.।") + ending(item["text"])
        normal = OUT / f"{item['key']}.mp3"
        if not normal.exists():
            jobs.append((text, cfg, cfg.get("rate", "+0%"), normal))
        if item.get("slow"):
            slow = OUT / f"{item['key']}-s.mp3"
            if not slow.exists():
                jobs.append((text, cfg, slower(cfg.get("rate", "+0%")), slow))

    print(f"{len(jobs)} clips to record")
    queue: asyncio.Queue = asyncio.Queue()
    for j in jobs:
        queue.put_nowait(j)
    made = 0

    async def worker() -> None:
        nonlocal made
        while not queue.empty():
            text, cfg, rate, path = queue.get_nowait()
            await synth(text, cfg, rate, path)
            made += 1
            if made % 50 == 0:
                print(f"  {made}/{len(jobs)}")

    await asyncio.gather(*(worker() for _ in range(WORKERS)))
    lock_path.write_text(json.dumps(voices, indent=1), encoding="utf-8")

    wanted = {item["key"] for item in needed} | {item["key"] + "-s" for item in needed if item.get("slow")}
    keys = sorted(p.stem for p in OUT.glob("*.mp3") if p.stem in wanted)
    for p in OUT.glob("*.mp3"):
        if p.stem not in wanted:
            p.unlink()  # clips no longer used by the course
    (OUT / "manifest.json").write_text(json.dumps(keys), encoding="utf-8")
    print(f"Done: {made} new clips, {len(keys)} in the app, {missing} phrases without a spelling or voice.")


if __name__ == "__main__":
    asyncio.run(main())
