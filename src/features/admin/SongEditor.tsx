import { useState } from "react";
import type { Song } from "@/shared/types";
import { updateSong, createSong, deleteSong } from "@/data/api";
import { useContentStore } from "@/data";

interface Props {
  song?: Song; // If provided, editing; otherwise creating
  onClose: () => void;
}

export function SongEditor({ song, onClose }: Props) {
  const refreshSongs = useContentStore((s) => s.refreshSongs);
  const [titleEnglish, setTitleEnglish] = useState(song?.titleEnglish ?? "");
  const [titleChinese, setTitleChinese] = useState(song?.titleChinese ?? "");
  const [titleVietnamese, setTitleVietnamese] = useState(song?.titleVietnamese ?? "");
  const [key, setKey] = useState(song?.key ?? "D");
  const [timeSignature, setTimeSignature] = useState(song?.timeSignature ?? "4/4");
  const [tempo, setTempo] = useState(song?.tempo?.toString() ?? "");
  const [jianpu, setJianpu] = useState(song?.jianpu ?? "");
  const [description, setDescription] = useState(song?.description ?? "");
  const [origin, setOrigin] = useState(song?.origin ?? "");
  const [videoUrl, setVideoUrl] = useState(song?.videoUrl ?? "");
  const [levelId, setLevelId] = useState(song?.levelId?.toString() ?? "1");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditing = !!song;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!titleEnglish.trim() || !jianpu.trim()) return;

    setLoading(true);
    setError("");
    try {
      const data = {
        titleEnglish: titleEnglish.trim(),
        titleChinese: titleChinese.trim() || undefined,
        titleVietnamese: titleVietnamese.trim() || undefined,
        key: key.trim() || "D",
        timeSignature: timeSignature.trim() || "4/4",
        tempo: tempo ? Number(tempo) : undefined,
        jianpu: jianpu.trim(),
        description: description.trim() || undefined,
        origin: origin.trim() || undefined,
        videoUrl: videoUrl.trim() || undefined,
        levelId: Number(levelId),
      };

      if (isEditing) {
        await updateSong(song.id, data);
      } else {
        await createSong(data);
      }

      await refreshSongs();
      onClose();
    } catch {
      setError("Failed to save. Are you logged in as admin?");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!song || !confirm("Delete this song?")) return;
    setLoading(true);
    try {
      await deleteSong(song.id);
      await refreshSongs();
      onClose();
    } catch {
      setError("Failed to delete");
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "w-full rounded-lg px-3 py-2 text-sm outline-none";
  const inputStyle = {
    backgroundColor: "var(--color-bg)",
    border: "1px solid var(--color-border)",
    color: "var(--color-text)",
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-bold" style={{ color: "var(--color-text)" }}>
          {isEditing ? "Edit Song" : "Add Song"}
        </h3>
        {isEditing && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="text-xs text-red-500 hover:opacity-70"
          >
            Delete
          </button>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-(--color-text-secondary)">
            Title (English) *
          </label>
          <input
            type="text"
            value={titleEnglish}
            onChange={(e) => setTitleEnglish(e.target.value)}
            className={inputClass}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-(--color-text-secondary)">
            Level
          </label>
          <select
            value={levelId}
            onChange={(e) => setLevelId(e.target.value)}
            className={inputClass}
            style={inputStyle}
          >
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <option key={n} value={n}>
                Level {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-(--color-text-secondary)">
            Title (Chinese)
          </label>
          <input
            type="text"
            value={titleChinese}
            onChange={(e) => setTitleChinese(e.target.value)}
            className={inputClass}
            style={inputStyle}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-(--color-text-secondary)">
            Title (Vietnamese)
          </label>
          <input
            type="text"
            value={titleVietnamese}
            onChange={(e) => setTitleVietnamese(e.target.value)}
            className={inputClass}
            style={inputStyle}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-(--color-text-secondary)">Key</label>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className={inputClass}
            style={inputStyle}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-(--color-text-secondary)">Time</label>
          <input
            type="text"
            value={timeSignature}
            onChange={(e) => setTimeSignature(e.target.value)}
            className={inputClass}
            style={inputStyle}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-(--color-text-secondary)">Tempo</label>
          <input
            type="number"
            value={tempo}
            onChange={(e) => setTempo(e.target.value)}
            className={inputClass}
            style={inputStyle}
            placeholder="BPM"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-(--color-text-secondary)">Origin</label>
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className={inputClass}
          style={inputStyle}
          placeholder="e.g. Chinese folk song"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-(--color-text-secondary)">Video URL</label>
        <input
          type="url"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className={inputClass}
          style={inputStyle}
          placeholder="https://youtube.com/..."
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-(--color-text-secondary)">
          Jianpu Notation *
        </label>
        <textarea
          value={jianpu}
          onChange={(e) => setJianpu(e.target.value)}
          className={`${inputClass} font-mono`}
          style={{ ...inputStyle, minHeight: "160px" }}
          placeholder={`1 2 3 4 | 5 - - - |\n5 3 2 1 | 6 - - - ||`}
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-(--color-text-secondary)">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={inputClass}
          style={inputStyle}
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex justify-end gap-2 pt-1">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg px-4 py-2 text-sm font-medium transition-opacity hover:opacity-70"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading || !titleEnglish.trim() || !jianpu.trim()}
          className="rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity disabled:opacity-40"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          {loading ? "Saving..." : isEditing ? "Save Changes" : "Add Song"}
        </button>
      </div>
    </form>
  );
}
