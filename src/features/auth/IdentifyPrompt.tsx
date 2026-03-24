import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "./store";

export function IdentifyPrompt() {
  const { isAuthenticated, dismissed, identify, dismiss } = useAuthStore();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Don't show if already authenticated or dismissed
  if (isAuthenticated || dismissed) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await identify(email);
    } catch {
      setError("Failed to connect. Your progress will be saved locally.");
      dismiss();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-20 left-4 right-4 z-50 md:bottom-6 md:left-auto md:right-6 md:w-80"
      >
        <div
          className="rounded-xl p-4 shadow-lg"
          style={{
            backgroundColor: "var(--color-bg-secondary)",
            border: "1px solid var(--color-border)",
          }}
        >
          <div className="flex items-start justify-between mb-2">
            <p
              className="text-sm font-medium"
              style={{ color: "var(--color-text)" }}
            >
              Sync your progress
            </p>
            <button
              onClick={dismiss}
              className="text-xs hover:opacity-70"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Skip
            </button>
          </div>
          <p
            className="text-xs mb-3"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Enter your email to save progress across devices.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 rounded-lg px-3 py-2 text-sm outline-none"
              style={{
                backgroundColor: "var(--color-bg)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text)",
              }}
            />
            <button
              type="submit"
              disabled={loading}
              className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              {loading ? "..." : "Sync"}
            </button>
          </form>
          {error && (
            <p className="text-xs mt-2 text-red-500">{error}</p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
