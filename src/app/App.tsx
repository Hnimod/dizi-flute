import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore, ThemeToggle } from "@/features/theme";
import { Sidebar } from "@/features/course-navigation";
import { useAuthStore } from "@/features/auth";
import { useProgressStore } from "@/features/progress-tracking";
import { BottomNav } from "./BottomNav";

const queryClient = new QueryClient();

function LoginPopover({ onClose }: { onClose: () => void }) {
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      onClose();
    } catch {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div
        className="absolute right-0 top-full mt-1 z-50 w-72 rounded-xl p-4 shadow-lg"
        style={{
          backgroundColor: "var(--color-bg-secondary)",
          border: "1px solid var(--color-border)",
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-lg px-3 py-2 text-sm outline-none"
            style={{
              backgroundColor: "var(--color-bg)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
            }}
            required
            autoFocus
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-lg px-3 py-2 text-sm outline-none"
            style={{
              backgroundColor: "var(--color-bg)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
            }}
            required
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg py-2 text-sm font-medium text-white disabled:opacity-50"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            {loading ? "..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}

export function App() {
  const { theme } = useThemeStore();
  const location = useLocation();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isAdmin = useAuthStore((s) => s.isAdmin);
  const checkAuth = useAuthStore((s) => s.checkAuth);
  const logout = useAuthStore((s) => s.logout);
  const loadProgress = useProgressStore((s) => s.loadFromApi);
  const [showLogin, setShowLogin] = useState(false);

  // On startup: verify auth token and load progress from API
  useEffect(() => {
    checkAuth().then(() => {
      if (useAuthStore.getState().isAuthenticated) {
        loadProgress();
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Reload progress whenever auth state changes (login/logout)
  useEffect(() => {
    if (isAuthenticated) {
      loadProgress();
    }
  }, [isAuthenticated, loadProgress]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={theme === "dark" ? "dark" : ""}>
        <div className="flex h-screen bg-(--color-bg) text-(--color-text)">
          {/* Desktop sidebar */}
          <aside className="hidden w-64 shrink-0 border-r border-(--color-border) bg-(--color-bg-secondary) md:block">
            <Sidebar />
          </aside>

          {/* Main content */}
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* Top bar */}
            <header className="flex h-12 items-center justify-between border-b border-(--color-border) px-4 md:h-14">
              <span className="text-sm font-semibold text-(--color-accent) md:hidden">
                Dizi Flute
              </span>
              <div className="flex-1" />
              <div className="relative flex items-center gap-2 mr-3">
                {isAdmin ? (
                  <>
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase text-white"
                      style={{ backgroundColor: "var(--color-accent)" }}
                    >
                      Admin
                    </span>
                    <button
                      onClick={logout}
                      className="text-xs hover:opacity-70 transition-opacity"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setShowLogin(!showLogin)}
                      className="text-xs hover:opacity-70 transition-opacity"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      Login
                    </button>
                    {showLogin && <LoginPopover onClose={() => setShowLogin(false)} />}
                  </>
                )}
              </div>
              <ThemeToggle />
            </header>

            {/* Page content — extra bottom padding on mobile for bottom nav */}
            <main className="flex-1 overflow-y-auto p-4 pb-20 md:p-6 md:pb-6 lg:p-8 lg:pb-8">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </main>
          </div>

          {/* Mobile bottom navigation */}
          <BottomNav />
        </div>
      </div>
    </QueryClientProvider>
  );
}
