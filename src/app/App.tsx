import { Outlet } from "react-router";
import { useThemeStore, ThemeToggle } from "@/features/theme";
import { Sidebar } from "@/features/course-navigation";
import { BottomNav } from "./BottomNav";

export function App() {
  const { theme } = useThemeStore();

  return (
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
            <ThemeToggle />
          </header>

          {/* Page content — extra bottom padding on mobile for bottom nav */}
          <main className="flex-1 overflow-y-auto p-4 pb-20 md:p-6 md:pb-6 lg:p-8 lg:pb-8">
            <Outlet />
          </main>
        </div>

        {/* Mobile bottom navigation */}
        <BottomNav />
      </div>
    </div>
  );
}
