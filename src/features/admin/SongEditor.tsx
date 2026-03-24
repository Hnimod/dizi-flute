import { useCallback, useState } from "react";
import type { Song } from "@/shared/types";
import { useUpdateSong, useCreateSong, useDeleteSong } from "@/data";
import { JianpuEditor, VideoEmbed } from "@/shared/ui";

interface Props {
  song?: Song; // If provided, editing; otherwise creating
  onClose: () => void;
}

export function SongEditor({ song, onClose }: Props) {
  const updateSongMutation = useUpdateSong();
  const createSongMutation = useCreateSong();
  const deleteSongMutation = useDeleteSong();

  const [titleEnglish, setTitleEnglish] = useState(song?.titleEnglish ?? "");
  const [titleChinese, setTitleChinese] = useState(song?.titleChinese ?? "");
  const [titleVietnamese, setTitleVietnamese] = useState(song?.titleVietnamese ?? "");
  const [key, setKey] = useState(song?.key ?? "D");
  const [timeSignature, setTimeSignature] = useState(song?.timeSignature ?? "4/4");
  const [tempo, setTempo] = useState(song?.tempo?.toString() ?? "");
  const [origin, setOrigin] = useState(song?.origin ?? "");
  const [description, setDescription] = useState(song?.description ?? "");
  const [videoUrls, setVideoUrls] = useState<string[]>(
    song?.videoUrls?.length ? song.videoUrls : song?.videoUrl ? [song.videoUrl] : [""],
  );
  const [levelId, setLevelId] = useState(song?.levelId?.toString() ?? "1");
  const [jianpu, setJianpu] = useState(song?.jianpu ?? "");
  const [error, setError] = useState("");

  const isEditing = !!song;
  const loading = updateSongMutation.isPending || createSongMutation.isPending || deleteSongMutation.isPending;

  const handleJianpuChange = useCallback((value: string) => {
    setJianpu(value);
  }, []);

  async function handleSave() {
    if (!titleEnglish.trim() || !jianpu.trim()) return;

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
        videoUrls: videoUrls.filter((u) => u.trim()),
        levelId: Number(levelId),
      } as Partial<Song>;

      if (isEditing) {
        await updateSongMutation.mutateAsync({ id: song.id, updates: data });
      } else {
        await createSongMutation.mutateAsync(data);
      }

      onClose();
    } catch {
      setError("Failed to save. Are you logged in as admin?");
    }
  }

  async function handleDelete() {
    if (!song || !confirm("Delete this song?")) return;
    try {
      await deleteSongMutation.mutateAsync(song.id);
      onClose();
    } catch {
      setError("Failed to delete");
    }
  }

  const inputClass = "w-full rounded-lg px-3 py-2 text-sm outline-none";
  const inputStyle = {
    backgroundColor: "var(--color-bg)",
    border: "1px solid var(--color-border)",
    color: "var(--color-text)",
  };
  const labelClass = "block text-[11px] font-medium mb-1 text-(--color-text-secondary)";

  return (
    <div className="space-y-3">
      {/* Header */}
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

      {/* Titles */}
      <div>
        <label className={labelClass}>Title (English) *</label>
        <input
          type="text"
          value={titleEnglish}
          onChange={(e) => setTitleEnglish(e.target.value)}
          className={`${inputClass} text-lg font-bold`}
          style={inputStyle}
          placeholder="Song title"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className={labelClass}>Title (Chinese)</label>
          <input
            type="text"
            value={titleChinese}
            onChange={(e) => setTitleChinese(e.target.value)}
            className={inputClass}
            style={inputStyle}
          />
        </div>
        <div>
          <label className={labelClass}>Title (Vietnamese)</label>
          <input
            type="text"
            value={titleVietnamese}
            onChange={(e) => setTitleVietnamese(e.target.value)}
            className={inputClass}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Metadata row — compact grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        <div>
          <label className={labelClass}>Key</label>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className={inputClass}
            style={inputStyle}
          />
        </div>
        <div>
          <label className={labelClass}>Time</label>
          <input
            type="text"
            value={timeSignature}
            onChange={(e) => setTimeSignature(e.target.value)}
            className={inputClass}
            style={inputStyle}
          />
        </div>
        <div>
          <label className={labelClass}>Tempo</label>
          <input
            type="number"
            value={tempo}
            onChange={(e) => setTempo(e.target.value)}
            className={inputClass}
            style={inputStyle}
            placeholder="BPM"
          />
        </div>
        <div>
          <label className={labelClass}>Level</label>
          <select
            value={levelId}
            onChange={(e) => setLevelId(e.target.value)}
            className={inputClass}
            style={inputStyle}
          >
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <option key={n} value={n}>Lv.{n}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Origin</label>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className={inputClass}
            style={inputStyle}
            placeholder="e.g. Folk"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className={labelClass}>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={inputClass}
          style={inputStyle}
          placeholder="Optional notes about this song"
        />
      </div>

      {/* Video URLs */}
      <div>
        <label className={labelClass}>Videos</label>
        <div className="space-y-2">
          {videoUrls.map((url, i) => (
            <div key={i}>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => {
                    const next = [...videoUrls];
                    next[i] = e.target.value;
                    setVideoUrls(next);
                  }}
                  className={`${inputClass} flex-1`}
                  style={inputStyle}
                  placeholder="https://youtube.com/..."
                />
                <button
                  type="button"
                  onClick={() => {
                    const remaining = videoUrls.filter((_, j) => j !== i);
                    setVideoUrls(remaining.length > 0 ? remaining : [""]);
                  }}
                  className="shrink-0 px-2 text-red-500 hover:opacity-70 text-sm"
                >
                  Remove
                </button>
              </div>
              {url.trim() && <VideoEmbed url={url} className="mt-1" />}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setVideoUrls([...videoUrls, ""])}
          className="mt-2 flex items-center gap-1 text-xs hover:opacity-80"
          style={{ color: "var(--color-accent)" }}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add video
        </button>
      </div>

      {/* Jianpu — always in edit mode */}
      <div>
        <JianpuEditor
          value={jianpu}
          onChange={handleJianpuChange}
          timeSignature={timeSignature}
          alwaysEdit
        />
      </div>

      {/* Error */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Actions */}
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
          type="button"
          onClick={handleSave}
          disabled={loading || !titleEnglish.trim() || !jianpu.trim()}
          className="rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity disabled:opacity-40"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          {loading ? "Saving..." : isEditing ? "Save Changes" : "Add Song"}
        </button>
      </div>
    </div>
  );
}
