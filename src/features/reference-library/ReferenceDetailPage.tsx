import { useParams } from "react-router";

export function ReferenceDetailPage() {
  const { slug } = useParams();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold capitalize">{slug?.replace(/-/g, " ")}</h1>
      <p className="mt-2 text-[var(--color-text-secondary)]">
        Reference content will be loaded from data layer (Phase 5).
      </p>
    </div>
  );
}
