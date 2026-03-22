import { useState } from "react";
import { Outlet } from "react-router";
import { useThemeStore, ThemeToggle } from "@/features/theme";
import { Sidebar } from "@/features/course-navigation";

export function App() {
  const { theme } = useThemeStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="flex h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-bg)] md:block">
          <Sidebar />
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            />
            <aside className="relative z-50 h-full w-64 bg-[var(--color-bg)] shadow-xl">
              <Sidebar onClose={() => setSidebarOpen(false)} />
            </aside>
          </div>
        )}

        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Top bar */}
          <header className="flex h-14 items-center justify-between border-b border-[var(--color-border)] px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 hover:bg-[var(--color-bg-secondary)] md:hidden"
              aria-label="Open sidebar"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex-1" />
            <ThemeToggle />
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
