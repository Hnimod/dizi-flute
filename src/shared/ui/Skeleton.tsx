function Bar({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded ${className}`}
      style={{ backgroundColor: "var(--color-bg-tertiary)" }}
    />
  );
}

export function SongListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 6 }, (_, i) => (
        <div
          key={i}
          className="rounded-xl px-4 py-4"
          style={{ border: "1px solid var(--color-border)" }}
        >
          <Bar className="h-4 w-3/4 mb-2" />
          <Bar className="h-3 w-1/2" />
        </div>
      ))}
    </div>
  );
}

export function SongDetailSkeleton() {
  return (
    <div className="mx-auto max-w-3xl">
      <Bar className="h-4 w-16 mb-4" />
      <Bar className="h-8 w-2/3 mb-2" />
      <div className="flex gap-3 mb-6">
        <Bar className="h-4 w-16" />
        <Bar className="h-4 w-16" />
        <Bar className="h-4 w-20" />
      </div>
      <Bar className="h-4 w-full mb-2" />
      <Bar className="h-4 w-4/5 mb-6" />
      <div
        className="rounded-lg p-4"
        style={{ border: "1px solid var(--color-border)" }}
      >
        {Array.from({ length: 4 }, (_, i) => (
          <Bar key={i} className="h-5 w-full mb-3 last:mb-0" />
        ))}
      </div>
    </div>
  );
}

export function LevelSkeleton() {
  return (
    <div className="mx-auto max-w-3xl">
      <Bar className="h-4 w-16 mb-4" />
      <Bar className="h-4 w-32 mb-1" />
      <Bar className="h-8 w-2/3 mb-2" />
      <Bar className="h-5 w-1/2 mb-6" />
      <Bar className="h-3 w-40 mb-2" />
      <Bar className="h-2 w-full rounded-full mb-8" />
      {Array.from({ length: 2 }, (_, s) => (
        <div key={s} className="mb-8">
          <Bar className="h-6 w-48 mb-4" />
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className="rounded-xl px-4 py-4 mb-3"
              style={{ border: "1px solid var(--color-border)" }}
            >
              <Bar className="h-5 w-3/4 mb-2" />
              <Bar className="h-3 w-1/2 mb-2" />
              <Bar className="h-20 w-full rounded-lg" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
