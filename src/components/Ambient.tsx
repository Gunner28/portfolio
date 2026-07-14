"use client";

import { useEffect, useRef, useState } from "react";
import { UI_EVENTS, toast } from "@/lib/ui";

// A soft fireplace/rain hush synthesized with the Web Audio API — no asset file.
// Filtered brown noise with a slow gain shimmer to suggest crackle.
export default function Ambient() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ src: AudioBufferSourceNode; gain: GainNode } | null>(null);

  const stop = () => {
    const nodes = nodesRef.current;
    if (nodes) {
      try {
        nodes.gain.gain.linearRampToValueAtTime(0, (ctxRef.current?.currentTime || 0) + 0.4);
        nodes.src.stop((ctxRef.current?.currentTime || 0) + 0.5);
      } catch {}
      nodesRef.current = null;
    }
    setOn(false);
  };

  const start = () => {
    let ctx = ctxRef.current;
    if (!ctx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctx = new AC();
      ctxRef.current = ctx;
    }
    if (ctx.state === "suspended") ctx.resume();

    // brown noise buffer
    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.2;
    }

    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = 780;

    const gain = ctx.createGain();
    gain.gain.value = 0;

    // slow shimmer via LFO on gain
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.15;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.04;
    lfo.connect(lfoGain).connect(gain.gain);

    src.connect(lowpass).connect(gain).connect(ctx.destination);
    src.start();
    lfo.start();
    gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.6);

    nodesRef.current = { src, gain };
    setOn(true);
  };

  useEffect(() => {
    const handler = () => {
      if (nodesRef.current) {
        stop();
        toast("Fireplace off");
      } else {
        start();
        toast("Fireplace crackling…");
      }
    };
    window.addEventListener(UI_EVENTS.toggleAmbient, handler);
    return () => {
      window.removeEventListener(UI_EVENTS.toggleAmbient, handler);
      if (nodesRef.current) stop();
    };
  }, []);

  const toggle = () => window.dispatchEvent(new CustomEvent(UI_EVENTS.toggleAmbient));

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={on ? "Mute fireplace" : "Play fireplace ambience"}
      title={on ? "Fireplace on" : "Fireplace"}
      className={
        "transition-colors " + (on ? "text-brass-bright" : "text-muted hover:text-brass-bright")
      }
    >
      {on ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 10v4h4l5 5V5L7 10H3z" />
          <path d="M16 8.5a4 4 0 0 1 0 7M19 6a7 7 0 0 1 0 12" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 10v4h4l5 5V5L7 10H3z" />
          <path d="M17 9l4 6M21 9l-4 6" />
        </svg>
      )}
    </button>
  );
}
