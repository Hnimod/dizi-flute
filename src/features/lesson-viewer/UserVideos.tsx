import { useState } from "react";
import { VideoEmbed } from "@/shared/ui";
import { useVideoLinksStore, selectVideos } from "./store";

function isValidUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

export function UserVideos({ itemId }: { itemId: string }) {
  const videos = useVideoLinksStore(selectVideos(itemId));
  const addVideo = useVideoLinksStore((s) => s.addVideo);
  const removeVideo = useVideoLinksStore((s) => s.removeVideo);
  const [input, setInput] = useState("");

  function handleAdd() {
    const url = input.trim();
    if (!url || !isValidUrl(url)) return;
    addVideo(itemId, url);
    setInput("");
  }

  return (
    <div className="my-3">
      {/* Existing user videos */}
      {videos.map((url) => (
        <div key={url} className="relative mb-3">
          <VideoEmbed url={url} />
          <button
            onClick={() => removeVideo(itemId, url)}
            className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full text-white transition-opacity hover:opacity-80"
            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
            title="Remove video"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}

      {/* Add video input */}
      <div className="flex gap-2">
        <input
          type="url"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Paste video link (YouTube, TikTok...)"
          className="min-w-0 flex-1 rounded-lg px-3 py-2 text-sm outline-none"
          style={{
            backgroundColor: "var(--color-bg)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text)",
          }}
        />
        <button
          onClick={handleAdd}
          disabled={!input.trim()}
          className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-white transition-opacity disabled:opacity-40"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          Add
        </button>
      </div>
    </div>
  );
}
