import { useCallback, useEffect, useRef, useState } from "react";

/** Beats per bar parsed from a time signature like "4/4" or "3/4". 0 = no accent. */
function beatsPerBar(timeSignature?: string): number {
  if (!timeSignature) return 0;
  const n = parseInt(timeSignature.split("/")[0] ?? "", 10);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

/**
 * A steady audio metronome driven by the Web Audio API.
 *
 * Uses the standard lookahead-scheduling pattern: a setInterval timer wakes
 * periodically and schedules any clicks falling inside the next window, so
 * timing stays sample-accurate regardless of main-thread jitter. The first
 * beat of each bar is accented (higher pitch) when a time signature is given.
 */
export function useMetronome(bpm: number, timeSignature?: string) {
  const [isOn, setIsOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const nextNoteTimeRef = useRef(0);
  const beatInBarRef = useRef(0);
  // Keep the latest tempo/meter available to the scheduler without re-arming it.
  const bpmRef = useRef(bpm);
  const barRef = useRef(beatsPerBar(timeSignature));
  bpmRef.current = bpm;
  barRef.current = beatsPerBar(timeSignature);

  const playClick = useCallback((ctx: AudioContext, time: number, accent: boolean) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = accent ? 1500 : 1000;
    gain.gain.setValueAtTime(accent ? 0.5 : 0.3, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.03);
    osc.connect(gain).connect(ctx.destination);
    osc.start(time);
    osc.stop(time + 0.03);
  }, []);

  const stop = useCallback(() => {
    setIsOn(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const toggle = useCallback(() => setIsOn((v) => !v), []);

  useEffect(() => {
    if (!isOn) return;

    // Lazily create / resume the AudioContext (must follow a user gesture).
    let ctx = ctxRef.current;
    if (!ctx) {
      ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      ctxRef.current = ctx;
    }
    void ctx.resume();

    const scheduleAheadTime = 0.1; // seconds of audio to schedule in advance
    nextNoteTimeRef.current = ctx.currentTime + 0.05;
    beatInBarRef.current = 0;

    function scheduler() {
      const c = ctxRef.current;
      if (!c) return;
      while (nextNoteTimeRef.current < c.currentTime + scheduleAheadTime) {
        const bar = barRef.current;
        const accent = bar > 0 && beatInBarRef.current % bar === 0;
        playClick(c, nextNoteTimeRef.current, accent);
        nextNoteTimeRef.current += 60 / bpmRef.current;
        beatInBarRef.current += 1;
      }
    }

    scheduler();
    intervalRef.current = setInterval(scheduler, 25);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isOn, playClick]);

  // Tear down the AudioContext on unmount.
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      void ctxRef.current?.close();
    };
  }, []);

  return { isOn, toggle, stop };
}
