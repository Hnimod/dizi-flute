import { motion, AnimatePresence } from "framer-motion";

interface SectionDividerProps {
  label: string;
  count?: number;
  collapsed?: boolean;
  onToggle?: () => void;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export function SectionDivider({ label, count, collapsed, onToggle, icon, children }: SectionDividerProps) {
  const header = (
    <div className="flex w-full items-center gap-2 py-2">
      {icon}
      <span
        className="text-[11px] font-semibold uppercase tracking-wider"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {label}
      </span>
      {count !== undefined && (
        <span
          className="text-[10px] font-medium"
          style={{ color: "var(--color-text-secondary)", opacity: 0.6 }}
        >
          ({count})
        </span>
      )}
      <div className="flex-1 h-px" style={{ backgroundColor: "var(--color-border)" }} />
      {onToggle && (
        <svg
          className={`h-3 w-3 shrink-0 transition-transform ${collapsed ? "" : "rotate-180"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          style={{ color: "var(--color-text-secondary)", opacity: 0.5 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      )}
    </div>
  );

  return (
    <div className="mb-2">
      {onToggle ? (
        <button onClick={onToggle} className="flex w-full cursor-pointer">
          {header}
        </button>
      ) : (
        header
      )}
      <AnimatePresence initial={false}>
        {!collapsed && children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
