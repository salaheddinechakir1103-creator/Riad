import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

export const AudioAmbience: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);

  // Initialize Web Audio synthesizer for soothing courtyard water fountain & gentle harmonic chime
  const startAtmosphere = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // 1. Water fountain murmur (filtered gentle pink/brown noise)
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 1.8;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Filter noise to sound like gentle rippling courtyard basin water
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);
      filter.Q.setValueAtTime(1.2, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(masterGain);
      whiteNoise.start();

      // 2. Periodic soft harmonic Moroccan chime (like distant lute/harp in riad patio)
      const notes = [293.66, 329.63, 369.99, 440.0, 523.25, 587.33]; // D Dorian / Andalusian
      const playChime = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        const chimeCtx = audioCtxRef.current;
        const osc = chimeCtx.createOscillator();
        const chimeGain = chimeCtx.createGain();

        const note = notes[Math.floor(Math.random() * notes.length)];
        osc.type = 'sine';
        osc.frequency.setValueAtTime(note, chimeCtx.currentTime);

        chimeGain.gain.setValueAtTime(0.001, chimeCtx.currentTime);
        chimeGain.gain.exponentialRampToValueAtTime(0.04, chimeCtx.currentTime + 0.1);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, chimeCtx.currentTime + 3.2);

        osc.connect(chimeGain);
        chimeGain.connect(masterGain);

        osc.start();
        osc.stop(chimeCtx.currentTime + 3.5);

        // Schedule next gentle chime every 4 to 8 seconds
        timerRef.current = window.setTimeout(playChime, 4000 + Math.random() * 4000);
      };

      playChime();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const stopAtmosphere = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopAtmosphere();
    } else {
      startAtmosphere();
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <button
      type="button"
      onClick={toggleSound}
      className={`p-2 rounded-lg border transition-all flex items-center gap-1.5 text-xs cursor-pointer ${
        isPlaying
          ? 'bg-[#c5a059]/20 border-[#c5a059] text-[#c5a059]'
          : 'bg-black/40 border-white/10 text-stone-400 hover:text-stone-200 hover:border-white/20'
      }`}
      title={isPlaying ? 'Couper l’ambiance sonore du riad' : 'Activer l’ambiance sonore (Fontaine & Oud)'}
      aria-label="Ambiance sonore"
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-4 h-4 text-[#c5a059] animate-pulse" />
          <span className="hidden xl:inline text-[11px] font-medium text-[#c5a059]">Fontaine</span>
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4" />
          <span className="hidden xl:inline text-[11px]">Son</span>
        </>
      )}
    </button>
  );
};
