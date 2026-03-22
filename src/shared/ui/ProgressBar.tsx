interface ProgressBarProps {
  value: number;
  className?: string;
  label?: string;
}

export function ProgressBar({ value, className = "", label }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className={className}>
      {label && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm font-medium" style={{ color: "var(--color-text)" }}>
            {label}
          </span>
          <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
            {Math.round(clamped)}%
          </span>
        </div>
      )}
      {!label && (
        <div className="text-right mb-1.5">
          <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
            {Math.round(clamped)}%
          </span>
        </div>
      )}
      <div
        className="w-full h-2.5 rounded-full overflow-hidden md:h-2"
        style={{ backgroundColor: "var(--color-border)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${clamped}%`, backgroundColor: "var(--color-accent)" }}
        />
      </div>
    </div>
  );
}
