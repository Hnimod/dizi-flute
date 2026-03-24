import { useEffect, useRef } from "react";
import { useAuthStore } from "./store";
import { useProgressStore } from "@/features/progress-tracking";
import { usePracticeStore } from "@/features/practice-timer";
import { useVideoLinksStore } from "@/features/lesson-viewer";
import {
  syncProgress,
  syncSession,
  syncVideoLinks,
} from "@/data/api";

/** Invisible component that syncs store changes to the API when authenticated */
export function SyncProvider() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const checkAuth = useAuthStore((s) => s.checkAuth);
  const progressSyncTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const videoSyncTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Sync progress changes (debounced)
  useEffect(() => {
    if (!isAuthenticated) return;

    const unsub = useProgressStore.subscribe((state, prev) => {
      if (
        state.completedItems !== prev.completedItems ||
        state.currentLevel !== prev.currentLevel
      ) {
        clearTimeout(progressSyncTimer.current);
        progressSyncTimer.current = setTimeout(() => {
          syncProgress({
            completedItems: state.completedItems,
            currentLevel: state.currentLevel,
          });
        }, 1000); // 1s debounce
      }
    });

    return unsub;
  }, [isAuthenticated]);

  // Sync practice sessions immediately on save
  useEffect(() => {
    if (!isAuthenticated) return;

    const unsub = usePracticeStore.subscribe((state, prev) => {
      if (state.sessions.length > prev.sessions.length) {
        const newSession = state.sessions[state.sessions.length - 1];
        if (newSession) {
          syncSession(newSession);
        }
      }
    });

    return unsub;
  }, [isAuthenticated]);

  // Sync video links (debounced)
  useEffect(() => {
    if (!isAuthenticated) return;

    const unsub = useVideoLinksStore.subscribe((state, prev) => {
      if (state.videoLinks !== prev.videoLinks) {
        clearTimeout(videoSyncTimer.current);
        videoSyncTimer.current = setTimeout(() => {
          syncVideoLinks(state.videoLinks);
        }, 1000);
      }
    });

    return unsub;
  }, [isAuthenticated]);

  return null;
}
