interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  className?: string;
}

export function Checkbox({ checked, onChange, label, className = "" }: CheckboxProps) {
  return (
    <label className={`flex items-center gap-2 cursor-pointer group ${className}`}>
      <div
        className="w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors"
        style={{
          backgroundColor: checked ? "var(--color-accent)" : "transparent",
          border: `2px solid ${checked ? "var(--color-accent)" : "var(--color-border)"}`,
        }}
        onClick={() => onChange(!checked)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onChange(!checked);
          }
        }}
        role="checkbox"
        aria-checked={checked}
        tabIndex={0}
      >
        {checked && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span
        className="text-sm select-none"
        style={{ color: checked ? "var(--color-text-secondary)" : "var(--color-text)" }}
      >
        {label}
      </span>
    </label>
  );
}
