import { useRef, useState } from "react";

interface AudioPlayerProps {
  src: string;
  title?: string;
  className?: string;
}

const SPEEDS = [0.5, 0.75, 1, 1.25] as const;

export function AudioPlayer({ src, title, className = "" }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [speed, setSpeed] = useState(1);

  function handleSpeedChange(newSpeed: number) {
    setSpeed(newSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
  }

  return (
    <div
      className={`rounded-xl p-3.5 md:p-4 ${className}`}
      style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}
    >
      {title && (
        <p className="text-sm font-medium mb-2" style={{ color: "var(--color-text)" }}>
          {title}
        </p>
      )}
      <audio ref={audioRef} controls className="w-full mb-2" preload="metadata">
        <source src={src} type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>
      <div className="flex items-center gap-1.5">
        <span className="text-xs mr-1" style={{ color: "var(--color-text-secondary)" }}>
          Speed:
        </span>
        {SPEEDS.map((s) => (
          <button
            key={s}
            onClick={() => handleSpeedChange(s)}
            className="min-h-[36px] min-w-[40px] rounded-lg text-xs font-medium transition-colors cursor-pointer md:min-h-[32px] md:min-w-[36px]"
            style={{
              backgroundColor: speed === s ? "var(--color-accent)" : "transparent",
              color: speed === s ? "#ffffff" : "var(--color-text-secondary)",
              border: `1px solid ${speed === s ? "var(--color-accent)" : "var(--color-border)"}`,
            }}
          >
            {s}x
          </button>
        ))}
      </div>
    </div>
  );
}
