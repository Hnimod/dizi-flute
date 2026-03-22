import { useParams } from "react-router";

export function LevelPage() {
  const { id } = useParams();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold">Level {id}</h1>
      <p className="mt-2 text-[var(--color-text-secondary)]">
        Content will be loaded from data layer (Phase 2).
      </p>
    </div>
  );
}
