#!/usr/bin/env python3
"""
Generate MIDI practice files for the Dizi Flute Learning Course.

Each song/exercise from the course is encoded in jianpu (numbered notation)
and converted to a MIDI file with a pan flute sound.

Usage:
    python3 scripts/generate_midi.py

Output:
    midi/level-{1..7}/*.mid
"""

import os
import re
from midiutil import MIDIFile

# === CONSTANTS ===

# MIDI program numbers (General MIDI)
INSTRUMENT_PAN_FLUTE = 75  # Pan Flute
INSTRUMENT_SHAKUHACHI = 77  # Shakuhachi

# Base MIDI note for 1 (Do) in each key
# Middle octave: 1=D means Do=D4=62
KEY_BASE = {
    "C": 60,  # C4
    "D": 62,  # D4
    "E": 64,  # E4
    "F": 65,  # F4
    "G": 67,  # G4
    "A": 69,  # A4
    "Bb": 70, # Bb4
}

# Jianpu number to semitone offset from Do (major scale intervals)
JIANPU_SEMITONES = {
    "1": 0,   # Do
    "2": 2,   # Re
    "3": 4,   # Mi
    "4": 5,   # Fa
    "5": 7,   # Sol
    "6": 9,   # La
    "7": 11,  # Ti
}

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
MIDI_DIR = os.path.join(PROJECT_DIR, "midi")


# === JIANPU PARSER ===

def parse_jianpu(notation: str, key: str = "D", beats_per_measure: int = 4) -> list:
    """
    Parse a jianpu notation string into a list of (midi_note, duration_in_beats) tuples.

    midi_note = -1 means rest.

    Notation rules:
    - Numbers 1-7 = scale degrees (quarter notes by default)
    - 0 = rest (quarter note)
    - - = extend previous note by 1 beat
    - . after a note/dash = dotted (adds half the previous duration)
    - Octave markers in the source text use combining chars:
      - Low octave: note followed by ̣  (combining dot below, U+0323)
      - High octave: note followed by ̇  (combining dot above, U+0307)
    - | = bar line (ignored)
    - ||: :|| = repeat signs (handled at song level)
    - (N) before a note = grace note
    - # before number = sharp, b before number = flat
    """
    base = KEY_BASE.get(key, 62)
    events = []

    # Normalize: remove bar lines and extra whitespace
    # Keep combining characters attached to their base character
    notation = notation.replace("||:", "").replace(":||", "").replace("||", "").replace("|", "")
    notation = notation.strip()

    # Tokenize
    tokens = tokenize_jianpu(notation)

    i = 0
    while i < len(tokens):
        token = tokens[i]

        if token == "-":
            # Extend previous note
            if events:
                events[-1] = (events[-1][0], events[-1][1] + 1.0)
            i += 1
        elif token == ".":
            # Dotted: add half the current duration
            if events:
                events[-1] = (events[-1][0], events[-1][1] * 1.5)
            i += 1
        elif token == "0":
            # Rest
            events.append((-1, 1.0))
            i += 1
        else:
            # Parse a note token
            midi_note, consumed = parse_note_token(token, base)
            if midi_note is not None:
                events.append((midi_note, 1.0))
            i += 1

    return events


def tokenize_jianpu(notation: str) -> list:
    """Split jianpu notation into tokens, keeping combining characters with their base."""
    tokens = []
    # Unicode combining characters for octave dots
    DOT_BELOW = "\u0323"  # ̣
    DOT_ABOVE = "\u0307"  # ̇

    i = 0
    chars = list(notation)
    current = ""

    while i < len(chars):
        ch = chars[i]

        if ch in (" ", "\t", "\n"):
            if current:
                tokens.append(current)
                current = ""
            i += 1
        elif ch in (DOT_BELOW, DOT_ABOVE):
            # Combining character - attach to current token
            current += ch
            i += 1
        elif ch in "1234567":
            if current:
                tokens.append(current)
            current = ch
            # Look ahead for combining chars
            while i + 1 < len(chars) and chars[i + 1] in (DOT_BELOW, DOT_ABOVE):
                current += chars[i + 1]
                i += 1
            tokens.append(current)
            current = ""
            i += 1
        elif ch == "0":
            if current:
                tokens.append(current)
                current = ""
            tokens.append("0")
            i += 1
        elif ch == "-":
            if current:
                tokens.append(current)
                current = ""
            tokens.append("-")
            i += 1
        elif ch == ".":
            if current:
                tokens.append(current)
                current = ""
            tokens.append(".")
            i += 1
        elif ch in "#b":
            current += ch
            i += 1
        elif ch in "()" or ch in "↗↘":
            # Skip ornament markers for now
            i += 1
        else:
            # Skip unknown characters (tr, ornament text, etc.)
            i += 1

    if current:
        tokens.append(current)

    return tokens


def parse_note_token(token: str, base: int) -> tuple:
    """
    Parse a single note token like '5', '5̣', '1̇', '#4' into a MIDI note number.
    Returns (midi_note, 1) or (None, 0) if unparseable.
    """
    DOT_BELOW = "\u0323"
    DOT_ABOVE = "\u0307"

    octave_shift = 0
    sharp_flat = 0
    digit = None

    for ch in token:
        if ch == DOT_BELOW:
            octave_shift -= 12
        elif ch == DOT_ABOVE:
            octave_shift += 12
        elif ch == "#":
            sharp_flat += 1
        elif ch == "b":
            sharp_flat -= 1
        elif ch in "1234567":
            digit = ch

    if digit is None:
        return (None, 0)

    semitones = JIANPU_SEMITONES[digit]
    midi_note = base + semitones + octave_shift + sharp_flat

    # Adjust octave: low register notes (5̣, 6̣, 7̣) should be below middle Do
    # In 筒音作5 system: low 5̣ = base - 12 + 7 = below Do
    # The combining dot below already shifts -12, which is correct
    # But 5̣ 6̣ 7̣ are BELOW Do (1), so they need to be one octave lower
    # Actually with the -12 shift, 5̣ = base + 7 - 12 = base - 5, which is correct
    # (A3 for D-key, which is the all-holes-closed note)

    return (midi_note, 1)


# === MIDI GENERATION ===

def create_midi(song: dict) -> MIDIFile:
    """Create a MIDI file from a song dictionary."""
    midi = MIDIFile(1)  # One track
    track = 0
    channel = 0
    time = 0  # Start at beat 0

    # Handle sections (multi-section pieces)
    sections = song.get("sections", None)
    if sections:
        for section in sections:
            tempo = section.get("tempo", song.get("tempo", 72))
            midi.addTempo(track, time, tempo)
            key = section.get("key", song.get("key", "D"))
            notes_str = section["notes"]
            events = parse_jianpu(notes_str, key)
            time = add_events_to_midi(midi, track, channel, time, events)
            # Small gap between sections
            time += 2.0
    else:
        tempo = song.get("tempo", 80)
        midi.addTempo(track, time, tempo)
        midi.addProgramChange(track, channel, 0, INSTRUMENT_PAN_FLUTE)

        key = song.get("key", "D")
        notes_str = song["notes"]

        # Handle repeats
        if "repeat" in song and song["repeat"]:
            notes_str = notes_str + " " + notes_str

        events = parse_jianpu(notes_str, key)
        time = add_events_to_midi(midi, track, channel, time, events)

    # Add program change at the beginning
    midi.addProgramChange(track, channel, 0, INSTRUMENT_PAN_FLUTE)

    return midi


def add_events_to_midi(midi, track, channel, start_time, events) -> float:
    """Add parsed events to a MIDI file. Returns the time after the last event."""
    time = start_time
    velocity = 80

    for midi_note, duration in events:
        if midi_note == -1:
            # Rest - just advance time
            time += duration
        else:
            # Clamp to valid MIDI range
            midi_note = max(0, min(127, midi_note))
            midi.addNote(track, channel, midi_note, time, duration * 0.95, velocity)
            time += duration

    return time


# === SONG CATALOG ===

SONGS = [
    # ==================== LEVEL 1 ====================
    # Exercises
    {
        "name": "长音练习", "name_en": "Long Tones on Each Note",
        "key": "D", "time_sig": (4, 4), "tempo": 60, "level": 1,
        "filename": "01-long-tones",
        "notes": "1 - - - 1 - - - 0 0 0 0 2 - - - 2 - - - 0 0 0 0 3 - - - 3 - - - 0 0 0 0 4 - - - 4 - - - 0 0 0 0 5 - - - 5 - - - 0 0 0 0"
    },
    {
        "name": "上行音阶", "name_en": "Scale Walk Ascending",
        "key": "D", "time_sig": (4, 4), "tempo": 60, "level": 1,
        "filename": "02-scale-walk-ascending",
        "notes": "1 - 2 - 3 - 4 - 5 - - - 0 - - -"
    },
    {
        "name": "下行音阶", "name_en": "Scale Walk Descending",
        "key": "D", "time_sig": (4, 4), "tempo": 60, "level": 1,
        "filename": "03-scale-walk-descending",
        "notes": "5 - 4 - 3 - 2 - 1 - - - 0 - - -"
    },
    {
        "name": "上下行音阶", "name_en": "Scale Up and Down",
        "key": "D", "time_sig": (4, 4), "tempo": 60, "level": 1,
        "filename": "04-scale-up-and-down",
        "notes": "1 - 2 - 3 - 4 - 5 - - - 0 0 0 0 5 - 4 - 3 - 2 - 1 - - - 0 0 0 0"
    },
    {
        "name": "级进练习", "name_en": "Step Patterns",
        "key": "D", "time_sig": (4, 4), "tempo": 72, "level": 1,
        "filename": "05-step-patterns",
        "notes": "1 2 1 2 3 4 3 4 5 4 5 4 3 2 3 2 1 - - -"
    },
    {
        "name": "跳进练习", "name_en": "Skip Patterns",
        "key": "D", "time_sig": (4, 4), "tempo": 72, "level": 1,
        "filename": "06-skip-patterns",
        "notes": "1 3 1 3 2 4 2 4 3 5 3 5 1 - - -"
    },
    {
        "name": "吐音练习", "name_en": "Tonguing Practice",
        "key": "D", "time_sig": (4, 4), "tempo": 72, "level": 1,
        "filename": "07-tonguing-practice",
        "notes": "1 1 1 1 2 2 2 2 3 3 3 3 4 4 4 4 5 5 5 5 4 4 4 4 3 3 3 3 2 2 2 2 1 - - -"
    },
    # Songs
    {
        "name": "玛丽有只小羊羔", "name_en": "Mary Had a Little Lamb",
        "key": "D", "time_sig": (4, 4), "tempo": 88, "level": 1,
        "filename": "08-mary-had-a-little-lamb",
        "notes": "3 2 1 2 3 3 3 - 2 2 2 - 3 5 5 - 3 2 1 2 3 3 3 3 2 2 3 2 1 - - -"
    },
    {
        "name": "热十字面包", "name_en": "Hot Cross Buns",
        "key": "D", "time_sig": (4, 4), "tempo": 88, "level": 1,
        "filename": "09-hot-cross-buns",
        "notes": "3 2 1 - 3 2 1 - 1 1 2 2 3 2 1 -"
    },
    {
        "name": "划船歌", "name_en": "Lightly Row",
        "key": "D", "time_sig": (4, 4), "tempo": 96, "level": 1,
        "filename": "10-lightly-row",
        "notes": "5 3 3 - 4 2 2 - 1 2 3 4 5 5 5 - 5 3 3 3 4 2 2 2 1 3 5 5 3 - - - 2 2 2 2 2 3 4 - 3 3 3 3 3 4 5 - 5 3 3 3 4 2 2 2 1 3 5 5 1 - - -"
    },
    {
        "name": "找朋友", "name_en": "Finding Friends",
        "key": "D", "time_sig": (2, 4), "tempo": 96, "level": 1,
        "filename": "11-finding-friends",
        "notes": "1 1 1 3 5 5 5 3 4 2 3 1 2 - 2 - 1 1 1 3 5 5 5 3 4 2 3 1 2 1 1 -"
    },
    {
        "name": "上学歌", "name_en": "Going to School",
        "key": "D", "time_sig": (2, 4), "tempo": 100, "level": 1,
        "filename": "12-going-to-school",
        "notes": "1 2 3 1 3 4 5 - 5 4 3 1 2 3 1 - 3 4 5 5 3 4 5 - 5 4 3 1 2 3 1 -"
    },

    # ==================== LEVEL 2 ====================
    # Exercises
    {
        "name": "全音域长音", "name_en": "Full Scale Long Tones",
        "key": "D", "time_sig": (4, 4), "tempo": 60, "level": 2,
        "filename": "01-full-scale-long-tones",
        "notes": "5\u0323 - - - 6\u0323 - - - 7\u0323 - - - 1 - - - 2 - - - 3 - - - 4 - - - 5 - - - 6 - - - 7 - - - 1\u0307 - - - 0 - - -"
    },
    {
        "name": "五声音阶练习", "name_en": "Pentatonic Scale Patterns",
        "key": "D", "time_sig": (4, 4), "tempo": 80, "level": 2,
        "filename": "02-pentatonic-patterns",
        "notes": "1 2 3 5 6 - - - 6 5 3 2 1 - - - 1 3 5 6 5 3 2 1 2 3 5 6 1 - - -"
    },
    {
        "name": "八度跳跃", "name_en": "Octave Jumps",
        "key": "D", "time_sig": (4, 4), "tempo": 60, "level": 2,
        "filename": "03-octave-jumps",
        "notes": "5\u0323 - 5 - 6\u0323 - 6 - 7\u0323 - 7 - 1 - 1\u0307 - 1\u0307 - 1 - 7 - 7\u0323 - 6 - 6\u0323 - 5 - 5\u0323 -"
    },
    {
        "name": "八分音符吐音", "name_en": "Tonguing Eighth Notes",
        "key": "D", "time_sig": (2, 4), "tempo": 80, "level": 2,
        "filename": "04-tonguing-eighth-notes",
        "notes": "1 2 3 4 5 6 7 1\u0307 1\u0307 7 6 5 4 3 2 1"
    },
    # Songs
    {
        "name": "小星星", "name_en": "Twinkle Twinkle Little Star",
        "key": "D", "time_sig": (4, 4), "tempo": 80, "level": 2,
        "filename": "05-xiao-xing-xing",
        "notes": "1 1 5 5 6 6 5 - 4 4 3 3 2 2 1 - 5 5 4 4 3 3 2 - 5 5 4 4 3 3 2 - 1 1 5 5 6 6 5 - 4 4 3 3 2 2 1 -"
    },
    {
        "name": "小白菜", "name_en": "Little White Cabbage",
        "key": "D", "time_sig": (2, 4), "tempo": 72, "level": 2,
        "filename": "06-xiao-bai-cai",
        "notes": "6 5 3 5 6 - 6 5 3 2 1 - 2 3 5 6 5 - 3 2 1 6\u0323 5\u0323 -"
    },
    {
        "name": "世上只有妈妈好", "name_en": "Only Mama is Good",
        "key": "D", "time_sig": (4, 4), "tempo": 76, "level": 2,
        "filename": "07-only-mama-is-good",
        "notes": "6 5 3 5 6 - - 0 3 5 6\u0307 5 6 - - 0 3 2 1 2 3 - - 0 5 3 2 1 2 - - 0 6 5 3 5 6 - - 0 3 2 1 2 3 5 6 - 3 2 1 2 3 5 6 - 5 3 2 1 6\u0323 - - -"
    },
    {
        "name": "两只老虎", "name_en": "Two Tigers",
        "key": "D", "time_sig": (4, 4), "tempo": 100, "level": 2,
        "filename": "08-two-tigers",
        "notes": "1 2 3 1 1 2 3 1 3 4 5 - 3 4 5 - 5 6 5 4 3 - 1 - 5 6 5 4 3 - 1 - 1 5\u0323 1 - 1 5\u0323 1 -",
        "repeat": True,
    },
    {
        "name": "欢乐颂", "name_en": "Ode to Joy",
        "key": "D", "time_sig": (4, 4), "tempo": 96, "level": 2,
        "filename": "09-ode-to-joy",
        "notes": "3 3 4 5 5 4 3 2 1 1 2 3 3 - 2 - 3 3 4 5 5 4 3 2 1 1 2 3 2 - 1 - 2 2 3 1 2 3 4 3 1 2 3 4 3 2 1 2 5\u0323 - 3 3 4 5 5 4 3 2 1 1 2 3 2 - 1 -"
    },
    {
        "name": "新年好", "name_en": "Happy New Year",
        "key": "D", "time_sig": (3, 4), "tempo": 108, "level": 2,
        "filename": "10-happy-new-year",
        "notes": "1 1 1 5 - - 3 3 3 1 - - 1 3 5 5 4 3 2 - - 2 3 4 4 3 2 3 - - 1 3 2 5\u0323 - - 1 3 2 5\u0323 - - 1 2 3 1 - -"
    },

    # ==================== LEVEL 3 ====================
    # Exercises
    {
        "name": "力度长音", "name_en": "Dynamic Long Tones",
        "key": "D", "time_sig": (4, 4), "tempo": 52, "level": 3,
        "filename": "01-dynamic-long-tones",
        "notes": "1 - - - - - - - 2 - - - - - - - 3 - - - - - - - 5 - - - - - - - 6 - - - - - - -"
    },
    {
        "name": "五声音阶进行", "name_en": "Pentatonic Patterns",
        "key": "D", "time_sig": (2, 4), "tempo": 88, "level": 3,
        "filename": "02-pentatonic-patterns",
        "notes": "1 2 3 5 6 5 3 2 1 3 5 6 5 3 2 1 6\u0323 1 2 3 5 6 5 -"
    },
    {
        "name": "两个八度音阶", "name_en": "Two-Octave Scale Run",
        "key": "D", "time_sig": (4, 4), "tempo": 72, "level": 3,
        "filename": "03-two-octave-scale",
        "notes": "5\u0323 6\u0323 7\u0323 1 2 3 4 5 6 7 1\u0307 - 0 0 0 0 1\u0307 7 6 5 4 3 2 1 7\u0323 6\u0323 5\u0323 - 0 0 0 0"
    },
    {
        "name": "附点节奏", "name_en": "Dotted Rhythm Patterns",
        "key": "D", "time_sig": (2, 4), "tempo": 80, "level": 3,
        "filename": "04-dotted-rhythms",
        "notes": "1 - 2 3 - 5 6 - 5 3 - 5 - 6 5 - 3 2 - 1 6\u0323 -"
    },
    {
        "name": "装饰音练习", "name_en": "Grace Note Practice",
        "key": "D", "time_sig": (4, 4), "tempo": 60, "level": 3,
        "filename": "05-grace-notes",
        "notes": "1 - - - 2 - - - 3 - - - 2 - - - 5 - - - 6 - - - 1 - - -"
    },
    # Songs
    {
        "name": "茉莉花", "name_en": "Jasmine Flower",
        "key": "D", "time_sig": (2, 4), "tempo": 72, "level": 3,
        "filename": "06-jasmine-flower",
        "notes": "3 3 5 6 1\u0307 6 5 - 5 6 1\u0307 6 5 - 5 3 5 6 5 3 2 - 1 6\u0323 5\u0323 6\u0323 1 - 2 3 2 1 6\u0323 5\u0323 6\u0323 1 2 - 3 5 3 2 1 2 3 - 5 3 2 3 5 3 2 - 1 6\u0323 1 5\u0323 6\u0323 -"
    },
    {
        "name": "康定情歌", "name_en": "Kangding Love Song",
        "key": "G", "time_sig": (2, 4), "tempo": 108, "level": 3,
        "filename": "07-kangding-love-song",
        "notes": "5 5 6 5 3 5 6 1\u0307 5 - 3 2 3 5 - 2 1 6\u0323 1 2 - 5 5 6 5 3 5 6 1\u0307 5 - 3 2 1 6\u0323 5\u0323 - -"
    },
    {
        "name": "南泥湾", "name_en": "Nanniwan",
        "key": "D", "time_sig": (2, 4), "tempo": 100, "level": 3,
        "filename": "08-nanniwan",
        "notes": "0 5 3 5 6 1\u0307 6 5 - 0 5 3 5 6 5 - 3 5 6 5 3 2 1 - 6\u0323 1 2 3 2 - 0 5 3 5 6 1\u0307 6 5 - 0 5 3 5 6 5 - 3 2 1 6\u0323 5\u0323 6\u0323 1 - -"
    },
    {
        "name": "斯卡布罗集市", "name_en": "Scarborough Fair",
        "key": "D", "time_sig": (3, 4), "tempo": 80, "level": 3,
        "filename": "09-scarborough-fair",
        "notes": "6\u0323 - 6\u0323 3 - 2 3 - 1 6\u0323 - - 0 - 6\u0323 5 - 6 3 - - 3 - - 0 - 6 6 - 5 3 - 2 3 - 1 6\u0323 - 1 2 - 1 6\u0323 - - 6\u0323 - -"
    },
    {
        "name": "送别", "name_en": "Farewell",
        "key": "D", "time_sig": (4, 4), "tempo": 72, "level": 3,
        "filename": "10-farewell",
        "notes": "5 3 5 1\u0307 - - 6 1\u0307 6 5 - - 5 6\u0323 1 2 - 1 2 - - 0 - - 5 3 5 1\u0307 - 7 6 1\u0307 6 5 - - 5 2 3 1 - - 1 - - 0 - -"
    },
    {
        "name": "小燕子", "name_en": "Little Swallow",
        "key": "D", "time_sig": (2, 4), "tempo": 88, "level": 3,
        "filename": "11-little-swallow",
        "notes": "3 5 5 - 3 5 1\u0307 - 6 1\u0307 6 5 3 1 2 - 2 3 4 3 2 - 5 3 4 2 1 -"
    },
    {
        "name": "彝族舞曲", "name_en": "Yi Dance Melody",
        "key": "D", "time_sig": (3, 4), "tempo": 96, "level": 3,
        "filename": "12-yi-dance",
        "notes": "3 2 1 6\u0323 - - 1 2 3 2 - - 3 5 6 5 3 2 1 6\u0323 1 2 - - 3 2 1 6\u0323 - 5\u0323 6\u0323 1 2 1 - -"
    },

    # ==================== LEVEL 4 ====================
    # Exercises
    {
        "name": "气震音长音", "name_en": "Vibrato Long Tones",
        "key": "D", "time_sig": (4, 4), "tempo": 52, "level": 4,
        "filename": "01-vibrato-long-tones",
        "notes": "1 - - - - - - - 2 - - - - - - - 3 - - - - - - - 5 - - - - - - - 6 - - - - - - - 1\u0307 - - - - - - -"
    },
    {
        "name": "双吐练习", "name_en": "Double Tonguing Drill",
        "key": "D", "time_sig": (4, 4), "tempo": 80, "level": 4,
        "filename": "02-double-tonguing",
        "notes": "1 1 1 1 2 2 2 2 3 3 3 3 5 5 5 5 6 6 6 6 5 5 5 5 3 3 3 3 2 2 2 2 1 1 1 1 1 - - -"
    },
    {
        "name": "颤音练习", "name_en": "Trill Practice",
        "key": "D", "time_sig": (4, 4), "tempo": 60, "level": 4,
        "filename": "03-trill-practice",
        "notes": "1 2 1 2 1 - - 2 3 2 3 2 - - 3 4 3 4 3 - - 5 6 5 6 5 - - 6 7 6 7 6 - - 5 6 5 6 5 - - 3 4 3 4 3 - - 1 2 1 2 1 - -"
    },
    {
        "name": "装饰音组合", "name_en": "Ornament Combinations",
        "key": "D", "time_sig": (2, 4), "tempo": 72, "level": 4,
        "filename": "04-ornament-combinations",
        "notes": "1 - 2 - 3 - 5 - 6 5 5 3 3 2 1 -"
    },
    {
        "name": "十六分音符", "name_en": "Sixteenth Note Patterns",
        "key": "D", "time_sig": (2, 4), "tempo": 72, "level": 4,
        "filename": "05-sixteenth-notes",
        "notes": "1 2 3 2 1 - 3 5 6 5 3 - 5 6 1\u0307 6 5 3 2 3 5 3 2 -"
    },
    # Songs
    {
        "name": "龙的传人", "name_en": "Descendants of the Dragon",
        "key": "G", "time_sig": (4, 4), "tempo": 96, "level": 4,
        "filename": "06-descendants-of-dragon",
        "notes": "0 0 3 5 6 - 6 6 5 6 5 3 2 - 0 0 0 0 3 2 1 - 1 1 6\u0323 1 6\u0323 5\u0323 3\u0323 - 0 0 0 0 3 5 6 - 6 6 5 6 5 3 2 - 0 0 0 0 3 2 1 - 1 1 6\u0323 1 2 - 1 - 0 0 6 - 1\u0307 - 6 5 3 5 6 - - - 0 0 0 0 6 - 1\u0307 - 6 5 3 2 1 - - - 0 0 0 0"
    },
    {
        "name": "女儿情", "name_en": "Daughter's Love",
        "key": "D", "time_sig": (4, 4), "tempo": 72, "level": 4,
        "filename": "07-daughters-love",
        "notes": "0 0 5 6\u0323 1 1 6\u0323 1 2 - - 0 0 0 1 2 3 3 2 3 5 - - 0 5 5 3 5 6 6 5 6 1\u0307 - 6 5 6 - - 0 3 3 2 3 5 5 3 2 1 1 6\u0323 5\u0323 6\u0323 - - 0 0 0 5\u0323 6\u0323 1 1 6\u0323 1 2 - - 0 2 2 3 5 6 5 3 2 1 - - -"
    },
    {
        "name": "彩云追月", "name_en": "Colorful Clouds Chasing Moon",
        "key": "D", "time_sig": (4, 4), "tempo": 66, "level": 4,
        "filename": "08-colorful-clouds",
        "notes": "0 0 5 6 1\u0307 6 5 6 1\u0307 - 6 5 3 - - 0 0 0 3 5 6 5 3 5 6 - 5 3 2 - - 0 0 0 2 3 5 3 2 3 5 - 3 2 1 - 6\u0323 1 2 - 1 6\u0323 5\u0323 - - - 0 0 5 6 1\u0307 6 5 3 5 - 6 5 3 - 2 1 6\u0323 - 1 2 1 - - -"
    },
    {
        "name": "牧羊曲", "name_en": "Shepherd's Song",
        "key": "D", "time_sig": (4, 4), "tempo": 76, "level": 4,
        "filename": "09-shepherds-song",
        "notes": "0 0 0 3 5 6 1\u0307 6 5 - - 3 5 3 2 3 1 - - 0 0 0 0 1 2 3 5 3 2 - - 6\u0323 1 6\u0323 5\u0323 6\u0323 1 - - 0 0 0 0 3 5 6 1\u0307 6 5 - - 3 5 3 2 3 5 - - 0 5 5 3 5 6 - - 5 3 5 2 3 1 - - 0 0 0 0"
    },
    {
        "name": "天路", "name_en": "Road to Heaven",
        "key": "D", "time_sig": (4, 4), "tempo": 96, "level": 4,
        "filename": "10-road-to-heaven",
        "notes": "0 0 1 2 3 - 3 2 1 - 6\u0323 1 2 - - 0 0 0 2 3 5 - 5 3 2 - 1 2 3 - - 0 0 0 3 5 6 - 6 5 3 - 2 3 5 - - 0 6 5 3 5 6 - 1\u0307 6 5 - 3 2 1 - - -"
    },
    {
        "name": "沧海一声笑", "name_en": "Laughing Across the Ocean",
        "key": "D", "time_sig": (4, 4), "tempo": 132, "level": 4,
        "filename": "11-laughing-across-ocean",
        "notes": "5 - - - 3 - - - 2 - - - 1 - 6\u0323 - 5\u0323 - - - 0 0 0 0 5 - - - 3 - - - 2 - - - 1 - 6\u0323 - 5\u0323 - - - 0 0 0 0 5\u0323 6\u0323 1 6\u0323 5\u0323 6\u0323 1 6\u0323 5\u0323 - - - 0 0 0 0 5\u0323 1 2 1 6\u0323 5\u0323 3\u0323 5\u0323 6\u0323 - - - 0 0 0 0"
    },

    # ==================== LEVEL 5 ====================
    {
        "name": "姑苏行", "name_en": "A Walk in Gusu",
        "key": "D", "time_sig": (4, 4), "tempo": 60, "level": 5,
        "filename": "01-gusu-xing",
        "sections": [
            {
                "tempo": 52,
                "notes": "0 0 0 5\u0323 6\u0323 1 2 3 5 3 2 - - 1 2 3 5 6 1\u0307 6 5 - - 3 5 6 5 3 2 1 - 6\u0323 5\u0323 6\u0323 - - -"
            },
            {
                "tempo": 60,
                "notes": "6\u0323 1 2 3 5 - 3 2 1 - - 6\u0323 5\u0323 - - 0 6\u0323 1 2 3 5 - 6 5 3 - 2 1 2 - - 0 3 5 6 1\u0307 6 - 5 3 5 - 3 2 1 - - 0 6\u0323 1 2 3 2 - 1 6\u0323 5\u0323 - - - 0 0 0 0"
            },
            {
                "tempo": 132,
                "notes": "6\u0323 1 2 3 5 3 2 1 6\u0323 1 2 3 5 6 5 3 2 3 5 6 1\u0307 6 5 3 2 1 6\u0323 5\u0323 6\u0323 1 2 -"
            },
        ]
    },
    {
        "name": "小放牛", "name_en": "Little Cowherd",
        "key": "D", "time_sig": (2, 4), "tempo": 120, "level": 5,
        "filename": "02-little-cowherd",
        "notes": "5 6 1\u0307 6 5 3 5 - 3 2 1 2 3 - 5 6 1\u0307 6 5 3 2 1 6\u0323 - 5\u0323 6\u0323 1 2 3 5 3 2 1 6\u0323 5\u0323 - 6\u0323 1 2 3 5 3 2 1 6\u0323 5\u0323 6\u0323 -"
    },
    {
        "name": "牧笛", "name_en": "Shepherd's Flute",
        "key": "D", "time_sig": (4, 4), "tempo": 66, "level": 5,
        "filename": "03-shepherds-flute",
        "notes": "0 0 5\u0323 6\u0323 1 - 2 3 5 3 2 - 1 2 3 5 6 - - 5 3 2 1 6\u0323 5\u0323 - - - 0 0 5\u0323 6\u0323 1 - 6\u0323 1 2 3 5 3 2 - 1 2 3 5 6 - 5 3 2 1 6\u0323 5\u0323 6\u0323 1 2 - 1 6\u0323 5\u0323 - - -"
    },
    {
        "name": "喜相逢", "name_en": "Happy Reunion",
        "key": "D", "time_sig": (4, 4), "tempo": 52, "level": 5,
        "filename": "04-happy-reunion",
        "sections": [
            {
                "tempo": 52,
                "notes": "5\u0323 - 6\u0323 1 2 - 1 6\u0323 5\u0323 - - - 6\u0323 - 1 2 3 - 2 1 6\u0323 5\u0323 6\u0323 - 5\u0323 - - - 1 - 2 3 5 - 3 2 1 - 6\u0323 5\u0323 6\u0323 1 2 - 1 - - -"
            },
            {
                "tempo": 144,
                "notes": "5\u0323 6\u0323 1 2 3 2 1 6\u0323 5\u0323 6\u0323 1 2 3 5 6 5 3 2 1 6\u0323 5\u0323 6\u0323 1 2 3 5 3 2 1 6\u0323 5\u0323 -"
            },
        ]
    },
    {
        "name": "扬鞭催马运粮忙", "name_en": "Whipping Horse Transport Grain",
        "key": "D", "time_sig": (2, 4), "tempo": 144, "level": 5,
        "filename": "05-whipping-horse",
        "notes": "5 5 6 5 3 2 1 1 2 1 6\u0323 5\u0323 6\u0323 6\u0323 1 6\u0323 5\u0323 3\u0323 5\u0323 - 5\u0323 6\u0323 1 2 3 3 5 3 2 1 6\u0323 - 1 2 3 5 6 6 5 3 2 1 6\u0323 5\u0323 6\u0323 -"
    },
    {
        "name": "中花六板", "name_en": "Zhonghua Liuban",
        "key": "D", "time_sig": (4, 4), "tempo": 60, "level": 5,
        "filename": "06-zhonghua-liuban",
        "notes": "5 - 6 5 3 - 2 1 2 - 3 2 1 - 6\u0323 5\u0323 6\u0323 - 1 6\u0323 5\u0323 - 3\u0323 5\u0323 6\u0323 - 1 2 1 - - - 3 - 5 3 2 - 1 2 3 - 5 6 5 - 3 2 1 - 6\u0323 1 2 - 1 6\u0323 5\u0323 - - - 0 - - -"
    },

    # ==================== LEVEL 6 ====================
    {
        "name": "牧民新歌", "name_en": "Herdsman's New Song",
        "key": "D", "time_sig": (4, 4), "tempo": 52, "level": 6,
        "filename": "01-herdsmans-new-song",
        "sections": [
            {
                "tempo": 52,
                "notes": "0 0 0 3 5 6 - - - 5 6 1\u0307 - - - 6 1\u0307 2\u0307 - - - 1\u0307 6 5 - - 3 5 6 5 3 2 - 1 2 3 - - - - -"
            },
            {
                "tempo": 52,
                "notes": "3 - 5 3 2 - 1 2 3 - 5 6 5 - - - 6 - 1\u0307 6 5 - 3 5 6 - 5 3 2 - - - 1 - 2 1 6\u0323 - 5\u0323 6\u0323 1 - 2 3 2 - - - 3 - 5 3 2 - 1 2 3 - 5 6 5 - - -"
            },
            {
                "tempo": 160,
                "notes": "5 3 5 3 2 1 2 1 6\u0323 1 6\u0323 5\u0323 6\u0323 1 2 3 5 3 5 3 2 1 2 1 6\u0323 5\u0323 6\u0323 1 2 - 5 6 5 3 2 3 2 1 6\u0323 1 6\u0323 5\u0323 6\u0323 1 2 - 3 5 3 2 1 2 1 6\u0323 5\u0323 6\u0323 5\u0323 3\u0323 5\u0323 -"
            },
        ]
    },
    {
        "name": "春到湘江", "name_en": "Spring at Xiang River",
        "key": "D", "time_sig": (4, 4), "tempo": 66, "level": 6,
        "filename": "02-spring-xiang-river",
        "sections": [
            {
                "tempo": 52,
                "notes": "0 0 3 5 6 1\u0307 - - 6 5 6 1\u0307 2\u0307 1\u0307 6 5 3 5 6 5 3 2 1 6\u0323 5\u0323 6\u0323 1 2 3 - - - - -"
            },
            {
                "tempo": 66,
                "notes": "6\u0323 1 2 3 5 - 3 2 1 - 6\u0323 1 2 - - - 3 5 6 5 3 2 1 2 3 - 2 1 6\u0323 - - - 5\u0323 6\u0323 1 2 3 - 5 3 2 - 1 6\u0323 5\u0323 - - -"
            },
        ]
    },
    {
        "name": "鹧鸪飞", "name_en": "Partridge Flying",
        "key": "D", "time_sig": (4, 4), "tempo": 52, "level": 6,
        "filename": "03-partridge-flying",
        "notes": "5 - - 6 1\u0307 - 6 5 3 - - 2 1 - - - 5 - - 6 1\u0307 - 6 5 6 - - 5 3 - - - 2 - - 3 5 - 3 2 1 - - 6\u0323 5\u0323 - - - 6\u0323 - - 1 2 - 1 6\u0323 5\u0323 - - - 0 - - -"
    },
    {
        "name": "五梆子", "name_en": "Wu Bangzi",
        "key": "G", "time_sig": (2, 4), "tempo": 132, "level": 6,
        "filename": "04-wu-bangzi",
        "notes": "5 3 5 6 5 3 2 1 6\u0323 1 2 3 2 1 6\u0323 5\u0323 6\u0323 1 2 1 6\u0323 5\u0323 3\u0323 5\u0323 6\u0323 - 0 0 5 6 1\u0307 6 5 3 5 6 1\u0307 6 5 3 2 1 6\u0323 5\u0323 6\u0323 - 0 0"
    },
    {
        "name": "秋湖月夜", "name_en": "Autumn Lake Moonlit Night",
        "key": "D", "time_sig": (4, 4), "tempo": 48, "level": 6,
        "filename": "05-autumn-lake",
        "sections": [
            {
                "tempo": 44,
                "notes": "0 0 0 5\u0323 6\u0323 - - 1 2 - - 3 2 1 - - 6\u0323 5\u0323 6\u0323 - - - 0 0 0 0"
            },
            {
                "tempo": 48,
                "notes": "5\u0323 - 6\u0323 - 1 - 2 1 6\u0323 - - 5\u0323 6\u0323 - - - 1 - 2 - 3 - 5 3 2 - 1 6\u0323 5\u0323 - - - 6\u0323 - 1 - 2 - 3 2 1 - 6\u0323 5\u0323 6\u0323 - - -"
            },
        ]
    },

    # ==================== LEVEL 7 ====================
    {
        "name": "幽兰逢春", "name_en": "Orchid Meets Spring",
        "key": "D", "time_sig": (4, 4), "tempo": 46, "level": 7,
        "filename": "01-orchid-meets-spring",
        "sections": [
            {
                "tempo": 46,
                "notes": "0 0 0 5\u0323 6\u0323 - - - 1 2 3 - - 2 1 6\u0323 5\u0323 - - - 6\u0323 1 2 3 5 - - 3 2 1 - - 6\u0323 5\u0323 6\u0323 - - - -"
            },
            {
                "tempo": 46,
                "notes": "6\u0323 - 1 2 3 - 2 1 6\u0323 - 5\u0323 6\u0323 1 - - - 2 - 3 5 6 - 5 3 2 - 1 6\u0323 5\u0323 - - - 6\u0323 - 1 2 3 - 5 6 5 - 3 2 3 - - - 2 - 1 6\u0323 5\u0323 - 6\u0323 1 6\u0323 - - - 0 - - -"
            },
            {
                "tempo": 144,
                "notes": "6\u0323 1 2 3 5 3 2 1 6\u0323 1 2 3 5 6 5 3 2 3 5 6 5 3 2 1 6\u0323 5\u0323 6\u0323 1 2 - 3 5 6 5 3 2 1 6\u0323 5\u0323 6\u0323 1 2 3 - 5 3 2 1 6\u0323 1 6\u0323 5\u0323 6\u0323 - - -"
            },
        ]
    },
    {
        "name": "三五七", "name_en": "San Wu Qi",
        "key": "D", "time_sig": (2, 4), "tempo": 100, "level": 7,
        "filename": "02-san-wu-qi",
        "sections": [
            {
                "tempo": 80,
                "notes": "0 5 3 2 1 6\u0323 5\u0323 3\u0323 5\u0323 - 0 5 3 2 1 6\u0323 5\u0323 3\u0323 5\u0323 6\u0323 1 - 0 5 3 2 1 6\u0323 5\u0323 3\u0323 5\u0323 6\u0323 1 2 3 5 6 -"
            },
            {
                "tempo": 152,
                "notes": "5 3 2 1 6\u0323 5\u0323 3\u0323 5\u0323 6\u0323 1 2 3 5 6 5 3 2 1 6\u0323 5\u0323 6\u0323 1 2 1 6\u0323 5\u0323 3\u0323 5\u0323 6\u0323 -"
            },
        ]
    },
    {
        "name": "秦川抒怀", "name_en": "Reflections on Qinchuan",
        "key": "D", "time_sig": (4, 4), "tempo": 50, "level": 7,
        "filename": "03-reflections-qinchuan",
        "sections": [
            {
                "tempo": 46,
                "notes": "0 0 2 3 5 - - 6 5 3 - 2 - 1 - 6\u0323 - 5\u0323 - - - 6\u0323 1 2 3 2 - - - -"
            },
            {
                "tempo": 50,
                "notes": "2 - 3 5 6 - 5 3 2 - - 1 6\u0323 - - - 5\u0323 - 6\u0323 1 2 - 3 2 1 - 6\u0323 5\u0323 6\u0323 - - - 2 - 3 5 6 - 1\u0307 6 5 - 3 2 3 - - -"
            },
        ]
    },
    {
        "name": "愁空山", "name_en": "Sorrowful Empty Mountain",
        "key": "D", "time_sig": (4, 4), "tempo": 44, "level": 7,
        "filename": "04-sorrowful-empty-mountain",
        "notes": "5\u0323 - - - - 0 0 0 0 6\u0323 - - - - 0 0 0 0 1 - - - - - 2 - 1 - 6\u0323 - 5\u0323 - - - - -"
    },

    # ==================== VIETNAMESE-FAMILIAR SONGS ====================

    # Level 2
    {
        "name": "月亮代表我的心", "name_en": "The Moon Represents My Heart",
        "key": "D", "time_sig": (4, 4), "tempo": 72, "level": 2,
        "filename": "11-moon-represents-my-heart",
        "notes": "1 1 1 - 3 5 6 - 6 6 5 - 5 - - - 5 5 5 - 6 5 3 - 2 2 1 - 1 - - - 1 1 1 - 3 5 6 - 6 6 5 - 5 - - - 5 5 3 - 2 3 2 - 1 1 1 - 1 - - - 3 - 5 - 6 - 1\u0307 - 6 - 5 - 5 - - - 3 - 5 - 6 - 1\u0307 - 6 - 5 - 5 - - - 1 1 1 - 3 5 6 - 6 6 5 - 5 - - - 5 5 3 - 2 3 2 - 1 1 1 - 1 - - -"
    },
    {
        "name": "甜蜜蜜", "name_en": "Sweet Honey",
        "key": "D", "time_sig": (4, 4), "tempo": 96, "level": 2,
        "filename": "12-sweet-honey",
        "notes": "3 3 5 6 5 - - - 3 3 2 3 5 - - - 6 6 5 6 1\u0307 - 6 5 3 3 2 1 2 - - - 3 3 5 6 5 - - - 3 3 2 3 5 - - - 6 6 5 6 1\u0307 - 6 5 3 2 1 2 1 - - -"
    },

    # Level 3
    {
        "name": "但愿人长久", "name_en": "Wishing We Last Forever",
        "key": "D", "time_sig": (4, 4), "tempo": 66, "level": 3,
        "filename": "13-wishing-we-last-forever",
        "notes": "0 0 0 3 5 - 6 5 3 - 2 1 2 - - - 0 0 0 1 2 - 3 5 5 - 3 2 3 - - - 0 0 0 3 5 - 6 5 3 - 2 1 2 - - - 0 0 0 5 6 - 1\u0307 6 5 - 3 5 6 - - - 1\u0307 - 6 5 6 - 5 3 2 - 3 2 1 - - - 0 0 0 3 5 - 6 5 3 - 2 1 2 - - - 0 0 0 5 3 - 2 1 6\u0323 - 1 2 1 - - -"
    },
    {
        "name": "故乡的原风景", "name_en": "Original Scenery of Hometown",
        "key": "D", "time_sig": (4, 4), "tempo": 66, "level": 3,
        "filename": "14-original-scenery-hometown",
        "notes": "3 - 5 6 5 - - - 3 - 2 3 2 - - - 6\u0323 - 1 2 1 - - - 6\u0323 - 5\u0323 6\u0323 1 - - - 3 - 5 6 5 - - - 3 - 2 3 5 - - - 6 - 5 3 2 - - - 1 - 6\u0323 1 2 - - - 3 - 5 6 5 - - - 3 - 2 3 2 - - - 6\u0323 - 1 2 1 - - - 6\u0323 - 5\u0323 6\u0323 1 - - -"
    },
    {
        "name": "渡情", "name_en": "Crossing Love",
        "key": "D", "time_sig": (2, 4), "tempo": 108, "level": 3,
        "filename": "15-crossing-love",
        "notes": "3 5 6 5 3 2 1 - 6\u0323 1 2 3 5 3 2 - 2 3 5 6 5 3 2 1 6\u0323 1 2 1 6\u0323 5\u0323 6\u0323 - 3 5 6 5 3 2 1 - 6\u0323 1 2 3 2 1 6\u0323 -"
    },

    # Level 4
    {
        "name": "一剪梅", "name_en": "A Spray of Plum Blossom",
        "key": "D", "time_sig": (4, 4), "tempo": 72, "level": 4,
        "filename": "12-a-spray-of-plum",
        "notes": "0 0 3 5 6 - - 5 3 - 5 6 5 - - - 0 0 2 3 5 - - 3 2 - 3 5 3 - - - 0 0 3 5 6 - - 5 3 - 2 1 2 - - - 0 0 6\u0323 1 2 - - 1 6\u0323 - 1 2 1 - - - 3 5 6 - 1\u0307 6 5 - 6 5 3 - 5 - - - 3 5 6 - 1\u0307 6 5 - 3 2 1 2 1 - - -"
    },
    {
        "name": "千年等一回", "name_en": "A Thousand Years of Waiting",
        "key": "D", "time_sig": (4, 4), "tempo": 88, "level": 4,
        "filename": "13-thousand-years-waiting",
        "notes": "6\u0323 - 1 2 3 - 2 1 2 - 3 5 3 - - - 6 - 5 3 5 - 3 2 1 - 6\u0323 1 2 - - - 6\u0323 - 1 2 3 - 2 1 2 - 3 5 6 - - - 5 - 3 5 6 - 1\u0307 6 5 - 3 2 1 - - - 3 - 5 6 1\u0307 - 6 5 6 - 5 3 2 - - - 1 - 6\u0323 1 2 - 3 2 1 - - - 0 - - -"
    },
    {
        "name": "铁血丹心", "name_en": "Iron Blood Loyal Heart",
        "key": "D", "time_sig": (4, 4), "tempo": 80, "level": 4,
        "filename": "14-iron-blood-loyal-heart",
        "notes": "5\u0323 - 1 2 3 - - 2 1 - 6\u0323 1 2 - - - 2 - 3 5 6 - - 5 3 - 2 3 5 - - - 5 - 6 1\u0307 6 - - 5 3 - 5 6 5 - - - 3 - 2 1 2 - - 3 1 - 6\u0323 5\u0323 6\u0323 - - - 5\u0323 - 1 2 3 - - 2 1 - 6\u0323 1 2 - - - 2 - 3 5 6 - 1\u0307 6 5 - 3 2 1 - - -"
    },

    # Level 5
    {
        "name": "上海滩", "name_en": "The Bund",
        "key": "D", "time_sig": (4, 4), "tempo": 80, "level": 5,
        "filename": "07-the-bund",
        "notes": "0 0 0 5\u0323 1 - 2 3 2 - 1 6\u0323 1 - - - 0 0 0 1 2 - 3 5 5 - 3 2 3 - - - 0 0 0 3 5 - 6 1\u0307 6 - 5 6 5 - - - 0 0 5 6 1\u0307 - 6 5 3 - 2 1 2 - - - 0 0 0 5\u0323 1 - 2 3 2 - 1 6\u0323 1 - - - 0 0 0 1 3 - 5 6 5 - 3 2 1 - - -"
    },
    {
        "name": "枉凝眉", "name_en": "Vain Knitting of Brows",
        "key": "D", "time_sig": (4, 4), "tempo": 56, "level": 5,
        "filename": "08-vain-knitting-brows",
        "notes": "0 0 5\u0323 6\u0323 1 - 2 3 2 - - 1 6\u0323 - - - 5\u0323 - 6\u0323 1 2 - 3 2 1 - - 6\u0323 5\u0323 - - - 6\u0323 - 1 2 3 - 5 3 2 - 1 2 3 - - - 5 - 6 5 3 - 2 1 6\u0323 - 5\u0323 6\u0323 1 - - - 1 - 2 3 5 - 6 5 3 - 2 1 2 - - - 6\u0323 - 1 2 1 - 6\u0323 5\u0323 6\u0323 - - - 0 - - -"
    },
    {
        "name": "琵琶语", "name_en": "Pipa Language",
        "key": "D", "time_sig": (4, 4), "tempo": 66, "level": 5,
        "filename": "09-pipa-language",
        "notes": "0 0 3 5 6 - 5 3 2 - 3 2 1 - - - 0 0 1 2 3 - 2 1 6\u0323 - 1 6\u0323 5\u0323 - - - 0 0 5\u0323 6\u0323 1 - 2 3 5 - 3 2 3 - - - 3 - 5 6 5 - 3 2 1 - 6\u0323 1 2 - - - 0 0 3 5 6 - 1\u0307 6 5 - 3 5 6 - - - 5 - 3 2 1 - 6\u0323 1 2 - 1 6\u0323 5\u0323 - - -"
    },

    # Level 6
    {
        "name": "凉凉", "name_en": "Cold Cold",
        "key": "D", "time_sig": (4, 4), "tempo": 72, "level": 6,
        "filename": "06-cold-cold",
        "notes": "0 0 3 5 6 - - 5 3 - 2 3 5 - - - 0 0 5 6 1\u0307 - - 6 5 - 6 5 3 - - - 0 0 2 3 5 - - 3 2 - 1 2 3 - - - 5 - 6 1\u0307 6 - 5 3 2 - 3 2 1 - - - 1\u0307 - 2\u0307 1\u0307 6 - 5 6 1\u0307 - 6 5 6 - - - 5 - 3 5 6 - 5 3 2 - 1 6\u0323 5\u0323 - - - 6\u0323 - 1 2 3 - 5 3 2 - 1 2 1 - - -"
    },
    {
        "name": "菊花台", "name_en": "Chrysanthemum Terrace",
        "key": "D", "time_sig": (4, 4), "tempo": 76, "level": 6,
        "filename": "07-chrysanthemum-terrace",
        "notes": "0 0 0 3 5 - 5 6 5 - 3 2 3 - - - 0 0 0 2 3 - 3 5 3 - 2 1 2 - - - 0 0 0 1 2 - 2 3 2 - 1 6\u0323 1 - - - 0 0 0 6\u0323 1 - 1 2 1 - 6\u0323 5\u0323 6\u0323 - - - 3 - 5 6 1\u0307 - 6 5 6 - 5 3 5 - - - 3 - 5 6 1\u0307 - 6 5 3 - 2 1 2 - - - 6\u0323 - 1 2 3 - 2 1 6\u0323 - 5\u0323 6\u0323 1 - - -"
    },
    {
        "name": "半壶纱", "name_en": "Half Pot of Gauze",
        "key": "D", "time_sig": (4, 4), "tempo": 66, "level": 6,
        "filename": "08-half-pot-gauze",
        "notes": "0 0 5\u0323 6\u0323 1 - 2 3 2 - 1 6\u0323 1 - - - 0 0 6\u0323 1 2 - 3 5 3 - 2 1 2 - - - 0 0 2 3 5 - 6 5 3 - 2 3 5 - - - 6 - 5 3 2 - 1 2 3 - 2 1 6\u0323 - - - 5\u0323 - 6\u0323 1 2 - 3 2 1 - 6\u0323 5\u0323 6\u0323 - - - 1 - 2 3 5 - 3 2 1 - 6\u0323 1 2 - 1 6\u0323 5\u0323 - - - 0 - - -"
    },

    # Level 7
    {
        "name": "梅花三弄", "name_en": "Three Variations on Plum Blossom",
        "key": "D", "time_sig": (4, 4), "tempo": 52, "level": 7,
        "filename": "05-plum-blossom",
        "sections": [
            {
                "tempo": 52,
                "notes": "5\u0323 - 6\u0323 1 2 - - 3 2 - 1 6\u0323 5\u0323 - - - 6\u0323 - 1 2 3 - 5 3 2 - 1 6\u0323 1 - - - 2 - 3 5 6 - 5 3 5 - 3 2 3 - - - 2 - 1 6\u0323 5\u0323 - 6\u0323 1 6\u0323 - 5\u0323 6\u0323 1 - - -"
            },
            {
                "tempo": 56,
                "notes": "5 - 6 1\u0307 2\u0307 - - 3\u0307 2\u0307 - 1\u0307 6 5 - - - 6 - 1\u0307 2\u0307 3\u0307 - 5\u0307 3\u0307 2\u0307 - 1\u0307 6 1\u0307 - - -"
            },
            {
                "tempo": 52,
                "notes": "5\u0323 - 6\u0323 1 2 - - 3 2 - 1 6\u0323 5\u0323 - - - 6\u0323 - 1 2 3 - 5 3 2 - 1 6\u0323 1 - - -"
            },
        ]
    },
    {
        "name": "二泉映月", "name_en": "Moon Reflected in Two Springs",
        "key": "D", "time_sig": (4, 4), "tempo": 48, "level": 7,
        "filename": "06-moon-reflected-two-springs",
        "notes": "0 0 0 5\u0323 6\u0323 - 1 2 1 - 6\u0323 5\u0323 6\u0323 - - - 1 - 2 3 5 - 3 2 1 - 6\u0323 1 2 - - - 3 - 5 6 5 - 3 2 3 - 2 1 6\u0323 - - - 5\u0323 - 6\u0323 1 2 - 1 6\u0323 5\u0323 - 6\u0323 5\u0323 3\u0323 - - - 5\u0323 - 6\u0323 1 2 - 3 5 3 - 2 1 2 - - - 6\u0323 - 1 2 3 - 5 6 5 - 3 2 1 - - - 6\u0323 - 1 2 1 - 6\u0323 5\u0323 6\u0323 - - - 0 - - -"
    },
]


# === MAIN ===

def generate_all():
    """Generate all MIDI files."""
    os.makedirs(MIDI_DIR, exist_ok=True)

    count = 0
    for song in SONGS:
        level = song["level"]
        level_dir = os.path.join(MIDI_DIR, f"level-{level}")
        os.makedirs(level_dir, exist_ok=True)

        filename = song["filename"] + ".mid"
        filepath = os.path.join(level_dir, filename)

        try:
            midi = create_midi(song)
            with open(filepath, "wb") as f:
                midi.writeFile(f)

            name_display = song.get("name", "") + " " + song.get("name_en", "")
            print(f"  Level {level}: {filename:45s} {name_display}")
            count += 1
        except Exception as e:
            print(f"  ERROR Level {level}: {filename} — {e}")

    print(f"\nGenerated {count} MIDI files in {MIDI_DIR}/")


if __name__ == "__main__":
    print("Generating MIDI practice files for Dizi Flute Course...\n")
    generate_all()
