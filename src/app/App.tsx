import { useEffect, useState } from "react";
import { Outlet, useLocation, NavLink } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useThemeStore, ThemeToggle } from "@/features/theme";
import { useAuthStore } from "@/features/auth";
import { BottomNav } from "./BottomNav";

interface SidebarState {
  collapsed: boolean;
  toggle: () => void;
}

const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      collapsed: false,
      toggle: () => set((s) => ({ collapsed: !s.collapsed })),
    }),
    { name: "dizi-sidebar" },
  ),
);

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

const ICON_CLASS = "h-5 w-5 shrink-0";

const sidebarLinks = [
  {
    to: "/",
    label: "Songs",
    end: true,
    icon: (
      <svg className={ICON_CLASS} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
  },
  {
    to: "/techniques",
    label: "Techniques",
    end: false,
    icon: (
      <svg className={ICON_CLASS} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 14.121A3 3 0 1 0 9.879 9.879m4.242 4.242L9.879 9.879m4.242 4.242l2.122 2.122M9.879 9.879L7.757 7.757m0 0A7.5 7.5 0 1 0 16.243 16.243M7.757 7.757l-1.414-1.414" />
      </svg>
    ),
  },
  {
    to: "/knowledge",
    label: "Knowledge",
    end: false,
    icon: (
      <svg className={ICON_CLASS} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    to: "/practice",
    label: "Practice",
    end: false,
    icon: (
      <svg className={ICON_CLASS} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  return (
    <nav className="flex h-full flex-col overflow-y-auto overflow-x-hidden">
      <div
        className={`flex items-center border-b border-(--color-border) ${
          collapsed ? "justify-center px-2 py-4" : "px-4 py-4"
        }`}
      >
        <NavLink
          to="/"
          className="text-lg font-bold text-(--color-accent) whitespace-nowrap"
          title={collapsed ? "Dizi Flute" : undefined}
        >
          {collapsed ? "D" : "Dizi Flute"}
        </NavLink>
      </div>

      <div className={`flex-1 ${collapsed ? "p-2" : "p-3"}`}>
        <ul className="space-y-0.5">
          {sidebarLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                title={collapsed ? link.label : undefined}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg text-sm font-medium transition-colors ${
                    collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5"
                  } ${
                    isActive
                      ? "bg-(--color-accent) text-white shadow-sm"
                      : "hover:bg-(--color-bg)"
                  }`
                }
              >
                {link.icon}
                {!collapsed && <span className="whitespace-nowrap">{link.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onToggle}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className={`flex items-center border-t border-(--color-border) text-(--color-text-secondary) transition-colors hover:bg-(--color-bg) ${
          collapsed ? "justify-center px-2 py-3" : "justify-end px-3 py-3"
        }`}
      >
        <svg
          className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </nav>
  );
}

export function App() {
  const { theme } = useThemeStore();
  const location = useLocation();
  const isAdmin = useAuthStore((s) => s.isAdmin);
  const logout = useAuthStore((s) => s.logout);
  const sidebarCollapsed = useSidebarStore((s) => s.collapsed);
  const toggleSidebar = useSidebarStore((s) => s.toggle);
  const [showLogin, setShowLogin] = useState(false);

  // Mirror the theme class onto <html> so portaled overlays (e.g. fullscreen
  // notation) inherit the same CSS variables as the in-tree wrapper below.
  useEffect(() => {
    const cl = document.documentElement.classList;
    if (theme === "dark") cl.add("dark");
    else cl.remove("dark");
  }, [theme]);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="flex h-screen bg-(--color-bg) text-(--color-text)">
        {/* Desktop sidebar */}
        <aside
          className={`hidden shrink-0 border-r border-(--color-border) bg-(--color-bg-secondary) transition-[width] duration-200 ease-out md:block ${
            sidebarCollapsed ? "w-16" : "w-64"
          }`}
        >
          <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
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
  );
}
