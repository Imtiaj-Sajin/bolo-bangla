"""Generate Bangla audio clips for the app.

The app never contains Bengali script. Text-to-speech engines can only read Bangla
from Bengali script, so the spellings live here, in tools/audio/bn-script.json
(Banglish phrase -> Bengali script), and are used only as engine input.

Usage:  npm run audio:make        (exports the clip list, then runs this script)
Needs:  pip install edge-tts
"""

import asyncio
import json
import sys
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "public" / "audio"
VOICES = {"f": "bn-BD-NabanitaNeural", "m": "bn-BD-PradeepNeural"}
RATE = "-8%"


def ending(text: str) -> str:
    """Carry the Banglish sentence ending over, so questions sound like questions."""
    t = text.rstrip()
    if t.endswith("?"):
        return "?"
    if t.endswith("!"):
        return "!"
    return "।"  # Bengali full stop (danda)


async def synth(text: str, voice: str, path: Path) -> None:
    for attempt in range(5):
        try:
            await edge_tts.Communicate(text, voice, rate=RATE).save(str(path))
            if path.stat().st_size > 1000:
                return
        except Exception as exc:  # network hiccups / rate limits
            print(f"  retry {attempt + 1}: {exc}", file=sys.stderr)
        await asyncio.sleep(2 * (attempt + 1))
    raise RuntimeError(f"could not synthesize {path.name}")


async def main() -> None:
    needed = json.loads((ROOT / "tools" / "audio" / "needed.json").read_text(encoding="utf-8"))
    mapping = json.loads((ROOT / "tools" / "audio" / "bn-script.json").read_text(encoding="utf-8"))
    OUT.mkdir(parents=True, exist_ok=True)
    made = skipped = 0
    for item in needed:
        path = OUT / f"{item['key']}.mp3"
        script = mapping.get(item["id"])
        if not script:
            skipped += 1
            continue
        if path.exists():
            continue
        text = script.rstrip("?!.।") + ending(item["text"])
        await synth(text, VOICES[item["voice"]], path)
        made += 1
        if made % 25 == 0:
            print(f"  {made} clips made")
    keys = sorted(p.stem for p in OUT.glob("*.mp3"))
    wanted = {item["key"] for item in needed}
    (OUT / "manifest.json").write_text(json.dumps([k for k in keys if k in wanted]), encoding="utf-8")
    print(f"Done: {made} new clips, {len(keys)} total, {skipped} phrases still without a spelling.")


if __name__ == "__main__":
    asyncio.run(main())
