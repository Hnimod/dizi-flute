import { motion, AnimatePresence } from "framer-motion";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  className?: string;
}

export function Checkbox({ checked, onChange, label, className = "" }: CheckboxProps) {
  return (
    <label className={`flex items-center gap-2 cursor-pointer group ${className}`}>
      <motion.div
        className="w-5 h-5 rounded flex items-center justify-center shrink-0"
        style={{
          backgroundColor: checked ? "var(--color-accent)" : "transparent",
          border: `2px solid ${checked ? "var(--color-accent)" : "var(--color-border)"}`,
        }}
        whileTap={{ scale: 0.85 }}
        animate={checked ? { scale: [1, 1.2, 1] } : { scale: 1 }}
        transition={{ duration: 0.2 }}
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
        <AnimatePresence>
          {checked && (
            <motion.svg
              className="w-3 h-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.div>
      <span
        className="text-sm select-none"
        style={{ color: checked ? "var(--color-text-secondary)" : "var(--color-text)" }}
      >
        {label}
      </span>
    </label>
  );
}
