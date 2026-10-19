# /// script
# requires-python = ">=3.11,<3.13"
# dependencies = ["kokoro-onnx>=0.4,<0.5", "soundfile", "numpy"]
# ///
"""Voice each clip with local Kokoro v1.0 (kokoro-onnx), one sentence at a time.

Usage: uv run --script kokoro.py --manifest clips.json --out-dir DIR --models DIR [--voice af_heart] [--lang en-us]
clips.json is [{"id": "...", "text": "..."}]; writes DIR/<id>.wav (24 kHz, 16-bit).
"""
import argparse
import json
import re
from pathlib import Path

import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

SENTENCE_GAP_S = 0.26

parser = argparse.ArgumentParser()
parser.add_argument("--manifest", required=True)
parser.add_argument("--out-dir", required=True)
parser.add_argument("--models", required=True)
parser.add_argument("--voice", default="af_heart")
parser.add_argument("--lang", default="en-us")
parser.add_argument("--speed", type=float, default=1.0)
args = parser.parse_args()

clips = json.loads(Path(args.manifest).read_text(encoding="utf8"))
out = Path(args.out_dir)
out.mkdir(parents=True, exist_ok=True)
models = Path(args.models)
kokoro = Kokoro(str(models / "kokoro-v1.0.onnx"), str(models / "voices-v1.0.bin"))

for clip in clips:
    sentences = [s for s in re.split(r"(?<=[.?!])\s+", clip["text"].strip()) if s]
    chunks, rate = [], 24000
    for i, sentence in enumerate(sentences):
        samples, rate = kokoro.create(sentence, voice=args.voice, speed=args.speed, lang=args.lang)
        chunks.append(samples)
        if i < len(sentences) - 1:
            chunks.append(np.zeros(int(SENTENCE_GAP_S * rate), dtype=samples.dtype))
    sf.write(out / f"{clip['id']}.wav", np.concatenate(chunks), rate, subtype="PCM_16")
    print(clip["id"], flush=True)
