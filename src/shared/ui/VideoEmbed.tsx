interface VideoEmbedProps {
  url: string;
  className?: string;
}

type VideoInfo =
  | { platform: "youtube"; embedUrl: string }
  | { platform: "tiktok"; embedUrl: string }
  | null;

function parseVideoUrl(url: string): VideoInfo {
  try {
    const u = new URL(url);

    // YouTube: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/shorts/ID
    if (u.hostname.includes("youtube.com") || u.hostname.includes("youtu.be")) {
      let videoId: string | null = null;

      if (u.hostname.includes("youtu.be")) {
        videoId = u.pathname.slice(1);
      } else if (u.pathname.startsWith("/watch")) {
        videoId = u.searchParams.get("v");
      } else if (u.pathname.startsWith("/shorts/")) {
        videoId = u.pathname.replace("/shorts/", "");
      } else if (u.pathname.startsWith("/embed/")) {
        videoId = u.pathname.replace("/embed/", "");
      }

      if (videoId) {
        return {
          platform: "youtube",
          embedUrl: `https://www.youtube.com/embed/${videoId}`,
        };
      }
    }

    // TikTok: tiktok.com/@user/video/ID
    if (u.hostname.includes("tiktok.com")) {
      const match = u.pathname.match(/\/video\/(\d+)/);
      if (match) {
        return {
          platform: "tiktok",
          embedUrl: `https://www.tiktok.com/embed/v2/${match[1]}`,
        };
      }
    }
  } catch {
    // Invalid URL
  }

  return null;
}

export function VideoEmbed({ url, className = "" }: VideoEmbedProps) {
  const info = parseVideoUrl(url);

  if (!info) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1.5 text-sm font-medium hover:opacity-80 ${className}`}
        style={{ color: "var(--color-accent)" }}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Watch video
      </a>
    );
  }

  if (info.platform === "youtube") {
    return (
      <div
        className={`overflow-hidden rounded-xl ${className}`}
        style={{ border: "1px solid var(--color-border)" }}
      >
        <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
          <iframe
            src={info.embedUrl}
            title="Video"
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    );
  }

  // TikTok
  return (
    <div
      className={`mx-auto overflow-hidden rounded-xl ${className}`}
      style={{ border: "1px solid var(--color-border)", maxWidth: "320px" }}
    >
      <div className="relative w-full" style={{ aspectRatio: "9/16", maxHeight: "480px" }}>
        <iframe
          src={info.embedUrl}
          title="Video"
          className="absolute inset-0 h-full w-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
}
