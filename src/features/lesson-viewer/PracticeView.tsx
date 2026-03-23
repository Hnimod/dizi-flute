import { useEffect, useState } from "react";
import { AudioPlayer, VideoEmbed, JianpuRenderer } from "@/shared/ui";
import { useProgressStore, selectIsCompleted } from "@/features/progress-tracking";
import type { Song, Exercise } from "@/shared/types";
import { UserVideos } from "./UserVideos";

function getItemTitle(item: Song | Exercise): string {
  if (item.type === "song") {
    return [item.titleChinese, item.titleVietnamese, item.titleEnglish]
      .filter(Boolean)
      .join(" / ");
  }
  return item.title;
}

function CompletionButton({ item }: { item: Song | Exercise }) {
  const toggleItem = useProgressStore((s) => s.toggleItem);
  const completed = useProgressStore(selectIsCompleted(item.id));

  return (
    <button
      onClick={() => toggleItem(item.id)}
      className={`min-h-[44px] rounded-xl px-5 py-2 text-sm font-medium transition-colors ${
        completed
          ? "bg-(--color-bg-tertiary) text-(--color-text-secondary)"
          : "bg-(--color-accent) text-white"
      }`}
    >
      {completed ? "Completed ✓" : "Mark Complete"}
    </button>
  );
}

interface PracticeViewProps {
  items: (Song | Exercise)[];
  initialIndex: number;
  levelTitle: string;
  onClose: () => void;
}

export function PracticeView({ items, initialIndex, levelTitle, onClose }: PracticeViewProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const item = items[currentIndex]!;

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0) setCurrentIndex((i) => i - 1);
      if (e.key === "ArrowRight" && currentIndex < items.length - 1) setCurrentIndex((i) => i + 1);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex, items.length, onClose]);

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < items.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-(--color-bg)">
      {/* Sticky top bar */}
      <div className="flex shrink-0 items-center justify-between border-b border-(--color-border) px-3 py-2">
        <button
          onClick={onClose}
          className="min-h-[44px] flex items-center gap-1.5 rounded-lg px-2 py-2 text-sm font-medium transition-opacity hover:opacity-70"
          style={{ color: "var(--color-accent)" }}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">{levelTitle}</span>
          <span className="sm:hidden">Back</span>
        </button>
        <span className="text-xs font-medium text-(--color-text-secondary)">
          {currentIndex + 1} of {items.length}
        </span>
        <button
          onClick={() => hasNext && setCurrentIndex((i) => i + 1)}
          disabled={!hasNext}
          className="min-h-[44px] rounded-lg px-2 py-2 text-sm font-medium transition-opacity disabled:opacity-30"
          style={{ color: "var(--color-accent)" }}
        >
          Next
          <svg className="ml-1 inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Title */}
        <div className="px-4 pt-4 pb-2">
          <h2 className="text-lg font-bold md:text-xl">{getItemTitle(item)}</h2>
          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-(--color-text-secondary)">
            <span>Key: {item.key}</span>
            <span>Time: {item.timeSignature}</span>
            {item.tempo && <span>Tempo: {item.tempo} BPM</span>}
            {item.type === "song" && item.origin && <span>Origin: {item.origin}</span>}
          </div>
        </div>

        {/* Video embed */}
        {item.videoUrl && (
          <div className="px-4 py-2">
            <VideoEmbed url={item.videoUrl} />
          </div>
        )}

        {/* User-added videos */}
        <div className="px-4 py-2">
          <UserVideos itemId={item.id} />
        </div>

        {/* Description (if any) */}
        {item.description && (
          <p className="px-4 py-2 text-sm leading-relaxed text-(--color-text-secondary)">
            {item.description}
          </p>
        )}

        {/* Jianpu notation */}
        <div className="px-4 py-2">
          <JianpuRenderer
            content={item.jianpu}
            className="rounded-xl p-4 overflow-x-auto"
            style={{
              backgroundColor: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
            }}
          />
        </div>

        {/* Audio player */}
        {item.audioPath && (
          <div className="px-4 py-2">
            <AudioPlayer src={item.audioPath} />
          </div>
        )}

        {/* Spacer for bottom bar */}
        <div className="h-4" />
      </div>

      {/* Sticky bottom bar */}
      <div className="shrink-0 border-t border-(--color-border) bg-(--color-bg) px-3 py-2 pb-safe">
        <div className="flex items-center justify-between">
          <button
            onClick={() => hasPrev && setCurrentIndex((i) => i - 1)}
            disabled={!hasPrev}
            className="min-h-[44px] rounded-lg px-3 py-2 text-sm font-medium transition-opacity disabled:opacity-30"
            style={{ color: "var(--color-accent)" }}
          >
            ← Prev
          </button>
          <CompletionButton item={item} />
          <button
            onClick={() => hasNext && setCurrentIndex((i) => i + 1)}
            disabled={!hasNext}
            className="min-h-[44px] rounded-lg px-3 py-2 text-sm font-medium transition-opacity disabled:opacity-30"
            style={{ color: "var(--color-accent)" }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
